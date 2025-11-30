export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  category: string;
  slug: string;
  body: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
  githubLink?: string;
  body?: string;
}

export interface BlogPostMetadata {
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  category: string;
  slug: string;
}

export interface ProjectMetadata {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
  githubLink?: string;
}

