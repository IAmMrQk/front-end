import { FaSignOutAlt } from "react-icons/fa";
import BtnLogo from "./BtnLogo";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { cerrarSesion } from "../../app/slices/AutentificacionSlice";
import { getItem } from "../../utils/Services";
import { stringAvatar } from "../../utils/Decorador";

export default function NavEstudiante() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const user = getItem("user");

  const cerrarSession = () => {
    dispatch(cerrarSesion());
    navigate("/");
  };

  return (
    <nav className="bg-blue-900 text-white fixed top-0 left-0 w-full flex items-center justify-between p-4 z-20 shadow-md h-16">
      <div className="flex-shrink-0">
        <BtnLogo />
      </div>
      <div className="flex flex-grow justify-center space-x-4">
        <a
          href="/Estudiantes"
          className="bg-blue-800 py-1 px-3 rounded-xl hover:bg-blue-600"
        >
          Inicio
        </a>
        <a
          href="/Cursos"
          className="bg-blue-800 py-1 px-3 rounded-xl hover:bg-blue-600"
        >
          Cursos
        </a>
        <a
          href="/Contactos"
          className="bg-blue-800 py-1 px-3 rounded-xl hover:bg-blue-600"
        >
          Contactos
        </a>
        {/* Mostrar el enlace Admin solo si el usuario es ADMINISTRADOR */}
        {user?.rol === 'ADMINISTRADOR' && (
          <a
            href="/Admin"
            className="bg-blue-800 py-1 px-3 rounded-xl hover:bg-blue-600"
          >
            Admin
          </a>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {user && (
          <div className="flex items-center space-x-2">
            <Avatar
              {...stringAvatar(`${user.nombre} ${user.apellido}` || "Usuario")}
            />
          </div>
        )}
        <button
          className="bg-red-600 hover:bg-red-800 text-white py-1 px-3 rounded-xl flex items-center"
          onClick={cerrarSession}
        >
          <FaSignOutAlt className="mr-2" />
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
