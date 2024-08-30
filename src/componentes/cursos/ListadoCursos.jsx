import { useEffect, useState } from "react";
import CartaCurso from "./CartaCursos";
import ModalCrearCurso from "../administracion-componentes/cursos-admin/ModalCrearCurso";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCurso } from "../../app/slices/CursosSlice";

export default function ListadoCursos() {

  const [modalOpen, setModalOpen] = useState(false);
  const disparador = useDispatch();
  const cursos = useSelector((state) => state.cursos.list);

  const crearnuevaCurso = () => {
    console.log("Crear nuevo curso");
    setModalOpen(true);
  };

  useEffect(() => {
    const obtenerCursos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/Cursos/Lista_Cursos"
        );
        disparador(setCurso(response.data));
      } catch (error) {
        console.error("Error al obtener los cursos", error);
      }
    };
    obtenerCursos();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <header>
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Lista de Cursos
          </h1>
          <div className="flex justify-center mb-6">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={crearnuevaCurso}
            >
              Agregar Nuevo curso
            </button>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cursos.map((curso) => (
          <CartaCurso key={curso.idCurso} curso={curso} />
        ))}
      </div>
      <ModalCrearCurso isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
