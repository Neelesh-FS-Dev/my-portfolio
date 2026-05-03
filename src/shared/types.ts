import type { ComponentType, ReactElement } from "react";
import type { IconType } from "react-icons";

export type Domain = "mobile" | "web" | "both";

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
