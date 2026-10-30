import { useState } from 'react';

function checkWebGL(): boolean {
  if (typeof document === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function useWebGLSupport(): { supported: boolean; checked: boolean } {
  const [supported] = useState<boolean>(checkWebGL);
  return { supported, checked: true };
}
