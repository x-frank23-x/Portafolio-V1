import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
// Importamos el Custom Hook para gestionar la transición
import usePageTransition from "../hooks/usePageTransition"; 

// Data de proyectos (sin cambios)
const proyectos = [
  {
    titulo: "Desarrollo web",
    imgSrc: "web.svg",
    alt: "Captura de pantalla del proyecto uno",
    descripcion:
      "Descripción breve del proyecto uno. Tecnologías usadas: React, Node.js.",
    link: "/proyectos/web",
  },
  {
    titulo: "Proyectos Moviles",
    imgSrc: "movil.svg",
    alt: "Captura de pantalla del proyecto dos",
    descripcion:
      "Descripción breve del proyecto dos. Tecnologías usadas: TypeScript, FastAPI.",
    link: "/proyectos/movil",
  },
  
];

// Imágenes al pasar el mouse (sin cambios)
const hoverImages = [
  "https://via.placeholder.com/60?text=Img1",
  "https://via.placeholder.com/60?text=Img2",
  "https://via.placeholder.com/60?text=Img3",
];

const Proyectos = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const proyectoRefs = useRef<HTMLDivElement[]>([]);
  const hoverContainers = useRef<HTMLDivElement[]>([]);

  // 👉 USAR HOOK: Sustituimos la lógica duplicada por el Custom Hook
  const { overlayRef, showOverlay, handleTransitionClick } = usePageTransition();

  // Animación inicial del componente
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    if (proyectoRefs.current.length) {
      gsap.fromTo(
        proyectoRefs.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.3,
          delay: 0.5,
        }
      );
    }
  }, []);

  // Animación hover (sin cambios)
  const handleMouseEnter = (index: number) => {
    const container = hoverContainers.current[index];
    if (!container) return;

    gsap.killTweensOf(container.children);
    gsap.to(container.children, {
      opacity: 1,
      y: 0,
      scale: 1,
      zIndex: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "back.out(1.7)",
      pointerEvents: "auto",
    });
  };

  const handleMouseLeave = (index: number) => {
    const container = hoverContainers.current[index];
    if (!container) return;

    gsap.to(container.children, {
      opacity: 0,
      y: 20,
      scale: 0.8,
      duration: 0.3,
      
      stagger: 0.1,
      ease: "power1.in",
      pointerEvents: "none",
    });
  };

  return (
    <>
      {/* Overlay del círculo (gestionado por el hook) */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className="fixed z-50 bg-cyan-400 rounded-full pointer-events-none"
          style={{
            left: -20,
            top: -20,
            width: "20px", 
            height: "20px",
          }}
        />
      )}

      <section
        ref={sectionRef}
        className="min-h-screen p-8 text-cyan-400 relative z-10"
      >
        <h2 className="text-4xl font-extrabold mb-8 drop-shadow-lg text-center">
          Mis Proyectos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proyectos.map((proyecto, i) => (
            <article
              key={i}
              ref={(el) => {
                if (el) proyectoRefs.current[i] = el;
              }}
              className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-shadow duration-300 relative overflow-visible"
            >
              {/* Contenedor imagen con hover */}
              <div
                className="relative inline-block mb-4 cursor-pointer"
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                <img
                  src={proyecto.imgSrc}
                  alt={proyecto.alt}
                  className="rounded-lg block w-36 h-auto mx-auto"
                />

                {/* Hover images */}
                <div
                  ref={(el) => {
                    if (el) hoverContainers.current[i] = el;
                  }}
                  className="absolute top-0 left-80 -translate-x-1/2 flex gap-2 pointer-events-none"
                  style={{ width: "max-content" }}
                >
                  {hoverImages.map((src, idx) => (
                    <div
                      key={idx}
                      className="bg-cyan-400 rounded-lg shadow-lg opacity-0 transform scale-75 w-24 h-32 "
                    >
                      <img
                        src={src}
                        alt={`Imagen hover ${idx + 1}`}
                        className="w-full h-full object-cover rounded-lg "
                      />
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-2 text-center">
                {proyecto.titulo}
              </h3>
              <p className="mb-4 text-center">{proyecto.descripcion}</p>
              
              {/* Aplicamos el handler del Custom Hook */}
              <Link
                to={proyecto.link}
                onClick={(e) => handleTransitionClick(e, proyecto.link)} 
                className="text-cyan-400 hover:underline block text-center"
              >
                Ver más
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default Proyectos;