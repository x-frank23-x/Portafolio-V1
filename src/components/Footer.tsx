import  { useEffect, useRef } from 'react';
import gsap from 'gsap';   

const Footer = () => {
  const footerRef = useRef(null);   

  useEffect(() => {
    if (footerRef.current) {
      // Animación: Fade-in y slide-up
      gsap.from(footerRef.current, {
        opacity: 1,   
        y: 20,      
        duration: 0.8,   
        ease: 'power3.out',   
      });
    }
  }, []);  

  return (
    <footer 
      ref={footerRef}  // Asigna la ref al elemento
      className="bg-gray-900 py-4 text-center text-gray-400 border-t border-gray-700 shadow-md transition-all duration-300"  // Estilos Tailwind actualizados
    >
      <p className="text-gray-300">&copy; 2023 Franklyn Garzon. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;