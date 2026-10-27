import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useTheme } from '../../context/ThemeContext';

interface CinematicPreloaderProps {
  onComplete?: () => void;
}

const BOOT_LOGS = [
  'BOOT // INITIALIZING RUNTIME ENVIRONMENT',
  'MESH // CONNECTING APACHE KAFKA CLUSTER',
  'CORE // MOUNTING SPRING BOOT MICROSERVICES',
  'DATA // HYDRATING ORACLE & POSTGRES LEDGER',
  'READY // LAUNCHING 3D CINEMATIC ARCHITECTURE',
];

export function CinematicPreloader({ onComplete }: CinematicPreloaderProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const prefersReducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    const counterObj = { val: 0 };
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        setIsDone(true);
        onComplete?.();
      },
    });

    // 1. Digital Telemetry Counter 0 -> 100% (Cinematic 2.4s progression for deliberate luxury pacing)
    tl.to(counterObj, {
      val: 100,
      duration: 2.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        const current = Math.round(counterObj.val);
        setProgress(current);
        const idx = Math.min(
          BOOT_LOGS.length - 1,
          Math.floor((current / 100) * BOOT_LOGS.length)
        );
        setLogIndex(idx);
      },
    })
      // 2. Expand laser progress bar from center
      .fromTo(
        '#preloader-laser-line',
        { scaleX: 0, opacity: 0.5 },
        { scaleX: 1, opacity: 1, duration: 2.4, ease: 'power2.inOut' },
        0
      )
      // 3. Central emblem pulse & fade
      .to('#preloader-center-stage', {
        scale: 1.08,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.35,
        ease: 'power3.in',
      }, '+=0.1')
      // 4. Theatrical Dual-Shutter Aperture Split
      .to(
        '#preloader-top-shutter',
        {
          yPercent: -100,
          duration: 0.75,
          ease: 'power4.inOut',
        },
        '-=0.08'
      )
      .to(
        '#preloader-bottom-shutter',
        {
          yPercent: 100,
          duration: 0.75,
          ease: 'power4.inOut',
        },
        '<'
      );

    const handleSkip = () => {
      tl.progress(1);
    };

    window.addEventListener('keydown', handleSkip);
    window.addEventListener('click', handleSkip);

    return () => {
      tl.kill();
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('click', handleSkip);
    };
  }, [prefersReducedMotion, onComplete]);

  if (isDone) return null;

  return (
    <div
      id="preloader-container"
      className="fixed inset-0 z-50 select-none overflow-hidden pointer-events-none"
    >
      {/* Top Shutter Panel */}
      <div
        id="preloader-top-shutter"
        className={`absolute top-0 left-0 right-0 h-1/2 pointer-events-auto transition-colors duration-300 ${
          isLight
            ? 'bg-[#f8fafc] border-b border-sky-300/40 shadow-2xl'
            : 'bg-[#07090e] border-b border-sky-500/20 shadow-2xl'
        }`}
      />

      {/* Bottom Shutter Panel */}
      <div
        id="preloader-bottom-shutter"
        className={`absolute bottom-0 left-0 right-0 h-1/2 pointer-events-auto transition-colors duration-300 ${
          isLight
            ? 'bg-[#f8fafc] border-t border-sky-300/40 shadow-2xl'
            : 'bg-[#07090e] border-t border-sky-500/20 shadow-2xl'
        }`}
      />

      {/* Center Holographic Stage */}
      <div
        id="preloader-center-stage"
        className={`absolute inset-0 z-10 flex flex-col items-center justify-between p-8 sm:p-14 pointer-events-auto transition-colors duration-300 ${
          isLight ? 'text-slate-900' : 'text-slate-100'
        }`}
      >
        {/* Top Monospace Header */}
        <div className={`w-full flex items-center justify-between text-xs font-mono tracking-widest ${
          isLight ? 'text-slate-700' : 'text-slate-400'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
            <span className={`font-bold ${isLight ? 'text-sky-800' : 'text-sky-300'}`}>
              ENGINE PROTOCOL // SYSTEM_V3
            </span>
          </div>
          <span className={`hidden sm:inline-block text-[11px] font-semibold ${
            isLight ? 'text-slate-600' : 'text-slate-500'
          }`}>
            BANGALORE // INFOSYS TECH ANALYST
          </span>
        </div>

        {/* Central Brand & Holographic Ring */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-xl">
          {/* Animated SVG Gyroscopic Emblem */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Outer spinning ring */}
            <svg
              className="absolute inset-0 w-full h-full animate-[spin_8s_linear_infinite]"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke={isLight ? '#0284c7' : '#38bdf8'}
                strokeWidth="2"
                strokeDasharray="8 6"
                opacity={isLight ? '0.85' : '0.6'}
              />
            </svg>
            {/* Inner counter-spinning ring */}
            <svg
              className="absolute inset-3 w-18 h-18 animate-[spin_5s_linear_infinite_reverse]"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke={isLight ? '#4f46e5' : '#818cf8'}
                strokeWidth="2.5"
                strokeDasharray="14 10"
                opacity={isLight ? '0.9' : '0.8'}
              />
            </svg>
            {/* Center glowing core */}
            <div className={`w-8 h-8 rounded-full animate-pulse ${
              isLight
                ? 'bg-gradient-to-tr from-sky-600 to-indigo-600 shadow-[0_0_24px_rgba(2,132,199,0.6)]'
                : 'bg-gradient-to-tr from-sky-500 to-indigo-500 shadow-[0_0_20px_rgba(56,189,248,0.9)]'
            }`} />
          </div>

          <div className="space-y-2">
            <div className={`text-[11px] font-mono tracking-[0.3em] uppercase font-bold ${
              isLight ? 'text-sky-700' : 'text-sky-400'
            }`}>
              Full Stack Architect & Systems Engineer
            </div>
            <h1 className={`text-3xl sm:text-5xl font-black tracking-tight font-mono ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}>
              RABINARAYAN ASHA
            </h1>
            <div className={`text-xs font-mono h-5 transition-all font-semibold ${
              isLight ? 'text-slate-800' : 'text-slate-400'
            }`}>
              {BOOT_LOGS[logIndex]}
            </div>
          </div>
        </div>

        {/* Bottom Laser Telemetry Track */}
        <div className="w-full max-w-2xl space-y-3">
          <div className={`flex items-end justify-between font-mono text-xs ${
            isLight ? 'text-slate-800' : 'text-slate-400'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className={`text-[11px] tracking-wider font-bold ${
                isLight ? 'text-slate-800' : 'text-slate-400'
              }`}>
                SYSTEM INITIALIZATION
              </span>
            </div>
            <div className={`text-2xl sm:text-3xl font-black font-mono ${
              isLight
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-indigo-700'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400'
            }`}>
              {String(progress).padStart(3, '0')}%
            </div>
          </div>

          {/* Glowing Center-Out Laser Progress Bar */}
          <div className={`h-[2px] w-full rounded-full overflow-hidden relative ${
            isLight
              ? 'bg-slate-200 shadow-[0_0_10px_rgba(2,132,199,0.3)]'
              : 'bg-slate-900 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
          }`}>
            <div
              id="preloader-laser-line"
              className={`h-full origin-center transition-all ${
                isLight
                  ? 'bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-600'
                  : 'bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400'
              }`}
              style={{ width: '100%' }}
            />
          </div>
          <div className={`text-center text-[10px] font-mono tracking-wider font-semibold ${
            isLight ? 'text-slate-600' : 'text-slate-500'
          }`}>
            Press any key or click to skip directly
          </div>
        </div>
      </div>
    </div>
  );
}