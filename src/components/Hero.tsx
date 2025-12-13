import React, { useState, useRef } from 'react';
import grama from '../assets/11754566_4827591.jpg';
import { useAutoTranslatedText } from '../hooks/useAutoTranslatedText';
import cvclau from '../assets/Curriculum_Vitae_(Nirina_Claudio_RAHARISON).pdf'

const Hero: React.FC = () => {
  const title = useAutoTranslatedText('hero.title', 'Développeur Front-end & Back-end');
  const subtitle = useAutoTranslatedText('hero.subtitle', 'Passionné par la création d\'applications web modernes avec React, TypeScript et Node.js. Je transforme des idées en solutions digitales élégantes et performantes.');
  const projectsBtn = useAutoTranslatedText('hero.projects_btn', 'Voir mes projets');
  const contactBtn = useAutoTranslatedText('hero.contact_btn', 'Me contacter');
  const cvBtn = useAutoTranslatedText('hero.cv_btn', 'Voir mon CV');
  const altText = useAutoTranslatedText('hero.image_alt', 'Nirina Claudio RAHARISON - Développeur Front-end & Back-end - Geomaticien expert en SIG et en Georisques - geoscientifique de formation');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Remplacez par le chemin vers votre fichier PDF
  const cvPdf = cvclau;

  const openModal = () => {
    setIsModalOpen(true);
    setIsPdfLoading(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsPdfLoading(true); // Reset pour la prochaine ouverture
  };

  const handlePdfLoad = () => {
    setIsPdfLoading(false);
  };

  const handlePdfError = () => {
    setIsPdfLoading(false);
    console.error('Erreur lors du chargement du PDF');
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-blue-900/10 to-blue-800/20">
        <div className="container mx-auto px-10 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Partie texte */}
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                {title.split(' ').map((word, index) => 
                  word === 'Front-end' || word === 'Back-end' ? (
                    <span key={index} className="text-blue-900">{word} </span>
                  ) : (
                    <span key={index}>{word} </span>
                  )
                )}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#projects" 
                  className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-300 shadow-lg hover:shadow-xl"
                >
                  {projectsBtn}
                </a>
                <a 
                  href="#contact" 
                  className="border border-blue-900 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition duration-300 shadow-lg hover:shadow-xl"
                >
                  {contactBtn}
                </a>
                <button 
                  onClick={openModal}
                  className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-black transition duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {cvBtn}
                </button>
              </div>
            </div>

            {/* Partie image */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative">
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

      {/* Modale PDF */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <div className="bg-white rounded-2xl w-full max-w-6xl h-[85vh] flex flex-col shadow-2xl modal-fade-in">
            {/* En-tête de la modale */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-900/10 to-blue-800/10 rounded-t-2xl">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Curriculum Vitae</h3>
                <p className="text-gray-600 mt-1">{altText}</p>
              </div>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-2 rounded-full transition duration-300 group"
              >
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Conteneur PDF */}
            <div className="flex-1 relative">
              <iframe 
                ref={iframeRef}
                src={cvPdf}
                className="w-full h-full rounded-b-2xl"
                title="CV Nirina Claudio RAHARISON - Développeur Fullstack"
                onLoad={handlePdfLoad}
                onError={handlePdfError}
              />
              
              {/* Overlay de chargement */}
              {isPdfLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-b-2xl">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Chargement du CV...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Barre d'outils */}
            <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <div className="text-sm text-gray-500">
                Document professionnel - Mise à jour: {new Date().getFullYear()}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.open(cvPdf, '_blank')}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-900 transition duration-300 border border-gray-300 rounded-lg hover:border-blue-900"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Ouvrir dans un nouvel onglet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;