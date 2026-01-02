import React from 'react';
import { projects } from '../data/portfolioData';
import { useAutoTranslatedText } from '../hooks/useAutoTranslatedText';
import ConstructionPreview from './ConstructionPreview'; 

// Définition du type de props
interface ProjectsProps {
  onViewAllClick: () => void; // Le composant accepte maintenant cette fonction
}

const Projects: React.FC<ProjectsProps> = ({ onViewAllClick }) => {
  const title = useAutoTranslatedText('projects.title', 'Mes Projets');
  const codeText = useAutoTranslatedText('projects.code', 'Code');
  const viewProjectText = useAutoTranslatedText('projects.view_project', 'Voir le projet');
  const viewAllText = useAutoTranslatedText('projects.view_all', 'Voir tous les projets');

  // N'afficher que les 3 premiers projets
  const displayedProjects = projects.slice(0, 3);

  // Logique Conditionnelle pour le bouton : il doit y avoir plus de 3 projets
  const shouldShowViewAllButton = projects.length > 3;

  // La fonction de clic appelle la prop onViewAllClick
  const handleViewAllClick = (event: React.MouseEvent) => {
    event.preventDefault(); 
    onViewAllClick(); // <-- Utilisation de la prop
  };

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{title}</h2>
        
        {/* Grille de projets à la place du slider */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => {
            const projectId = project.id.toString();
            
            const translatedTitle = useAutoTranslatedText(
              `projects.${projectId}.title`,
              project.title
            );
            
            const translatedDescription = useAutoTranslatedText(
              `projects.${projectId}.description`,
              project.description
            );

            // Logique du badge Client/Statut
            const projectSource = project.client || 'Inconnu'; 
            const isPersonal = projectSource === 'Projet Personnel' || projectSource === 'Freelance';
            const badgeBg = isPersonal ? 'bg-blue-100' : 'bg-green-100';
            const badgeText = isPersonal ? 'text-blue-900' : 'text-green-700';
            
            // Logique de validation du lien Live
            const isLiveUrlValid = project.liveUrl && project.liveUrl !== '#';
            
            // Vérifier si l'URL est une image (extensions d'image courantes)
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'];
            const isImageUrl = isLiveUrlValid && imageExtensions.some(ext => 
              project.liveUrl!.toLowerCase().endsWith(ext)
            ) || (isLiveUrlValid && project.liveUrl!.includes('mastertableLogo')); // Vérification spécifique pour le logo

            return (
              <div key={project.id} className="h-full">
                <div 
                  className="bg-white rounded-xl shadow-lg overflow-hidden group flex flex-col h-full border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* --- APERÇU LIVE, IMAGE OU EN CONSTRUCTION --- */}
                  <div className="relative w-full aspect-video overflow-hidden border-b border-gray-200 block">
                    
                    {isLiveUrlValid ? (
                      isImageUrl ? (
                        // Afficher l'image qui couvre tout le div
                        <a 
                          href={project.liveUrl!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full h-full"
                        >
                          <img 
                            src={project.liveUrl!} 
                            alt={`Aperçu de ${project.title}`}
                            className="w-full h-full object-cover transition duration-300 hover:opacity-90"
                          />
                        </a>
                      ) : (
                        // Afficher l'iframe pour les URLs web
                        <a 
                          href={project.liveUrl!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block transition duration-300 hover:opacity-80"
                        >
                          <div 
                            className="absolute top-1/2 left-1/2 w-[1280px] h-[720px]" 
                            style={{ 
                                transform: 'translate(-50%, -50%) scale(0.28)',
                            }}
                          >
                            <iframe 
                              src={project.liveUrl!} 
                              title={`Aperçu de ${project.title}`}
                              width="100%" 
                              height="100%" 
                              scrolling="no" 
                              frameBorder="0"
                              className="pointer-events-none" 
                            />
                          </div>
                        </a>
                      )
                    ) : (
                      // Affichage du composant "En construction"
                      <ConstructionPreview title={translatedTitle} />
                    )}
                  </div>
                  
                  {/* --- CONTENU DU PROJET --- */}
                  <div className="p-6 flex flex-col flex-grow">
                    
                    <div className="flex items-center mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 mr-2">{translatedTitle}</h3>
                      {/* Badge Client/Statut */}
                      <span 
                        className={`${badgeBg} ${badgeText} text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0`}
                      >
                        {projectSource}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{translatedDescription}</p>
                    
                    {/* Technologies (alignées vers le bas) */}
                    <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-blue-900/10 text-blue-900 px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Liens GitHub et Live */}
                    <div className="flex space-x-4">
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <a 
                          href={project.githubUrl}
                          className="text-gray-600 hover:text-blue-900 transition"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {codeText}
                        </a>
                      )}
                      {isLiveUrlValid && (
                        <a 
                          href={project.liveUrl!}
                          className="text-blue-900 hover:text-blue-800 transition font-semibold"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {viewProjectText}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- BOUTON VOIR TOUS LES PROJETS (Conditionnel) --- */}
        {shouldShowViewAllButton && (
            <div className="text-center mt-12">
              <a
                href="#" // Pas de lien réel, la navigation est gérée par JavaScript
                onClick={handleViewAllClick} // <-- Appel de la fonction parente
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-900 hover:bg-blue-800 transition duration-300 transform hover:scale-105 cursor-pointer"
              >
                {viewAllText}
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
        )}
        {/* -------------------------------------------------- */}
      </div>
    </section>
  );
};

export default Projects;