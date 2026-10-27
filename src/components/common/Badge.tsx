import React from 'react';
import { CheckCircle2, HelpCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'confirmed' | 'suggested' | 'accent' | 'neutral' | 'status';
  className?: string;
  showIcon?: boolean;
}

export function Badge({
  children,
  variant = 'neutral',
  className = '',
  showIcon = false,
}: BadgeProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const darkStyles = {
    confirmed:
      'bg-sky-500/25 text-sky-200 border-sky-400/60 shadow-[0_0_12px_rgba(56,189,248,0.25)] hover:border-sky-300 font-semibold',
    suggested:
      'bg-slate-800/90 text-slate-200 border-slate-650 hover:text-white hover:border-slate-500 font-medium',
    accent:
      'bg-indigo-500/30 text-indigo-200 border-indigo-400/60 shadow-[0_0_12px_rgba(99,102,241,0.25)] font-semibold',
    neutral:
      'bg-slate-800/90 text-slate-100 border-slate-700 font-medium hover:border-slate-500',
    status:
      'bg-emerald-500/25 text-emerald-300 border-emerald-400/50 font-semibold shadow-[0_0_10px_rgba(52,211,153,0.2)]',
  };

  const lightStyles = {
    confirmed:
      'bg-sky-50/90 text-sky-800 border-sky-300/90 shadow-sm ring-1 ring-sky-500/20 hover:border-sky-400',
    suggested:
      'bg-slate-50/90 text-slate-700 border-slate-200/90 hover:text-slate-900 hover:border-slate-300',
    accent:
      'bg-indigo-50/90 text-indigo-800 border-indigo-200/90 hover:border-indigo-300 ring-1 ring-indigo-500/10',
    neutral:
      'bg-slate-50/80 text-slate-700 border-slate-200/90 hover:bg-slate-100',
    status:
      'bg-emerald-50/90 text-emerald-800 border-emerald-200/90 ring-1 ring-emerald-500/20',
  };

  const styles = isLight ? lightStyles[variant] : darkStyles[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border transition-all duration-200 ${styles} ${className}`}
    >
      {showIcon && variant === 'confirmed' && (
        <CheckCircle2 className={`w-3.5 h-3.5 ${isLight ? 'text-sky-600' : 'text-sky-400'}`} />
      )}
      {showIcon && variant === 'suggested' && (
        <HelpCircle className={`w-3.5 h-3.5 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
      )}
      {children}
    </span>
  );
}
