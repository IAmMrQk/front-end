import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
      idCarrera: 1,
      nombreCarrera: "Ingeniería de Sistemas",
      duracion: "10 Semestres",
      descripcion:
        "Formación en programación, análisis de sistemas, bases de datos, y desarrollo de software.",
      facultad: "Facultad de Ingeniería",
      nivel: "Pregrado",
    },
    {
      idCarrera: 2,
      nombreCarrera: "Ingeniería Electrónica",
      duracion: "10 Semestres",
      descripcion:
        "Estudio de circuitos electrónicos, sistemas digitales, y comunicaciones.",
      facultad: "Facultad de Ingeniería",
      nivel: "Pregrado",
    },
    {
      idCarrera: 3,
      nombreCarrera: "Arquitectura",
      duracion: "10 Semestres",
      descripcion: "Diseño arquitectónico, planificación urbana, y construcción.",
      facultad: "Facultad de Arquitectura",
      nivel: "Pregrado",
    },
    {
      idCarrera: 4,
      nombreCarrera: "Psicología",
      duracion: "9 Semestres",
      descripcion:
        "Estudio del comportamiento humano, terapias psicológicas, y psicología clínica.",
      facultad: "Facultad de Ciencias Sociales",
      nivel: "Pregrado",
    }
  ];


export const CarreraSlice = createSlice({
    name: "carrera",
    initialState,
    reducers: {
        agregarCarrera: (state, action) => {
            console.log("Agregando carrera", action.payload);
            state.push(action.payload);
        },
    },
});

export const { agregarCarrera } = CarreraSlice.actions;
export default CarreraSlice.reducer