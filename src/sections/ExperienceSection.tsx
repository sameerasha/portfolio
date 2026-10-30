import { Briefcase, AlertCircle, FileEdit, CheckCircle2 } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';
import { SectionHeading } from '../components/common/SectionHeading';
import { Badge } from '../components/common/Badge';
import { useTheme } from '../context/ThemeContext';

interface ExperienceSectionProps {
  profile: ProfileData;
  onOpenConfigDrawer: () => void;
}

export function ExperienceSection({ profile, onOpenConfigDrawer }: ExperienceSectionProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section id="experience" className="py-14 sm:py-16 border-t relative transition-colors border-slate-200/80 dark:border-slate-800/80 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <SectionHeading
            eyebrow="Career Timeline"
            title="Professional Experience"
            description="Verified employment history and technical milestones."
            className="mb-0"
          />

          <button
            onClick={onOpenConfigDrawer}
            type="button"
            className={`mt-4 md:mt-0 inline-flex items-center gap-1.5 self-start text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors font-semibold ${
              isLight
                ? 'text-slate-800 hover:text-slate-950 bg-white hover:bg-slate-100 border-slate-300 shadow-sm'
                : 'text-slate-400 hover:text-sky-300 bg-slate-900/60 hover:bg-slate-800 border-slate-800'
            }`}
          >
            <FileEdit className="w-3.5 h-3.5 text-sky-500" />
            <span>Update Roles in profile.ts</span>
          </button>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {profile.experience.map((item, index) => {
            const isPlaceholder = item.isPlaceholder;

            return (
              <div
                key={index}
                className={`animate-on-scroll relative rounded-3xl p-6 sm:p-8 lg:p-9 border transition-all duration-300 ${
                  isLight
                    ? 'backdrop-blur-md bg-white/95 border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_0_0_1px_rgba(15,23,42,0.03)] hover:border-sky-400 hover:shadow-[0_25px_60px_rgba(2,132,199,0.1)]'
                    : 'bg-[#0d121f] border-slate-800 shadow-2xl shadow-black/70 hover:border-slate-700'
                }`}
              >
                {/* Onboarding Notice for Placeholder */}
                {isPlaceholder && (
                  <div className={`mb-6 p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono ${
                    isLight
                      ? 'bg-sky-50/80 border-sky-200 text-sky-800'
                      : 'bg-sky-950/40 border-sky-800/40 text-sky-300'
                  }`}>
                    <div className="flex items-center gap-2">
                      <AlertCircle className={`w-4 h-4 shrink-0 ${isLight ? 'text-sky-600' : 'text-sky-400'}`} />
                      <span>
                        <strong>Awaiting Verification:</strong> Specific company names and employment dates are omitted in strict adherence to integrity rules.
                      </span>
                    </div>
                    <button
                      onClick={onOpenConfigDrawer}
                      type="button"
                      className={`px-3 py-1 rounded-md border text-[11px] whitespace-nowrap font-medium transition-colors ${
                        isLight
                          ? 'bg-sky-600 text-white hover:bg-sky-700 border-sky-600'
                          : 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border-sky-500/40'
                      }`}
                    >
                      Add Verified Employers
                    </button>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg border ${
                        isLight
                          ? 'bg-sky-50 border-sky-200 text-sky-600'
                          : 'bg-slate-800 border-slate-700/60 text-sky-400'
                      }`}>
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <h3 className={`text-xl font-black tracking-tight ${
                        isLight ? 'text-slate-950' : 'text-white'
                      }`}>
                        {item.role}
                      </h3>
                    </div>
                    <p className={`text-sm font-mono mt-1 pl-10 ${
                      isLight ? 'text-sky-700 font-bold' : 'text-sky-400'
                    }`}>
                      {item.company} {item.location && `• ${item.location}`}
                    </p>
                  </div>

                  <span className={`text-xs font-mono border px-3 py-1.5 rounded-full self-start sm:self-center font-bold ${
                    isLight
                      ? 'bg-slate-100 border-slate-300 text-slate-800'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400'
                  }`}>
                    {item.period}
                  </span>
                </div>

                {/* Highlights */}
                <div className="space-y-2.5 my-6 pl-2 sm:pl-10">
                  {item.highlights.map((point, pIdx) => (
                    <div key={pIdx} className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                      isLight ? 'text-slate-800 font-medium' : 'text-slate-300'
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                        isLight ? 'text-sky-600' : 'text-sky-400/80'
                      }`} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className={`pt-4 border-t flex flex-wrap gap-1.5 sm:pl-10 ${
                  isLight ? 'border-slate-100' : 'border-slate-800/60'
                }`}>
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="neutral">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
