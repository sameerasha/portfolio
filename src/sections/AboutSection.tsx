import { Server, Layout, Database, Cloud, Code, FileEdit } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';
import { SectionHeading } from '../components/common/SectionHeading';
import { Badge } from '../components/common/Badge';
import { useTheme } from '../context/ThemeContext';

interface AboutSectionProps {
  profile: ProfileData;
  onOpenConfigDrawer: () => void;
}

export function AboutSection({ profile, onOpenConfigDrawer }: AboutSectionProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const iconMap: Record<string, React.ReactNode> = {
    'Backend Systems & Microservices': <Server className={`w-5 h-5 ${isLight ? 'text-sky-600' : 'text-sky-400'}`} />,
    'Modern Frontend Engineering': <Layout className={`w-5 h-5 ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`} />,
    'Persistence & Data Modeling': <Database className={`w-5 h-5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />,
    'Cloud, Containers & DevOps': <Cloud className={`w-5 h-5 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />,
  };

  return (
    <section id="about" className="py-14 sm:py-16 border-t relative transition-colors border-slate-200/80 dark:border-slate-800/80 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <SectionHeading
            eyebrow="Architectural Mindset"
            title="Engineering Philosophy & Focus"
            description="Bridging deep server-side Java robustness with responsive, type-safe React client experiences."
            className="mb-0"
          />

          <button
            onClick={onOpenConfigDrawer}
            type="button"
            className={`mt-4 md:mt-0 inline-flex items-center gap-1.5 self-start text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors ${
              isLight
                ? 'text-slate-800 hover:text-slate-950 bg-white hover:bg-slate-100 border-slate-300 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-sky-300 bg-slate-900/60 hover:bg-slate-800 border-slate-800'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5 text-sky-500" />
            <span>Edit Profile Data in profile.ts</span>
          </button>
        </div>

        {/* Narrative Box */}
        <div className={`animate-on-scroll rounded-3xl border p-8 sm:p-10 mb-12 backdrop-blur-md relative overflow-hidden transition-all duration-300 ${
          isLight
            ? 'bg-white/95 border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_0_0_1px_rgba(15,23,42,0.03)]'
            : 'bg-slate-900/40 border-slate-800/80 shadow-xl'
        }`}>
          <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
            isLight ? 'bg-sky-200/20' : 'bg-sky-500/5'
          }`} />

          <div className="space-y-4 max-w-4xl leading-relaxed text-base sm:text-lg">
            <p className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
              {profile.aboutDraft.leadParagraph}
            </p>
            <p className={`text-sm sm:text-base ${isLight ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
              {profile.aboutDraft.bodyParagraph}
            </p>
          </div>

          <div className={`mt-6 pt-6 border-t flex flex-wrap items-center gap-2 text-xs font-mono ${
            isLight ? 'border-slate-300 text-slate-700 font-semibold' : 'border-slate-800/60 text-slate-400'
          }`}>
            <Code className="w-4 h-4 text-sky-500" />
            <span className={isLight ? 'text-slate-900 font-bold' : ''}>Core Pillars:</span>
            <span className={isLight ? 'text-slate-950 font-bold' : 'text-slate-300'}>Clean Architecture</span>
            <span className={isLight ? 'text-slate-400' : 'text-slate-600'}>•</span>
            <span className={isLight ? 'text-slate-950 font-bold' : 'text-slate-300'}>Type Safety</span>
            <span className={isLight ? 'text-slate-400' : 'text-slate-600'}>•</span>
            <span className={isLight ? 'text-slate-950 font-bold' : 'text-slate-300'}>Automated Testing</span>
            <span className={isLight ? 'text-slate-400' : 'text-slate-600'}>•</span>
            <span className={isLight ? 'text-slate-950 font-bold' : 'text-slate-300'}>Containerized Workflows</span>
          </div>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.aboutDraft.focusAreas.map((area) => (
            <div
              key={area.title}
              className={`animate-on-scroll rounded-2xl border p-7 transition-all duration-300 group backdrop-blur-md ${
                isLight
                  ? 'bg-white/95 border-slate-200/90 hover:border-sky-500 hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.12)]'
                  : 'bg-slate-950/60 border-slate-850 hover:border-slate-700/80 shadow-md'
              }`}
            >
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className={`p-2.5 rounded-xl border transition-colors ${
                  isLight
                    ? 'bg-sky-50 border-sky-200/80 text-sky-700 group-hover:bg-sky-100'
                    : 'bg-slate-900 border-slate-800 group-hover:border-sky-500/40'
                }`}>
                  {iconMap[area.title] || <Server className="w-5 h-5 text-sky-500" />}
                </div>
                <h3 className={`text-lg font-bold transition-colors ${
                  isLight ? 'text-slate-950 group-hover:text-sky-700' : 'text-white group-hover:text-sky-300'
                }`}>
                  {area.title}
                </h3>
              </div>

              <p className={`text-sm leading-relaxed mb-4 ${
                isLight ? 'text-slate-800 font-medium' : 'text-slate-400'
              }`}>
                {area.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {area.skills.map((skill) => (
                  <Badge key={skill} variant="neutral">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
