// src/hooks/usePageTransition.ts (o donde guardes tus hooks)

import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

interface TransitionHook {
  overlayRef: React.RefObject<HTMLDivElement | null>;
  showOverlay: boolean;
  handleTransitionClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => void;
}

const usePageTransition = (): TransitionHook => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

  const handleTransitionClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
      // Evita la navegación si el path es un ancla vacío (si aplica)
      if (path === "#") {
        e.preventDefault();
        return;
      }

      e.preventDefault(); // Previene navegación default de Link
      setShowOverlay(true);

      // Delay antes de expandir (300ms)
      setTimeout(() => {
        if (overlayRef.current) {
          // Calcula tamaño para cubrir pantalla
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          // La diagonal * 2 es un buen factor para asegurar cobertura completa desde cualquier punto
          const diagonal = Math.sqrt(viewportWidth ** 2 + viewportHeight ** 2);
          const maxSize = diagonal * 2;

          // Animación GSAP: Expande desde esquina superior izquierda a full coverage
          gsap.fromTo(
            overlayRef.current,
            {
              // Propiedades de inicio para el efecto de escala (asegura que el origen esté 'fuera' para la expansión)
              left: "-1000px",
              top: "-1000px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              opacity: 0,
              scale: 0
            },
            {
              left: "-1000px", // Mantiene posición para que la expansión sea desde el mismo punto
              top: "-1000px",
              width: `${maxSize}px`,
              height: `${maxSize}px`,
              borderRadius: "50%",
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              onComplete: () => {
                // Navega y oculta overlay después de la animación
                setShowOverlay(false);
                navigate(path);
              }
            }
          );
        }
      }, 300);
    },
    [navigate]
  );

  return { overlayRef, showOverlay, handleTransitionClick };
};

export default usePageTransition;
