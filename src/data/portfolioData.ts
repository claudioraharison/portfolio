import type { Project, Skill, Experience } from '../types';
import mastertableLogo from '../assets/LogoAmsterTable.png';

export const projects: Project[] = [
  {
    id: 1,
    title: "Plateforme MasterTable",
    client: "Rapex Group",
    description: "Développement d'une plateforme web complète avec interface interactive et réactive.",
    category: "Web & Fullstack",
    technologies: ["React", "TypeScript", "Tailwind CSS", "NestJS", "PostgreSQL", "Redis", "JavaScript", "Paypal", "Stripe"],
    githubUrl: "#",
    liveUrl: "https://mastertable.site",
  },
  {
    id: 2,
    title: "Creation de logo pour MasterTable",
    client: "Rapex Group",
    description: "Conception du logotype de la plateforme MasterTable.",
    category: "Design & Branding",
    technologies: ["Adobe Illustrator", "Adobe Photoshop", "Inkscape"],
    githubUrl: "#",
    liveUrl: mastertableLogo,
  },
  {
    id: 3,
    title: "Application de Gestion",
    client: "Freelance",
    description: "Application web pour la gestion de données avec interface utilisateur intuitive.",
    category: "Web & Frontend",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 4,
    title: "Site E-commerce",
    client: "Projet Personnel",
    description: "Plateforme e-commerce avec panier d'achat et système de paiement.",
    category: "Web & Fullstack",
    technologies: ["Next.js", "TypeScript", "Stripe", "paypal", "Tailwind CSS"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 5,
    title: "Application Mobile de Gestion d'emploi du Temps",
    client: "Projet Personnel",
    description: "Application mobile multiplateforme pour la gestion d'emploi du temps et de tâches.",
    category: "Mobile & Frontend",
    technologies: ["React Native", "tailwind CSS", "TypeScript", "Nest JS", ""],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 6,
    title: "Système d'Information Géographique (SIG) pour l'Analyse Urbaine",
    client: "Projet Académique",
    description: "Visualisation et analyse des données urbaines à l'aide de technologies SIG.",
    category: "Cartographie & SIG",
    technologies: ["QGIS", "ArcGIS", "Python", "PostgreSQL", "Leaflet.js"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 7,
    title: "Analyse des risques geologiques dans une région donnée",
    client: "Projet Académique",
    description: "Étude des risques géologiques tels que les glissements de terrain et les inondations en utilisant des outils SIG.",
    category: "Cartographie & SIG",
    technologies: ["QGIS", "ArcGIS", "Python", "R", "SGeMS", "AutoCAD", "Blender"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 8,
    title: "inventaire biologique et cartographie des emplacements de biodiversité",
    client: "Projet Académique",
    description: "Collecte et analyse des données biologiques pour cartographier les zones de biodiversité à l'aide de technologies SIG.",
    category: "Cartographie & SIG",
    technologies: ["QGIS", "ArcGIS", "Python", "R", "ODK Collect", "PSPP"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 9,
    title: "Creation d'extension QGIS pour l'automatisation des tâches SIG",
    client: "Projet Personnel",
    description: "Développement d'une extension QGIS personnalisée pour automatiser les flux de travail SIG courants.",
    category: "Cartographie & SIG",
    technologies: ["QGIS", "Python", "PyQt", "Qt Designer", "Git", "GitHub", "Visual Studio Code"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 10,
    title: "Modelisation 2D et 3D sur sketchup et Blender",
    client: "Projet Personnel",
    description: "Création de modèles 2D et 3D pour des projets d'architecture et de design.",
    category: "Modélisation & Design",
    technologies: ["SketchUp", "Blender", "AutoCAD", "Revit", "Adobe Photoshop", "Adobe Illustrator"],
    githubUrl: "#",
    liveUrl: "#",
  },
  // {
  //   id: 4,
  //   title: "Analyse Spatiale des Données",
  //   client: "Université X",
  //   description: "Projet de modélisation cartographique des tendances démographiques régionales.",
  //   category: "Cartographie & SIG",
  //   technologies: ["QGIS", "ArcGIS", "Python", "R"],
  //   githubUrl: "#",
  //   liveUrl: "#",
  // }
];

export const skills: Skill[] = [
  // Frontend
  { name: "HTML5", category: "frontend", description: "Maîtrise du langage de balisage pour structurer le contenu web, création de formulaires, intégration sémantique et accessibilité." },
  { name: "CSS3", category: "frontend", description: "Expert en styles CSS, animations, transitions, Flexbox, Grid Layout, et création de designs responsifs adaptés à tous les écrans." },
  { name: "JavaScript", category: "frontend", description: "Développement d'applications web interactives, manipulation du DOM, utilisation des APIs modernes et programmation asynchrone." },
  { name: "React", category: "frontend", description: "Développement d'interfaces utilisateur avec composants réutilisables, gestion d'état avec Hooks, et intégration d'APIs REST." },
  { name: "TypeScript", category: "frontend", description: "Typage statique pour JavaScript, amélioration de la maintenabilité du code et réduction des erreurs lors du développement." },
  { name: "Tailwind CSS", category: "frontend", description: "Framework CSS utility-first pour un développement rapide de designs personnalisés et responsive sans quitter le HTML." },
  { name: "Bootstrap", category: "frontend", description: "Framework CSS pour développer rapidement des sites web responsifs avec des composants prédéfinis et un système de grille." },
  { name: "SASS", category: "frontend", description: "Préprocesseur CSS avec variables, nesting, mixins et fonctions pour une organisation avancée des styles." },
  { name: "Flutter", category: "frontend", description: "Framework de développement d'applications multiplateformes pour iOS, Android et web. Création d'interfaces natives avec le langage Dart, utilisation de widgets personnalisables et état géré avec Provider/Bloc." },
  
  // Backend
  { name: "Node.js", category: "backend", description: "Environnement d'exécution JavaScript côté serveur pour construire des applications web scalables et performantes." },
  { name: "Express.js", category: "backend", description: "Framework web minimaliste pour Node.js, création d'APIs RESTful, gestion des routes et middleware." },
  { name: "NestJS", category: "backend", description: "Framework progressif pour Node.js basé sur TypeScript, architecture modulaire et inspiration d'Angular." },
  { name: "PHP", category: "backend", description: "Langage de script côté serveur pour le développement web, création de sites dynamiques et gestion de bases de données." },
  { name: "MySQL", category: "backend", description: "Système de gestion de base de données relationnelle, conception de schémas, requêtes SQL et optimisation des performances." },
  { name: "PostgreSQL", category: "backend", description: "Base de données relationnelle avancée avec support des types de données complexes et transactions ACID." },
  { name: "Redis", category: "backend", description: "Base de données en mémoire pour la mise en cache, stockage de sessions et gestion de files d'attente." },
  
  // Outils & Technologies
  { name: "Git", category: "tools", description: "Système de contrôle de version distribué pour le suivi des modifications et la collaboration sur le code source." },
  { name: "Visual Studio Code", category: "tools", description: "Éditeur de code source léger mais puissant avec support du débogage, extensions et intégration Git." },
  { name: "Figma", category: "tools", description: "Outil de design d'interface utilisateur collaboratif pour la création de prototypes et maquettes web." },
  { name: "Postman", category: "tools", description: "Plateforme pour le test d'APIs, création de requêtes HTTP, automatisation des tests et documentation." },
  
  // Compétences supplémentaires du CV
  { name: "Python", category: "autres", description: "Langage de programmation polyvalent pour l'analyse de données, l'automatisation et le développement web." },
  { name: "SQL", category: "autres", description: "Langage de requête structuré pour la manipulation et l'interrogation de bases de données relationnelles." },
  { name: "QGIS", category: "autres", description: "Système d'Information Géographique open-source pour l'analyse spatiale et la cartographie numérique." },
  { name: "ArcGIS", category: "autres", description: "Plateforme SIG complète pour la visualisation, l'analyse et le partage de données géospatiales." },
  { name: "AutoCAD", category: "autres", description: "Logiciel de conception assistée par ordinateur pour le dessin technique 2D et 3D." },
  { name: "Revit", category: "autres", description: "Logiciel de modélisation des informations du bâtiment (BIM) pour l'architecture et l'ingénierie." },
  { name: "Adobe Photoshop", category: "autres", description: "Logiciel de retouche photo et création graphique pour le web design et les visuels numériques." },
  { name: "Adobe Illustrator", category: "autres", description: "Logiciel de création graphique vectorielle pour les logos, illustrations et designs d'interfaces." },
  { name: "R", category: "autres", description: "Langage et environnement pour le calcul statistique, l'analyse de données et la visualisation." },
  { name: "SGeMS", category: "autres", description: "Logiciel de modélisation géostatistique pour l'analyse et la simulation de phénomènes spatiaux." },
  { name: "Microsoft Office", category: "autres", description: "Suite bureautique complète incluant Word, Excel, PowerPoint pour la productivité et la présentation." },
  { name: "ODK Collect", category: "autres", description: "Application mobile pour la collecte de données sur le terrain avec formulaires personnalisables." },
  { name: "PSPP", category: "autres", description: "Logiciel d'analyse statistique alternative à SPSS pour le traitement de données quantitatives." },
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