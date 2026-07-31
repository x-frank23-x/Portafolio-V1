import { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import { gsap } from "gsap";

import EYPImage from "/E&P.png";
import InduracksImage from "/Induracks.png";
import SuperImage from "/super.png";
import UnidadVictimas from "/victimas.jpeg";
import Roche from "/roche.png";
import Ucc from "/ucc.jpeg";
import Findeter from "/findeter.jpeg";

const proyectosData = {
  proyectos: [
    {
      id: 1,
      slug: "eyp-profesionales",
      titulo: "E&P Profesionales - Remodelación Web",
      descripcion:
        "Remodelación completa del sitio web de una empresa nacional de construcción, mejorando la imagen, rendimiento y funcionalidades de contacto.",
      empresa: "E&P Profesionales",
      periodo: "2024.08 – 2024.12",
      url: "https://www.eypprofesionales.com/",
      tecnologias: ["JavaScript", "React", "Tailwind CSS", "EmailJS"],
      responsabilidades: [
        "Rediseño de interfaz para una imagen fresca y llamativa",
        "Optimización del rendimiento de la página",
        "Implementación de sistema de contacto por correo electrónico",
        "Desarrollo de la vista del cliente"
      ],
      imagen: EYPImage,
      categoria: "web_dev"
    },
    {
      id: 2,
      slug: "induracks",
      titulo: "Induracks - Desarrollo Web desde Cero",
      descripcion:
        "Desarrollo completo de sitio web para empresa de estanterías industriales, representando su identidad corporativa y mostrando sus productos.",
      empresa: "Induracks",
      periodo: "2025.10 – 2025.12",
      url: "https://induracks.com/",
      tecnologias: ["JavaScript", "React", "Tailwind CSS", "Framer Motion"],
      responsabilidades: [
        "Desarrollo del sitio web desde cero",
        "Creación de estilo representativo de la marca",
        "Implementación de catálogo de productos",
        "Animaciones y efectos visuales para mejor experiencia"
      ],
      imagen: InduracksImage,
      categoria: "web_dev"
    },
    {
      id: 3,
      slug: "supersalud",
      titulo: "Supersalud - Automatización de Inventarios",
      descripcion:
        "Creación de sistema automatizado de inventarios y optimización de flujos de trabajo mediante scripts personalizados.",
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
      categoria: "automatizacion"
    },
    {
      id: 4,
      slug: "unidad-victimas",
      titulo: "Unidad para las Víctimas - Mantenimiento Preventivo",
      descripcion:
        "Realización de mantenimientos preventivos a equipos de cómputo para garantizar su correcto funcionamiento.",
      empresa: "Unidad para las Víctimas",
      periodo: "2025",
      url: null,
      tecnologias: ["Mantenimiento de Hardware", "Diagnóstico de Equipos"],
      responsabilidades: [
        "Realización de mantenimiento preventivo a equipos de cómputo",
        "Diagnóstico de fallas de hardware y software",
        "Verificación del estado general de los equipos",
        "Registro y documentación de los mantenimientos realizados"
      ],
      imagen: UnidadVictimas,
      categoria: "soporte_tecnico"
    },
    {
      id: 5,
      slug: "findeter",
      titulo: "Findeter - Enlistamiento y Configuración de Equipos",
      descripcion:
        "Proceso de enlistamiento, preparación y configuración de equipos para usuarios finales dentro de la entidad.",
      empresa: "Findeter",
      periodo: "2025",
      url: null,
      tecnologias: [
        "Inventario TI",
        "Configuración de Equipos",
        "Soporte Técnico"
      ],
      responsabilidades: [
        "Enlistamiento de equipos para usuarios finales",
        "Configuración inicial de equipos y perfiles de usuario",
        "Entrega de equipos configurados a los usuarios",
        "Registro y control de inventario de los dispositivos"
      ],
      imagen: Findeter,
      categoria: "infraestructura_ti"
    },
    {
      id: 6,
      slug: "roche",
      titulo: "Roche - Soporte Técnico en Sitio",
      descripcion:
        "Atención de incidentes tecnológicos y soporte técnico presencial para los usuarios de la compañía.",
      empresa: "Roche",
      periodo: "2026",
      url: null,
      tecnologias: ["Soporte Técnico", "Diagnóstico de Sistemas", "Hardware"],
      responsabilidades: [
        "Resolución de incidentes técnicos en sitio",
        "Diagnóstico de problemas de hardware y software",
        "Soporte directo a usuarios",
        "Seguimiento y solución de incidencias tecnológicas"
      ],
      imagen: Roche,
      categoria: "soporte_tecnico"
    },
    {
      id: 7,
      slug: "ucc",
      titulo: "UCC - Soporte Técnico en Sitio",
      descripcion:
        "Prestación de soporte técnico presencial para equipos y usuarios dentro de la institución.",
      empresa: "UCC",
      periodo: "2026",
      url: null,
      tecnologias: [
        "Soporte Técnico",
        "Mantenimiento de Equipos",
        "Diagnóstico de Sistemas"
      ],
      responsabilidades: [
        "Resolución de problemas técnicos en equipos institucionales",
        "Soporte directo a usuarios",
        "Diagnóstico de fallas de hardware y software",
        "Mantenimiento básico de equipos de cómputo"
      ],
      imagen: Ucc,
      categoria: "soporte_tecnico"
    }
  ]
};

// Tags como chips monoespaciados con prefijo #, un solo tono por familia
const getTechColor = (tech: string) => {
  const celeste = new Set([
    "JavaScript",
    "React",
    "Tailwind CSS",
    "Python",
    "Inventario TI"
  ]);
  return celeste.has(tech)
    ? "text-[#5ec8f0] border-[#5ec8f0]/25"
    : "text-[#9b7fe6] border-[#9b7fe6]/25";
};

const Proyects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [brokenImages, setBrokenImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (sectionRef.current && !prefersReducedMotion) {
      tl.fromTo(
        sectionRef.current,
        { opacity: 0, backgroundPosition: "0% 50%" },
        {
          opacity: 1,
          backgroundPosition: "100% 50%",
          duration: 2,
          ease: "power2.inOut"
        },
        0
      );
    } else if (sectionRef.current) {
      gsap.set(sectionRef.current, { opacity: 1 });
    }

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.3
      );
    }

    tl.fromTo(
      cardsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      0.7
    );

    const cleanupFns: Array<() => void> = [];

    cardsRef.current.forEach((card) => {
      if (!card || prefersReducedMotion) return;
      const onEnter = () =>
        gsap.to(card, { borderColor: "rgba(155,127,230,0.5)", duration: 0.3 });
      const onLeave = () =>
        gsap.to(card, { borderColor: "rgba(255,255,255,0.1)", duration: 0.3 });
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      cleanupFns.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      tl.kill();
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  const handleCardClick = (url: string | null) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, url: string | null) => {
    if ((e.key === "Enter" || e.key === " ") && url) {
      e.preventDefault();
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-linear-to-br from-[#0a0a12] via-[#150e28] to-[#0a0a12]
                 bg-position[400%_400%] text-[#d6d3e6]"
      style={{ opacity: 0 }}
    >
      {/* Grilla de puntos, igual a Home */}
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #9b7fe6 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-[#9b7fe6]/8 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#5ec8f0]/6 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 2px)"
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Nav />

        <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-16">
          <div ref={titleRef} className="w-full max-w-7xl mx-auto">
            {/* Header tipo bitácora, igual patrón que Noticias */}
            <div className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-baseline gap-3">
                <span
                  className="text-[#5ec8f0] text-sm tracking-widest"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  $
                </span>
                <h2
                  className="text-xl md:text-3xl font-medium tracking-tight text-white"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  ls ~/proyectos --all
                </h2>
                <span className="text-[#5ec8f0] animate-pulse text-xl leading-none">
                  _
                </span>
              </div>
              <span
                className="hidden md:block text-xs text-white/30 tracking-wider"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {proyectosData.proyectos.length} archivos
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {proyectosData.proyectos.map((proyecto, index) => (
                <div
                  key={proyecto.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  onClick={() => handleCardClick(proyecto.url)}
                  onKeyDown={(e) => handleCardKeyDown(e, proyecto.url)}
                  role={proyecto.url ? "link" : "group"}
                  tabIndex={proyecto.url ? 0 : -1}
                  aria-label={
                    proyecto.url
                      ? `Ver proyecto: ${proyecto.titulo}`
                      : proyecto.titulo
                  }
                  className={`group relative bg-white/2 border border-white/10 p-5 transition-colors duration-300
                           overflow-hidden focus-visible:outline-none focus-visible:ring-1
                           focus-visible:ring-[#5ec8f0] ${proyecto.url ? "cursor-pointer" : "cursor-default"}`}
                >
                  {/* Gutter numerado + categoría, mismo lenguaje que el índice de Noticias */}
                  <div
                    className="flex items-center justify-between mb-3 text-xs tracking-widest"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <span className="text-[#5ec8f0]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white/30">
                      [{proyecto.categoria}]
                    </span>
                  </div>

                  <div className="mb-4 h-40 w-full overflow-hidden relative bg-[#150e28] border border-white/5">
                    {brokenImages[proyecto.id] ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <span
                          className="text-[#d6d3e6]/60 text-sm"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {proyecto.empresa}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={proyecto.imagen}
                        alt={proyecto.empresa}
                        className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                        decoding="async"
                        onError={() =>
                          setBrokenImages((prev) => ({
                            ...prev,
                            [proyecto.id]: true
                          }))
                        }
                      />
                    )}
                  </div>

                  <h3
                    className="text-base font-medium text-white mb-1 line-clamp-2"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {proyecto.titulo}
                  </h3>

                  <div
                    className="flex justify-between items-center mb-3 text-xs"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <span className="text-[#9b7fe6]">{proyecto.empresa}</span>
                    <span className="text-white/30">{proyecto.periodo}</span>
                  </div>

                  <p className="text-sm text-[#d6d3e6]/70 mb-4 line-clamp-3 leading-relaxed">
                    {proyecto.descripcion}
                  </p>

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

                  <ul className="space-y-1 border-t border-white/5 pt-3">
                    {proyecto.responsabilidades.slice(0, 3).map((resp, i) => (
                      <li
                        key={i}
                        className="text-xs text-[#d6d3e6]/50 flex items-start gap-2"
                      >
                        <span
                          className="text-[#5ec8f0]/60 shrink-0"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          &gt;
                        </span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {proyecto.url && (
                    <div
                      className="absolute top-4 right-4 text-[#5ec8f0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      aria-hidden="true"
                    >
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer de sección tipo status bar, igual criterio que la barra de progreso de Noticias */}
            <div className="flex items-center justify-between mt-10 border-t border-white/10 pt-4">
              <span
                className="text-xs text-white/40 tracking-widest"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                [{proyectosData.proyectos.length}/
                {proyectosData.proyectos.length}] cargados
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#9b7fe6] animate-pulse"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 py-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p
            className="text-white/40 text-xs tracking-widest"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            proyectos profesionales — construidos con{" "}
            <span className="text-[#9b7fe6]">disciplina</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Proyects;
