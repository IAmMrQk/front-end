/* eslint-disable react/prop-types */

export default function CartaCurso({ curso }) {
  const editarCurso = (id) => {
    console.log("Editar curso " + id);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          {curso.nombreCurso}
        </h2>
        <p className="text-gray-600 mb-2">
          <strong>ID:</strong> {curso.idCurso}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Fecha de Inicio:</strong> {curso.fecheInicio}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Fecha de Finalización:</strong> {curso.fechaFinalizacion}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Semestre:</strong> {curso.semestreCurso}
        </p>
      </div>
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-300 flex justify-between">
        <p className="text-gray-600 text-sm">Curso disponible</p>
        <div className="flex justify-center">
          <button
            className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => editarCurso(curso.idCurso)}
          >
            Editar Curso
          </button>
        </div>
      </div>
    </div>
  );
}
