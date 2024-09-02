import { useDispatch, useSelector } from "react-redux";
import { actualizarEstudiante } from "../../../app/slices/EstudiantesSlice";
import { FaArrowsRotate } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { setEstudiantes } from "../../../app/slices/EstudiantesSlice";
import axios from "axios";

export default function TablaEstudiantes() {
  const estudiantes = useSelector((state) => state.estudiantes.list);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const handleToggleActive = (id) => {
    setOpenDialog(true);
    setTimeout(async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/Estudiantes/invertirMatricula/${id}`
        );

        dispatch(
          actualizarEstudiante({ id, matricula: response.data.matricula })
        );
      } catch (error) {
        console.error("Error al actualizar el estado de matrícula", error);
      } finally {
        setOpenDialog(false);
      }
    }, 3000);
  };

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/Estudiantes/Lista_Estudiantes"
        );
        dispatch(setEstudiantes(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchEstudiantes();
  }, [dispatch]);

  // Filtrar los estudiantes para mostrar solo los que tienen rol 'ESTUDIANTE'
  const estudiantesFiltrados = estudiantes.filter(
    (estudiante) => estudiante.rol === "ESTUDIANTE"
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Tabla de Estudiantes
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-3 border-b border-gray-300 text-left">
                ID
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-left">
                Nombre
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-left">
                Apellido
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-left">
                Correo
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-left">
                Nombre Usuario
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-left">
                Teléfono
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-left">
                Activo
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-left">
                Carrera
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-left">
                Rol
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-left">
                Semestre
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {estudiantesFiltrados.map((estudiante) => (
              <tr
                key={estudiante.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 border-b border-gray-300">
                  {estudiante.id}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {estudiante.nombre}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {estudiante.apellido}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {estudiante.correo}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {estudiante.nombreUsuario}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {estudiante.telefono}
                </td>
                <td className="px-4 py-3 border-b border-gray-300 flex items-center">
                  <p>{estudiante.matricula ? "Sí" : "No"}</p>
                  <button
                    className={`p-2 rounded-xl m-2 ${
                      estudiante.matricula
                        ? "bg-red-500 text-white"
                        : "bg-green-700 text-white"
                    }`}
                    onClick={() => handleToggleActive(estudiante.idUsuario)}
                  >
                    <FaArrowsRotate size={20} />
                  </button>
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {estudiante.carrera
                    ? estudiante.carrera.nombreCarrera
                    : "N/A"}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {estudiante.rol}
                </td>
                <td className="px-4 py-3 border-b border-gray-300">
                  {estudiante.semestre}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle className="font-bold text-center text-lg">
          Esto tomará unos segundos...
        </DialogTitle>
        <DialogContent className="flex flex-col items-center justify-center min-h-[100px]">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
          <p className="text-center text-gray-700">
            Cambiando el estado del estudiante...
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
