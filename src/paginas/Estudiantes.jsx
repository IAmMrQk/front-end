import NavEstudiante from "../componentes/layout/NavEstudiante";

export const Estudiantes = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navegación */}
      <NavEstudiante />
      {/* Contenedor principal */}
      <div className="mt-6 flex">
        {/* Área Personal (izquierda) */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-md mr-4 mt-10">
          <h2 className="text-2xl font-bold mb-4">Área Personal</h2>
          <p>Contenido del área personal...</p>
          {/* Aquí puedes agregar más información o componentes */}
        </div>

        {/* Información del Usuario (derecha) */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-bold mb-4">Información del Usuario</h2>
          <div className="flex items-center mb-4">
            <img
              src="/path/to/user-photo.jpg" // Reemplaza con la ruta de la foto del usuario
              alt="User"
              className="w-16 h-16 rounded-full border border-gray-300 mr-4"
            />
            <div>
              <p className="font-semibold">Nombre Usuario</p>
              <p>email@ejemplo.com</p>
              {/* Aquí puedes agregar más información del usuario */}
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
};
