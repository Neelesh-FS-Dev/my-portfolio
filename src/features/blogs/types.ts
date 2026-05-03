import type { IconType } from "react-icons";
import type { Domain } from "../../shared/types";

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
