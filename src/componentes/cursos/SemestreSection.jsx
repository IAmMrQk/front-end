/* eslint-disable react/prop-types */

import { Avatar } from "@mui/material";
import { stringAvatar } from "../../utils/Decorador";


const SemestreSection = ({ title, cursos, semestreActual }) => {
  const getBackgroundColor = (curso) => {
    if (curso.semestreCurso === semestreActual) {
      return "bg-green-300 cursor-pointer";
    }
    return curso.semestreCurso < semestreActual
      ? "bg-yellow-200 cursor-not-allowed"
      : "bg-red-200 cursor-not-allowed";
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
            className={`flex items-center p-4 rounded-lg shadow ${getBackgroundColor(curso)}`}
          >
            <Avatar
              className="m-3"
              {...stringAvatar(curso.nombreCurso)}
            />
            <div>
              <h4 className="text-2xl font-semibold text-gray-800">
                {curso.nombreCurso}
              </h4>
              <h5>Semestre: {curso.semestreCurso}</h5>
              <p className="text-gray-600">Contenido: {curso.contenido}</p>
              <p className="text-gray-600">
                Inicio: {curso.fechaInicio} - Fin: {curso.fechaFinalizacion}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SemestreSection;
