import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';

// Target camera positions and rotations mapped to scroll progression (0 to 1)
interface CameraKeyframe {
  progress: number;
  pos: [number, number, number];
  lookAt: [number, number, number];
  fogDensity: number;
}

const KEYFRAMES: CameraKeyframe[] = [
  // 0: Hero — Centered on Quantum Microservice Core
  { progress: 0.0, pos: [0, 0, 5.4], lookAt: [0, 0, 0], fogDensity: 0.04 },
  // 1: About — Smooth pan to the right, showing architectural monoliths
  { progress: 0.2, pos: [2.0, -1.2, 5.8], lookAt: [0.5, -1.2, 0], fogDensity: 0.035 },
  // 2: Skills — Pan to the left into the interconnected microservices constellation
  { progress: 0.42, pos: [-2.2, -2.8, 5.2], lookAt: [-0.6, -2.8, 0], fogDensity: 0.038 },
  // 3: Projects — Isometric high-depth stage for sticky card stack
  { progress: 0.65, pos: [0.2, -4.4, 6.2], lookAt: [0, -4.4, 0], fogDensity: 0.032 },
  // 4: Experience / Education — Vertical conduit tracking career trajectory
  { progress: 0.84, pos: [1.6, -6.0, 5.2], lookAt: [0.3, -6.0, 0], fogDensity: 0.036 },
  // 5: Contact — Converging celestial warp horizon
  { progress: 1.0, pos: [0, -7.5, 4.4], lookAt: [0, -7.5, 0], fogDensity: 0.042 },
];

function interpolateKeyframes(p: number): { pos: [number, number, number]; lookAt: [number, number, number]; fogDensity: number } {
  const clamped = Math.max(0, Math.min(1, p));
  let idx = 0;
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (clamped >= KEYFRAMES[i].progress && clamped <= KEYFRAMES[i + 1].progress) {
      idx = i;
      break;
    }
  }

  const k1 = KEYFRAMES[idx];
  const k2 = KEYFRAMES[idx + 1] || k1;
  const range = k2.progress - k1.progress || 1;
  const alpha = (clamped - k1.progress) / range;
  // Smooth cosine easing between keyframes
  const eased = 0.5 - 0.5 * Math.cos(alpha * Math.PI);

  return {
    pos: [
      THREE.MathUtils.lerp(k1.pos[0], k2.pos[0], eased),
      THREE.MathUtils.lerp(k1.pos[1], k2.pos[1], eased),
      THREE.MathUtils.lerp(k1.pos[2], k2.pos[2], eased),
    ],
    lookAt: [
      THREE.MathUtils.lerp(k1.lookAt[0], k2.lookAt[0], eased),
      THREE.MathUtils.lerp(k1.lookAt[1], k2.lookAt[1], eased),
      THREE.MathUtils.lerp(k1.lookAt[2], k2.lookAt[2], eased),
    ],
    fogDensity: THREE.MathUtils.lerp(k1.fogDensity, k2.fogDensity, eased),
  };
}

