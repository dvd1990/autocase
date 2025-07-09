export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-24">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Études de cas prêtes en 15 minutes
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Transformez vos données client en histoires qui convertissent – sans
          designer ni rédacteur.
        </p>
        <a
          href="#pricing"
          className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded shadow hover:opacity-90 transition"
        >
          Commencer gratuitement
        </a>
      </div>
    </section>
  );
}
