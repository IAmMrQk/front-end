import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../../utils/Services";

export const CarreraSlice = createSlice({
  name: "carrera",
  initialState: {
    list: [],
  },
  reducers: {
    setCarrera: (state, action) => {
      state.list = action.payload;
      setItem("carreras", action.payload);
    },
    agregarCarrera: (state, action) => {
      console.log("Agregando carrera", action.payload);
      state.push(action.payload);
    },
  },
});

export const { agregarCarrera, setCarrera } = CarreraSlice.actions;
export default CarreraSlice.reducer;
