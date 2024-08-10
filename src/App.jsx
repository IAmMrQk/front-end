import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Inicio } from "./paginas/Inicio";
import "./styles.css";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import InicioAdmin from "./paginas/administracion/InicioAdmin";
import { Estudiantes } from "./paginas/Estudiantes";

function App() {
  //
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Registro />} />
          <Route path="/Admin" element={<InicioAdmin />} />
          <Route path="/Estudiantes" element={<Estudiantes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
