import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">À propos de moi</h2>
          
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Partie texte - Alignement parfait */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-l-4 border-primary h-full">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <span className="font-semibold text-primary">Développeur front-end et back-end passionné et Géomaticien</span> de formation, 
                  je combine expertise technique et analyse spatiale pour créer des solutions digitales innovantes. 
                  Ma double compétence me permet d'appréhender des projets complexes sous des angles complémentaires.
                </p>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border-l-4 border-secondary h-full">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Je maîtrise les technologies modernes comme <span className="font-medium text-primary">React, TypeScript et Node.js</span> 
                  pour développer des applications web performantes, tout en appliquant la rigueur analytique 
                  acquise dans le domaine de la géomatique et de l'écotourisme.
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border-l-4 border-primary h-full">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Mon parcours unique me permet de traiter efficacement des données complexes et de 
                  développer des interfaces intuitives pour la visualisation d'informations techniques 
                  et géospatiales.
                </p>
              </div>
            </div>

            {/* Partie informations - Alignement parfait */}
            <div className="bg-gradient-to-br from-primary to-secondary p-1 rounded-2xl shadow-lg h-full">
              <div className="bg-white p-6 rounded-xl h-full flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Informations</h3>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition min-h-[60px]">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-lg">📍</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">Localisation</span>
                      <span className="text-gray-600 text-sm">Antananarivo, Madagascar</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition min-h-[60px]">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-lg">📧</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">Email</span>
                      <span className="text-gray-600 text-sm">claudio.raharison@gmail.com</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition min-h-[80px]">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-lg">📱</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">Téléphone</span>
                      <div className="space-y-1">
                        <span className="text-gray-600 text-sm block">+261 34 41 078 69</span>
                        <span className="text-gray-600 text-sm block">+261 37 68 590 47</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition min-h-[60px]">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-lg">✅</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">Disponibilité</span>
                      <span className="text-green-600 font-medium text-sm">Immédiate</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition min-h-[60px]">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-lg">🎯</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">Spécialités</span>
                      <span className="text-gray-600 text-sm">Dev front-end/back-end, Géomatique, DataViz, Géorisque</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section compétences transversales - Alignement parfait */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm hover:shadow-md transition h-full">
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl">💻</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Développement Front-end/back-end</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Applications web modernes avec React, TypeScript, Node.js et bases de données relationnelles
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-sm hover:shadow-md transition h-full">
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl">🗺️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Expertise Géomatique</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Analyse spatiale, SIG, traitement de données géographiques et études environnementales
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-sm hover:shadow-md transition h-full">
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Visualisation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Transformation de données complexes en interfaces claires, interactives et accessibles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;