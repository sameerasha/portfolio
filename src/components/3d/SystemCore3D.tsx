import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

interface SystemCore3DProps {
  reducedMotion?: boolean;
}

const scratchPointer = new THREE.Vector3();
const PARTICLES_COUNT = 180;

// Pre-computed spherical telemetry particle coordinates (deterministic, zero GC overhead)
const INITIAL_PARTICLE_POSITIONS = (() => {
  const pos = new Float32Array(PARTICLES_COUNT * 3);
  for (let i = 0; i < PARTICLES_COUNT; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLES_COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const radius = 2.4 + ((i * 137.5) % 16) / 10;
    pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = radius * Math.cos(phi);
  }
  return pos;
})();

export function SystemCore3D({ reducedMotion = false }: SystemCore3DProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const outerMeshRef = useRef<THREE.Mesh>(null!);
  const innerMeshRef = useRef<THREE.Mesh>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const particlesRef = useRef<THREE.Points>(null!);

  const particlePositions = INITIAL_PARTICLE_POSITIONS;

  useFrame((state, delta) => {
    if (reducedMotion) return;

    // Smooth pointer parallax tracking
    scratchPointer.set(state.pointer.x * 0.7, state.pointer.y * 0.4, 0);
    if (groupRef.current) {
      groupRef.current.position.lerp(scratchPointer, 1 - Math.exp(-3.5 * delta));
    }

    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x += delta * 0.18;
      outerMeshRef.current.rotation.y += delta * 0.28;
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= delta * 0.35;
      innerMeshRef.current.rotation.z += delta * 0.25;
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 0.12;
      ringRef1.current.rotation.y += delta * 0.15;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.y -= delta * 0.2;
      ringRef2.current.rotation.z += delta * 0.1;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.8}
      rotationIntensity={reducedMotion ? 0 : 0.4}
      floatIntensity={reducedMotion ? 0 : 0.6}
    >
      <group ref={groupRef}>
        {/* Outer Architectural Metallic Knot */}
        <mesh ref={outerMeshRef} castShadow receiveShadow>
          <torusKnotGeometry args={[1.35, 0.36, 128, 32, 2, 3]} />
          <meshStandardMaterial
            color={isLight ? '#94a3b8' : '#2a3347'}
            metalness={isLight ? 0.88 : 0.92}
            roughness={isLight ? 0.22 : 0.18}
            wireframe={false}
            envMapIntensity={isLight ? 1.8 : 1.5}
          />
        </mesh>

        {/* Blueprint wireframe shell */}
        <mesh>
          <torusKnotGeometry args={[1.36, 0.365, 64, 16, 2, 3]} />
          <meshBasicMaterial
            color={isLight ? '#0284c7' : '#38bdf8'}
            wireframe
            transparent
            opacity={isLight ? 0.2 : 0.12}
          />
        </mesh>

        {/* Inner Crystalline Data Core */}
        <mesh ref={innerMeshRef}>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshStandardMaterial
            color={isLight ? '#0284c7' : '#38bdf8'}
            emissive={isLight ? '#0369a1' : '#0284c7'}
            emissiveIntensity={isLight ? 1.6 : 1.4}
            wireframe
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Deep Core Glowing Solid */}
        <mesh>
          <sphereGeometry args={[0.35, 24, 24]} />
          <meshBasicMaterial color={isLight ? '#6366f1' : '#818cf8'} />
        </mesh>

        {/* Orbital Gyroscopic Rings */}
        <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.1, 0.018, 16, 100]} />
          <meshStandardMaterial
            color={isLight ? '#0284c7' : '#38bdf8'}
            emissive={isLight ? '#0369a1' : '#0284c7'}
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        <mesh ref={ringRef2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[2.3, 0.015, 16, 100]} />
          <meshStandardMaterial
            color={isLight ? '#6366f1' : '#818cf8'}
            emissive={isLight ? '#4f46e5' : '#4f46e5'}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Surrounding Telemetry Points */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            color={isLight ? '#0284c7' : '#67e8f9'}
            transparent
            opacity={isLight ? 0.8 : 0.7}
            sizeAttenuation
          />
        </points>
      </group>
    </Float>
  );
}
