import { useState, useEffect } from 'react';
import { Menu, X, FileText, Settings, Terminal, Sun, Moon } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import type { ProfileData } from '../../types/portfolio';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  profile: ProfileData;
  onOpenConfigDrawer: () => void;
}

export function Navbar({ profile, onOpenConfigDrawer }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Architecture 3D', href: '#observatory' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const displayName = profile.name.trim() || profile.fallbackTitle;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-3 sm:px-6 lg:px-8 ${
        isScrolled ? 'pt-2.5 pb-2 sm:pt-3' : 'pt-3.5 pb-2.5 sm:pt-5 sm:pb-3'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-2xl sm:rounded-full transition-all duration-300 px-4 sm:px-6 lg:px-7 py-2.5 sm:py-3 ${
          isScrolled
            ? isLight
              ? 'bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-[0_15px_45px_rgba(15,23,42,0.08),0_0_0_1px_rgba(15,23,42,0.02)]'
              : 'bg-[#0a0e17]/90 backdrop-blur-2xl border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.03)]'
            : isLight
              ? 'bg-white/60 backdrop-blur-md border border-slate-200/60'
              : 'bg-slate-950/40 backdrop-blur-md border border-slate-800/50'
        }`}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          {/* Logo / Identity */}
          <a
            href="#overview"
            className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg shrink-0"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-all shrink-0">
              <Terminal className="w-4 h-4 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className={`text-xs sm:text-sm font-extrabold tracking-tight transition-colors ${
                  isLight ? 'text-slate-950 group-hover:text-sky-700' : 'text-white group-hover:text-sky-300'
                }`}>
                  {displayName}
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border font-bold text-sky-400 border-sky-500/30 bg-sky-500/10">
                  Accenture
                </span>
              </div>
              <span className={`hidden md:block text-[10px] font-mono tracking-wider font-semibold truncate max-w-[210px] lg:max-w-none ${
                isLight ? 'text-slate-700' : 'text-slate-400'
              }`}>
                Java 21 • AWS Cloud • Microservices
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Visible on all desktop viewports lg & xl) */}
          <nav className={`hidden lg:flex items-center gap-0.5 xl:gap-1 border px-2.5 xl:px-3 py-1 rounded-full shadow-inner transition-colors ${
            isLight
              ? 'bg-slate-100/90 border-slate-200/90 backdrop-blur-md'
              : 'bg-[#0e1424] border-slate-800'
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-2.5 xl:px-3 py-1 xl:py-1.5 text-[11px] xl:text-xs font-mono font-bold rounded-full transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
                  isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
              className={`flex items-center justify-center w-8.5 h-8.5 rounded-full border transition-all ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-sm hover:scale-105'
                  : 'bg-[#0e1424] hover:bg-[#161f36] border-slate-750 text-amber-300 shadow-md shadow-black/50 hover:scale-105'
              }`}
              title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
            >
              {isLight ? (
                <Moon className="w-4 h-4 text-slate-800 transition-transform rotate-0 hover:-rotate-12" />
              ) : (
                <Sun className="w-4 h-4 text-amber-300 transition-transform rotate-0 hover:rotate-45" />
              )}
            </button>

            {/* GitHub Profile Button */}
            {profile.socialLinks.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile (@sameerasha)"
                aria-label="GitHub Profile"
                className={`flex items-center justify-center w-8.5 h-8.5 rounded-full border transition-all ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 hover:text-sky-600 shadow-sm hover:scale-105'
                    : 'bg-[#0e1424] hover:bg-[#161f36] border-slate-750 text-slate-200 hover:text-sky-400 shadow-md shadow-black/50 hover:scale-105'
                }`}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}

            {/* Quick Profile Config Helper Trigger */}
            <button
              onClick={onOpenConfigDrawer}
              type="button"
              title="Inspect or customize profile data"
              aria-label="Profile data configuration"
              className={`flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-full border transition-all ${
                isLight
                  ? 'text-slate-800 hover:text-slate-950 border-slate-300 hover:border-slate-400 bg-white shadow-sm'
                  : 'text-slate-300 hover:text-white border-slate-800 hover:border-slate-700 bg-[#0e1424] hover:bg-[#161f36] shadow-sm shadow-black/40'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-sky-500" />
              <span>Config</span>
            </button>

            {/* Resume Action */}
            {profile.resume.available && profile.resume.url ? (
              <a
                href={profile.resume.url}
                download={profile.resume.fileName}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            ) : (
              <button
                onClick={onOpenConfigDrawer}
                type="button"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border border-dashed transition-all ${
                  isLight
                    ? 'text-slate-700 border-slate-300 hover:border-sky-500 hover:text-slate-950 bg-white'
                    : 'text-slate-400 border-slate-700 hover:border-sky-500/50 hover:text-slate-300 bg-slate-900/30'
                }`}
                title="Resume file can be enabled in src/data/profile.ts"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Resume</span>
              </button>
            )}
          </div>

          {/* Mobile / Tablet Compact Action Deck */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle theme"
              className={`flex items-center justify-center w-8.5 h-8.5 rounded-xl border transition-all ${
                isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-[#0e1424] border-slate-800 text-amber-300'
              }`}
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Resume Quick Icon on Tablet/Mobile */}
            {profile.resume.available && profile.resume.url && (
              <a
                href={profile.resume.url}
                download={profile.resume.fileName}
                aria-label="Download Resume"
                className="hidden sm:flex items-center justify-center w-8.5 h-8.5 rounded-xl bg-sky-500 text-slate-950 shadow-sm"
                title="Download Resume"
              >
                <FileText className="w-4 h-4" />
              </a>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className={`flex items-center justify-center w-8.5 h-8.5 rounded-xl border transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                  : 'bg-[#0e1424] border-slate-800 text-slate-200 hover:text-white hover:bg-[#161f36]'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden max-w-7xl mx-auto rounded-2xl border p-4 sm:p-5 mt-2.5 shadow-2xl transition-all animate-in fade-in slide-in-from-top-2 duration-200 ${
          isLight ? 'bg-white/98 border-slate-200 backdrop-blur-xl' : 'bg-[#0d121f] border-slate-800 shadow-2xl shadow-black/90'
        }`}>
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-3.5 py-2.5 text-xs font-mono font-bold rounded-xl transition-colors ${
                  isLight
                    ? 'text-slate-700 hover:text-sky-600 hover:bg-slate-100'
                    : 'text-slate-300 hover:text-sky-400 hover:bg-[#141b2e]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className={`pt-3 border-t flex flex-col sm:flex-row gap-2 ${
            isLight ? 'border-slate-200' : 'border-slate-800/80'
          }`}>
            {profile.socialLinks.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                  isLight
                    ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                    : 'bg-[#141b2e] border-slate-800 text-slate-200 hover:bg-[#1c263f]'
                }`}
              >
                <GithubIcon className="w-4 h-4 text-sky-500" />
                <span>GitHub (@sameerasha)</span>
              </a>
            )}

            {profile.resume.available && profile.resume.url && (
              <a
                href={profile.resume.url}
                download={profile.resume.fileName}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-sky-500 text-slate-950"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
