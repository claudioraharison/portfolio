import React, { useEffect, useState } from 'react';
import { RefreshCw, AlertCircle, Key, Shield, Globe, HardDrive } from 'lucide-react';

// ============================================
// 🔑 CONFIGURATION
// ============================================
const CONFIG = {
  API_NAMESPACE: "claudio-portfolio-2025",
  PASSWORD_HASH: "c9f69947af94021b86a1593f0e737a95071815cbe3767c1a9aacea0b0f7d7a10", // demo123
  STORAGE_KEYS: {
    SESSION_GLOBAL: "visitor_session_global",
    SESSION_TODAY: "visitor_session_today",
    LOCAL_TOTAL: "visitor_total_count",
    LOCAL_TODAY_PREFIX: "visitor_today_"
  }
} as const;

// ============================================
// 🔧 UTILITAIRES
// ============================================
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getTodayKey(): string {
  return `${CONFIG.STORAGE_KEYS.LOCAL_TODAY_PREFIX}${new Date().toISOString().split('T')[0]}`;
}

// ============================================
// 🎯 COMPOSANT PRINCIPAL
// ============================================
const VisitorCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ today: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline'>('offline');

  // ============================================
  // 📊 LOGIQUE DE COMPTAGE AMÉLIORÉE
  // ============================================
  const fetchStats = async (shouldIncrement: boolean) => {
    setLoading(true);
    
    try {
      let totalCount = 0;
      let todayCount = 0;

      // Variables de session
      const hasVisitedGlobal = sessionStorage.getItem(CONFIG.STORAGE_KEYS.SESSION_GLOBAL);
      const hasVisitedToday = sessionStorage.getItem(CONFIG.STORAGE_KEYS.SESSION_TODAY);

      // ========================================
      // 1️⃣ API AVEC PROXY CORS MULTIPLE
      // ========================================
      try {
        const baseUrl = `https://api.counterapi.dev/v1/${CONFIG.API_NAMESPACE}/total`;
        const endpoint = shouldIncrement && !hasVisitedGlobal 
          ? `${baseUrl}/increment` 
          : baseUrl;
        
        // Liste de proxys CORS fiables (essaye dans l'ordre)
        const proxyOptions = [
          // Proxy 1: corsproxy.io (très fiable)
          `https://corsproxy.io/?${encodeURIComponent(endpoint)}`,
          // Proxy 2: thingproxy.freeboard.io
          `https://thingproxy.freeboard.io/fetch/${endpoint}`,
          // Proxy 3: api.allorigins.win
          `https://api.allorigins.win/raw?url=${encodeURIComponent(endpoint)}`,
          // Proxy 4: cors-anywhere (backup)
          `https://cors-anywhere.herokuapp.com/${endpoint}`,
        ];
        
        let response = null;
        
        // Essayer chaque proxy jusqu'à ce qu'un fonctionne
        for (const proxyUrl of proxyOptions) {
          try {
            console.log(`Essai avec proxy: ${proxyUrl}`);
            
            // Créer un AbortController pour timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // Timeout 8s
            
            response = await fetch(proxyUrl, { 
              method: 'GET',
              signal: controller.signal,
              headers: {
                'Accept': 'application/json',
              },
              mode: 'cors',
              cache: 'no-cache'
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
              console.log(`Proxy réussi: ${proxyUrl}`);
              break;
            }
          } catch (error) {
            console.warn(`Proxy échoué: ${error}`);
            continue;
          }
        }

        if (!response || !response.ok) {
          throw new Error('Tous les proxys ont échoué');
        }

        const data = await response.json();
        console.log('Données API reçues:', data);
        
        totalCount = data.count || 0;
        setApiStatus('online');

        // Marquer comme visité en session
        if (shouldIncrement && !hasVisitedGlobal) {
          sessionStorage.setItem(CONFIG.STORAGE_KEYS.SESSION_GLOBAL, 'true');
          console.log('Visiteur global incrémenté');
        }

        // Sauvegarder en backup local
        localStorage.setItem(CONFIG.STORAGE_KEYS.LOCAL_TOTAL, totalCount.toString());
        console.log(`Compteur total mis à jour: ${totalCount}`);

      } catch (error) {
        // Fallback: utiliser localStorage
        console.warn('API non accessible, passage en mode local:', error);
        setApiStatus('offline');
        
        const storedCount = localStorage.getItem(CONFIG.STORAGE_KEYS.LOCAL_TOTAL);
        totalCount = storedCount ? parseInt(storedCount, 10) : 0;

        // Incrémenter si nécessaire
        if (shouldIncrement && !hasVisitedGlobal) {
          totalCount += 1;
          localStorage.setItem(CONFIG.STORAGE_KEYS.LOCAL_TOTAL, totalCount.toString());
          sessionStorage.setItem(CONFIG.STORAGE_KEYS.SESSION_GLOBAL, 'true');
          console.log('Compteur local incrémenté:', totalCount);
        }
      }

      // ========================================
      // 2️⃣ COMPTEUR AUJOURD'HUI (LocalStorage)
      // ========================================
      const todayKey = getTodayKey();
      const storedTodayCount = localStorage.getItem(todayKey);
      todayCount = storedTodayCount ? parseInt(storedTodayCount, 10) : 0;

      // Incrémenter si première visite de la journée
      if (shouldIncrement && !hasVisitedToday) {
        todayCount += 1;
        localStorage.setItem(todayKey, todayCount.toString());
        sessionStorage.setItem(CONFIG.STORAGE_KEYS.SESSION_TODAY, 'true');
        console.log('Compteur du jour incrémenté:', todayCount);
      }

      // Mettre à jour l'état
      setStats({ today: todayCount, total: totalCount });
      console.log('Stats finales:', { today: todayCount, total: totalCount });

    } catch (error) {
      console.error('Erreur critique lors du comptage:', error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // 🔐 GESTION DU MOT DE PASSE
  // ============================================
  const verifyPassword = async (input: string): Promise<boolean> => {
    const hashedInput = await sha256(input);
    return hashedInput === CONFIG.PASSWORD_HASH;
  };

  const handlePasswordSubmit = async () => {
    const isValid = await verifyPassword(password);
    
    if (isValid) {
      setIsVisible(true);
      setShowPasswordInput(false);
      setError('');
      setPassword('');
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handlePasswordSubmit();
    }
  };

  // ============================================
  // ⌨️ RACCOURCIS CLAVIER
  // ============================================
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+V pour ouvrir
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        setShowPasswordInput(true);
      }
      
      // Escape pour fermer
      if (e.key === 'Escape') {
        setShowPasswordInput(false);
        setIsVisible(false);
        setError('');
        setPassword('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ============================================
  // 🚀 INITIALISATION
  // ============================================
  useEffect(() => {
    // Initialiser avec un petit délai pour éviter les conflits
    const timer = setTimeout(() => {
      fetchStats(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // ============================================
  // 🎨 RENDU CONDITIONNEL
  // ============================================
  if (!isVisible && !showPasswordInput) return null;

  const statusColor = apiStatus === 'online' ? 'bg-green-500' : 'bg-yellow-500';
  const statusText = apiStatus === 'online' ? 'Global API' : 'Local Mode';

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* ========================================
          MODAL MOT DE PASSE
      ======================================== */}
      {showPasswordInput && (
        <div className="bg-white rounded-xl p-6 shadow-2xl border border-gray-200 w-80 animate-in fade-in zoom-in duration-200">
          <div className="flex items-center gap-3 mb-4 text-gray-800">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold">Accès Restreint</h3>
          </div>
          
          <div className="space-y-3">
            <div className="relative">
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Code secret"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <Key className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            
            {error && (
              <p className="text-red-500 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {error}
              </p>
            )}
            
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowPasswordInput(false);
                  setError('');
                  setPassword('');
                }}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-md transition-colors"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================
          PANNEAU STATISTIQUES
      ======================================== */}
      {isVisible && (
        <div className="bg-gray-900 text-white rounded-2xl shadow-2xl overflow-hidden w-72 border border-gray-700 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 ${statusColor} rounded-full animate-pulse`}></div>
              <span className="text-[11px] font-black uppercase tracking-widest text-gray-300">
                Live Stats
              </span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>

          {/* Statistiques */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Aujourd'hui */}
              <div className="text-center p-3 bg-gray-800/50 rounded-xl border border-gray-700">
                <div className="text-2xl font-black text-blue-400">
                  {stats.today}
                </div>
                <div className="text-[9px] text-gray-500 uppercase mt-1 flex items-center justify-center gap-1">
                  <HardDrive className="w-3 h-3" /> Aujourd'hui
                </div>
              </div>

              {/* Total Global */}
              <div className="text-center p-3 bg-gray-800/50 rounded-xl border border-gray-700">
                <div className="text-2xl font-black text-green-400">
                  {loading ? '...' : stats.total}
                </div>
                <div className="text-[9px] text-gray-500 uppercase mt-1 flex items-center justify-center gap-1">
                  <Globe className="w-3 h-3" /> Total Global
                </div>
              </div>
            </div>

            {/* Bouton Actualiser */}
            <button
              onClick={() => fetchStats(false)}
              disabled={loading}
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Actualiser les données
            </button>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-800 text-[9px] text-gray-600 flex justify-between px-1 items-center">
              <span>ID: {CONFIG.API_NAMESPACE}</span>
              <span className={`font-bold ${apiStatus === 'online' ? 'text-green-400' : 'text-yellow-400'}`}>
                {apiStatus === 'online' ? '✓' : '⚠'} {statusText}
              </span>
            </div>
            
            {/* Note sur le mode */}
            {apiStatus === 'offline' && (
              <div className="mt-3 text-[8px] text-yellow-400 text-center">
                Mode local activé - les données sont sauvegardées sur votre appareil
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorCounter;