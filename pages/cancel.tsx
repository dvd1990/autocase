import Head from 'next/head';

export default function Cancel() {
  return (
    <>
      <Head>
        <title>Paiement annulé | AutoCase</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-10 rounded shadow text-center">
          <h1 className="text-3xl font-bold mb-4">Paiement annulé</h1>
          <p className="mb-6">Votre commande a été annulée. Vous pouvez réessayer à tout moment.</p>
          <a href="/#pricing" className="text-indigo-600 underline">Retour aux tarifs</a>
        </div>
      </div>
    </>
  );
}
