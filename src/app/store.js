import { configureStore } from "@reduxjs/toolkit";
import CursosReducer from "./slices/CursosSlice";
import CarreraReducer from "./slices/CarreraSlice";
import EstudianteReducer from "./slices/EstudiantesSlice";
import AutentificacionReducer from "./slices/AutentificacionSlice";

export const store = configureStore({
  reducer: {
    cursos: CursosReducer,
    carrera: CarreraReducer,
    estudiantes: EstudianteReducer,
    autentificacion: AutentificacionReducer,
  },
});
