import type { IconType } from "react-icons";

export type RoleType = "current" | "past";

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
