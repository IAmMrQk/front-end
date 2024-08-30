import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Inicio } from "./paginas/Inicio";
import "./styles.css";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import InicioAdmin from "./paginas/administracion/InicioAdmin";
import { Estudiantes } from "./paginas/Estudiantes";
import Cursos from "./paginas/Cursos";
import ProtectedRouteAdmin from "./utils/security/ProtectedRouteAdmin";
import { getItem } from "./utils/Services";

function App() {
  const user = getItem("user");
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route path="/Estudiantes" element={<Estudiantes />} />
          <Route path="/Cursos" element={<Cursos />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Registro />} />

          <Route element={<ProtectedRouteAdmin user={user} />}>
            <Route path="/Admin" element={<InicioAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
