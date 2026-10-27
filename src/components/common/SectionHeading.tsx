import { useTheme } from '../../context/ThemeContext';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isCenter = align === 'center';

  return (
    <div className={`animate-on-scroll mb-8 sm:mb-10 ${isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'} ${className}`}>
      <div className={`inline-flex items-center gap-2 mb-2.5 ${isCenter ? 'justify-center' : ''}`}>
        <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
        <span className={`text-xs uppercase tracking-[0.2em] font-mono font-bold ${
          isLight ? 'text-sky-800' : 'text-sky-400'
        }`}>
          {eyebrow}
        </span>
      </div>

      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 transition-colors ${
        isLight ? 'text-slate-950' : 'text-white'
      }`}>
        {title}
      </h2>

      {description && (
        <p className={`text-base sm:text-lg leading-relaxed transition-colors ${
          isLight ? 'text-slate-700 font-medium' : 'text-slate-400 font-normal'
        }`}>
          {description}
        </p>
      )}
    </div>
  );
}
