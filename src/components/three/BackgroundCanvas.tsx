"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useMousePosition } from "@/hooks/useMousePosition";

const FULL_PARTICLE_COUNT = 5500;
const REDUCED_PARTICLE_COUNT = 2600;
const SPREAD = 22;

function pseudoRandom(seed: number): number {
  const n = Math.sin(seed * 12.9898) * 43758.5453123;
  return n - Math.floor(n);
}

function ParticleField({
  count,
  mouseTracking,
}: {
  count: number;
  mouseTracking: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null!);
  const mouseRef = useMousePosition({ enabled: mouseTracking });

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#6366f1"), // indigo
      new THREE.Color("#a78bfa"), // violet
      new THREE.Color("#06b6d4"), // cyan
      new THREE.Color("#c7d2fe"), // indigo-light
      new THREE.Color("#e0f2fe"), // sky-light
    ];

    for (let i = 0; i < count; i++) {
      const seed = i + 1;
      // Uniform distribution in a sphere
      const u = pseudoRandom(seed * 4.11);
      const v = pseudoRandom(seed * 7.37 + 13.7);
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = SPREAD * Math.cbrt(pseudoRandom(seed * 11.73 + 5.3));

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Weight toward indigo/violet for brand cohesion
      const w = pseudoRandom(seed * 17.19 + 2.1);
      const col = w < 0.40 ? palette[0]
                : w < 0.65 ? palette[1]
                : w < 0.80 ? palette[2]
                : w < 0.92 ? palette[3]
                : palette[4];

      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors,    3));
    return geo;
  }, [count]);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Slow steady rotation
    pointsRef.current.rotation.y += delta * 0.018;
    pointsRef.current.rotation.x += delta * 0.006;

    // Gentle camera parallax following mouse
    const mx = mouseRef.current.normalizedX;
    const my = mouseRef.current.normalizedY;
    state.camera.position.x +=
      (mx * 0.8 - state.camera.position.x) * 0.03;
    state.camera.position.y +=
      (my * 0.5 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingGeometries() {
  type Shape = "icosahedron" | "octahedron" | "tetrahedron";
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const shapes: {
    type: Shape;
    position: [number, number, number];
    scale: number;
    speedX: number;
    speedY: number;
    opacity: number;
  }[] = useMemo(
    () => [
      { type: "icosahedron", position: [-7,  3, -9],  scale: 0.9,  speedX: 0.25, speedY: 0.35, opacity: 0.10 },
      { type: "octahedron",  position: [ 8, -2, -8],  scale: 0.65, speedX: 0.40, speedY: 0.55, opacity: 0.12 },
      { type: "tetrahedron", position: [ 4,  6, -12], scale: 0.80, speedX: 0.30, speedY: 0.45, opacity: 0.09 },
      { type: "icosahedron", position: [-5, -5, -10], scale: 0.55, speedX: 0.35, speedY: 0.28, opacity: 0.08 },
      { type: "octahedron",  position: [ 2, -7, -11], scale: 1.00, speedX: 0.20, speedY: 0.30, opacity: 0.07 },
      { type: "tetrahedron", position: [-9,  1, -13], scale: 0.70, speedX: 0.45, speedY: 0.20, opacity: 0.08 },
    ],
    []
  );

  useFrame((state) => {
    shapes.forEach((shape, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      mesh.rotation.x = state.clock.elapsedTime * shape.speedX;
      mesh.rotation.y = state.clock.elapsedTime * shape.speedY;
    });
  });

  return (
    <>
      {shapes.map((shape, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={shape.position}
          scale={shape.scale}
        >
          {shape.type === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
          {shape.type === "octahedron"  && <octahedronGeometry  args={[1]}    />}
          {shape.type === "tetrahedron" && <tetrahedronGeometry args={[1]}    />}
          <meshBasicMaterial
            color="#6366f1"
            wireframe
            transparent
            opacity={shape.opacity}
          />
        </mesh>
      ))}
    </>
  );
}

function Scene({
  lowPerformanceMode,
  mouseTracking,
}: {
  lowPerformanceMode: boolean;
  mouseTracking: boolean;
}) {
  const particleCount = lowPerformanceMode
    ? REDUCED_PARTICLE_COUNT
    : FULL_PARTICLE_COUNT;

  return (
    <>
      <ParticleField count={particleCount} mouseTracking={mouseTracking} />
      {!lowPerformanceMode && <FloatingGeometries />}
      {!lowPerformanceMode && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
            intensity={0.9}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </>
  );
}

export default function BackgroundCanvas() {
  const [lowPerformanceMode, setLowPerformanceMode] = useState(false);
  const [mouseTracking, setMouseTracking] = useState(true);

  useEffect(() => {
    const reducedMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerMq = window.matchMedia("(pointer: coarse)");
    const narrowViewportMq = window.matchMedia("(max-width: 768px)");

    const updateModes = () => {
      const lowMode =
        reducedMotionMq.matches ||
        coarsePointerMq.matches ||
        narrowViewportMq.matches;
      setLowPerformanceMode(lowMode);
      // Allow touch devices to drive the parallax — only disable for reduced-motion
      setMouseTracking(!reducedMotionMq.matches);
    };

    updateModes();
    reducedMotionMq.addEventListener("change", updateModes);
    coarsePointerMq.addEventListener("change", updateModes);
    narrowViewportMq.addEventListener("change", updateModes);

    return () => {
      reducedMotionMq.removeEventListener("change", updateModes);
      coarsePointerMq.removeEventListener("change", updateModes);
      narrowViewportMq.removeEventListener("change", updateModes);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 72 }}
        gl={{
          antialias: !lowPerformanceMode,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={lowPerformanceMode ? 1 : [1, 1.5]}
      >
        <Scene
          lowPerformanceMode={lowPerformanceMode}
          mouseTracking={mouseTracking}
        />
      </Canvas>
    </div>
  );
}
