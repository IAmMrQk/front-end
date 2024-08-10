export default function CartaCarrera({ carrera }) {

  
  const editarCarrera = (id) => {
    console.log("Editar carrera " + id);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          {carrera.nombreCarrera}
        </h2>
        <p className="text-gray-600 mb-2">
          <strong>ID:</strong> {carrera.idCarrera}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Duración:</strong> {carrera.duracion}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Facultad:</strong> {carrera.facultad}
        </p>
        <p className="text-gray-600">
          <strong>Nivel:</strong> {carrera.nivel}
        </p>
      </div>
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-300 flex justify-between">
        <p className="text-gray-600 text-sm">Carrera disponible</p>
        <div className="flex justify-center">
          <button
            className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => editarCarrera(carrera.idCarrera)}
          >
            Editar Carrera
          </button>
        </div>
      </div>
    </div>
  );
}
