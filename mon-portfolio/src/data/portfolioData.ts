import type { Project, Skill, Experience } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Plateforme Rapex Group",
    description: "Développement d'une plateforme web complète avec interface interactive et réactive.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "NestJS", "PostgreSQL"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "Application de Gestion",
    description: "Application web pour la gestion de données avec interface utilisateur intuitive.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Site E-commerce",
    description: "Plateforme e-commerce avec panier d'achat et système de paiement.",
    technologies: ["Next.js", "TypeScript", "Stripe", "paypal", "Tailwind CSS"],
    githubUrl: "#",
    liveUrl: "#",
  }
];

export const skills: Skill[] = [
  { name: "React", level: 85, category: "frontend" },
  { name: "TypeScript", level: 80, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "JavaScript", level: 88, category: "frontend" },
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "Node.js", level: 75, category: "backend" },
  { name: "NestJS", level: 70, category: "backend" },
  { name: "Express", level: 78, category: "backend" },
  { name: "PostgreSQL", level: 72, category: "backend" },
  { name: "Git", level: 85, category: "tools" },
  { name: "Figma", level: 65, category: "tools" },
];

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Rapex Group",
    position: "Développeur Front-end & Back-end",
    period: "Juin - Septembre 2025",
    description: [
      "Conception et développement d'interfaces web interactives et réactives",
      "Intégration complète front-end et back-end",
      "Collaboration avec les équipes de développement et design",
      "Conception du logotype de la plateforme"
    ],
    technologies: ["React", "NestJS", "TailwindCSS", "PostgreSQL", "Redis"]
  },
  {
    id: 2,
    company: "Projets Personnels",
    position: "Développeur Fullstack",
    period: "2024 - Présent",
    description: [
      "Développement d'applications web complètes",
      "Apprentissage continu des nouvelles technologies",
      "Contributions à des projets open source"
    ],
    technologies: ["React", "Node.js", "TypeScript", "MongoDB"]
  }
];