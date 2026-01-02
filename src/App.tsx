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

// Composant Home
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const switchToAllProjects = () => {
    navigate('/projects');
  };

  return (
    <>
      <Hero />
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
  // Solution optimale: utiliser directement ou déstructurer
  const { pathname } = useLocation();
  const isAllProjectsView = pathname === '/projects';

  return (
    <div className="App">
      <Header hideMenu={isAllProjectsView} />
      <SnowfallEffect />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<AllProjectsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AutoTranslationProvider>
        <MainLayout />
      </AutoTranslationProvider>
    </Router>
  );
};

export default App;