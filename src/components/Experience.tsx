import React from 'react';
import type { Experience as ExperienceType } from '../types'; // Renommer le type
import { experiences } from '../data/portfolioData';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Expérience Professionnelle</h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp: ExperienceType) => ( // Utiliser le type renommé
            <div key={exp.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-lg text-primary font-medium">{exp.company}</p>
                </div>
                <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-sm mt-2 md:mt-0">
                  {exp.period}
                </span>
              </div>
              
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">
                {exp.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;