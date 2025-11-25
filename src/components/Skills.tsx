import React from 'react';
import { skills } from '../data/portfolioData';
import type { Skill } from '../types';
import mada from '../assets/drapeau-madagascar.jpg';
import france from '../assets/3178055-drapeau-francais-de-france-photo.jpg';
import usa from '../assets/8093518-usa-american-flag-set-background-grunge-old-american-flag-vintage-gratuit-photo.jpg';
import germany from '../assets/flag-wave-250.png';

// Import des icônes depuis React Icons
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTypescript,
  SiTailwindcss, SiBootstrap, SiSass, SiNodedotjs,
  SiExpress, SiNestjs, SiPhp, SiMysql, SiPostgresql,
  SiRedis, SiGit, SiFigma, SiPostman,
  SiPython, SiAdobephotoshop, SiAdobeillustrator, SiR
} from 'react-icons/si';
import { 
  TbSql, TbMap, TbBuildingSkyscraper
} from 'react-icons/tb';
import { 
  FaDatabase, FaTools, FaQuestionCircle, FaMicrosoft
} from 'react-icons/fa';
import { 
  VscVscode 
} from 'react-icons/vsc';

interface SkillCategories {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
  autres: Skill[];
}

// Mapping des icônes pour chaque compétence
const skillIcons: { [key: string]: React.ComponentType<any> } = {
  // Frontend
  "HTML5": SiHtml5,
  "CSS3": SiCss3,
  "JavaScript": SiJavascript,
  "React": SiReact,
  "TypeScript": SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Bootstrap": SiBootstrap,
  "SASS": SiSass,
  
  // Backend
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "NestJS": SiNestjs,
  "PHP": SiPhp,
  "MySQL": SiMysql,
  "PostgreSQL": SiPostgresql,
  "Redis": SiRedis,
  
  // Outils & Technologies
  "Git": SiGit,
  "Visual Studio Code": VscVscode,
  "Figma": SiFigma,
  "Postman": SiPostman,
  
  // Compétences supplémentaires
  "Python": SiPython,
  "SQL": TbSql,
  "QGIS": TbMap,
  "ArcGIS": TbMap,
  "AutoCAD": TbBuildingSkyscraper,
  "Revit": TbBuildingSkyscraper,
  "Adobe Photoshop": SiAdobephotoshop,
  "Adobe Illustrator": SiAdobeillustrator,
  "R": SiR,
  "Microsoft Office": FaMicrosoft,
  
  // Icônes par défaut pour celles non disponibles
  "SGeMS": FaTools,
  "ODK Collect": FaDatabase,
  "PSPP": FaMicrosoft,
};

const Skills: React.FC = () => {
  const skillCategories: SkillCategories = {
    frontend: skills.filter((skill: Skill) => skill.category === 'frontend'),
    backend: skills.filter((skill: Skill) => skill.category === 'backend'),
    tools: skills.filter((skill: Skill) => skill.category === 'tools'),
    autres: skills.filter((skill: Skill) => skill.category === 'autres')
  };

  const SkillTag = ({ name }: { name: string }) => {
    const IconComponent = skillIcons[name] || FaQuestionCircle;
    
    return (
      <div className="bg-white border-2 border-primary/20 rounded-xl px-6 py-4 text-center hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-default flex flex-col items-center justify-center">
        <IconComponent className="w-8 h-8 mb-2 text-gray-700 hover:text-white transition-colors" />
        <span className="font-semibold text-gray-900 hover:text-white transition-colors">{name}</span>
      </div>
    );
  };

  const SkillCategory = ({ title, skills, color = 'primary' }: { 
    title: string; 
    skills: Skill[]; 
    color?: string;
  }) => (
    <div className="mb-8">
      <h3 className={`text-2xl font-bold text-${color} mb-6 flex items-center justify-center`}>
        <span className="w-4 h-4 bg-current rounded-full mr-3"></span>
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skills.map((skill: Skill, index: number) => (
          <SkillTag key={index} name={skill.name} />
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Compétences</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un panorama complet de mes compétences techniques acquises au fil de mes expériences professionnelles et formations
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Développement Web */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Développement Web</h3>
            <div className="space-y-8">
              <SkillCategory title="Frontend" skills={skillCategories.frontend} color="primary" />
              <SkillCategory title="Backend" skills={skillCategories.backend} color="secondary" />
            </div>
          </div>

          {/* Outils & Technologies */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Outils & Environnements</h3>
            <SkillCategory title="Outils de Développement" skills={skillCategories.tools} color="green-600" />
          </div>

          {/* Compétences Diverses */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Compétences Techniques Diverses</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skillCategories.autres.map((skill: Skill, index: number) => {
                const IconComponent = skillIcons[skill.name] || FaQuestionCircle;
                return (
                  <div key={index} className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-center hover:bg-gray-200 transition-colors cursor-default flex flex-col items-center justify-center">
                    <IconComponent className="w-8 h-8 mb-2 text-gray-700" />
                    <span className="font-medium text-gray-800">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section Langues - Inchangée */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Compétences Linguistiques</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { 
                language: 'Malagasy', 
                level: 'Langue maternelle', 
                flag: mada 
              },
              { 
                language: 'Français', 
                level: 'Niveau B2', 
                flag: france
              },
              { 
                language: 'Anglais', 
                level: 'Intermédiaire', 
                flag: usa 
              },
              { 
                language: 'Allemand', 
                level: 'Débutant', 
                flag: germany
              }
            ].map((lang, index: number) => (
              <div key={index} className="text-center group">
                <div className="relative inline-block mb-3">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                    <img 
                      src={lang.flag} 
                      alt={`Drapeau ${lang.language}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 text-lg">{lang.language}</h4>
                <p className="text-sm text-gray-600 mt-1">{lang.level}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;