import React from 'react';
import grama from '../assets/11754566_4827591.jpg';
import { useAutoTranslatedText } from '../hooks/useAutoTranslatedText';

const Hero: React.FC = () => {
  const title = useAutoTranslatedText('hero.title', 'Développeur Front-end & Back-end');
  const subtitle = useAutoTranslatedText('hero.subtitle', 'Passionné par la création d\'applications web modernes avec React, TypeScript et Node.js. Je transforme des idées en solutions digitales élégantes et performantes.');
  const projectsBtn = useAutoTranslatedText('hero.projects_btn', 'Voir mes projets');
  const contactBtn = useAutoTranslatedText('hero.contact_btn', 'Me contacter');
  const altText = useAutoTranslatedText('hero.image_alt', 'Nirina Claudio RAHARISON - Développeur Fullstack');

  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-10 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Partie texte */}
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {title.split(' ').map((word, index) => 
                word === 'Front-end' || word === 'Back-end' ? (
                  <span key={index} className="text-primary">{word} </span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {subtitle}
            </p>
            <div className="flex space-x-4">
              <a 
                href="#projects" 
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition"
              >
                {projectsBtn}
              </a>
              <a 
                href="#contact" 
                className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition"
              >
                {contactBtn}
              </a>
            </div>
          </div>

          {/* Partie image - TAILLE MAXIMISÉE */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Image très grande pour occuper l'espace */}
              <div className="w-[320px] h-[320px] lg:w-[384px] lg:h-[384px] xl:w-[450px] xl:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={grama}
                  alt={altText}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;