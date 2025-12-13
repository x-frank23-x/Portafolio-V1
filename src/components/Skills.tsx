import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
// Importación de iconos de react-icons para todas las tecnologías relevantes del CV
import {
  SiReact,
  SiTailwindcss,
  SiPython,
  SiReactrouter, // Usado para React Native
  SiAngular,
  SiFlutter,
  SiFastapi,
  SiNodedotjs,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiMysql,
  SiFirebase
} from 'react-icons/si';

const SkillsComponent = () => {
  // Asegúrate de que containerRef esté definido aquí, al principio
  const containerRef = useRef(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null); // Estado para el modal

  // Lista de tecnologías basada en el CV con sus respectivos iconos, descripciones e imágenes
  const technologies = [
    { 
      name: 'React', 
      icon: <SiReact size={30} className="text-blue-500" />, 
      description: 'Frontend Library for UIs', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', 
      detailedDescription: 'React is a JavaScript library for building user interfaces. Franklyn usó React para diseñar e implementar la interfaz de usuario en Skanor y para desarrollar la plataforma empresarial Fullstack de Living Publicidad.' 
    },
    { 
      name: 'React Native', 
      icon: <SiReactrouter size={30} className="text-cyan-400" />, 
      description: 'Mobile App Development', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', 
      detailedDescription: 'React Native is a framework for building native mobile apps using React and JavaScript. Es una de las habilidades clave de Franklyn en el desarrollo móvil.' 
    },
    { 
      name: 'Angular', 
      icon: <SiAngular size={30} className="text-red-600" />, 
      description: 'TypeScript-based Web Framework', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg', 
      detailedDescription: 'Angular es una plataforma y framework para construir aplicaciones de cliente de una sola página utilizando HTML y TypeScript. Forma parte de su experiencia en Frontend.' 
    },
    { 
      name: 'Flutter', 
      icon: <SiFlutter size={30} className="text-blue-400" />, 
      description: 'Cross-platform Mobile UI', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png', 
      detailedDescription: 'Flutter es el UI toolkit de Google. Franklyn lo utilizó para la creación y desarrollo de una aplicación móvil para la administración del equipo deportivo Mallorca.' 
    },
    { 
      name: 'Python', 
      icon: <SiPython size={30} className="text-yellow-500" />, 
      description: 'Backend & Data Processing', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg', 
      detailedDescription: 'Python es un lenguaje de programación de alto nivel. Franklyn tiene experiencia con frameworks como Django y FastAPI.' 
    },
    { 
      name: 'FastAPI', 
      icon: <SiFastapi size={30} className="text-teal-500" />, 
      description: 'High-performance Python API', 
      image: 'https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png', 
      detailedDescription: 'FastAPI es un framework web rápido para construir APIs con Python. Es una tecnología moderna destacada en el perfil profesional.' 
    },
    { 
      name: 'Node.js', 
      icon: <SiNodedotjs size={30} className="text-green-500" />, 
      description: 'JavaScript Runtime for Backend', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg', 
      detailedDescription: 'Node.js es un entorno de ejecución de JavaScript del lado del servidor. Franklyn lo usó en la plataforma Fullstack empresarial de Living Publicidad.' 
    },
    { 
      name: 'PostgreSQL', 
      icon: <SiPostgresql size={30} className="text-blue-700" />, 
      description: 'Robust Relational Database', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg', 
      detailedDescription: 'PostgreSQL es un sistema de gestión de bases de datos relacionales avanzado. Fue usado para la gestión de datos en la aplicación empresarial de Living Publicidad.' 
    },
    { 
      name: 'MySQL', 
      icon: <SiMysql size={30} className="text-orange-600" />, 
      description: 'Popular Relational Database', 
      image: 'https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg', 
      detailedDescription: 'MySQL es un sistema de gestión de bases de datos relacionales. Es una de las habilidades de Franklyn en Bases de Datos.' 
    },
    { 
      name: 'Git', 
      icon: <SiGit size={30} className="text-red-500" />, 
      description: 'Version Control System', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg', 
      detailedDescription: 'Git es un sistema de control de versiones distribuido, fundamental en el desarrollo y la colaboración en proyectos.' 
    },
    { 
      name: 'Docker', 
      icon: <SiDocker size={30} className="text-blue-600" />, 
      description: 'Containerization Platform', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg', 
      detailedDescription: 'Docker es una plataforma de contenedorización que facilita el despliegue y la escalabilidad de aplicaciones.' 
    },
    { 
      name: 'Tailwind CSS', 
      icon: <SiTailwindcss size={30} className="text-teal-400" />, 
      description: 'Utility-First CSS Framework', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg', 
      detailedDescription: 'Tailwind CSS es un framework CSS utility-first. Franklyn lo utilizó en Skanor para implementar la interfaz de usuario.' 
    },
    { 
      name: 'Firebase', 
      icon: <SiFirebase size={30} className="text-yellow-600" />, 
      description: 'Mobile and Web App Platform', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Firebase_logo.svg', 
      detailedDescription: 'Firebase es una plataforma para aplicaciones móviles y web. Franklyn la usó junto a Flutter para la administración del equipo deportivo Mallorca.' 
    },
  ];
  
  const radius = 200; // Radio del círculo aumentado para más esferas
  const sphereSize = 60; // Tamaño de las esferas

  useEffect(() => {
    // Animación de entrada con GSAP para las esferas
    gsap.from('.skill-sphere', {
      opacity: 1,
      scale: 1,
      duration: 1,
      stagger: 0.1, // Stagger más pequeño para la nueva cantidad
      ease: 'power3.out',
    });

    // Nueva animación: Rotación infinita del contenedor de esferas
    gsap.to('.spheres-container', {
      rotation: 80, // Rota 360 grados
      duration: 20, // Tiempo para una vuelta completa (ajusta según prefieras, ej. 10 para más rápido)
      ease: 'none', // Movimiento constante, sin aceleración
      repeat: -1, // Repite infinitamente
    });
  }, []);

  // Animación para el modal al abrirse
  useEffect(() => {
    if (selectedTech) {
      gsap.fromTo('.modal-panel', { x: 300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
    }
  }, [selectedTech]);

  return (
    <div
      ref={containerRef}  // Aquí se usa containerRef, asegúrate de que esté definido arriba
      className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden"
    >
      <h2 className="text-3xl font-bold text-white mb-10 z-20">Full-Stack Tech Orbit 🌌</h2>
      
      {/* Contenedor principal con flex para el círculo y el modal */}
      <div className="relative flex items-center justify-center w-full">
        {/* 2. Contenedor del círculo con las esferas de habilidades */}
        <div className="relative z-10 flex items-center justify-center" style={{ width: '500px', height: '500px' }}>
          
          {/* Centro del Círculo (Placeholder para el nombre o logo principal) */}
          <div className="absolute w-28 h-28 bg-gray-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
              <span className="text-white font-bold text-sm text-center">FRANKLYN<br/>DEV</span>
          </div>
          
          {/* Nuevo contenedor para las esferas (este es el que gira) */}
          <div className="spheres-container absolute inset-0">
            {/* Esferas de Habilidades */}
            {technologies.map((tech, index) => {
              // Calcula el ángulo para distribuir uniformemente las esferas
              const angle = (index / technologies.length) * 360; 
              
              // Estilo para posicionar la esfera en el círculo
              const transformStyle = `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;

              return (
                <div
                  key={tech.name}
                  className="absolute skill-sphere cursor-pointer transition duration-300"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: transformStyle,
                    width: `${sphereSize}px`,
                    height: `${sphereSize}px`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: '50%', 
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.4)',
                    border: '3px solid',
                    borderColor: hoveredTech === tech.name ? 'rgb(59 130 246)' : 'transparent', // Borde azul al hacer hover
                    transformOrigin: '0% 0%', // Permite el movimiento circular
                    marginLeft: `-${sphereSize / 2}px`, // Ajusta para centrar la esfera
                    marginTop: `-${sphereSize / 2}px`, // Ajusta para centrar la esfera
                    zIndex: hoveredTech === tech.name ? 30 : 20, // Eleva la esfera al hacer hover
                  }}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  onClick={() => setSelectedTech(tech)} // Abre el modal al hacer clic
                >
                  {tech.icon}
                  
                  {/* Tooltip/Descripción al hacer hover */}
                  {hoveredTech === tech.name && (
                    <div 
                        className="absolute bottom-full mb-3 p-2 bg-gray-700 text-white text-xs rounded-lg whitespace-nowrap shadow-xl"
                        style={{ 
                            // Intenta centrarlo sobre la esfera
                            transform: 'translateX(-50%)', 
                            left: '50%'
                        }}
                    >
                        {tech.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Modal a la derecha */}
        {selectedTech && (
          <div className="modal-panel absolute right-0 top-0 w-80 h-full bg-gray-800 p-6 shadow-2xl z-40 overflow-y-auto">
            <button 
              onClick={() => setSelectedTech(null)} 
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-400"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              {/* Imagen de la tecnología */}
              <img 
                src={selectedTech.image} 
                alt={`${selectedTech.name} logo`} 
                className="w-20 h-20 mb-4 object-contain" 
              />
              {/* Icono */}
              <div className="mb-4">{selectedTech.icon}</div>
              {/* Nombre */}
              <h3 className="text-2xl font-bold text-white mb-2">{selectedTech.name}</h3>
              {/* Descripción detallada */}
              <p className="text-gray-300 text-center text-sm leading-relaxed">{selectedTech.detailedDescription}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Información de la experiencia para contexto */}
      <div className="mt-16 text-center text-gray-400 max-w-3xl z-20">
          <p className="text-sm">Technologies used in experience: <span className="font-semibold text-white">React, Tailwind CSS, Node.js, PostgreSQL, Flutter, Firebase</span>.</p>
      </div>
    </div>
  );
};

export default SkillsComponent;
