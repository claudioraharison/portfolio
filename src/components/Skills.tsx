import React, { useState } from 'react';
import { skills } from '../data/portfolioData';
import type { Skill } from '../types';
import mada from '../assets/drapeau-madagascar.jpg';
import france from '../assets/3178055-drapeau-francais-de-france-photo.jpg';
import usa from '../assets/8093518-usa-american-flag-set-background-grunge-old-american-flag-vintage-gratuit-photo.jpg';
import germany from '../assets/flag-wave-250.png';
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTypescript,
  SiTailwindcss, SiBootstrap, SiSass, SiNodedotjs,
  SiExpress, SiNestjs, SiPhp, SiMysql, SiPostgresql,
  SiRedis, SiGit, SiFigma, SiPostman,
  SiPython, SiAdobephotoshop, SiAdobeillustrator, SiR,
  SiFlutter
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
import { useAutoTranslatedText } from '../hooks/useAutoTranslatedText';
import SkillModal from './SkillModal';

interface SkillCategories {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
  autres: Skill[];
}

const skillIcons: { [key: string]: React.ComponentType<any> } = {
  "HTML5": SiHtml5,
  "CSS3": SiCss3,
  "JavaScript": SiJavascript,
  "React": SiReact,
  "TypeScript": SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Bootstrap": SiBootstrap,
  "SASS": SiSass,
  "Flutter": SiFlutter,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "NestJS": SiNestjs,
  "PHP": SiPhp,
  "MySQL": SiMysql,
  "PostgreSQL": SiPostgresql,
  "Redis": SiRedis,
  "Git": SiGit,
  "Visual Studio Code": VscVscode,
  "Figma": SiFigma,
  "Postman": SiPostman,
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
  "SGeMS": FaTools,
  "ODK Collect": FaDatabase,
  "PSPP": FaMicrosoft,
};

// Fonction pour obtenir la catégorie en texte lisible
const getCategoryLabel = (category: string): string => {
  switch(category) {
    case 'frontend': return 'Frontend';
    case 'backend': return 'Backend';
    case 'tools': return 'Outils de développement';
    case 'autres': return 'Compétences techniques diverses';
    default: return category;
  }
};

const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = useAutoTranslatedText('skills.title', 'Compétences');
  const subtitle = useAutoTranslatedText('skills.subtitle', 
    'Un panorama complet de mes compétences techniques acquises au fil de mes expériences professionnelles et formations'
  );
  const webDevTitle = useAutoTranslatedText('skills.web_dev_title', 'Développement Web');
  const frontendTitle = useAutoTranslatedText('skills.frontend_title', 'Frontend');
  const backendTitle = useAutoTranslatedText('skills.backend_title', 'Backend');
  const toolsTitle = useAutoTranslatedText('skills.tools_title', 'Outils & Environnements');
  const devToolsTitle = useAutoTranslatedText('skills.dev_tools_title', 'Outils de Développement');
  const otherSkillsTitle = useAutoTranslatedText('skills.other_skills_title', 'Compétences Techniques Diverses');
  const languagesTitle = useAutoTranslatedText('skills.languages_title', 'Compétences Linguistiques');
  const malagasy = useAutoTranslatedText('skills.lang.malagasy', 'Malagasy');
  const french = useAutoTranslatedText('skills.lang.french', 'Français');
  const english = useAutoTranslatedText('skills.lang.english', 'Anglais');
  const german = useAutoTranslatedText('skills.lang.german', 'Allemand');
  const native = useAutoTranslatedText('skills.lang.native', 'Langue maternelle');
  const b2 = useAutoTranslatedText('skills.lang.b2', 'Niveau B2');
  const intermediate = useAutoTranslatedText('skills.lang.intermediate', 'Intermédiaire');
  const beginner = useAutoTranslatedText('skills.lang.beginner', 'Débutant');
  const flagAlt = useAutoTranslatedText('skills.flag_alt', 'Drapeau');
  const modalClose = useAutoTranslatedText('skills.modal_close', 'Fermer');
  const modalCategory = useAutoTranslatedText('skills.modal_category', 'Catégorie');
  const modalDescription = useAutoTranslatedText('skills.modal_description', 'Description');

  const skillCategories: SkillCategories = {
    frontend: skills.filter((skill: Skill) => skill.category === 'frontend'),
    backend: skills.filter((skill: Skill) => skill.category === 'backend'),
    tools: skills.filter((skill: Skill) => skill.category === 'tools'),
    autres: skills.filter((skill: Skill) => skill.category === 'autres')
  };

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSkill(null), 300);
  };

  const SkillTag = ({ skill }: { skill: Skill }) => {
    const IconComponent = skillIcons[skill.name] || FaQuestionCircle;
    
    return (
      <div 
        className="bg-white border-2 border-primary/20 rounded-xl px-6 py-4 text-center hover:bg-primary/15 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer flex flex-col items-center justify-center"
        onClick={() => handleSkillClick(skill)}
      >
        <IconComponent className="w-8 h-8 mb-2 text-gray-700 hover:text-gray-800 transition-colors" />
        <span className="font-semibold text-gray-900 hover:text-gray-700 transition-colors">{skill.name}</span>
      </div>
    );
  };

  const OtherSkillTag = ({ skill }: { skill: Skill }) => {
    const IconComponent = skillIcons[skill.name] || FaQuestionCircle;
    
    return (
      <div 
        className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 text-center hover:bg-gray-200 transition-all duration-300 hover:scale-105 cursor-pointer flex flex-col items-center justify-center"
        onClick={() => handleSkillClick(skill)}
      >
        <IconComponent className="w-8 h-8 mb-2 text-gray-700" />
        <span className="font-medium text-gray-800">{skill.name}</span>
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
          <SkillTag key={index} skill={skill} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">{webDevTitle}</h3>
              <div className="space-y-8">
                <SkillCategory title={frontendTitle} skills={skillCategories.frontend} color="primary" />
                <SkillCategory title={backendTitle} skills={skillCategories.backend} color="secondary" />
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">{toolsTitle}</h3>
              <SkillCategory title={devToolsTitle} skills={skillCategories.tools} color="green-600" />
            </div>

            <div className="mb-12">
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">{otherSkillsTitle}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {skillCategories.autres.map((skill: Skill, index: number) => (
                  <OtherSkillTag key={index} skill={skill} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">{languagesTitle}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { 
                  language: malagasy, 
                  level: native, 
                  flag: mada 
                },
                { 
                  language: french, 
                  level: b2, 
                  flag: france
                },
                { 
                  language: english, 
                  level: intermediate, 
                  flag: usa 
                },
                { 
                  language: german, 
                  level: beginner, 
                  flag: germany
                }
              ].map((lang, index: number) => (
                <div key={index} className="text-center group">
                  <div className="relative inline-block mb-3">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                      <img 
                        src={lang.flag} 
                        alt={`${flagAlt} ${lang.language}`}
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

      {/* Modal séparé */}
      <SkillModal
        isOpen={isModalOpen}
        onClose={closeModal}
        skill={selectedSkill}
        getCategoryLabel={getCategoryLabel}
        skillIcons={skillIcons}
        modalClose={modalClose}
        modalCategory={modalCategory}
        modalDescription={modalDescription}
      />
    </>
  );
};

export default Skills;