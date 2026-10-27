import { useState, useEffect } from 'react';

export function useWebGLSupport(): { supported: boolean; checked: boolean } {
  const [supported, setSupported] = useState<boolean>(true);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    } finally {
      setChecked(true);
    }
  }, []);

  return { supported, checked };
}
