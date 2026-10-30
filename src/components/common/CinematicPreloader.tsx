import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useTheme } from '../../context/ThemeContext';

interface CinematicPreloaderProps {
  onComplete?: () => void;
}

const KERNEL_CHAPTERS = [
  { chapter: 'CHAPTER I', title: 'THE ARCHITECTURAL PROLOGUE', subtitle: 'Enterprise Java 21 & Spring Boot 3 Engine' },
  { chapter: 'CHAPTER II', title: 'DISTRIBUTED CONCURRENCY', subtitle: 'Virtual Threads & Low-Latency Event Conduits' },
  { chapter: 'CHAPTER III', title: 'ELASTIC CLOUD FABRIC', subtitle: 'AWS EKS Multi-AZ & High-Availability RDS' },
  { chapter: 'CHAPTER IV', title: 'REACTIVE STREAMING PIPELINE', subtitle: 'Apache Kafka High-Throughput Reconciliation' },
  { chapter: 'CHAPTER V', title: 'EXECUTIVE ARCHIVE UNVEILED', subtitle: 'Rabinarayan Asha — Senior Software Engineer' },
];

export function CinematicPreloader({ onComplete }: CinematicPreloaderProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const prefersReducedMotion = usePrefersReducedMotion();

  const [progress, setProgress] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [isDone, setIsDone] = useState(() => prefersReducedMotion);

  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const counterObj = { val: 0 };
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        setIsDone(true);
        onComplete?.();
      },
    });
    timelineRef.current = tl;

    // 1. Deliberate 3.4s cadence
    tl.to(counterObj, {
      val: 100,
      duration: 3.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        const current = Math.round(counterObj.val);
        setProgress(current);
        const idx = Math.min(
          KERNEL_CHAPTERS.length - 1,
          Math.floor((current / 100) * KERNEL_CHAPTERS.length)
        );
        setChapterIndex(idx);
      },
    })
      // 2. Central stage pulse & fade (previous commit timing)
      .to(
        '#preloader-core-stage',
        {
          scale: 1.08,
          opacity: 0,
          filter: 'blur(8px)',
          duration: 0.35,
          ease: 'power3.in',
        },
        '+=0.1'
      )
      // 3. Theatrical Dual-Shutter Aperture Split (previous commit aperture motion)
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

    return () => {
      tl.kill();
      window.removeEventListener('keydown', handleSkip);
    };
  }, [prefersReducedMotion, onComplete]);

  const handleManualSkip = () => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
  };

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      id="preloader-container"
      role="status"
      aria-live="polite"
      aria-label="Portfolio initialization"
      className="fixed inset-0 z-[120] select-none overflow-hidden bg-transparent pointer-events-none"
    >
      {/* Top Shutter Panel - 1px overlap guarantees zero subpixel seam line */}
      <div
        id="preloader-top-shutter"
        className={`absolute top-0 left-0 right-0 h-[calc(50%+1px)] pointer-events-auto transition-colors duration-700 ${
          isLight ? 'bg-[#fcfcfd]' : 'bg-[#07090e]'
        }`}
      />

      {/* Bottom Shutter Panel - 1px overlap guarantees zero subpixel seam line */}
      <div
        id="preloader-bottom-shutter"
        className={`absolute bottom-0 left-0 right-0 h-[calc(50%+1px)] pointer-events-auto transition-colors duration-700 ${
          isLight ? 'bg-[#fcfcfd]' : 'bg-[#07090e]'
        }`}
      />

      {/* Center Cinematic Stage - Optical Alignment Layout */}
      <div
        id="preloader-core-stage"
        onClick={handleManualSkip}
        className={`absolute inset-0 z-10 flex flex-col justify-between pointer-events-auto cursor-pointer ${
          isLight ? 'text-slate-900' : 'text-[#f8fafc]'
        }`}
      >
        {/* Ambient Theme Backdrop Lighting */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full blur-[160px] pointer-events-none transition-opacity duration-1000 ${
            isLight ? 'bg-sky-500/10' : 'bg-sky-500/[0.08]'
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000 ${
            isLight ? 'bg-indigo-500/10' : 'bg-indigo-500/[0.07]'
          }`}
        />

        {/* 1. Header Command Bar - Strict Max Width & Aligned Padding */}
        <header className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 pt-6 sm:pt-8 md:pt-10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
            </span>
            <span className={`text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase ${
              isLight ? 'text-sky-700' : 'text-sky-400'
            }`}>
              RABINARAYAN ASHA
            </span>
            <span className={`hidden sm:inline text-xs ${isLight ? 'text-slate-300' : 'text-slate-700'}`}>•</span>
            <span className={`hidden sm:inline text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase font-medium ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              SYSTEM INITIALIZATION
            </span>
          </div>

          <button
            onClick={handleManualSkip}
            type="button"
            aria-label="Skip preloader"
            className={`h-7 sm:h-8 px-3.5 sm:px-4 rounded-full border text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase inline-flex items-center justify-center transition-all ${
              isLight
                ? 'bg-white hover:bg-slate-50 border-sky-200 text-sky-700 shadow-sm hover:scale-105'
                : 'bg-[#0d121f] hover:bg-[#121828] border-sky-500/30 text-sky-300 hover:text-white shadow-md hover:scale-105 hover:border-sky-400/50'
            }`}
          >
            DISMISS [ESC]
          </button>
        </header>

        {/* 2. Central True Geometric & Optical Center Container */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 w-full">
          <div className="w-full max-w-lg flex flex-col items-center text-center space-y-6 sm:space-y-8">
            {/* Concentric Precision Dial Emblem */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
              {/* Outer Chronometer Bezel with 60 Micro-Division Ticks */}
              <svg
                className="absolute inset-0 w-full h-full animate-[spin_24s_linear_infinite]"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke={isLight ? '#0284c7' : '#38bdf8'}
                  strokeWidth="0.85"
                  strokeDasharray="1 3"
                  opacity={isLight ? '0.6' : '0.45'}
                />
              </svg>

              {/* Middle Rotating Segment Ring - Mathematically Concentric */}
              <svg
                className="absolute inset-0 w-full h-full animate-[spin_16s_linear_infinite_reverse]"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="39"
                  fill="none"
                  stroke={isLight ? '#6366f1' : '#818cf8'}
                  strokeWidth="1.25"
                  strokeDasharray="8 12 2 12"
                  opacity={isLight ? '0.75' : '0.6'}
                />
              </svg>

              {/* Inner Crest Core */}
              <div
                className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center border shadow-2xl transition-all duration-500 ${
                  isLight
                    ? 'bg-gradient-to-tr from-white via-sky-50 to-white border-sky-200 shadow-[0_10px_30px_rgba(56,189,248,0.2)]'
                    : 'bg-gradient-to-tr from-[#0c1017] via-[#121722] to-[#0c1017] border-sky-500/40 shadow-[0_0_35px_rgba(56,189,248,0.25)]'
                }`}
              >
                {/* Corner Sky-Blue Notches */}
                <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-sky-400" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-sky-400" />
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-sky-400" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-sky-400" />

                <div className="flex flex-col items-center justify-center leading-none">
                  <span className={`font-mono font-black text-xl sm:text-2xl tracking-tight text-transparent bg-clip-text ${
                    isLight
                      ? 'bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600'
                      : 'bg-gradient-to-r from-sky-400 via-indigo-300 to-white drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]'
                  }`}>
                    RA
                  </span>
                  <span className={`text-[7px] font-mono tracking-[0.25em] pl-[0.25em] uppercase mt-1 ${
                    isLight ? 'text-sky-700 font-bold' : 'text-sky-400'
                  }`}>
                    CORE
                  </span>
                </div>
              </div>
            </div>

            {/* Typography Hierarchy with text-wrap balance */}
            <div className="space-y-3 w-full">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[10px] font-mono font-semibold tracking-[0.25em] uppercase ${
                  isLight
                    ? 'bg-sky-50 border-sky-200 text-sky-800'
                    : 'bg-[#0d121f] border-sky-500/30 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.1)]'
                }`}
              >
                <span>{KERNEL_CHAPTERS[chapterIndex].chapter}</span>
                <span className="opacity-40">•</span>
                <span>{KERNEL_CHAPTERS[chapterIndex].title}</span>
              </div>

              <h1
                style={{ textWrap: 'balance' }}
                className={`text-2xl sm:text-4xl md:text-5xl font-black font-mono tracking-[0.16em] uppercase ${
                  isLight
                    ? 'text-slate-900'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-indigo-200 drop-shadow-[0_0_30px_rgba(56,189,248,0.25)]'
                }`}
              >
                Rabinarayan Asha
              </h1>

              <p
                style={{ textWrap: 'balance' }}
                className={`text-xs sm:text-sm font-mono tracking-[0.2em] uppercase max-w-lg mx-auto ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                Senior Software Engineer • Accenture
              </p>
            </div>

            {/* 3. Progress Bar & Telemetry - Perfect Left/Right Coherence */}
            <div className="w-full max-w-md mx-auto space-y-2.5 pt-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span
                  className={`text-[10px] sm:text-[11px] tracking-[0.16em] uppercase truncate max-w-[240px] sm:max-w-none text-left ${
                    isLight ? 'text-sky-700 font-semibold' : 'text-sky-300'
                  }`}
                >
                  {KERNEL_CHAPTERS[chapterIndex].subtitle}
                </span>

                <div className="flex items-baseline gap-1 shrink-0 pl-3">
                  <span
                    className={`text-xl sm:text-2xl font-bold font-mono tracking-tight tabular-nums ${
                      isLight
                        ? 'text-sky-800'
                        : 'text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-300 to-indigo-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                    }`}
                  >
                    {String(progress).padStart(3, '0')}
                  </span>
                  <span className={`text-xs font-semibold ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>%</span>
                </div>
              </div>

              {/* Inlay Rail with App Gradient */}
              <div
                className={`h-[3px] w-full rounded-full overflow-hidden relative ${
                  isLight ? 'bg-slate-200' : 'bg-slate-800/80 border border-slate-700/50'
                }`}
              >
                <div
                  className="h-full rounded-full transition-all duration-75 bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#a855f7] shadow-[0_0_15px_rgba(56,189,248,0.7)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Micro-Telemetry Row */}
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-slate-500 pt-0.5">
                <span className="tracking-[0.15em] uppercase">BUFFER: SYNCHRONIZED</span>
                <span className="tracking-[0.15em] uppercase tabular-nums">LATENCY &lt; 12MS</span>
              </div>
            </div>
          </div>
        </main>

        {/* 4. Subdued Engineering Footer - Strict Max Width & Aligned Padding */}
        <footer className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 pb-6 sm:pb-8 md:pb-10 flex items-center justify-between text-[10px] font-mono text-slate-500 flex-shrink-0">
          <span className="tracking-[0.25em] uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />
            BHUBANESWAR // INDIA
          </span>
          <span className="hidden sm:inline tracking-[0.2em] uppercase">
            PRESS ESC OR CLICK TO ENTER PORTFOLIO
          </span>
        </footer>
      </div>
    </div>
  );
}
