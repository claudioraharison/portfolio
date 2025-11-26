import React from 'react';
import { projects } from '../data/portfolioData';
import { useAutoTranslatedText } from '../hooks/useAutoTranslatedText';

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

            return (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{translatedTitle}</h3>
                  <p className="text-gray-600 mb-4">{translatedDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
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
                    {project.liveUrl && project.liveUrl !== '#' && (
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