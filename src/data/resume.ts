import type {
  EducationEntry,
  Profile,
  Role,
  SkillCategory,
  WorkItem,
} from "../types/resume";

export const PROFILE: Profile = {
  name: "Sage Zora",
  tagline: "Engineer. Creator. Explorer of systems.",
  summary: [
    "Lead software engineer working across distributed systems, API design, and the operational health of production services.",
    "I'm at my best in ambiguous problem spaces — decomposing monoliths, shortening delivery cycles, and growing the engineers around me.",
  ],
  availability: "Available for work",
  photo: "/assets/profile.jpg",
  links: [
    {
      label: "GitHub",
      url: "https://github.com/sagezaugg",
      icon: "github",
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/sage-zora",
      icon: "linkedin",
    },
    {
      label: "Email",
      url: "mailto:sage.mikel.zora@gmail.com",
      icon: "email",
    },
  ],
};

export const EMAIL = "sage.mikel.zora@gmail.com";

export const ROLES: Role[] = [
  {
    id: "alphasights-lead",
    title: "Lead Software Engineer",
    organization: "AlphaSights",
    organizationUrl: "https://www.alphasights.com/",
    logo: "/assets/logos/as-logo.png",
    start: "Jan 2025",
    end: "Aug 2026",
    location: "Remote",
    groups: [
      {
        label: "Technical Ownership & Architecture",
        bullets: [
          "Serve as trusted technical advisor on architectural decisions across a federated service landscape, guiding teams through ambiguous and evolving problem spaces",
          "Own on-call readiness and operational health for a set of production services, reducing mean time to resolution and improving system reliability month over month",
          "Own end-to-end technical delivery for a product area serving thousands of users, translating complex constraints into clear trade-offs for cross-functional partners",
        ],
      },
      {
        label: "Engineering Enablement",
        bullets: [
          "Founded and led a cross-team DevOps Guild, driving ~35% reduction in deployment cycle time through improved CI/CD pipelines and local development workflows",
          "Led delivery of an AI-assisted communication feature that improved outbound message quality and consistency, increasing operational throughput",
          "Implemented AI-powered developer workflows to reduce routine engineering friction, saving an estimated 5+ hours per engineer per week on repetitive tasks",
        ],
      },
      {
        label: "Mentorship",
        bullets: [
          "Mentor senior engineers on technical decision-making and system design, expanding their scope on high-visibility initiatives",
          "Partner closely with Product to define technical roadmaps and de-risk delivery through early architectural input",
        ],
      },
    ],
  },
  {
    id: "alphasights-senior",
    title: "Senior Software Engineer",
    organization: "AlphaSights",
    organizationUrl: "https://www.alphasights.com/",
    logo: "/assets/logos/as-logo.png",
    start: "Sept 2022",
    end: "Dec 2024",
    location: "Remote",
    groups: [
      {
        bullets: [
          "Served as a senior technical contributor, owning complex, multi-quarter initiatives spanning multiple teams and systems",
          "Delivered a GraphQL performance optimization reducing query execution time by ~80%, directly improving responsiveness for thousands of internal and external users",
          "Led the rebuild of a mission-critical product surface from a legacy Ruby and Ember stack to TypeScript, React, and Next.js, enabling significantly faster iteration cycles",
          "Co-designed and built Transitional Services, a Kotlin-based microservice enabling safe, incremental decomposition of a large legacy monolith",
          "Implemented a REST-to-GraphQL translation layer to decouple frontend delivery from backend constraints, unblocking parallel workstreams across 2 teams",
          "Designed a custom DSL to standardize endpoint creation, reducing development time for other engineers",
          "Mentored junior engineers and contributed to technical interviewing as the team scaled from 3 to 10+ engineers",
        ],
      },
    ],
  },
  {
    id: "commerce-architects",
    title: "Senior Software Engineer II",
    organization: "Commerce Architects",
    organizationUrl: "https://www.commerce-architects.com/",
    logo: "/assets/logos/ca-logo.png",
    start: "Jul 2017",
    end: "Sept 2022",
    location: "Spokane, WA",
    groups: [
      {
        bullets: [
          "Led feature development and architectural improvements across enterprise client engagements supporting applications serving millions of daily users",
          "Drove adoption of modern CI/CD practices and cloud-native architectures, reducing deployment risk and accelerating release cadence for multi-team programs",
          "Mentored junior engineers and contributed to internal recruiting, onboarding, and technical standards",
        ],
      },
      {
        label: "Selected Engagements",
        bullets: [
          "HEB (Enterprise Grocery, 400+ Stores): Improved CI/CD pipelines (Jenkins, GitLab), contributed to an AWS-based search platform migration serving millions of product queries/day, and resolved high-impact production incidents in a large Oracle Commerce monolith",
          "Central Market: Led end-to-end feature design and delivery, introduced agile process improvements, and optimized GraphQL layer performance and maintainability",
        ],
      },
    ],
  },
  {
    id: "itron",
    title: "Engineering Intern",
    organization: "Itron",
    organizationUrl: "https://www.itron.com/",
    start: "Sept 2016",
    end: "Jul 2017",
    location: "Liberty Lake, WA",
    groups: [
      {
        bullets: [
          "Built proof-of-concept cellular telemetry systems for battery-powered IoT devices deployed across utility infrastructure",
          "Developed backend services in Go and frontend features in React/TypeScript; supported embedded development on STM32 Linux-based boards",
        ],
      },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: "Systems & Architecture",
    skills: [
      {
        name: "API Design (REST, GraphQL)",
        rating: 9,
        icon: "api-design",
        color: "#8BB8E8",
      },
      {
        name: "Distributed Systems",
        rating: 8,
        icon: "distributed-systems",
        color: "#5EEAD4",
      },
      {
        name: "Monolith Decomposition",
        rating: 8,
        icon: "monolith-decomposition",
        color: "#D4AF37",
      },
      {
        name: "Reliability & Operational Readiness",
        rating: 8,
        icon: "reliability",
        color: "#34D399",
      },
      {
        name: "CI/CD Pipeline Design",
        rating: 8,
        icon: "cicd",
        color: "#22D3EE",
      },
    ],
  },
  {
    label: "Technical",
    skills: [
      { name: "TypeScript", rating: 9, icon: "typescript", color: "#3178C6" },
      { name: "Kotlin", rating: 8, icon: "kotlin", color: "#7F52FF" },
      { name: "React", rating: 8, icon: "react", color: "#61DAFB" },
      { name: "Next.js", rating: 8, icon: "nextjs", color: "#E5E7EB" },
      { name: "Docker", rating: 8, icon: "docker", color: "#2496ED" },
      { name: "Java", rating: 7, icon: "java", color: "#ED8B00" },
      { name: "Spring Boot", rating: 7, icon: "spring", color: "#6DB33F" },
      { name: "AWS", rating: 7, icon: "aws", color: "#FF9900" },
      { name: "Python", rating: 6, icon: "python", color: "#3776AB" },
      { name: "Terraform", rating: 6, icon: "terraform", color: "#844FBA" },
    ],
  },
  {
    label: "AI & Enablement",
    skills: [
      {
        name: "AI-Assisted Developer Tooling",
        rating: 8,
        icon: "ai-tooling",
        color: "#F472B6",
      },
      {
        name: "LLM Integration",
        rating: 7,
        icon: "llm",
        color: "#C084FC",
      },
      {
        name: "Workflow Automation",
        rating: 7,
        icon: "workflow",
        color: "#FB923C",
      },
    ],
  },
  {
    label: "Collaboration",
    skills: [
      {
        name: "Cross-Team Collaboration",
        rating: 9,
        icon: "collaboration",
        color: "#60A5FA",
      },
      {
        name: "Technical Mentorship",
        rating: 8,
        icon: "mentorship",
        color: "#FBBF24",
      },
      {
        name: "Stakeholder Communication",
        rating: 8,
        icon: "communication",
        color: "#E7E5E4",
      },
      {
        name: "Ambiguity Navigation",
        rating: 8,
        icon: "ambiguity",
        color: "#A8A29E",
      },
    ],
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    id: "ewu",
    degree: "Bachelor of Computer Science",
    institution: "Eastern Washington University",
    institutionUrl: "https://ewu.edu",
    logo: "/assets/logos/ewu-logo.png",
    start: "Sept 2014",
    end: "Jun 2017",
  },
  {
    id: "cbc",
    degree: "Associate of Arts",
    institution: "Columbia Basin College",
    institutionUrl: "https://www.columbiabasin.edu/",
    start: "Sept 2012",
    end: "Jun 2014",
  },
];

export const WORK: WorkItem[] = [
  {
    id: "sagezaugg-com",
    title: "SageZora.com",
    description:
      "The site you're reading right now — a Sheikah Slate shell over a single-page resume.",
    technologies: ["React", "TypeScript", "Vite", "TailwindCSS", "Tsparticles"],
    repoUrl: "https://github.com/sagezaugg/sagezaugg.com",
  },
];
