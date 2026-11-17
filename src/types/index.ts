export interface Profile {
  name: string;
  titles: string[];
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  whatsapp: string;
  stats: {
    experienceYears: number;
    projectsCount: number;
    companiesCount: number;
    pagesMigrated: number;
  };
}

export interface SkillItem {
  id: string;
  category: 'ai' | 'backend' | 'devops' | 'frontend';
  title: string;
  iconName: string;
  chips: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location?: string;
  description?: string;
  highlights: string[];
  associatedProjects: {
    id: string;
    name: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade?: string;
  specialization?: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  tech: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  step: number;
  desc: string;
  isOptional?: boolean;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  step?: number;
  curve?: string;
  dashed?: boolean;
}

export interface Swimlane {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

export interface DiagramGroup {
  id: string;
  label: string;
  type?: 'n8n' | 'python' | 'agent' | 'cloud';
  rect: { x: number; y: number; width: number; height: number };
}

export interface DiagramView {
  id: string;
  name: string;
  shortName: string;
  title: string;
  subtitle: string;
  viewBox: string;
  mobileViewBox?: string;
  noteBadge?: string;
  swimlanes?: Swimlane[];
  groups?: DiagramGroup[];
  boundaryLabel?: string;
  nodes: DiagramNode[];
  edges?: DiagramEdge[];
}

export interface ProjectDiagram {
  title: string;
  subtitle: string;
  corePrinciples?: { title: string; desc: string }[];
  roles?: { name: string; class: string; desc: string }[];
  views?: DiagramView[];
  nodes?: DiagramNode[];
  edges?: DiagramEdge[];
  viewBox?: string;
  swimlanes?: Swimlane[];
  groups?: DiagramGroup[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  company: string;
  badge?: string;
  category: 'llm' | 'fullstack' | 'automation' | 'ai';
  metrics?: { label: string; value: string }[];
  summary: string;
  stack: string[];
  bullets: string[];
  diagram: ProjectDiagram;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
  mdSource?: string;
}

export interface TerminalSnippet {
  title: string;
  tech: string;
  label: string;
  code: string;
}
