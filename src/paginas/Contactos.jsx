import Footer from "../componentes/layout/Footer";
import NavEstudiante from "../componentes/layout/NavEstudiante";

export default function Contactos() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Barra de navegación */}
      <NavEstudiante />

      {/* Contenedor principal de contactos */}
      <main className="flex-grow p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mt-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Contacto</h2>
          <p className="text-lg text-gray-700 mb-6">
            Si tienes alguna pregunta o comentario, por favor completa el siguiente formulario y nos pondremos en contacto contigo lo más pronto posible.
          </p>

          {/* Formulario de contacto */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Aquí puedes manejar el envío del formulario
            }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <div>
              <label className="block text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                className="mt-1 block w-full px-3 py-2 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                name="correo"
                className="mt-1 block w-full px-3 py-2 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700">Mensaje</label>
              <textarea
                name="mensaje"
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
