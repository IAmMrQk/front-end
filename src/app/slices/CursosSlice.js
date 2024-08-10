import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    idCurso: 1,
    nombreCurso: "Introducción a la Programación",
    fechaInicio: "2024-01-10",
    fechaFinalizacion: "2024-06-10",
    semestreCurso: 1,
    contenido:
      "Fundamentos de la programación, estructuras de datos, algoritmos básicos.",
  },
  {
    idCurso: 2,
    nombreCurso: "Matemáticas Discretas",
    fechaInicio: "2024-02-01",
    fechaFinalizacion: "2024-07-01",
    semestreCurso: 2,
    contenido: "Teoría de conjuntos, grafos, combinatoria, lógica matemática.",
  },
  {
    idCurso: 3,
    nombreCurso: "Estructuras de Datos",
    fechaInicio: "2024-03-15",
    fechaFinalizacion: "2024-08-15",
    semestreCurso: 3,
    contenido:
      "Listas, pilas, colas, árboles, grafos y algoritmos de búsqueda y ordenamiento.",
  },
  {
    idCurso: 4,
    nombreCurso: "Sistemas Operativos",
    fechaInicio: "2024-04-20",
    fechaFinalizacion: "2024-09-20",
    semestreCurso: 4,
    contenido:
      "Conceptos básicos de sistemas operativos, gestión de procesos, memoria, y sistemas de archivos.",
  },
];

export const CursosSlice = createSlice({
  name: "cursos",
  initialState,
  reducers: {
    agregarCurso: (state, action) => {
      console.log("Agregando curso", action.payload);
      state.push(action.payload);
    },
  },
});

export const { agregarCurso } = CursosSlice.actions;
export default CursosSlice.reducer;
