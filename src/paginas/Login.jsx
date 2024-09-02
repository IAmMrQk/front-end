import { useEffect, useState } from "react";
import NavLogin from "../componentes/layout/NavLogin";
import { useDispatch } from "react-redux";
import { iniciarSesion } from "../app/slices/AutentificacionSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { getItem } from "../utils/Services";

export default function Login() {
  let navigate = useNavigate();
  useEffect(() => {
    const user = getItem("user");
    if (user != null) {
      navigate("/Estudiantes"); // Redireccionar si ya hay usuario
    }
  }, [navigate]);

  const dispatch = useDispatch();

  const [credenciales, setCredenciales] = useState({
    nombreUsuario: "",
    contraseña: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const obtenerDatos = (e) => {
    const { name, value } = e.target;
    setCredenciales((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const inicioSesion = async (e) => {
    e.preventDefault();
    const { nombreUsuario, contraseña } = credenciales;

    try {
      const respuesta = await axios.post(
        "http://localhost:8080/api/Estudiantes/estudiante_Login",
        { nombreUsuario, contraseña }
      );

      console.log("Respuesta del servidor:", respuesta.data); // Añade un log para verificar la respuesta

      const { nombre, apellido, usuario, correo, rol, carrera, matricula, semestre } = respuesta.data;

      if (matricula) {
        // Transformar carrera a CarreraDTO
        const carreraDTO = {
          idCarrera: carrera.idCarrera,
          nombreCarrera: carrera.nombreCarrera,
          listaCursos: carrera.listaCursos.map((curso) => ({
            idCurso: curso.idCurso,
            nombreCurso: curso.nombreCurso,
          })),
        };

        // Crear el usuario transformado
        const usuarioTransformado = {
          nombre,
          apellido,
          usuario,
          correo,
          rol,
          carrera: carreraDTO,
          matricula,
          semestre, // Agrega el semestre aquí
        };

        // Guardar el usuario transformado en el estado y en el localStorage
        setSnackbarMessage("Inicio de sesión exitoso");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        dispatch(iniciarSesion({ user: usuarioTransformado }));
        navigate("/Estudiantes");
      } else {
        setSnackbarMessage("Usuario no matriculado, contactarse con Administración");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error.response?.data); // Añade un log para el error
      setSnackbarMessage("Usuario o contraseña incorrectos");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
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
              htmlFor="nombreUsuario"
            >
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="nombreUsuario"
              name="nombreUsuario"
              value={credenciales.nombreUsuario}
              onChange={obtenerDatos}
              className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-800 text-sm font-semibold mb-2"
              htmlFor="contraseña"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              value={credenciales.contraseña}
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

      {/* Snackbar for alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
