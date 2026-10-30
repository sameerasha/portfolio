import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

interface HolographicCore3DProps {
  reducedMotion?: boolean;
}

// ---------------------------------------------------------------------------
// High-Fidelity Technology Vector Brand Logos (Pure Minimal Icons)
// ---------------------------------------------------------------------------

function ReactLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="currentColor">
      <circle cx="0" cy="0" r="2.05" fill="#00d8fe" />
      <g stroke="#00d8fe" strokeWidth="1.15" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function TypeScriptLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor">
      <rect width="32" height="32" rx="6" fill="#3178c6" />
      <path
        d="M12.5 13.5v11h-2.8v-11H5.8v-2.4h10.6v2.4h-3.9zm8.9 4.2c-1.3 0-2.2.4-2.8 1.1l-2-1.6c1.1-1.3 2.7-1.9 4.8-1.9 3.2 0 5.2 1.7 5.2 4.4 0 2.5-1.7 3.8-3.8 4.4l-1.1.3c-1.2.4-1.7.8-1.7 1.5 0 .8.7 1.3 1.8 1.3 1.2 0 2.1-.4 2.8-1.2l1.9 1.6c-1.1 1.4-2.8 2.1-4.7 2.1-3.3 0-5.3-1.8-5.3-4.4 0-2.5 1.6-3.8 3.8-4.4l1.1-.3c1.2-.4 1.7-.8 1.7-1.5 0-.7-.6-1.2-1.7-1.2z"
        fill="#ffffff"
      />
    </svg>
  );
}

function JavaScriptLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <rect width="32" height="32" rx="6" fill="#f7df1e" />
      <path
        d="M18.5 13v9.5c0 2.2-1 3.2-3 3.2-1.8 0-2.8-.8-3.2-1.8l2-1.2c.2.5.6.8 1.2.8.7 0 1-.4 1-1.2V13h2zm4.5 4.5c1.2.8 2.2 1.3 2.2 2.5 0 1-.8 1.8-2.2 1.8-1.4 0-2.2-.8-2.8-1.6l-1.8 1.4c1 1.5 2.4 2.4 4.6 2.4 2.8 0 4.6-1.6 4.6-4 0-2-1.4-3-3.4-3.8-1.4-.6-1.8-.9-1.8-1.5 0-.7.6-1.2 1.6-1.2 1 0 1.8.4 2.4 1.2l1.6-1.5c-.8-.9-2-1.8-3.8-1.8-2.4 0-4 1.5-4 3.7 0 1.8 1.2 2.8 3 3.5z"
        fill="#1e1e1e"
      />
    </svg>
  );
}

function TailwindLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path
        d="M9 13.5c1.2-2.5 3-3.5 5.5-3 2 .4 3 2 4.5 2.5 1.5.5 3.5 0 5-2-1.2 2.5-3 3.5-5.5 3-2-.4-3-2-4.5-2.5-1.5-.5-3.5 0-5 2zm-5 7c1.2-2.5 3-3.5 5.5-3 2 .4 3 2 4.5 2.5 1.5.5 3.5 0 5-2-1.2 2.5-3 3.5-5.5 3-2-.4-3-2-4.5-2.5-1.5-.5-3.5 0-5 2z"
        fill="#38bdf8"
      />
    </svg>
  );
}

function ReduxLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="16" r="14" fill="#764abc" />
      <path
        d="M13 10a3 3 0 110 6 3 3 0 010-6zm6 6a3 3 0 110 6 3 3 0 010-6z"
        fill="#ffffff"
      />
    </svg>
  );
}

function ViteLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M28 6l-12 21L4 6l12-2 12 2z" fill="#bd34fe" />
      <path d="M20 4L9 16h6l-3 9 10-12h-5l3-9z" fill="#ffea00" />
    </svg>
  );
}

function JavaLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M10 23c4 .5 8 .5 12-1 0 0-1 1-3 1.5-4 1-9 .8-9-.5z" fill="#f89820" />
      <path d="M8 25c6 .5 13 0 16-1.5 0 0-2 1.5-6 2-5 .7-10 .3-10-.5z" fill="#ea580c" />
      <path d="M15 4c-2 2.5-1 4.5 0 6.5 1 2 2 4 1 6.5-1-2.5-2-4.5-1-6.5 1-2 1-4 0-6.5z" fill="#f89820" />
      <path d="M18 7c-1.5 2-1 3.5 0 5 1 1.5 1.5 3 .5 5-1-2-1.5-3.5-.5-5 1-1.5 1-3 0-5z" fill="#ea580c" />
      <path d="M7 28c8 .8 15 .2 18-1 0 0-3 1.8-8 2.2-6 .5-10-.2-10-1.2z" fill="#f89820" />
    </svg>
  );
}

function SpringBootLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="16" r="14" fill="#0f172a" />
      <path
        d="M23 9.5c-4.2-.8-9.6 1.8-11.8 6.5-1.8 3.8-.5 8.1 3 9.8 4 2 8.7.6 10.7-3.2 2-3.8 1.2-8.8-1.9-13.1zm-3.3 9.2c-1.5 2.2-4.2 2.8-6.2 1.4-1.9-1.4-2.4-4-1.2-6 1.4-2.4 4.5-3.8 7.4-3.4 1.4 2.4 1.3 5.9 0 8z"
        fill="#6db33f"
      />
    </svg>
  );
}

function SpringSecurityLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 4l10 4v8c0 7-5 12-10 14-5-2-10-7-10-14V8l10-4z" fill="#10b981" />
      <path d="M12 16l3 3 5-6" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HibernateLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <rect x="4" y="4" width="24" height="24" rx="5" fill="#59666c" />
      <path d="M10 9v14M22 9v14M10 16h12" stroke="#f6bb42" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

function KubernetesLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 4l10 5.8v11.4L16 27l-10-5.8V9.8L16 4z" fill="#326ce5" />
      <circle cx="16" cy="15.5" r="3.2" fill="#ffffff" />
      <path d="M16 7v5M16 19v5M9 11.5l4.3 2.5M18.7 17l4.3 2.5M23 11.5l-4.3 2.5M13.3 17L9 19.5" stroke="#ffffff" strokeWidth="1.6" />
    </svg>
  );
}

function MavenLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <rect width="32" height="32" rx="6" fill="#c71a36" />
      <path d="M7 23V9h4l5 8 5-8h4v14h-3.5v-9l-4.5 7h-2l-4.5-7v9H7z" fill="#ffffff" />
    </svg>
  );
}

function AwsLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path
        d="M18.8 19.5c-.8.6-2 .9-3.2.9-2.2 0-3.6-.9-3.6-2.5 0-1.8 1.5-2.6 4-2.6h2.8v4.2zm2.6 3.5v-8.2c0-3.1-2.2-4.6-5.8-4.6-2.8 0-5.1.9-6.3 2.1l1.6 2c.9-.8 2.5-1.5 4.5-1.5 2.2 0 3.3.9 3.3 2.4v.8h-3.2c-4.5 0-6.9 1.7-6.9 4.6 0 2.8 2.1 4.5 5.5 4.5 2.2 0 4.1-.8 5.1-2.2v1.9h2.2l.2-.8z"
        fill="#ff9900"
      />
      <path d="M7 23.5c4.5 2.5 11.5 2.8 17.5-.2" stroke="#ff9900" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24.8 21.8l1.7 1.8-2.5.4" fill="#ff9900" />
    </svg>
  );
}

function KafkaLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="21" cy="9" r="3.5" fill="#f43f5e" />
      <circle cx="21" cy="23" r="3.5" fill="#f43f5e" />
      <circle cx="10" cy="16" r="4.2" fill="#e11d48" />
      <path d="M13.5 14.5l4.5-3.5M13.5 17.5l4.5 3.5" stroke="#f43f5e" strokeWidth="1.8" />
    </svg>
  );
}

function PostgresLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="16" r="14" fill="#336791" />
      <path
        d="M16 8c-4 0-6 2.5-6 5.5 0 2.5 1.5 4 3 5v4.5c0 .6.4 1 1 1h4c.6 0 1-.4 1-1V19c1.5-1 3-2.5 3-5.5 0-3-2-5.5-6-5.5z"
        fill="#ffffff"
      />
      <circle cx="13.5" cy="13" r="1" fill="#336791" />
      <circle cx="18.5" cy="13" r="1" fill="#336791" />
    </svg>
  );
}

function RedisLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path d="M16 4l12 6.5-12 6.5-12-6.5L16 4z" fill="#d82c20" />
      <path d="M4 12l12 6.5v8.5L4 20.5V12z" fill="#a3241c" />
      <path d="M28 12l-12 6.5v8.5l12-6.5V12z" fill="#b9281e" />
      <circle cx="16" cy="10" r="1.8" fill="#ffffff" />
    </svg>
  );
}

function DockerLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path
        d="M28.5 17c-.3-2-2-3-3.5-3-.3 0-.6.1-.8.2-1-2.2-3.2-3.2-5.2-3.2H17v3h-3v-3h-3v3H8v-3H5v3.5c-2.5 1-4 3.5-4 6.5 0 4.5 4 8 13 8 7.5 0 12.5-3.5 14-8 .5-1.5.8-2.8.5-4zM6 16h2v2H6zm3 0h2v2H9zm3 0h2v2h-2zm3 0h2v2h-2zm-6-3h2v2H9zm3 0h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2z"
        fill="#0db7ed"
      />
    </svg>
  );
}

function GitLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <rect width="32" height="32" rx="6" fill="#f05032" />
      <path d="M19 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-6 3a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm6 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill="#ffffff" />
      <path d="M13 13.5v8M19 10.5v10" stroke="#ffffff" strokeWidth="1.8" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Flat Frontal React Elliptical Closed Curve (Zero 3D out-of-plane distortion)
// ---------------------------------------------------------------------------

class EllipseFlatCurve extends THREE.Curve<THREE.Vector3> {
  a: number;
  b: number;

  constructor(a = 2.05, b = 0.78) {
    super();
    this.a = a;
    this.b = b;
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()): THREE.Vector3 {
    const angle = t * Math.PI * 2;
    const x = this.a * Math.cos(angle);
    const y = this.b * Math.sin(angle);
    return optionalTarget.set(x, y, 0);
  }
}

