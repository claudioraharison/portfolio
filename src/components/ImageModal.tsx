import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  images, 
  initialIndex = 0, 
  isOpen, 
  onClose 
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
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
  
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };
  
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Bouton fermer */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
          aria-label="Fermer"
        >
          <X size={28} />
        </button>
        
        {/* Image principale */}
        <div className="flex-1 flex items-center justify-center mb-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              aria-label="Image précédente"
            >
              <ChevronLeft size={32} />
            </button>
            
            <div className="relative w-full h-full max-h-[70vh] flex items-center justify-center">
              <img 
                src={images[currentIndex]} 
                alt={`Image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="w-full h-full max-w-2xl max-h-[70vh] bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center text-white font-bold text-2xl rounded-lg">
                      Image non disponible
                    </div>
                  `;
                }}
              />
            </div>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              aria-label="Image suivante"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
        
        {/* Miniatures */}
        {images.length > 1 && (
          <div className="flex justify-center items-center space-x-3 py-4 bg-black/30 rounded-lg">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                  index === currentIndex 
                    ? 'border-blue-500 scale-110' 
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
                aria-label={`Voir l'image ${index + 1}`}
              >
                <img 
                  src={image} 
                  alt={`Miniature ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full bg-gradient-to-br from-blue-800 to-purple-800 flex items-center justify-center text-white text-xs">
                        ${index + 1}
                      </div>
                    `;
                  }}
                />
              </button>
            ))}
          </div>
        )}
        
        {/* Indicateur */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;