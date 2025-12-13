import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, useSphere, usePlane } from "@react-three/cannon";

const EsferaFisica = () => {
  return (
    <Canvas style={{ height: "500px", width: "100%" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} />

      {/* Mundo físico */}
      <Physics gravity={[0, -9.8, 0]}>
        <Sphere />
        <Plane />
      </Physics>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

const Sphere = () => {
  const [ref] = useSphere(() => ({
    mass: 1, // masa de la esfera
    position: [0, 2, 0], // posición inicial
  }));

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

const Plane = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

export default EsferaFisica;
