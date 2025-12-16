// components/ProfileModal.tsx
import React, { useEffect, useRef, useState } from 'react';
import { X, Mail, Phone, MapPin, Download, Briefcase, Award, GraduationCap, Calendar, Languages, Code, Database, Map, Maximize2 } from 'lucide-react';
import { useAutoTranslatedText } from '../hooks/useAutoTranslatedText';
import cvclau from '../assets/Curriculum_Vitae_(Nirina_Claudio_RAHARISON).pdf';
import profileImage from '../assets/claudio.png';
import ImageModal from './ImageModal';

// Ajoutez vos images supplémentaires ici
// import image2 from '../assets/projects/project1.jpg'; // Remplacez par vos vraies images
// import image3 from '../assets/projects/project2.jpg';
// import image4 from '../assets/projects/project3.jpg';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  // Liste des images pour la galerie
  const galleryImages = [
    profileImage,
    // image2 || profileImage, // Fallback sur l'image principale si pas d'autres images
    // image3 || profileImage,
    // image4 || profileImage,
  ].filter(Boolean); // Retire les undefined si vous n'avez pas encore d'autres images
  
  // Textes traduits
  const role = useAutoTranslatedText('modal.role', 'Développeur Développeur Front-end & Back-end - Geomaticien expert en SIG et en Georisques - geoscientifique de formation');
  const contactTitle = useAutoTranslatedText('modal.contact', 'Contact');
  const educationTitle = useAutoTranslatedText('modal.education', 'Formation');
  const skillsTitle = useAutoTranslatedText('modal.skills', 'Compétences Techniques');
  const languagesTitle = useAutoTranslatedText('modal.languages', 'Langues');
  const downloadCv = useAutoTranslatedText('modal.download_cv', 'Télécharger le CV complet');
  const viewProjects = useAutoTranslatedText('modal.view_projects', 'Voir mes projets');
  const closeModal = useAutoTranslatedText('modal.close', 'Fermer');
  const availability = useAutoTranslatedText('modal.availability', 'Disponibilité');
  const driverLicense = useAutoTranslatedText('modal.driver_license', 'Permis de conduire');
  
  const technicalSkills = [
    { category: 'Frontend', skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'TailwindCSS', 'Bootstrap'] },
    { category: 'Backend', skills: ['Node.js', 'NestJS', 'Express.js', 'PHP', 'Python'] },
    { category: 'Bases de données', skills: ['PostgreSQL', 'MySQL', 'Redis', 'SQL'] },
    { category: 'Outils & DevOps', skills: ['Git', 'Docker', 'VS Code', 'Figma'] },
    { category: 'Géomatique', skills: ['QGIS', 'ArcGIS', 'AutoCAD', 'ENVI', 'Surfer', 'SGeMS'] },
    { category: 'Design', skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'UI/UX Design'] }
  ];
  
  const languages = [
    { language: 'Malagasy', level: 'Langue maternelle', levelText: 'Natif' },
    { language: 'Français', level: 'Niveau B2', levelText: 'Courant' },
    { language: 'Anglais', level: 'Intermédiaire', levelText: 'Professionnel' },
    { language: 'Allemand', level: 'Débutant', levelText: 'Notions' }
  ];
  
  const education = [
    { degree: 'Master 2 GECOGELL', institution: 'Université d\'Antananarivo', year: '2019-2021', specialty: 'Géotourisme, Écotourisme et Géorisque' },
    { degree: 'Master 1 GECOGELL', institution: 'Université d\'Antananarivo', year: '2018-2019', specialty: 'Bassins sédimentaires, Évolution Conservation' },
    { degree: 'Licence PSEG', institution: 'Université d\'Antananarivo', year: '2017-2018', specialty: 'Patrimoine Scientifique, Évolution, Gestion' },
    { degree: 'Formation Développement Web', institution: 'Front-end & Back-end', year: '2024-2025', specialty: 'Fullstack JavaScript' }
  ];
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  const handleCvDownload = () => {
    const link = document.createElement('a');
    link.href = cvclau;
    link.download = 'CV_Nirina_Claudio_RAHARISON.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleViewProjects = () => {
    window.location.hash = '#projects';
    onClose();
  };
  
  const openImageModal = () => {
    setIsImageModalOpen(true);
  };
  
  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };
  
  return (
    <>
      <div 
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={handleOverlayClick}
      >
        <div 
          ref={modalRef}
          className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl modal-fade-in"
        >
          {/* En-tête de la modale */}
          <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div 
                    className="w-20 h-20 rounded-full border-4 border-white/40 overflow-hidden shadow-xl cursor-pointer group-hover:border-white/60 transition-all duration-200"
                    onClick={openImageModal}
                  >
                    <img 
                      src={profileImage} 
                      alt="Nirina Claudio RAHARISON"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white font-bold text-2xl">
                            NC
                          </div>
                        `;
                      }}
                    />
                  </div>
                  {/* Bouton d'agrandissement */}
                  <button
                    onClick={openImageModal}
                    className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-500 shadow-lg"
                    aria-label="Agrandir la photo"
                  >
                    <Maximize2 size={14} />
                  </button>
                  {galleryImages.length > 1 && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {galleryImages.length}
                    </div>
                  )}
                </div>
                <div className="max-w-lg">
                  <h2 className="text-2xl font-bold">Nirina Claudio RAHARISON</h2>
                  <p className="text-blue-100 mt-2 flex items-center gap-2">
                    <Briefcase size={18} />
                    <span className="font-medium">{role}</span>
                  </p>
                  <p className="text-blue-100/90 text-sm mt-2">
                    Double compétence : Développement Web Front-end & back-end + Expertise en Géomatique & en Géosciences
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label={closeModal}
              >
                <X size={24} />
              </button>
            </div>
          </div>
          
          {/* Contenu de la modale */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
            {/* Grille principale */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colonne gauche - Contact & Info perso */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail size={20} className="text-blue-900" />
                    {contactTitle}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-gray-600 mt-0.5" />
                      <div>
                        <a href="tel:+261344107869" className="text-gray-800 hover:text-blue-900">
                          +261 34 41 078 69 / +261 37 68 590 47
                        </a>
                        <div className="text-sm text-gray-500">Mobile principal</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail size={18} className="text-gray-600 mt-0.5" />
                      <div>
                        <a href="mailto:claudionirina3@gmail.com" className="text-gray-800 hover:text-blue-900">
                          claudio.raharison@gmail.com
                        </a>
                        <div className="text-sm text-gray-500">Email professionnel</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-gray-600 mt-0.5" />
                      <div>
                        <div className="text-gray-800">Il A 18 D Amboditsiry</div>
                        <div className="text-sm text-gray-500">Antananarivo 101, Madagascar</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Languages size={20} className="text-blue-900" />
                    {languagesTitle}
                  </h3>
                  <div className="space-y-3">
                    {languages.map((lang, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">{lang.language}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{lang.levelText}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">Points forts pour recruteurs :</h4>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-900 mt-1">•</span>
                      <span>Double expertise tech + géosciences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-900 mt-1">•</span>
                      <span>Expérience en développement Front-end & Back-end</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-900 mt-1">•</span>
                      <span>Maîtrise des SIG et outils géomatiques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-900 mt-1">•</span>
                      <span>Polyvalent et adaptabilité rapide</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Colonne centrale - Compétences */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Code size={20} className="text-blue-900" />
                  {skillsTitle}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {technicalSkills.map((skillCategory, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        {skillCategory.category === 'Géomatique' ? (
                          <Map size={16} className="text-blue-900" />
                        ) : skillCategory.category === 'Bases de données' ? (
                          <Database size={16} className="text-blue-900" />
                        ) : (
                          <Code size={16} className="text-blue-900" />
                        )}
                        {skillCategory.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillCategory.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-300 hover:border-blue-900 hover:text-blue-900 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Section Formation et Disponibilité */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colonne Disponibilité & Info additionnelle (à gauche) */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center">
                      <Calendar size={20} className="text-blue-900" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">{availability}</div>
                      <div className="font-semibold text-green-900">Immédiate</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Award size={20} className="text-blue-900" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Certifications</div>
                      <div className="font-semibold text-blue-900">DELF B2, NG Conservation, ...</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                      <Briefcase size={20} className="text-blue-900" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">{driverLicense}</div>
                      <div className="font-semibold text-blue-900">Catégorie B</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Colonne Formation (à droite) */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <GraduationCap size={20} className="text-blue-900" />
                    {educationTitle}
                  </h3>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div key={index} className="border-l-4 border-blue-900 pl-4 py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-semibold text-gray-800">{edu.degree}</h5>
                            <p className="text-gray-600 text-sm">{edu.institution}</p>
                            <p className="text-gray-500 text-sm">{edu.specialty}</p>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Calendar size={14} />
                            {edu.year}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleCvDownload}
              className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-950 to-blue-900 text-white rounded-lg font-semibold hover:from-blue-900 hover:to-blue-950 transition-all shadow-lg hover:shadow-xl flex-1 group"
            >
              <Download size={20} className="group-hover:scale-110 transition-transform" />
              <span>{downloadCv}</span>
            </button>
            <button
              onClick={handleViewProjects}
              className="flex items-center justify-center gap-3 px-6 py-3 border-2 border-blue-900 text-blue-900 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition-all flex-1 group"
            >
              <Code size={20} className="group-hover:scale-110 transition-transform" />
              <span>{viewProjects}</span>
            </button>
            <a
              href="mailto:claudio.raharison@gmail.com"
              className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-semibold hover:from-blue-950 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl flex-1 group"
            >
              <Mail size={20} className="group-hover:scale-110 transition-transform" />
              <span>Contact direct</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Modale d'image en plein écran */}
      <ImageModal
        images={galleryImages}
        initialIndex={0}
        isOpen={isImageModalOpen}
        onClose={closeImageModal}
      />
    </>
  );
};

export default ProfileModal;