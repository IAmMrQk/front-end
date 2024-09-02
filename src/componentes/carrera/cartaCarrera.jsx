/* eslint-disable react/prop-types */

export default function CartaCarrera({ carrera, onEditar }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <h2 className="text-2xl font-semibold text-blue-600 mb-2">{carrera.nombreCarrera}</h2>
      <p className="text-gray-600 text-sm mb-4">
        <span className="font-medium text-gray-800">Semestres:</span> {carrera.cantidadSemestre}
      </p>
      {/* Otros detalles de la carrera aquí */}
      <div className="flex justify-end mt-4">
        <button
          onClick={onEditar}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Editar
        </button>
      </div>
    </div>
  );
}
