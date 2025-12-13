import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import usePageTransition from "../hooks/usePageTransition";
import EYPImage from "/E&P.png";
import InduracksImage from "/Induracks.png";
import SuperImage from "/super.png";

const Proyectos = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const proyectoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { overlayRef, showOverlay, handleTransitionClick } = usePageTransition();

  const proyectosData = [
    {
      id: 1,
      titulo: "E&P Profesionales - Remodelación Web",
      descripcion: "Remodelación completa del sitio web de una empresa nacional de construcción, mejorando la imagen, rendimiento y funcionalidades de contacto.",
      empresa: "E&P Profesionales",
      periodo: "Agosto 2024 – Diciembre 2024",
      url: "https://www.eypprofesionales.com/",
      tecnologias: ["JavaScript", "React", "Tailwind CSS", "EmailJS"],
      responsabilidades: [
        "Rediseño de interfaz para una imagen fresca y llamativa",
        "Optimización del rendimiento de la página",
        "Implementación de sistema de contacto por correo electrónico",
        "Desarrollo de la vista del cliente"
      ],
      imagen: EYPImage,
      categoria: "Web Development",
      link: "/proyectos/eyp-profesionales"
    },
    {
      id: 2,
      titulo: "Induracks - Desarrollo Web desde Cero",
      descripcion: "Desarrollo completo de sitio web para empresa de estanterías industriales, representando su identidad corporativa y mostrando sus productos.",
      empresa: "Induracks",
      periodo: "Octubre 2025 – Diciembre 2025",
      url: "https://induracks.com/",
      tecnologias: ["JavaScript", "React", "Tailwind CSS", "Framer Motion"],
      responsabilidades: [
        "Desarrollo del sitio web desde cero",
        "Creación de estilo representativo de la marca",
        "Implementación de catálogo de productos",
        "Animaciones y efectos visuales para mejor experiencia"
      ],
      imagen: InduracksImage,
      categoria: "Web Development",
      link: "/proyectos/induracks"
    },
    {
      id: 3,
      titulo: "Supersalud - Automatización de Inventarios",
      descripcion: "Creación de sistema automatizado de inventarios y optimización de flujos de trabajo mediante scripts personalizados.",
      empresa: "Supersalud",
      periodo: "2025",
      url: null,
      tecnologias: ["Python", "Excel", "Automatización"],
      responsabilidades: [
        "Desarrollo de scripts para automatización de inventarios",
        "Optimización de flujos de trabajo",
        "Facilitación de gestión documental",
        "Automatización de registro de información"
      ],
      imagen: SuperImage,
      categoria: "Automatización",
      link: "/proyectos/supersalud"
    }
  ];

  useEffect(() => {
    if (sectionRef.current && titleRef.current) {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      );

      tl.fromTo(
          proyectoRefs.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.7)"
          },
          "-=0.4"
      );
    }

    proyectoRefs.current.forEach((card) => {
      if (!card) return;

      const mouseEnterHandler = () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });

        const techContainer = card.querySelector('.tech-container');
        if (techContainer) {
          gsap.fromTo(
              techContainer.children,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.out"
              }
          );
        }
      };

      const mouseLeaveHandler = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      card.addEventListener("mouseenter", mouseEnterHandler);
      card.addEventListener("mouseleave", mouseLeaveHandler);

      return () => {
        card.removeEventListener("mouseenter", mouseEnterHandler);
        card.removeEventListener("mouseleave", mouseLeaveHandler);
      };
    });
  }, []);

  const getCategoryColor = (categoria: string) => {
    const colors: { [key: string]: string } = {
      "Web Development": "bg-blue-900/30 text-blue-300 border-blue-700/30",
      "Mobile Development": "bg-purple-900/30 text-purple-300 border-purple-700/30",
      "Automatización": "bg-green-900/30 text-green-300 border-green-700/30",
    };
    return colors[categoria] || "bg-gray-800/30 text-gray-300 border-gray-700/30";
  };

  const getTechColor = (tech: string) => {
    const colors: { [key: string]: string } = {
      "JavaScript": "bg-yellow-900/40 text-yellow-200",
      "React": "bg-blue-900/40 text-blue-200",
      "TypeScript": "bg-blue-800/40 text-blue-200",
      "Tailwind CSS": "bg-teal-900/40 text-teal-200",
      "Python": "bg-yellow-900/40 text-yellow-200",
      "Flutter": "bg-sky-900/40 text-sky-200",
      "React Native": "bg-cyan-900/40 text-cyan-200",
      "Firebase": "bg-orange-900/40 text-orange-200",
      "Dart": "bg-blue-900/40 text-blue-200",
      "Framer Motion": "bg-pink-900/40 text-pink-200",
      "EmailJS": "bg-red-900/40 text-red-200",
      "Excel": "bg-green-900/40 text-green-200",
      "Automatización": "bg-emerald-900/40 text-emerald-200"
    };
    return colors[tech] || "bg-gray-800/40 text-gray-200";
  };

  const handleCardClick = (url: string | null, e: React.MouseEvent) => {
    if (url) {
      e.preventDefault();
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
      <>
        {showOverlay && (
            <div
                ref={overlayRef}
                className="fixed z-50 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full pointer-events-none"
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
            className="relative w-full min-h-screen py-12 sm:py-16 md:py-20 lg:py-24
                   px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20
                   bg-gradient-to-b from-black via-gray-950 to-black
                   overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-cyan-900/10 to-transparent" />
            <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-fuchsia-900/10 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2
                  ref={titleRef}
                  className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold
                       bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent
                       mb-4 sm:mb-6 drop-shadow-2xl"
              >
                Proyectos Destacados
              </h2>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-4">
                Experiencia profesional en desarrollo web, móvil y automatización
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {proyectosData.map((proyecto, index) => (
                  <article
                      key={proyecto.id}
                      ref={(el) => {
                        if (el) proyectoRefs.current[index] = el;
                      }}
                      className="group relative bg-gradient-to-br from-gray-900/50 to-fuchsia-900/20
                         backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8
                         border border-gray-800/50 hover:border-cyan-500/50
                         shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-cyan-500/10
                         transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium 
                                 border ${getCategoryColor(proyecto.categoria)}`}>
                    {proyecto.categoria}
                  </span>
                    </div>

                    <div className="relative mb-6 sm:mb-8 overflow-hidden rounded-xl sm:rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                      <img
                          src={proyecto.imagen}
                          alt={proyecto.empresa}
                          className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl sm:rounded-2xl
                             group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <div className="text-white font-bold text-lg sm:text-xl">{proyecto.empresa}</div>
                      </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2
                                 group-hover:text-cyan-300 transition-colors duration-300">
                          {proyecto.titulo}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                          {proyecto.descripcion}
                        </p>
                      </div>

                      <div className="tech-container flex flex-wrap gap-2">
                        {proyecto.tecnologias.map((tech, i) => (
                            <span
                                key={i}
                                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium 
                                 ${getTechColor(tech)} opacity-0`}
                            >
                        {tech}
                      </span>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-gray-800/50">
                        {proyecto.url ? (
                            <button
                                onClick={(e) => handleCardClick(proyecto.url, e)}
                                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300
                               font-medium text-sm sm:text-base transition-colors duration-300
                               group/link"
                            >
                              <span>Visitar sitio web</span>
                              <svg
                                  className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </button>
                        ) : (
                            <Link
                                to={proyecto.link || "#"}
                                onClick={(e) => proyecto.link ? handleTransitionClick(e, proyecto.link!) : e.preventDefault()}
                                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300
                               font-medium text-sm sm:text-base transition-colors duration-300
                               group/link"
                            >
                              <span>Ver detalles del proyecto</span>
                              <svg
                                  className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                        )}
                      </div>
                    </div>
                  </article>
              ))}
            </div>

            <div className="mt-12 sm:mt-16 md:mt-20 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8
                         bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8
                         border border-gray-800/50">
                <div className="text-center sm:text-left">
                  <p className="text-gray-400 text-sm sm:text-base">
                    Mostrando <span className="text-cyan-400 font-bold">{proyectosData.length}</span> proyectos profesionales
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Cada proyecto incluye tecnologías específicas y soluciones personalizadas
                  </p>
                </div>

                <div className="hidden sm:block h-10 w-px bg-gray-700" />

                <Link
                    to="/proyects"
                    onClick={(e) => handleTransitionClick(e, "/proyects")}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-fuchsia-600
                         text-white font-medium rounded-full hover:scale-105
                         transition-transform duration-300 text-sm sm:text-base"
                >
                  Ver todos los proyectos
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
  );
};

export default Proyectos;