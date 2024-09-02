import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const enviarDatos = async (datos) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/Estudiantes/Agregar_Estudiante",
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
    list: [],
  },
  reducers: {
    setEstudiantes: (state, action) => {
      state.list = action.payload;
    },
    actualizarEstudiante: (state, action) => {
      const { id, matricula } = action.payload;
      const estudiante = state.list.find((e) => e.idUsuario === id);
      if (estudiante) {
        estudiante.matricula = matricula;
      }
    },
    guardarEstudiante: (state, action) => {
      console.log("Guardando estudiante", action.payload);
      const repuesta = enviarDatos(action.payload);
      console.log("Respuesta del servidor", repuesta);
    },
  },
});

export const { setEstudiantes, actualizarEstudiante, guardarEstudiante } =
  EstudianteSlice.actions;
export default EstudianteSlice.reducer;
