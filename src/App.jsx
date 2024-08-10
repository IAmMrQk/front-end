import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Inicio } from "./paginas/Inicio"
import './styles.css';
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import { Estudiantes } from "./paginas/Estudiantes";
import Cursos from "./paginas/Cursos";
import Contactos from "./paginas/Contactos";


function App() {
  //
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Inicio/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Registro/>}/>
            <Route path="/Estudiante" element={<Estudiantes/>}/>
            <Route path="/Cursos" element={<Cursos/>}/>
            <Route path="/Contactos" element={<Contactos/>}/>
          </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App
