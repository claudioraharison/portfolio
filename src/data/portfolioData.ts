import type { Project, Skill, Experience } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "Plateforme MasterTable",
    client: "Rapex Group",
    description: "Développement d'une plateforme web complète avec interface interactive et réactive.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "NestJS", "PostgreSQL", "Redis", "JavaScript", "Paypal", "Stripe"],
    githubUrl: "#",
    liveUrl: "https://mastertable.site",
  },
  {
    id: 2,
    title: "Application de Gestion",
    client: "Freelance",
    description: "Application web pour la gestion de données avec interface utilisateur intuitive.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Site E-commerce",
    client: "Projet Personnel",
    description: "Plateforme e-commerce avec panier d'achat et système de paiement.",
    technologies: ["Next.js", "TypeScript", "Stripe", "paypal", "Tailwind CSS"],
    githubUrl: "#",
    liveUrl: "#",
  }
];

export const skills: Skill[] = [
  // Frontend
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Bootstrap", category: "frontend" },
  { name: "SASS", category: "frontend" },
  
  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Express.js", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "PHP", category: "backend" },
  { name: "MySQL", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Redis", category: "backend" },
  
  // Outils & Technologies
  { name: "Git", category: "tools" },
  { name: "Visual Studio Code", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "Postman", category: "tools" },
  
  // Compétences supplémentaires du CV
  { name: "Python", category: "autres" },
  { name: "SQL", category: "autres" },
  { name: "QGIS", category: "autres" },
  { name: "ArcGIS", category: "autres" },
  { name: "AutoCAD", category: "autres" },
  { name: "Revit", category: "autres" },
  { name: "Adobe Photoshop", category: "autres" },
  { name: "Adobe Illustrator", category: "autres" },
  { name: "R", category: "autres" },
  { name: "SGeMS", category: "autres" },
  { name: "Microsoft Office", category: "autres" },
  { name: "ODK Collect", category: "autres" },
  { name: "PSPP", category: "autres" },
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