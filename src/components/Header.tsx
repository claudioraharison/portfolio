import React, { useState, useEffect, useRef } from 'react';
import profileImage from '../assets/claudio.png';
import { 
  Home, 
  User, 
  Wrench, 
  Rocket, 
  TrendingUp, 
  Mail,
  Menu,
  X,
  Globe
} from 'lucide-react';
import { useAutoTranslation } from '../contexts/AutoTranslationContext';
import { useAutoTranslatedText } from '../hooks/useAutoTranslatedText'; // Ajoutez cette importation

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { language, setLanguage } = useAutoTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  // Utilisez useAutoTranslatedText pour chaque texte de navigation
  const navHome = useAutoTranslatedText('nav.home', "Accueil");
  const navAbout = useAutoTranslatedText('nav.about', "À propos");
  const navSkills = useAutoTranslatedText('nav.skills', "Compétences");
  const navProjects = useAutoTranslatedText('nav.projects', "Projets");
  const navExperience = useAutoTranslatedText('nav.experience', "Expérience");
  const navContact = useAutoTranslatedText('nav.contact', "Contact");
  const languageTooltip = useAutoTranslatedText('nav.language_tooltip', "Langue");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const selectLanguage = (lang: 'fr' | 'en' | 'mg') => {
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }

      if (
        isLanguageOpen &&
        languageRef.current && 
        !languageRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMenuOpen) {
          closeMenu();
        }
        if (isLanguageOpen) {
          setIsLanguageOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    if (isMenuOpen || isLanguageOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isLanguageOpen]);

  // Mettez à jour les navLinks pour utiliser les textes traduits
  const navLinks = [
    { href: "#home", label: navHome, icon: Home },
    { href: "#about", label: navAbout, icon: User },
    { href: "#skills", label: navSkills, icon: Wrench },
    { href: "#projects", label: navProjects, icon: Rocket },
    { href: "#experience", label: navExperience, icon: TrendingUp },
    { href: "#contact", label: navContact, icon: Mail }
  ];

  const languages = [
    { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    // { code: 'mg' as const, name: 'Malagasy', flag: '🇲🇬' }
  ];

  const handleNavClick = (href: string, event: React.MouseEvent) => {
    event.preventDefault();
    closeMenu();
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const getDisplayMode = () => {
    if (windowWidth >= 1024) return 'desktop-full';
    if (windowWidth >= 768) return 'desktop-icons';
    return 'mobile';
  };

  const displayMode = getDisplayMode();

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
        : 'bg-white/90 backdrop-blur-sm shadow-sm'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary shadow-lg transition-all duration-300 ${
              isScrolled ? 'scale-90' : 'scale-100'
            }`}>
              <img 
                src={profileImage}
                alt="Nirina Claudio RAHARISON"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-full h-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                NC
              </div>
            </div>
            
            <div className="text-primary">
              <div className="text-lg sm:text-xl font-bold leading-tight">Nirina Claudio</div>
              <div className="text-sm sm:text-base font-semibold opacity-90">RAHARISON</div>
            </div>
          </div>

          {displayMode === 'desktop-full' && (
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a 
                    key={link.href}
                    href={link.href} 
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={`px-4 py-2 text-gray-700 hover:text-primary transition-all duration-200 relative group flex items-center space-x-2 ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-primary font-semibold'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    <IconComponent size={18} className="flex-shrink-0" />
                    <span>{link.label}</span>
                    
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                    
                    {activeSection === link.href.replace('#', '') && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                    )}
                  </a>
                );
              })}
            </div>
          )}

          {displayMode === 'desktop-icons' && (
            <div className="hidden md:flex lg:hidden items-center space-x-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a 
                    key={link.href}
                    href={link.href} 
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={`p-3 text-gray-700 hover:text-primary transition-all duration-200 relative group ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-primary font-semibold'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    <IconComponent size={20} className="flex-shrink-0" />
                    
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                    
                    {activeSection === link.href.replace('#', '') && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></span>
                    )}
                    
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {link.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {displayMode === 'desktop-full' && (
            <div className="hidden lg:block relative" ref={languageRef}>
              <button 
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary transition-all duration-200 rounded-lg border border-gray-300 hover:border-primary bg-white/50 backdrop-blur-sm"
              >
                <Globe size={18} />
                <span className="font-medium">
                  {languages.find(lang => lang.code === language)?.flag}
                </span>
                <span className="w-2 h-2 border-r border-b border-gray-400 transform rotate-45 transition-transform duration-200"></span>
              </button>

              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200/50 py-2 z-50">
                  {languages.map((languageItem) => (
                    <button
                      key={languageItem.code}
                      onClick={() => selectLanguage(languageItem.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-all duration-200 ${
                        language === languageItem.code
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-gray-700 hover:bg-gray-100/50'
                      }`}
                    >
                      <span className="text-lg">{languageItem.flag}</span>
                      <span>{languageItem.name}</span>
                      {language === languageItem.code && (
                        <span className="ml-auto w-2 h-2 bg-primary rounded-full"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {displayMode === 'desktop-icons' && (
            <div className="hidden md:flex lg:hidden relative" ref={languageRef}>
              <button 
                onClick={toggleLanguage}
                className="p-2 text-gray-600 hover:text-primary transition-all duration-200 rounded-lg hover:bg-gray-100/50 relative group"
                title={languageTooltip}
              >
                <Globe size={20} />
                
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {languageTooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </button>

              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200/50 py-2 z-50">
                  {languages.map((languageItem) => (
                    <button
                      key={languageItem.code}
                      onClick={() => selectLanguage(languageItem.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-all duration-200 ${
                        language === languageItem.code
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-gray-700 hover:bg-gray-100/50'
                      }`}
                    >
                      <span className="text-lg">{languageItem.flag}</span>
                      <span>{languageItem.name}</span>
                      {language === languageItem.code && (
                        <span className="ml-auto w-2 h-2 bg-primary rounded-full"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {displayMode === 'mobile' && (
            <div className="flex items-center space-x-2">
              <div className="md:hidden relative" ref={languageRef}>
                <button 
                  onClick={toggleLanguage}
                  className="p-2 text-gray-600 hover:text-primary transition-all duration-200 rounded-lg hover:bg-gray-100/50"
                >
                  <Globe size={20} />
                </button>

                {isLanguageOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200/50 py-2 z-50">
                    {languages.map((languageItem) => (
                      <button
                        key={languageItem.code}
                        onClick={() => selectLanguage(languageItem.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-all duration-200 ${
                          language === languageItem.code
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-gray-700 hover:bg-gray-100/50'
                        }`}
                      >
                        <span className="text-lg">{languageItem.flag}</span>
                        <span>{languageItem.name}</span>
                        {language === languageItem.code && (
                          <span className="ml-auto w-2 h-2 bg-primary rounded-full"></span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                ref={buttonRef}
                className="md:hidden p-2 text-gray-600 hover:text-primary transition-all duration-200 rounded-lg hover:bg-gray-100/50"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          )}
        </div>

        {displayMode === 'mobile' && (
          <>
            <div 
              ref={menuRef}
              className={`
                md:hidden absolute top-full left-0 w-full bg-white/80 backdrop-blur-lg shadow-xl border-t border-gray-200/30 transition-all duration-300 ease-out
                ${isMenuOpen 
                  ? 'opacity-100 translate-y-0 visible' 
                  : 'opacity-0 -translate-y-4 invisible'
                }
              `}
            >
              <div className="flex flex-col py-4 max-h-[80vh] overflow-y-auto">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <a 
                      key={link.href}
                      href={link.href} 
                      onClick={(e) => handleNavClick(link.href, e)}
                      className={`flex items-center space-x-3 px-6 py-4 transition-all duration-200 relative group ${
                        activeSection === link.href.replace('#', '')
                          ? 'text-primary font-semibold'
                          : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      <IconComponent size={20} className="flex-shrink-0" />
                      <span className="font-medium">{link.label}</span>
                      
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                    </a>
                  );
                })}
              </div>
            </div>

            {(isMenuOpen || isLanguageOpen) && (
              <div 
                className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 top-0 left-0 w-full h-full"
                onClick={() => {
                  closeMenu();
                  setIsLanguageOpen(false);
                }}
              />
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;