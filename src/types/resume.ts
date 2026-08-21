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
  availability: string;
  photo: string;
  links: SocialLink[];
}

/**
 * A set of bullets under an optional subheading. Roles with enough scope to
 * warrant grouping (e.g. "Engineering Enablement") use the label; simpler
 * roles use a single unlabeled group.
 */
export interface BulletGroup {
  label?: string;
  bullets: string[];
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
  groups: BulletGroup[];
}

export interface SkillCategory {
  label: string;
  skills: string[];
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
  description: string;
  technologies: string[];
  imageUrl?: string;
  repoUrl?: string;
}
