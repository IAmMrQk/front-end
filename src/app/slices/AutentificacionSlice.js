import { createSlice } from "@reduxjs/toolkit";

export const AutentificacionSlice = createSlice({
  name: "autentificacion",
  initialState: {
    usuario: null,
    autenticado: false,
  },
  reducers: {
    iniciarSesion: (state, action) => {
      console.log("Iniciando sesión", action.payload);
    },
    cerrarSesion: (state) => {
      state.usuario = null;
      state.autenticado = false;
    },
  },
});

export const { iniciarSesion, cerrarSesion } = AutentificacionSlice.actions;
export default AutentificacionSlice.reducer;
