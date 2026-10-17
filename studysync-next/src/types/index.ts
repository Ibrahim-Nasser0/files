export type Language = 'en' | 'ar';

export interface NavLink {
  href: string;
  label: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

export interface UserRole {
  title: string;
  badge: string;
  icon: string;
  desc: string;
  capabilities: string[];
}

export interface WorkflowItem {
  title: string;
  steps: string[];
}

export interface ExampleResult {
  track: string;
  score: number;
  status: 'primary' | 'secondary' | 'neutral';
}

export interface AITool {
  icon: string;
  title: string;
  desc: string;
}

export interface RecFactor {
  name: string;
  weight: string;
}

export interface ArchitectureLayer {
  id: string;
  icon: string;
  name: string;
  badge: string;
  desc: string;
  tags: string[];
  color: string;
}

export interface ArchitectureHighlight {
  icon: string;
  title: string;
  desc: string;
}

export interface RiskRule {
  condition: string;
  status: string;
  level: 'safe' | 'attention' | 'risk' | 'critical';
  icon: string;
  color: string;
  badge: string;
}

export interface RoadmapPhase {
  id: number;
  phaseNum: string;
  title: string;
  icon: string;
  status: string;
  color: string;
  items: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  icon: string;
  tags: string[];
}