// Particle field spanning all vertical depths of the portfolio
function DeepParticleField({ count = 180, isLight = false }: { count?: number; isLight?: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const darkPalette = [
      new THREE.Color('#38bdf8'), // sky cyan
      new THREE.Color('#818cf8'), // indigo
      new THREE.Color('#c084fc'), // violet
      new THREE.Color('#34d399'), // emerald
    ];
    const lightPalette = [
      new THREE.Color('#0284c7'), // vivid sapphire
      new THREE.Color('#4f46e5'), // royal indigo
      new THREE.Color('#0ea5e9'), // electric sky
      new THREE.Color('#2563eb'), // cobalt
    ];
    const palette = isLight ? lightPalette : darkPalette;

    for (let i = 0; i < count; i++) {
      // Spread across full scroll range y: +2 to -9
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = Math.random() * 12 - 9.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;

      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count, isLight]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isLight ? 0.095 : 0.065}
        vertexColors
        transparent
        opacity={isLight ? 0.9 : 0.75}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Section 2: Interconnected Microservices Topology (Skills - y: -2.8)
function SkillsTopology3D({ isLight }: { isLight: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pulseGroup = useRef<THREE.Group>(null);

  // Nodes: Java/Spring, Kafka, Postgres, Docker, AWS
  const nodes = useMemo<{ id: string; pos: [number, number, number]; color: string; lightColor: string; size: number }[]>(
    () => [
      { id: 'kafka', pos: [1.8, -2.8, 0], color: '#38bdf8', lightColor: '#0284c7', size: 0.26 },
      { id: 'spring', pos: [0.7, -2.2, 0.4], color: '#34d399', lightColor: '#059669', size: 0.22 },
      { id: 'db', pos: [2.8, -2.4, -0.3], color: '#818cf8', lightColor: '#4f46e5', size: 0.22 },
      { id: 'docker', pos: [1.0, -3.4, -0.2], color: '#60a5fa', lightColor: '#2563eb', size: 0.2 },
      { id: 'aws', pos: [2.6, -3.3, 0.3], color: '#fbbf24', lightColor: '#d97706', size: 0.2 },
    ],
    []
  );

  // Pre-generate connection line geometry between central node (Kafka) and perimeter nodes
  const connectionGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const rootPos = new THREE.Vector3(...nodes[0].pos);
    for (let i = 1; i < nodes.length; i++) {
      points.push(rootPos);
      points.push(new THREE.Vector3(...nodes[i].pos));
    }
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [nodes]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.2) * 0.15;

    // Animate travelling light pulses along connections
    if (pulseGroup.current) {
      pulseGroup.current.children.forEach((pulse, i) => {
        const offset = (t * 0.8 + i * 0.3) % 1;
        const n1 = nodes[0].pos;
        const n2 = nodes[(i % (nodes.length - 1)) + 1].pos;
        pulse.position.set(
          THREE.MathUtils.lerp(n1[0], n2[0], offset),
          THREE.MathUtils.lerp(n1[1], n2[1], offset),
          THREE.MathUtils.lerp(n1[2], n2[2], offset)
        );
      });
    }
  });

  return (
    <group ref={group}>
      {/* Network Conduits connecting nodes */}
      <lineSegments geometry={connectionGeometry}>
        <lineBasicMaterial
          color={isLight ? '#0284c7' : '#38bdf8'}
          transparent
          opacity={isLight ? 0.45 : 0.35}
          linewidth={1}
        />
      </lineSegments>

      {/* Topology Nodes */}
      {nodes.map((node) => (
        <mesh key={node.id} position={node.pos as [number, number, number]}>
          <sphereGeometry args={[node.size, 24, 24]} />
          <meshStandardMaterial
            color={isLight ? node.lightColor : node.color}
            emissive={isLight ? node.lightColor : node.color}
            emissiveIntensity={isLight ? 0.55 : 0.7}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Laser Pulses */}
      <group ref={pulseGroup}>
        {nodes.slice(1).map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshBasicMaterial color={isLight ? '#0284c7' : '#38bdf8'} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// Section 3: Isometric Telemetry Planes (Projects - y: -4.4)
function ProjectsDepthPlanes3D({ isLight }: { isLight: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.z = -state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group position={[-2.4, -4.4, -0.8]} rotation={[0.4, 0.3, 0]}>
      {/* Outer Hex Telemetry Ring */}
      <mesh ref={meshRef}>
        <ringGeometry args={[1.8, 2.4, 6]} />
        <meshStandardMaterial
          color={isLight ? '#0284c7' : '#38bdf8'}
          emissive={isLight ? '#0284c7' : '#38bdf8'}
          emissiveIntensity={isLight ? 0.35 : 0.25}
          wireframe
          transparent
          opacity={isLight ? 0.5 : 0.4}
        />
      </mesh>
      {/* Inner Concentric Orbit */}
      <mesh ref={innerMeshRef}>
        <ringGeometry args={[1.1, 1.3, 32]} />
        <meshStandardMaterial
          color={isLight ? '#4f46e5' : '#818cf8'}
          emissive={isLight ? '#4f46e5' : '#818cf8'}
          emissiveIntensity={isLight ? 0.3 : 0.2}
          wireframe
          transparent
          opacity={isLight ? 0.4 : 0.3}
        />
      </mesh>
    </group>
  );
}

// Section 4 & 5: Career Conduit & Celestial Horizon (y: -6.0 to -7.5)
function CareerConduit3D({ isLight }: { isLight: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((c, i) => {
      c.rotation.y = t * 0.3 + i * 0.4;
    });
  });

  return (
    <group ref={group}>
      {/* Milestone 1 (SOFFRONT 2019) */}
      <mesh position={[-1.8, -5.6, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.12, 16]} />
        <meshStandardMaterial
          color={isLight ? '#4f46e5' : '#818cf8'}
          emissive={isLight ? '#4f46e5' : '#818cf8'}
          emissiveIntensity={isLight ? 0.45 : 0.3}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Milestone 2 (Infosys CPC 2.0 2021-Present) */}
      <mesh position={[-1.8, -6.6, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.15, 16]} />
        <meshStandardMaterial
          color={isLight ? '#0284c7' : '#38bdf8'}
          emissive={isLight ? '#0284c7' : '#0284c7'}
          emissiveIntensity={isLight ? 0.65 : 0.5}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Warp Grid at Contact Horizon */}
      <mesh position={[0, -7.8, -1]} rotation={[-Math.PI / 2.3, 0, 0]}>
        <planeGeometry args={[14, 10, 16, 16]} />
        <meshBasicMaterial
          color={isLight ? '#0284c7' : '#38bdf8'}
          wireframe
          transparent
          opacity={isLight ? 0.22 : 0.18}
        />
      </mesh>
    </group>
  );
}

// Master Camera Choreographer linked to scroll
function ChoreographedCamera({
  scrollProgress,
  isLight,
}: {
  scrollProgress: number;
  isLight: boolean;
}) {
  const { camera, pointer } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 0, 5.4));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const target = interpolateKeyframes(scrollProgress);

    // Apply gentle mouse parallax reaction (subtle, non-distracting)
    const parallaxX = pointer.x * 0.25;
    const parallaxY = pointer.y * 0.2;

    const targetPos = new THREE.Vector3(
      target.pos[0] + parallaxX,
      target.pos[1] + parallaxY,
      target.pos[2]
    );
    const targetLook = new THREE.Vector3(
      target.lookAt[0] + parallaxX * 0.5,
      target.lookAt[1] + parallaxY * 0.5,
      target.lookAt[2]
    );

    // Smooth inertia interpolation
    const lerpFactor = Math.min(delta * 2.8, 1);
    currentPos.current.lerp(targetPos, lerpFactor);
    currentLookAt.current.lerp(targetLook, lerpFactor);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  const fogColor = '#07090e';
  const fogDensity = interpolateKeyframes(scrollProgress).fogDensity;

  return (
    <>
      {!isLight && <fogExp2 attach="fog" args={[fogColor, fogDensity]} />}
      {/* Lighting Rig tailored for high-end material response */}
      <ambientLight intensity={isLight ? 2.4 : 0.8} />
      <directionalLight
        position={[6, 12, 6]}
        intensity={isLight ? 3.6 : 2.6}
        color={isLight ? '#ffffff' : '#38bdf8'}
      />
      <directionalLight
        position={[-6, -4, -2]}
        intensity={isLight ? 2.0 : 1.8}
        color={isLight ? '#93c5fd' : '#818cf8'}
      />
      <pointLight
        position={[0, -2, 3]}
        intensity={isLight ? 2.5 : 2.0}
        color={isLight ? '#0284c7' : '#c084fc'}
        distance={14}
      />
    </>
  );
}

