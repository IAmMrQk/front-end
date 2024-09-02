import { createSlice } from "@reduxjs/toolkit";

export const CursosSlice = createSlice({
  name: "cursos",
  initialState: {
    list: [],
  },
  reducers: {
    setCurso: (state, action) => {
      state.list = action.payload;
    },
    agregarCurso: (state, action) => {
      console.log("Agregando curso", action.payload);
      state.list.push(action.payload); // Utiliza `state.list` para agregar al array existente
    },
    actualizarCurso: (state, action) => {
      const cursoActualizado = action.payload;
      const index = state.list.findIndex(
        (curso) => curso.idCurso === cursoActualizado.idCurso
      );
      if (index !== -1) {
        state.list[index] = cursoActualizado;
      }
    },
  },
});

export const { agregarCurso, setCurso, actualizarCurso } = CursosSlice.actions;
export default CursosSlice.reducer;
