import { useState } from "react";
import PaginaCarreras from "./PaginaCarreras";
import PaginaCursos from "./PaginaCursos";
import PaginaEstudiantes from "./PaginaEstudiantes";

export default function InicioAdmin() {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("estudiantes");

  const renderizarPagina = () => {
    switch (opcionSeleccionada) {
      case "cursos":
        return <PaginaCursos />;
      case "carreras":
        return <PaginaCarreras />;
      case "estudiantes":
        return <PaginaEstudiantes />;
      default:
        return null;
    }
  };

  const seleccionarOpcion = (e) => {
    setOpcionSeleccionada(e.target.value);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-semibold mb-6">Panel de Administración</h1>

      <div className="flex space-x-4 mb-8">
        <label>
          <input
            type="radio"
            name="adminOption"
            value="estudiantes"
            checked={opcionSeleccionada === "estudiantes"}
            onChange={seleccionarOpcion}
            className="hidden"
          />
          <div
            className={`px-6 py-3 rounded-lg border-2 cursor-pointer font-semibold ${
              opcionSeleccionada === "estudiantes"
                ? "bg-blue-100 border-blue-500 text-blue-700"
                : "bg-white border-gray-300 text-gray-700"
            } hover:bg-blue-50 transition-all`}
          >
            Estudiantes
          </div>
        </label>

        <label>
          <input
            type="radio"
            name="adminOption"
            value="cursos"
            checked={opcionSeleccionada === "cursos"}
            onChange={seleccionarOpcion}
            className="hidden"
          />
          <div
            className={`px-6 py-3 rounded-lg border-2 cursor-pointer font-semibold ${
              opcionSeleccionada === "cursos"
                ? "bg-blue-100 border-blue-500 text-blue-700"
                : "bg-white border-gray-300 text-gray-700"
            } hover:bg-blue-50 transition-all`}
          >
            Cursos
          </div>
        </label>

        <label>
          <input
            type="radio"
            name="adminOption"
            value="carreras"
            checked={opcionSeleccionada === "carreras"}
            onChange={seleccionarOpcion}
            className="hidden"
          />
          <div
            className={`px-6 py-3 rounded-lg border-2 cursor-pointer font-semibold ${
              opcionSeleccionada === "carreras"
                ? "bg-blue-100 border-blue-500 text-blue-700"
                : "bg-white border-gray-300 text-gray-700"
            } hover:bg-blue-50 transition-all`}
          >
            Carreras
          </div>
        </label>
      </div>

      <div className="w-full">{renderizarPagina()}</div>
    </div>
  );
}
