// features/autentificacion/autentificacionSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { removeItem, setItem } from "../../utils/Services";

const initialState = {
  user: null,
  error: null,
  status: "idle",
};

const autentificacionSlice = createSlice({
  name: "autentificacion",
  initialState,
  reducers: {
    iniciarSesion: (state, action) => {
      state.user = action.payload.user;
      state.error = null;
      state.status = "succeeded";
      setItem("user", state.user);
      console.log("Usuario logeado", state.user.nombreUsuario);
    },
    cerrarSesion: (state) => {
      state.user = null;
      state.error = null;
      state.status = "idle";
      removeItem("user");
    },

    autentificacionFallida: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

export const { iniciarSesion, cerrarSesion, autentificacionFallida } =
  autentificacionSlice.actions;
export default autentificacionSlice.reducer;
