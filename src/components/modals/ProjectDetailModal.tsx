import { useState } from 'react';
import {
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Terminal,
  Clock,
  Users,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import type { ProjectCaseStudy } from '../../types/portfolio';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { CodeBlock } from '../common/CodeBlock';
import { useTheme } from '../../context/ThemeContext';

interface ProjectDetailModalProps {
  project: ProjectCaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'implementation' | 'setup'>(
    'overview'
  );

  if (!project) return null;

  const totalTechCount =
    (project.techStack.backend?.length || 0) +
    (project.techStack.frontend?.length || 0) +
    (project.techStack.database?.length || 0) +
    (project.techStack.infrastructure?.length || 0) +
    (project.techStack.devops?.length || 0) +
    (project.techStack.testing?.length || 0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      subtitle={`${project.category} • ${project.status}`}
      maxWidth="max-w-5xl"
    >
      {/* Top Architectural Telemetry Strip */}
      <div className={`p-4 rounded-2xl border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono backdrop-blur-md ${
        isLight
          ? 'bg-slate-50/90 border-slate-200 text-slate-800 shadow-sm'
          : 'bg-[#0d1322]/90 border-slate-800 text-slate-200 shadow-inner'
      }`}>
        <div className="flex flex-wrap items-center gap-3">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold border ${
            isLight
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>VERIFIED PRODUCTION ARCHITECTURE</span>
          </div>

          <span className="text-slate-400 hidden sm:inline">•</span>

          <span className={`font-semibold ${isLight ? 'text-sky-800' : 'text-sky-400'}`}>
            Role: {project.role}
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-400 text-[11px]">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-sky-500" />
            <span>Team: {project.teamSize}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>{project.duration}</span>
          </span>
        </div>
      </div>

      {/* Modern High-End Pill Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1.5 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Overview & Strategy', icon: Layers },
          { id: 'architecture', label: 'Architecture & Nodes', icon: Cpu },
          { id: 'implementation', label: 'Implementation & QA', icon: ShieldCheck },
          { id: 'setup', label: 'Runbook & Docker', icon: Terminal },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-xl whitespace-nowrap transition-all ${
                isActive
                  ? isLight
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25'
                    : 'bg-sky-500 text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.35)]'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview & Strategy */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Executive Summary */}
          <div className={`p-5 rounded-2xl border ${
            isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-950/60 border-slate-850'
          }`}>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-2 flex items-center gap-1.5 ${
              isLight ? 'text-sky-700' : 'text-sky-400'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              Executive Architecture Summary
            </h4>
            <p className={`text-sm leading-relaxed ${
              isLight ? 'text-slate-800 font-medium' : 'text-slate-200'
            }`}>
              {project.overview}
            </p>
          </div>

          {/* Problem vs. Solution Dual Contrast Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl border transition-colors ${
              isLight
                ? 'bg-rose-50/50 border-rose-200 text-slate-800'
                : 'bg-rose-950/20 border-rose-900/50 text-slate-200'
            }`}>
              <div className="flex items-center gap-2 text-rose-500 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                Architectural Challenge
              </div>
              <p className="text-xs leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className={`p-4 rounded-2xl border transition-colors ${
              isLight
                ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                : 'bg-emerald-950/20 border-emerald-900/50 text-slate-200'
            }`}>
              <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Engineered Solution
              </div>
              <p className="text-xs leading-relaxed">
                {project.proposedSolution}
              </p>
            </div>
          </div>

          {/* Key Engineering Features Grid */}
          <div>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-3 flex items-center gap-1.5 ${
              isLight ? 'text-sky-700' : 'text-sky-400'
            }`}>
              <Cpu className="w-3.5 h-3.5" />
              Key Architectural Features ({project.keyFeatures.length} Highlights)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.keyFeatures.map((feat, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs leading-relaxed transition-colors ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-slate-900/80 border-slate-800 text-slate-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-sky-400 mt-1 shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Technology Ecosystem */}
          <div className={`p-5 rounded-2xl border space-y-3 ${
            isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-slate-950/60 border-slate-850'
          }`}>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 ${
              isLight ? 'text-sky-700' : 'text-sky-400'
            }`}>
              <Layers className="w-3.5 h-3.5" />
              Integrated Tech Stack Ecosystem ({totalTechCount} Technologies)
            </h4>

            <div className="space-y-2.5">
              {project.techStack.backend && project.techStack.backend.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">Backend</span>
                  {project.techStack.backend.map((t) => <Badge key={t} variant="confirmed">{t}</Badge>)}
                </div>
              )}
              {project.techStack.frontend && project.techStack.frontend.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Frontend</span>
                  {project.techStack.frontend.map((t) => <Badge key={t} variant="neutral">{t}</Badge>)}
                </div>
              )}
              {project.techStack.database && project.techStack.database.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Databases</span>
                  {project.techStack.database.map((t) => <Badge key={t} variant="accent">{t}</Badge>)}
                </div>
              )}
              {project.techStack.infrastructure && project.techStack.infrastructure.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Cloud & Infra</span>
                  {project.techStack.infrastructure.map((t) => <Badge key={t} variant="neutral">{t}</Badge>)}
                </div>
              )}
              {project.techStack.devops && project.techStack.devops.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">DevOps & Tools</span>
                  {project.techStack.devops.map((t) => <Badge key={t} variant="status">{t}</Badge>)}
                </div>
              )}
              {project.techStack.testing && project.techStack.testing.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">Testing & QA</span>
                  {project.techStack.testing.map((t) => <Badge key={t} variant="suggested">{t}</Badge>)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Architecture & Nodes */}
      {activeTab === 'architecture' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-2 ${
              isLight ? 'text-sky-700' : 'text-sky-400'
            }`}>
              System Topology Overview
            </h4>
            <p className={`text-sm leading-relaxed p-4 rounded-xl border ${
              isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950/70 border-slate-850 text-slate-200'
            }`}>
              {project.architectureOverview}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold ${
              isLight ? 'text-slate-800' : 'text-slate-400'
            }`}>
              Microservice & Component Breakdown ({project.architectureComponents.length} Nodes):
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {project.architectureComponents.map((comp) => (
                <div
                  key={comp.name}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                    isLight
                      ? 'bg-white border-slate-200 shadow-sm hover:border-sky-400'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`font-bold text-sm ${isLight ? 'text-slate-950' : 'text-white'}`}>
                        {comp.name}
                      </span>
                      <Badge variant="accent">{comp.tech}</Badge>
                    </div>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {comp.role}
                    </p>
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded border self-start sm:self-center shrink-0 ${
                    isLight
                      ? 'bg-sky-50 text-sky-800 border-sky-300 font-bold'
                      : 'bg-sky-950/60 text-sky-400 border-sky-800/50'
                  }`}>
                    {comp.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {project.endpointsSnippet && (
            <div>
              <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-2 ${
                isLight ? 'text-slate-800' : 'text-slate-400'
              }`}>
                REST API Endpoint Specifications:
              </h4>
              <CodeBlock code={project.endpointsSnippet} language="http" filename="api-endpoints.spec" />
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Implementation & QA */}
      {activeTab === 'implementation' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-3 ${
              isLight ? 'text-sky-700' : 'text-sky-400'
            }`}>
              Engineering Milestones & Implementation Highlights
            </h4>
            <div className="space-y-2.5">
              {project.implementationHighlights.map((hl, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border leading-relaxed text-xs flex items-start gap-3 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0 shadow-[0_0_6px_rgba(99,102,241,0.8)]" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-3 ${
              isLight ? 'text-sky-700' : 'text-sky-400'
            }`}>
              Quality Engineering & Testing Strategy
            </h4>
            <div className="space-y-2.5">
              {project.testingStrategy.map((ts, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border leading-relaxed text-xs flex items-start gap-3 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{ts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Runbook & Docker */}
      {activeTab === 'setup' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-2 ${
              isLight ? 'text-sky-700' : 'text-sky-400'
            }`}>
              System Prerequisites
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.setupInstructions.prerequisites.map((prereq) => (
                <Badge key={prereq} variant="neutral">
                  {prereq}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-2 ${
              isLight ? 'text-sky-700' : 'text-sky-400'
            }`}>
              Step-by-Step Local Deployment Runbook
            </h4>
            <ol className="space-y-2 text-xs font-mono">
              {project.setupInstructions.steps.map((step, i) => (
                <li
                  key={i}
                  className={`p-3 rounded-xl border flex items-start gap-3 ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="text-sky-400 font-bold shrink-0">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {project.setupInstructions.runCommand && (
            <div>
              <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-2 ${
                isLight ? 'text-slate-800' : 'text-slate-400'
              }`}>
                One-Click Local Launch Command:
              </h4>
              <CodeBlock code={project.setupInstructions.runCommand} language="bash" />
            </div>
          )}

          {project.dockerComposeSnippet && (
            <div>
              <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-2 ${
                isLight ? 'text-slate-800' : 'text-slate-400'
              }`}>
                Docker Compose Topology:
              </h4>
              <CodeBlock code={project.dockerComposeSnippet} language="yaml" filename="docker-compose.yml" />
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
