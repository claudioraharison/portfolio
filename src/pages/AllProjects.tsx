import React, { useState, useMemo, useEffect } from 'react';
import { projects } from '../data/portfolioData';
import { useAutoTranslatedText } from '../hooks/useAutoTranslatedText';
import ConstructionPreview from '../components/ConstructionPreview';
import SnowfallEffect from '../components/SnowfallEffect';

interface AllProjectsPageProps {
  onBackClick: () => void;
}

const allCategories = ['Tout', ...new Set(projects.map(p => p.category || 'Autres'))];

const AllProjectsPage: React.FC<AllProjectsPageProps> = ({ onBackClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);

  // Textes de base traduits automatiquement
  const pageTitle = useAutoTranslatedText('Tous les Projets', 'Tous les Projets');
  const searchPlaceholder = useAutoTranslatedText('Rechercher par titre, tech...', 'Rechercher par titre, tech...');
  const backButtonText = useAutoTranslatedText('Retour à l\'accueil', 'Retour à l\'accueil');
  const codeText = useAutoTranslatedText('Code', 'Code');
  const viewProjectText = useAutoTranslatedText('Voir le site', 'Voir le site');
  const loadingText = useAutoTranslatedText('Chargement...', 'Chargement...');
  const noProjectsText = useAutoTranslatedText('Aucun projet trouvé', 'Aucun projet trouvé');

  // Gestion du retour avec indicateur de chargement
  const handleBackClick = () => {
    setIsNavigatingBack(true);
    setTimeout(() => {
      onBackClick();
      setIsNavigatingBack(false);
    }, 300);
  };

  // Filtrage
  const filteredProjects = useMemo(() => {
    let list = projects;
    if (activeCategory !== 'Tout') {
      list = list.filter(p => (p.category || 'Autres') === activeCategory);
    }
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(lowerTerm) ||
        p.description.toLowerCase().includes(lowerTerm) ||
        p.technologies.some(t => t.toLowerCase().includes(lowerTerm))
      );
    }
    return list;
  }, [searchTerm, activeCategory]);

  // Gestion du scroll
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const checkScroll = () => setShowScrollToTop(window.pageYOffset > 300);
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <SnowfallEffect />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6"> 
        <div className="container mx-auto">
          
          {/* En-tête + Bouton Retour */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 md:mb-0">{pageTitle}</h1>
            
            <button 
              onClick={handleBackClick} 
              disabled={isNavigatingBack}
              className={`flex items-center font-medium transition ${
                isNavigatingBack 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-blue-900 hover:text-blue-800'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              {isNavigatingBack ? loadingText : backButtonText}
            </button>
          </div>

          {/* Filtres et Recherche */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <input 
              type="text" 
              placeholder={searchPlaceholder} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-blue-900 focus:outline-none"
            />
            <div className="flex flex-wrap gap-2">
              {allCategories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === cat ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grille des Projets avec traduction automatique */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              // Logique du badge Client/Statut
              const projectSource = project.client || 'Inconnu'; 
              const isPersonal = projectSource === 'Projet Personnel' || projectSource === 'Freelance';
              const badgeBg = isPersonal ? 'bg-blue-900/20' : 'bg-green-100';
              const badgeText = isPersonal ? 'text-blue-900' : 'text-green-700';
              
              // Logique de validation du lien Live
              const isLiveUrlValid = project.liveUrl && project.liveUrl !== '#';

              return (
                <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-full">
                  
                  {/* IFRAME ou ConstructionPreview */}
                  <div className="w-full h-[200px] border-b border-gray-200 bg-gray-100 relative">
                    {isLiveUrlValid ? (
                      <iframe 
                        src={project.liveUrl} 
                        title={`Aperçu de ${project.title}`}
                        width="100%" 
                        height="100%" 
                        frameBorder="0"
                        scrolling="no"
                        className="pointer-events-none"
                      />
                    ) : (
                      <ConstructionPreview title={project.title} />
                    )}
                  </div>

                  {/* Carte de projet avec contenu traduit automatiquement */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* En-tête avec titre et badge */}
                    <div className="flex items-center mb-3">
                      <h3 className="text-xl font-bold text-gray-900 mr-2">{project.title}</h3>
                      {/* Badge Client/Statut */}
                      <span 
                        className={`${badgeBg} ${badgeText} text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0`}
                      >
                        {projectSource}
                      </span>
                    </div>
                    
                    <span className="text-xs font-bold text-blue-900 mb-2 uppercase tracking-wide">
                      {project.category || 'Autres'}
                    </span>
                    
                    <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{tech}</span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 pt-4 border-t border-gray-100">
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-gray-500 hover:text-blue-900 transition text-sm"
                        >
                          {codeText}
                        </a>
                      )}
                      {isLiveUrlValid && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-900 hover:text-blue-800 font-medium transition text-sm"
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

          {/* Message si aucun projet trouvé */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{noProjectsText}</p>
            </div>
          )}
        </div>

        {/* Bouton Scroll Top */}
        {showScrollToTop && (
          <button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-blue-900 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition z-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export default AllProjectsPage;