import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Card = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current && imageRef.current && titleRef.current && linksRef.current && contactInfoRef.current) {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Animación de entrada de la tarjeta
      tl.fromTo(
          cardRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8 }
      )
          // Animación de la imagen
          .fromTo(
              imageRef.current,
              { opacity: 0, scale: 0.8, rotateY: -20 },
              { opacity: 1, scale: 1, rotateY: 0, duration: 0.8 },
              "-=0.4"
          )
          // Animación del título
          .fromTo(
              titleRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6 },
              "-=0.6"
          )
          // Animación de la descripción
          .fromTo(
              ".description-text",
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.5 },
              "-=0.4"
          )
          // Animación de los enlaces con stagger
          .fromTo(
              linksRef.current.children,
              { opacity: 0, x: -20 },
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.7)"
              },
              "-=0.3"
          )
          // Animación de la información de contacto
          .fromTo(
              contactInfoRef.current.children,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.08
              },
              "-=0.2"
          );

      // Efecto hover para la imagen
      imageRef.current.addEventListener("mouseenter", () => {
        gsap.to(imageRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      imageRef.current.addEventListener("mouseleave", () => {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      // Efecto hover para enlaces
      const links = linksRef.current.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener("mouseenter", () => {
          gsap.to(link, {
            x: 5,
            duration: 0.2,
            ease: "power2.out"
          });
        });

        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            x: 0,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      });
    }

    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("mouseenter", () => {});
        imageRef.current.removeEventListener("mouseleave", () => {});
      }
    };
  }, []);

  const email = "xfranklyngarzonx@gmail.com";
  const phone = "+57 322 335 1010";
  const linkedin = "www.linkedin.com/in/franklyn-garzon-117a38337";

  return (
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div
            ref={cardRef}
            className="relative flex flex-col lg:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12
                   p-4 sm:p-6 md:p-8 max-w-7xl mx-auto
                   bg-gradient-to-br from-gray-900/40 to-fuchsia-900/20
                   backdrop-blur-sm rounded-2xl sm:rounded-3xl
                   border border-gray-800/50 shadow-2xl shadow-black/30
                   overflow-hidden"
        >
          {/* Efecto de brillo al hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fuchsia-500/5 to-transparent
                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

          {/* Contenedor de contenido - Izquierda */}
          <div className="w-full lg:w-1/2 z-10 p-4 sm:p-6 md:p-8">
            <h2
                ref={titleRef}
                className="
              text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold
              mb-3 sm:mb-4 md:mb-5 text-cyan-400 drop-shadow-lg
              text-center lg:text-left
            "
            >
              FRANKLYN GARZON
              <span className="
              block text-base xs:text-lg sm:text-xl md:text-2xl
              font-medium text-fuchsia-400 mt-1 sm:mt-2
            ">
              DEVELOPER FULL STACK
            </span>
            </h2>

            {/* Enlaces a Redes */}
            <div ref={linksRef} className="space-y-3 sm:space-y-4 md:space-y-5 mb-6 sm:mb-8 md:mb-10">
              <a
                  href="https://github.com/x-frank23-x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                flex items-center text-gray-200 hover:text-cyan-400
                transition-all duration-300 hover:scale-[1.02]
                text-sm xs:text-base sm:text-lg
                p-2 sm:p-3 rounded-xl hover:bg-gray-800/30
                group
              "
              >
                <FaGithub className="
                mr-3 text-xl sm:text-2xl md:text-3xl
                text-fuchsia-500 group-hover:text-fuchsia-400
                transition-colors duration-300
              " />
                <span className="flex-1">Ver mi Código en GitHub</span>
                <span className="text-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                →
              </span>
              </a>

              <a
                  href={`https://${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                flex items-center text-gray-200 hover:text-cyan-400
                transition-all duration-300 hover:scale-[1.02]
                text-sm xs:text-base sm:text-lg
                p-2 sm:p-3 rounded-xl hover:bg-gray-800/30
                group
              "
              >
                <FaLinkedin className="
                mr-3 text-xl sm:text-2xl md:text-3xl
                text-fuchsia-500 group-hover:text-fuchsia-400
                transition-colors duration-300
              " />
                <span className="flex-1">Mi Perfil Profesional</span>
                <span className="text-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                →
              </span>
              </a>

              <a
                  href={`mailto:${email}`}
                  className="
                flex items-center text-gray-200 hover:text-cyan-400
                transition-all duration-300 hover:scale-[1.02]
                text-sm xs:text-base sm:text-lg
                p-2 sm:p-3 rounded-xl hover:bg-gray-800/30
                group
              "
              >
                <FaEnvelope className="
                mr-3 text-xl sm:text-2xl md:text-3xl
                text-fuchsia-500 group-hover:text-fuchsia-400
                transition-colors duration-300
              " />
                <span className="flex-1 truncate">{email}</span>
                <span className="text-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                →
              </span>
              </a>
            </div>

            {/* Información de contacto adicional */}
            <div ref={contactInfoRef} className="
            flex flex-col sm:flex-row gap-4 sm:gap-6
            bg-gray-900/30 backdrop-blur-sm
            rounded-xl p-4 sm:p-6
            border border-gray-800/50
          ">
              <div className="flex items-center gap-3">
                <FaPhone className="text-fuchsia-400 text-lg sm:text-xl" />
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Teléfono</p>
                  <p className="text-gray-200 text-sm sm:text-base font-medium">{phone}</p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-gray-700/50" />
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-fuchsia-400 text-lg">📍</span>
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Ubicación</p>
                  <p className="text-gray-200 text-sm sm:text-base font-medium">Colombia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contenedor de imagen - Derecha */}
          <div className="
          w-full lg:w-1/2 flex justify-center items-center
          p-4 sm:p-6 md:p-8
        ">
            <div className="relative">
              <div className="
              absolute -inset-4 sm:-inset-6 md:-inset-8
              bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10
              rounded-2xl blur-xl
            " />
              <img
                  ref={imageRef}
                  src="cara.png"
                  alt="Franklyn Garzon Developer Full Stack"
                  className="
                relative z-10 w-48 h-48 xs:w-56 xs:h-56
                sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80
                object-cover rounded-2xl sm:rounded-3xl
                border-4 border-gray-800/50
                shadow-2xl shadow-black/50
                transition-transform duration-300
              "
              />
              {/* Badge de desarrollador */}
              <div className="
              absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4
              bg-gradient-to-r from-cyan-600 to-fuchsia-600
              text-white px-4 py-2 rounded-full
              text-xs sm:text-sm font-bold
              shadow-lg
              z-20
            ">
                🚀 FULL STACK
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Card;