import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-4xl',
}: ModalProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-active');
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-active');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      data-lenis-prevent="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
    >
      {/* Opaque Luxury Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#04060b]/92 backdrop-blur-2xl transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog Card */}
      <div
        data-lenis-prevent="true"
        className={`relative w-full ${maxWidth} max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl z-10 overflow-hidden animate-in zoom-in-95 duration-200 transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-[#090d16] border-slate-800 text-slate-300 shadow-2xl shadow-black/90'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b sticky top-0 z-20 ${
          isLight
            ? 'border-slate-200 bg-slate-50/90 backdrop-blur-md'
            : 'border-slate-800 bg-[#0d121f]'
        }`}>
          <div>
            <h3 id="modal-headline" className={`text-xl font-bold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {title}
            </h3>
            {subtitle && (
              <p className={`text-xs font-mono mt-0.5 ${
                isLight ? 'text-sky-700' : 'text-sky-400'
              }`}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            type="button"
            aria-label="Close dialog"
            className={`p-2 rounded-lg transition-colors ${
              isLight
                ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/60'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div
          data-lenis-prevent="true"
          className={`p-6 overflow-y-auto overscroll-contain space-y-6 ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
