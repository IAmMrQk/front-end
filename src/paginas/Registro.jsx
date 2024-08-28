import { useState, useEffect } from "react";
import FormUsuario from "../componentes/comunes/FormUsuario";
import NavRegister from "../componentes/layout/NavRegister";
import ModalCedula from "../componentes/estudiantes/ModalCedula";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  CircularProgress,
  DialogActions,
  Button,
} from "@mui/material";

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

  // Estados para manejar el Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
    setIsLoading(true);
    setDialogOpen(true);
    setDialogMessage("Validando estudiante...");

    try {
      const response = await axios.get(
        `http://localhost:8080/api/dataUniversidad/existencia?cedula=${cedula}`
      );
      setEstudiante(response.data);
      validateEstudiante(response.data);
    } catch (error) {
      console.error("Error fetching estudiante:", error);
      setDialogMessage("Error al validar el estudiante.");
      navigate("/");
      setIsLoading(false);
    }
  };

  const validateEstudiante = (estudiante) => {
    setIsLoading(false);
    if (estudiante.matricula) {
      setDialogMessage(
        "El estudiante se encuentra matriculado en la base de datos"
      );
    } else {
      setDialogMessage(
        "El estudiante no se encuentra matriculado en la base de datos"
      );
      setTimeout(() => navigate("/"), 2000); // Navega después de 2 segundos
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    if (tipoUsuario === "estudiante") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [tipoUsuario]);

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

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          <DialogContentText>
            {isLoading ? (
              <div className="flex items-center">
                <CircularProgress size={24} className="mr-2" />
                {dialogMessage}
              </div>
            ) : (
              dialogMessage
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!isLoading && (
            <Button onClick={handleDialogClose} color="primary">
              Cerrar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
