const plans = [
  {
    name: 'Starter',
    price: 59,
    features: ['2 cas / mois', 'Watermark AutoCase', 'Support email']
  },
  {
    name: 'Growth',
    price: 149,
    features: ['10 cas / mois', 'Branding retiré', 'Support prioritaire']
  },
  {
    name: 'Scale',
    price: 399,
    features: ['Illimité', 'SSO', 'SLA 99,9 %']
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Tarifs simples</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((p) => (
            <div key={p.name} className="border rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">{p.name}</h3>
              <p className="text-4xl font-extrabold mb-6">${p.price}</p>
              <ul className="text-left space-y-2 mb-6">
                {p.features.map((f) => (
                  <li key={f}>✅ {f}</li>
                ))}
              </ul>
              <a
                href="/checkout"
                className="bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-700 transition"
              >
                Choisir
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
