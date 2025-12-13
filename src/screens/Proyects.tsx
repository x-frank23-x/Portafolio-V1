import { useEffect, useRef } from "react";
import Nav from "../components/Nav.tsx";
import Title_1 from "../components/titles/Title_1.tsx";
import { gsap } from "gsap";

// Importa las imágenes
import EYPImage from "/E&P.png";
import InduracksImage from "/Induracks.png";
import SuperImage from "/super.png";

// Datos de proyectos
const proyectosData = {
    proyectos: [
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
            categoria: "Web Development"
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
            categoria: "Web Development"
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
            categoria: "Automatización"
        }
    ]
};

const Proyects = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" }
        });

        if (sectionRef.current) {
            gsap.fromTo(sectionRef.current,
                {
                    opacity: 0,
                    backgroundPosition: "0% 50%"
                },
                {
                    opacity: 1,
                    backgroundPosition: "100% 50%",
                    duration: 2,
                    ease: "power2.inOut"
                }
            );
        }

        if (titleRef.current) {
            tl.fromTo(titleRef.current,
                {
                    y: 80,
                    opacity: 0,
                    scale: 0.9
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2
                },
                0.5
            );
        }

        tl.fromTo(cardsRef.current,
            {
                y: 60,
                opacity: 0,
                scale: 0.8
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)"
            },
            1
        );

        cardsRef.current.forEach(card => {
            if (!card) return;

            const mouseEnterHandler = () => {
                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };

            const mouseLeaveHandler = () => {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };

            card.addEventListener("mouseenter", mouseEnterHandler);
            card.addEventListener("mouseleave", mouseLeaveHandler);
        });

        return () => {
            tl.kill();
            cardsRef.current.forEach(card => {
                if (card) {
                    card.removeEventListener("mouseenter", () => {});
                    card.removeEventListener("mouseleave", () => {});
                }
            });
        };
    }, []);

    const handleCardClick = (url: string | null) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const getTechColor = (tech: string) => {
        const colors: {[key: string]: string} = {
            "JavaScript": "bg-yellow-900/30 text-yellow-300",
            "React": "bg-cyan-900/30 text-cyan-300",
            "Tailwind CSS": "bg-sky-900/30 text-sky-300",
            "EmailJS": "bg-red-900/30 text-red-300",
            "Framer Motion": "bg-purple-900/30 text-purple-300",
            "Python": "bg-blue-900/30 text-blue-300",
            "Excel": "bg-green-900/30 text-green-300",
            "Automatización": "bg-orange-900/30 text-orange-300"
        };
        return colors[tech] || "bg-gray-800/30 text-gray-300";
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-950 to-fuchsia-950
                 bg-[length:400%_400%]"
        >
            <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col min-h-screen">
                <Nav />

                <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-16">
                    <div ref={titleRef} className="w-full max-w-7xl mx-auto">
                        <Title_1 title={"Mis proyectos"} />

                        <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {proyectosData.proyectos.map((proyecto, index) => (
                                <div
                                    key={proyecto.id}
                                    ref={el => cardsRef.current[index] = el}
                                    onClick={() => handleCardClick(proyecto.url)}
                                    className={`group relative bg-gradient-to-br from-gray-900/50 to-fuchsia-900/20 backdrop-blur-sm 
                           border border-gray-800 rounded-2xl p-6 hover:border-fuchsia-500/50 transition-all duration-300 
                           cursor-pointer overflow-hidden shadow-lg shadow-black/30 ${proyecto.url ? 'hover:shadow-fuchsia-500/20' : ''}`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-500/5 to-transparent
                                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                                    <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gray-800/70 text-gray-300 rounded-full text-xs font-medium backdrop-blur-sm">
                      {proyecto.categoria}
                    </span>
                                    </div>

                                    <div className="relative z-10">
                                        {/* IMAGEN REAL - Reemplaza el placeholder */}
                                        <div className="mb-4 h-48 w-full rounded-xl overflow-hidden relative">
                                            <img
                                                src={proyecto.imagen}
                                                alt={proyecto.empresa}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    console.error(`Error cargando imagen: ${proyecto.empresa}`);
                                                    e.currentTarget.style.display = 'none';
                                                    // Fallback si la imagen falla
                                                    const parent = e.currentTarget.parentElement;
                                                    if (parent) {
                                                        parent.innerHTML = `
                                                            <div class="w-full h-full bg-gradient-to-br from-fuchsia-900/20 to-purple-900/20 flex items-center justify-center">
                                                                <div class="text-center p-4">
                                                                    <div class="text-4xl mb-2">🚀</div>
                                                                    <span class="text-gray-300 text-lg font-medium">${proyecto.empresa}</span>
                                                                </div>
                                                            </div>
                                                        `;
                                                    }
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute bottom-4 left-4">
                                                <span className="text-white text-lg font-medium">{proyecto.empresa}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                                            {proyecto.titulo}
                                        </h3>

                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-fuchsia-300 font-medium">{proyecto.empresa}</span>
                                            <span className="text-gray-400 text-sm">{proyecto.periodo}</span>
                                        </div>

                                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                                            {proyecto.descripcion}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {proyecto.tecnologias.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getTechColor(tech)}`}
                                                >
                          {tech}
                        </span>
                                            ))}
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="text-gray-400 text-sm font-medium">Responsabilidades:</h4>
                                            <ul className="space-y-1">
                                                {proyecto.responsabilidades.slice(0, 3).map((resp, i) => (
                                                    <li key={i} className="text-gray-400 text-xs flex items-start">
                                                        <span className="text-fuchsia-400 mr-2">•</span>
                                                        <span>{resp}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {proyecto.url && (
                                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-8 h-8 bg-fuchsia-500/20 rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-12">
                            <div className="flex flex-col items-center gap-2">
                                <div className="text-gray-400 text-sm font-medium">
                                    Mostrando <span className="text-fuchsia-400">{proyectosData.proyectos.length}</span> proyectos
                                </div>
                                <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center">
                                    <div className="w-1 h-3 bg-fuchsia-500 rounded-full mt-2 animate-bounce" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 py-6 border-t border-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-gray-500 text-sm">
                        Proyectos profesionales desarrollados con <span className="text-fuchsia-400">excelencia</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Proyects;