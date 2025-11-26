import React from 'react';
import type { Experience as ExperienceType } from '../types';
import { experiences } from '../data/portfolioData';
import { useAutoTranslatedText } from '../hooks/useAutoTranslatedText';

const Experience: React.FC = () => {
  const title = useAutoTranslatedText('experience.title', 'Expérience Professionnelle');

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{title}</h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp: ExperienceType) => {
            const expId = exp.id.toString();
            
            const translatedPosition = useAutoTranslatedText(
              `experience.${expId}.position`, 
              exp.position
            );
            
            const translatedCompany = useAutoTranslatedText(
              `experience.${expId}.company`, 
              exp.company
            );

            return (
              <div key={exp.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{translatedPosition}</h3>
                    <p className="text-lg text-primary font-medium">{translatedCompany}</p>
                  </div>
                  <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">
                  {exp.description.map((item, index) => {
                    const translatedDescription = useAutoTranslatedText(
                      `experience.${expId}.description.${index}`,
                      item
                    );
                    return <li key={index}>{translatedDescription}</li>;
                  })}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;