import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Lighting() {
  const keyLightRef = useRef<THREE.PointLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (keyLightRef.current) {
      keyLightRef.current.position.x =
        3 + Math.sin(time * 0.25) * 1.2;

      keyLightRef.current.position.y =
        2 + Math.cos(time * 0.2) * 0.6;
    }

    if (fillLightRef.current) {
      fillLightRef.current.position.x =
        -3 + Math.cos(time * 0.18) * 1;

      fillLightRef.current.position.y =
        -1 + Math.sin(time * 0.15) * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.22} />

      <directionalLight
        position={[4, 5, 5]}
        intensity={1.5}
      />

      <pointLight
        ref={keyLightRef}
        position={[3, 2, 3]}
        intensity={10}
        distance={9}
        decay={2}
        color="#6fa8ff"
      />

      <pointLight
        ref={fillLightRef}
        position={[-3, -1, 2]}
        intensity={5}
        distance={7}
        decay={2}
        color="#4d7cff"
      />
    </>
  );
}

export default Lighting;