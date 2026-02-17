"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlobeMesh() {
  const wireRef   = useRef<THREE.Mesh>(null!);
  const dotsRef   = useRef<THREE.Points>(null!);
  const ringsRef  = useRef<THREE.Group>(null!);

  // Fibonacci sphere for evenly distributed dots
  const dotGeometry = useMemo(() => {
    const count = 260;
    const positions = new Float32Array(count * 3);
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      positions[i * 3]     = r * Math.cos(theta) * 2.2;
      positions[i * 3 + 1] = y * 2.2;
      positions[i * 3 + 2] = r * Math.sin(theta) * 2.2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  // Three orbital rings at different tilts
  const rings = useMemo(
    () => [
      { rotation: [Math.PI / 2, 0, 0]         as [number, number, number], color: "#6366f1" },
      { rotation: [Math.PI / 4, Math.PI / 6, 0] as [number, number, number], color: "#06b6d4" },
      { rotation: [0, 0, Math.PI / 3]          as [number, number, number], color: "#a78bfa" },
    ],
    []
  );

  useFrame((state, delta) => {
    wireRef.current.rotation.y  += delta * 0.14;
    wireRef.current.rotation.x  += delta * 0.04;
    dotsRef.current.rotation.y  += delta * 0.14;
    dotsRef.current.rotation.x  += delta * 0.04;
    ringsRef.current.rotation.y += delta * 0.06;
  });

  return (
    <>
      {/* Faint wireframe sphere */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[2.2, 28, 28]} />
        <meshBasicMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Fibonacci dots */}
      <points ref={dotsRef} geometry={dotGeometry}>
        <pointsMaterial
          size={0.05}
          color="#6366f1"
          transparent
          opacity={0.75}
          sizeAttenuation
        />
      </points>

      {/* Orbital rings */}
      <group ref={ringsRef}>
        {rings.map((ring, i) => (
          <mesh key={i} rotation={ring.rotation}>
            <torusGeometry args={[2.5 + i * 0.25, 0.008, 12, 120]} />
            <meshBasicMaterial
              color={ring.color}
              transparent
              opacity={0.18 - i * 0.04}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

export default function TechGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <GlobeMesh />
      <pointLight position={[5, 5, 5]} intensity={1} color="#6366f1" />
      <ambientLight intensity={0.3} color="#a78bfa" />
    </Canvas>
  );
}
