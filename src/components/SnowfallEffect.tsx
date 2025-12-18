// components/SnowfallEffect.tsx
import React, { useEffect, useState } from 'react';

const SnowfallEffect: React.FC = () => {
  const [showSnow, setShowSnow] = useState(false);

  useEffect(() => {
    // Vérifier si nous sommes en décembre ou janvier
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // 1-12
    const isDecemberOrJanuary = currentMonth === 12 || currentMonth === 1;
    
    setShowSnow(isDecemberOrJanuary);
  }, []);

  if (!showSnow) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {Array.from({ length: 80 }).map((_, i) => {
        const size = Math.random() * 5 + 2;
        const isBigFlake = size > 5; // Les plus gros flocons
        
        return (
          <div
            key={i}
            className="absolute top-[-20px] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: 'white',
              opacity: Math.random() * 0.7 + 0.3,
              animation: `snowfall ${Math.random() * 10 + 5}s linear ${Math.random() * 5}s infinite`,
              // Ombre bleu nuit avec 50% de transparence
              boxShadow: isBigFlake 
                ? `0 0 8px rgba(30, 60, 114, 0.5),
                   0 0 12px rgba(25, 50, 100, 0.4),
                   0 0 16px rgba(20, 40, 80, 0.3)`
                : `0 0 4px rgba(30, 60, 114, 0.5),
                   0 0 6px rgba(25, 50, 100, 0.4)`,
              filter: 'blur(0.2px)',
            }}
          />
        );
      })}
      
      {/* Ajoutons quelques flocons avec des ombres colorées variées */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`color-${i}`}
          className="absolute top-[-20px] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 3}px`,
            height: `${Math.random() * 4 + 3}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            opacity: Math.random() * 0.6 + 0.4,
            animation: `snowfall ${Math.random() * 12 + 8}s linear ${Math.random() * 7}s infinite`,
            // Variations d'ombres bleues pour plus de profondeur
            boxShadow: `
              0 0 6px rgba(25, 80, 160, 0.6),
              0 0 10px rgba(15, 60, 140, 0.4),
              0 0 15px rgba(10, 40, 120, 0.3),
              inset 0 0 2px rgba(255, 255, 255, 0.8)
            `,
            filter: 'blur(0.3px)',
          }}
        />
      ))}
      
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-20px) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(25vh) translateX(${Math.random() * 15 - 7.5}px) rotate(90deg) scale(1.05);
          }
          50% {
            transform: translateY(50vh) translateX(${Math.random() * 15 - 7.5}px) rotate(180deg) scale(1);
          }
          75% {
            transform: translateY(75vh) translateX(${Math.random() * 15 - 7.5}px) rotate(270deg) scale(0.95);
          }
          100% {
            transform: translateY(100vh) translateX(0px) rotate(360deg) scale(1);
          }
        }
        
        /* Animation subtile de scintillement pour certains flocons */
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.4;
            box-shadow: 0 0 6px rgba(30, 60, 114, 0.5);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 10px rgba(40, 80, 160, 0.7);
          }
        }
      `}</style>
    </div>
  );
};

export default SnowfallEffect;