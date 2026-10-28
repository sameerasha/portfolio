import { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  Activity,
  Zap,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Radio,
  Layers,
  Database,
  Server,
  Network,
  Cloud,
  Cpu,
  Boxes,
  Rotate3d,
  Compass,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { useTheme } from '../context/ThemeContext';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export type ArchitecturePlatform = 'aws' | 'cpc2';

export interface ArchitectureNode {
  id: string;
  name: string;
  category: 'ingestion' | 'broker' | 'compute' | 'persistence' | 'storage' | 'observability';
  awsService: string;
  role: string;
  tech: string;
  throughput: string;
  latency: string;
  health: string;
  details: string;
  cloudSpecs: string;
  position: [number, number, number];
  colorDark: string;
  colorLight: string;
}

interface ServiceIconMeta {
  badge: string;
  icon: typeof Network;
  label: string;
  gradient: string;
  borderColor: string;
  glowColor: string;
}

export const SERVICE_ICON_MAP: Record<string, ServiceIconMeta> = {
  'cloudfront-s3': {
    badge: 'S3+CDN',
    icon: Cloud,
    label: 'CloudFront & S3',
    gradient: 'from-orange-500 to-amber-600',
    borderColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.45)',
  },
  'alb-ingress': {
    badge: 'ALB',
    icon: Network,
    label: 'Application LB',
    gradient: 'from-amber-500 to-yellow-600',
    borderColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.45)',
  },
  'eks-microservices': {
    badge: 'EKS',
    icon: Boxes,
    label: 'Amazon EKS',
    gradient: 'from-sky-500 to-cyan-600',
    borderColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
  },
  'rds-postgres': {
    badge: 'RDS',
    icon: Database,
    label: 'RDS PostgreSQL',
    gradient: 'from-blue-600 to-indigo-600',
    borderColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.45)',
  },
  'elasticache-redis': {
    badge: 'REDIS',
    icon: Zap,
    label: 'ElastiCache',
    gradient: 'from-emerald-500 to-teal-600',
    borderColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
  },
  'sqs-sns': {
    badge: 'SQS',
    icon: Layers,
    label: 'SQS & SNS',
    gradient: 'from-rose-500 to-pink-600',
    borderColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.45)',
  },
  'cloudwatch-secrets': {
    badge: 'SEC+CW',
    icon: ShieldCheck,
    label: 'Secrets & CW',
    gradient: 'from-purple-500 to-violet-600',
    borderColor: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.45)',
  },
  // Backward-compatible fallback keys
  'api-gateway': {
    badge: 'API GW',
    icon: Network,
    label: 'API Gateway',
    gradient: 'from-orange-500 to-amber-600',
    borderColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.45)',
  },
  'msk-kafka': {
    badge: 'MSK',
    icon: Layers,
    label: 'Managed Kafka',
    gradient: 'from-rose-500 to-pink-600',
    borderColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.45)',
  },
  'aurora-serverless': {
    badge: 'AURORA',
    icon: Database,
    label: 'Aurora DB',
    gradient: 'from-blue-600 to-indigo-600',
    borderColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.45)',
  },
  'dynamo-cache': {
    badge: 'REDIS',
    icon: Zap,
    label: 'Cache & NoSQL',
    gradient: 'from-emerald-500 to-teal-600',
    borderColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
  },
  's3-lambda': {
    badge: 'S3',
    icon: Cloud,
    label: 'S3 Object Lake',
    gradient: 'from-amber-500 to-yellow-600',
    borderColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.45)',
  },
  'cloudwatch-xray': {
    badge: 'CW',
    icon: Activity,
    label: 'CloudWatch',
    gradient: 'from-purple-500 to-violet-600',
    borderColor: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.45)',
  },
  // CPC 2.0 Fallbacks
  'gateway': {
    badge: 'INWARD',
    icon: Radio,
    label: 'E-File Gateway',
    gradient: 'from-sky-500 to-blue-600',
    borderColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
  },
  'kafka': {
    badge: 'KAFKA',
    icon: Layers,
    label: 'Kafka Cluster',
    gradient: 'from-rose-500 to-pink-600',
    borderColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.45)',
  },
  'validation': {
    badge: 'RULES',
    icon: Server,
    label: 'Validation Engine',
    gradient: 'from-indigo-500 to-purple-600',
    borderColor: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.45)',
  },
  'computation': {
    badge: 'CALC',
    icon: Cpu,
    label: 'Tax Engine',
    gradient: 'from-emerald-500 to-teal-600',
    borderColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.45)',
  },
  'matching': {
    badge: 'MATCH',
    icon: ShieldCheck,
    label: '26AS Matcher',
    gradient: 'from-purple-500 to-violet-600',
    borderColor: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.45)',
  },
  'database': {
    badge: 'ORACLE',
    icon: Database,
    label: 'Oracle & PG',
    gradient: 'from-amber-500 to-orange-600',
    borderColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.45)',
  },
};

/**
 * Clean Minimalist Round AWS Service Icon Badge (Zero extraneous dots or spheres)
 */
export function MinimalRoundIcon({
  nodeId,
  size = 'md',
  isLight = false,
  isSelected = false,
  isHovered = false,
}: {
  nodeId: string;
  size?: 'sm' | 'md' | 'lg';
  isLight?: boolean;
  isSelected?: boolean;
  isHovered?: boolean;
}) {
  const meta = SERVICE_ICON_MAP[nodeId] || SERVICE_ICON_MAP['api-gateway'];
  const IconComponent = meta.icon;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }[size];

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];

  return (
    <div
      className={`relative rounded-full flex items-center justify-center transition-all duration-300 ${sizeClasses} ${
        isSelected
          ? 'scale-115 ring-2 ring-sky-400 shadow-xl'
          : isHovered
            ? 'scale-105 shadow-lg'
            : 'shadow-md'
      }`}
      style={{
        background: isLight ? 'rgba(255, 255, 255, 0.96)' : 'rgba(10, 15, 28, 0.94)',
        border: `2px solid ${meta.borderColor}`,
        boxShadow: isSelected || isHovered ? `0 0 20px ${meta.glowColor}` : `0 0 10px ${meta.glowColor}`,
      }}
    >
      <div
        className={`w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${meta.gradient} bg-opacity-25`}
      >
        <IconComponent className={`${iconSizes} text-white drop-shadow-md`} />
      </div>
    </div>
  );
}

/**
 * 1. AWS 3-TIER PRODUCTION MICROSERVICES ARCHITECTURE
 * Fully deployed across Multi-AZ VPC: Presentation, Application (EKS), and Data Tiers (RDS & Redis).
 */
