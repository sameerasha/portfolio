import { useState } from 'react';
import {
  CheckCircle2,
  HelpCircle,
  Server,
  Layout,
  Database,
  Cloud,
  TestTube,
  GitBranch,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react';
import type { ProfileData, SkillCategory } from '../types/portfolio';
import { SectionHeading } from '../components/common/SectionHeading';
import { Badge } from '../components/common/Badge';
import { useTheme } from '../context/ThemeContext';

interface SkillsSectionProps {
  profile: ProfileData;
}

const CATEGORY_META: Record<
  SkillCategory,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  backend: { label: 'Backend Architecture', icon: Server },
  frontend: { label: 'Frontend & UI', icon: Layout },
  databases: { label: 'Databases & Persistence', icon: Database },
  cloud: { label: 'Cloud & Containers', icon: Cloud },
  testing: { label: 'Testing & Verification', icon: TestTube },
  devops: { label: 'DevOps & Automation', icon: GitBranch },
  quality: { label: 'Quality & Operations', icon: ShieldAlert },
};

export function SkillsSection({ profile }: SkillsSectionProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');
  const [onlyConfirmed, setOnlyConfirmed] = useState(false);

  const categories = Object.keys(CATEGORY_META) as SkillCategory[];

  const filteredSkills = profile.skills.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesConfirmed = !onlyConfirmed || skill.isConfirmed;
    return matchesCategory && matchesConfirmed;
  });

  return (
    <section id="skills" className="py-14 sm:py-16 border-t relative transition-colors border-slate-200/80 dark:border-slate-800/80 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technical Stack"
          title="Skills & Technology Taxonomy"
          description="Curated engineering capabilities. User-confirmed proficiencies are verified and distinguished from suggested complementary technologies."
        />

        {/* Legend / Integrity Banner */}
        <div className={`animate-on-scroll mb-5 p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 text-xs font-mono backdrop-blur-md transition-colors ${
          isLight
            ? 'bg-white/95 border-slate-200/90 text-slate-800 shadow-[0_10px_30px_rgba(15,23,42,0.04)] font-medium'
            : 'bg-slate-900/60 border-slate-800/80 text-slate-300'
        }`}>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-bold ${
                isLight
                  ? 'bg-sky-50 text-sky-800 border-sky-400'
                  : 'bg-sky-500/10 text-sky-400 border-sky-500/30 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                Confirmed Core Skill
              </span>
              <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-400'}>Explicitly verified by developer</span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-bold ${
                isLight
                  ? 'bg-slate-100 text-slate-800 border-slate-300'
                  : 'bg-slate-800/50 text-slate-400 border-slate-700/60'
              }`}>
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                Complementary Tech
              </span>
              <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-400'}>Taxonomy aligned / Editable</span>
            </div>
          </div>

          {/* Quick Filter Toggle */}
          <button
            type="button"
            onClick={() => setOnlyConfirmed(!onlyConfirmed)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-bold transition-all ${
              onlyConfirmed
                ? isLight
                  ? 'bg-sky-100 text-sky-950 border-sky-400 shadow-sm'
                  : 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                : isLight
                  ? 'bg-slate-50 text-slate-800 border-slate-300 hover:text-slate-950'
                  : 'bg-slate-800/40 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Show Only Confirmed ({profile.skills.filter((s) => s.isConfirmed).length})</span>
          </button>
        </div>

        {/* Category Filter Pills (Mobile Responsive Scroll) */}
        <div className="animate-on-scroll flex overflow-x-auto sm:flex-wrap gap-2 mb-8 pb-2 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? isLight
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'bg-sky-500 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : isLight
                  ? 'bg-white/95 text-slate-800 border border-slate-300 hover:border-slate-400 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Categories ({profile.skills.length})
          </button>

          {categories.map((catKey) => {
            const meta = CATEGORY_META[catKey];
            const count = profile.skills.filter((s) => s.category === catKey).length;
            const Icon = meta.icon;
            const isSelected = selectedCategory === catKey;

            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setSelectedCategory(catKey)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold shrink-0 transition-all ${
                  isSelected
                    ? isLight
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                      : 'bg-sky-500 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                    : isLight
                      ? 'bg-white/95 text-slate-800 border border-slate-300 hover:border-slate-400 shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{meta.label}</span>
                <span className={`text-[10px] ${
                  isSelected ? (isLight ? 'text-sky-100' : 'text-slate-950') : isLight ? 'text-slate-600' : 'text-slate-500'
                }`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => {
            const catMeta = CATEGORY_META[skill.category];
            const Icon = catMeta?.icon || Server;

            return (
              <div
                key={skill.name}
                className={`animate-on-scroll group p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between backdrop-blur-md ${
                  isLight
                    ? skill.isConfirmed
                      ? 'bg-white/95 border-sky-300/80 shadow-[0_4px_20px_rgba(2,132,199,0.06)] hover:border-sky-500 hover:shadow-[0_15px_30px_rgba(2,132,199,0.12)] hover:-translate-y-1'
                      : 'bg-white/90 border-slate-200/90 shadow-[0_4px_16px_rgba(15,23,42,0.03)] hover:border-slate-300 hover:shadow-md hover:-translate-y-1'
                    : skill.isConfirmed
                      ? 'bg-slate-900/70 border-sky-500/30 hover:border-sky-400/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.12)] hover:-translate-y-1'
                      : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-base font-extrabold transition-colors ${
                      isLight
                        ? 'text-slate-950 group-hover:text-sky-700'
                        : 'text-white group-hover:text-sky-300'
                    }`}>
                      {skill.name}
                    </span>
                    <Badge
                      variant={skill.isConfirmed ? 'confirmed' : 'suggested'}
                      showIcon
                    >
                      {skill.isConfirmed ? 'Confirmed' : 'Complementary'}
                    </Badge>
                  </div>

                  <p className={`text-xs leading-relaxed mb-4 ${
                    isLight ? 'text-slate-800 font-medium' : 'text-slate-400'
                  }`}>
                    {skill.description}
                  </p>
                </div>

                <div className={`flex items-center gap-1.5 pt-3 border-t text-[11px] font-mono ${
                  isLight ? 'border-slate-200 text-slate-700 font-semibold' : 'border-slate-800/60 text-slate-500'
                }`}>
                  <Icon className="w-3 h-3 text-sky-500" />
                  <span>{catMeta?.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
