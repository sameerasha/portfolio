import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

interface ServiceNode {
  id: string;
  name: string;
  role: string;
  tech: string;
  position: [number, number, number];
  colorDark: string;
  colorLight: string;
}

const NODES: ServiceNode[] = [
  {
    id: 'gateway',
    name: 'E-File Inward Gateway',
    role: 'Tax Return Ingestion & Sanity Checks',
    tech: 'Spring Boot / REST / JWT',
    position: [0, 1.8, 0],
    colorDark: '#38bdf8',
    colorLight: '#0284c7',
  },
  {
    id: 'kafka-broker',
    name: 'Apache Kafka Broker',
    role: 'Real-Time Event Streaming & Queuing',
    tech: 'Confluent Kafka Cluster',
    position: [0, 0, 0.4],
    colorDark: '#f43f5e',
    colorLight: '#e11d48',
  },
  {
    id: 'validation-service',
    name: 'Validation Service',
    role: 'Taxpayer Criteria & Eligibility Rules',
    tech: 'Spring Boot / Hibernate',
    position: [-2.3, 0.3, -0.3],
    colorDark: '#818cf8',
    colorLight: '#6366f1',
  },
  {
    id: 'tax-calc-service',
    name: 'Tax Computation Engine',
    role: 'Income Brackets & Statutory Interest',
    tech: 'Spring Boot / Java 11 / Redis',
    position: [2.3, 0.3, -0.3],
    colorDark: '#34d399',
    colorLight: '#059669',
  },
  {
    id: 'database',
    name: 'Oracle & Postgres DB',
    role: 'Enterprise Relational Ledger & HQL',
    tech: 'Oracle DB / PostgreSQL',
    position: [0, -1.8, 0.5],
    colorDark: '#f59e0b',
    colorLight: '#d97706',
  },
  {
    id: 'matching-service',
    name: 'TDS / TCS Reconciliation',
    role: 'Withholding Tax Credit Ledger Match',
    tech: 'Spring Boot / Hibernate HQL',
    position: [0, -0.4, -2.1],
    colorDark: '#c084fc',
    colorLight: '#9333ea',
  },
];

const CONNECTIONS = [
  ['gateway', 'kafka-broker'],
  ['kafka-broker', 'validation-service'],
  ['kafka-broker', 'tax-calc-service'],
  ['kafka-broker', 'matching-service'],
  ['validation-service', 'database'],
  ['tax-calc-service', 'database'],
  ['matching-service', 'database'],
];

export function ArchitectureNodes3D({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const groupRef = useRef<THREE.Group>(null!);
  const [activeNode, setActiveNode] = useState<ServiceNode | null>(null);

  const linePoints = useMemo(() => {
    const coords: THREE.Vector3[][] = [];
    CONNECTIONS.forEach(([fromId, toId]) => {
      const from = NODES.find((n) => n.id === fromId);
      const to = NODES.find((n) => n.id === toId);
      if (from && to) {
        coords.push([
          new THREE.Vector3(...from.position),
          new THREE.Vector3(...to.position),
        ]);
      }
    });
    return coords;
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.15;
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.5}
      rotationIntensity={reducedMotion ? 0 : 0.25}
      floatIntensity={reducedMotion ? 0 : 0.4}
    >
      <group ref={groupRef}>
        {/* Inter-Service Connecting Lines */}
        {linePoints.map((points, idx) => {
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          return (
            <primitive
              key={`line-${idx}`}
              object={new THREE.Line(
                geometry,
                new THREE.LineBasicMaterial({
                  color: isLight ? '#0284c7' : '#38bdf8',
                  transparent: true,
                  opacity: isLight ? 0.45 : 0.35,
                })
              )}
            />
          );
        })}

        {/* Render Each Microservice Node */}
        {NODES.map((node) => {
          const isSelected = activeNode?.id === node.id;
          const nodeColor = isLight ? node.colorLight : node.colorDark;

          return (
            <group
              key={node.id}
              position={node.position}
              onPointerOver={(e) => {
                e.stopPropagation();
                setActiveNode(node);
              }}
              onPointerOut={() => setActiveNode(null)}
            >
              {/* Central sphere for node */}
              <mesh>
                <sphereGeometry args={[isSelected ? 0.36 : 0.28, 32, 32]} />
                <meshStandardMaterial
                  color={nodeColor}
                  emissive={nodeColor}
                  emissiveIntensity={isSelected ? 1.6 : 0.9}
                  metalness={0.7}
                  roughness={0.2}
                />
              </mesh>

              {/* Wireframe orbital ring */}
              <mesh rotation={[Math.PI / 3, 0, 0]}>
                <ringGeometry args={[0.42, 0.46, 32]} />
                <meshBasicMaterial
                  color={nodeColor}
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.6}
                />
              </mesh>

              {/* HTML Annotation Label */}
              <Html
                position={[0, 0.48, 0]}
                center
                distanceFactor={7}
                className="pointer-events-none select-none transition-all duration-200"
              >
                <div
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap border backdrop-blur-md transition-all ${
                    isLight
                      ? isSelected
                        ? 'bg-white text-slate-900 border-sky-500 shadow-xl shadow-sky-500/15 scale-105'
                        : 'bg-white/90 text-slate-700 border-slate-200 shadow-md'
                      : isSelected
                        ? 'bg-slate-900/95 text-white border-sky-400 shadow-lg shadow-sky-500/20 scale-105'
                        : 'bg-slate-950/80 text-slate-300 border-slate-700/60'
                  }`}
                >
                  <span className="font-semibold">{node.name}</span>
                  {isSelected && (
                    <div className={`text-[9px] mt-0.5 ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>
                      {node.tech}
                    </div>
                  )}
                </div>
              </Html>
            </group>
          );
        })}
      </group>
    </Float>
  );
}
