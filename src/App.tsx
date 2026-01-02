import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
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
import VisitorCounter from './components/SimpleVisitorCounter';
import ServicesPage from './pages/ServicesPage';

// Composant Home
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const switchToAllProjects = () => {
    navigate('/projects'); // Note: pas de "/portfolio/" ici car basename est déjà "/portfolio"
  };

  return (
    <>
      <Hero onViewAllClick={switchToAllProjects}/>
      <About />
      <Skills />
      <Projects onViewAllClick={switchToAllProjects} />
      <Experience />
      <Contact />
      <VisitorCounter />
    </>
  );
};

// Composant pour la gestion du Layout principal
const MainLayout: React.FC = () => {
  const { pathname } = useLocation();
  
  // Les chemins seront maintenant relatifs au basename
  const isAllProjectsView = pathname === '/projects';
  const isServicesView = pathname === '/services';

  return (
    <div className="App">
      <Header hideMenu={isAllProjectsView || isServicesView} />
      <SnowfallEffect />
      <Routes>
        {/* Routes relatives au basename="/portfolio" */}
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<AllProjectsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        {/* Route catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router basename="/portfolio">
      <AutoTranslationProvider>
        <MainLayout />
      </AutoTranslationProvider>
    </Router>
  );
};

export default App;