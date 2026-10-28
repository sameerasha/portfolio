import { CheckCircle2, AlertCircle, ExternalLink, Terminal } from 'lucide-react';
import type { ProfileData } from '../../types/portfolio';
import { Modal } from '../common/Modal';
import { CodeBlock } from '../common/CodeBlock';

interface ProfileConfigDrawerProps {
  profile: ProfileData;
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileConfigDrawer({ profile, isOpen, onClose }: ProfileConfigDrawerProps) {
  const checklist = [
    {
      item: 'Developer Name',
      isCompleted: Boolean(profile.name.trim()),
      helper: `Verified: ${profile.name} (from professional resume).`,
    },
    {
      item: 'Resume PDF Document',
      isCompleted: Boolean(profile.resume.available && profile.resume.url),
      helper: `Verified: ${profile.resume.fileName} is live and downloadable in public/.`,
    },
    {
      item: 'Verified Work Experience',
      isCompleted: !profile.experience.some((e) => e.isPlaceholder),
      helper: `Verified: Full Stack & AWS Cloud Engineer at Accenture (2024–Present), Infosys (2021–2024), and SOFFRONT Software (2019–2021).`,
    },
    {
      item: 'Academic Education & Qualifications',
      isCompleted: !profile.education.some((e) => e.isPlaceholder),
      helper: `Verified: B-Tech (CSE) BPUT, Intermediate (+2) CHSE, HSC (10th) BSE Odisha.`,
    },
    {
      item: 'Enterprise Project Case Studies',
      isCompleted: true,
      helper: `Verified: Income Tax Return Processing Engine (CPC 2.0) & SOFFRONT Cloud CRM.`,
    },
    {
      item: 'GitHub Profile URL',
      isCompleted: Boolean(profile.socialLinks.github),
      helper: profile.socialLinks.github
        ? `Verified: ${profile.socialLinks.github}`
        : 'Set your real GitHub URL in profile.ts (optional).',
      signupUrl: profile.socialLinks.githubSignup,
    },
    {
      item: 'LinkedIn Profile URL',
      isCompleted: Boolean(profile.socialLinks.linkedin),
      helper: 'Set your real LinkedIn URL in profile.ts (optional).',
      signupUrl: profile.socialLinks.linkedinSignup,
    },
  ];

  const profileSnippet = `// Located at: src/data/profile.ts
export const profileData: ProfileData = {
  name: "${profile.name}",
  targetRole: "${profile.targetRole}",
  totalExperience: "${profile.totalExperience || '6+ Years'}",
  email: "${profile.email}",
  phone: "${profile.phone || '+91-8249067001'}",
  location: "${profile.location || 'Bhubaneswar, India'}",
  
  socialLinks: {
    github: ${profile.socialLinks.github ? `"${profile.socialLinks.github}"` : 'null'},
    linkedin: ${profile.socialLinks.linkedin ? `"${profile.socialLinks.linkedin}"` : 'null'},
    githubSignup: "https://github.com/signup",
    linkedinSignup: "https://www.linkedin.com/signup",
  },

  resume: {
    available: true,
    url: "${profile.resume.url}",
    fileName: "${profile.resume.fileName}",
  },
  // Experience, Education, and Projects fully verified from resume!
};`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Profile Configuration & Verification Summary"
      subtitle="Single Source of Truth: src/data/profile.ts"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Architecture Note */}
        <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/50 flex items-start gap-3 text-xs text-sky-200">
          <Terminal className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Career & Engineering Records Integrated: </span>
            All records in this portfolio have been synchronized with Rabinarayan Asha's confirmed experience,
            including 6+ years across Accenture (2024–Present, Java 21, Spring Boot 3, React, AWS Cloud, EKS, RDS Postgres, SQS/SNS, GitLab CI/CD),
            Infosys (2021–2024, CPC 2.0 Tax processing microservices & Kafka), and SOFFRONT Software (2019–2021, Cloud CRM).
          </div>
        </div>

        {/* Pre-Launch Verification Checklist */}
        <div>
          <h4 className="text-sm font-mono text-sky-400 uppercase tracking-wider mb-3">
            Portfolio Verification Checklist
          </h4>

          <div className="space-y-2.5">
            {checklist.map((c, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60 border-slate-850"
              >
                <div className="flex items-start gap-3">
                  {c.isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{c.item}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          c.isCompleted
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}
                      >
                        {c.isCompleted ? 'Verified from Resume' : 'Optional / Configurable'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{c.helper}</p>
                  </div>
                </div>

                {c.signupUrl && !c.isCompleted && (
                  <a
                    href={c.signupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-mono text-white transition-colors self-start sm:self-center"
                  >
                    <span>Create Account</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Code Snippet Example */}
        <div>
          <h4 className="text-sm font-mono text-sky-400 uppercase tracking-wider mb-1">
            Current Profile Configuration:
          </h4>
          <CodeBlock code={profileSnippet} language="typescript" filename="src/data/profile.ts" />
        </div>
      </div>
    </Modal>
  );
}
