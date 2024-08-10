import { useState } from "react";
import CartaCarrera from "./cartaCarrera";
import ModalCrearCarrera from "../administracion-componentes/carrera-admin/ModalCrearCarrera";
import { useSelector } from "react-redux";

export default function ListadoCarreras() {
  const carreras = useSelector((state) => state.carrera);

  const [modalOpen, setModalOpen] = useState(false);

  const crearnuevaCarrera = () => {
    console.log("Crear nueva carrera");
    setModalOpen(true);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Lista de Carreras
          </h1>
          <div className="flex justify-center mb-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={crearnuevaCarrera}
            >
              Agregar Nueva Carrera
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {carreras.map((carrera) => (
          <CartaCarrera key={carrera.idCarrera} carrera={carrera} />
        ))}
      </div>
      <ModalCrearCarrera
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
