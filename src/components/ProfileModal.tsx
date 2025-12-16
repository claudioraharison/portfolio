// components/ProfileModal.tsx
import React, { useEffect, useRef, useState } from 'react';
import { X, Mail, Phone, MapPin, Download, Briefcase, Award, GraduationCap, Calendar, Languages, Code, Database, Map, Maximize2, Eye } from 'lucide-react';
import { useAutoTranslatedText } from '../hooks/useAutoTranslatedText';
import cvclau from '../assets/Curriculum_Vitae_(Nirina_Claudio_RAHARISON).pdf';
import profileImage from '../assets/claudio.png';
import ImageModal from './ImageModal';
// Importation de la page AllProjectsPage
import AllProjects from '../pages/AllProjects';
// Importation du Header - MAINTENANT UTILISÉ
import Header from './Header';

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
  // Nouvel état pour gérer l'affichage des projets
  const [showAllProjects, setShowAllProjects] = useState(false);
  
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
  const mobileMain = useAutoTranslatedText('modal.mobile_main', 'Mobile principal');
  const professionalEmail = useAutoTranslatedText('modal.professional_email', 'Email professionnel');
  const strengthsForRecruiters = useAutoTranslatedText('modal.strengths_for_recruiters', 'Points forts pour recruteurs :');
  const doubleExpertise = useAutoTranslatedText('modal.double_expertise', 'Double expertise tech + géosciences');
  const frontendBackendExperience = useAutoTranslatedText('modal.frontend_backend_experience', 'Expérience en développement Front-end & Back-end');
  const gisMastery = useAutoTranslatedText('modal.gis_mastery', 'Maîtrise des SIG et outils géomatiques');
  const versatileAdaptable = useAutoTranslatedText('modal.versatile_adaptable', 'Polyvalent et adaptabilité rapide');
  const certifications = useAutoTranslatedText('modal.certifications', 'Certifications');
  const categoryB = useAutoTranslatedText('modal.category_b', 'Catégorie B');
  const contactDirect = useAutoTranslatedText('modal.contact_direct', 'Contact direct');
  const malagasyNative = useAutoTranslatedText('modal.malagasy_native', 'Malagasy');
  const frenchLevel = useAutoTranslatedText('modal.french_level', 'Français');
  const englishLevel = useAutoTranslatedText('modal.english_level', 'Anglais');
  const germanLevel = useAutoTranslatedText('modal.german_level', 'Allemand');
  const nativeLevel = useAutoTranslatedText('modal.native_level', 'Natif');
  const professionalLevel = useAutoTranslatedText('modal.professional_level', 'Professionnel');
  const beginnerLevel = useAutoTranslatedText('modal.beginner_level', 'Notions');
  const doubleCompetence = useAutoTranslatedText('modal.double_competence', 'Double compétence : Développement Web Front-end & back-end + Expertise en Géomatique & en Géosciences');
  const immediateAvailability = useAutoTranslatedText('modal.immediate_availability', 'Immédiate');
  const expandPhoto = useAutoTranslatedText('modal.expand_photo', 'Agrandir la photo');
  
  // Textes supplémentaires pour l'éducation et compétences
  const master2Geogell = useAutoTranslatedText('modal.master2_geogell', 'Master 2 GECOGELL');
  const universityAntananarivo = useAutoTranslatedText('modal.university_antananarivo', 'Université d\'Antananarivo');
  const geotourismSpecialty = useAutoTranslatedText('modal.geotourism_specialty', 'Géotourisme, Écotourisme et Géorisque');
  const master1Geogell = useAutoTranslatedText('modal.master1_geogell', 'Master 1 GECOGELL');
  const sedimentaryBasinsSpecialty = useAutoTranslatedText('modal.sedimentary_basins_specialty', 'Bassins sédimentaires, Évolution Conservation');
  const licensePseg = useAutoTranslatedText('modal.license_pseg', 'Licence PSEG');
  const heritageScienceSpecialty = useAutoTranslatedText('modal.heritage_science_specialty', 'Patrimoine Scientifique, Évolution, Gestion');
  const webDevelopmentTraining = useAutoTranslatedText('modal.web_development_training', 'Formation Développement Web');
  const frontendBackendInstitution = useAutoTranslatedText('modal.frontend_backend_institution', 'Front-end & Back-end');
  const fullstackJavascriptSpecialty = useAutoTranslatedText('modal.fullstack_javascript_specialty', 'Fullstack JavaScript');
  
  // Textes pour les compétences techniques
  const frontendCategory = useAutoTranslatedText('modal.frontend_category', 'Frontend');
  const backendCategory = useAutoTranslatedText('modal.backend_category', 'Backend');
  const databasesCategory = useAutoTranslatedText('modal.databases_category', 'Bases de données');
  const toolsDevopsCategory = useAutoTranslatedText('modal.tools_devops_category', 'Outils & DevOps');
  const geomaticsCategory = useAutoTranslatedText('modal.geomatics_category', 'Géomatique');
  const designCategory = useAutoTranslatedText('modal.design_category', 'Design');
  
  const technicalSkills = [
    { 
      category: frontendCategory, 
      skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'TailwindCSS', 'Bootstrap'] 
    },
    { 
      category: backendCategory, 
      skills: ['Node.js', 'NestJS', 'Express.js', 'PHP', 'Python'] 
    },
    { 
      category: databasesCategory, 
      skills: ['PostgreSQL', 'MySQL', 'Redis', 'SQL'] 
    },
    { 
      category: toolsDevopsCategory, 
      skills: ['Git', 'Docker', 'VS Code', 'Figma'] 
    },
    { 
      category: geomaticsCategory, 
      skills: ['QGIS', 'ArcGIS', 'AutoCAD', 'ENVI', 'Surfer', 'SGeMS'] 
    },
    { 
      category: designCategory, 
      skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'UI/UX Design'] 
    }
  ];
  
  const languages = [
    { language: malagasyNative, level: useAutoTranslatedText('modal.mother_tongue', 'Langue maternelle'), levelText: nativeLevel },
    { language: frenchLevel, level: useAutoTranslatedText('modal.level_b2', 'Niveau B2'), levelText: useAutoTranslatedText('modal.fluent', 'Courant') },
    { language: englishLevel, level: useAutoTranslatedText('modal.intermediate', 'Intermédiaire'), levelText: professionalLevel },
    { language: germanLevel, level: useAutoTranslatedText('modal.beginner', 'Débutant'), levelText: beginnerLevel }
  ];
  
  const education = [
    { 
      degree: master2Geogell, 
      institution: universityAntananarivo, 
      year: '2019-2021', 
      specialty: geotourismSpecialty 
    },
    { 
      degree: master1Geogell, 
      institution: universityAntananarivo, 
      year: '2018-2019', 
      specialty: sedimentaryBasinsSpecialty 
    },
    { 
      degree: licensePseg, 
      institution: universityAntananarivo, 
      year: '2017-2018', 
      specialty: heritageScienceSpecialty 
    },
    { 
      degree: webDevelopmentTraining, 
      institution: frontendBackendInstitution, 
      year: '2024-2025', 
      specialty: fullstackJavascriptSpecialty 
    }
  ];
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showAllProjects) {
          setShowAllProjects(false);
        } else {
          onClose();
        }
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
  }, [isOpen, onClose, showAllProjects]);
  
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (showAllProjects) {
        setShowAllProjects(false);
      } else {
        onClose();
      }
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
  
  // Modification de la fonction pour afficher tous les projets dans la modale
  const handleViewProjects = () => {
    setShowAllProjects(true);
  };
  
  // Fonction pour revenir au profil depuis les projets
  const handleBackToProfile = () => {
    setShowAllProjects(false);
  };
  
  const openImageModal = () => {
    setIsImageModalOpen(true);
  };
  
  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };
  
  // Contenu du profil
  const profileContent = (
    <div 
      ref={modalRef}
      className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl modal-fade-in"
    >
      {/* En-tête de la modale */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 text-white p-4 sm:p-6 flex-shrink-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative group">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white/40 overflow-hidden shadow-xl cursor-pointer group-hover:border-white/60 transition-all duration-200"
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
                      <div class="w-full h-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
                        NC
                      </div>
                    `;
                  }}
                />
              </div>
              {/* Bouton d'agrandissement */}
              <button
                onClick={openImageModal}
                className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-blue-600 text-white p-1 sm:p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-500 shadow-lg"
                aria-label={expandPhoto}
              >
                <Maximize2 size={12} className="sm:size-[14px]" />
              </button>
              {galleryImages.length > 1 && (
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                  {galleryImages.length}
                </div>
              )}
            </div>
            <div className="max-w-lg">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Nirina Claudio RAHARISON</h2>
              <p className="text-blue-100 mt-1 sm:mt-2 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                <Briefcase size={14} className="sm:size-[18px]" />
                <span className="font-medium">{role}</span>
              </p>
              <p className="text-blue-100/90 text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2">
                {doubleCompetence}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 sm:p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
            aria-label={closeModal}
          >
            <X size={20} className="sm:size-[24px]" />
          </button>
        </div>
      </div>
      
      {/* Contenu de la modale - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Colonne gauche - Contact & Info perso */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Mail size={18} className="sm:size-[20px] text-blue-900" />
                {contactTitle}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Phone size={16} className="sm:size-[18px] text-gray-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <a href="tel:+261344107869" className="text-gray-800 hover:text-blue-900 text-sm sm:text-base truncate block">
                      +261 34 41 078 69 / +261 37 68 590 47
                    </a>
                    <div className="text-xs sm:text-sm text-gray-500">{mobileMain}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <Mail size={16} className="sm:size-[18px] text-gray-600 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <a href="mailto:claudionirina3@gmail.com" className="text-gray-800 hover:text-blue-900 text-sm sm:text-base truncate block">
                      claudio.raharison@gmail.com
                    </a>
                    <div className="text-xs sm:text-sm text-gray-500">{professionalEmail}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <MapPin size={16} className="sm:size-[18px] text-gray-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-gray-800 text-sm sm:text-base">Il A 18 D Amboditsiry</div>
                    <div className="text-xs sm:text-sm text-gray-500">Antananarivo 101, Madagascar</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Languages size={18} className="sm:size-[20px] text-blue-900" />
                {languagesTitle}
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm sm:text-base">{lang.language}</span>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-xs sm:text-sm text-gray-600">{lang.levelText}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-sm sm:text-base">{strengthsForRecruiters}</h4>
              <ul className="text-gray-700 space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-1 sm:gap-2">
                  <span className="text-blue-900 mt-0.5 sm:mt-1">•</span>
                  <span>{doubleExpertise}</span>
                </li>
                <li className="flex items-start gap-1 sm:gap-2">
                  <span className="text-blue-900 mt-0.5 sm:mt-1">•</span>
                  <span>{frontendBackendExperience}</span>
                </li>
                <li className="flex items-start gap-1 sm:gap-2">
                  <span className="text-blue-900 mt-0.5 sm:mt-1">•</span>
                  <span>{gisMastery}</span>
                </li>
                <li className="flex items-start gap-1 sm:gap-2">
                  <span className="text-blue-900 mt-0.5 sm:mt-1">•</span>
                  <span>{versatileAdaptable}</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Colonne centrale - Compétences */}
          <div className="lg:col-span-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <Code size={18} className="sm:size-[20px] text-blue-900" />
              {skillsTitle}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {technicalSkills.map((skillCategory, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                    {skillCategory.category === geomaticsCategory ? (
                      <Map size={14} className="sm:size-[16px] text-blue-900" />
                    ) : skillCategory.category === databasesCategory ? (
                      <Database size={14} className="sm:size-[16px] text-blue-900" />
                    ) : (
                      <Code size={14} className="sm:size-[16px] text-blue-900" />
                    )}
                    {skillCategory.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {skillCategory.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-2 py-1 sm:px-3 sm:py-1.5 bg-white text-gray-700 rounded-full text-xs sm:text-sm font-medium border border-gray-300 hover:border-blue-900 hover:text-blue-900 transition-colors"
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
        <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Colonne Disponibilité & Info additionnelle (à gauche) */}
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3 sm:p-4 border border-blue-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center flex-shrink-0">
                  <Calendar size={16} className="sm:size-[20px] text-blue-900" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">{availability}</div>
                  <div className="font-semibold text-green-900 text-sm sm:text-base">{immediateAvailability}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Award size={16} className="sm:size-[20px] text-blue-900" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">{certifications}</div>
                  <div className="font-semibold text-blue-900 text-sm sm:text-base">DELF B2, NG Conservation, ...</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 sm:p-4 border border-blue-100">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                  <Briefcase size={16} className="sm:size-[20px] text-blue-900" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">{driverLicense}</div>
                  <div className="font-semibold text-blue-900 text-sm sm:text-base">{categoryB}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Colonne Formation (à droite) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <GraduationCap size={18} className="sm:size-[20px] text-blue-900" />
                {educationTitle}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-blue-900 pl-3 sm:pl-4 py-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                      <div>
                        <h5 className="font-semibold text-gray-800 text-sm sm:text-base">{edu.degree}</h5>
                        <p className="text-gray-600 text-xs sm:text-sm">{edu.institution}</p>
                        <p className="text-gray-500 text-xs sm:text-sm">{edu.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                        <Calendar size={12} className="sm:size-[14px]" />
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
      
      {/* Actions - Toujours visible en bas */}
      <div className="border-t border-gray-200 bg-gray-50 p-3 sm:p-4 flex-shrink-0">
        <div className="flex flex-row gap-2 sm:gap-3 items-stretch">
          {/* Bouton Télécharger CV */}
          <button
            onClick={handleCvDownload}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:py-3 bg-gradient-to-r from-blue-950 to-blue-900 text-white rounded-lg font-semibold hover:from-blue-900 hover:to-blue-950 transition-all shadow-lg hover:shadow-xl flex-1 min-h-[44px] sm:min-h-[52px] group"
            title={downloadCv}
          >
            <Download size={18} className="sm:size-[20px] group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap text-sm sm:text-base">{downloadCv}</span>
            <span className="sm:hidden whitespace-nowrap text-xs font-medium">CV</span>
          </button>
          
          {/* Bouton Voir Projets */}
          <button
            onClick={handleViewProjects}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:py-3 border-2 border-blue-900 text-blue-900 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition-all flex-1 min-h-[44px] sm:min-h-[52px] group"
            title={viewProjects}
          >
            <Eye size={18} className="sm:size-[20px] group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap text-sm sm:text-base">{viewProjects}</span>
            <span className="sm:hidden whitespace-nowrap text-xs font-medium">Projets</span>
          </button>
          
          {/* Bouton Contact Direct */}
          <a
            href="mailto:claudio.raharison@gmail.com"
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:py-3 bg-gradient-to-r from-blue-900 to-blue-950 text-white rounded-lg font-semibold hover:from-blue-950 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl flex-1 min-h-[44px] sm:min-h-[52px] group"
            title={contactDirect}
          >
            <Mail size={18} className="sm:size-[20px] group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap text-sm sm:text-base">{contactDirect}</span>
            <span className="sm:hidden whitespace-nowrap text-xs font-medium">Contact</span>
          </a>
        </div>
      </div>
    </div>
  );

  // Contenu des projets en plein écran avec Header importé
  const projectsContent = (
    <div className="fixed inset-0 z-[60] bg-white overflow-hidden">
      {/* Header importé avec hideMenu=true pour cacher les menus */}
      <Header hideMenu={true} />
      
      {/* Conteneur principal pour AllProjectsPage avec décalage pour le Header */}
      <div className="h-full overflow-y-auto">
        <AllProjects 
          onBackClick={handleBackToProfile}
        />
      </div>
    </div>
  );

  return (
    <>
      {showAllProjects ? (
        // Affichage plein écran pour les projets
        projectsContent
      ) : (
        // Affichage modal pour le profil
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          {profileContent}
        </div>
      )}
      
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