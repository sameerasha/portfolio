import { Mail, ExternalLink, ShieldCheck, Terminal, ArrowUp, FileText } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import type { ProfileData } from '../../types/portfolio';
import { useTheme } from '../../context/ThemeContext';

interface FooterProps {
  profile: ProfileData;
}

const CURRENT_YEAR = new Date().getFullYear();

export function Footer({ profile }: FooterProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const currentYear = CURRENT_YEAR;
  const displayName = profile.name.trim() || profile.fallbackTitle;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative z-20 border-t transition-colors font-mono text-xs overflow-hidden ${
      isLight
        ? 'border-slate-300 bg-gradient-to-b from-slate-100 via-slate-150 to-slate-200 text-slate-800 shadow-[0_-15px_40px_rgba(15,23,42,0.08)]'
        : 'border-slate-800/90 bg-gradient-to-b from-[#0c101b] via-[#080b13] to-[#04060a] text-slate-400 shadow-[0_-25px_60px_rgba(0,0,0,0.95)]'
    }`}>
      {/* Top subtle luxury accent line */}
      <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent ${
        isLight ? 'via-sky-500/50' : 'via-sky-400/50'
      } to-transparent pointer-events-none`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Upper Row: Identity, Navigation, and Telemetry Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
          {/* Identity Monogram */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 shrink-0">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className={`text-sm font-extrabold tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
                {displayName}
              </div>
              <div className={`text-[11px] font-semibold ${isLight ? 'text-sky-800' : 'text-sky-400'}`}>
                Senior Software Engineer @ Accenture • Java 21 & AWS Cloud Architect
              </div>
            </div>
          </div>

          {/* Minimal Inline Navigation Strip */}
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs font-semibold">
            {[
              { label: 'Overview', href: '#overview' },
              { label: 'Architecture 3D', href: '#observatory' },
              { label: 'About', href: '#about' },
              { label: 'Skills', href: '#skills' },
              { label: 'Projects', href: '#projects' },
              { label: 'Experience', href: '#experience' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isLight ? 'text-slate-700 hover:text-sky-700' : 'text-slate-400 hover:text-sky-300'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Telemetry Status + Back to Top */}
          <div className="flex items-center gap-3">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold ${
              isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span>CPC 2.0 ONLINE</span>
            </div>

            <button
              onClick={scrollToTop}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold transition-all ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-900 shadow-sm hover:scale-105'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-750 text-slate-200 hover:scale-105'
              }`}
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Lower Row: Channels & Architecture Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          {/* Direct Communication Channels */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-800 hover:border-sky-400 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-sky-500" />
              <span>{profile.email}</span>
            </a>

            {profile.socialLinks.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-800 hover:border-sky-400 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {profile.socialLinks.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-800 hover:border-sky-400 shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <GithubIcon className="w-3.5 h-3.5 text-sky-500" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {profile.resume.available && profile.resume.url && (
              <a
                href={profile.resume.url}
                download={profile.resume.fileName}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold bg-sky-500 text-slate-950 hover:bg-sky-400 transition-all shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </a>
            )}
          </div>

          {/* Copyright & Architecture Stack */}
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>© {currentYear} {displayName} • Java 11 • Spring Boot 3 • Kafka • React 19 • TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
