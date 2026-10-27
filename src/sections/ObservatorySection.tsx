import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  Activity,
  Zap,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { useTheme } from '../context/ThemeContext';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface ArchitectureNode {
  id: string;
  name: string;
  category: 'ingestion' | 'broker' | 'compute' | 'persistence';
  role: string;
  tech: string;
  throughput: string;
  latency: string;
  health: string;
  details: string;
  position: [number, number, number];
  colorDark: string;
  colorLight: string;
}

const ARCH_NODES: ArchitectureNode[] = [
  {
    id: 'gateway',
    name: 'E-File Inward Gateway',
    category: 'ingestion',
    role: 'Tax Return Ingestion & Sanity Checks',
    tech: 'Java 11 / Spring Boot / REST / JWT',
    throughput: '35,000 req/sec',
    latency: '4.2 ms',
    health: '100% Healthy',
    details: 'Parses and validates incoming ITR payloads from the national e-filing portal before publishing to Kafka topic partitions.',
    position: [-3.2, 1.8, 0],
    colorDark: '#38bdf8',
    colorLight: '#0284c7',
  },
  {
    id: 'kafka',
    name: 'Apache Kafka Event Broker',
    category: 'broker',
    role: 'Decoupled Event Streaming Backbone',
    tech: 'Confluent Kafka / Zookeeper / Schema Registry',
    throughput: '120,000 msg/sec',
    latency: '1.8 ms',
    health: '0 Lag / Optimal',
    details: 'High-throughput event log distributing partitioned tax calculation tasks asynchronously to worker consumer groups.',
    position: [0, 0.4, 0],
    colorDark: '#f43f5e',
    colorLight: '#e11d48',
  },
  {
    id: 'validation',
    name: 'Validation Microservice',
    category: 'compute',
    role: 'Statutory Eligibility & Schema Rules',
    tech: 'Spring Boot / Hibernate / Rule Engine',
    throughput: '28,000 eval/sec',
    latency: '6.5 ms',
    health: '100% Healthy',
    details: 'Executes complex statutory validation algorithms across multiple taxpayer categories and filing schedules.',
    position: [-2.4, -1.8, 0.8],
    colorDark: '#818cf8',
    colorLight: '#6366f1',
  },
  {
    id: 'computation',
    name: 'Tax Computation Engine',
    category: 'compute',
    role: 'Income Brackets & Statutory Interest',
    tech: 'Java 11 / Spring Boot / Redis Cache',
    throughput: '42,000 eval/sec',
    latency: '5.1 ms',
    health: '100% Healthy',
    details: 'Calculates tax liabilities, rebates, surcharge calculations, and Section 234 interest computations.',
    position: [2.5, 1.4, 0.4],
    colorDark: '#34d399',
    colorLight: '#059669',
  },
  {
    id: 'matching',
    name: 'TDS / TCS Reconciliation Service',
    category: 'compute',
    role: 'Ledger Matching & Credit Verification',
    tech: 'Spring Boot / Hibernate HQL / Oracle',
    throughput: '22,000 match/sec',
    latency: '8.4 ms',
    health: '100% Healthy',
    details: 'Cross-verifies claimed withholding tax deductions against nationwide Form 26AS ledgers in real-time.',
    position: [2.8, -1.6, -0.4],
    colorDark: '#c084fc',
    colorLight: '#9333ea',
  },
  {
    id: 'database',
    name: 'Oracle & Postgres DB Clusters',
    category: 'persistence',
    role: 'Enterprise Relational Ledger & Records',
    tech: 'Oracle DB 19c / PostgreSQL / HikariCP',
    throughput: '18,500 txn/sec',
    latency: '3.1 ms',
    health: 'Primary-Replica Sync',
    details: 'Persistent storage for return processing vouchers, taxpayer master records, and audit log histories.',
    position: [0, -2.8, -0.6],
    colorDark: '#fbbf24',
    colorLight: '#d97706',
  },
];

const CONDUITS = [
  { from: 'gateway', to: 'kafka' },
  { from: 'kafka', to: 'validation' },
  { from: 'kafka', to: 'computation' },
  { from: 'kafka', to: 'matching' },
  { from: 'validation', to: 'database' },
  { from: 'computation', to: 'database' },
  { from: 'matching', to: 'database' },
];

