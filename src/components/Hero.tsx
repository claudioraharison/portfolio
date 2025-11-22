import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Développeur <span className="text-primary">Front-end & Back-end</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Passionné par la création d'applications web modernes avec React, TypeScript et Node.js. 
            Je transforme des idées en solutions digitales élégantes et performantes.
          </p>
          <div className="flex space-x-4">
            <a 
              href="#projects" 
              className="bg-primary text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-secondary hover:text-blue-300 transition"
            >
              Voir mes projets
            </a>
            <a 
              href="#contact" 
              className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-blue-500 transition"
            >
              Me contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;