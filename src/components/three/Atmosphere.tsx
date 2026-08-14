import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* =========================================================
   DEPTH PARTICLES
========================================================= */

function DepthParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const particleCount = 180;

    const positions = new Float32Array(
      particleCount * 3,
    );

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      /*
       * Spread particles through
       * a large 3D volume.
       */

      positions[i3] =
        (Math.random() - 0.5) * 14;

      positions[i3 + 1] =
        (Math.random() - 0.5) * 10;

      positions[i3 + 2] =
        (Math.random() - 0.5) * 10 - 2;
    }

    const geometry =
      new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3,
      ),
    );

    return geometry;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) {
      return;
    }

    /*
     * Very slow continuous movement.
     */

    pointsRef.current.rotation.y +=
      delta * 0.008;

    pointsRef.current.rotation.x +=
      delta * 0.002;

    /*
     * Mouse creates subtle parallax.
     */

    const targetX =
      state.pointer.x * 0.08;

    const targetY =
      state.pointer.y * 0.05;

    pointsRef.current.position.x =
      THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        targetX,
        0.015,
      );

    pointsRef.current.position.y =
      THREE.MathUtils.lerp(
        pointsRef.current.position.y,
        targetY,
        0.015,
      );
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
    >
      <pointsMaterial
        color="#ffffff"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

/* =========================================================
   ATMOSPHERE
========================================================= */

function Atmosphere() {
  return (
    <>
      <DepthParticles />

      {/* Far background particles */}

      <points>
        <sphereGeometry
          args={[12, 32, 32]}
        />

        <pointsMaterial
          color="#6fa8ff"
          size={0.018}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </points>
    </>
  );
}

export default Atmosphere;