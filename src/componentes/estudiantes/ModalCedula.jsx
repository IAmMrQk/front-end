/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalCedula = ({ isOpen, onClose, onSubmit }) => {
  const [cedula, setCedula] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cedula);
    setCedula(""); // Limpiar el campo de entrada
    onClose(); // Cerrar el modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-6">Ingrese la Cédula</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="cedula"
              className="block text-gray-700 mb-2 text-lg"
            >
              Cédula
            </label>
            <input
              type="text"
              id="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
              onClick={() => {
                navigate("/");
              }}
            >
              Regresar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCedula;
