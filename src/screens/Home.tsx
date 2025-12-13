import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from "../components/Nav";
import Card from "../components/Card";
import Proyectos from "../components/Proyectos";
import Noticias from "../components/Noticias";
import Footer from "../components/Footer";
import SkillsComponent from "../components/Skills";
import Title_2 from "../components/titles/Title_2.tsx";

const Home = () => {
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const footerRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animación del título principal
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    delay: 0.2
                }
            );
        }

        // Animación del párrafo
        if (paragraphRef.current) {
            gsap.fromTo(
                paragraphRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: 0.8,
                    scrollTrigger: {
                        trigger: paragraphRef.current,
                        start: "top 80%",
                    }
                }
            );
        }

        // Animación de entrada del contenido principal
        if (mainRef.current) {
            gsap.fromTo(
                mainRef.current.children,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: mainRef.current,
                        start: "top 85%",
                    }
                }
            );
        }

        // Animación del Footer
        if (footerRef.current) {
            gsap.fromTo(
                footerRef.current,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 90%",
                        end: "bottom bottom",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Animación de fondo dinámica
        const section = document.querySelector('section');
        if (section) {
            gsap.to(section, {
                backgroundPosition: "50% 100%",
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section className="relative bg-gradient-to-br from-black via-gray-950 to-fuchsia-950
                        w-full min-h-screen flex flex-col overflow-hidden">

            {/* Efectos de fondo para móvil/desktop */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-fuchsia-900/20 to-transparent" />
                <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-cyan-900/10 to-transparent" />

                {/* Patrón de grid sutil */}
                <div className="absolute inset-0 opacity-5"
                     style={{
                         backgroundImage: `
                 linear-gradient(to right, #fff 1px, transparent 1px),
                 linear-gradient(to bottom, #fff 1px, transparent 1px)
               `,
                         backgroundSize: '50px 50px'
                     }} />
            </div>

            {/* Partículas flotantes (solo desktop) */}
            <div className="hidden lg:block">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full animate-pulse"
                        style={{
                            width: Math.random() * 4 + 2 + 'px',
                            height: Math.random() * 4 + 2 + 'px',
                            background: i % 2 === 0 ? '#22d3ee' : '#e879f9',
                            opacity: Math.random() * 0.3 + 0.1,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 3 + 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Nav />

                <main ref={mainRef} className="flex-grow flex flex-col justify-center items-center
                                      px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20
                                      pt-6 md:pt-8 lg:pt-12 pb-8 md:pb-12 lg:pb-16">

                    {/* Título Principal - Responsive completo */}
                    <div ref={titleRef} className="w-full mb-6 md:mb-8 lg:mb-12 px-2 sm:px-0">
                        <Title_2
                            text="FRANKLYN GARZON | DEVELOPER FULL STACK"
                            className="
                text-cyan-400 font-extrabold text-center tracking-tight drop-shadow-lg shadow-cyan-900/50
                text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
                leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed
                px-2 sm:px-4
              "
                        />
                    </div>

                    {/* Párrafo de descripción - Responsive */}
                    <p
                        ref={paragraphRef}
                        className="
              text-gray-200 text-center leading-relaxed drop-shadow-md
              text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl
              max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl
              mb-8 sm:mb-10 md:mb-12 lg:mb-16
              px-3 sm:px-4 md:px-0
            "
                    >
                        Developer Full Stack con experiencia en React, TypeScript y FastAPI.
                        Hábil en el desarrollo de soluciones escalables que mejoran procesos
                        empresariales.
                    </p>

                    {/* Contenedor de componentes - Responsive */}
                    <div className="w-full space-y-12 md:space-y-16 lg:space-y-20 xl:space-y-24">
                        {/* Card - Ajustes responsive */}
                        <div className="transform transition-transform duration-300 hover:scale-[1.01]">
                            <Card />
                        </div>

                        {/* Proyectos - Espaciado responsive */}
                        <div className="mt-8 md:mt-12">
                            <Proyectos />

                        </div>

                        {/* Noticias - Espaciado responsive */}
                        <div className="mt-8 md:mt-12">
                            <Noticias />
                        </div>
                    </div>
                </main>

                {/* Skills - Ajustes responsive */}
                <div className="mt-8 md:mt-12 lg:mt-16 px-4 sm:px-6 md:px-8">
                    <SkillsComponent />
                </div>

                {/* Footer con ref */}
                <footer ref={footerRef} className="mt-12 md:mt-16 lg:mt-20">
                    <Footer />
                </footer>
            </div>

            {/* Indicador de scroll (solo desktop) */}
            <div className="hidden lg:block fixed bottom-8 right-8 z-20">
                <div className="animate-bounce w-10 h-16 border-2 border-cyan-500/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-cyan-400 rounded-full mt-3" />
                </div>
            </div>

            {/* Botón de scroll to top (mobile) */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="lg:hidden fixed bottom-6 right-6 z-20 w-12 h-12 bg-gradient-to-br from-cyan-600 to-fuchsia-600
                   rounded-full shadow-lg flex items-center justify-center text-white
                   hover:scale-110 active:scale-95 transition-transform duration-200"
                aria-label="Volver arriba"
            >
                ↑
            </button>
        </section>
    );
};

export default Home;