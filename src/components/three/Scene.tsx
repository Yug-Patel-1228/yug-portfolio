import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function EnergyCore() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!groupRef.current || !outerRef.current || !innerRef.current) {
      return;
    }

    /*
     * Responsive positioning
     *
     * Desktop  → move the 3D object slightly to the right
     * Tablet   → keep it closer to the center
     * Mobile   → center it behind the typography
     */
    const targetX =
      viewport.width > 8
        ? 2.2
        : viewport.width > 5
          ? 1.2
          : 0;

    const targetY =
      viewport.width > 5
        ? 0
        : -0.2;

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      0.025,
    );

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.025,
    );

    /*
     * Continuous rotation
     */
    outerRef.current.rotation.x += delta * 0.08;
    outerRef.current.rotation.y += delta * 0.12;

    innerRef.current.rotation.x -= delta * 0.04;
    innerRef.current.rotation.y -= delta * 0.08;

    /*
     * Mouse interaction
     */
    const mouseX = state.pointer.x * 0.25;
    const mouseY = state.pointer.y * 0.2;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseY,
      0.025,
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX,
      0.025,
    );
  });

  return (
    <group ref={groupRef} position={[2.2, 0, 0]}>
      <Float
        speed={1.2}
        rotationIntensity={0.15}
        floatIntensity={0.35}
      >
        {/* ================================
            INNER ENERGY CORE
        ================================= */}

        <mesh ref={innerRef} scale={0.85}>
          <icosahedronGeometry args={[1.15, 2]} />

          <meshStandardMaterial
            color="#182b46"
            metalness={0.85}
            roughness={0.18}
            emissive="#07111f"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* ================================
            OUTER STRUCTURE
        ================================= */}

        <mesh ref={outerRef} scale={1.05}>
          <icosahedronGeometry args={[1.45, 2]} />

          <meshBasicMaterial
            color="#6fa8ff"
            wireframe
            transparent
            opacity={0.28}
          />
        </mesh>

        {/* ================================
            INNER GLOW
        ================================= */}

        <mesh scale={0.38}>
          <sphereGeometry args={[1, 32, 32]} />

          <meshStandardMaterial
            color="#b9dcff"
            emissive="#4d9dff"
            emissiveIntensity={5}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
      </Float>

      {/* ================================
          FLOATING PARTICLES
      ================================= */}

      <Sparkles
        count={45}
        scale={[4, 4, 4]}
        size={1.8}
        speed={0.25}
        opacity={0.55}
      />
    </group>
  );
}

function Scene() {
  return (
    <div className="three-scene">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        {/* ================================
            LIGHTING
        ================================= */}

        <ambientLight intensity={0.35} />

        <directionalLight
          position={[4, 5, 5]}
          intensity={2.5}
        />

        <pointLight
          position={[3, 1, 3]}
          intensity={12}
          distance={8}
        />

        <pointLight
          position={[-3, -2, 2]}
          intensity={6}
          distance={7}
        />

        {/* ================================
            3D OBJECT
        ================================= */}

        <EnergyCore />
      </Canvas>
    </div>
  );
}

export default Scene;