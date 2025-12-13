import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Asegúrate de instalar react-icons

// Instala: npm install react-icons

const Card = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null); // Ref para el nuevo bloque de enlaces

  useEffect(() => {
    if (cardRef.current && imageRef.current && titleRef.current && linksRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. La tarjeta aparece (escala y opacidad)
      tl.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7 }
      )
      // 2. La imagen desliza desde la derecha
      .fromTo(
        imageRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.8 },
        "-=0.5"
      )
      // 3. El título y los enlaces aparecen
      .fromTo(
        [titleRef.current, linksRef.current.children], // Animamos el título y los hijos del contenedor de enlaces
        { opacity: 0, y: 10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.15, // Stagger entre los elementos
          ease: "power2.out"
        },
        "<" // Comienza al mismo tiempo que la imagen
      );
    }
  }, []);

  // Información de contacto de tu CV
  const email = "xfranklyngarzonx@gmail.com";
  const phone = "322 335 1010";

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-10 p-8 max-w-5xl mx-auto">
      <div
        ref={cardRef}
        className="w-full md:w-1/2 "
      >
        <h2 ref={titleRef} className="text-4xl font-extrabold mb-5 text-cyan-400 drop-shadow-lg">
          FRANKLYN GARZON
          <span className="block text-xl font-medium text-fuchsia-400 mt-1">DEVELOPER FULL STACK</span>
        </h2>
        
        {/* Contenedor para los enlaces con ref */}
        <div ref={linksRef} className="space-y-4 pt-3">
          
          <p className="text-gray-200 text-lg leading-relaxed">
            Ingeniero de Software enfocado en soluciones escalables. ¡Conéctate o explora mi código!
          </p>

          {/* Enlaces a Redes (Puedes cambiar los href por tus links reales) */}
          <a
            href="https://github.com/tu_usuario"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-200 hover:text-cyan-400 transition-colors text-lg"
          >
            <FaGithub className="mr-3 text-2xl text-fuchsia-500" />
            Ver mi Código en GitHub
          </a>

          <a
            href="https://linkedin.com/in/tu_usuario"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-200 hover:text-cyan-400 transition-colors text-lg"
          >
            <FaLinkedin className="mr-3 text-2xl text-fuchsia-500" />
            Mi Perfil Profesional (LinkedIn)
          </a>

          <a
            href={`mailto:${email}`}
            className="flex items-center text-gray-200 hover:text-cyan-400 transition-colors text-lg"
          >
            <FaEnvelope className="mr-3 text-2xl text-fuchsia-500" />
            {email}
          </a>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          ref={imageRef}
          src="cara.png" 
          alt="Franklyn Garzon Developer Full Stack"
          className="w-72 h-60 md:w-80 md:h-auto object-cover rounded-xl " 
        />
      </div>
    </div>
  );
};

export default Card;