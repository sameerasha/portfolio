import { ArrowUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface BackToTopProps {
  show: boolean;
}

export function BackToTop({ show }: BackToTopProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (!show) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      type="button"
      aria-label="Back to top of page"
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-full border shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 animate-in fade-in slide-in-from-bottom-4 ${
        isLight
          ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-slate-200/80 hover:border-sky-400'
          : 'bg-slate-900/90 hover:bg-slate-800 text-sky-400 border-slate-700/80 shadow-black/50 hover:border-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]'
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
