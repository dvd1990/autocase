const features = [
  {
    title: 'Connexion CRM',
    desc: 'Importez vos données HubSpot, Salesforce ou Pipedrive en 1 clic.'
  },
  {
    title: 'Génération IA',
    desc: 'Narration, KPI, citations – tout est rédigé et mis en page automatiquement.'
  },
  {
    title: 'Exports multi‑formats',
    desc: 'PDF, page web, carousel LinkedIn, vidéo 60 s.'
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ce que vous obtenez
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const features = [
  {
    title: 'Connexion CRM',
    desc: 'Importez vos données HubSpot, Salesforce ou Pipedrive en 1 clic.'
  },
  {
    title: 'Génération IA',
    desc: 'Narration, KPI, citations – tout est rédigé et mis en page automatiquement.'
  },
  {
    title: 'Exports multi‑formats',
    desc: 'PDF, page web, carousel LinkedIn, vidéo 60 s.'
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ce que vous obtenez
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
