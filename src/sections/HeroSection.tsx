import { ArrowRight, Mail, Phone, FileText, Layers, Cpu, ShieldCheck, MapPin } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';
import { SceneCanvas } from '../components/3d/SceneCanvas';
import { HolographicCore3D } from '../components/3d/HolographicCore3D';
import { Badge } from '../components/common/Badge';
import { SplitHeadline } from '../components/common/SplitHeadline';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  profile: ProfileData;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const confirmedSkills = profile.skills.filter((s) => s.isConfirmed);

  return (
    <section
      id="overview"
      className="relative flex items-center pt-24 pb-10 sm:pb-12 overflow-hidden transition-colors bg-transparent"
    >
      {/* Cinematic Ambient Backdrop Lighting (Subtle, non-occluding) */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 ${
        isLight ? 'bg-sky-200/15' : 'bg-sky-600/10'
      }`} />
      <div className={`absolute top-1/3 right-10 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none transition-colors duration-700 ${
        isLight ? 'bg-indigo-200/15' : 'bg-indigo-600/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Unified Architectural Status Command Bar */}
            <div className="inline-flex flex-wrap items-center gap-2.5">
              <div className={`inline-flex items-center gap-2 border px-4 py-2 rounded-full backdrop-blur-md shadow-sm transition-all ${
                isLight
                  ? 'bg-white/95 border-slate-300 text-slate-900 shadow-slate-200/50'
                  : 'bg-slate-900/90 border-slate-800/90 text-slate-200 shadow-black/40'
              }`}>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                <span className="text-xs font-mono font-bold tracking-tight">
                  {profile.name}
                </span>
                <span className={`text-xs ${isLight ? 'text-slate-400' : 'text-slate-600'}`}>•</span>
                <span className={`text-xs font-mono font-semibold ${isLight ? 'text-sky-800' : 'text-sky-400'}`}>
                  Technology Analyst @ Infosys
                </span>
                {profile.totalExperience && (
                  <>
                    <span className={`text-xs ${isLight ? 'text-slate-400' : 'text-slate-600'}`}>•</span>
                    <span className={`text-xs font-mono font-semibold ${isLight ? 'text-indigo-800' : 'text-indigo-300'}`}>
                      {profile.totalExperience}
                    </span>
                  </>
                )}
                {profile.location && (
                  <>
                    <span className={`text-xs ${isLight ? 'text-slate-400' : 'text-slate-600'}`}>•</span>
                    <span className={`inline-flex items-center gap-1 text-xs font-mono font-semibold ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                      <MapPin className="w-3 h-3 text-sky-500" />
                      {profile.location}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Main Editorial Headline with Kinetic Split Reveal */}
            <SplitHeadline
              text="Engineering Scalable Systems."
              highlightText="Building Event-Driven Microservices."
              className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] transition-colors ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
              highlightClassName="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-500"
              delay={0.2}
            />

            {/* Supporting Copy */}
            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed transition-colors ${
              isLight ? 'text-slate-800 font-medium' : 'text-slate-300 font-normal'
            }`}>
              {profile.supportingCopy}
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projects"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {profile.resume.available && profile.resume.url && (
                <a
                  href={profile.resume.url}
                  download={profile.resume.fileName}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Resume (PDF)</span>
                </a>
              )}

              <a
                href="#contact"
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold border transition-all backdrop-blur-md ${
                  isLight
                    ? 'text-slate-900 hover:text-slate-950 bg-white hover:bg-slate-50 border-slate-300 shadow-sm'
                    : 'text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-850 border-slate-750'
                }`}
              >
                <Mail className="w-4 h-4 text-sky-500" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Verified Direct Contact Quick-Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-semibold">
              <a
                href={`mailto:${profile.email}`}
                className={`transition-colors flex items-center gap-1.5 ${
                  isLight ? 'text-slate-800 hover:text-sky-700' : 'text-slate-400 hover:text-sky-300'
                }`}
                title="Direct email link"
              >
                <Mail className="w-3.5 h-3.5 text-sky-500" />
                <span>{profile.email}</span>
              </a>

              {profile.phone && (
                <a
                  href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
                  className={`transition-colors flex items-center gap-1.5 ${
                    isLight ? 'text-slate-800 hover:text-sky-700' : 'text-slate-400 hover:text-sky-300'
                  }`}
                  title="Direct phone link"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{profile.phone}</span>
                </a>
              )}
            </div>

            {/* Confirmed Skills Ticker */}
            <div className={`pt-4 border-t transition-colors ${
              isLight ? 'border-slate-300' : 'border-slate-800/80'
            }`}>
              <div className="flex items-center gap-2 mb-2.5">
                <ShieldCheck className="w-4 h-4 text-sky-500" />
                <span className={`text-xs font-mono uppercase tracking-wider font-bold ${
                  isLight ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  Core Competencies & Stack:
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {confirmedSkills.slice(0, 10).map((skill) => (
                  <Badge key={skill.name} variant="confirmed" showIcon>
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Frameless Holographic Quantum Engine with Seamless Radial Blending */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Multi-layered Atmospheric Optical Bloom */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              {/* Primary Chromatic Core Glow */}
              <div
                className={`w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] rounded-full blur-[100px] transition-all duration-700 ${
                  isLight ? 'bg-sky-300/35' : 'bg-sky-500/18'
                }`}
              />
              {/* Secondary Harmonic Indigo Bloom */}
              <div
                className={`absolute w-[260px] sm:w-[340px] h-[260px] sm:h-[340px] rounded-full blur-[70px] transition-all duration-700 ${
                  isLight ? 'bg-indigo-300/25' : 'bg-indigo-600/18'
                }`}
              />
              {/* Subtle Concentric Orbital Telemetry Ring */}
              <div
                className={`w-[310px] sm:w-[410px] h-[310px] sm:h-[410px] rounded-full border border-dashed transition-all duration-700 pointer-events-none animate-[spin_120s_linear_infinite] ${
                  isLight ? 'border-sky-500/15' : 'border-sky-400/15'
                }`}
              />
            </div>

            {/* Top Telemetry Chip */}
            <div className={`z-20 mb-2 inline-flex items-center gap-2 border px-3.5 py-1 rounded-full text-[11px] font-mono backdrop-blur-xl transition-all shadow-lg ${
              isLight
                ? 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/50'
                : 'bg-slate-950/85 border-slate-800 text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
              <span>CPC 2.0 // EVENT-DRIVEN ENGINE CORE</span>
            </div>

            {/* 3D Scene Container (Seamless Feathered Radial Mask, 100% Unclipped Gyro Orbit) */}
            <div
              className="relative w-full max-w-[480px] lg:max-w-[500px] h-[360px] sm:h-[480px] lg:h-[500px] flex items-center justify-center"
              style={{
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.85) 84%, rgba(0,0,0,0) 100%)',
                maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 68%, rgba(0,0,0,0.85) 84%, rgba(0,0,0,0) 100%)',
              }}
            >
              <SceneCanvas cameraPosition={[0, 0, 6.6]} fov={40} className="w-full h-full">
                <HolographicCore3D />
              </SceneCanvas>

              {/* Floating Spatial Badge Left */}
              <div className={`absolute top-[20%] -left-1 sm:-left-3 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono backdrop-blur-xl shadow-xl transition-all ${
                isLight
                  ? 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/60'
                  : 'bg-slate-950/90 border-slate-800 text-slate-200 shadow-black/80'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Cpu className="w-3.5 h-3.5 text-sky-500" />
                <span>Spring Boot 3 + Java 11</span>
              </div>

              {/* Floating Spatial Badge Right */}
              <div className={`absolute bottom-[20%] -right-1 sm:-right-3 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono backdrop-blur-xl shadow-xl transition-all ${
                isLight
                  ? 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/60'
                  : 'bg-slate-950/90 border-slate-800 text-slate-200 shadow-black/80'
              }`}>
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>Apache Kafka Broker</span>
              </div>
            </div>

            {/* Bottom Observatory Anchor Link */}
            <a
              href="#observatory"
              className={`mt-2 inline-flex items-center gap-2 text-xs font-mono py-1.5 px-4 rounded-full border transition-all ${
                isLight
                  ? 'bg-white/90 border-slate-200 text-sky-700 hover:border-sky-400 shadow-sm'
                  : 'bg-slate-900/80 border-slate-800 text-sky-400 hover:border-sky-500/60 hover:text-sky-300'
              }`}
            >
              <span>Explore Live 3D Microservice Topology</span>
              <span className="animate-bounce">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
