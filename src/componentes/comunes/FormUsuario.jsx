/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { guardarEstudiante } from "../../app/slices/EstudiantesSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function FormUsuario({ tipoUsuario, estudianteDB }) {
  const disparador = useDispatch();
  const [carreras, setCarrera] = useState("");
  const [verContraseña, setVerContraseña] = useState(false);
  const [errorContraseña, setErrorContraseña] = useState("");
  const [errorSemestre, setErrorSemestre] = useState("");
  const [formEstudiante, setFormEstudiante] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    usuario: "",
    telefono: "",
    cedula: "",
    contraseña: "",
    estado: false,
    rol: 1,
    carrera: { idCarrera: "" },
    semestre: tipoUsuario === "estudiante" ? "" : undefined,
  });

  //Función para mostrar u ocultar la contraseña
  const mostrarContraseña = () => {
    setVerContraseña(!verContraseña);
  };

  //Función para validar la contraseña
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

  //Función para validar el semestre
  const validacionSemestre = (semestre) => {
    if (semestre < 1 || semestre > 12) {
      setErrorSemestre("El semestre debe estar entre 1 y 12");
    } else {
      setErrorSemestre("");
    }
  };

  //Función para manejar los datos del formulario
  const manejoDatos = (e) => {
    const { name, value } = e.target;

    setFormEstudiante((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });

    if (name === "semestre") {
      validacionSemestre(Number(value));
    }

    if (name === "contraseña") {
      validacionContraseña(value);
    }
  };

  // Función para validar la carrera
  const validarCarrera = (nombreCarrera) => {
    if (nombreCarrera === "") {
      return null;
    }

    const carrera = carreras.find(
      (carrera) => carrera.nombreCarrera === nombreCarrera
    );
    return carrera ? carrera.idCarrera : null;
  };

  // Función para enviar los datos del formulario
  const enviarDatos = (evento) => {
    evento.preventDefault();

    // Validar la carrera y obtener el idCarrera
    const id = validarCarrera(formEstudiante.carrera.idCarrera);

    // Si no hay error de contraseña y la carrera es válida
    if (!errorContraseña && id) {
      const estudiante = {
        ...formEstudiante,
        carrera: {
          idCarrera: id,
        },
      };
      console.log("Estudiante a guardar", estudiante);
      disparador(guardarEstudiante(estudiante));
    } else {
      console.log("Error en la contraseña o carrera" + id);
    }
  };



  useEffect(() => {

    const obtenerCarreras = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/Carreras/Lista_Carreras"
        );

        setCarrera(response.data);
      } catch (error) {
        console.error("Error al obtener las carreras", error);
      }
    };

    obtenerCarreras();

    if (estudianteDB) {
      setFormEstudiante({
        nombre: estudianteDB.nombre || "",
        apellido: estudianteDB.apellido || "",
        correo: estudianteDB.correo || "",
        usuario: "",
        telefono: estudianteDB.telefono || "",
        cedula: estudianteDB.cedula || "",
        contraseña: "",
        estado: false,
        rol: 1,
        carrera: { idCarrera: estudianteDB.carrera || "" },
        semestre:
          tipoUsuario === "estudiante" ? estudianteDB.semestre : undefined,
      });
    }
  }, [estudianteDB]);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <form
        onSubmit={enviarDatos}
        className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Nombre de Usuario</label>
          <input
            type="text"
            name="usuario"
            value={formEstudiante.usuario}
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
              value={formEstudiante.contraseña}
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
          <label className="block text-gray-700">Nombre</label>
          <input
            disabled
            type="text"
            name="nombre"
            value={formEstudiante.nombre}
            onChange={manejoDatos}
            className="mt-1 block w-full px-2 py-1 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Apellido</label>
          <input
            disabled
            type="text"
            name="apellido"
            value={formEstudiante.apellido}
            onChange={manejoDatos}
            className="mt-1 block w-full px-2 py-1 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Correo</label>
          <input
            disabled
            type="email"
            name="correo"
            value={formEstudiante.correo}
            onChange={manejoDatos}
            className="mt-1 block w-full px-2 py-1 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Teléfono</label>
          <input
            disabled
            type="text"
            name="telefono"
            value={formEstudiante.telefono}
            onChange={manejoDatos}
            className="mt-1 block w-full px-2 py-1 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Cédula</label>
          <input
            disabled
            type="text"
            name="cedula"
            value={formEstudiante.cedula}
            onChange={manejoDatos}
            className="mt-1 block w-full px-2 py-1 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {tipoUsuario === "estudiante" && (
          <div className="mb-4">
            <label className="block text-gray-700">Semestre</label>
            <input
              disabled
              type="number"
              name="semestre"
              value={formEstudiante.semestre}
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

        <div className="col-span-2 mb-4">
          <label className="block text-gray-700">Carrera</label>
          <input
            disabled
            type="text"
            name="carrera"
            value={formEstudiante.carrera.idCarrera}
            onChange={manejoDatos}
            className="mt-1 block w-full px-2 py-1 border border-blue-400 rounded-md bg-blue-50 text-blue-800 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

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