const AWS_NODES: ArchitectureNode[] = [
  {
    id: 'cloudfront-s3',
    name: 'Tier 1: CloudFront CDN & S3 SPA',
    category: 'ingestion',
    awsService: 'Route 53 + CloudFront (OAC) + S3 + WAF',
    role: 'Presentation Tier: React TypeScript SPA & Edge CDN',
    tech: 'React 19 / TypeScript / CloudFront OAC / Route 53 / AWS WAF',
    throughput: '150,000 req/sec',
    latency: '2.1 ms (Edge Cache)',
    health: '100% Healthy (Multi-Region Edge)',
    details: 'Compiled React.js TypeScript SPA hosted in a private Amazon S3 bucket, delivered with sub-millisecond latency via CloudFront Origin Access Control (OAC), ACM TLS 1.3, and AWS WAF rate-limiting.',
    cloudSpecs: 'Tier 1 Presentation • CloudFront OAC • Private S3 Bucket • ACM Wildcard TLS • SPA Fallback',
    position: [-3.0, 1.2, 0.4],
    colorDark: '#f97316',
    colorLight: '#ea580c',
  },
  {
    id: 'alb-ingress',
    name: 'Tier 2: Application Load Balancer (ALB)',
    category: 'ingestion',
    awsService: 'AWS ALB + Load Balancer Controller',
    role: 'Application Ingress, TLS 1.3 Termination & Path Routing',
    tech: 'AWS ALB / AWS Load Balancer Controller / ACM TLS 1.3 / Target Groups',
    throughput: '95,000 req/sec',
    latency: '3.2 ms',
    health: 'Multi-AZ Public Subnets (Active-Active)',
    details: 'Terminates TLS 1.3 and applies AWS WAF rules in public subnets across 2 Availability Zones. Routes incoming API calls (/api/v1/*) directly to private EKS target groups with automated health probes.',
    cloudSpecs: 'Tier 2 Ingress • Multi-AZ Public Subnets (10.0.1.0/24, 10.0.2.0/24) • Path Routing • HTTP/2',
    position: [-1.4, 0.6, 0.2],
    colorDark: '#f59e0b',
    colorLight: '#d97706',
  },
  {
    id: 'eks-microservices',
    name: 'Tier 2: Amazon EKS Microservices Cluster',
    category: 'compute',
    awsService: 'Amazon EKS (Kubernetes 1.30) + Karpenter',
    role: 'Application Tier: Spring Boot 3 Microservices Pods',
    tech: 'Java 21 / Spring Boot 3 / Docker / Helm / Kubernetes HPA / Karpenter',
    throughput: '180,000 ops/sec',
    latency: '4.2 ms',
    health: '100% Pod Health (Autoscaling Active)',
    details: 'Private application subnets hosting Spring Boot 3 / Java 21 microservices (Auth, User, Order, Notification, File Manager) with Karpenter autoscaling, Istio service mesh, and IAM Roles for Service Accounts (IRSA).',
    cloudSpecs: 'Tier 2 App • Private App Subnets (10.0.11.0/24, 10.0.12.0/24) • Karpenter Auto-scaling • IRSA',
    position: [0.1, 0.0, 0.0],
    colorDark: '#38bdf8',
    colorLight: '#0284c7',
  },
  {
    id: 'rds-postgres',
    name: 'Tier 3: Amazon RDS for PostgreSQL (Multi-AZ)',
    category: 'persistence',
    awsService: 'Amazon RDS PostgreSQL Multi-AZ Standby',
    role: 'Data Tier: ACID Relational Persistence (Isolated DB Subnet)',
    tech: 'PostgreSQL 16 / Flyway Migrations / Hibernate JPA / HikariCP',
    throughput: '45,000 txn/sec',
    latency: '2.8 ms',
    health: 'Multi-AZ Synchronous Sync (SLA 99.995%)',
    details: 'Isolated private database subnets with zero internet ingress/egress. Primary database in AZ-A synchronously replicates to standby replica in AZ-B with automated failover, KMS encryption, and automated backups.',
    cloudSpecs: 'Tier 3 Data • Private DB Subnets (10.0.21.0/24, 10.0.22.0/24) • Multi-AZ Auto-failover • KMS PITR',
    position: [0.5, -1.7, -0.3],
    colorDark: '#3b82f6',
    colorLight: '#1d4ed8',
  },
  {
    id: 'elasticache-redis',
    name: 'Tier 3: Amazon ElastiCache for Redis',
    category: 'compute',
    awsService: 'Amazon ElastiCache Redis Cluster (Multi-AZ)',
    role: 'Data Tier: Sub-Millisecond Cache & Token Store',
    tech: 'Redis 7.2 Cluster Mode / Spring Data Redis / TLS in-transit',
    throughput: '220,000 read ops/sec',
    latency: '0.7 ms',
    health: 'Sub-Millisecond Multi-AZ Read',
    details: 'Multi-AZ Redis replication group providing microsecond caching for computationally heavy domain models, JWT session blacklists, and distributed API rate-limiting tokens.',
    cloudSpecs: 'Tier 3 Cache • Redis 7.2 Cluster Mode • Multi-AZ Replication • Auth Token • KMS Encryption',
    position: [2.3, 1.1, 0.5],
    colorDark: '#10b981',
    colorLight: '#059669',
  },
  {
    id: 'sqs-sns',
    name: 'Tier 2/3: Amazon SQS & SNS Event Queue',
    category: 'broker',
    awsService: 'Amazon SQS FIFO + Amazon SNS Fan-Out',
    role: 'Asynchronous Microservice Messaging & Decoupled Workers',
    tech: 'AWS SQS FIFO / Amazon SNS / Spring Cloud AWS / EventBridge',
    throughput: '80,000 msg/sec',
    latency: '3.5 ms',
    health: 'Decoupled Active-Active (0 Lag)',
    details: 'Decouples order processing and notification workflows. Features Dead-Letter Queues (DLQ), at-least-once delivery semantics, and event fan-out for transactional email/SMS workers.',
    cloudSpecs: 'Tier 2/3 Broker • SQS FIFO • SNS Topic Fan-out • Dead-Letter Queue (DLQ) • KMS Encryption',
    position: [2.4, -0.8, -0.2],
    colorDark: '#f43f5e',
    colorLight: '#e11d48',
  },
  {
    id: 'cloudwatch-secrets',
    name: 'Governance: Secrets Manager & CloudWatch APM',
    category: 'observability',
    awsService: 'AWS Secrets Manager + CloudWatch + X-Ray',
    role: 'Automated Secret Rotation, Distributed Tracing & SRE Alarms',
    tech: 'AWS Secrets Manager / CloudWatch Container Insights / AWS X-Ray APM',
    throughput: '100% Trace Coverage',
    latency: 'Real-time Telemetry',
    health: 'Active APM Monitoring (0 Alarms)',
    details: 'Manages automated 30-day database credential rotation with AWS Secrets Manager. CloudWatch and AWS X-Ray provide end-to-end distributed tracing across CloudFront, ALB, EKS pods, and RDS queries.',
    cloudSpecs: 'Governance • Automatic 30-Day DB Rotation • OpenTelemetry Tracing • Synthetic Canaries',
    position: [-0.1, 2.0, -0.5],
    colorDark: '#c084fc',
    colorLight: '#9333ea',
  },
];

