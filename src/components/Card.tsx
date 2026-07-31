import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Limpiado los iconos que no usabas abajo

gsap.registerPlugin(ScrollTrigger);

const email = "xfranklyngarzonx@gmail.com";
const phone = "+57 322 335 1010";
const linkedin = "www.linkedin.com/in/franklyn-garzon-117a38337";

export const Card = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cleanupFns: Array<() => void> = [];

    if (
      cardRef.current &&
      imageRef.current &&
      titleRef.current &&
      linksRef.current &&
      contactInfoRef.current
    ) {
      // Convertimos las colecciones HTML en arrays reales para que GSAP y TS no tengan conflictos
      const linkElements = Array.from(linksRef.current.children);
      const contactElements = Array.from(contactInfoRef.current.children);

      if (!prefersReducedMotion) {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });

        tl.fromTo(
          cardRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8 }
        )
          .fromTo(
            imageRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.8 },
            "-=0.4"
          )
          .fromTo(
            titleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.6"
          )
          .fromTo(
            ".description-text",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5 },
            "-=0.4"
          )
          .fromTo(
            linkElements, // Ahora es un Array real
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
          .fromTo(
            contactElements, // Ahora es un Array real
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
            "-=0.2"
          );

        cleanupFns.push(() => tl.kill());

        // Hover de imagen
        const img = imageRef.current;
        const onImgEnter = () =>
          gsap.to(img, { scale: 1.03, duration: 0.3, ease: "power2.out" });
        const onImgLeave = () =>
          gsap.to(img, { scale: 1, duration: 0.3, ease: "power2.out" });
        img.addEventListener("mouseenter", onImgEnter);
        img.addEventListener("mouseleave", onImgLeave);
        cleanupFns.push(() => {
          img.removeEventListener("mouseenter", onImgEnter);
          img.removeEventListener("mouseleave", onImgLeave);
        });

        // Hover de enlaces
        const links = linksRef.current.querySelectorAll("a");
        links.forEach((link) => {
          const onLinkEnter = () =>
            gsap.to(link, { x: 4, duration: 0.2, ease: "power2.out" });
          const onLinkLeave = () =>
            gsap.to(link, { x: 0, duration: 0.2, ease: "power2.out" });
          link.addEventListener("mouseenter", onLinkEnter);
          link.addEventListener("mouseleave", onLinkLeave);
          cleanupFns.push(() => {
            link.removeEventListener("mouseenter", onLinkEnter);
            link.removeEventListener("mouseleave", onLinkLeave);
          });
        });
      } else {
        // Corrección del fallback para prefers-reduced-motion
        gsap.set(
          [
            cardRef.current,
            imageRef.current,
            titleRef.current,
            ...linkElements,
            ...contactElements
          ],
          { opacity: 1, y: 0, x: 0, scale: 1 }
        );
      }
    }

    return () => cleanupFns.forEach((fn) => fn());
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <div
        ref={cardRef}
        className="relative flex flex-col lg:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12
                   p-4 sm:p-6 md:p-8 max-w-7xl mx-auto
                   bg-white/2 border border-white/10
                   overflow-hidden"
      >
        {/* Contenedor de contenido - Izquierda */}
        <div className="w-full lg:w-1/2 z-10 p-4 sm:p-6 md:p-8">
          <div
            className="flex items-center gap-2 mb-4 text-xs tracking-widest text-[#5ec8f0]/70"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#5ec8f0] animate-pulse"
              aria-hidden="true"
            />
            whoami
          </div>

          <h2
            ref={titleRef}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold
                       mb-3 sm:mb-4 md:mb-5 text-white text-center lg:text-left tracking-tight"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Franklyn Garzon
            <span className="block text-base xs:text-lg sm:text-xl md:text-2xl font-medium text-[#9b7fe6] mt-2">
              developer_full_stack
            </span>
          </h2>

          <p className="description-text text-[#d6d3e6]/70 text-sm sm:text-base text-center lg:text-left mb-6 sm:mb-8 md:mb-10 leading-relaxed">
            Developer Full Stack con experiencia en React, TypeScript y FastAPI,
            enfocado en soluciones escalables para procesos empresariales.
          </p>

          <div ref={linksRef} className="space-y-2 mb-6 sm:mb-8 md:mb-10">
            <a
              href="https://github.com/x-frank23-x"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#d6d3e6]/80 hover:text-[#5ec8f0]
                         transition-colors duration-300 text-sm xs:text-base
                         p-2.5 border border-white/5 hover:border-[#5ec8f0]/30 group
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5ec8f0]"
            >
              <FaGithub
                className="mr-3 text-lg sm:text-xl text-[#9b7fe6] shrink-0"
                aria-hidden="true"
              />
              <span className="flex-1">ver_código en github</span>
              <span
                className="text-[#5ec8f0] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                →
              </span>
            </a>

            <a
              href={`https://${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#d6d3e6]/80 hover:text-[#5ec8f0]
                         transition-colors duration-300 text-sm xs:text-base
                         p-2.5 border border-white/5 hover:border-[#5ec8f0]/30 group
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5ec8f0]"
            >
              <FaLinkedin
                className="mr-3 text-lg sm:text-xl text-[#9b7fe6] shrink-0"
                aria-hidden="true"
              />
              <span className="flex-1">perfil profesional</span>
              <span
                className="text-[#5ec8f0] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                →
              </span>
            </a>

            <a
              href={`mailto:${email}`}
              className="flex items-center text-[#d6d3e6]/80 hover:text-[#5ec8f0]
                         transition-colors duration-300 text-sm xs:text-base
                         p-2.5 border border-white/5 hover:border-[#5ec8f0]/30 group
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#5ec8f0]"
            >
              <FaEnvelope
                className="mr-3 text-lg sm:text-xl text-[#9b7fe6] shrink-0"
                aria-hidden="true"
              />
              <span className="flex-1">enviar correo</span>
              <span
                className="text-[#5ec8f0] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>

          {/* Agregado este nodo ficticio para cumplir con tu ref contactInfoRef que requería el script */}
          <div ref={contactInfoRef} className="text-xs text-white/40">
            <span>{phone}</span>
          </div>
        </div>

        {/* Lado derecho - Espacio para la imagen que referenciabas */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            ref={imageRef}
            src="mi carita.JPG"
            alt="Franklyn Garzon"
            className="rounded-lg max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};
