import { useState } from "react";
import Nav from "../layout/Nav";

export default function FormUsuario({ tipoUsuario }) {
  const [verContraseña, setVerContraseña] = useState(false);
  const [errorContraseña, setErrorContraseña] = useState("");
  const [errorSemestre, setErrorSemestre] = useState();
  const [formUsuario, setFormUsuario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    nombreUsuario: "",
    telefono: "",
    contraseña: "",
    carrera: "",
    semestre: tipoUsuario === "estudiante" ? "" : undefined,
  });

  const enviarDatos = (evento) => {
    evento.preventDefault();
    console.log(formUsuario);
  };

  const manejoDatos = (e) => {
    const { name, value } = e.target;
    setFormUsuario({ ...formUsuario, [name]: value });

    if (name === "semestre") {
      validacionSemestre(Number(value));
    }

    if (name === "contraseña") {
      validacionContraseña(value);
    }
  };

  const mostrarContraseña = () => {
    setVerContraseña(!verContraseña);
  };

  const validacionSemestre = (semestre) => {
    if (semestre < 0 || semestre > 12) {
      setErrorSemestre("El semestre debe estar entre 1 y 12");
    } else {
      setErrorSemestre("");
    }
  };

  const validacionContraseña = (contraseña) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regex.test(contraseña)) {
      setErrorContraseña(
        "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números."
      );
    } else {
      setErrorContraseña("");
    }
  };
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <Nav/>
      <form
        onSubmit={enviarDatos}
        className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formUsuario.nombre}
            onChange={manejoDatos}
            className="mt-1 block w-full px-2 py-1 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Apellido</label>
          <input
            type="text"
            name="apellido"
            value={formUsuario.apellido}
            onChange={manejoDatos}
            className="mt-1 block w-full px-2 py-1 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Correo</label>
          <input
            type="email"
            name="correo"
            value={formUsuario.correo}
            onChange={manejoDatos}
            className="mt-1 block w-full px-2 py-1 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Nombre de Usuario</label>
          <input
            type="text"
            name="nombreUsuario"
            value={formUsuario.nombreUsuario}
            onChange={manejoDatos}
            className="mt-1 block w-full px-2 py-1 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formUsuario.telefono}
            onChange={manejoDatos}
            className="mt-1 block w-full px-2 py-1 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <div className="relative">
            <input
              type={verContraseña ? "text" : "password"}
              name="contraseña"
              value={formUsuario.contraseña}
              onChange={manejoDatos}
              className={`mt-1 block w-full px-2 py-1 border ${
                errorContraseña ? "border-red-500" : "border-blue-400"
              } rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500`}
            />
            <button
              type="button"
              onClick={mostrarContraseña}
              className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
            >
              {verContraseña ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {errorContraseña && (
            <p className="text-red-500 text-sm mt-2">{errorContraseña}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Carrera</label>
          <input
            type="text"
            name="carrera"
            value={formUsuario.carrera}
            onChange={manejoDatos}
            className="mt-1 block w-full px-2 py-1 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {tipoUsuario === "estudiante" && (
          <div className="mb-4">
            <label className="block text-gray-700">Semestre</label>
            <input
              type="number"
              name="semestre"
              value={formUsuario.semestre}
              min="0"
              max="12"
              onChange={manejoDatos}
              className="mt-1 block w-full px-2 py-1 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
            />

            <div>
              {errorSemestre && (
                <p className="text-red-500 text-sm mt-2">{errorSemestre}</p>
              )}
            </div>
          </div>
        )}

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Registrar {tipoUsuario === "estudiante" ? "estudiante" : "profesor"}
          </button>
        </div>
      </form>
    </div>
  );
}
