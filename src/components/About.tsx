import React from 'react';
import { useAutoTranslatedText } from '../hooks/useAutoTranslatedText';

const About: React.FC = () => {
  const title = useAutoTranslatedText('about.title', 'A propos');
  
  // Textes pour la première section avec parties en couleur
  const intro1Part1 = useAutoTranslatedText('about.intro1.part1', 'Développeur front-end et back-end passionné et Géomaticien');
  const intro1Part2 = useAutoTranslatedText('about.intro1.part2', ' de formation, je combine expertise technique et analyse spatiale pour créer des solutions digitales innovantes. Ma double compétence me permet d\'appréhender des projets complexes sous des angles complémentaires.');
  
  // Textes pour la deuxième section avec parties en couleur
  const intro2Part1 = useAutoTranslatedText('about.intro2.part1', 'Je maîtrise les technologies modernes comme ');
  const intro2Tech = useAutoTranslatedText('about.intro2.tech', 'React, TypeScript et Node.js');
  const intro2Part2 = useAutoTranslatedText('about.intro2.part2', ' pour développer des applications web performantes, tout en appliquant la rigueur analytique acquise dans le domaine de la géomatique et de l\'écotourisme.');
  
  const intro3 = useAutoTranslatedText('about.intro3', 'Mon parcours unique me permet de traiter efficacement des données complexes et de développer des interfaces intuitives pour la visualisation d\'informations techniques et géospatiales.');
  
  const infoTitle = useAutoTranslatedText('about.info_title', 'Informations');
  const location = useAutoTranslatedText('about.location', 'Localisation');
  const locationValue = useAutoTranslatedText('about.location_value', 'Antananarivo, Madagascar');
  const email = useAutoTranslatedText('about.email', 'Email');
  const phone = useAutoTranslatedText('about.phone', 'Téléphone');
  const availability = useAutoTranslatedText('about.availability', 'Disponibilité');
  const availabilityValue = useAutoTranslatedText('about.availability_value', 'Immédiate');
  const specialties = useAutoTranslatedText('about.specialties', 'Spécialités');
  const specialtiesValue = useAutoTranslatedText('about.specialties_value', 'Dev front-end/back-end, Géomatique, DataViz, Géorisque');
  
  const devTitle = useAutoTranslatedText('about.dev_title', 'Développement Front-end/back-end');
  const devDesc = useAutoTranslatedText('about.dev_desc', 'Applications web modernes avec React, TypeScript, Node.js et bases de données relationnelles');
  const geoTitle = useAutoTranslatedText('about.geo_title', 'Expertise Géomatique');
  const geoDesc = useAutoTranslatedText('about.geo_desc', 'Analyse spatiale, SIG, traitement de données géographiques et études environnementales');
  const dataTitle = useAutoTranslatedText('about.data_title', 'Data Visualisation');
  const dataDesc = useAutoTranslatedText('about.data_desc', 'Transformation de données complexes en interfaces claires, interactives et accessibles');

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">{title}</h2>
          
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Partie texte - Alignement parfait */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-l-4 border-primary h-full">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <span className="font-semibold text-primary">{intro1Part1}</span>
                  {intro1Part2}
                </p>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border-l-4 border-secondary h-full">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {intro2Part1}
                  <span className="font-medium text-primary">{intro2Tech}</span>
                  {intro2Part2}
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border-l-4 border-primary h-full">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {intro3}
                </p>
              </div>
            </div>

            {/* Partie informations - Alignement parfait */}
            <div className="bg-gradient-to-br from-primary to-secondary p-1 rounded-2xl shadow-lg h-full">
              <div className="bg-white p-6 rounded-xl h-full flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">{infoTitle}</h3>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition min-h-[60px]">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-lg">📍</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">{location}</span>
                      <span className="text-gray-600 text-sm">{locationValue}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition min-h-[60px]">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-lg">📧</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">{email}</span>
                      <span className="text-gray-600 text-sm">claudio.raharison@gmail.com</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition min-h-[80px]">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-lg">📱</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">{phone}</span>
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
                      <span className="font-medium text-gray-900 block">{availability}</span>
                      <span className="text-green-600 font-medium text-sm">{availabilityValue}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition min-h-[60px]">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-lg">🎯</span>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-900 block">{specialties}</span>
                      <span className="text-gray-600 text-sm">{specialtiesValue}</span>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{devTitle}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {devDesc}
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-sm hover:shadow-md transition h-full">
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl">🗺️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{geoTitle}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {geoDesc}
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-sm hover:shadow-md transition h-full">
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{dataTitle}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {dataDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;