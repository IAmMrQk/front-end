import Footer from "../componentes/layout/Footer";
import NavEstudiante from "../componentes/layout/NavEstudiante";
import SemestreSection from "../componentes/cursos/SemestreSection";
import { getItem } from "../utils/Services";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Cursos() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getItem("user");
    if (storedUser == null) {
      navigate("/"); // Redireccionar si no hay usuario
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  // Mostrar un componente de carga mientras se verifica el usuario
  if (user === null) {
    return null; // También puedes retornar un componente de carga si lo prefieres
  }

  const carrera = user.carrera.nombreCarrera || "n/a";
  const semestre = user.semestre || "n/a";
  const cursos = user.carrera.cursosIntegrados || [];

  // Filtrar los cursos según el semestre
  const cursosAnteriores = cursos.filter(
    (curso) => curso.semestreCurso < semestre
  );
  const cursosActuales = cursos.filter(
    (curso) => curso.semestreCurso === semestre
  );
  const cursosPosteriores = cursos.filter(
    (curso) => curso.semestreCurso > semestre
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Barra de navegación */}
      <NavEstudiante />

      {/* Contenedor principal de cursos */}
      <main className="flex-grow pt-10">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">{carrera}</h2>
          <h3 className="text-xl text-gray-700 mb-4">Semestre: {semestre}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cursos de semestres anteriores */}
            <SemestreSection
              title="Semestres Anteriores"
              cursos={cursosAnteriores}
              semestreActual={semestre}
            />

            {/* Cursos del semestre actual */}
            <SemestreSection
              title="Semestre Actual"
              cursos={cursosActuales}
              semestreActual={semestre}
            />

            {/* Cursos de semestres posteriores */}
            <SemestreSection
              title="Semestres Posteriores"
              cursos={cursosPosteriores}
              semestreActual={semestre}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
