export type Language = 'fr' | 'en' | 'mg';

interface TranslationCache {
  [key: string]: {
    [targetLang: string]: string;
  };
}

class AutoTranslationService {
  private cache: TranslationCache = {};
  // private currentLanguage: Language = 'fr';

  async translateText(text: string, targetLang: Language): Promise<string> {
    if (targetLang === 'fr') return text;
    
    const cacheKey = this.generateCacheKey(text);
    
    // Vérifier le cache
    if (this.cache[cacheKey]?.[targetLang]) {
      return this.cache[cacheKey][targetLang];
    }

    try {
      // API Google Translate
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const translatedText = data[0][0][0];
      
      // Mettre en cache
      if (!this.cache[cacheKey]) {
        this.cache[cacheKey] = {};
      }
      this.cache[cacheKey][targetLang] = translatedText;
      
      return translatedText;
    } catch (error) {
      console.warn('Erreur de traduction pour:', text, error);
      return text;
    }
  }

  async translateObject(obj: Record<string, any>, targetLang: Language): Promise<Record<string, any>> {
    const translatedObj: Record<string, any> = {};
    const translationPromises: Promise<void>[] = [];

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        translationPromises.push(
          this.translateText(value, targetLang).then(translated => {
            translatedObj[key] = translated;
          })
        );
      } else if (typeof value === 'object' && value !== null) {
        translationPromises.push(
          this.translateObject(value, targetLang).then(translated => {
            translatedObj[key] = translated;
          })
        );
      } else {
        translatedObj[key] = value;
      }
    }

    await Promise.all(translationPromises);
    return translatedObj;
  }

  private generateCacheKey(text: string): string {
    return btoa(unescape(encodeURIComponent(text))).substring(0, 32);
  }

  setLanguage(lang: Language): void {
    // this.currentLanguage = lang;
    localStorage.setItem('autoTranslationLanguage', lang);
  }

  getLanguage(): Language {
    return (localStorage.getItem('autoTranslationLanguage') as Language) || 'fr';
  }

  clearCache(): void {
    this.cache = {};
  }

  getCacheSize(): number {
    return Object.keys(this.cache).length;
  }
}

export const autoTranslationService = new AutoTranslationService();