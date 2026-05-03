import type { ComponentType, ReactElement } from "react";
import type { IconType } from "react-icons";

export type Domain = "mobile" | "web" | "both";
export type ProjectType = "mobile" | "web";
export type RoleType = "current" | "past";

export interface PersonalStats {
  experience: string;
  mobileApps: string;
  users: string;
  rating: string;
  webProjects: string;
  sprints: string;
}

export interface Personal {
  name: string;
  title: string;
  subtitle: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  instagram: string;
  resume: string;
  stats: PersonalStats;
  availability: string;
  summary: string;
  about: string[];
}

export interface Screenshot {
  url: string;
  label?: string;
}

export interface ProjectFeatureGroup {
  icon: string;
  title: string;
  items: string[];
}

export interface Project {
  id: string;
  type: ProjectType;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  stack: string[];
  highlights: string[];
  features: ProjectFeatureGroup[];
  color: string;
  accent: string;
  category: string;
  screens: number;
  users: string;
  rating: string;
  appStoreUrl: string;
  playStoreUrl: string;
  liveUrl: string;
  videoUrl: string;
  screenshots: Screenshot[];
  githubUrl?: string;
  isInternal?: boolean;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  companyUrl: string;
  location: string;
  period: string;
  startDate?: string;
  duration?: string;
  type: RoleType;
  mobileTech: string[];
  webTech: string[];
  highlights: string[];
}

export interface BlogContentBlock {
  type: "intro" | "heading" | "text" | "code" | "callout";
  text: string;
  label?: string;
}

export interface BlogBase {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  domain: Domain;
  content: BlogContentBlock[];
}

export interface Blog extends BlogBase {
  color: string;
  icon: IconType;
}

export interface BlogDetail extends BlogBase {
  color: string;
}

export interface Skill {
  name: string;
  level: number;
  color: string;
  domain: Domain;
  icon: string;
}

export interface SkillCategory {
  domain: Domain;
  category: string;
  icon: string;
  items: string[];
}

export interface Degree {
  degree: string;
  shortDegree: string;
  institution: string;
  location: string;
  period: string;
  duration: string;
  icon: IconType;
  institutionBadges: string[];
  institutionAbout: string;
  coursework: string[];
  activities: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialId: string;
  icon: string;
  color: string;
}

export interface NavLink {
  to: string;
  label: string;
}

export interface PhoneScreen {
  bg: string;
  bars: [string, string, string];
  title: string;
  subtitle: string;
}

export type PhoneScreens = Record<string, PhoneScreen>;

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color?: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface GitHubAccount {
  username: string;
  name: string;
  avatar: string;
  totalContributions: number;
  commits: number;
  prs: number;
  issues: number;
  privateCount: number;
}

export interface GitHubContributionsResponse {
  calendar: ContributionCalendar;
  accounts: GitHubAccount[];
}

export interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
}

export type ReactIcon = IconType | ComponentType<{ size?: number | string }>;
export type IconElement = ReactElement;
