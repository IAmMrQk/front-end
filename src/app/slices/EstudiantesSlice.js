import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const enviarDatos = async (datos) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/Usuarios/Agregar_Usuario",
      datos
    );
    return response.data;
  } catch (error) {
    console.error("Error al enviar los datos", error);
  }
};

export const EstudianteSlice = createSlice({
  name: "estudiantes",
  initialState: {
    nombre: "",
    apellido: "",
    correo: "",
    nombreUsuario: "",
    telefono: "",
    contraseña: "",
    activo: false,
    carrera: { idCarrera: "" },
    rol: 1,
    semestre: 0,
    cursos: [],
  },
  reducers: {
    activarEstudiante: (state, action) => {
      console.log("Activando estudiante", action.payload);

      const estudiante = state.find(
        (estudiante) => estudiante.id === action.payload
      );
      if (estudiante) {
        estudiante.activo = !estudiante.activo;
      }

      console.log("Estudiante activado" + estudiante);
    },

    guardarEstudiante: (state, action) => {
      console.log("Guardando estudiante", action.payload);
      const repuesta = enviarDatos(action.payload);
      console.log("Respuesta del servidor", repuesta);
    },
  },
});

export const { activarEstudiante, guardarEstudiante } = EstudianteSlice.actions;
export default EstudianteSlice.reducer;
