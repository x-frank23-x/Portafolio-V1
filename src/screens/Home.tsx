import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from "../components/Nav";
import { Card } from "../components/Card";
import Proyectos from "../components/Proyectos";
import Noticias from "../components/Noticias";
import Footer from "../components/Footer";
import SkillsComponent from "../components/Skills";
import Title_2 from "../components/titles/Title_2";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
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
            scrollTrigger: { trigger: paragraphRef.current, start: "top 80%" }
          }
        );
      }

      const revealTargets =
        mainRef.current?.querySelectorAll(".reveal-on-scroll");
      if (revealTargets && revealTargets.length) {
        gsap.fromTo(
          revealTargets,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: mainRef.current, start: "top 85%" }
          }
        );
      }

      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 50 },
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

      if (sectionRef.current && !prefersReducedMotion) {
        gsap.to(sectionRef.current, {
          backgroundPosition: "50% 100%",
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-linear-to-br from-[#0a0a12] via-[#1a1030] to-[#0a0a12]
                 w-full min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundSize: "180% 180%" }}
    >
      {/* Grilla de puntos sutil */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #9b7fe6 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
        aria-hidden="true"
      />

      {/* Dos glows con roles distintos: morado = protagonista, celeste = contrapunto */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-150 h-150 bg-[#9b7fe6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-[#5ec8f0]/[0.07] rounded-full blur-3xl" />
      </div>

      {/* Scanline */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 2px)"
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Nav />

        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-8 pt-4">
          <div
            className="flex items-center gap-2 text-xs tracking-widest text-[#5ec8f0]/70"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#5ec8f0] animate-pulse"
              aria-hidden="true"
            />
            system online — bogotá, co
          </div>
        </div>

        <main
          ref={mainRef}
          className="grow flex flex-col justify-center items-center
                     px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20
                     pt-6 md:pt-8 lg:pt-12 pb-8 md:pb-12 lg:pb-16"
        >
          <div
            ref={titleRef}
            className="w-full mb-6 md:mb-8 lg:mb-12 px-2 sm:px-0"
          >
            <Title_2
              text="FRANKLYN GARZON | DEVELOPER FULL STACK"
              className="
                text-[#9b7fe6] font-extrabold text-center tracking-tight
                text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
                leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed
                px-2 sm:px-4
              "
            />
          </div>

          <p
            ref={paragraphRef}
            className="
              text-[#d6d3e6]/85 text-center leading-relaxed
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

          <div className="w-full space-y-12 md:space-y-16 lg:space-y-20 xl:space-y-24">
            <div className="reveal-on-scroll transform transition-transform duration-300 hover:scale-[1.01]">
              <Card />
            </div>
            <div className="reveal-on-scroll mt-8 md:mt-12">
              <Proyectos />
            </div>
            <div className="reveal-on-scroll mt-8 md:mt-12">
              <Noticias />
            </div>
          </div>
        </main>

        <div className="mt-8 md:mt-12 lg:mt-16 px-4 sm:px-6 md:px-8">
          <SkillsComponent />
        </div>

        <footer ref={footerRef} className="mt-12 md:mt-16 lg:mt-20">
          <Footer />
        </footer>
      </div>

      <div
        className={`hidden lg:block fixed bottom-8 right-8 z-20 transition-opacity duration-300 ${
          scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="w-10 h-16 border border-[#9b7fe6]/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#5ec8f0] rounded-full mt-3 animate-bounce" />
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`lg:hidden fixed bottom-6 right-6 z-20 w-12 h-12 border border-[#9b7fe6]/40
                   rounded-full flex items-center justify-center text-[#5ec8f0]
                   hover:bg-[#9b7fe6]/10 active:scale-95 transition-all duration-200 ${
                     scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
                   }`}
        aria-label="Volver arriba"
      >
        ↑
      </button>
    </section>
  );
};

export default Home;
