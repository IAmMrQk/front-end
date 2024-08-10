import Footer from "../componentes/layout/Footer";
import NavEstudiante from "../componentes/layout/NavEstudiante";

export default function Cursos() {
  const carrera = "Ingeniería en Sistemas";
  const semestre = 5;
  const cursos = [
    {
      id: 1,
      nombre: "Estructura de Datos",
      fechaInicio: "01/09/2024",
      fechaFin: "15/12/2024",
      maestro: "Prof. Juan Pérez",
      imagenPDF: "/path/to/estructura-datos-pdf.jpg",
    },
    {
      id: 2,
      nombre: "Bases de Datos",
      fechaInicio: "01/09/2024",
      fechaFin: "15/12/2024",
      maestro: "Prof. María Rodríguez",
      imagenPDF: "/path/to/bases-datos-pdf.jpg",
    },
    {
      id: 3,
      nombre: "Redes de Computadoras",
      fechaInicio: "01/09/2024",
      fechaFin: "15/12/2024",
      maestro: "Prof. Carlos Martínez",
      imagenPDF: "/path/to/redes-computadoras-pdf.jpg",
    },
    {
      id: 4,
      nombre: "Ingeniería de Software",
      fechaInicio: "01/09/2024",
      fechaFin: "15/12/2024",
      maestro: "Prof. Laura Gómez",
      imagenPDF: "/path/to/ingenieria-software-pdf.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Barra de navegación */}
      <NavEstudiante />

      {/* Contenedor principal de cursos */}
      <main className="flex-grow p-6 mt-16">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">{carrera}</h2>
          <h3 className="text-xl text-gray-700 mb-4">Semestre: {semestre}</h3>
          <ul className="space-y-6">
            {cursos.map((curso) => (
              <li
                key={curso.id}
                className="flex items-center bg-gray-50 p-4 rounded-lg shadow"
              >
                <img
                  src={curso.imagenPDF}
                  alt={`PDF ${curso.nombre}`}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h4 className="text-2xl font-semibold text-gray-800">
                    {curso.nombre}
                  </h4>
                  <p className="text-gray-600">Maestro: {curso.maestro}</p>
                  <p className="text-gray-600">
                    Inicio: {curso.fechaInicio} - Fin: {curso.fechaFin}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
