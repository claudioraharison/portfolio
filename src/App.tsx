import React from 'react';
import { AutoTranslationProvider } from './contexts/AutoTranslationContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import './index.css';

const App: React.FC = () => {
  return (
    <AutoTranslationProvider>
      <div className="App">
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </AutoTranslationProvider>
  );
};

export default App;