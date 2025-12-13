import React from 'react';
import { TbX } from 'react-icons/tb';
import { FaQuestionCircle } from 'react-icons/fa';
import type { Skill } from '../types';

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: Skill | null;
  getCategoryLabel: (category: string) => string;
  skillIcons: { [key: string]: React.ComponentType<any> };
  modalClose: string;
  modalCategory: string;
  modalDescription: string;
}

const SkillModal: React.FC<SkillModalProps> = ({
  isOpen,
  onClose,
  skill,
  getCategoryLabel,
  skillIcons,
  modalClose,
  modalCategory,
  modalDescription
}) => {
  if (!isOpen || !skill) return null;

  const IconComponent = skillIcons[skill.name] || FaQuestionCircle;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-xl">
                <IconComponent className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{skill.name}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label={modalClose}
            >
              <TbX className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {modalCategory}
              </span>
              <div className="mt-1">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-900/10 text-blue-900 font-medium">
                  {getCategoryLabel(skill.category)}
                </span>
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {modalDescription}
              </span>
              <p className="mt-2 text-gray-700 leading-relaxed">
                {skill.description || "Aucune description disponible pour cette compétence."}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-900/90 transition-colors duration-200"
              >
                {modalClose}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillModal;