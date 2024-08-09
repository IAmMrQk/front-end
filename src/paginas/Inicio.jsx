import Footer from "../componentes/layout/Footer";
import NavPrincipal from "../componentes/layout/NavPrincipal";

export const Inicio = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavPrincipal />

      <main className="flex-grow p-10 mt-10">
        <section className="flex justify-between">
          <div className="w-1/2">
            <h1 className="text-5xl font-bold flex justify-center my-3">
              Biblioteca De Modulos
            </h1>
            <div className="m-5">
              <p className="text-xl">
                Bienvenidos a la Universidad Remington, donde la excelencia
                académica y la innovación educativa se unen para ofrecer a
                nuestros estudiantes una experiencia de aprendizaje inigualable.
                Nos complace presentar nuestra nueva Biblioteca de Módulos, una
                herramienta revolucionaria diseñada para potenciar tu educación
                y gestionar de manera eficiente tu progreso académico. Nuestra
                Biblioteca de Módulos es una colección integral de recursos
                educativos modulares, disponibles en formato digital para que
                puedas acceder a ellos en cualquier momento y desde cualquier
                lugar. Estos módulos están cuidadosamente elaborados para
                ofrecer contenidos específicos, prácticos y actualizados que
                complementan nuestro currículo académico. Cada módulo aborda un
                tema particular y está estructurado de forma que puedas
                personalizar tu aprendizaje y profundizar en los temas que más
                te apasionan.
              </p>
            </div>
          </div>
          <div className="w-1/2 h-auto bg-slate-950 flex items-center justify-center m-2">
            <p className="text-slate-50"> Img</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
