import React from 'react';

interface ConstructionPreviewProps {
  title: string;
}

const ConstructionPreview: React.FC<ConstructionPreviewProps> = ({ title }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-600">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="40" 
        height="40" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-blue-900 mb-3"
      >
        {/* Icône de Construction / Clé à molette (wrench) */}
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-2.43 2.43a2 2 0 0 0-.7 1.6v.9a1 1 0 0 0 1 1H9a1 1 0 0 0 1 1v.9a1 1 0 0 0 1 1h.7a2 2 0 0 0 1.6-.7l2.43-2.43a6 6 0 0 1 7.94-7.94l-3.77 3.77z"/>
      </svg>
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        {title}
      </h3>
      <p className="text-sm text-center mt-1">
        Aperçu non disponible. Site en cours de développement.
      </p>
    </div>
  );
};

export default ConstructionPreview;