function LaserConduits({
  nodes,
  isLight,
  burstActive,
}: {
  nodes: ArchitectureNode[];
  isLight: boolean;
  burstActive: boolean;
}) {
  const pulsesRef = useRef<THREE.Group>(null!);

  const curves = useMemo(() => {
    return CONDUITS.map((link) => {
      const n1 = nodes.find((n) => n.id === link.from);
      const n2 = nodes.find((n) => n.id === link.to);
      if (!n1 || !n2) return null;

      const p1 = new THREE.Vector3(...n1.position);
      const p2 = new THREE.Vector3(...n2.position);
      // Midpoint with curve arch
      const mid = p1.clone().lerp(p2, 0.5);
      mid.z += 0.6;
      return new THREE.QuadraticBezierCurve3(p1, mid, p2);
    }).filter(Boolean) as THREE.QuadraticBezierCurve3[];
  }, [nodes]);

  useFrame((state) => {
    if (!pulsesRef.current) return;
    const t = state.clock.elapsedTime * (burstActive ? 2.5 : 1.0);

    pulsesRef.current.children.forEach((pulse, i) => {
      const curve = curves[i % curves.length];
      if (!curve) return;
      const progress = (t * 0.4 + i * 0.18) % 1;
      const point = curve.getPoint(progress);
      pulse.position.copy(point);
    });
  });

  return (
    <group>
      {/* Static Curved Conduits */}
      {curves.map((curve, idx) => {
        const points = curve.getPoints(32);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <primitive
            key={`conduit-${idx}`}
            object={
              new THREE.Line(
                geometry,
                new THREE.LineBasicMaterial({
                  color: isLight ? '#0284c7' : '#38bdf8',
                  transparent: true,
                  opacity: isLight ? 0.35 : 0.25,
                })
              )
            }
          />
        );
      })}

      {/* Travelling Pulsing Energy Packets */}
      <group ref={pulsesRef}>
        {curves.map((_, idx) => (
          <mesh key={`pulse-${idx}`}>
            <sphereGeometry args={[burstActive ? 0.08 : 0.055, 12, 12]} />
            <meshBasicMaterial
              color={isLight ? '#0284c7' : '#38bdf8'}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function TopologyScene3D({
  activeNode,
  onSelectNode,
  filter,
  burstActive,
}: {
  activeNode: ArchitectureNode | null;
  onSelectNode: (node: ArchitectureNode) => void;
  filter: string;
  burstActive: boolean;
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Slow cinematic drift
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <LaserConduits nodes={ARCH_NODES} isLight={isLight} burstActive={burstActive} />

      {ARCH_NODES.map((node) => {
        const isSelected = activeNode?.id === node.id;
        const matchesFilter = filter === 'all' || node.category === filter;
        const nodeColor = isLight ? node.colorLight : node.colorDark;
        const opacity = matchesFilter ? 1 : 0.25;

        return (
          <group
            key={node.id}
            position={node.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectNode(node);
            }}
          >
            {/* Outer Pulsing Halo */}
            <mesh>
              <sphereGeometry args={[isSelected ? 0.48 : 0.38, 28, 28]} />
              <meshBasicMaterial
                color={nodeColor}
                transparent
                opacity={isSelected ? 0.25 : 0.08 * opacity}
                wireframe
              />
            </mesh>

            {/* Solid Core Sphere */}
            <mesh>
              <sphereGeometry args={[isSelected ? 0.34 : 0.28, 32, 32]} />
              <meshStandardMaterial
                color={nodeColor}
                emissive={nodeColor}
                emissiveIntensity={isSelected ? (isLight ? 0.9 : 1.6) : (isLight ? 0.4 : 0.8) * opacity}
                metalness={0.85}
                roughness={0.15}
                transparent
                opacity={opacity}
              />
            </mesh>

            {/* Orbiting Gyro Ring */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <ringGeometry args={[0.42, 0.46, 32]} />
              <meshBasicMaterial
                color={nodeColor}
                side={THREE.DoubleSide}
                transparent
                opacity={0.4 * opacity}
              />
            </mesh>

            {/* Active 3D Space Label */}
            {isSelected && (
              <Html
                position={[0, 0.58, 0]}
                center
                distanceFactor={8}
                className="pointer-events-none select-none transition-all duration-200"
              >
                <div
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap border backdrop-blur-xl transition-all shadow-2xl ${
                    isLight
                      ? 'bg-white/95 text-slate-900 border-sky-500 shadow-sky-500/20 font-bold'
                      : 'bg-slate-950/95 text-white border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.35)] font-bold'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {node.name}
                  </span>
                  <div className={`text-[10px] mt-0.5 font-normal ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>
                    {node.tech.split('/')[0]} • {node.latency}
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export function ObservatorySection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const prefersReducedMotion = usePrefersReducedMotion();

  const [activeNode, setActiveNode] = useState<ArchitectureNode>(ARCH_NODES[1]); // Default on Kafka
  const [filter, setFilter] = useState<'all' | 'ingestion' | 'broker' | 'compute' | 'persistence'>('all');
  const [burstActive, setBurstActive] = useState(false);

  const handleTriggerBurst = () => {
    setBurstActive(true);
    setTimeout(() => setBurstActive(false), 2400);
  };

  return (
    <section
      id="observatory"
      className="py-14 sm:py-16 border-t relative transition-colors border-slate-200/80 dark:border-slate-800/80 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <SectionHeading
            eyebrow="Interactive 3D System Observatory"
            title="CPC 2.0 Microservice Topology & Event Stream"
            description="Explore the distributed event-driven tax processing engine in real-time 3D. Inspect microservices, observe Apache Kafka data pipelines, and simulate live return ingestion."
            className="mb-0"
          />

          {/* Burst Simulation Button */}
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <button
              type="button"
              onClick={handleTriggerBurst}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-md ${
                burstActive
                  ? 'bg-emerald-500 text-slate-950 scale-105'
                  : isLight
                    ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-sky-500/20'
                    : 'bg-sky-500 text-slate-950 hover:bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${burstActive ? 'animate-bounce' : ''}`} />
              <span>{burstActive ? 'Simulating High-Throughput Burst...' : 'Trigger Event Flow Burst'}</span>
            </button>
          </div>
        </div>

        {/* Cluster Filter Tabs */}
        <div className="animate-on-scroll flex flex-wrap items-center gap-2 mb-6 text-xs font-mono">
          <span className={`text-[11px] uppercase mr-2 font-bold ${isLight ? 'text-slate-800' : 'text-slate-400'}`}>
            Cluster View:
          </span>
          {[
            { id: 'all', label: 'All Clusters (7 Nodes)' },
            { id: 'ingestion', label: 'Ingestion Layer' },
            { id: 'broker', label: 'Kafka Event Backbone' },
            { id: 'compute', label: 'Compute Services' },
            { id: 'persistence', label: 'Databases & Storage' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                filter === tab.id
                  ? isLight
                    ? 'bg-sky-100 text-sky-950 border-sky-400 font-bold'
                    : 'bg-sky-500/20 text-sky-300 border-sky-500/50 font-bold'
                  : isLight
                    ? 'bg-white text-slate-800 border-slate-300 hover:text-slate-950 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main 3D Observatory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Canvas Viewport (8 Columns) */}
          <div className="lg:col-span-8 relative">
            <div
              className={`relative w-full h-[520px] sm:h-[600px] rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                isLight
                  ? 'bg-white/85 border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.1),0_0_0_1px_rgba(15,23,42,0.03)]'
                  : 'bg-slate-950/85 border-slate-800/90 shadow-black/80'
              }`}
            >
              {/* Telemetry Header Bar */}
              <div
                className={`absolute top-4 left-5 right-5 z-10 flex items-center justify-between text-xs font-mono pointer-events-none ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-semibold uppercase tracking-wider">
                    LIVE TOPOLOGY OBSERVATORY
                  </span>
                </div>
                <span className="hidden sm:inline-block">Click any node to inspect telemetry</span>
              </div>

              {/* 3D Canvas */}
              <Canvas
                dpr={[1, 1.75]}
                camera={{ position: [0, 0, 7.2], fov: 46 }}
                gl={{ antialias: true, alpha: true }}
              >
                <ambientLight intensity={isLight ? 1.6 : 0.8} />
                <directionalLight position={[6, 8, 6]} intensity={isLight ? 2.5 : 2.2} />
                <pointLight position={[-6, -4, 4]} intensity={1.2} color="#38bdf8" />

                <Float
                  speed={prefersReducedMotion ? 0 : 1.2}
                  rotationIntensity={0.2}
                  floatIntensity={0.3}
                >
                  <TopologyScene3D
                    activeNode={activeNode}
                    onSelectNode={setActiveNode}
                    filter={filter}
                    burstActive={burstActive}
                  />
                </Float>

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  maxPolarAngle={Math.PI / 1.8}
                  minPolarAngle={Math.PI / 2.8}
                />
              </Canvas>

              {/* Bottom Instructions / Hint */}
              <div
                className={`absolute bottom-3.5 left-5 right-5 flex items-center justify-between text-[11px] font-mono pointer-events-none ${
                  isLight ? 'text-slate-500' : 'text-slate-500'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-sky-500" />
                  Real-time Kafka Event Streams Active
                </span>
                <span>Drag to Orbit // Click Node to Inspect</span>
              </div>
            </div>
          </div>

          {/* Node Telemetry Inspector Panel (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div
              className={`rounded-3xl border p-7 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
                isLight
                  ? 'bg-white/95 border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_0_0_1px_rgba(15,23,42,0.03)]'
                  : 'bg-slate-950/90 border-slate-800/90 shadow-black/80'
              }`}
            >
              {/* Active Node Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: isLight ? activeNode.colorLight : activeNode.colorDark }}
                  />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-500">
                    Node Telemetry
                  </span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}>
                  {activeNode.category.toUpperCase()}
                </span>
              </div>

              {/* Title & Role */}
              <h3 className={`text-xl font-black tracking-tight mb-1 ${isLight ? 'text-slate-950' : 'text-white'}`}>
                {activeNode.name}
              </h3>
              <p className={`text-xs font-mono font-bold mb-4 ${isLight ? 'text-sky-700' : 'text-sky-400'}`}>
                {activeNode.role}
              </p>

              {/* Details narrative */}
              <p className={`text-xs leading-relaxed mb-6 ${isLight ? 'text-slate-800 font-medium' : 'text-slate-300'}`}>
                {activeNode.details}
              </p>

              {/* Tech Stack Pill */}
              <div className="mb-6 space-y-1.5">
                <span className={`text-[10px] font-mono uppercase font-bold ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>Implementation Stack:</span>
                <div className={`p-2.5 rounded-xl border text-xs font-mono font-bold ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-950' : 'bg-slate-900/80 border-slate-800 text-sky-300'
                }`}>
                  {activeNode.tech}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className={`p-3 rounded-xl border text-xs font-mono ${
                  isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-900/50 border-slate-800'
                }`}>
                  <div className={`text-[10px] mb-1 flex items-center gap-1 font-bold ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                    <Zap className="w-3 h-3 text-sky-500" /> Throughput
                  </div>
                  <div className={`font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    {activeNode.throughput}
                  </div>
                </div>

                <div className={`p-3 rounded-xl border text-xs font-mono ${
                  isLight ? 'bg-slate-50 border-slate-300' : 'bg-slate-900/50 border-slate-800'
                }`}>
                  <div className={`text-[10px] mb-1 flex items-center gap-1 font-bold ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                    <Clock className="w-3 h-3 text-emerald-500" /> Latency
                  </div>
                  <div className={`font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    {activeNode.latency}
                  </div>
                </div>
              </div>

              {/* Health Indicator */}
              <div className={`mt-4 p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
                isLight ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800' : 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300'
              }`}>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Cluster Health
                </span>
                <span className="font-semibold">{activeNode.health}</span>
              </div>
            </div>

            {/* Platform Telemetry Bar */}
            <div
              className={`rounded-2xl border p-5 backdrop-blur-md text-xs font-mono space-y-2 ${
                isLight ? 'bg-white/80 border-slate-200/90 text-slate-700' : 'bg-slate-950/70 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 font-semibold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                  Production Engine SLA
                </span>
                <span className="text-emerald-500">99.995% Uptime</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Kafka Consumer Lag:</span>
                <span className="text-sky-500 font-semibold">0 partitions</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Global Processing Speed:</span>
                <span className="text-sky-500 font-semibold">54,200 msg/sec</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}