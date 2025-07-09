export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-6 text-center">
        <p>© {new Date().getFullYear()} AutoCase. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
