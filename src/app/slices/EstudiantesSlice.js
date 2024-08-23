import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 4,
    nombre: "Ana",
    apellido: "Martínez",
    correo: "ana.martinez@example.com",
    nombreUsuario: "anamartinez",
    telefono: "+1234567893",
    contraseña: "ana12345",
    activo: false,
    carrera: "ingenieria en sistemas",
    rol: 1,
    semestre: 3,
    cursos: [],
  },
  {
    id: 2,
    nombre: "María",
    apellido: "Gómez",
    correo: "maria.gomez@example.com",
    nombreUsuario: "mariagomez",
    telefono: "+1234567891",
    contraseña: "password456",
    activo: false,
    carrera: "ingenieria en sistemas",
    rol: 1,
    semestre: 2,
    cursos: [],
  },
];

export const EstudianteSlice = createSlice({
  name: "estudiantes",
  initialState,
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

  },
});

export const { activarEstudiante } = EstudianteSlice.actions;
export default EstudianteSlice.reducer;
