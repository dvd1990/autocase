import Head from 'next/head';

export default function Success() {
  return (
    <>
      <Head>
        <title>Merci pour votre achat ! | AutoCase</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-10 rounded shadow text-center">
          <h1 className="text-3xl font-bold mb-4">Merci !</h1>
          <p className="mb-6">Votre abonnement est actif. Un email de confirmation vient de vous être envoyé.</p>
          <a href="/" className="text-indigo-600 underline">Retour à l’accueil</a>
        </div>
      </div>
    </>
  );
}
