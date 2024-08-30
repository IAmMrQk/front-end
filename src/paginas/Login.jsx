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
    const { userLogger, contrasena } = user;

    console.log(userLogger, contrasena);

    const usuarioValido = users.find(
      (usuario) =>
        usuario.username === userLogger && usuario.password === contrasena
    );

    console.log(usuarioValido);

    if (usuarioValido) {
      if (usuarioValido.userType === "admin") {
        console.log("Usuario admin");
        navigate("/Admin");
      } else if (usuarioValido.userType === "user") {
        console.log("Usuario user");
        navigate("/Estudiantes");
      }
    } else {
      console.log("Usuario no válido");
      console.log(usuarioValido);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <NavLogin />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Bienvenido a MLModul
        </h2>
        <form onSubmit={inicioSesion}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={credenciales.usuario}
              onChange={obtenerDatos}
              className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-800 text-sm font-semibold mb-2"
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
              className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-800 mb-3 leading-tight focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
