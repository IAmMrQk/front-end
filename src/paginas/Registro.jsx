import { useState, useEffect } from "react";
import FormUsuario from "../componentes/comunes/FormUsuario";
import NavRegister from "../componentes/layout/NavRegister";
import ModalCedula from "../componentes/estudiantes/ModalCedula";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const [tipoUsuario, setTipoUsuario] = useState("estudiante");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estudiante, setEstudiante] = useState({
    id: "",
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    semestre: "",
    carrera: "",
    matricula: "",
  });

  let navigation = useNavigate();

  const renderizarComponentes = () => {
    switch (tipoUsuario) {
      case "estudiante":
        return <FormUsuario tipoUsuario="estudiante" />;
      case "profesor":
        return <FormUsuario tipoUsuario="profesor" />;
      default:
        break;
    }
  };

  const seleccionTipo = (evento) => {
    setTipoUsuario(evento.target.value);
  };

  const handleModalSubmit = (cedula) => {
    console.log("Cédula ingresada:", cedula);
    fetchEstudiante(cedula);
  };

  const fetchEstudiante = async (cedula) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/dataUniversidad/existencia?cedula=${cedula}`
      );
      setEstudiante(response.data);
      validateEstudiante(response.data);
    } catch (error) {
      console.error("Error fetching estudiante:", error);
    }
  };

  const validateEstudiante = (estudiante) => {
    if (estudiante.matricula) {
      alert("El estudiante se encuentra matriculado en la base de datos");
    } else {
      alert("El estudiante no se encuentra matriculado en la base de datos");
      navigation("/");
    }
  };

  useEffect(() => {
    // Abre el modal si el tipo de usuario es "estudiante" (puedes ajustar la condición según tus necesidades)
    if (tipoUsuario === "estudiante") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, []);

  return (
    <div>
      <NavRegister />
      <form className="flex justify-center mb-6 mt-20">
        <div className="m-2 flex items-center">
          <input
            className="form-radio h-5 w-5 text-blue-500 focus:ring-blue-500 cursor-pointer"
            type="radio"
            name="tipoUsuario"
            value="estudiante"
            id="estudiante"
            checked={tipoUsuario === "estudiante"}
            onChange={seleccionTipo}
          />
          <label
            className={`ml-2 cursor-pointer text-gray-700 ${
              tipoUsuario === "estudiante" ? "font-semibold" : ""
            }`}
            htmlFor="estudiante"
          >
            Estudiante
          </label>
        </div>
        <div className="m-2 flex items-center">
          <input
            className="form-radio h-5 w-5 text-blue-500 focus:ring-blue-500 cursor-pointer"
            type="radio"
            name="tipoUsuario"
            value="profesor"
            id="profesor"
            checked={tipoUsuario === "profesor"}
            onChange={seleccionTipo}
            disabled={true}
          />
          <label
            className={`ml-2 cursor-pointer text-gray-700 ${
              tipoUsuario === "profesor" ? "font-semibold" : ""
            }`}
            htmlFor="profesor"
          >
            Profesor
          </label>
        </div>
      </form>
      <div>{renderizarComponentes()}</div>

      {/* Modal */}
      <ModalCedula
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
