import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact,
  SiTailwindcss,
  SiPython,
  SiReactrouter,
  SiAngular,
  SiFlutter,
  SiFastapi,
  SiNodedotjs,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiMysql,
  SiFirebase,
  SiTypescript,
  SiJavascript,
  SiDart
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const SkillsComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Crear un ícono personalizado para C#
  const CSharpIcon = () => (
    <div className="w-6 h-6 flex items-center justify-center text-purple-600 font-bold">
      C#
    </div>
  );

  // Tecnologías actualizadas con experiencia real de proyectos
  const technologies = [
    {
      name: "React",
      icon: <SiReact size={24} className="text-blue-500" />,
      description: "Frontend Library for UIs",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      detailedDescription:
        "Biblioteca JavaScript para construir interfaces de usuario. Usada en la remodelación del sitio web de E&P Profesionales y desarrollo desde cero de Induracks.",
      category: "Frontend",
      level: "Avanzado",
      projects: [
        "E&P Profesionales - Remodelación completa del sitio web",
        "Induracks - Desarrollo web desde cero para empresa de estanterías industriales"
      ]
    },
    {
      name: "React Native",
      icon: <SiReactrouter size={24} className="text-cyan-400" />,
      description: "Mobile App Development",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      detailedDescription:
        "Framework para construir aplicaciones móviles nativas usando React. Experiencia en desarrollo de apps multiplataforma.",
      category: "Mobile",
      level: "Intermedio",
      projects: [
        "Aplicaciones móviles para gestión empresarial",
        "Desarrollo de apps con autenticación y manejo de datos en tiempo real"
      ]
    },
    {
      name: "Angular",
      icon: <SiAngular size={24} className="text-red-600" />,
      description: "TypeScript Framework",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg",
      detailedDescription:
        "Framework para aplicaciones web de una sola página. Experiencia en desarrollo de aplicaciones tipo CRUD con consumo de APIs.",
      category: "Frontend",
      level: "Básico",
      projects: [
        "Desarrollo de aplicaciones empresariales tipo CRUD",
        "Formularios reactivos y consumo de APIs REST"
      ]
    },
    {
      name: "Flutter",
      icon: <SiFlutter size={24} className="text-blue-400" />,
      description: "Cross-platform Mobile",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png",
      detailedDescription:
        "UI toolkit de Google para apps móviles nativas. Usado en el desarrollo de aplicaciones móviles multiplataforma.",
      category: "Mobile",
      level: "Intermedio",
      projects: [
        "Aplicación móvil para administración de equipo deportivo Mallorca",
        "Desarrollo de apps con Firebase para backend"
      ]
    },
    {
      name: "Python",
      icon: <SiPython size={24} className="text-yellow-500" />,
      description: "Backend & Automation",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
      detailedDescription:
        "Lenguaje versátil para backend y automatización. Implementado en Supersalud para creación de inventarios automatizados y optimización de flujos de trabajo.",
      category: "Backend",
      level: "Avanzado",
      projects: [
        "Supersalud - Automatización de inventarios con Python y Excel",
        "Optimización de flujos de trabajo mediante scripts personalizados"
      ]
    },
    {
      name: "FastAPI",
      icon: <SiFastapi size={24} className="text-teal-500" />,
      description: "Python API Framework",
      image: "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png",
      detailedDescription:
        "Framework moderno para construir APIs con Python. Parte del stack tecnológico para desarrollo de backend eficiente.",
      category: "Backend",
      level: "Intermedio",
      projects: [
        "Desarrollo de APIs REST para aplicaciones empresariales",
        "Integración con bases de datos PostgreSQL y MySQL"
      ]
    },
    {
      name: "Node.js",
      icon: <SiNodedotjs size={24} className="text-green-500" />,
      description: "JavaScript Runtime",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
      detailedDescription:
        "Entorno de ejecución de JavaScript para backend. Usado en automatización de tareas y desarrollo de APIs.",
      category: "Backend",
      level: "Intermedio",
      projects: [
        "Automatización de procesos empresariales",
        "Desarrollo de microservicios y APIs"
      ]
    },
    {
      name: "TypeScript",
      icon: <SiTypescript size={24} className="text-blue-600" />,
      description: "Typed JavaScript",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
      detailedDescription:
        "Superset de JavaScript con tipado estático. Implementado en proyectos React para mayor seguridad y mantenibilidad.",
      category: "Frontend",
      level: "Avanzado",
      projects: [
        "Proyectos E&P Profesionales e Induracks",
        "Aplicaciones empresariales escalables"
      ]
    },
    {
      name: "JavaScript",
      icon: <SiJavascript size={24} className="text-yellow-400" />,
      description: "Web Programming Language",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      detailedDescription:
        "Lenguaje principal para desarrollo web frontend y backend. Usado en todos los proyectos web como tecnología base.",
      category: "Lenguajes",
      level: "Avanzado",
      projects: [
        "E&P Profesionales - Desarrollo completo del frontend",
        "Induracks - Implementación de funcionalidades interactivas"
      ]
    },
    {
      name: "C#",
      icon: <CSharpIcon />,
      description: ".NET Development",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/0/0d/C_Sharp_wordmark.svg",
      detailedDescription:
        "Lenguaje de programación orientado a objetos. Experiencia en desarrollo de aplicaciones empresariales.",
      category: "Backend",
      level: "Básico",
      projects: [
        "Aplicaciones de escritorio empresariales",
        "Desarrollo de sistemas de gestión"
      ]
    },
    {
      name: "Dart",
      icon: <SiDart size={24} className="text-blue-400" />,
      description: "Flutter Language",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Dart-logo.png",
      detailedDescription:
        "Lenguaje usado con Flutter para desarrollo móvil. Implementado en aplicación móvil para administración del equipo deportivo Mallorca.",
      category: "Mobile",
      level: "Intermedio",
      projects: [
        "Aplicación móvil Mallorca - Desarrollo completo con Flutter",
        "Integración con Firebase para backend"
      ]
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql size={24} className="text-blue-700" />,
      description: "SQL Database",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
      detailedDescription:
        "Sistema de gestión de bases de datos relacionales. Usado como solución preferencial para modelado relacional y persistencia de datos.",
      category: "Database",
      level: "Intermedio",
      projects: [
        "Sistemas de gestión empresarial",
        "Aplicaciones web con gestión de datos complejos"
      ]
    },
    {
      name: "MySQL",
      icon: <SiMysql size={24} className="text-orange-600" />,
      description: "Relational Database",
      image: "https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg",
      detailedDescription:
        "Sistema de gestión de bases de datos popular. Parte del stack tecnológico para desarrollo de aplicaciones web.",
      category: "Database",
      level: "Intermedio",
      projects: [
        "Bases de datos para aplicaciones web empresariales",
        "Sistemas de inventario y gestión"
      ]
    },
    {
      name: "Git",
      icon: <SiGit size={24} className="text-red-500" />,
      description: "Version Control",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg",
      detailedDescription:
        "Sistema de control de versiones distribuido. Fundamental en todos los proyectos para colaboración y control de versiones.",
      category: "Herramientas",
      level: "Avanzado",
      projects: [
        "Todos los proyectos profesionales",
        "Gestión de código en equipos de desarrollo"
      ]
    },
    {
      name: "Docker",
      icon: <SiDocker size={24} className="text-blue-600" />,
      description: "Containerization",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg",
      detailedDescription:
        "Plataforma de contenedorización para aplicaciones. Usada en pruebas técnicas para configuración controlada de entornos.",
      category: "Herramientas",
      level: "Intermedio",
      projects: [
        "Configuración de entornos de desarrollo",
        "Despliegue de aplicaciones en contenedores"
      ]
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss size={24} className="text-teal-400" />,
      description: "CSS Framework",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
      detailedDescription:
        "Framework CSS utility-first. Implementado en E&P Profesionales e Induracks para interfaces modernas, responsivas y consistentes.",
      category: "Frontend",
      level: "Avanzado",
      projects: [
        "E&P Profesionales - Diseño responsivo y moderno",
        "Induracks - Interfaz representativa de la marca"
      ]
    },
    {
      name: "Firebase",
      icon: <SiFirebase size={24} className="text-yellow-600" />,
      description: "App Platform",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/46/Firebase_logo.svg",
      detailedDescription:
        "Plataforma para desarrollo de apps móviles y web. Implementada junto a Flutter en la aplicación Mallorca para autenticación y datos en tiempo real.",
      category: "Backend",
      level: "Intermedio",
      projects: [
        "Aplicación móvil Mallorca - Autenticación y base de datos",
        "Proyectos con manejo de datos en tiempo real"
      ]
    }
  ];

  // Configuración responsive
  const getCircleConfig = () => {
    if (isMobile) {
      return {
        radius: 120,
        sphereSize: 40,
        containerSize: 280
      };
    }
    return {
      radius: 200,
      sphereSize: 60,
      containerSize: 500
    };
  };

  const { radius, sphereSize, containerSize } = getCircleConfig();

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return;

    // Animación del título
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Animación de entrada de esferas (solo desktop)
    if (!isMobile) {
      gsap.fromTo(
        ".skill-sphere",
        {
          opacity: 0,
          scale: 0.5,
          rotation: -180
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );

      // Rotación lenta del círculo (solo desktop)
      gsap.to(".spheres-container", {
        rotation: 360,
        duration: 40,
        ease: "none",
        repeat: -1
      });

      // Contra-rotación de los íconos para que se mantengan "de pie"
      // mientras la esfera que los contiene orbita
      gsap.to(".skill-icon-inner", {
        rotation: -360,
        duration: 40,
        ease: "none",
        repeat: -1
      });
    } else {
      // Para móvil: animación de grid
      gsap.fromTo(
        ".mobile-tech-item",
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // Animación para el modal
    if (selectedTech) {
      gsap.fromTo(
        ".modal-panel",
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isMobile, selectedTech]);

  const handleTechClick = (tech: any) => {
    setSelectedTech(tech);
    // En móvil, evitar scroll al abrir modal
    if (isMobile) {
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    setSelectedTech(null);
    if (isMobile) {
      document.body.style.overflow = "auto";
    }
  };

  // Función para obtener proyectos relacionados específicos
  const getRelatedProjects = (techName: string) => {
    switch (techName) {
      case "React":
      case "Tailwind CSS":
      case "TypeScript":
        return [
          {
            name: "E&P Profesionales",
            type: "Remodelación Web",
            description:
              "Sitio web renovado con mejoras de rendimiento y sistema de contacto"
          },
          {
            name: "Induracks",
            type: "Desarrollo Web",
            description:
              "Sitio web desde cero para empresa de estanterías industriales"
          }
        ];
      case "Python":
        return [
          {
            name: "Supersalud",
            type: "Automatización",
            description:
              "Sistema automatizado de inventarios y optimización de flujos de trabajo"
          }
        ];
      case "Flutter":
      case "Dart":
      case "Firebase":
        return [
          {
            name: "Mallorca",
            type: "Aplicación Móvil",
            description:
              "App para administración de equipo deportivo con autenticación y datos en tiempo real"
          }
        ];
      case "Angular":
      case "C#":
        return [
          {
            name: "Proyecto CRUD",
            type: "Aplicación Empresarial",
            description:
              "Desarrollo de aplicación tipo CRUD con consumo de APIs y formularios reactivos"
          }
        ];
      default:
        return [
          {
            name: "Proyectos Profesionales",
            type: "Desarrollo Full Stack",
            description:
              "Implementado en diversos proyectos empresariales y aplicaciones"
          }
        ];
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center
                 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20
                 py-12 sm:py-16 md:py-20 lg:py-24
                 overflow-hidden bg-linear-to-b from-transparent to-gray-950/50"
    >
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-linear-to-br from-cyan-900/5 via-transparent to-fuchsia-900/5" />

      <h2
        ref={titleRef}
        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white
                   mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center z-20
                   drop-shadow-lg"
      >
        Tecnologías & <span className="text-cyan-400">Habilidades</span>
      </h2>

      {/* Vista Desktop - Círculo Orbit */}
      {!isMobile ? (
        <div className="relative z-10 flex items-center justify-center w-full">
          <div
            className="relative flex items-center justify-center"
            style={{
              width: `${containerSize}px`,
              height: `${containerSize}px`
            }}
          >
            {/* Centro del círculo */}
            <div
              className="absolute w-24 h-24 md:w-28 md:h-28
                          bg-linear-to-br from-cyan-900/80 to-fuchsia-900/80
                          rounded-full flex items-center justify-center
                          shadow-2xl border-4 border-white/10 backdrop-blur-sm"
            >
              <span className="text-white font-bold text-sm md:text-base text-center">
                FULL
                <br />
                STACK
              </span>
            </div>

            {/* Contenedor de esferas giratorio */}
            <div className="spheres-container absolute inset-0">
              {technologies.map((tech, index) => {
                const angle = (index / technologies.length) * 360;
                const transformStyle = `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;

                return (
                  <div
                    key={tech.name}
                    className="absolute skill-sphere cursor-pointer transition-all duration-300"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: transformStyle,
                      width: `${sphereSize}px`,
                      height: `${sphereSize}px`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "50%",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                      border: "2px solid rgba(255, 255, 255, 0.1)",
                      borderColor:
                        hoveredTech === tech.name
                          ? "rgb(34 211 238 / 0.5)"
                          : "rgba(255, 255, 255, 0.1)",
                      transformOrigin: "0% 0%",
                      marginLeft: `-${sphereSize / 2}px`,
                      marginTop: `-${sphereSize / 2}px`,
                      zIndex: hoveredTech === tech.name ? 30 : 20
                    }}
                    onMouseEnter={() => setHoveredTech(tech.name)}
                    onMouseLeave={() => setHoveredTech(null)}
                    onClick={() => handleTechClick(tech)}
                  >
                    {/* Wrapper que contrarresta la rotación del contenedor padre,
                              así la esfera orbita pero el ícono se ve siempre "de pie" */}
                    <div className="skill-icon-inner relative">
                      {tech.icon}

                      {/* Badge de nivel */}
                      <div className="absolute -top-2 -right-2">
                        <div
                          className={`
                          w-3 h-3 rounded-full 
                          ${
                            tech.level === "Avanzado"
                              ? "bg-green-500"
                              : tech.level === "Intermedio"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }
                        `}
                        />
                      </div>
                    </div>

                    {/* Tooltip (fuera del wrapper contrarrotado para no desalinearse) */}
                    {hoveredTech === tech.name && (
                      <div
                        className="absolute bottom-full mb-3 p-2 bg-gray-900/90
                                    text-white text-xs rounded-lg whitespace-nowrap
                                    shadow-xl backdrop-blur-sm border border-gray-700
                                    transform -translate-x-1/2 left-1/2"
                      >
                        <div className="font-semibold">{tech.name}</div>
                        <div className="text-gray-300">{tech.description}</div>
                        <div className="text-cyan-400 text-xs mt-1">
                          {tech.level} • {tech.category}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Vista Mobile - Grid de tecnologías */
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="mobile-tech-item flex flex-col items-center justify-center
                         p-3 sm:p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm
                         border border-gray-800 hover:border-cyan-500/30
                         transition-all duration-300 hover:scale-105
                         cursor-pointer"
                onClick={() => handleTechClick(tech)}
              >
                <div className="mb-2">{tech.icon}</div>
                <span className="text-white text-xs sm:text-sm font-medium text-center">
                  {tech.name}
                </span>
                <div
                  className={`
                  w-2 h-2 rounded-full mt-1
                  ${
                    tech.level === "Avanzado"
                      ? "bg-green-500"
                      : tech.level === "Intermedio"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }
                `}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de tecnología (compartido) */}
      {selectedTech && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={closeModal}
          />

          {/* Panel del modal */}
          <div
            className={`
            modal-panel fixed z-50 bg-linear-to-br from-gray-900 to-gray-950
            rounded-xl sm:rounded-2xl shadow-2xl border border-gray-800
            overflow-hidden max-h-[90vh] overflow-y-auto
            ${
              isMobile
                ? "inset-4 m-auto w-[calc(100%-2rem)] h-auto"
                : "right-4 top-1/2 transform -translate-y-1/2 w-80 md:w-96"
            }
          `}
          >
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    {selectedTech.icon}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {selectedTech.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="px-2 py-1 bg-gray-800 text-gray-300
                                     text-xs rounded-full"
                      >
                        {selectedTech.category}
                      </span>
                      <span
                        className={`
                        px-2 py-1 text-xs rounded-full
                        ${
                          selectedTech.level === "Avanzado"
                            ? "bg-green-900/30 text-green-300"
                            : selectedTech.level === "Intermedio"
                              ? "bg-yellow-900/30 text-yellow-300"
                              : "bg-blue-900/30 text-blue-300"
                        }
                      `}
                      >
                        {selectedTech.level}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl p-1"
                >
                  &times;
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-gray-400 text-sm font-medium mb-2">
                  Descripción
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedTech.detailedDescription}
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <h4 className="text-gray-400 text-sm font-medium mb-3">
                  Experiencia en Proyectos
                </h4>
                <ul className="space-y-3">
                  {getRelatedProjects(selectedTech.name).map(
                    (project, index) => (
                      <li key={index} className="text-gray-300 text-sm">
                        <div className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          <div>
                            <div className="font-medium text-cyan-300">
                              {project.name}
                            </div>
                            <div className="text-gray-400 text-xs mt-1">
                              {project.type}
                            </div>
                            <div className="text-gray-300 text-xs mt-1">
                              {project.description}
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Tecnologías relacionadas */}
              <div className="bg-gray-800/30 rounded-lg p-4">
                <h4 className="text-gray-400 text-sm font-medium mb-2">
                  Tecnologías Relacionadas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTech.name === "React" && (
                    <>
                      <span className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full">
                        TypeScript
                      </span>
                      <span className="px-2 py-1 bg-teal-900/30 text-teal-300 text-xs rounded-full">
                        Tailwind CSS
                      </span>
                      <span className="px-2 py-1 bg-cyan-900/30 text-cyan-300 text-xs rounded-full">
                        React Native
                      </span>
                    </>
                  )}
                  {selectedTech.name === "Python" && (
                    <>
                      <span className="px-2 py-1 bg-teal-900/30 text-teal-300 text-xs rounded-full">
                        FastAPI
                      </span>
                      <span className="px-2 py-1 bg-green-900/30 text-green-300 text-xs rounded-full">
                        Excel
                      </span>
                    </>
                  )}
                  {selectedTech.name === "Flutter" && (
                    <>
                      <span className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full">
                        Dart
                      </span>
                      <span className="px-2 py-1 bg-yellow-900/30 text-yellow-300 text-xs rounded-full">
                        Firebase
                      </span>
                    </>
                  )}
                  {selectedTech.name === "Angular" && (
                    <>
                      <span className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full">
                        C#
                      </span>
                      <span className="px-2 py-1 bg-red-900/30 text-red-300 text-xs rounded-full">
                        Java
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Leyenda de niveles (solo desktop) */}
      {!isMobile && !selectedTech && (
        <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 z-20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-gray-300 text-sm">
              Avanzado - Proyectos Profesionales
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-gray-300 text-sm">
              Intermedio - Experiencia Significativa
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-gray-300 text-sm">
              Básico - Conocimiento Fundamental
            </span>
          </div>
        </div>
      )}

      {/* Información contextual con proyectos reales */}
      <div
        className="mt-8 sm:mt-12 md:mt-16 text-center text-gray-400
                     max-w-3xl text-sm sm:text-base z-20 px-4"
      >
        <p>
          Stack tecnológico implementado en proyectos profesionales como{" "}
          <span className="text-cyan-300 font-semibold">E&P Profesionales</span>
          , <span className="text-cyan-300 font-semibold">Induracks</span>,{" "}
          <span className="text-cyan-300 font-semibold">Supersalud</span>, y
          aplicaciones móviles empresariales.
        </p>
      </div>
    </div>
  );
};

export default SkillsComponent;
