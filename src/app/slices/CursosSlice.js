
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
      state.push(action.payload);
    },
  },
});

export const { agregarCurso, setCurso } = CursosSlice.actions;
export default CursosSlice.reducer;
