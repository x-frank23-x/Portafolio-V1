import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaCode } from 'react-icons/fa';
import { SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const techIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (footerRef.current && textRef.current && iconsRef.current) {
      // Timeline para animaciones en secuencia
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "bottom bottom",
          toggleActions: "play none none none",
        }
      });

      // Animación de fondo
      tl.fromTo(footerRef.current,
          {
            opacity: 0,
            y: 50,
            backgroundPosition: "0% 100%"
          },
          {
            opacity: 1,
            y: 0,
            backgroundPosition: "100% 0%",
            duration: 1.2,
            ease: "power3.out"
          }
      );

      // Animación del texto
      tl.fromTo(textRef.current,
          {
            opacity: 0,
            y: 20,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
          },
          "-=0.8"
      );

      // Animación de iconos de redes
      tl.fromTo(iconsRef.current.children,
          {
            opacity: 0,
            y: 15,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
          },
          "-=0.4"
      );

      // Animación de iconos de tecnologías
      if (techIconsRef.current) {
        tl.fromTo(techIconsRef.current.children,
            {
              opacity: 0,
              scale: 0.5,
              rotation: -180
            },
            {
              opacity: 0.7,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "back.out(1.5)"
            },
            "-=0.3"
        );
      }

      // Efecto hover para iconos de redes
      iconsRef.current.querySelectorAll('a').forEach((icon, index) => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            y: -5,
            scale: 1.15,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
      <footer
          ref={footerRef}
          className="relative w-full bg-gradient-to-t from-gray-950 via-black to-gray-950
                 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8
                 border-t border-gray-800/50
                 overflow-hidden"
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-900/5 to-transparent" />

        {/* Patrón de puntos sutil */}
        <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Iconos de redes sociales */}
          <div ref={iconsRef} className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
            <a
                href="https://github.com/tu_usuario"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 sm:p-4 rounded-full bg-gradient-to-br from-gray-900 to-black
                     border border-gray-800 hover:border-cyan-500/50
                     transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
                aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7
                               text-gray-400 group-hover:text-white
                               transition-colors duration-300" />
            </a>

            <a
                href="https://linkedin.com/in/franklyn-garzon-117a38337"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 sm:p-4 rounded-full bg-gradient-to-br from-gray-900 to-black
                     border border-gray-800 hover:border-blue-500/50
                     transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7
                                 text-gray-400 group-hover:text-white
                                 transition-colors duration-300" />
            </a>

            <a
                href="mailto:xfranklyngarzonx@gmail.com"
                className="group p-3 sm:p-4 rounded-full bg-gradient-to-br from-gray-900 to-black
                     border border-gray-800 hover:border-red-500/50
                     transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                aria-label="Email"
            >
              <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7
                                 text-gray-400 group-hover:text-white
                                 transition-colors duration-300" />
            </a>
          </div>

          {/* Texto principal */}
          <div className="text-center mb-6 sm:mb-8">
            <p
                ref={textRef}
                className="text-sm sm:text-base md:text-lg text-gray-300 font-medium mb-2 sm:mb-3"
            >
              Desarrollado con <FaHeart className="inline-block mx-1 text-fuchsia-500 animate-pulse" />
              por <span className="text-cyan-400 font-bold">Franklyn Garzon</span>
            </p>

            <p className="text-xs sm:text-sm text-gray-400">
              &copy; {currentYear} Todos los derechos reservados.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> • </span>
              Ingeniero de Software • Full Stack Developer
            </p>
          </div>

          {/* Tecnologías usadas */}
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <p className="text-xs sm:text-sm text-gray-500">
              Construido con las mejores tecnologías
            </p>

            <div ref={techIconsRef} className="flex justify-center items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 bg-gray-900/50 px-3 sm:px-4 py-2 rounded-full border border-gray-800">
                <SiReact className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                <span className="text-xs sm:text-sm text-gray-300">React</span>
              </div>

              <div className="flex items-center gap-2 bg-gray-900/50 px-3 sm:px-4 py-2 rounded-full border border-gray-800">
                <SiTailwindcss className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
                <span className="text-xs sm:text-sm text-gray-300">Tailwind</span>
              </div>

              <div className="flex items-center gap-2 bg-gray-900/50 px-3 sm:px-4 py-2 rounded-full border border-gray-800">
                <SiTypescript className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-xs sm:text-sm text-gray-300">TypeScript</span>
              </div>
            </div>
          </div>

          {/* Línea divisora */}
          <div className="my-6 sm:my-8">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          </div>

          {/* Información adicional */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8">
            <div className="text-center sm:text-left">
              <p className="text-xs text-gray-500">
                <FaCode className="inline-block mr-2 text-fuchsia-400" />
                Siempre aprendiendo, siempre creando
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">
              Disponible para nuevos proyectos
            </span>
            </div>

            <div className="text-center sm:text-right">
              <p className="text-xs text-gray-500">
                <span className="text-gray-300">v1.0</span> • Última actualización: {currentYear}
              </p>
            </div>
          </div>

          {/* Botón de scroll to top (mobile) */}
          <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="lg:hidden fixed bottom-20 right-4 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12
                   bg-gradient-to-br from-cyan-600/90 to-fuchsia-600/90
                   rounded-full shadow-lg flex items-center justify-center text-white
                   hover:scale-110 active:scale-95 transition-transform duration-200
                   backdrop-blur-sm border border-cyan-400/30"
              aria-label="Volver arriba"
          >
            ↑
          </button>
        </div>
      </footer>
  );
};

export default Footer;