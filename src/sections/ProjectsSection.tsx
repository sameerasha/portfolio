import { useState, lazy, Suspense } from 'react';
import { ArrowUpRight, Box, Cpu, Terminal, Users, Clock, ShieldCheck } from 'lucide-react';
import type { ProfileData, ProjectCaseStudy } from '../types/portfolio';
import { SectionHeading } from '../components/common/SectionHeading';
import { Badge } from '../components/common/Badge';
import { useTheme } from '../context/ThemeContext';

const ProjectDetailModal = lazy(() =>
  import('../components/modals/ProjectDetailModal').then((m) => ({ default: m.ProjectDetailModal }))
);

interface ProjectsSectionProps {
  profile: ProfileData;
}

export function ProjectsSection({ profile }: ProjectsSectionProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  return (
    <section id="projects" className="py-14 sm:py-16 border-t relative transition-colors border-slate-200/80 dark:border-slate-800/80 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <SectionHeading
            eyebrow="Architectural Blueprints & Production Systems"
            title="Featured Engineering Case Studies"
            description="Deep-dive demonstration platforms showcasing enterprise Java backend services, event-driven Kafka messaging, and automated cloud delivery pipelines."
            className="mb-0"
          />
          <div className="mt-4 md:mt-0 text-xs font-mono px-3.5 py-1.5 rounded-full border self-start md:self-auto border-sky-500/30 text-sky-700 dark:text-sky-400 bg-sky-500/10 font-bold">
            Production Case Studies ({profile.projects.length} Architectures)
          </div>
        </div>

        {/* Project Cards Container */}
        <div className="relative space-y-10 sm:space-y-12 pb-8" data-sticky-stack>
          {profile.projects.map((project, index) => {
            return (
              <article
                key={project.id}
                data-stack-card
                className={`group relative rounded-3xl border transition-all duration-300 p-5 sm:p-7 lg:p-8 shadow-2xl ${
                  isLight
                    ? 'bg-white border-slate-200 shadow-xl hover:border-sky-400'
                    : 'bg-[#0b0f19] border-slate-800 shadow-black/90 hover:border-sky-500/50'
                }`}
              >
                {/* Ambient Card Glow */}
                <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none ${
                  isLight ? 'bg-sky-200/15' : 'bg-sky-500/10'
                }`} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative z-10">
                  {/* Left Column: Case Study Narrative */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Index, Status & Meta Badges + Top Quick Inspect Action */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded-md border ${
                          isLight ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-750 text-sky-400'
                        }`}>
                          CASE STUDY 0{index + 1}
                        </span>
                        <Badge variant="status">{project.status}</Badge>
                        <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-md border ${
                          isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        }`}>
                          {project.category}
                        </span>
                      </div>

                      {/* Header Inspect Button: Visible on all screens & viewports */}
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shadow-sm ${
                          isLight
                            ? 'bg-sky-600 text-white hover:bg-sky-500 shadow-sky-600/20'
                            : 'bg-sky-500 text-slate-950 hover:bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                        }`}
                      >
                        <span>Inspect Architecture & Specs</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className={`text-2xl sm:text-3xl font-black tracking-tight mb-1.5 transition-colors ${
                        isLight ? 'text-slate-950 group-hover:text-sky-700' : 'text-white group-hover:text-sky-300'
                      }`}>
                        {project.title}
                      </h3>
                      <p className={`text-sm font-mono font-bold ${
                        isLight ? 'text-sky-700' : 'text-sky-400'
                      }`}>
                        {project.tagline}
                      </p>
                    </div>

                    {/* Problem & Solution Summary */}
                    <div>
                      <p className={`text-sm leading-relaxed ${
                        isLight ? 'text-slate-800 font-medium' : 'text-slate-200 font-normal'
                      }`}>
                        {project.overview}
                      </p>
                    </div>

                    {/* Key Architectural Features */}
                    <div className={`p-3.5 rounded-xl border space-y-1.5 text-xs font-mono ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 font-medium'
                        : 'bg-[#121829] border-slate-800 text-slate-100 shadow-md'
                    }`}>
                      <div className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                        isLight ? 'text-sky-700' : 'text-sky-400'
                      }`}>
                        <Cpu className="w-3.5 h-3.5" />
                        Key Architectural Highlights:
                      </div>
                      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-medium ${
                        isLight ? 'text-slate-900' : 'text-slate-100'
                      }`}>
                        {project.keyFeatures.slice(0, 4).map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1 shrink-0 shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
                            <span className="line-clamp-2 leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technology Stack Pills */}
                    <div className="space-y-1.5 pt-0.5">
                      <div className={`text-[11px] font-mono uppercase tracking-wider font-bold ${
                        isLight ? 'text-slate-900' : 'text-slate-200'
                      }`}>
                        Integrated Tech Stack:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.backend.map((tech) => (
                          <Badge key={tech} variant="confirmed">{tech}</Badge>
                        ))}
                        {project.techStack.frontend?.map((tech) => (
                          <Badge key={tech} variant="neutral">{tech}</Badge>
                        ))}
                        {project.techStack.database?.map((tech) => (
                          <Badge key={tech} variant="accent">{tech}</Badge>
                        ))}
                        {project.techStack.infrastructure?.map((tech) => (
                          <Badge key={tech} variant="neutral">{tech}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar (Mobile Responsive) */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all shadow-md ${
                          isLight
                            ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white hover:from-sky-500 hover:to-indigo-500 shadow-md shadow-sky-600/25'
                            : 'bg-sky-500 text-slate-950 hover:bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                        }`}
                      >
                        <span>Inspect Architecture & Specs</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>

                      <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Role: {project.role}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Interactive Blueprint Snapshot */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
                    {/* Metadata Card */}
                    <div className={`p-4 rounded-2xl border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#121829] border-slate-800'
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-3 text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-sky-500" />
                          Team: {project.teamSize} Engineers
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-indigo-500" />
                          {project.duration}
                        </span>
                      </div>

                      {/* Architecture topology summary */}
                      <div className="text-xs font-mono mb-1.5 text-sky-400 font-semibold uppercase tracking-wider">
                        Component Topology:
                      </div>
                      <div className="space-y-1.5">
                        {project.architectureComponents.slice(0, 4).map((comp, cIdx) => (
                          <div
                            key={cIdx}
                            className={`p-2 rounded-xl border flex items-center justify-between text-xs font-mono transition-colors ${
                              isLight
                                ? 'bg-white border-slate-200 text-slate-700'
                                : 'bg-[#090d18] border-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="font-semibold truncate max-w-[170px]">{comp.name}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded border shrink-0 ${
                              isLight ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-slate-900 border-slate-750 text-sky-400'
                            }`}>
                              {comp.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Terminal Code Snippet Preview */}
                    <div className={`p-3.5 rounded-2xl border font-mono text-[11px] space-y-1.5 ${
                      isLight ? 'bg-slate-900 text-slate-200 border-slate-700' : 'bg-[#060913] text-slate-300 border-slate-800'
                    }`}>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pb-2 border-b border-slate-800">
                        <span className="flex items-center gap-1.5">
                          <Terminal className="w-3 h-3 text-sky-400" />
                          endpoints.sh
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Box className="w-3 h-3" />
                          REST / OpenAPI
                        </span>
                      </div>
                      <pre className="overflow-x-auto text-[11px] leading-relaxed text-sky-300 py-1">
                        {(project.endpointsSnippet || '').split('\n').slice(0, 3).join('\n')}
                      </pre>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Executive Enterprise Architecture Verification Strip */}
        <div className={`mt-10 p-6 sm:p-7 rounded-3xl border relative overflow-hidden transition-all duration-300 max-w-4xl mx-auto shadow-2xl ${
          isLight
            ? 'bg-gradient-to-r from-sky-50/90 via-white to-indigo-50/80 border-sky-200/90 shadow-[0_15px_40px_rgba(2,132,199,0.08)]'
            : 'bg-gradient-to-r from-[#0d1322] via-[#090d16] to-[#0d1322] border-sky-500/30 shadow-[0_0_35px_rgba(56,189,248,0.12)]'
        }`}>
          {/* Subtle Ambient Radial Glow */}
          <div className={`absolute top-0 right-1/4 w-72 h-72 rounded-full blur-[80px] pointer-events-none ${
            isLight ? 'bg-sky-200/30' : 'bg-sky-500/10'
          }`} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Content Column */}
            <div className="space-y-3 text-center md:text-left">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono font-bold ${
                isLight ? 'bg-white border-slate-300' : 'bg-slate-900/90 border-slate-800'
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className={isLight ? 'text-emerald-800 font-bold' : 'text-emerald-300'}>
                  VERIFIED PRODUCTION ARCHITECTURES
                </span>
                <span className="text-slate-400">•</span>
                <span className={isLight ? 'text-sky-800 font-bold' : 'text-sky-400'}>
                  6+ YEARS INDUSTRY EXPERIENCE
                </span>
              </div>

              <div>
                <h4 className={`text-base sm:text-lg font-black tracking-tight ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}>
                  Enterprise Engineering Platforms & Mission-Critical Systems
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed mt-1.5 max-w-2xl ${
                  isLight ? 'text-slate-700 font-medium' : 'text-slate-300 font-normal'
                }`}>
                  These projects represent verified enterprise systems across <strong>Accenture</strong>, <strong>Infosys</strong>, and <strong>SOFFRONT Software</strong>.
                  Interactive architectural topologies, component role breakdowns, Mockito/JUnit test coverage strategies, and containerized Docker runbooks are fully accessible in each project inspector dialog.
                </p>
              </div>

              {/* 3 Pillar Micro-Badges */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-[11px] font-mono font-semibold">
                <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                  isLight ? 'bg-white border-slate-300 text-slate-800 shadow-sm' : 'bg-slate-900/90 border-slate-800 text-sky-300'
                }`}>
                  <Cpu className="w-3.5 h-3.5 text-sky-400" />
                  <span>Spring Boot & Kafka Microservices</span>
                </span>
                <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                  isLight ? 'bg-white border-slate-300 text-slate-800 shadow-sm' : 'bg-slate-900/90 border-slate-800 text-indigo-300'
                }`}>
                  <Box className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Oracle, Postgres & Redis Persistence</span>
                </span>
                <span className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                  isLight ? 'bg-white border-slate-300 text-slate-800 shadow-sm' : 'bg-slate-900/90 border-slate-800 text-emerald-300'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Automated CI/CD & K8s Pipeline</span>
                </span>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="shrink-0 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedProject(profile.projects[0])}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono font-bold transition-all shadow-md group ${
                  isLight
                    ? 'bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-600 text-white hover:shadow-lg shadow-sky-600/20 hover:scale-105'
                    : 'bg-sky-500 text-slate-950 hover:bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:scale-105'
                }`}
              >
                <span>Launch Architecture Inspector</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <span className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Deep-dive into CPC 2.0 Engine Specs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Detail Modal (Code-Split / Lazy-Loaded on demand) */}
      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectDetailModal
            project={selectedProject}
            isOpen={Boolean(selectedProject)}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}
    </section>
  );
}