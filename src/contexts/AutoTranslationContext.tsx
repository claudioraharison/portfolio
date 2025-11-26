import React, { createContext, useContext, useState, useEffect} from 'react';
import type { ReactNode } from 'react';
import { autoTranslationService } from '../services/autoTranslationService';
import type { Language } from '../services/autoTranslationService';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
  isTranslating: boolean;
  registerText: (key: string, text: string) => void;
  clearAllTexts: () => void;
}

const AutoTranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useAutoTranslation = (): TranslationContextType => {
  const context = useContext(AutoTranslationContext);
  if (context === undefined) {
    throw new Error('useAutoTranslation must be used within a AutoTranslationProvider');
  }
  return context;
};

interface AutoTranslationProviderProps {
  children: ReactNode;
}

export const AutoTranslationProvider: React.FC<AutoTranslationProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');
  const [textRegistry, setTextRegistry] = useState<Record<string, string>>({});
  const [translatedTexts, setTranslatedTexts] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  // Charger la langue au démarrage
  useEffect(() => {
    const savedLanguage = autoTranslationService.getLanguage();
    setLanguageState(savedLanguage);
  }, []);

  // Traduire tous les textes quand la langue change
  useEffect(() => {
    const translateAllTexts = async (): Promise<void> => {
      if (language === 'fr' || Object.keys(textRegistry).length === 0) {
        setTranslatedTexts(textRegistry);
        return;
      }

      setIsTranslating(true);
      try {
        const translated = await autoTranslationService.translateObject(textRegistry, language);
        setTranslatedTexts(translated);
      } catch (error) {
        console.error('Erreur lors de la traduction automatique:', error);
        setTranslatedTexts(textRegistry);
      } finally {
        setIsTranslating(false);
      }
    };

    translateAllTexts();
  }, [language, textRegistry]);

  const setLanguage = (lang: Language): void => {
    autoTranslationService.setLanguage(lang);
    setLanguageState(lang);
  };

  const registerText = (key: string, text: string): void => {
    setTextRegistry(prev => {
      if (prev[key] === text) return prev;
      return { ...prev, [key]: text };
    });
  };

  const clearAllTexts = (): void => {
    setTextRegistry({});
    setTranslatedTexts({});
  };

  const t = (key: string, defaultText?: string): string => {
    if (language === 'fr') {
      return textRegistry[key] || defaultText || key;
    }
    return translatedTexts[key] || textRegistry[key] || defaultText || key;
  };

  const value: TranslationContextType = {
    language,
    setLanguage,
    t,
    isTranslating,
    registerText,
    clearAllTexts
  };

  return (
    <AutoTranslationContext.Provider value={value}>
      {children}
    </AutoTranslationContext.Provider>
  );
};