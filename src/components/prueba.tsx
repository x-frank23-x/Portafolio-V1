import { Canvas } from "@react-three/fiber";
import { OrbitControls, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { Physics, useSphere, usePlane } from "@react-three/cannon";
import { Suspense } from "react";

const Prueba = () => {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Escena 3D */}
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl border border-cyan-400/20">
                <Canvas
                    shadows
                    dpr={[1, 2]}
                    camera={{ position: [0, 5, 10], fov: 50 }}
                >
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.4} />
                        <directionalLight
                            position={[5, 8, 5]}
                            intensity={1}
                            castShadow
                            shadow-mapSize-width={1024}
                            shadow-mapSize-height={1024}
                        />

                        <Physics gravity={[0, -9.8, 0]}>
                            <Sphere />
                            <Ground />
                        </Physics>

                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            maxPolarAngle={Math.PI / 2}
                        />

                        <AdaptiveDpr pixelated />
                        <AdaptiveEvents />
                    </Suspense>
                </Canvas>
            </div>

            {/* Contenido descriptivo */}
            <div className="text-gray-200 space-y-6">
                <h2 className="text-3xl font-extrabold text-cyan-400">
                    Experiencia y Tecnologías
                </h2>

                <ul className="space-y-4 text-base leading-relaxed">
                    <li>
                        <span className="font-semibold text-cyan-400">Firebase · Flutter · Dart:</span>{" "}
                        Implementados en el proyecto <strong>Malloca</strong> para autenticación y manejo
                        de datos en tiempo real en una aplicación móvil multiplataforma.
                    </li>

                    <li>
                        <span className="font-semibold text-cyan-400">Angular · C#:</span>{" "}
                        Desarrollo de una aplicación tipo <strong>CRUD</strong>, enfocada en consumo de APIs,
                        formularios reactivos y operaciones básicas sobre datos.
                    </li>

                    <li>
                        <span className="font-semibold text-cyan-400">Java:</span>{" "}
                        Uso en proyectos académicos universitarios aplicando programación orientada a objetos
                        y lógica de negocio.
                    </li>

                    <li>
                        <span className="font-semibold text-cyan-400">PostgreSQL:</span>{" "}
                        Base de datos utilizada como solución preferencial para modelado relacional,
                        consultas SQL y persistencia de datos.
                    </li>

                    <li>
                        <span className="font-semibold text-cyan-400">Python:</span>{" "}
                        Empleado en pruebas técnicas, automatización y creación de pequeños ejecutables.
                    </li>

                    <li>
                        <span className="font-semibold text-cyan-400">Tailwind CSS:</span>{" "}
                        Utilizado para la construcción de interfaces modernas, responsivas y consistentes.
                    </li>

                    <li>
                        <span className="font-semibold text-cyan-400">Docker:</span>{" "}
                        Uso en una prueba técnica para contenerización y configuración controlada del entorno
                        de ejecución.
                    </li>
                </ul>
            </div>
        </section>
    );
};

const Sphere = () => {
    const [ref] = useSphere(() => ({
        mass: 1,
        position: [0, 2, 0],
        args: [1],
        material: {
            restitution: 0.6,
            friction: 0.2,
        },
    }));

    return (
        <mesh ref={ref} castShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#22d3ee" />
        </mesh>
    );
};

const Ground = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0, 0],
        type: "Static",
    }));

    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#0f172a" />
        </mesh>
    );
};

export default Prueba;
