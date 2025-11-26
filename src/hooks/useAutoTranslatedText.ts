import { useEffect } from 'react';
import { useAutoTranslation } from '../contexts/AutoTranslationContext';

export const useAutoTranslatedText = (key: string, text: string) => {
  const { registerText, t } = useAutoTranslation();

  useEffect(() => {
    registerText(key, text);
  }, [key, text, registerText]);

  return t(key, text);
};