// src/components/Nav.tsx

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import usePageTransition from "../hooks/usePageTransition"; // Importar el hook

const Nav = () => {
  const navRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // 1. Usar el hook para obtener la lógica de transición
  const { overlayRef, showOverlay, handleTransitionClick } = usePageTransition();

  useEffect(() => {
    // Animaciones iniciales (estas no cambian, se quedan aquí)
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <>
      {/* 2. Renderizar el Overlay si showOverlay es true */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className="fixed z-50 bg-cyan-400 rounded-full pointer-events-none"
          style={{
            left: -20,
            top: -20,
            width: "20px",
            height: "20px",
          }}
        />
      )}

      <section>
        <nav className="p-6 flex relative z-10" ref={navRef}>
          <h1 ref={titleRef} className="text-white text-3xl font-bold">
            Mi Portafolio
          </h1>
          <ul className="flex gap-6 ml-auto items-center">
            {/* 3. Usar handleTransitionClick en lugar de handleLinkClick */}
            <li className="text-gray-300">
              <Link
                to="/"
                onClick={(e) => handleTransitionClick(e, "/")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Inicio
              </Link>
            </li>
            <li className="text-gray-300">
              <Link
                to="/sobre-mi"
                onClick={(e) => handleTransitionClick(e, "/sobre-mi")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Sobre mí
              </Link>
            </li>
            <li className="text-gray-300">
              <Link
                to="/proyectos"
                onClick={(e) => handleTransitionClick(e, "/proyects")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Proyectos
              </Link>
            </li>
            <li className="text-gray-300">
              <Link
                to="/contacto"
                onClick={(e) => handleTransitionClick(e, "/contacto")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default Nav;