// components/SnowfallEffect.tsx
import React, { useEffect, useState, useMemo } from 'react';

// Définir un type pour les propriétés CSS avec variables custom
type CSSPropertiesWithVars = React.CSSProperties & {
  '--drift'?: string;
};

const SnowfallEffect: React.FC = () => {
  const [showSnow, setShowSnow] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const isDecemberOrJanuary = currentMonth === 12 || currentMonth === 1;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    setShowSnow(isDecemberOrJanuary);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Générer les styles des flocons une seule fois
  const snowflakeStyles = useMemo(() => {
    const styles: Array<{
      id: number;
      size: number;
      left: number;
      opacity: number;
      duration: number;
      delay: number;
      drift: number;
      isLarge: boolean;
    }> = [];
    const flakeCount = 30;
    
    for (let i = 0; i < flakeCount; i++) {
      const size = Math.random() * 6 + 2;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.4 + 0.6;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 10;
      const drift = (Math.random() - 0.5) * 80;
      
      styles.push({
        id: i,
        size,
        left,
        opacity,
        duration,
        delay,
        drift,
        isLarge: size > 5,
      });
    }
    
    return styles;
  }, []);

  if (!showSnow || isReducedMotion) return null;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {snowflakeStyles.map((flake) => {
          // Créer l'objet style avec le type étendu
          const style: CSSPropertiesWithVars = {
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowFall ${flake.duration}s linear ${flake.delay}s infinite`,
            '--drift': `${flake.drift}px`,
            background: flake.isLarge 
              ? 'radial-gradient(circle at center, rgba(255, 255, 255, 0.95) 20%, rgba(200, 220, 255, 0.6) 60%, transparent 100%)'
              : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 30%, rgba(255, 255, 255, 0.4) 70%, transparent 100%)',
            filter: `blur(${flake.size > 5 ? '0.6px' : '0.3px'})`,
          };
          
          return (
            <div
              key={flake.id}
              className="snowflake"
              style={style}
            />
          );
        })}
      </div>
      
      <style>{`
        .snowflake {
          position: absolute;
          top: -20px;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform, opacity;
          transform: translateZ(0);
        }
        
        .snowflake::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: transparent;
          box-shadow: 
            0 0 8px rgba(25, 50, 100, 0.6),
            0 0 12px rgba(20, 40, 80, 0.4),
            inset 0 0 4px rgba(255, 255, 255, 0.5);
          filter: blur(1px);
          opacity: 0.7;
          z-index: -1;
        }
        
        @keyframes snowFall {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) translateX(var(--drift, 0)) rotate(360deg);
          }
        }
        
        @media (max-width: 768px) {
          .snowflake {
            /* CHANGEMENT : augmentation de l'opacité pour plus de visibilité */
            opacity: 0.7 !important;
            filter: blur(0.25px) !important;
          }
        }
        
        @media (max-width: 480px) {
          .snowflake {
            /* CHANGEMENT : augmentation significative de la visibilité */
            opacity: 0.6 !important;
            filter: blur(0.2px) !important;
          }
          
          .snowflake::before {
            opacity: 0.8 !important;
            filter: blur(0.8px) !important;
            box-shadow: 
              0 0 6px rgba(25, 50, 100, 0.7),
              0 0 10px rgba(20, 40, 80, 0.5),
              inset 0 0 3px rgba(255, 255, 255, 0.6) !important;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .snowflake {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default SnowfallEffect;