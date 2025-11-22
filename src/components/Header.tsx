import React, { useState, useEffect, useRef } from 'react';
import profileImage from '../assets/claudio.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fermer le menu en cliquant en dehors
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
    };

    // Fermer le menu avec la touche Échap
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    // Fermer le menu en appuyant sur le bouton retour (mobile)
    const handlePopState = () => {
      if (isMenuOpen) {
        closeMenu();
      }
    };

    // Ajouter les écouteurs d'événements
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('popstate', handlePopState);

    // Empêcher le défilement quand le menu est ouvert
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Nettoyer les écouteurs
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "#home", label: "Accueil" },
    { href: "#about", label: "À propos" },
    { href: "#skills", label: "Compétences" },
    { href: "#projects", label: "Projets" },
    { href: "#experience", label: "Expérience" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Photo de profil */}
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary shadow-md">
              <img 
                src={profileImage}
                alt="Nirina Claudio RAHARISON"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback si l'image ne charge pas
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback avatar si pas d'image */}
              <div className="hidden w-full h-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                NC
              </div>
            </div>
            
            {/* Nom et prénom */}
            <div className="text-2xl font-bold text-primary">
              <div>Nirina Claudio</div>
              <div className="text-lg">RAHARISON</div>
            </div>
          </div>
          
          {/* Menu desktop - caché sur mobile */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-gray-700 hover:text-primary transition-all duration-200 relative group"
              >
                {link.label}
                {/* Soulignement qui part du centre - Desktop seulement */}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
              </a>
            ))}
          </div>

          {/* Bouton menu burger - visible seulement sur mobile */}
          <button 
            ref={buttonRef}
            className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg 
              className="w-6 h-6 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu mobile - s'affiche quand le burger est cliqué */}
        <div 
          ref={menuRef}
          className={`
            md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
          `}
        >
          <div className="flex flex-col py-4">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href} 
                className="px-6 py-3 text-gray-700 hover:text-primary transition-all duration-200 relative group border-r-4 border-transparent hover:border-primary hover:bg-blue-50"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Overlay sombre quand le menu est ouvert - pour mobile */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/20 z-40 top-0 left-0 w-full h-full"
            onClick={closeMenu}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;