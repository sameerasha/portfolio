import { type Theme } from '../../context/ThemeContext';

export function LightingRig({ theme = 'dark' }: { theme?: Theme }) {
  const isLight = theme === 'light';

  return (
    <>
      {/* Ambient background baseline */}
      <ambientLight
        intensity={isLight ? 0.95 : 0.5}
        color={isLight ? '#e2e8f0' : '#1e293b'}
      />

      {/* Primary Key Light */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={isLight ? 2.4 : 1.8}
        color={isLight ? '#ffffff' : '#e0f2fe'}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      {/* Fill Light - Electric Indigo / Violet */}
      <directionalLight
        position={[-6, -4, -3]}
        intensity={isLight ? 1.6 : 1.2}
        color={isLight ? '#818cf8' : '#818cf8'}
      />

      {/* Rim Light */}
      <pointLight
        position={[0, 4, -4]}
        intensity={isLight ? 3.0 : 2.5}
        distance={12}
        color={isLight ? '#0284c7' : '#38bdf8'}
      />

      {/* Under-glow accent light */}
      <pointLight
        position={[0, -3, 2]}
        intensity={isLight ? 1.4 : 1.0}
        distance={8}
        color={isLight ? '#4f46e5' : '#6366f1'}
      />
    </>
  );
}
