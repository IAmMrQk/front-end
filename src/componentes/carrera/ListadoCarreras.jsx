import { useEffect, useState } from "react";
import CartaCarrera from "./cartaCarrera";
import ModalCrearCarrera from "../administracion-componentes/carrera-admin/ModalCrearCarrera";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCarrera } from "../../app/slices/CarreraSlice";

export default function ListadoCarreras() {
  const carreras = useSelector((state) => state.carrera.list);
  const disparador = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [carreraEnEdicion, setCarreraEnEdicion] = useState(null); // Nuevo estado

  const crearnuevaCarrera = () => {
    setCarreraEnEdicion(null); // Limpiar carreraEnEdicion para creación
    setModalOpen(true);
  };

  const editarCarrera = (carrera) => {
    setCarreraEnEdicion(carrera); // Establecer la carrera en edición
    setModalOpen(true);
  };

  useEffect(() => {
    const obtenerCarreras = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/Carreras/Lista_Carreras"
        );
        disparador(setCarrera(response.data));
      } catch (error) {
        console.error("Error al obtener las carreras", error);
      }
    };

    obtenerCarreras();
  }, []);

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
          <CartaCarrera
            key={carrera.idCarrera}
            carrera={carrera}
            onEditar={() => editarCarrera(carrera)} // Pasar la función editarCarrera
          />
        ))}
      </div>

      <ModalCrearCarrera
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        carrera={carreraEnEdicion} // Pasar la carrera en edición al modal
      />
    </div>
  );
}
