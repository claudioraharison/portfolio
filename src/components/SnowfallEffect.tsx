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
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-[-20px] rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
            opacity: Math.random() * 0.7 + 0.3,
            animation: `snowfall ${Math.random() * 10 + 5}s linear ${Math.random() * 5}s infinite`,
          }}
        />
      ))}
      
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-20px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SnowfallEffect;