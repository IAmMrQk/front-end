import { Avatar } from "@mui/material";
import NavEstudiante from "../componentes/layout/NavEstudiante";
import { getItem } from "../utils/Services";
import { stringAvatar } from "../utils/Decorador";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Estudiantes = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    const user = getItem("user");
    if (user == null) {
      navigate("/"); // Redireccionar si no hay usuario
    }
  }, [navigate]);

  const user = getItem("user"); // Llamar a getItem después de la verificación

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
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-6 rounded-lg shadow-lg mt-10 mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Información del Usuario
          </h2>
          <div className="flex items-center mb-6">
            <Avatar
              className="m-4"
              sx={{ width: 56, height: 56 }}
              {...stringAvatar(`${user?.nombre} ${user?.apellido}` || "Usuario")}
            />
            <div className="flex flex-col">
              <p className="text-lg text-gray-700">
                Nombre:{" "}
                <strong className="font-semibold text-gray-900">
                  {`${user?.nombre} ${user?.apellido}` || "n/a"}
                </strong>
              </p>
              <p className="text-lg text-gray-700 mt-2">
                Correo:{" "}
                <strong className="font-semibold text-gray-900">
                  {user?.correo || "n/a"}
                </strong>
              </p>
              <p className="text-lg text-gray-700 mt-2">
                Carrera:{" "}
                <strong className="font-semibold text-gray-900">
                  {user?.carrera?.nombreCarrera || "n/a"}
                </strong>
              </p>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
};
