import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

interface HolographicCore3DProps {
  reducedMotion?: boolean;
}

export function HolographicCore3D({ reducedMotion = false }: HolographicCore3DProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { viewport } = useThree();

  const groupRef = useRef<THREE.Group>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const innerCoreRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);
  const telemetryRingRef = useRef<THREE.Mesh>(null!);
  const satellitesRef = useRef<THREE.Group>(null!);
  const particlesRef = useRef<THREE.Points>(null!);

  // Responsive safe scaling: ensures all outer rings have at least 15-20% margin
  // inside the visible frustum across all viewport dimensions and aspect ratios
  const responsiveScale = useMemo(() => {
    const minDim = Math.min(viewport.width, viewport.height);
    if (minDim < 4.8) {
      return Math.max(0.68, minDim / 4.8);
    }
    return 1.0;
  }, [viewport.width, viewport.height]);

  // Procedural constellation points strictly contained within the safe inner envelope
  const particleCount = 100;
  const [particlePositions, particleColors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const c1 = new THREE.Color(isLight ? '#0284c7' : '#38bdf8');
    const c2 = new THREE.Color(isLight ? '#4f46e5' : '#818cf8');
    const c3 = new THREE.Color(isLight ? '#0ea5e9' : '#c084fc');
    const palette = [c1, c2, c3];

    for (let i = 0; i < particleCount; i++) {
      // Radii strictly bounded between 0.95 and 2.10 so particles never clip against canvas bounds
      const r = 0.95 + Math.random() * 1.15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = palette[i % palette.length];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [isLight]);

  // Satellites orbiting around the core safely within the outer ring
  const satellites = useMemo(
    () => [
      { id: 'kafka', radius: 1.34, speed: 1.05, offset: 0, color: '#38bdf8', size: 0.085 },
      { id: 'spring', radius: 1.60, speed: -0.85, offset: 1.8, color: '#34d399', size: 0.075 },
      { id: 'db', radius: 1.84, speed: 0.65, offset: 3.5, color: '#818cf8', size: 0.08 },
      { id: 'cloud', radius: 2.06, speed: -0.52, offset: 5.1, color: '#fbbf24', size: 0.07 },
    ],
    []
  );

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;

    // Apply responsive base scale dynamically
    if (groupRef.current) {
      groupRef.current.scale.set(responsiveScale, responsiveScale, responsiveScale);

      // Smooth pointer parallax tracking with gentle damping (tight range prevents clipping)
      const targetX = state.pointer.x * 0.28;
      const targetY = state.pointer.y * 0.18;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX + t * 0.1, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY * 0.35, 0.04);
    }

    // Multi-Axis Core Rotations
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.35;
      coreRef.current.rotation.x = t * 0.22;
      const scale = 1 + Math.sin(t * 2.2) * 0.035;
      coreRef.current.scale.set(scale, scale, scale);
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = -t * 0.52;
      innerCoreRef.current.rotation.z = t * 0.26;
    }

    // Counter-Rotating Gyro Rings with elegant harmonic cadence
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.32;
      ring1Ref.current.rotation.y = t * 0.22;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.36;
      ring2Ref.current.rotation.z = t * 0.18;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.28;
      ring3Ref.current.rotation.x = -t * 0.16;
    }
    if (telemetryRingRef.current) {
      telemetryRingRef.current.rotation.x = -t * 0.15;
      telemetryRingRef.current.rotation.y = t * 0.18;
    }

    // Satellite Orbiting Paths
    if (satellitesRef.current) {
      satellitesRef.current.children.forEach((mesh, idx) => {
        const sat = satellites[idx];
        const angle = t * sat.speed + sat.offset;
        mesh.position.x = Math.cos(angle) * sat.radius;
        mesh.position.z = Math.sin(angle) * sat.radius;
        mesh.position.y = Math.sin(angle * 2) * 0.24;
      });
    }

    // Gentle particle swirl
    if (particlesRef.current) {
      particlesRef.current.rotation.y = delta * 0.04 + particlesRef.current.rotation.y;
    }
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.6}
      rotationIntensity={reducedMotion ? 0 : 0.12}
      floatIntensity={reducedMotion ? 0 : 0.18}
    >
      <group ref={groupRef}>
        {/* Central Quantum Faceted Polyhedron Core */}
        <mesh ref={coreRef} castShadow>
          <octahedronGeometry args={[0.82, 0]} />
          <meshPhysicalMaterial
            color={isLight ? '#ffffff' : '#0f172a'}
            emissive={isLight ? '#0284c7' : '#0284c7'}
            emissiveIntensity={isLight ? 0.35 : 0.85}
            roughness={isLight ? 0.08 : 0.15}
            metalness={isLight ? 0.98 : 0.92}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Crystalline Inner Core Matrix */}
        <mesh ref={innerCoreRef}>
          <icosahedronGeometry args={[0.48, 1]} />
          <meshStandardMaterial
            color={isLight ? '#0284c7' : '#38bdf8'}
            emissive={isLight ? '#4f46e5' : '#38bdf8'}
            emissiveIntensity={isLight ? 0.6 : 1.2}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Deep Pulsing Heart */}
        <mesh>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshBasicMaterial color={isLight ? '#0284c7' : '#67e8f9'} />
        </mesh>

        {/* Gyroscopic Ring 1: Inner Equatorial Telemetry Ring */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.24, 0.022, 16, 96]} />
          <meshStandardMaterial
            color={isLight ? '#0284c7' : '#38bdf8'}
            emissive={isLight ? '#0284c7' : '#0284c7'}
            emissiveIntensity={isLight ? 0.6 : 0.5}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Gyroscopic Ring 2: Polar Orbital Ring */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.52, 0.018, 16, 96]} />
          <meshStandardMaterial
            color={isLight ? '#4f46e5' : '#818cf8'}
            emissive={isLight ? '#4f46e5' : '#6366f1'}
            emissiveIntensity={isLight ? 0.55 : 0.45}
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>

        {/* Gyroscopic Ring 3: Oblique Precession Ring (Outermost Ring - calibrated to never clip) */}
        <mesh ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[1.80, 0.015, 16, 96]} />
          <meshStandardMaterial
            color={isLight ? '#0ea5e9' : '#c084fc'}
            emissive={isLight ? '#0ea5e9' : '#a855f7'}
            emissiveIntensity={isLight ? 0.5 : 0.4}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Fine Architectural Telemetry Accent Ring */}
        <mesh ref={telemetryRingRef} rotation={[0, Math.PI / 6, 0]}>
          <torusGeometry args={[1.66, 0.007, 8, 64]} />
          <meshStandardMaterial
            color={isLight ? '#38bdf8' : '#67e8f9'}
            emissive={isLight ? '#0284c7' : '#38bdf8'}
            emissiveIntensity={0.3}
            transparent
            opacity={isLight ? 0.45 : 0.35}
            wireframe
          />
        </mesh>

        {/* Orbiting Microservice Satellites */}
        <group ref={satellitesRef}>
          {satellites.map((sat) => (
            <mesh key={sat.id}>
              <sphereGeometry args={[sat.size, 20, 20]} />
              <meshStandardMaterial
                color={sat.color}
                emissive={sat.color}
                emissiveIntensity={isLight ? 0.85 : 1.4}
                metalness={0.8}
                roughness={0.15}
              />
            </mesh>
          ))}
        </group>

        {/* Swirling Quantum Telemetry Starfield */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[particleColors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.038}
            vertexColors
            transparent
            opacity={isLight ? 0.55 : 0.75}
            depthWrite={false}
            blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
          />
        </points>
      </group>
    </Float>
  );
}
