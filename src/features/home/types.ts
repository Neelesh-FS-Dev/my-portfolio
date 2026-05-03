import type { Domain } from "../../shared/types";

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
