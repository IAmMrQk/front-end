import BtnLogo from "./BtnLogo";
import { FaSignOutAlt } from "react-icons/fa";

export default function NavAdmin() {
  return (
    <nav className="bg-blue-900 text-white fixed top-0 left-0 w-full flex items-center justify-between p-4 z-10 shadow-md h-16">
      <div className="flex-shrink-0">
        <BtnLogo />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img
            src="/path/to/user-photo.jpg" // Reemplaza con la ruta de la foto del usuario
            alt="User"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
        </div>
        <button className="bg-red-600 hover:bg-red-800 text-white py-1 px-3 rounded-xl flex items-center">
          <FaSignOutAlt className="mr-2" />
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