interface CinematicBackground3DProps {
  scrollProgress: number;
}

export function CinematicBackground3D({ scrollProgress }: CinematicBackground3DProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { supported, checked } = useWebGLSupport();
  const prefersReducedMotion = usePrefersReducedMotion();

  // If WebGL is not supported, render a graceful ambient CSS backdrop
  if ((checked && !supported) || prefersReducedMotion) {
    return (
      <div
        className={`fixed inset-0 pointer-events-none z-[1] transition-opacity duration-700 ${
          isLight ? 'bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-100' : 'bg-gradient-to-b from-[#07090e] via-[#0c1017] to-[#07090e]'
        }`}
      />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <Canvas
        dpr={[1, 1.75]} // Strict DPR clamping to preserve high frame rates
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isLight ? 1.2 : 1.1,
        }}
        camera={{
          position: [0, 0, 5.4],
          fov: 44,
          near: 0.1,
          far: 50,
        }}
      >
        <ChoreographedCamera scrollProgress={scrollProgress} isLight={isLight} />
        <DeepParticleField count={180} isLight={isLight} />
        <SkillsTopology3D isLight={isLight} />
        <ProjectsDepthPlanes3D isLight={isLight} />
        <CareerConduit3D isLight={isLight} />
      </Canvas>
    </div>
  );
}