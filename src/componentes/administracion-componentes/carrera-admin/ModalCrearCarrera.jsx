/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  agregarCarrera,
  actualizarCarrera,
} from "../../../app/slices/CarreraSlice";

export default function ModalCrearCarrera({ isOpen, onClose, carrera }) {
  const dispatch = useDispatch();

  const [carreraData, setCarreraData] = useState({
    nombreCarrera: "",
    cantidadSemestre: "",
    cursosIntegrados: [],
  });

  const [cursosDisponibles, setCursosDisponibles] = useState([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // Obtener la lista de cursos disponibles
      axios
        .get("http://localhost:8080/api/Cursos/Lista_Cursos")
        .then((response) => setCursosDisponibles(response.data))
        .catch((error) => console.error("Error al obtener cursos:", error));
    }

    if (carrera) {
      setCarreraData(carrera);
      setCursosSeleccionados(carrera.cursosIntegrados);
    } else {
      setCarreraData({
        nombreCarrera: "",
        cantidadSemestre: "",
        cursosIntegrados: [],
      });
      setCursosSeleccionados([]);
    }
  }, [carrera, isOpen]);

  const obtenerDatos = (e) => {
    setCarreraData({
      ...carreraData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCursoAgregar = (curso) => {
    setCursosSeleccionados([...cursosSeleccionados, curso]);
    setCursosDisponibles(
      cursosDisponibles.filter((c) => c.idCurso !== curso.idCurso)
    );
  };

  const handleCursoEliminar = (curso) => {
    setCursosDisponibles([...cursosDisponibles, curso]);
    setCursosSeleccionados(
      cursosSeleccionados.filter((c) => c.idCurso !== curso.idCurso)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...carreraData,
        cursosIntegrados: cursosSeleccionados,
      };

      if (carrera) {
        // Lógica para actualizar una carrera existente
        const response = await axios.put(
          `http://localhost:8080/api/Carreras/Editar_Carrera/${carrera.idCarrera}`,
          dataToSubmit
        );
        dispatch(actualizarCarrera(response.data));
      } else {
        // Lógica para crear una nueva carrera
        const response = await axios.post(
          "http://localhost:8080/api/Carreras/Guardar_Carrera",
          dataToSubmit
        );
        dispatch(agregarCarrera(response.data));
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar carrera:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {carrera ? "Editar Carrera" : "Crear Nueva Carrera"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Nombre de la Carrera
            </label>
            <input
              type="text"
              name="nombreCarrera"
              value={carreraData.nombreCarrera}
              onChange={obtenerDatos}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Cantidad de Semestres
            </label>
            <input
              type="number"
              name="cantidadSemestre"
              value={carreraData.cantidadSemestre}
              onChange={obtenerDatos}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Cursos Disponibles
            </label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg">
              {cursosDisponibles.map((curso) => (
                <div
                  key={curso.idCurso}
                  className="flex items-center justify-between p-2 border-b border-gray-200"
                >
                  <span>{curso.nombreCurso}</span>
                  <button
                    type="button"
                    onClick={() => handleCursoAgregar(curso)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Agregar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Cursos Seleccionados
            </label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg">
              {cursosSeleccionados.map((curso) => (
                <div
                  key={curso.idCurso}
                  className="flex items-center justify-between p-2 border-b border-gray-200"
                >
                  <span>{curso.nombreCurso}</span>
                  <button
                    type="button"
                    onClick={() => handleCursoEliminar(curso)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
            >
              {carrera ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
