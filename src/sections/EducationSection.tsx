import { GraduationCap, Award, FileEdit } from 'lucide-react';
import type { ProfileData } from '../types/portfolio';
import { SectionHeading } from '../components/common/SectionHeading';
import { useTheme } from '../context/ThemeContext';

interface EducationSectionProps {
  profile: ProfileData;
  onOpenConfigDrawer: () => void;
}

export function EducationSection({ profile, onOpenConfigDrawer }: EducationSectionProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <section id="education" className="py-14 sm:py-16 border-t relative transition-colors border-slate-200/80 dark:border-slate-800/80 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <SectionHeading
            eyebrow="Credentials & Academic Foundation"
            title="Education & Certifications"
            description="Verified academic qualifications and professional certifications."
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
            <span>Configure in profile.ts</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Block */}
          <div className={`animate-on-scroll rounded-3xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
            isLight
              ? 'backdrop-blur-md bg-white/95 border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_0_0_1px_rgba(15,23,42,0.03)] hover:border-sky-400 hover:shadow-lg'
              : 'bg-[#0d121f] border-slate-800 shadow-2xl shadow-black/70'
          }`}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl border ${
                  isLight
                    ? 'bg-sky-50 border-sky-200 text-sky-600'
                    : 'bg-sky-950/50 border-sky-800/40 text-sky-400'
                }`}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-extrabold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    Degree & Academic Training
                  </h3>
                  <span className={`text-xs font-mono font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Data-driven entry
                  </span>
                </div>
              </div>

              {profile.education.map((edu, idx) => (
                <div key={idx} className="space-y-1.5 text-xs font-mono py-2">
                  <div className={`font-bold text-sm ${isLight ? 'text-slate-950' : 'text-slate-100'}`}>
                    {edu.degree}
                  </div>
                  <div className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-400'}`}>
                    {edu.institution} • {edu.period}
                  </div>
                  {edu.details && (
                    <div className={`font-sans mt-2 ${isLight ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
                      {edu.details}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={`mt-4 pt-4 border-t text-[11px] font-mono ${
              isLight ? 'border-slate-200 text-slate-600 font-medium' : 'border-slate-800/60 text-slate-500'
            }`}>
              * Editable in profileData.education
            </div>
          </div>

          {/* Certifications Block */}
          <div className={`animate-on-scroll rounded-3xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
            isLight
              ? 'backdrop-blur-md bg-white/95 border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06),0_0_0_1px_rgba(15,23,42,0.03)] hover:border-indigo-400 hover:shadow-lg'
              : 'bg-[#0d121f] border-slate-800 shadow-2xl shadow-black/70'
          }`}>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl border ${
                  isLight
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                    : 'bg-indigo-950/50 border-indigo-800/40 text-indigo-400'
                }`}>
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-extrabold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    Professional Certifications
                  </h3>
                  <span className={`text-xs font-mono font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Optional verified credentials
                  </span>
                </div>
              </div>

              {profile.certifications.map((cert, idx) => (
                <div key={idx} className="space-y-1.5 text-xs font-mono py-2">
                  <div className={`font-bold text-sm ${isLight ? 'text-slate-950' : 'text-slate-100'}`}>
                    {cert.title}
                  </div>
                  <div className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-400'}`}>
                    {cert.issuer} • {cert.date}
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-4 pt-4 border-t text-[11px] font-mono ${
              isLight ? 'border-slate-200 text-slate-600 font-medium' : 'border-slate-800/60 text-slate-500'
            }`}>
              * Editable in profileData.certifications
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
