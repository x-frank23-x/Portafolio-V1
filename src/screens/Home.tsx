import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Card from "../components/Card";
import Nav from "../components/Nav";
import Proyectos from "../components/Proyectos";
import Noticias from "../components/Noticias";
import Footer from "../components/Footer";  // Importa el Footer actualizado
import SkillsComponent from '../components/Skills';
 

// Función para dividir el texto del elemento en letras envueltas en <span>
const splitTextIntoSpans = (element: HTMLElement | null): HTMLSpanElement[] => {
  if (!element) return [];

  const text = element.textContent || "";
  element.textContent = ""; // Limpiar el contenido original

  const spans: HTMLSpanElement[] = [];

  text.split("").forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter === " " ? "\u00A0" : letter;
    spans.push(span);
    element.appendChild(span);
  });

  return spans;
};

// --- Componente Principal ---

const Home = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef(null);  // Agregado: Ref para el Footer

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (footerRef.current) {
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',  // Inicia cuando el footer está en la vista
        },
      });
    }
  }, []);  // Este useEffect se ejecuta una vez

  useEffect(() => {
    const titleElement = titleRef.current;
    const paragraphElement = paragraphRef.current;

    // 1. Preprocesar y obtener los <span> del título
    const titleSpans = splitTextIntoSpans(titleElement);

    // 2. Definir la línea de tiempo
    const tl = gsap.timeline();

    // 3. Animación de la Barra de Navegación (Nav)
    tl.fromTo(
      "nav",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 },
      0
    );

    // 4. Animación del Título letra por letra
    tl.fromTo(
      titleSpans,
      { opacity: 0, y: 20, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.05,
        ease: "back.out(1.7)",
        duration: 0.5,
      }
    );

    // 5. Animación del Párrafo (después del título)
    if (paragraphElement) {
      tl.fromTo(
        paragraphElement,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        ">0.2"
      );
    }
  }, []);

  return (
    <section 
      className="bg-gradient-to-br from-black via-gray-950 to-fuchsia-950 w-screen min-h-screen flex flex-col"
    >
      <Nav />
      <main className="flex-grow flex flex-col justify-center items-center px-6 md:px-12">
        <h1
          ref={titleRef}
          className="text-cyan-400 text-5xl md:text-6xl font-extrabold text-center tracking-wide mb-8 drop-shadow-lg shadow-cyan-900/50"
        >
          FRANKLYN GARZON | DEVELOPER FULL STACK
        </h1>
        <p
          ref={paragraphRef}
          className="text-gray-200 text-center max-w-3xl text-lg md:text-xl mb-16 leading-relaxed drop-shadow-md"
        >
          Ingeniero de Software con experiencia en React, TypeScript y FastAPI. Hábil en el desarrollo de soluciones escalables que mejoran procesos empresariales.
        </p>
        <Card />
        <Proyectos />
        <Noticias />
      </main>
        <SkillsComponent />
      {/* Footer con ref aplicado */}
      <Footer   />  
    </section>
  );
};

export default Home;
