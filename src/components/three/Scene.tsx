import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  Float,
  Sparkles,
} from "@react-three/drei";

import {
  useEffect,
  useRef,
  type MutableRefObject,
} from "react";

import * as THREE from "three";
import Atmosphere from "./Atmosphere";
import Lighting from "./Lighting";
import {
  initSceneScrollController,
  type SceneScrollState,
} from "./SceneController";

/* =========================================================
   CAMERA CONTROLLER
========================================================= */

function CameraController({
  scrollState,
}: {
  scrollState: MutableRefObject<SceneScrollState>;
}) {
  const { camera } = useThree();

  useFrame((state) => {
    const progress = scrollState.current.progress;

    /*
     * Mouse position
     */

    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    /*
     * Camera target position
     */

      const targetX =
        mouseX * 0.18;

      const targetY =
        mouseY * 0.12;

      /*
      * Stronger cinematic pull-back.
      *
      * 0   → camera Z = 5
      * 1   → camera Z = 7
      */

        const targetZ =
          5 + progress * 2;

    /*
     * Smooth camera movement
     */

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetX,
      0.025,
    );

    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetY,
      0.025,
    );

    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      targetZ,
      0.025,
    );

    /*
     * Always look toward the center.
     */

    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* =========================================================
   ENERGY CORE
========================================================= */

function EnergyCore({
  scrollState,
}: {
  scrollState: MutableRefObject<SceneScrollState>;
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const outerRef =
    useRef<THREE.Mesh>(null);

  const innerRef =
    useRef<THREE.Mesh>(null);

  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (
      !groupRef.current ||
      !outerRef.current ||
      !innerRef.current
    ) {
      return;
    }

    const progress =
      scrollState.current.progress;

    /* =====================================================
       RESPONSIVE POSITION
    ===================================================== */

    const baseX =
      viewport.width > 8
        ? 2.2
        : viewport.width > 5
          ? 1.2
          : 0;

    const baseY =
      viewport.width > 5
        ? 0
        : -0.2;

    /* =====================================================
       SCROLL MOVEMENT
    ===================================================== */

    const scrollX =
      progress * 2.0;

    const scrollY =
      progress * 1.6;

    const scrollZ =
      progress * -2.0;

    const targetX =
      baseX + scrollX;

    const targetY =
      baseY + scrollY;

    /* =====================================================
       SMOOTH POSITION
    ===================================================== */

    groupRef.current.position.x =
      THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        0.035,
      );

    groupRef.current.position.y =
      THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.035,
      );

    groupRef.current.position.z =
      THREE.MathUtils.lerp(
        groupRef.current.position.z,
        scrollZ,
        0.035,
      );

    /* =====================================================
       CONTINUOUS ROTATION
    ===================================================== */

    outerRef.current.rotation.x +=
      delta * 0.08;

    outerRef.current.rotation.y +=
      delta * 0.12;

    innerRef.current.rotation.x -=
      delta * 0.04;

    innerRef.current.rotation.y -=
      delta * 0.08;

    /* =====================================================
       SCROLL ROTATION
    ===================================================== */

    groupRef.current.rotation.z =
      THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        progress * 1.2,
        0.035,
      );

    /* =====================================================
       SCROLL SCALE
    ===================================================== */

    const targetScale =
      THREE.MathUtils.lerp(
        1,
        0.45,
        progress,
    );

    groupRef.current.scale.x =
      THREE.MathUtils.lerp(
        groupRef.current.scale.x,
        targetScale,
        0.035,
      );

    groupRef.current.scale.y =
      THREE.MathUtils.lerp(
        groupRef.current.scale.y,
        targetScale,
        0.035,
      );

    groupRef.current.scale.z =
      THREE.MathUtils.lerp(
        groupRef.current.scale.z,
        targetScale,
        0.035,
      );

    /* =====================================================
       MOUSE INTERACTION
    ===================================================== */

    const mouseX =
      state.pointer.x * 0.25;

    const mouseY =
      state.pointer.y * 0.2;

    groupRef.current.rotation.x =
      THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseY,
        0.025,
      );

    groupRef.current.rotation.y =
      THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX,
        0.025,
      );
  });

  return (
    <group
      ref={groupRef}
      position={[2.2, 0, 0]}
    >
      <Float
        speed={1.2}
        rotationIntensity={0.15}
        floatIntensity={0.35}
      >
        {/* =================================================
            INNER ENERGY CORE
        ================================================= */}

        <mesh
          ref={innerRef}
          scale={0.85}
        >
          <icosahedronGeometry
            args={[1.15, 2]}
          />

          <meshStandardMaterial
            color="#182b46"
            metalness={0.85}
            roughness={0.18}
            emissive="#07111f"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* =================================================
            OUTER STRUCTURE
        ================================================= */}

        <mesh
          ref={outerRef}
          scale={1.05}
        >
          <icosahedronGeometry
            args={[1.45, 2]}
          />

          <meshBasicMaterial
            color="#6fa8ff"
            wireframe
            transparent
            opacity={0.28}
          />
        </mesh>

        {/* =================================================
            INNER GLOW
        ================================================= */}

        <mesh scale={0.38}>
          <sphereGeometry
            args={[1, 32, 32]}
          />

          <meshStandardMaterial
            color="#b9dcff"
            emissive="#4d9dff"
            emissiveIntensity={5}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
      </Float>

      {/* ===================================================
          FLOATING PARTICLES
      =================================================== */}

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

/* =========================================================
   SCENE CONTENT
========================================================= */

function SceneContent() {
  /*
   * ONE shared scroll state.
   *
   * Both the camera and EnergyCore
   * use this same state.
   */

  const scrollState =
    useRef<SceneScrollState>({
      progress: 0,
    });

  /*
   * Start the scroll controller.
   */

  useEffect(() => {
    return initSceneScrollController(
      scrollState.current,
    );
  }, []);

  return (
      <>
        <CameraController
          scrollState={scrollState}
        />

        {/* ===================================================
            3D ATMOSPHERE
        =================================================== */}

        <Atmosphere />

        <Lighting />

      {/* ===================================================
          3D OBJECT
      =================================================== */}

      <EnergyCore
        scrollState={scrollState}
      />
    </>
  );
}

/* =========================================================
   MAIN SCENE
========================================================= */

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
        <SceneContent />
      </Canvas>
    </div>
  );
}

export default Scene;