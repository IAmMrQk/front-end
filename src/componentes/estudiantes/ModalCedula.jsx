import { useState } from "react";

const ModalCedula = ({ isOpen, onClose, onSubmit }) => {
  const [cedula, setCedula] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cedula);
    setCedula(""); // Clear the input field
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-4">Ingrese la Cédula</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cedula" className="block text-gray-700 mb-2">
              Cédula
            </label>
            <input
              type="text"
              id="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
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
