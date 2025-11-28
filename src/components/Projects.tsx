import React from 'react';
import { projects } from '../data/portfolioData';
import { useAutoTranslatedText } from '../hooks/useAutoTranslatedText';
// Import du nouveau composant
import ConstructionPreview from './ConstructionPreview'; 

const Projects: React.FC = () => {
  const title = useAutoTranslatedText('projects.title', 'Mes Projets');
  const codeText = useAutoTranslatedText('projects.code', 'Code');
  const viewProjectText = useAutoTranslatedText('projects.view_project', 'Voir le projet');

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{title}</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const projectId = project.id.toString();
            
            const translatedTitle = useAutoTranslatedText(
              `projects.${projectId}.title`,
              project.title
            );
            
            const translatedDescription = useAutoTranslatedText(
              `projects.${projectId}.description`,
              project.description
            );

            const projectSource = project.client || 'Inconnu'; 
            const isPersonal = projectSource === 'Projet Personnel' || projectSource === 'Freelance';
            
            const badgeBg = isPersonal ? 'bg-blue-100' : 'bg-green-100';
            const badgeText = isPersonal ? 'text-blue-700' : 'text-green-700';
            
            const isLiveUrlValid = project.liveUrl && project.liveUrl !== '#';
            const scaleFactor = 0.28; 

            return (
              <div 
                key={project.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden group flex flex-col h-full" 
              >
                {/* --- APERÇU LIVE OU EN CONSTRUCTION --- */}
                <div className="relative w-full aspect-video overflow-hidden border-b border-gray-200 block">
                  
                  {isLiveUrlValid ? (
                    // CAS 1: Lien LIVE URL valide (Affiche l'IFRAME)
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block transition duration-300 hover:opacity-80"
                    >
                      <div 
                        className="absolute top-1/2 left-1/2 w-[1280px] h-[720px]" 
                        style={{ 
                            transform: `translate(-50%, -50%) scale(${scaleFactor})`,
                        }}
                      >
                        <iframe 
                          src={project.liveUrl} 
                          title={`Aperçu de ${project.title}`}
                          width="100%" 
                          height="100%" 
                          scrolling="no" 
                          frameBorder="0"
                          className="pointer-events-none" 
                        />
                      </div>
                    </a>
                  ) : (
                    // CAS 2: Lien LIVE URL INVALIDE (Affiche le message en construction)
                    <ConstructionPreview title={translatedTitle} />
                  )}
                </div>
                
                {/* --- CONTENU DU PROJET --- */}
                <div className="p-6 flex flex-col flex-grow">
                  
                  <div className="flex items-center mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 mr-2">{translatedTitle}</h3>
                    <span 
                      className={`${badgeBg} ${badgeText} text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0`}
                    >
                      {projectSource}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{translatedDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* --- LIENS --- */}
                  <div className="flex space-x-4">
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a 
                        href={project.githubUrl}
                        className="text-gray-600 hover:text-primary transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {codeText}
                      </a>
                    )}
                    {isLiveUrlValid && (
                      <a 
                        href={project.liveUrl}
                        className="text-primary hover:text-secondary transition font-semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {viewProjectText}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;