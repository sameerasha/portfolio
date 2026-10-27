import { Suspense, Component, type ErrorInfo, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { LightingRig } from './LightingRig';
import { ModelViewerFallback } from './ModelViewerFallback';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useTheme } from '../../context/ThemeContext';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL Rendering Error caught gracefully:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface SceneCanvasProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  enableFog?: boolean;
}

function FogController({ theme }: { theme: 'dark' | 'light' }) {
  const fogColor = theme === 'dark' ? '#07090e' : '#f1f5f9';
  return <fogExp2 attach="fog" args={[fogColor, 0.03]} />;
}

export function SceneCanvas({
  children,
  className = 'w-full h-full min-h-[460px]',
  cameraPosition = [0, 0, 6.6],
  fov = 40,
  enableFog = false,
}: SceneCanvasProps) {
  const { supported, checked } = useWebGLSupport();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { theme } = useTheme();

  if ((checked && !supported) || prefersReducedMotion) {
    return <ModelViewerFallback headline="System Architecture Topology" />;
  }

  return (
    <div className={`relative ${className}`}>
      <WebGLErrorBoundary fallback={<ModelViewerFallback />}>
        <Suspense fallback={<ModelViewerFallback isSkeleton />}>
          <Canvas
            shadows
            dpr={[1, 1.75]} // Clamps DPR to guarantee 60 FPS
            gl={{
              powerPreference: 'high-performance',
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: theme === 'dark' ? 1.15 : 1.25,
              outputColorSpace: THREE.SRGBColorSpace,
              alpha: true,
            }}
            camera={{
              position: cameraPosition,
              fov: fov,
              near: 0.1,
              far: 100,
            }}
          >
            {enableFog && <FogController theme={theme} />}
            <LightingRig theme={theme} />
            {children}
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  );
}