interface OrbitingTechnology {
  id: string;
  name: string;
  trackIndex: number; // 0, 1, or 2 (which React ellipse track)
  offset: number; // Phase offset along the ellipse
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function HolographicCore3D({ reducedMotion = false }: HolographicCore3DProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { viewport } = useThree();

  const groupRef = useRef<THREE.Group>(null!);
  const centerSphereRef = useRef<THREE.Mesh>(null!);
  const centerHaloRef = useRef<THREE.Mesh>(null!);
  const coreLightRef = useRef<THREE.PointLight>(null!);

  const track1Ref = useRef<THREE.Group>(null!);
  const track2Ref = useRef<THREE.Group>(null!);
  const track3Ref = useRef<THREE.Group>(null!);

  const techNodesRef = useRef<THREE.Group>(null!);
  const photonsRef = useRef<THREE.Group>(null!);

  const [hoveredTechId, setHoveredTechId] = useState<string | null>(null);

  // Responsive safe scaling: ensures complete React atom fits flatly inside frustum
  const responsiveScale = useMemo(() => {
    const minDim = Math.min(viewport.width, viewport.height);
    if (minDim < 4.8) {
      return Math.max(0.68, minDim / 4.8);
    }
    return 0.94;
  }, [viewport.width, viewport.height]);

  // Ellipse Geometry Parameters (Classic React Logo Golden Proportions)
  const ellipseA = 2.05; // Semi-major axis
  const ellipseB = 0.78; // Semi-minor axis

  // Pre-generate smooth flat tube geometry for the 3 React orbital rings
  const ringTubeGeometry = useMemo(() => {
    const curve = new EllipseFlatCurve(ellipseA, ellipseB);
    return new THREE.TubeGeometry(curve, 100, 0.015, 12, true);
  }, [ellipseA, ellipseB]);

  // 18 Core Technologies: 6 logos per track, evenly distributed across the 3 React Orbital Tracks
  const technologies: OrbitingTechnology[] = useMemo(() => {
    const step = (Math.PI * 2) / 6; // 60 degrees between icons on each track

    return [
      // ---------------------------------------------------------------------
      // Track 1: Modern Web & Reactive Frontend (0° - Horizontal Cyan Track)
      // ---------------------------------------------------------------------
      { id: 'react', name: 'React 19', trackIndex: 0, offset: 0, color: '#00d8fe', icon: ReactLogo },
      { id: 'typescript', name: 'TypeScript', trackIndex: 0, offset: 1 * step, color: '#3178c6', icon: TypeScriptLogo },
      { id: 'javascript', name: 'JavaScript (ES6+)', trackIndex: 0, offset: 2 * step, color: '#f7df1e', icon: JavaScriptLogo },
      { id: 'tailwind', name: 'Tailwind CSS', trackIndex: 0, offset: 3 * step, color: '#38bdf8', icon: TailwindLogo },
      { id: 'redux', name: 'Redux Toolkit', trackIndex: 0, offset: 4 * step, color: '#764abc', icon: ReduxLogo },
      { id: 'vite', name: 'Vite', trackIndex: 0, offset: 5 * step, color: '#bd34fe', icon: ViteLogo },

      // ---------------------------------------------------------------------
      // Track 2: Enterprise Backend, Java & Microservices (60° Violet Track)
      // ---------------------------------------------------------------------
      { id: 'java', name: 'Java 21', trackIndex: 1, offset: 0.22, color: '#f89820', icon: JavaLogo },
      { id: 'springboot', name: 'Spring Boot 3', trackIndex: 1, offset: 1 * step + 0.22, color: '#6db33f', icon: SpringBootLogo },
      { id: 'springsecurity', name: 'Spring Security', trackIndex: 1, offset: 2 * step + 0.22, color: '#10b981', icon: SpringSecurityLogo },
      { id: 'hibernate', name: 'Hibernate & JPA', trackIndex: 1, offset: 3 * step + 0.22, color: '#f6bb42', icon: HibernateLogo },
      { id: 'kubernetes', name: 'Kubernetes (K8s)', trackIndex: 1, offset: 4 * step + 0.22, color: '#326ce5', icon: KubernetesLogo },
      { id: 'maven', name: 'Apache Maven', trackIndex: 1, offset: 5 * step + 0.22, color: '#c71a36', icon: MavenLogo },

      // ---------------------------------------------------------------------
      // Track 3: Cloud, Event Streaming, DevOps & Data (120° Amber Track)
      // ---------------------------------------------------------------------
      { id: 'aws', name: 'AWS Cloud', trackIndex: 2, offset: 0.44, color: '#ff9900', icon: AwsLogo },
      { id: 'kafka', name: 'Apache Kafka', trackIndex: 2, offset: 1 * step + 0.44, color: '#f43f5e', icon: KafkaLogo },
      { id: 'docker', name: 'Docker', trackIndex: 2, offset: 2 * step + 0.44, color: '#0db7ed', icon: DockerLogo },
      { id: 'postgres', name: 'PostgreSQL', trackIndex: 2, offset: 3 * step + 0.44, color: '#336791', icon: PostgresLogo },
      { id: 'redis', name: 'Redis Cache', trackIndex: 2, offset: 4 * step + 0.44, color: '#dc2626', icon: RedisLogo },
      { id: 'git', name: 'Git & GitHub CI/CD', trackIndex: 2, offset: 5 * step + 0.44, color: '#f05032', icon: GitLogo },
    ];
  }, []);

  // Exact 0°, 60°, and 120° React Logo Symmetry Angles in the Frontal XY Plane
  const trackAngles = useMemo(() => [0, Math.PI / 3, (Math.PI * 2) / 3], []);

  // Pre-allocated vector for 60fps frame positioning
  const tempPos = useMemo(() => new THREE.Vector3(), []);

  // Helper to compute flat 2D planar point on a React ellipse track
  const getTrackPosition = (trackIdx: number, angle: number, target: THREE.Vector3) => {
    const xLoc = ellipseA * Math.cos(angle);
    const yLoc = ellipseB * Math.sin(angle);
    // Subtle z-layering (0.015) prevents z-fighting at ellipse intersections
    const z = (trackIdx - 1) * 0.015;

    const phi = trackAngles[trackIdx];
    const cosP = Math.cos(phi);
    const sinP = Math.sin(phi);

    const x = xLoc * cosP - yLoc * sinP;
    const y = xLoc * sinP + yLoc * cosP;

    target.set(x, y, z);
    return target;
  };

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;

    // Smooth, slow orbital cadence (~35s per full revolution)
    const orbitSpeed = 0.16;

    // LOCKED IN FLAT REACT LOGO POSITION:
    // Zero continuous rotation! Zero tumbling or flipping!
    if (groupRef.current) {
      groupRef.current.scale.set(responsiveScale, responsiveScale, responsiveScale);
      // Subtle micro-parallax responding to mouse (max 2-3 degrees, never flipping or rotating away)
      const targetX = state.pointer.x * 0.04;
      const targetY = state.pointer.y * 0.03;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.06);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.06);
      groupRef.current.rotation.z = 0;
    }

    // Small, Rounded Central Singularity Nucleus Pulse
    if (centerSphereRef.current) {
      const pulse = 1 + Math.sin(t * 1.6) * 0.04;
      centerSphereRef.current.scale.set(pulse, pulse, pulse);
    }

    if (centerHaloRef.current) {
      const haloPulse = 1 + Math.sin(t * 1.6 + 0.3) * 0.06;
      centerHaloRef.current.scale.set(haloPulse, haloPulse, haloPulse);
    }

    if (coreLightRef.current) {
      coreLightRef.current.intensity = (isLight ? 1.3 : 1.9) + Math.sin(t * 1.6) * 0.3;
    }

    // Smooth Orbit of Each Technology Logo along its Ellipse Track in Flat Plane
    if (techNodesRef.current) {
      techNodesRef.current.children.forEach((nodeGroup, idx) => {
        const tech = technologies[idx];
        const angle = t * orbitSpeed + tech.offset;
        getTrackPosition(tech.trackIndex, angle, tempPos);

        nodeGroup.position.copy(tempPos);

        const isHovered = hoveredTechId === tech.id;
        const targetScale = isHovered ? 1.25 : 1.0;
        nodeGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
      });
    }

    // Streaming Photon Packets along the Tracks
    if (photonsRef.current) {
      photonsRef.current.children.forEach((mesh, idx) => {
        const trackIdx = idx % 3;
        const subOffset = Math.floor(idx / 3) * (Math.PI / 3);
        const angle = t * (orbitSpeed * 1.6) + subOffset;
        getTrackPosition(trackIdx, angle, tempPos);
        mesh.position.copy(tempPos);
      });
    }
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.0}
      rotationIntensity={0} // ZERO ROTATION: Keeps the React logo locked perfectly flat
      floatIntensity={reducedMotion ? 0 : 0.08}
    >
      <group ref={groupRef}>
        {/* Dynamic Center Light */}
        <pointLight
          ref={coreLightRef}
          color={isLight ? '#0284c7' : '#00d8fe'}
          intensity={isLight ? 1.3 : 1.9}
          distance={4.8}
          decay={2}
        />

        {/* ================================================================= */}
        {/* CENTRAL NUCLEUS: Authentic React Logo Glowing Cyan Sphere         */}
        {/* ================================================================= */}
        <group position={[0, 0, 0.02]}>
          {/* React Logo Cyan Core Nucleus */}
          <mesh ref={centerSphereRef} castShadow>
            <sphereGeometry args={[0.25, 36, 36]} />
            <meshPhysicalMaterial
              color={isLight ? '#0284c7' : '#00d8fe'}
              emissive={isLight ? '#0284c7' : '#00d8fe'}
              emissiveIntensity={isLight ? 1.3 : 1.9}
              roughness={0.08}
              metalness={0.3}
              clearcoat={1.0}
              clearcoatRoughness={0.06}
            />
          </mesh>

          {/* Soft Atmospheric Corona Halo */}
          <mesh ref={centerHaloRef}>
            <sphereGeometry args={[0.33, 32, 32]} />
            <meshBasicMaterial
              color={isLight ? '#38bdf8' : '#00d8fe'}
              transparent
              opacity={isLight ? 0.24 : 0.32}
            />
          </mesh>

          {/* Subtle Equatorial Radiance Disc */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.26, 0.42, 36]} />
            <meshBasicMaterial
              color={isLight ? '#0284c7' : '#00d8fe'}
              transparent
              opacity={isLight ? 0.25 : 0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* ================================================================= */}
        {/* 3 FLAT REACT LOGO ORBITAL ELLIPTICAL TRACKS (0°, 60°, 120°)       */}
        {/* ================================================================= */}
        {/* Track 1: 0° (Horizontal - Iconic React Cyan) */}
        <group ref={track1Ref} position={[0, 0, 0]} rotation={[0, 0, trackAngles[0]]}>
          <mesh geometry={ringTubeGeometry}>
            <meshStandardMaterial
              color={isLight ? '#0284c7' : '#00d8fe'}
              emissive={isLight ? '#0284c7' : '#00d8fe'}
              emissiveIntensity={isLight ? 0.65 : 0.6}
              metalness={0.9}
              roughness={0.14}
            />
          </mesh>
        </group>

        {/* Track 2: 60° (Iconic React Cyan with Violet Accent) */}
        <group ref={track2Ref} position={[0, 0, 0.015]} rotation={[0, 0, trackAngles[1]]}>
          <mesh geometry={ringTubeGeometry}>
            <meshStandardMaterial
              color={isLight ? '#0284c7' : '#00d8fe'}
              emissive={isLight ? '#4f46e5' : '#38bdf8'}
              emissiveIntensity={isLight ? 0.6 : 0.55}
              metalness={0.9}
              roughness={0.14}
            />
          </mesh>
        </group>

        {/* Track 3: 120° (Iconic React Cyan with Amber Accent) */}
        <group ref={track3Ref} position={[0, 0, -0.015]} rotation={[0, 0, trackAngles[2]]}>
          <mesh geometry={ringTubeGeometry}>
            <meshStandardMaterial
              color={isLight ? '#0284c7' : '#00d8fe'}
              emissive={isLight ? '#ea580c' : '#00d8fe'}
              emissiveIntensity={isLight ? 0.6 : 0.55}
              metalness={0.9}
              roughness={0.14}
            />
          </mesh>
        </group>

        {/* ================================================================= */}
        {/* 18 ORBITING TECHNOLOGIES: PURE MINIMAL LOGOS (NO TEXT LABELS)     */}
        {/* ================================================================= */}
        <group ref={techNodesRef}>
          {technologies.map((tech) => {
            const Icon = tech.icon;
            const isHovered = hoveredTechId === tech.id;

            return (
              <group key={tech.id}>
                {/* 3D Glowing Bead Directly on the Track */}
                <mesh>
                  <sphereGeometry args={[0.044, 16, 16]} />
                  <meshStandardMaterial
                    color={tech.color}
                    emissive={tech.color}
                    emissiveIntensity={isLight ? 1.2 : 1.8}
                    roughness={0.1}
                    metalness={0.8}
                  />
                </mesh>

                {/* Soft Orbiting Point Light Aura */}
                <pointLight color={tech.color} intensity={0.35} distance={0.9} />

                {/* PURE MINIMAL ROUND LOGO BADGE (NO LABEL, COMPACT & CLEAN) */}
                <Html
                  center
                  distanceFactor={7.5}
                  className="select-none pointer-events-auto"
                >
                  <div
                    onMouseEnter={() => setHoveredTechId(tech.id)}
                    onMouseLeave={() => setHoveredTechId(null)}
                    title={tech.name}
                    className={`rounded-full flex items-center justify-center p-1.5 border backdrop-blur-xl transition-all duration-300 cursor-pointer shadow-md ${
                      isHovered
                        ? 'scale-130 ring-2 ring-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.6)]'
                        : 'hover:scale-115'
                    } ${
                      isLight
                        ? 'bg-white/95 border-slate-300 shadow-slate-200/50'
                        : 'bg-slate-950/90 border-slate-800 shadow-black/70'
                    }`}
                    style={{
                      boxShadow: isHovered ? `0 0 16px ${tech.color}80` : undefined,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </Html>
              </group>
            );
          })}
        </group>

        {/* ================================================================= */}
        {/* STREAMING PHOTON ENERGY PULSES                                    */}
        {/* ================================================================= */}
        <group ref={photonsRef}>
          {Array.from({ length: 9 }).map((_, idx) => (
            <mesh key={`photon-${idx}`}>
              <sphereGeometry args={[0.032, 12, 12]} />
              <meshBasicMaterial
                color={idx % 3 === 0 ? '#38bdf8' : idx % 3 === 1 ? '#818cf8' : '#f97316'}
              />
            </mesh>
          ))}
        </group>

        {/* ================================================================= */}
        {/* CINEMATIC VOLUMETRIC SPARKLES                                     */}
        {/* ================================================================= */}
        <Sparkles
          count={65}
          scale={4.6}
          size={isLight ? 2.0 : 2.6}
          speed={0.25}
          opacity={isLight ? 0.35 : 0.6}
          color={isLight ? '#0284c7' : '#38bdf8'}
        />
      </group>
    </Float>
  );
}
