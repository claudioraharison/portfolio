import React, { useState, useRef } from 'react';
import { AutoTranslationProvider } from './contexts/AutoTranslationContext';
import Header from './components/Header';
import AllProjectsPage from './pages/AllProjects';

// Composants de la page d'accueil
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

// Styles et bibliothèques externes
import SnowfallEffect from './components/SnowfallEffect';
import './index.css';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

const App: React.FC = () => {
  const [isAllProjectsView, setIsAllProjectsView] = useState(false);
  const scrollPositionRef = useRef(0);

  // Fonction pour basculer vers la vue complète des projets
  const switchToAllProjects = () => {
    // Sauvegarder la position actuelle du scroll
    scrollPositionRef.current = window.scrollY;
    setIsAllProjectsView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fonction pour revenir à la vue d'accueil
  const switchToHome = () => {
    setIsAllProjectsView(false);
    
    // Utiliser setTimeout pour s'assurer que le DOM est mis à jour avant de restaurer la position
    setTimeout(() => {
      window.scrollTo({ 
        top: scrollPositionRef.current, 
        behavior: 'smooth' 
      });
    }, 100);
  };
  
  // Contenu de la page d'accueil
  const homeContent = (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects onViewAllClick={switchToAllProjects} />
      <Experience />
      <Contact />
    </>
  );
  
  // Contenu de la page complète des projets
  const allProjectsContent = (
    <AllProjectsPage onBackClick={switchToHome} />
  );

  return (
    <AutoTranslationProvider>
      <div className="App">
        {/* Passez la prop hideMenu au Header */}
        <Header hideMenu={isAllProjectsView} />
        <SnowfallEffect />
        {isAllProjectsView ? allProjectsContent : homeContent}
      </div>
    </AutoTranslationProvider>
  );
};

export default App;