const AWS_CONDUITS = [
  { from: 'cloudfront-s3', to: 'alb-ingress' },
  { from: 'alb-ingress', to: 'eks-microservices' },
  { from: 'eks-microservices', to: 'rds-postgres' },
  { from: 'eks-microservices', to: 'elasticache-redis' },
  { from: 'eks-microservices', to: 'sqs-sns' },
  { from: 'sqs-sns', to: 'eks-microservices' },
  { from: 'cloudwatch-secrets', to: 'eks-microservices' },
  { from: 'cloudwatch-secrets', to: 'rds-postgres' },
  { from: 'cloudfront-s3', to: 'cloudwatch-secrets' },
];

/**
 * 2. CPC 2.0 ENTERPRISE TAX COMPUTING ENGINE
 */
const CPC2_NODES: ArchitectureNode[] = [
  {
    id: 'gateway',
    name: 'E-File Inward Gateway',
    category: 'ingestion',
    awsService: 'Spring Boot REST Gateway',
    role: 'Tax Return Ingestion & Sanity Checks',
    tech: 'Java 11 / Spring Boot / REST / JWT',
    throughput: '35,000 req/sec',
    latency: '4.2 ms',
    health: '100% Healthy',
    details: 'Parses and validates incoming ITR payloads from the national e-filing portal before publishing to Kafka topic partitions.',
    cloudSpecs: 'Spring Boot 3 • JWT Token Validation • Payload Schema Guard',
    position: [-2.9, 1.2, 0.3],
    colorDark: '#38bdf8',
    colorLight: '#0284c7',
  },
  {
    id: 'kafka',
    name: 'Apache Kafka Event Broker',
    category: 'broker',
    awsService: 'Confluent Kafka Cluster',
    role: 'Decoupled Event Streaming Backbone',
    tech: 'Confluent Kafka / Zookeeper / Schema Registry',
    throughput: '120,000 msg/sec',
    latency: '1.8 ms',
    health: '0 Lag / Optimal',
    details: 'High-throughput event log distributing partitioned tax calculation tasks asynchronously to worker consumer groups.',
    cloudSpecs: 'Partitioned Kafka Topics • Zookeeper Quorum • Confluent Control Center',
    position: [0.0, 0.0, 0.0],
    colorDark: '#f43f5e',
    colorLight: '#e11d48',
  },
  {
    id: 'validation',
    name: 'Validation Microservice',
    category: 'compute',
    awsService: 'Spring Boot Rules Service',
    role: 'Statutory Eligibility & Schema Rules',
    tech: 'Spring Boot / Hibernate / Rule Engine',
    throughput: '28,000 eval/sec',
    latency: '6.5 ms',
    health: '100% Healthy',
    details: 'Executes complex statutory validation algorithms across multiple taxpayer categories and filing schedules.',
    cloudSpecs: 'Statutory Rules Engine • Hibernate ORM • Spring Data',
    position: [-1.7, -1.1, 0.4],
    colorDark: '#818cf8',
    colorLight: '#6366f1',
  },
  {
    id: 'computation',
    name: 'Tax Computation Engine',
    category: 'compute',
    awsService: 'Spring Boot Calculation Core',
    role: 'Income Brackets & Statutory Interest',
    tech: 'Java 11 / Spring Boot / Redis Cache',
    throughput: '42,000 eval/sec',
    latency: '5.1 ms',
    health: '100% Healthy',
    details: 'Calculates tax liabilities, rebates, surcharge calculations, and Section 234 interest computations.',
    cloudSpecs: 'Mathematical Calculation Models • Redis Cache Caching',
    position: [2.2, 1.1, 0.4],
    colorDark: '#34d399',
    colorLight: '#059669',
  },
  {
    id: 'matching',
    name: 'TDS / TCS Reconciliation Service',
    category: 'compute',
    awsService: 'Spring Boot Ledger Matching',
    role: 'Ledger Matching & Credit Verification',
    tech: 'Spring Boot / Hibernate HQL / Oracle',
    throughput: '22,000 match/sec',
    latency: '8.4 ms',
    health: '100% Healthy',
    details: 'Cross-verifies claimed withholding tax deductions against nationwide Form 26AS ledgers in real-time.',
    cloudSpecs: 'HQL Query Optimization • Form 26AS Cross-Verification',
    position: [2.3, -0.8, -0.3],
    colorDark: '#c084fc',
    colorLight: '#9333ea',
  },
  {
    id: 'database',
    name: 'Oracle & Postgres DB Clusters',
    category: 'persistence',
    awsService: 'Oracle DB 19c & PostgreSQL',
    role: 'Enterprise Relational Ledger & Records',
    tech: 'Oracle DB 19c / PostgreSQL / HikariCP',
    throughput: '18,500 txn/sec',
    latency: '3.1 ms',
    health: 'Primary-Replica Sync',
    details: 'Persistent storage for return processing vouchers, taxpayer master records, and audit log histories.',
    cloudSpecs: 'Oracle 19c RAC • PostgreSQL 16 • Hikari Connection Pooling',
    position: [0.4, -1.7, -0.3],
    colorDark: '#fbbf24',
    colorLight: '#d97706',
  },
];

const CPC2_CONDUITS = [
  { from: 'gateway', to: 'kafka' },
  { from: 'kafka', to: 'validation' },
  { from: 'kafka', to: 'computation' },
  { from: 'kafka', to: 'matching' },
  { from: 'validation', to: 'database' },
  { from: 'computation', to: 'database' },
  { from: 'matching', to: 'database' },
];

/**
 * Tactical Radar Grid Floor with Ground Projection Pucks & Tier Zones
 */
