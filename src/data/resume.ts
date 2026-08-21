import type {
  EducationEntry,
  LifeEvent,
  Profile,
  Role,
  SkillCategory,
  WorkItem,
} from "../types/resume";

export const PROFILE: Profile = {
  name: "Sage Zora",
  tagline: "Engineer. Creator. Gamer.",
  summary: [
    "Hey! I'm Sage. I like to build things and play games (and build those too!).",
    "I'm based out of Asheville, NC where I spend my free time exploring the mountains, crafting my own games, and hanging out with all of my animals.",
    "I'm currently on the hunt for a new challenge. If you're looking for a tinkerer and builder, please reach out!",
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

export const CONTACT_NOTE =
  "On the hunt for a new challenge, reach out if you have an epic quest!";

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
    summary:
      "After a few years of working with some amazing people, it was time for me to become the party leader. This was the stretch where I was the person other teams pulled in when the architecture was messy and the problem wasn't well-defined yet. I owned delivery and on-call for a product area, stood up a DevOps Guild that cut deploy cycle time by about a third, and spent a lot of energy on AI tooling — both a communication feature for the business and developer workflows that gave engineers a few hours back each week. I also got to mentor other seniors and sit with Product early enough that the scary technical calls happened before they were emergencies.",
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
    summary:
      "A new guild, a new chapter. This was where I stopped being the person who shipped tickets and started being the person who unstuck the system. We rebuilt a critical surface off Ruby and Ember onto TypeScript, React, and Next; I knocked a GraphQL hotspot down by about 80%; and I helped carve Transitional Services out of the monolith so we could move without a big-bang rewrite. Along the way I built a REST-to-GraphQL layer so two teams could work in parallel, a little DSL so other engineers could stand up endpoints faster, and helped the team grow from three people to more than ten.",
  },
  {
    id: "commerce-architects-senior",
    title: "Senior Software Engineer II",
    organization: "Commerce Architects",
    organizationUrl: "https://www.commerce-architects.com/",
    logo: "/assets/logos/ca-logo.png",
    start: "Jul 2019",
    end: "Sept 2022",
    location: "Spokane, WA",
    summary:
      "Level up! After showcasing my skills, I was promoted to Senior Software Engineer (and later SSE II). Five years of client work on systems that actually had to stay up — grocery search for millions of queries a day, Oracle Commerce monoliths, the unglamorous production fires. I pushed CI/CD and cloud-native habits onto programs that didn't have them yet, and I spent as much time mentoring and hiring as I did writing code. HEB and Central Market were the ones that stuck: pipelines, an AWS search migration, and GraphQL that didn't make people miserable.",
  },
  {
    id: "commerce-architects-junior",
    title: "Junior Software Engineer",
    organization: "Commerce Architects",
    organizationUrl: "https://www.commerce-architects.com/",
    logo: "/assets/logos/ca-logo.png",
    start: "Jul 2017",
    end: "Jul 2019",
    location: "Spokane, WA",
    summary:
      "First real job out of college! This is where I really learned how to be a software engineer and how to work with clients. My first taste of traveling for work was a blast!",
  },
  {
    id: "itron",
    title: "Engineering Intern",
    organization: "Itron",
    organizationUrl: "https://www.itron.com/",
    logo: "/assets/logos/itron-logo.png",
    start: "Sept 2016",
    end: "Jul 2017",
    location: "Liberty Lake, WA",
    summary:
      "My first real taste of software engineering! Proof-of-concept cellular telemetry for battery-powered IoT out in the utility world, bouncing between Go backends, React and TypeScript, and STM32 boards running Linux.",
  },
];

export const LIFE_EVENTS: LifeEvent[] = [
  {
    id: "married",
    title: "Got married",
    date: "2026",
    sortKey: "2026-04",
    note: "Player 2 has joined the quest!",
  },
  {
    id: "moved-asheville",
    title: "Moved to Asheville, NC",
    date: "2025",
    sortKey: "2025-09",
    location: "Asheville, NC",
    note: "Mountains, animals, and a new base of operations.",
  },
  {
    id: "moved-richland",
    title: "Moved to Richland, WA",
    date: "2019",
    sortKey: "2019-08",
    location: "Richland, WA",
    note: "Returning home, sidequests with old and new party members",
  },
  {
    id: "graduated-ewu",
    title: "Graduated from EWU",
    date: "2017",
    sortKey: "2017-06",
    note: "New skills acquired!",
  },
  {
    id: "moved-spokane",
    title: "Moved to Spokane, WA",
    date: "2014",
    sortKey: "2014-09",
    location: "Spokane, WA",
    note: "Furthering education at EWU",
  },
  {
    id: "birth",
    title: "Birth",
    date: "February 1996",
    sortKey: "1996-02",
    note: "A new challenger approaches! Adventure Start!",
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
        rated: false,
        icon: "collaboration",
        color: "#60A5FA",
      },
      {
        name: "Technical Mentorship",
        rating: 8,
        rated: false,
        icon: "mentorship",
        color: "#FBBF24",
      },
      {
        name: "Stakeholder Communication",
        rating: 8,
        rated: false,
        icon: "communication",
        color: "#E7E5E4",
      },
      {
        name: "Ambiguity Navigation",
        rating: 8,
        rated: false,
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
    id: "arcadeplex",
    title: "ArcadePlex",
    hook: "Build a world. Show your face. Play with friends.",
    description:
      "A social web game and content platform for remote workers. Design, build, and play your own game modes and maps. The twist: your avatar's head is your face from your webcam.",
    featured: true,
    technologies: ["React", "TypeScript", "Three.js"],
    imageUrl: "/assets/work/arcadeplex.png",
    url: "https://arcadeplex.app",
  },
  {
    id: "tinysouls",
    title: "TinySouls",
    description:
      "A simple arcade game with roguelike elements that runs in your browser. Build up your warrior and see how far you can get.",
    technologies: ["TypeScript"],
    imageUrl: "/assets/work/tinysouls.png",
    url: "https://tinysouls.sagezora.com",
  },
  {
    id: "sagezaugg-com",
    title: "SageZora.com",
    description:
      "The site you're reading right now — a Sheikah Slate shell over a single-page resume.",
    technologies: ["React", "TypeScript", "Vite", "TailwindCSS", "Tsparticles"],
    repoUrl: "https://github.com/sagezaugg/sagezaugg.com",
  },
];
