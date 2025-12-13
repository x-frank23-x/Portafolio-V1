import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import usePageTransition from "../hooks/usePageTransition";

const Proyectos = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const proyectoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { overlayRef, showOverlay, handleTransitionClick } = usePageTransition();

  // Data de proyectos actualizada
  const proyectosData = [
    {
      id: 1,
      titulo: "E&P Profesionales - Desarrollo Web",
      imgSrc: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Proyecto E&P Profesionales",
      descripcion: "Remodelación completa del sitio web empresarial con React, Tailwind CSS y EmailJS. Mejora de rendimiento y sistema de contacto.",
      tecnologias: ["React", "Tailwind CSS", "TypeScript", "EmailJS"],
      link: "/proyects",
      categoria: "Web Development",
      empresa: "E&P Profesionales"
    },
    {
      id: 2,
      titulo: "Induracks - Desarrollo Web Integral",
      imgSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Proyecto Induracks",
      descripcion: "Desarrollo desde cero de sitio web para empresa de estanterías industriales. Diseño representativo y catálogo de productos.",
      tecnologias: ["React", "Tailwind CSS", "Framer Motion", "JavaScript"],
      link: "/proyects",
      categoria: "Web Development",
      empresa: "Induracks"
    },
    {
      id: 3,
      titulo: "Supersalud - Automatización",
      imgSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Proyecto Supersalud",
      descripcion: "Sistema automatizado de inventarios y optimización de flujos de trabajo mediante scripts personalizados en Python.",
      tecnologias: ["Python", "Excel", "Automatización"],
      link: "/proyects",
      categoria: "Automatización",
      empresa: "Supersalud"
    },

  ];

  // Animaciones GSAP
  useEffect(() => {
    gsap.registerPlugin();

    // Animación de entrada de la sección
    if (sectionRef.current && titleRef.current) {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Animación del título
      tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      );

      // Animación de las tarjetas
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

    // Efectos hover para tarjetas
    proyectoRefs.current.forEach((card, index) => {
      if (!card) return;

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });

        // Animación de tecnologías
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
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    return () => {
      proyectoRefs.current.forEach(card => {
        if (card) {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        }
      });
    };
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
      "Automatización": "bg-emerald-900/40 text-emerald-200",
      "JavaScript": "bg-yellow-800/40 text-yellow-200"
    };
    return colors[tech] || "bg-gray-800/40 text-gray-200";
  };

  return (
      <>
        {/* Overlay del círculo */}
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
          {/* Efectos de fondo */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-cyan-900/10 to-transparent" />
            <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-fuchsia-900/10 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Título */}
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

            {/* Grid de proyectos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
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
                         transition-all duration-300 overflow-hidden"
                  >
                    {/* Efecto de brillo al hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    {/* Badge de categoría */}
                    <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium 
                                 border ${getCategoryColor(proyecto.categoria)}`}>
                    {proyecto.categoria}
                  </span>
                    </div>

                    {/* Imagen del proyecto */}
                    <div className="relative mb-6 sm:mb-8 overflow-hidden rounded-xl sm:rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                      <img
                          src={proyecto.imgSrc}
                          alt={proyecto.alt}
                          className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl sm:rounded-2xl
                             group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <div className="text-white font-bold text-lg sm:text-xl">{proyecto.empresa}</div>
                      </div>
                    </div>

                    {/* Contenido */}
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

                      {/* Tecnologías */}
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

                      {/* Enlace */}
                      <div className="pt-4 border-t border-gray-800/50">
                        <Link
                            to={proyecto.link}
                            onClick={(e) => handleTransitionClick(e, proyecto.link)}
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
                      </div>
                    </div>
                  </article>
              ))}
            </div>

            {/* Footer informativo */}
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
                    to="/proyectos"
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