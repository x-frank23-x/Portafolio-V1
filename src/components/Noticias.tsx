import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Noticia {
  id: number;
  slug: string;
  titulo: string;
  texto: string;
  imagen: string;
  fecha: string;
}

const noticiasData: Noticia[] = [
  {
    id: 1,
    slug: "cobol",
    titulo: "Aprendiendo COBOL",
    texto:
      "Estoy comenzando a aprender COBOL para ampliar mis conocimientos y entender qué lenguajes antiguos se siguen utilizando en la actualidad.",
    imagen: "cobol.jpeg",
    fecha: "2026.06.02"
  },
  {
    id: 2,
    slug: "ucc",
    titulo: "Proyecto UCC continúa",
    texto:
      "El proyecto de UCC se alargó más tiempo de lo previsto: creé un programa para la generación de actas de mantenimiento y una parte de los tickets, reduciendo este proceso en un 80%. Ahora se evalúa automatizar por completo la generación de tickets y sus reportes.",
    imagen: "ucc.jpeg",
    fecha: "2026.06.14"
  },
  {
    id: 3,
    slug: "uni",
    titulo: "Inicio de décimo cuatrimestre",
    texto:
      "Inicié mi décimo cuatrimestre en la universidad, fortaleciendo mis conocimientos en desarrollo de software y consolidando mi perfil como futuro ingeniero de software.",
    imagen: "uni.png",
    fecha: "2026.06.20"
  },
  {
    id: 4,
    slug: "arch",
    titulo: "Configurando Arch Linux",
    texto:
      "Estoy terminando de configurar mi Arch Linux portable; quiero poder hacer pruebas de hardware y también programar si es requerido en proyectos.",
    imagen: "arch.png",
    fecha: "2026.07.01"
  }
];

const AUTOPLAY_MS = 6500;

const Noticias = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isAnimatingRef = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = noticiasData.length;

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimatingRef.current) return;
      setCurrentIndex(((index % total) + total) % total);
    },
    [total]
  );

  const handleNext = useCallback(
    () => goToSlide(currentIndex + 1),
    [currentIndex, goToSlide]
  );
  const handlePrev = useCallback(
    () => goToSlide(currentIndex - 1),
    [currentIndex, goToSlide]
  );

  // Slide track
  useEffect(() => {
    if (!trackRef.current) return;
    isAnimatingRef.current = true;
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -currentIndex * 100,
      duration: 0.65,
      ease: "power3.out",
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    });
    return () => {
      tweenRef.current?.kill();
    };
  }, [currentIndex]);

  // Progress bar (buffer style)
  useEffect(() => {
    if (!progressRef.current) return;
    gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: isPaused ? 999 : AUTOPLAY_MS / 1000,
        ease: "none",
        transformOrigin: "left center"
      }
    );
  }, [currentIndex, isPaused]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const id = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [isPaused, total]);

  // Teclado
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNext, handlePrev]);

  // Swipe táctil
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) handlePrev();
    else if (delta < -50) handleNext();
    touchStartX.current = null;
  };

  return (
    <section
      className="w-screen relative left-1/2 right-1/2 mx-[-50vw] bg-[#02172c] text-[#c9d1d9] py-16 md:py-24"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Header tipo bitácora */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-10 flex items-baseline justify-between border-b border-white/10 pb-4">
        <div className="flex items-baseline gap-3">
          <span className="text-[#7ee3c8] text-sm tracking-widest">$</span>
          <h2 className="text-xl md:text-2xl font-medium tracking-tight text-white">
            tail -f /var/log/novedades
          </h2>
          <span className="text-[#7ee3c8] animate-pulse text-xl leading-none">
            _
          </span>
        </div>
        <span className="hidden md:block text-xs text-white/30 tracking-wider">
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Barra de progreso (buffer) */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-8">
        <div className="h-0.5 w-full bg-white/10 overflow-hidden">
          <div
            key={currentIndex}
            ref={progressRef}
            className="h-full bg-[#7ee3c8] origin-left"
          />
        </div>
      </div>

      {/* Carrusel full-width */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Últimas novedades"
      >
        <div ref={trackRef} className="flex w-full will-change-transform">
          {noticiasData.map((noticia, index) => (
            <div
              key={noticia.id}
              className="w-full shrink-0 grow-0"
              aria-hidden={index !== currentIndex}
            >
              <article className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
                {/* Gutter tipo editor de código */}
                <div className="md:col-span-1 hidden md:flex flex-col items-start text-white/25 text-xs tracking-widest select-none">
                  <span className="text-[#7ee3c8]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 [writing-mode:vertical-rl] rotate-180">
                    {noticia.fecha}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <img
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    className="w-full h-56 md:h-72 object-cover grayscale-15 contrast-110"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>

                <div
                  className="md:col-span-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span
                    className="md:hidden inline-block mb-2 text-[#7ee3c8] text-xs tracking-widest"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {String(index + 1).padStart(2, "0")} · {noticia.fecha}
                  </span>
                  <h3
                    className="text-2xl md:text-4xl font-medium mb-4 text-white tracking-tight"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {noticia.titulo}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-[#c9d1d9]/80">
                    {noticia.texto}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Navegación: lista de índice, no dots */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-10 flex items-center justify-between border-t border-white/10 pt-6">
        <div className="flex gap-1">
          {noticiasData.map((noticia, index) => (
            <button
              key={noticia.id}
              onClick={() => goToSlide(index)}
              className={`px-3 py-1.5 text-xs tracking-wider transition-colors duration-200 border ${
                index === currentIndex
                  ? "border-[#7ee3c8] text-[#7ee3c8]"
                  : "border-white/10 text-white/35 hover:text-white/60 hover:border-white/25"
              }`}
              aria-current={index === currentIndex ? "true" : "false"}
            >
              {noticia.slug}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/60 hover:border-[#7ee3c8] hover:text-[#7ee3c8] transition-colors duration-200"
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/60 hover:border-[#7ee3c8] hover:text-[#7ee3c8] transition-colors duration-200"
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Noticias;
