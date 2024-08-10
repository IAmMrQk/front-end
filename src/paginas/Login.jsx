import { useState } from "react";
import NavLogin from "../componentes/layout/NavLogin";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const users = [
    { username: "admin", password: "admin123", userType: "admin" },
    { username: "user", password: "user123", userType: "user" },
  ];

  const [user, setUser] = useState({ userLogger: "", contrasena: "" });
  let navigate = useNavigate();

  const obtenerDatos = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
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
              htmlFor="username"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="userLogger"
              value={user.userLogger}
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
              value={user.contrasena}
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
