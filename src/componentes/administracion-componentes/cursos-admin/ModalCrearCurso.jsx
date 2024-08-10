import { useState } from "react";
import { useDispatch } from "react-redux";
import { agregarCurso } from "../../../app/slices/CursosSlice";

export default function ModalCrearCurso({ isOpen, onClose }) {
  const disparador = useDispatch();

  const [curso, setCurso] = useState({
    nombreCurso: "",
    fechaInicio: "",
    fechaFinalizacion: "",
    semestreCurso: "",
    contenido: "",
  });

  const obtenerDatos = (e) => {
    const { name, value } = e.target;
    setCurso({
      ...curso,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    disparador(agregarCurso(curso));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Crear Nuevo Curso
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
              Nombre del Curso
            </label>
            <input
              type="text"
              name="nombreCurso"
              value={curso.nombreCurso}
              onChange={obtenerDatos}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Fecha de Inicio
            </label>
            <input
              type="date"
              name="fechaInicio"
              value={curso.fechaInicio}
              onChange={obtenerDatos}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Fecha de Finalización
            </label>
            <input
              type="date"
              name="fechaFinalizacion"
              value={curso.fechaFinalizacion}
              onChange={obtenerDatos}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Semestre del Curso
            </label>
            <input
              type="number"
              name="semestreCurso"
              value={curso.semestreCurso}
              onChange={obtenerDatos}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Contenido del Curso
            </label>
            <textarea
              name="contenido"
              value={curso.contenido}
              onChange={obtenerDatos}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
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
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
