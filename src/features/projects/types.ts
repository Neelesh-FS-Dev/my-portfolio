export type ProjectType = "mobile" | "web";

export interface Screenshot {
  url: string;
  label?: string;
}

export interface ProjectFeatureGroup {
  icon: string;
  title: string;
  items: string[];
}

export type ProjectStatus =
  | "Live"
  | "Beta"
  | "Internal"
  | "Case Study"
  | "Active Development";

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
  role?: string;
  status?: ProjectStatus;
  outcome?: string;
  relatedBlogs?: string[];
}
