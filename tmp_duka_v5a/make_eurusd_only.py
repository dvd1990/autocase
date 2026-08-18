#!/usr/bin/env python3
from pathlib import Path
import re

path = Path(__import__('sys').argv[1])
src = path.read_text(encoding='utf-8')
new_func = r'''
def build_daily_features(xau: pd.DataFrame, aux_dir: Path) -> tuple[pd.DataFrame, dict[str, tuple[str, np.ndarray]]]:
    """Causal gold-versus-EURUSD features; latest auxiliary value on trade date D is D-1."""
    temp = xau.copy()
    temp["date"] = pd.DatetimeIndex(temp["dt_server"]).normalize()
    daily = (
        temp.groupby("date", sort=True)
        .agg(xau_close=("close_bid", "last"), xau_high=("high_bid", "max"), xau_low=("low_bid", "min"))
        .reset_index()
    )
    daily = daily.merge(load_aux(aux_dir / "eurusd_bid_d1.csv", "eurusd"), on="date", how="inner")
    daily.sort_values("date", inplace=True)
    daily.reset_index(drop=True, inplace=True)
    daily["xau_ret"] = np.log(daily["xau_close"]).diff()
    daily["eurusd_ret"] = np.log(daily["eurusd_close"]).diff()
    daily["usd_proxy_ret"] = -daily["eurusd_ret"]
    xau_ret = daily["xau_ret"]
    usd_ret = daily["usd_proxy_ret"]
    features: dict[str, tuple[str, np.ndarray]] = {}

    for beta_window in (60, 120, 252, 504):
        beta_usd = prior_beta(xau_ret, usd_ret, beta_window)
        residual = xau_ret - beta_usd * usd_ret
        for horizon in (1, 3, 5, 10, 20):
            h = residual if horizon == 1 else residual.rolling(horizon, min_periods=horizon).sum()
            for z_window in (60, 120, 252, 504):
                if z_window < max(60, beta_window // 2):
                    continue
                features[f"eurusd_resid{horizon}_b{beta_window}_z{z_window}"] = (
                    "eurusd_resid", causal_z(h, z_window).to_numpy(dtype=np.float64)
                )

    for horizon in (1, 3, 5, 10, 20):
        h = usd_ret if horizon == 1 else usd_ret.rolling(horizon, min_periods=horizon).sum()
        for z_window in (60, 120, 252, 504):
            features[f"usd_shock{horizon}_z{z_window}"] = (
                "usd_shock", causal_z(h, z_window).to_numpy(dtype=np.float64)
            )

    for vol_window in (60, 120, 252, 504):
        minp = max(40, vol_window // 2)
        xvol = xau_ret.shift(1).rolling(vol_window, min_periods=minp).std()
        uvol = usd_ret.shift(1).rolling(vol_window, min_periods=minp).std()
        xstd = xau_ret / xvol.replace(0.0, np.nan)
        ustd = usd_ret / uvol.replace(0.0, np.nan)
        for horizon in (1, 3, 5, 10):
            gap = xstd - ustd
            if horizon > 1:
                gap = gap.rolling(horizon, min_periods=horizon).sum()
            for z_window in (60, 120, 252, 504):
                features[f"std_gap{horizon}_v{vol_window}_z{z_window}"] = (
                    "std_gap", causal_z(gap, z_window).to_numpy(dtype=np.float64)
                )

    print(f"[features] {len(daily):,} aligned days; {len(features)} EURUSD-conditioned features", flush=True)
    return daily, features
'''.strip()

src, count = re.subn(
    r'def build_daily_features\(.*?\n\ndef build_execution_arrays',
    new_func + '\n\n\ndef build_execution_arrays',
    src,
    flags=re.S,
)
if count != 1:
    raise SystemExit(f'build_daily_features replacement count={count}')
src = src.replace('Dukascopy-only XAUUSD cross-asset discovery v5.', 'Dukascopy-only XAUUSD/EURUSD discovery v5a.')
src = src.replace('"source": "Dukascopy-derived XAUUSD M1 BID/ASK plus Dukascopy EURUSD/USDJPY/XAGUSD D1",', '"source": "Dukascopy-derived XAUUSD M1 BID/ASK plus Dukascopy EURUSD D1",')
src = src.replace('# Dukascopy XAUUSD Cross-Asset Discovery v5', '# Dukascopy XAUUSD/EURUSD Discovery v5a')
src = src.replace('f"{len(passed)} frozen cross-asset champion(s)', 'f"{len(passed)} frozen EURUSD-conditioned champion(s)')
src = src.replace('"No frozen cross-asset champion passed', '"No frozen EURUSD-conditioned champion passed')
path.write_text(src, encoding='utf-8')
