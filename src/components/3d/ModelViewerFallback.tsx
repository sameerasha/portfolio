import { useState } from 'react';
import { Cpu, Server, Database, Layers } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ModelViewerFallbackProps {
  isSkeleton?: boolean;
  headline?: string;
  subtext?: string;
}

export function ModelViewerFallback({
  isSkeleton = false,
  headline = 'Distributed Architecture Engine',
  subtext = 'Interactive 3D visualization. Optimized for hardware acceleration.',
}: ModelViewerFallbackProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSkeleton) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setRotate({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  if (isSkeleton) {
    return (
      <div className={`w-full h-[460px] flex items-center justify-center rounded-2xl border backdrop-blur-md ${
        isLight
          ? 'bg-slate-100/70 border-slate-200'
          : 'bg-slate-950/60 border-slate-800/80'
      }`}>
        <div className="relative flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full border-2 border-sky-500/20 border-t-sky-500 animate-spin" />
          <span className={`text-xs uppercase tracking-widest font-mono ${
            isLight ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Initializing Engine Pipeline...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-[460px] flex items-center justify-center p-4 [perspective:1000px]"
    >
      <div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className={`relative w-full max-w-md h-[400px] rounded-2xl border shadow-2xl p-6 flex flex-col justify-between backdrop-blur-xl overflow-hidden ${
          isLight
            ? 'bg-white/95 border-slate-200 text-slate-800'
            : 'bg-gradient-to-br from-slate-900/95 via-[#0c1017]/95 to-slate-950/95 border-sky-500/20 text-slate-200'
        }`}
      >
        {/* Ambient glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className={`flex items-center justify-between z-10 border-b pb-3 ${
          isLight ? 'border-slate-200' : 'border-slate-800/60'
        }`}>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className={`text-xs font-mono uppercase tracking-wider ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              System Topology Live
            </span>
          </div>
          <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
            isLight
              ? 'text-sky-700 bg-sky-50 border border-sky-200'
              : 'text-sky-400 bg-sky-950/60 border border-sky-800/40'
          }`}>
            WebGL Fallback Active
          </span>
        </div>

        {/* Central Graphic Nodes */}
        <div className="relative my-auto flex items-center justify-center py-6">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <div className={`absolute inset-0 rounded-full border border-dashed animate-[spin_25s_linear_infinite] ${
              isLight ? 'border-sky-300' : 'border-sky-500/30'
            }`} />
            <div className={`absolute inset-4 rounded-full border animate-[spin_18s_linear_infinite_reverse] ${
              isLight ? 'border-indigo-200' : 'border-indigo-500/20'
            }`} />

            {/* Orbiting Satellite Nodes */}
            <div className="absolute top-0 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${
                isLight ? 'bg-sky-100 text-sky-700 border border-sky-200' : 'bg-sky-950 border border-sky-500/40 text-sky-400 shadow-sky-950'
              }`}>
                <Server className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-mono mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>API Gate</span>
            </div>

            <div className="absolute bottom-0 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${
                isLight ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-indigo-950 border border-indigo-500/40 text-indigo-400'
              }`}>
                <Database className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-mono mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>PostgreSQL</span>
            </div>

            <div className="absolute left-0 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${
                isLight ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-emerald-950 border border-emerald-500/40 text-emerald-400'
              }`}>
                <Cpu className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-mono mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Order Svc</span>
            </div>

            <div className="absolute right-0 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${
                isLight ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-purple-950 border border-purple-500/40 text-purple-400'
              }`}>
                <Layers className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-mono mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Stock Svc</span>
            </div>

            {/* Central Core */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 transform rotate-12 animate-pulse">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                isLight ? 'bg-white text-sky-700' : 'bg-slate-950 text-sky-300'
              }`}>
                SYS
              </div>
            </div>
          </div>
        </div>

        <div className="z-10 text-center pt-2">
          <h4 className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>{headline}</h4>
          <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{subtext}</p>
        </div>
      </div>
    </div>
  );
}
