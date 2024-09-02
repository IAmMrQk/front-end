import { createSlice } from "@reduxjs/toolkit";

export const CarreraSlice = createSlice({
  name: "carrera",
  initialState: {
    list: [],
  },
  reducers: {
    setCarrera: (state, action) => {
      state.list = action.payload;
    },
    agregarCarrera: (state, action) => {
      console.log("Agregando carrera", action.payload);
      state.list.push(action.payload); // Añade la nueva carrera a la lista
    },
    actualizarCarrera: (state, action) => {
      const index = state.list.findIndex(
        (carrera) => carrera.idCarrera === action.payload.idCarrera
      );
      if (index !== -1) {
        state.list[index] = action.payload; // Actualiza la carrera existente
      }
    },
  },
});

// Exportar las acciones para usarlas en los componentes
export const { agregarCarrera, setCarrera, actualizarCarrera } = CarreraSlice.actions;

// Exportar el reducer para configurarlo en el store
export default CarreraSlice.reducer;
