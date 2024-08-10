import { useNavigate } from "react-router-dom";
import BtnLogo from "./BtnLogo";
import { FaSignOutAlt } from "react-icons/fa";
import { Avatar } from "@mui/material";

export default function NavAdmin() {

  const admin = "Administracion X";

  let navigate = useNavigate();

  const cerrarSesion = () => {
    navigate("/");
  };

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }


  return (
    <nav className="bg-blue-900 text-white fixed top-0 left-0 w-full flex items-center justify-between p-4 z-10 shadow-md h-16">
      <div className="flex-shrink-0">
        <BtnLogo />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
        <Avatar {...stringAvatar(`${admin}`)} />
        </div>
        <button className="bg-red-600 hover:bg-red-800 text-white py-1 px-3 rounded-xl flex items-center"
        onClick={cerrarSesion}>
          <FaSignOutAlt className="mr-2" />
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
