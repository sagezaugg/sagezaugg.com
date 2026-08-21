export type SocialIcon = "github" | "linkedin" | "email";

export interface SocialLink {
  label: string;
  url: string;
  icon: SocialIcon;
}

export interface Profile {
  name: string;
  tagline: string;
  summary: string[];
  /** Optional extra line under the bio — alias, origin, whatever doesn't fit the pitch. */
  aside?: string;
  availability: string;
  photo: string;
  links: SocialLink[];
}

export interface Role {
  id: string;
  title: string;
  organization: string;
  organizationUrl?: string;
  logo?: string;
  start: string;
  end: string;
  location: string;
  /** First-person recap of the stop. */
  summary: string;
}

/** A non-job beat on the quest log — moves, marriage, the unprofessional bits. */
export interface LifeEvent {
  id: string;
  title: string;
  date: string;
  /** YYYY-MM so life events can sit between jobs on the track. */
  sortKey: string;
  location?: string;
  note?: string;
}

export type SkillIconName =
  | "distributed-systems"
  | "api-design"
  | "monolith-decomposition"
  | "reliability"
  | "cicd"
  | "kotlin"
  | "java"
  | "typescript"
  | "python"
  | "spring"
  | "react"
  | "nextjs"
  | "aws"
  | "docker"
  | "terraform"
  | "llm"
  | "ai-tooling"
  | "workflow"
  | "mentorship"
  | "collaboration"
  | "communication"
  | "ambiguity";

export interface Skill {
  name: string;
  /** How many of the ten pips are filled. Ignored when `rated` is false. */
  rating: number;
  /**
   * False for flavor/traits that should not look like a self-score.
   * Defaults to true.
   */
  rated?: boolean;
  /** Optional one-liner under an unrated skill. */
  note?: string;
  icon: SkillIconName;
  color: string;
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  institutionUrl?: string;
  logo?: string;
  start: string;
  end: string;
}

export interface WorkItem {
  id: string;
  title: string;
  /** Short pitch shown under the title. */
  hook?: string;
  description: string;
  problem?: string;
  approach?: string;
  result?: string;
  technologies: string[];
  imageUrl?: string;
  repoUrl?: string;
  /** When true, this piece is the one on the launcher home screen. */
  featured?: boolean;
}
