import { useState } from "react";
import FormUsuario from "../componentes/comunes/FormUsuario";

export default function Registro() {
  const [tipoUsuario, setTipoUsuario] = useState("estudiante");
  const renderizarComponentes = () => {
    switch (tipoUsuario) {
      case "estudiante":
        return <FormUsuario tipoUsuario="estudiante" />;
      case "profesor":
        return <FormUsuario tipoUsuario="profesor" />;
      default:
        break;
    }
  };

  const seleccionTipo = (evento) => {
    setTipoUsuario(evento.target.value);
  };

  return (
    <div>
      <form className="flex justify-center mb-6">
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
              tipoUsuario === "estudiante" ? "font-semibold" : ""
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
          />
          <label
            className={`ml-2 cursor-pointer text-gray-700 ${
              tipoUsuario === "profesor" ? "font-semibold" : ""
            }`}
            htmlFor="profesor"
          >
            Profesor
          </label>
        </div>
      </form>
      <div>{renderizarComponentes()}</div>
    </div>
  );
}