function HolographicRadarFloor({
  nodes,
  isLight,
  platform,
}: {
  nodes: ArchitectureNode[];
  isLight: boolean;
  platform: ArchitecturePlatform;
}) {
  const radarSweepRef = useRef<THREE.Mesh>(null!);
  const floorY = -2.6;

  useFrame((state) => {
    if (radarSweepRef.current) {
      radarSweepRef.current.rotation.z = -state.clock.elapsedTime * 0.45;
    }
  });

  const primaryColor = platform === 'aws' ? (isLight ? '#ea580c' : '#f97316') : (isLight ? '#0284c7' : '#38bdf8');
  const accentColor = isLight ? '#0284c7' : '#38bdf8';
  const gridColor = isLight ? '#94a3b8' : '#334155';

  return (
    <group position={[0, floorY, 0]}>
      {/* Horizontal Radar Base Disc */}
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {/* Tier Boundary Rings: 1.4 (Tier 2 Pods), 2.8 (Tier 1 & 3), 4.4 (VPC Subnets), 6.0 (Cloud Perimeter) */}
        {[1.4, 2.8, 4.4, 6.0].map((radius, idx) => (
          <mesh key={`grid-ring-${idx}`}>
            <ringGeometry args={[radius, radius + 0.02, 64]} />
            <meshBasicMaterial
              color={idx === 1 ? primaryColor : idx === 2 ? accentColor : gridColor}
              transparent
              opacity={isLight ? 0.35 - idx * 0.05 : 0.45 - idx * 0.07}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        <mesh>
          <ringGeometry args={[6.35, 6.4, 64]} />
          <meshBasicMaterial
            color={primaryColor}
            transparent
            opacity={isLight ? 0.45 : 0.55}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Tactical Crosshair Guideway Lines */}
        {[-Math.PI / 2, 0, Math.PI / 4, -Math.PI / 4].map((angle, idx) => (
          <mesh key={`crosshair-${idx}`} rotation={[0, 0, angle]}>
            <planeGeometry args={[12.8, 0.012]} />
            <meshBasicMaterial
              color={gridColor}
              transparent
              opacity={isLight ? 0.25 : 0.32}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        {/* Continuous 360° Rotating Radar Sweep */}
        <mesh ref={radarSweepRef}>
          <ringGeometry args={[0.2, 6.0, 48, 1, 0, Math.PI / 2.5]} />
          <meshBasicMaterial
            color={primaryColor}
            transparent
            opacity={isLight ? 0.12 : 0.18}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Vertical Laser Projection Tethers */}
      {nodes.map((node) => {
        const height = node.position[1] - floorY;
        const nodeColor = isLight ? node.colorLight : node.colorDark;
        return (
          <group key={`floor-tether-${node.id}`} position={[node.position[0], 0, node.position[2]]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.22, 0.28, 32]} />
              <meshBasicMaterial color={nodeColor} transparent opacity={isLight ? 0.65 : 0.75} side={THREE.DoubleSide} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.08, 16]} />
              <meshBasicMaterial color={nodeColor} transparent opacity={0.85} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, height / 2, 0]}>
              <cylinderGeometry args={[0.007, 0.007, height, 8]} />
              <meshBasicMaterial color={nodeColor} transparent opacity={isLight ? 0.28 : 0.35} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/**
 * Kinetic Laser Conduits with High-Velocity Photon Stream Packets
 */
function KineticLaserConduits({
  nodes,
  conduits,
  isLight,
  burstActive,
}: {
  nodes: ArchitectureNode[];
  conduits: { from: string; to: string }[];
  isLight: boolean;
  burstActive: boolean;
}) {
  const pulseGroupRef = useRef<THREE.Group>(null!);

  const conduitCurves = useMemo(() => {
    return conduits
      .map((link) => {
        const n1 = nodes.find((n) => n.id === link.from);
        const n2 = nodes.find((n) => n.id === link.to);
        if (!n1 || !n2) return null;

        const p1 = new THREE.Vector3(...n1.position);
        const p2 = new THREE.Vector3(...n2.position);
        const mid = p1.clone().lerp(p2, 0.5);
        // Architectural arc elevation in 3D
        mid.z += 0.45;
        mid.y += 0.18;
        return {
          curve: new THREE.QuadraticBezierCurve3(p1, mid, p2),
          fromColor: isLight ? n1.colorLight : n1.colorDark,
          toColor: isLight ? n2.colorLight : n2.colorDark,
        };
      })
      .filter(Boolean) as { curve: THREE.QuadraticBezierCurve3; fromColor: string; toColor: string }[];
  }, [nodes, conduits, isLight]);

  useFrame((state) => {
    if (!pulseGroupRef.current) return;
    const speedMultiplier = burstActive ? 3.0 : 1.1;
    const t = state.clock.elapsedTime * speedMultiplier;
    const pulsesPerConduit = burstActive ? 5 : 3;

    pulseGroupRef.current.children.forEach((mesh, idx) => {
      const conduitIdx = Math.floor(idx / pulsesPerConduit);
      const subIdx = idx % pulsesPerConduit;
      const data = conduitCurves[conduitIdx % conduitCurves.length];
      if (!data) return;

      const offset = subIdx / pulsesPerConduit;
      const progress = (t * 0.3 + offset) % 1;
      const pos = data.curve.getPoint(progress);
      mesh.position.copy(pos);
    });
  });

  const pulsesPerConduit = burstActive ? 5 : 3;
  const totalPulses = conduitCurves.length * pulsesPerConduit;

  return (
    <group>
      {conduitCurves.map((data, idx) => {
        const points = data.curve.getPoints(40);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <group key={`conduit-group-${idx}`}>
            <primitive
              object={
                new THREE.Line(
                  geometry,
                  new THREE.LineBasicMaterial({
                    color: isLight ? '#0284c7' : '#38bdf8',
                    transparent: true,
                    opacity: burstActive ? (isLight ? 0.85 : 0.75) : (isLight ? 0.42 : 0.35),
                    linewidth: 1,
                  })
                )
              }
            />
          </group>
        );
      })}

      <group ref={pulseGroupRef}>
        {Array.from({ length: totalPulses }).map((_, idx) => (
          <mesh key={`photon-${idx}`}>
            <sphereGeometry args={[burstActive ? 0.085 : 0.05, 14, 14]} />
            <meshBasicMaterial
              color={burstActive ? '#38bdf8' : isLight ? '#0284c7' : '#67e8f9'}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * Clean Floating Minimal Round Icon Node (No attached 3D spheres / outer meshes)
 */
function ArchitecturalNode3D({
  node,
  isSelected,
  isHovered,
  matchesFilter,
  isLight,
  burstActive,
  onClick,
  onPointerOver,
  onPointerOut,
}: {
  node: ArchitectureNode;
  isSelected: boolean;
  isHovered: boolean;
  matchesFilter: boolean;
  isLight: boolean;
  burstActive: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}) {
  const nodeRef = useRef<THREE.Group>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const shockwaveRef = useRef<THREE.Mesh>(null!);

  const nodeColor = isLight ? node.colorLight : node.colorDark;
  const opacity = matchesFilter ? 1 : 0.22;
  const meta = SERVICE_ICON_MAP[node.id] || SERVICE_ICON_MAP['api-gateway'];

  useFrame((state) => {
    if (!nodeRef.current) return;
    const t = state.clock.elapsedTime;

    // Smooth hover & selection scale transition
    const targetScale = isSelected ? 1.2 : isHovered ? 1.1 : 1.0;
    nodeRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);

    // Subtle planar telemetry gyro ring rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.y = t * 0.35;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.6;
      ring2Ref.current.rotation.z = t * 0.3;
    }

    // Burst shockwave ring animation
    if (shockwaveRef.current && burstActive) {
      const burstPhase = (t * 2.2) % 1;
      const s = 0.4 + burstPhase * 1.6;
      shockwaveRef.current.scale.set(s, s, s);
      const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
      if (mat) mat.opacity = (1 - burstPhase) * 0.7;
    }
  });

  return (
    <group
      ref={nodeRef}
      position={node.position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onPointerOut();
      }}
    >
      {/* Delicate Planar Telemetry Ring (Provides spatial grounding without bulky spheres) */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.42, 0.007, 16, 64]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={isSelected ? 1.0 : 0.5}
          transparent
          opacity={isSelected ? 0.8 : isHovered ? 0.6 : 0.35 * opacity}
        />
      </mesh>

      {/* Secondary accent ring when selected or hovered */}
      {(isSelected || isHovered) && (
        <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[0.54, 0.006, 16, 64]} />
          <meshStandardMaterial
            color={isLight ? '#4f46e5' : '#818cf8'}
            emissive={isLight ? '#4f46e5' : '#6366f1'}
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* Burst Shockwave Ring (No solid sphere) */}
      {burstActive && (
        <mesh ref={shockwaveRef} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.42, 32]} />
          <meshBasicMaterial color={nodeColor} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Invisible 3D raycast hit-sphere for seamless WebGL click & hover detection */}
      <mesh
        visible={false}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onPointerOver();
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onPointerOut();
        }}
      >
        <sphereGeometry args={[0.55, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* PURE MINIMAL ROUND AWS ICON BADGE with interactive click handler */}
      <Html center position={[0, 0, 0]} distanceFactor={7.5} className="select-none pointer-events-auto">
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onMouseEnter={onPointerOver}
          onMouseLeave={onPointerOut}
          title={`Click to focus & inspect ${node.name}`}
          className="flex flex-col items-center group cursor-pointer transition-transform duration-300 hover:scale-115 active:scale-95"
        >
          <MinimalRoundIcon
            nodeId={node.id}
            size={isSelected ? 'lg' : isHovered ? 'md' : 'md'}
            isLight={isLight}
            isSelected={isSelected}
            isHovered={isHovered}
          />
          <span
            className={`mt-1 text-[8px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded-md border backdrop-blur-md shadow-md transition-all ${
              isSelected
                ? 'bg-sky-500 text-slate-950 border-sky-400 font-extrabold scale-105 shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                : isLight
                  ? 'bg-white/95 text-slate-800 border-slate-300'
                  : 'bg-slate-950/90 text-slate-200 border-slate-750'
            }`}
          >
            {meta.badge}
          </span>
        </div>
      </Html>

      {/* Interactive 3D Holographic HUD Tooltip on Selection or Hover */}
      {(isSelected || isHovered) && (
        <Html
          position={[0, 0.78, 0]}
          center
          distanceFactor={7.5}
          className="pointer-events-auto select-none transition-all duration-200 z-30"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap border backdrop-blur-2xl transition-all shadow-2xl cursor-pointer ${
              isSelected
                ? 'ring-2 ring-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.4)]'
                : ''
            } ${
              isLight
                ? 'bg-white/98 text-slate-950 border-sky-500 shadow-sky-500/20 font-bold'
                : 'bg-slate-950/98 text-white border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.35)] font-bold'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-extrabold text-[12px]">{node.name}</span>
              {isSelected && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 border border-sky-500/40 uppercase font-black">
                  FOCUSED
                </span>
              )}
            </div>
            <div
              className={`text-[10px] mt-1 font-medium flex items-center gap-2 ${
                isLight ? 'text-slate-600' : 'text-sky-300'
              }`}
            >
              <span className="font-bold text-sky-500">{node.role}</span>
            </div>
            <div
              className={`text-[9px] mt-0.5 font-mono flex items-center gap-2 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              <span>{node.throughput}</span>
              <span>•</span>
              <span className="text-emerald-500 font-bold">{node.latency}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

/**
 * Atmospheric Cybernetic Space Dust
 */
function AtmosphericDust({ isLight }: { isLight: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 140;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color(isLight ? '#0284c7' : '#38bdf8');
    const c2 = new THREE.Color(isLight ? '#6366f1' : '#818cf8');
    const c3 = new THREE.Color(isLight ? '#ea580c' : '#f97316');
    const palette = [c1, c2, c3];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [isLight]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.025;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={isLight ? 0.4 : 0.65}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * 360-Degree Camera Controller with Smooth Presets, Focused Node Framing & Continuous Turntable Orbit
 */
function SceneCameraManager({
  cameraPreset,
  isAutoRotating,
  burstActive,
  zoomAction,
  focusedPosition,
  onResetComplete,
}: {
  cameraPreset: 'default' | 'isometric' | 'top' | 'front';
  isAutoRotating: boolean;
  burstActive: boolean;
  zoomAction: number;
  focusedPosition: [number, number, number] | null;
  onResetComplete?: () => void;
}) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const targetCamPos = useRef<THREE.Vector3 | null>(null);
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Focus directly onto selected node
  useEffect(() => {
    if (focusedPosition) {
      targetLookAt.current = new THREE.Vector3(...focusedPosition);
      // Cinematic close-up framing tailored to the node's position
      targetCamPos.current = new THREE.Vector3(
        focusedPosition[0] * 0.45,
        focusedPosition[1] + 0.5,
        focusedPosition[2] + 4.8
      );
    }
  }, [focusedPosition]);

  useEffect(() => {
    if (!focusedPosition) {
      switch (cameraPreset) {
        case 'isometric':
          targetCamPos.current = new THREE.Vector3(5.2, 3.2, 5.2);
          targetLookAt.current = new THREE.Vector3(0, 0, 0);
          break;
        case 'top':
          targetCamPos.current = new THREE.Vector3(0.01, 8.2, 0.4);
          targetLookAt.current = new THREE.Vector3(0, 0, 0);
          break;
        case 'front':
          targetCamPos.current = new THREE.Vector3(0, 0.3, 7.8);
          targetLookAt.current = new THREE.Vector3(0, 0, 0);
          break;
        case 'default':
        default:
          targetCamPos.current = new THREE.Vector3(0, 1.3, 8.0);
          targetLookAt.current = new THREE.Vector3(0, 0, 0);
          break;
      }
    }
  }, [cameraPreset, focusedPosition]);

  // Handle Zoom In / Zoom Out actions from HUD buttons
  useEffect(() => {
    if (zoomAction !== 0 && controlsRef.current) {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      camera.position.addScaledVector(dir, zoomAction * 0.9);
      controlsRef.current.update();
      if (onResetComplete) onResetComplete();
    }
  }, [zoomAction, camera, onResetComplete]);

  useFrame((_, delta) => {
    if (targetCamPos.current) {
      camera.position.lerp(targetCamPos.current, delta * 3.6);
      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLookAt.current, delta * 3.6);
        controlsRef.current.update();
      }
      if (
        camera.position.distanceTo(targetCamPos.current) < 0.05 &&
        controlsRef.current?.target.distanceTo(targetLookAt.current) < 0.05
      ) {
        targetCamPos.current = null;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      minDistance={3.2}
      maxDistance={14.0}
      enablePan={true}
      enableDamping={true}
      dampingFactor={0.05}
      autoRotate={isAutoRotating && !burstActive && !focusedPosition}
      autoRotateSpeed={0.65}
      minPolarAngle={0.12}
      maxPolarAngle={Math.PI / 2 + 0.12}
      onStart={() => {
        targetCamPos.current = null;
      }}
    />
  );
}

/**
 * Main 3D Topology Scene Container
 */
function TopologyScene3D({
  nodes,
  conduits,
  activeNode,
  onSelectNode,
  filter,
  burstActive,
  platform,
}: {
  nodes: ArchitectureNode[];
  conduits: { from: string; to: string }[];
  activeNode: ArchitectureNode | null;
  onSelectNode: (node: ArchitectureNode) => void;
  filter: string;
  burstActive: boolean;
  platform: ArchitecturePlatform;
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  return (
    <group>
      <HolographicRadarFloor nodes={nodes} isLight={isLight} platform={platform} />
      <AtmosphericDust isLight={isLight} />
      <KineticLaserConduits nodes={nodes} conduits={conduits} isLight={isLight} burstActive={burstActive} />

      {nodes.map((node) => {
        const isSelected = activeNode?.id === node.id;
        const isHovered = hoveredNodeId === node.id;
        const matchesFilter = filter === 'all' || node.category === filter;

        return (
          <ArchitecturalNode3D
            key={node.id}
            node={node}
            isSelected={isSelected}
            isHovered={isHovered}
            matchesFilter={matchesFilter}
            isLight={isLight}
            burstActive={burstActive}
            onClick={() => onSelectNode(node)}
            onPointerOver={() => {
              setHoveredNodeId(node.id);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredNodeId(null);
              document.body.style.cursor = 'auto';
            }}
          />
        );
      })}
    </group>
  );
}

export function ObservatorySection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const prefersReducedMotion = usePrefersReducedMotion();

  const [platform, setPlatform] = useState<ArchitecturePlatform>('aws');

  const currentNodes = platform === 'aws' ? AWS_NODES : CPC2_NODES;
  const currentConduits = platform === 'aws' ? AWS_CONDUITS : CPC2_CONDUITS;

  const [activeNode, setActiveNode] = useState<ArchitectureNode>(AWS_NODES[2]); // Default on EKS Microservices
  const [filter, setFilter] = useState<string>('all');
  const [burstActive, setBurstActive] = useState(false);

  // Cinematic 360-Degree Camera, Focused Node & View Controls
  const [cameraPreset, setCameraPreset] = useState<'default' | 'isometric' | 'top' | 'front'>('default');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zoomAction, setZoomAction] = useState(0);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

  const focusedPosition = useMemo(() => {
    if (!focusedNodeId) return null;
    const match = currentNodes.find((n) => n.id === focusedNodeId);
    return match ? match.position : null;
  }, [focusedNodeId, currentNodes]);

  const handleSelectPlatform = (newPlatform: ArchitecturePlatform) => {
    setPlatform(newPlatform);
    setFilter('all');
    setFocusedNodeId(null);
    setCameraPreset('default');
    setActiveNode(newPlatform === 'aws' ? AWS_NODES[2] : CPC2_NODES[1]);
  };

  const handleSelectNode = (node: ArchitectureNode) => {
    setActiveNode(node);
    setFilter(node.id);
    setFocusedNodeId(node.id);
  };

  const clusterTabs = useMemo(() => {
    if (platform === 'aws') {
      return [
        { id: 'all', label: `All Tier Nodes (${AWS_NODES.length} Online)`, nodeId: null },
        { id: 'cloudfront-s3', label: 'Tier 1: CloudFront & S3 SPA', nodeId: 'cloudfront-s3' },
        { id: 'alb-ingress', label: 'Tier 2: ALB Ingress', nodeId: 'alb-ingress' },
        { id: 'eks-microservices', label: 'Tier 2: EKS Microservices', nodeId: 'eks-microservices' },
        { id: 'rds-postgres', label: 'Tier 3: RDS PostgreSQL Multi-AZ', nodeId: 'rds-postgres' },
        { id: 'elasticache-redis', label: 'Tier 3: ElastiCache Redis', nodeId: 'elasticache-redis' },
        { id: 'sqs-sns', label: 'Tier 2/3: SQS & SNS Brokers', nodeId: 'sqs-sns' },
        { id: 'cloudwatch-secrets', label: 'Governance: Secrets & APM', nodeId: 'cloudwatch-secrets' },
      ];
    } else {
      return [
        { id: 'all', label: `All Tier Nodes (${CPC2_NODES.length} Online)`, nodeId: null },
        { id: 'gateway', label: 'Inward Gateway', nodeId: 'gateway' },
        { id: 'kafka', label: 'Kafka Event Broker', nodeId: 'kafka' },
        { id: 'validation', label: 'Validation Microservice', nodeId: 'validation' },
        { id: 'computation', label: 'Tax Computation Engine', nodeId: 'computation' },
        { id: 'matching', label: 'TDS / TCS Reconciliation', nodeId: 'matching' },
        { id: 'database', label: 'Oracle & Postgres DB', nodeId: 'database' },
      ];
    }
  }, [platform]);

  const handleSelectClusterTab = (tab: { id: string; label: string; nodeId: string | null }) => {
    if (!tab.nodeId || tab.id === 'all') {
      setFilter('all');
      setFocusedNodeId(null);
      setCameraPreset('default');
    } else {
      const match = currentNodes.find((n) => n.id === tab.nodeId);
      if (match) {
        setActiveNode(match);
        setFilter(match.id);
        setFocusedNodeId(match.id);
      }
    }
  };

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
            title="Enterprise Microservices Topology & Cloud Architecture"
            description="Explore enterprise microservices architectures deployed across AWS Cloud and Hybrid infrastructure in real-time 3D. Inspect AWS services, trace event-driven Kafka pipelines, and simulate cloud autoscaling bursts."
            className="mb-0"
          />

          {/* Burst Simulation Button */}
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <button
              type="button"
              onClick={handleTriggerBurst}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-lg ${
                burstActive
                  ? 'bg-emerald-500 text-slate-950 scale-105 shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                  : isLight
                    ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-sky-500/25 hover:shadow-sky-500/40'
                    : 'bg-sky-500 text-slate-950 hover:bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${burstActive ? 'animate-bounce text-slate-950' : ''}`} />
              <span>
                {burstActive
                  ? platform === 'aws'
                    ? 'Simulating AWS Peak Load Burst (250k msg/sec via MSK)...'
                    : 'Simulating High-Throughput Burst (120k msg/sec)...'
                  : 'Trigger Event Flow Burst'}
              </span>
            </button>
          </div>
        </div>

        {/* Platform Architecture Selector */}
        <div className="flex flex-wrap items-center gap-3 mb-6 p-1.5 rounded-2xl border backdrop-blur-xl transition-all w-fit bg-slate-900/40 border-slate-800/80 dark:bg-slate-950/60">
          <span className={`text-xs font-mono font-bold px-3 py-1 flex items-center gap-1.5 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
            <Cloud className="w-4 h-4 text-sky-500" />
            <span>Architecture Mode:</span>
          </span>

          <button
            type="button"
            onClick={() => handleSelectPlatform('aws')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              platform === 'aws'
                ? isLight
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 scale-[1.02]'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-extrabold shadow-[0_0_20px_rgba(249,115,22,0.4)] scale-[1.02]'
                : isLight
                  ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span>AWS Cloud-Native Microservices (AWS EKS • MSK • Aurora • S3 • Redis)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectPlatform('cpc2')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              platform === 'cpc2'
                ? isLight
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-500/25 scale-[1.02]'
                  : 'bg-sky-500 text-slate-950 font-extrabold shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-[1.02]'
                : isLight
                  ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>CPC 2.0 Enterprise Tax Processing (Kafka • Spring Boot • Oracle DB)</span>
          </button>
        </div>

        {/* Cluster Filter Tabs with Instant Node Focus */}
        <div className="animate-on-scroll flex flex-wrap items-center gap-2 mb-6 text-xs font-mono">
          <span className={`text-[11px] uppercase mr-2 font-bold ${isLight ? 'text-slate-800' : 'text-slate-400'}`}>
            Cluster View:
          </span>
          {clusterTabs.map((tab) => {
            const isTabActive = tab.id === 'all' ? filter === 'all' : filter === tab.nodeId || activeNode.id === tab.nodeId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectClusterTab(tab)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                  isTabActive
                    ? isLight
                      ? 'bg-sky-100 text-sky-950 border-sky-400 font-extrabold shadow-sm scale-[1.02]'
                      : 'bg-sky-500/25 text-sky-300 border-sky-400 font-extrabold shadow-[0_0_15px_rgba(56,189,248,0.25)] scale-[1.02]'
                    : isLight
                      ? 'bg-white text-slate-800 border-slate-300 hover:text-slate-950 shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main 3D Observatory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Canvas Viewport (8 Columns) */}
          <div className="lg:col-span-8 relative">
            <div
              className={`relative w-full h-[580px] sm:h-[690px] rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                isLight
                  ? 'bg-white/90 border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.1),0_0_0_1px_rgba(15,23,42,0.03)]'
                  : 'bg-[#080d1a]/95 border-slate-800/90 shadow-black/80'
              }`}
            >
              {/* Tactical Viewport HUD Corner Brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-sky-500/40 pointer-events-none z-10" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-sky-500/40 pointer-events-none z-10" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-sky-500/40 pointer-events-none z-10" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-sky-500/40 pointer-events-none z-10" />

              {/* Telemetry Header Bar */}
              <div
                className={`absolute top-4 left-5 right-5 z-10 flex items-center justify-between text-xs font-mono pointer-events-none ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className={`font-bold uppercase tracking-wider ${platform === 'aws' ? 'text-orange-500' : 'text-sky-500'}`}>
                    {platform === 'aws' ? 'AWS VIRTUAL PRIVATE CLOUD // US-EAST-1 (MULTI-AZ)' : 'ENTERPRISE PRODUCTION TOPOLOGY // CPC 2.0'}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-[11px]">
                  <span className="px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400 bg-emerald-950/20">
                    ● ACTIVE STREAM
                  </span>
                  <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                    Nodes: {currentNodes.length} Online
                  </span>
                </div>
              </div>

              {/* 360° Cinematic Controls & Camera Preset Action Deck */}
              <div className="absolute top-12 sm:top-14 right-4 sm:right-5 z-20 flex flex-wrap items-center justify-end gap-2">
                {/* Active Focused Node Status / Unfocus Action */}
                {focusedNodeId && (
                  <button
                    type="button"
                    onClick={() => {
                      setFocusedNodeId(null);
                      setFilter('all');
                      setCameraPreset('default');
                    }}
                    title="Reset focus to view full architecture"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold bg-sky-500/25 text-sky-300 border border-sky-400/60 hover:bg-sky-500/35 transition-all shadow-lg backdrop-blur-xl"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Focus: {currentNodes.find(n => n.id === focusedNodeId)?.name.split(':')[0] || 'Node'} (Click to Reset)</span>
                  </button>
                )}

                {/* 360° Turntable Orbit Toggle Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoRotating(!isAutoRotating);
                    if (!isAutoRotating) {
                      setFocusedNodeId(null);
                    }
                  }}
                  title={isAutoRotating ? 'Pause 360° Continuous Orbit' : 'Resume 360° Continuous Orbit'}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all backdrop-blur-xl border shadow-lg ${
                    isAutoRotating && !focusedNodeId
                      ? isLight
                        ? 'bg-orange-500 text-white border-orange-400 shadow-orange-500/30 scale-[1.02]'
                        : 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 border-orange-400 font-extrabold shadow-[0_0_20px_rgba(249,115,22,0.4)] scale-[1.02]'
                      : isLight
                        ? 'bg-white/95 text-slate-700 border-slate-300 hover:text-slate-950 hover:bg-slate-100'
                        : 'bg-slate-950/85 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Rotate3d className={`w-3.5 h-3.5 ${isAutoRotating && !focusedNodeId ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                  <span>360° Orbit {isAutoRotating && !focusedNodeId ? 'ON' : 'OFF'}</span>
                </button>

                {/* Camera View Presets */}
                <div className={`hidden sm:flex items-center gap-1 p-1 rounded-xl border backdrop-blur-xl text-[10px] font-mono font-bold ${
                  isLight ? 'bg-white/90 border-slate-300 shadow-sm' : 'bg-slate-950/80 border-slate-800/90 shadow-xl'
                }`}>
                  <button
                    type="button"
                    onClick={() => {
                      setFocusedNodeId(null);
                      setCameraPreset('isometric');
                      setIsAutoRotating(false);
                    }}
                    className={`px-2 py-1 rounded-lg transition-all ${
                      cameraPreset === 'isometric' && !focusedNodeId
                        ? 'bg-sky-500 text-slate-950 font-black shadow-sm'
                        : isLight
                          ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                          : 'text-slate-400 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    Isometric 3D
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFocusedNodeId(null);
                      setCameraPreset('front');
                      setIsAutoRotating(false);
                    }}
                    className={`px-2 py-1 rounded-lg transition-all ${
                      cameraPreset === 'front' && !focusedNodeId
                        ? 'bg-sky-500 text-slate-950 font-black shadow-sm'
                        : isLight
                          ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                          : 'text-slate-400 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    Front 3-Tier
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFocusedNodeId(null);
                      setCameraPreset('top');
                      setIsAutoRotating(false);
                    }}
                    className={`px-2 py-1 rounded-lg transition-all ${
                      cameraPreset === 'top' && !focusedNodeId
                        ? 'bg-sky-500 text-slate-950 font-black shadow-sm'
                        : isLight
                          ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                          : 'text-slate-400 hover:text-white hover:bg-slate-850'
                    }`}
                  >
                    Top-Down VPC
                  </button>
                </div>
              </div>

              {/* High-Performance 3D Canvas */}
              <Canvas
                dpr={[1, 1.75]}
                camera={{ position: [0, 1.3, 8.0], fov: 42 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              >
                <ambientLight intensity={isLight ? 1.4 : 0.8} />
                <directionalLight position={[6, 8, 6]} intensity={isLight ? 2.4 : 2.0} />
                <directionalLight position={[-6, -4, -3]} intensity={isLight ? 1.2 : 0.9} color="#818cf8" />
                <pointLight position={[0, 4, 4]} intensity={isLight ? 2.0 : 1.5} color={platform === 'aws' ? '#f97316' : '#38bdf8'} />
                <pointLight position={[0, -2, -3]} intensity={1.0} color="#6366f1" />

                <Float
                  speed={prefersReducedMotion ? 0 : 0.9}
                  rotationIntensity={focusedNodeId ? 0.02 : 0.08}
                  floatIntensity={focusedNodeId ? 0.05 : 0.15}
                >
                  <TopologyScene3D
                    nodes={currentNodes}
                    conduits={currentConduits}
                    activeNode={activeNode}
                    onSelectNode={handleSelectNode}
                    filter={filter}
                    burstActive={burstActive}
                    platform={platform}
                  />
                </Float>

                <SceneCameraManager
                  cameraPreset={cameraPreset}
                  isAutoRotating={isAutoRotating}
                  burstActive={burstActive}
                  zoomAction={zoomAction}
                  focusedPosition={focusedPosition}
                  onResetComplete={() => setZoomAction(0)}
                />
              </Canvas>

              {/* Floating Bottom-Right Zoom & Reset Controls */}
              <div className={`absolute bottom-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-xl border backdrop-blur-xl shadow-xl ${
                isLight ? 'bg-white/90 border-slate-300' : 'bg-slate-950/85 border-slate-800'
              }`}>
                <button
                  type="button"
                  onClick={() => setZoomAction(1)}
                  title="Zoom In"
                  className={`p-1.5 rounded-lg transition-all ${
                    isLight ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomAction(-1)}
                  title="Zoom Out"
                  className={`p-1.5 rounded-lg transition-all ${
                    isLight ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFocusedNodeId(null);
                    setFilter('all');
                    setCameraPreset('default');
                    setIsAutoRotating(true);
                  }}
                  title="Reset Camera View to 360° Orbit"
                  className={`p-1.5 rounded-lg transition-all ${
                    isLight ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom-Left Instructions / Hint HUD */}
              <div
                className={`absolute bottom-4 left-5 flex items-center gap-2 text-[11px] font-mono pointer-events-none ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-sky-500" />
                <span className="hidden sm:inline">
                  Click any Service Icon or Cluster Tab to Focus & Inspect Details • 360° Drag & Zoom
                </span>
                <span className="sm:hidden">
                  Tap Icons or Cluster Tabs to Focus & Inspect
                </span>
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
              {/* Active Node Header with Minimal Round Icon */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <MinimalRoundIcon
                    nodeId={activeNode.id}
                    size="md"
                    isLight={isLight}
                    isSelected
                  />
                  <div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${platform === 'aws' ? 'text-orange-500' : 'text-sky-500'}`}>
                      {platform === 'aws' ? 'AWS Cloud Telemetry' : 'Service Telemetry'}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {SERVICE_ICON_MAP[activeNode.id]?.badge || 'NODE'}
                    </span>
                  </div>
                </div>
                <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md border font-semibold ${
                  isLight ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-300'
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
              <p className={`text-xs leading-relaxed mb-5 ${isLight ? 'text-slate-800 font-medium' : 'text-slate-300'}`}>
                {activeNode.details}
              </p>

              {/* AWS Specifications / Cloud Specs Box */}
              <div className="mb-5 space-y-1.5">
                <span className={`text-[10px] font-mono uppercase font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                  <span>{platform === 'aws' ? 'AWS Infrastructure Specifications:' : 'Architecture Specifications:'}</span>
                </span>
                <div className={`p-2.5 rounded-xl border text-xs font-mono font-bold ${
                  isLight ? 'bg-orange-50/70 border-orange-200 text-orange-950' : 'bg-orange-950/20 border-orange-800/40 text-orange-300'
                }`}>
                  {activeNode.cloudSpecs}
                </div>
              </div>

              {/* Tech Stack Pill */}
              <div className="mb-6 space-y-1.5">
                <span className={`text-[10px] font-mono uppercase font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                  <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Implementation Stack:</span>
                </span>
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
                isLight ? 'bg-emerald-50/90 border-emerald-300 text-emerald-900 font-semibold' : 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300'
              }`}>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Cluster Availability
                </span>
                <span className="font-bold">{activeNode.health}</span>
              </div>
            </div>

            {/* Platform Telemetry Bar */}
            <div
              className={`rounded-2xl border p-5 backdrop-blur-md text-xs font-mono space-y-2.5 ${
                isLight ? 'bg-white/85 border-slate-200/90 text-slate-800' : 'bg-slate-950/70 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 font-semibold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                  {platform === 'aws' ? 'AWS Well-Architected SLA' : 'Production Engine SLA'}
                </span>
                <span className="text-emerald-500 font-bold">99.999% Multi-AZ</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="flex items-center gap-1">
                  <Network className="w-3 h-3 text-sky-500" />
                  {platform === 'aws' ? 'MSK Consumer Group Lag:' : 'Kafka Consumer Lag:'}
                </span>
                <span className="text-sky-500 font-bold">0 partitions</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Global Processing Speed:</span>
                <span className="text-sky-500 font-bold">{platform === 'aws' ? '250,000 msg/sec' : '54,200 msg/sec'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
