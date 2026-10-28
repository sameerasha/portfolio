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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
        isScrolled ? 'pt-3 pb-2' : 'pt-5 pb-3'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-2xl sm:rounded-full transition-all duration-300 px-5 sm:px-7 py-3 ${
          isScrolled
            ? isLight
              ? 'bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-[0_15px_45px_rgba(15,23,42,0.08),0_0_0_1px_rgba(15,23,42,0.02)]'
              : 'bg-[#0a0e17]/90 backdrop-blur-2xl border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.03)]'
            : isLight
              ? 'bg-white/60 backdrop-blur-md border border-slate-200/60'
              : 'bg-slate-950/40 backdrop-blur-md border border-slate-800/50'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo / Identity */}
          <a
            href="#overview"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-all">
              <Terminal className="w-4 h-4 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-extrabold tracking-tight transition-colors ${
                isLight ? 'text-slate-950 group-hover:text-sky-700' : 'text-white group-hover:text-sky-300'
              }`}>
                {displayName}
              </span>
              <span className={`text-[10px] font-mono tracking-wider font-semibold ${
                isLight ? 'text-slate-700' : 'text-slate-400'
              }`}>
                Java 21 • AWS • React • Microservices Architect
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className={`hidden md:flex items-center gap-1 border px-3 py-1 rounded-full backdrop-blur-md shadow-inner transition-colors ${
            isLight
              ? 'bg-slate-100/90 border-slate-200/90'
              : 'bg-slate-900/70 border-slate-800/80'
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-full transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
                  isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Theme Toggle + Resume + Config Helper */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
              className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-sm hover:scale-105'
                  : 'bg-slate-900/80 hover:bg-slate-800 border-slate-750 text-amber-300 shadow-inner hover:scale-105'
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
                className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 hover:text-sky-600 shadow-sm hover:scale-105'
                    : 'bg-slate-900/80 hover:bg-slate-800 border-slate-750 text-slate-200 hover:text-sky-400 shadow-inner hover:scale-105'
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
                  : 'text-slate-300 hover:text-white border-slate-800 hover:border-slate-700 bg-slate-900/60'
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
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
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

          {/* Mobile Menu Button + Mobile Theme Toggle */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle theme"
              className={`p-2 rounded-lg border ${
                isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-amber-300'
              }`}
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button
              onClick={onOpenConfigDrawer}
              type="button"
              aria-label="Profile configuration"
              className={`p-2 rounded-lg border ${
                isLight ? 'bg-white border-slate-200 text-slate-600' : 'border-slate-800 text-slate-400'
              }`}
            >
              <Settings className="w-4 h-4 text-sky-500" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className={`p-2 rounded-lg border transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-b px-4 pt-3 pb-6 mt-3 space-y-2 backdrop-blur-xl ${
          isLight ? 'bg-white/95 border-slate-200' : 'bg-slate-950/95 border-slate-800'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 text-sm font-mono rounded-lg transition-colors ${
                isLight
                  ? 'text-slate-700 hover:text-sky-600 hover:bg-slate-100'
                  : 'text-slate-300 hover:text-sky-400 hover:bg-slate-900/80'
              }`}
            >
              {link.label}
            </a>
          ))}

          <div className={`pt-4 border-t flex flex-col gap-2 ${
            isLight ? 'border-slate-200' : 'border-slate-800/80'
          }`}>
            {profile.socialLinks.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
                  isLight
                    ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                    : 'bg-slate-900 border-slate-750 text-slate-200 hover:bg-slate-800'
                }`}
              >
                <GithubIcon className="w-4 h-4 text-sky-500" />
                <span>GitHub Profile (@sameerasha)</span>
              </a>
            )}

            {profile.resume.available && profile.resume.url ? (
              <a
                href={profile.resume.url}
                download={profile.resume.fileName}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-mono font-semibold bg-sky-500 text-slate-950"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenConfigDrawer();
                }}
                className={`w-full text-center py-2 text-xs font-mono border border-dashed rounded-lg ${
                  isLight ? 'text-slate-500 border-slate-300' : 'text-slate-400 border-slate-800'
                }`}
              >
                Resume: Attach in profile.ts
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
