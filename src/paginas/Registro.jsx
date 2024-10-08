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
  Snackbar,
} from "@mui/material";
import { getItem } from "../utils/Services";

export default function Registro() {
  let navigate = useNavigate();
  useEffect(() => {
    const user = getItem("user");
    if (user != null) {
      navigate("/Estudiantes"); // Redireccionar si no hay usuario
    }
  }, [navigate]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const seleccionTipo = (evento) => {
    setTipoUsuario(evento.target.value);
  };

  const handleModalSubmit = (cedula) => {
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
      setIsLoading(false);
      setSnackbarMessage("Cédula no válida. Por favor, intente de nuevo.");
      setSnackbarOpen(true);
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
      setSnackbarMessage("Estudiante no matriculado.");
      setSnackbarOpen(true);
    }
  };

  const renderizarComponentes = () => {
    return <FormUsuario tipoUsuario={tipoUsuario} estudianteDB={estudiante} />;
  };

  useEffect(() => {
    if (tipoUsuario === "estudiante") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [tipoUsuario]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setIsModalOpen(true); // Reabrir el modal si hubo un error en la validación
  };

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
                    tipoUsuario === "estudiante"
                      ? "font-semibold text-blue-600"
                      : ""
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
                    tipoUsuario === "profesor"
                      ? "font-semibold text-blue-600"
                      : ""
                  }`}
                  htmlFor="profesor"
                >
                  Profesor
                </label>
              </div>
            </form>
          </div>
          <div className="flex justify-center">{renderizarComponentes()}</div>
        </div>
      </main>
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
            <div>
              <Button onClick={handleDialogClose} color="primary">
                Cerrar
              </Button>
            </div>
          )}
        </DialogActions>
      </Dialog>
      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
}
