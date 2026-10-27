export type SkillCategory =
  | 'backend'
  | 'frontend'
  | 'databases'
  | 'cloud'
  | 'testing'
  | 'devops'
  | 'quality';

export interface SkillItem {
  name: string;
  isConfirmed: boolean; // Confirmed by user vs suggested complementary technology
  category: SkillCategory;
  description: string;
  iconName?: string;
}

export interface ProjectArchitectureComponent {
  name: string;
  type: 'frontend' | 'service' | 'database' | 'gateway' | 'broker' | 'infra';
  tech: string;
  role: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  category: string;
  status: 'Production System' | 'Enterprise Platform' | 'Prototype / Demonstration' | 'Architectural Blueprint' | 'In Progress';
  role?: string;
  teamSize?: number | string;
  duration?: string;
  overview: string;
  problemStatement: string;
  proposedSolution: string;
  keyFeatures: string[];
  architectureOverview: string;
  architectureComponents: ProjectArchitectureComponent[];
  techStack: {
    backend: string[];
    frontend?: string[];
    database?: string[];
    infrastructure?: string[];
    testing?: string[];
    devops?: string[];
  };
  implementationHighlights: string[];
  testingStrategy: string[];
  setupInstructions: {
    prerequisites: string[];
    steps: string[];
    runCommand?: string;
  };
  endpointsSnippet?: string;
  dockerComposeSnippet?: string;
  repoUrl?: string;
  liveDemoUrl?: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  location?: string;
  period: string;
  highlights: string[];
  technologies: string[];
  isPlaceholder?: boolean;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  details?: string;
  isPlaceholder?: boolean;
}

export interface CertificationEntry {
  title: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  verificationUrl?: string;
  isPlaceholder?: boolean;
}

export interface ProfileData {
  name: string;
  fallbackTitle: string;
  targetRole: string;
  headline: string;
  supportingCopy: string;
  email: string;
  phone?: string;
  location?: string;
  totalExperience?: string;
  socialLinks: {
    github: string | null;
    linkedin: string | null;
    githubSignup: string;
    linkedinSignup: string;
  };
  resume: {
    available: boolean;
    url: string | null;
    fileName: string;
  };
  aboutDraft: {
    leadParagraph: string;
    bodyParagraph: string;
    focusAreas: {
      title: string;
      description: string;
      skills: string[];
    }[];
  };
  skills: SkillItem[];
  projects: ProjectCaseStudy[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
}
