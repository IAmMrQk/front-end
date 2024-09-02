/* eslint-disable react/prop-types */

export default function CartaCurso({ curso, onEditar }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
      <h2 className="text-2xl font-semibold text-blue-600">{curso.nombreCurso}</h2>
      <p className="text-gray-500 mt-2">Semestre: {curso.semestreCurso}</p>
      
      {/* Otros detalles del curso aquí */}
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={onEditar}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Editar
        </button>
      </div>
    </div>
  );
}
