/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../utils/Decorador";
import axios from "axios";

const SemestreSection = ({ title, cursos, semestreActual }) => {
  const getBackgroundColor = (curso) => {
    if (curso.semestreCurso === semestreActual) {
      return "bg-green-300";
    }
    return curso.semestreCurso < semestreActual
      ? "bg-yellow-200 cursor-not-allowed"
      : "bg-red-200 cursor-not-allowed";
  };

  const abrirModulo = async (curso) => {
    if (curso.documentos && curso.documentos.id) {
      try {
        // Realizar la petición al backend para obtener el PDF
        const response = await axios.get(
          `http://localhost:8080/api/documentos/vista-previa/${curso.documentos.id}`,
          { responseType: "blob" } // Asegúrate de especificar 'blob'
        );

        // Crear una URL para el blob recibido
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(pdfBlob);

        // Abrir la URL en una nueva pestaña
        window.open(url, "_blank");

        // Limpieza: Revocar la URL creada después de un tiempo para liberar memoria
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } catch (error) {
        console.error("Error al abrir el PDF:", error);
      }
    } else {
      console.log("El archivo no se encuentra disponible");
    }
  };

  return (
    <div className="relative max-h-[700px] overflow-y-auto">
      <h4 className="text-lg font-semibold text-gray-700 sticky top-0 bg-white shadow-md p-4 z-10">
        {title}
      </h4>
      <ul className="space-y-6 mt-4">
        {cursos.map((curso) => (
          <li
            key={curso.id}
            className={`flex items-center p-4 rounded-lg shadow ${getBackgroundColor(
              curso
            )}`}
          >
            <Avatar className="m-3" {...stringAvatar(curso.nombreCurso)} />
            <div>
              <h4 className="text-2xl font-semibold text-gray-800">
                {curso.nombreCurso}
              </h4>
              <h5>Semestre: {curso.semestreCurso}</h5>
              <p className="text-gray-600 mt-5">
                <button
                  onClick={() => abrirModulo(curso)}
                  className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  Abrir módulo
                </button>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SemestreSection;
