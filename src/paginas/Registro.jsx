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
        return null;
    }
  };

  const seleccionTipo = (evento) => {
    setTipoUsuario(evento.target.value);
  };

  const handleModalSubmit = (cedula) => {
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
    if (tipoUsuario === "estudiante") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [tipoUsuario]);

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <NavRegister />
      <main className="flex-grow flex justify-center items-center px-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <div className="flex justify-center mb-6 mt-4">
            <form className="flex flex-col sm:flex-row items-center">
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
                    tipoUsuario === "estudiante" ? "font-semibold text-blue-600" : ""
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
                    tipoUsuario === "profesor" ? "font-semibold text-blue-600" : ""
                  }`}
                  htmlFor="profesor"
                >
                  Profesor
                </label>
              </div>
            </form>
          </div>
          <div className="flex justify-center">
            {renderizarComponentes()}
          </div>
        </div>
      </main>

      {/* Modal */}
      <ModalCedula
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
