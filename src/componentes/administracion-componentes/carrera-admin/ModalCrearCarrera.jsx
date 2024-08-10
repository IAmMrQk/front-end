import { useState } from "react";
import { useDispatch } from "react-redux";
import { agregarCarrera } from "../../../app/slices/CarreraSlice";

export default function ModalCrearCarrera({ isOpen, onClose }) {
  const disparador = useDispatch();

  const [carreras, setCarreras] = useState({
    nombreCarrera: "",
    duracion: "",
    descripcion: "",
    facultad: "",
    nivel: "",
  });

  const obtenerDatos = (e) => {
    setCarreras({
      ...carreras,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    disparador(agregarCarrera(carreras));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Crear Nueva Carrera
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
              value={carreras.nombreCarrera}
              onChange={obtenerDatos}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Duración
            </label>
            <input
              type="text"
              name="duracion"
              value={carreras.duracion}
              onChange={obtenerDatos}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={carreras.descripcion}
              onChange={obtenerDatos}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Facultad
            </label>
            <input
              type="text"
              name="facultad"
              value={carreras.facultad}
              onChange={obtenerDatos}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Nivel
            </label>
            <input
              type="text"
              name="nivel"
              value={carreras.nivel}
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
