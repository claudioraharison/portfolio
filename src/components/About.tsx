import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Mes propos</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-6">
                Développeur fullstack passionné spécialisé dans les technologies modernes comme React, 
                TypeScript et Node.js. J'aime créer des applications web performantes et intuitives.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Mon expérience chez Rapex Group m'a permis de travailler sur des projets complexes 
                et de développer une expertise en développement front-end et back-end.
              </p>
              <p className="text-lg text-gray-600">
                Je suis constamment à la recherche de nouveaux défis et d'opportunités pour 
                améliorer mes compétences et contribuer à des projets innovants.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary to-secondary p-1 rounded-2xl">
              <div className="bg-white p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Informations</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Localisation :</span>
                    <span className="text-gray-600 ml-2">Antananarivo, Madagascar</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email :</span>
                    <span className="text-gray-600 ml-2">claudio.raharison@gmail.com</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Tel :</span>
                    <span className="text-gray-600 ml-2">+261 34 41 078 69 / +261 37 68 590 47</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Disponibilité :</span>
                    <span className="text-green-600 font-medium ml-2">Immédiate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;