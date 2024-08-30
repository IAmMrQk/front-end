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
    activarEstudiante: (state, action) => {
      console.log("Activando estudiante", action.payload);

      const estudiante = state.list.find(
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

export const {
  setEstudiantes,
  activarEstudiante,
  guardarEstudiante,
} = EstudianteSlice.actions;
export default EstudianteSlice.reducer;
