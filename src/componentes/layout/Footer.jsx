export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-6 mt-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Sección de Información */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-semibold">Universidad Remington</h3>
          <p className="text-sm">
            Desarrollado con React, Vite, y Tailwind CSS.
          </p>
        </div>

        {/* Sección de Tecnologías */}
        <div className="flex space-x-4">
          <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            React
          </a>
          <a
            href="https://vitejs.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            Vite
          </a>
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            Tailwind CSS
          </a>
        </div>

        {/* Derechos de Autor */}
        <div className="text-sm mt-4 md:mt-0">
          <p>© 2024 Universidad Remington. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
