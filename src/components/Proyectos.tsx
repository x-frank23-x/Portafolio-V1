import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import usePageTransition from "../hooks/usePageTransition";
import EYPImage from "/E&P.png";
import InduracksImage from "/Induracks.png";
import SuperImage from "/super.png";

const proyectosData = [
  {
    id: 1,
    titulo: "E&P Profesionales - Remodelación Web",
    descripcion:
      "Remodelación completa del sitio web de una empresa nacional de construcción, mejorando la imagen, rendimiento y funcionalidades de contacto.",
    empresa: "E&P Profesionales",
    periodo: "2024.08 – 2024.12",
    url: "https://www.eypprofesionales.com/",
    tecnologias: ["JavaScript", "React", "Tailwind CSS", "EmailJS"],
    imagen: EYPImage,
    categoria: "web_dev",
    link: "/proyectos/eyp-profesionales"
  },
  {
    id: 2,
    titulo: "Induracks - Desarrollo Web desde Cero",
    descripcion:
      "Desarrollo completo de sitio web para empresa de estanterías industriales, representando su identidad corporativa y mostrando sus productos.",
    empresa: "Induracks",
    periodo: "2025.10 – 2025.12",
    url: "https://induracks.com/",
    tecnologias: ["JavaScript", "React", "Tailwind CSS", "Framer Motion"],
    imagen: InduracksImage,
    categoria: "web_dev",
    link: "/proyectos/induracks"
  },
  {
    id: 3,
    titulo: "Supersalud - Automatización de Inventarios",
    descripcion:
      "Creación de sistema automatizado de inventarios y optimización de flujos de trabajo mediante scripts personalizados.",
    empresa: "Supersalud",
    periodo: "2025",
    url: null,
    tecnologias: ["Python", "Excel", "Automatización"],
    imagen: SuperImage,
    categoria: "automatizacion",
    link: "/proyectos/supersalud"
  }
];

// Un solo criterio de color: lenguajes/frameworks = celeste, resto = morado
const getTechColor = (tech: string) => {
  const celeste = new Set([
    "JavaScript",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Python"
  ]);
  return celeste.has(tech)
    ? "text-[#5ec8f0] border-[#5ec8f0]/25"
    : "text-[#9b7fe6] border-[#9b7fe6]/25";
};

const Proyectos = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const proyectoRefs = useRef<(HTMLElement | null)[]>([]);
  const { overlayRef, showOverlay, handleTransitionClick } =
    usePageTransition();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (sectionRef.current && titleRef.current && !prefersReducedMotion) {
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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      tl.fromTo(
        proyectoRefs.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" },
        "-=0.4"
      );
    } else if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 1 });
      gsap.set(proyectoRefs.current, { opacity: 1 });
    }

    // Cleanup real: guardamos las funciones para removerlas después, no dentro del forEach
    const cleanupFns: Array<() => void> = [];

    if (!prefersReducedMotion) {
      proyectoRefs.current.forEach((card) => {
        if (!card) return;

        const onEnter = () =>
          gsap.to(card, {
            y: -6,
            borderColor: "rgba(155,127,230,0.5)",
            duration: 0.3
          });
        const onLeave = () =>
          gsap.to(card, {
            y: 0,
            borderColor: "rgba(255,255,255,0.1)",
            duration: 0.3
          });

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        cleanupFns.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    return () => cleanupFns.forEach((fn) => fn());
  }, []);

  const handleCardClick = (url: string | null, e: React.MouseEvent) => {
    if (url) {
      e.preventDefault();
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {showOverlay && (
        <div
          ref={overlayRef}
          className="fixed z-50 bg-[#9b7fe6] rounded-full pointer-events-none"
          style={{ left: -20, top: -20, width: "20px", height: "20px" }}
        />
      )}

      <section
        ref={sectionRef}
        className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24
                   px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20
                   overflow-hidden text-[#d6d3e6]"
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header tipo bitácora, mismo patrón que Noticias y la página de Proyectos */}
          <div
            ref={titleRef}
            className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-10 sm:mb-14"
          >
            <div className="flex items-baseline gap-3">
              <span
                className="text-[#5ec8f0] text-sm tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                $
              </span>
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-white"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                cat ~/proyectos/destacados
              </h2>
              <span className="text-[#5ec8f0] animate-pulse text-xl leading-none">
                _
              </span>
            </div>
            <span
              className="hidden md:block text-xs text-white/30 tracking-wider"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              web · móvil · automatización
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {proyectosData.map((proyecto, index) => (
              <article
                key={proyecto.id}
                ref={(el) => {
                  proyectoRefs.current[index] = el;
                }}
                className="group relative bg-white/2 border border-white/10 p-5
                           transition-colors duration-300 overflow-hidden"
              >
                <div
                  className="flex items-center justify-between mb-3 text-xs tracking-widest"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  <span className="text-[#5ec8f0]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white/30">[{proyecto.categoria}]</span>
                </div>

                <div className="relative mb-5 overflow-hidden h-44 sm:h-52 border border-white/5">
                  <img
                    src={proyecto.imagen}
                    alt={proyecto.empresa}
                    className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-3 left-3">
                    <span
                      className="text-white font-medium text-base"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {proyecto.empresa}
                    </span>
                  </div>
                </div>

                <h3
                  className="text-lg font-medium text-white mb-2 group-hover:text-[#9b7fe6] transition-colors duration-300"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {proyecto.titulo}
                </h3>

                <span
                  className="block text-xs text-white/30 mb-3"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {proyecto.periodo}
                </span>

                <p className="text-sm text-[#d6d3e6]/70 leading-relaxed mb-4">
                  {proyecto.descripcion}
                </p>

                {/* Tags siempre visibles — sin depender del hover para accesibilidad */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proyecto.tecnologias.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-0.5 text-[11px] border ${getTechColor(tech)}`}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      #{tech.toLowerCase().replace(/\s+/g, "_")}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/5">
                  {proyecto.url ? (
                    <button
                      onClick={(e) => handleCardClick(proyecto.url, e)}
                      className="inline-flex items-center gap-2 text-[#5ec8f0] hover:text-[#9b7fe6]
                               text-sm transition-colors duration-300 focus-visible:outline-none
                               focus-visible:ring-1 focus-visible:ring-[#5ec8f0] rounded-sm"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      visitar_sitio <span aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <Link
                      to={proyecto.link}
                      onClick={(e) => handleTransitionClick(e, proyecto.link)}
                      className="inline-flex items-center gap-2 text-[#5ec8f0] hover:text-[#9b7fe6]
                               text-sm transition-colors duration-300 focus-visible:outline-none
                               focus-visible:ring-1 focus-visible:ring-[#5ec8f0] rounded-sm"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      ver_detalles <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* CTA final como status bar, mismo criterio que el resto de las secciones */}
          <div className="mt-10 sm:mt-14 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <p className="text-sm text-white/60">
                mostrando <span className="text-[#5ec8f0]">3</span> de{" "}
                <span className="text-[#5ec8f0]">7</span> proyectos
              </p>
              <p className="text-xs text-white/30 mt-1">
                cada uno incluye stack técnico y responsabilidades detalladas
              </p>
            </div>

            <Link
              to="/proyects"
              onClick={(e) => handleTransitionClick(e, "/proyects")}
              className="px-5 py-2.5 border border-[#9b7fe6]/40 text-[#9b7fe6] text-sm
                       hover:bg-[#9b7fe6]/10 hover:border-[#9b7fe6] transition-colors duration-300
                       focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5ec8f0]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              ver_todos --all
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Proyectos;
