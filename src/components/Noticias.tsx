import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 


const noticiasData = [
  {
    id: 1,
    titulo: "Lanzamiento de React 19",
    texto: "Se anunciaron nuevas características para Server Components y mejoras en el rendimiento del rendering.",
    imagen: "https://via.placeholder.com/600x300/67e8f9/0f172a?text=React+19", // cyan-400
  },
  {
    id: 2,
    titulo: "Avances en IA y Ética",
    texto: "Expertos debaten sobre la regulación y los desafíos éticos en el desarrollo de grandes modelos de lenguaje.",
    imagen: "https://via.placeholder.com/600x300/c026d3/0f172a?text=IA+y+%C3%89tica", // fuchsia-700
  },
  {
    id: 3,
    titulo: "El auge de TypeScript",
    texto: "Un estudio revela que TypeScript es ahora el lenguaje más demandado por las startups de tecnología.",
    imagen: "web.svg", // green-400
  },
];

const Noticias = () => {
  const carruselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = noticiasData.length;

  // --- Función para la animación de transición ---
  const animateCarousel = useCallback((index: number) => {
    if (carruselRef.current) {
      // Calcula el desplazamiento: (índice * 100%)
      const xOffset = -index * 100;

      gsap.to(carruselRef.current, {
        x: `${xOffset}%`, // Anima la propiedad 'x' (translateX)
        duration: 0.6,
        ease: "power2.out", // Transición suave y rápida
      });
    }
  }, []);

  // --- Handlers de Navegación ---

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % totalItems;
    setCurrentIndex(nextIndex);
    animateCarousel(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
    setCurrentIndex(prevIndex);
    animateCarousel(prevIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    animateCarousel(index);
  };

  // Efecto para la carga inicial (si quieres una animación)
  useEffect(() => {
    // Inicializa la posición a 0 al cargar
    gsap.set(carruselRef.current, { x: 0 });
  }, []);


  return (
    <section className="p-8 min-h-max">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-cyan-400 text-center">
          Últimas Novedades
        </h2>

        {/* --- Contenedor Principal del Carrusel --- */}
        <div className="relative overflow-hidden rounded-xl shadow-2xl ">

          {/* 1. Track de Elementos: Animado por GSAP */}
          <div
            ref={carruselRef}
            className="flex w-full"
            style={{ width: `${totalItems * 100}%` }} // Asegura que el ancho es suficiente para todos los slides
          >
            {noticiasData.map((noticia) => (
              <div key={noticia.id} className="w-full flex-shrink-0 p-6 md:p-8">
                <article className="flex flex-col md:flex-row gap-6 items-center">
                  <img
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    className="w-96 md:w-96 h-auto object-cover rounded-lg shadow-lg "
                  />
                  <div className="w-96 text-gray-200">
                    <h3 className="text-3xl font-bold mb-3 text-cyan-400">
                      {noticia.titulo}
                    </h3>
                    <p className="text-lg leading-relaxed ">{noticia.texto}</p>
                    <button className="mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 transition-colors text-white font-semibold rounded-md shadow-md">
                      Leer más
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* 2. Controles de Navegación (Flechas) */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-gray-900/60 text-cyan-400 rounded-full hover:bg-gray-700/80 transition-all z-20"
            aria-label="Noticia Anterior"
          >
            <FaChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-gray-900/60 text-cyan-400 rounded-full hover:bg-gray-700/80 transition-all z-20"
            aria-label="Noticia Siguiente"
          >
            <FaChevronRight size={24} />
          </button>
        </div>

        {/* 3. Indicadores de Posición (Dots) */}
        <div className="flex justify-center gap-2 mt-6">
          {noticiasData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                    ? 'bg-cyan-400 scale-125 shadow-md' // Dot activo
                    : 'bg-gray-600 hover:bg-gray-400' // Dot inactivo
              }`}
              aria-label={`Ir a la noticia ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Noticias;