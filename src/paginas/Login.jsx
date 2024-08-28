import { useState } from "react";
import NavLogin from "../componentes/layout/NavLogin";
import { useDispatch } from "react-redux";
import { iniciarSesion } from "../app/slices/AutentificacionSlice";

export default function Login() {
  const dispatch = useDispatch((state) => state.autentificacion);

  const [credenciales, setcredenciales] = useState({
    usuario: "",
    contrasena: "",
  });
  //let navigate = useNavigate();

  const obtenerDatos = (e) => {
    const { name, value } = e.target;
    setcredenciales((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inicioSesion = (e) => {
    e.preventDefault();
    const { usuario, contrasena } = credenciales;
    dispatch(iniciarSesion({ usuario, contrasena }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <NavLogin />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Bienvenido a MLModul
        </h2>
        <form onSubmit={inicioSesion}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="credenciales"
            >
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={credenciales.usuario}
              onChange={obtenerDatos}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="contrasena"
              value={credenciales.contrasena}
              onChange={obtenerDatos}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Iniciar sesion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
