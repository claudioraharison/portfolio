// components/SimpleVisitorCounter.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Eye, RefreshCw, AlertCircle, Key, Shield, ExternalLink } from 'lucide-react';
import CryptoJS from 'crypto-js';

const VisitorCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [counterData, setCounterData] = useState<{ today: number; total: number }>({ today: 0, total: 0 });
  const [counterType, setCounterType] = useState<'primary' | 'local'>('local');
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  const ENCRYPTED_PASSWORD_HASH = 'c9f69947af94021b86a1593f0e737a95071815cbe3767c1a9aacea0b0f7d7a10';
  const ENCRYPTION_KEY = 'visitor-counter-secret-key-2024';

  // URLs
  const FREE_COUNTERS_MAIN_URL = "https://www.free-counters.org/";
  const YOUR_COUNTER_STATS_URL = "https://www.freevisitorcounters.com/en/home/stats/id/1466002";
  const YOUR_COUNTER_IMAGE_URL = "https://www.freevisitorcounters.com/en/counter/render/1466002/t/3";

  // Vérifier la connexion internet
  useEffect(() => {
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const verifyPassword = (inputPassword: string): boolean => {
    try {
      const hashedInput = CryptoJS.SHA256(inputPassword).toString();
      return hashedInput === ENCRYPTED_PASSWORD_HASH;
    } catch (error) {
      console.error('Erreur vérification mot de passe:', error);
      return false;
    }
  };

  const encryptData = (data: string): string => {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  };

  const decryptData = (ciphertext: string): string => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
      return bytes.toString(CryptoJS.enc.Utf8) || '';
    } catch (error) {
      return '';
    }
  };

  // Réinitialiser à 0
  const resetCounterToZero = () => {
    console.log('Réinitialisation du compteur à 0');
    
    setCounterData({ today: 0, total: 0 });
    
    localStorage.setItem('counter_total', encryptData('0'));
    
    const today = new Date().toISOString().split('T')[0];
    const todayKey = `counter_${today}`;
    localStorage.setItem(todayKey, encryptData('0'));
    
    sessionStorage.removeItem('counter_session_tracked');
  };

  // Charger les données locales
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedTotal = localStorage.getItem('counter_total');
      let total = 0;
      
      if (savedTotal) {
        const decrypted = decryptData(savedTotal);
        if (decrypted) {
          const parsed = parseInt(decrypted, 10);
          total = isNaN(parsed) ? 0 : parsed;
        } else {
          const parsed = parseInt(savedTotal, 10);
          total = isNaN(parsed) ? 0 : parsed;
        }
        
        // Corriger le bug 10
        if (total === 10) {
          console.log('Correction du bug: 10 -> 0');
          total = 0;
          localStorage.setItem('counter_total', encryptData('0'));
        }
      }

      const today = new Date().toISOString().split('T')[0];
      const todayKey = `counter_${today}`;
      const savedToday = localStorage.getItem(todayKey);
      let todayCount = 0;
      
      if (savedToday) {
        const decrypted = decryptData(savedToday);
        const parsed = decrypted ? parseInt(decrypted, 10) : parseInt(savedToday, 10);
        todayCount = isNaN(parsed) ? 0 : parsed;
      }

      const sessionKey = 'counter_session_tracked';
      const isAdminView = sessionStorage.getItem('counter_admin_mode');
      
      if (!sessionStorage.getItem(sessionKey) && !isAdminView) {
        todayCount += 1;
        total += 1;
        
        localStorage.setItem(todayKey, encryptData(todayCount.toString()));
        localStorage.setItem('counter_total', encryptData(total.toString()));
        sessionStorage.setItem(sessionKey, 'true');
        
        console.log('Nouvelle visite enregistrée:', { today: todayCount, total });
      }

      setCounterData({ today: todayCount, total });
    } catch (error) {
      console.error('Erreur chargement données locales:', error);
      setCounterData({ today: 0, total: 0 });
    }
  }, []);

  // Code HTML pour l'iframe
  const counterHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body {
          margin: 0;
          padding: 0;
          background: transparent;
          overflow: hidden;
          height: 1px;
          width: 1px;
        }
        .counter-container {
          position: absolute;
          left: -9999px;
          top: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }
      </style>
    </head>
    <body>
      <div id="free-counter-container" class="counter-container">
        <a href='https://www.free-counters.org/'>https://www.free-counters.org/</a>
        <script type='text/javascript' src='https://www.freevisitorcounters.com/auth.php?id=b6f4c67f39a02094045440811de692c3ecdef480'></script>
        <script type="text/javascript" src="https://www.freevisitorcounters.com/en/home/counter/1466002/t/3"></script>
      </div>
      
      <script>
        let counterValue = 0;
        let attempts = 0;
        const maxAttempts = 20;
        
        function extractCounterValue() {
          attempts++;
          
          const counterImage = document.querySelector('img.counterimg');
          if (counterImage) {
            const src = counterImage.src || '';
            const alt = counterImage.alt || '';
            
            const srcMatch = src.match(/(\\d+)\\.(png|jpg|gif)$/);
            if (srcMatch) {
              const num = parseInt(srcMatch[1], 10);
              if (!isNaN(num)) {
                counterValue = num;
                return true;
              }
            }
            
            const altMatch = alt.match(/(\\d+)/);
            if (altMatch) {
              const num = parseInt(altMatch[1], 10);
              if (!isNaN(num)) {
                counterValue = num;
                return true;
              }
            }
          }
          
          const allText = document.body.innerText || document.body.textContent || '';
          const numbers = allText.match(/\\b\\d{2,}\\b/g);
          
          if (numbers) {
            for (let numStr of numbers) {
              const num = parseInt(numStr, 10);
              if (num >= 1 && num <= 9999999 && !isNaN(num)) {
                if (numStr.length >= 2) {
                  counterValue = num;
                  return true;
                }
              }
            }
          }
          
          return false;
        }
        
        function sendValueToReact() {
          if (counterValue > 0) {
            try {
              window.parent.postMessage({
                type: 'COUNTER_VALUE',
                value: counterValue,
                source: 'free-counters.org',
                counterId: '1466002',
                timestamp: new Date().toISOString()
              }, '*');
            } catch (e) {
              console.error('Erreur envoi message:', e);
            }
            return true;
          }
          return false;
        }
        
        function monitorDOMChanges() {
          const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              if (mutation.addedNodes.length > 0) {
                if (extractCounterValue()) {
                  sendValueToReact();
                  observer.disconnect();
                }
              }
            });
          });
          
          observer.observe(document.body, {
            childList: true,
            subtree: true
          });
          
          setTimeout(() => {
            observer.disconnect();
            if (counterValue === 0 && attempts >= maxAttempts) {
              window.parent.postMessage({
                type: 'COUNTER_NOT_FOUND',
                message: 'Compteur non détecté'
              }, '*');
            }
          }, 10000);
        }
        
        setTimeout(() => {
          if (extractCounterValue()) {
            sendValueToReact();
          } else {
            monitorDOMChanges();
          }
        }, 3000);
        
        window.addEventListener('message', function(event) {
          if (event.data.type === 'REQUEST_COUNTER_VALUE') {
            attempts = 0;
            if (extractCounterValue()) {
              sendValueToReact();
            }
          }
        });
      </script>
    </body>
    </html>
  `;

  // Écouter les messages de l'iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'COUNTER_VALUE') {
        const onlineValue = event.data.value;
        
        if (onlineValue && onlineValue > 0 && onlineValue !== 10) {
          setCounterData(prev => ({
            today: prev.today,
            total: onlineValue
          }));
          
          setCounterType('primary');
          setLoadingError(null);
          
          localStorage.setItem('counter_online_reference', onlineValue.toString());
          localStorage.setItem('counter_total', encryptData(onlineValue.toString()));
          localStorage.setItem('counter_last_sync', new Date().toISOString());
        } else if (onlineValue === 10) {
          console.log('Valeur 10 ignorée');
          setLoadingError('Valeur invalide détectée');
        }
      } else if (event.data.type === 'COUNTER_NOT_FOUND') {
        setLoadingError('Impossible de lire free-counters.org');
        setCounterType('local');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const requestCounterValue = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'REQUEST_COUNTER_VALUE'
      }, '*');
      setLoadingError('Lecture de free-counters.org...');
    }
  };

  // Gestionnaire de raccourcis clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        sessionStorage.setItem('counter_admin_mode', 'true');
        setShowPasswordInput(true);
        setPassword('');
        setError('');
      }
      if (e.key === 'Escape') {
        if (showPasswordInput) {
          setShowPasswordInput(false);
          setPassword('');
          setError('');
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showPasswordInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verifyPassword(password)) {
      setIsVisible(true);
      setShowPasswordInput(false);
      setPassword('');
      setError('');
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleRetry = () => {
    setIframeKey(prev => prev + 1);
    setLoadingError('Connexion à free-counters.org...');
    
    setTimeout(() => {
      requestCounterValue();
    }, 1500);
  };

  // Fonctions pour ouvrir les liens
  const openFreeCountersMain = () => {
    window.open(FREE_COUNTERS_MAIN_URL, '_blank', 'noopener,noreferrer');
  };

  const openYourCounterStats = () => {
    window.open(YOUR_COUNTER_STATS_URL, '_blank', 'noopener,noreferrer');
  };

  const openCounterImage = () => {
    window.open(YOUR_COUNTER_IMAGE_URL, '_blank', 'noopener,noreferrer');
  };

  if (!isVisible && !showPasswordInput) return null;

  const getCounterBadgeColor = () => {
    return counterType === 'primary' ? 'bg-green-500' : 'bg-yellow-500';
  };

  const getCounterBadgeText = () => {
    return counterType === 'primary' ? '🌐 En ligne' : '💾 Local';
  };

  return (
    <>
      {/* Modal d'entrée du mot de passe */}
      {showPasswordInput && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-gray-800" />
              <h3 className="text-xl font-bold text-gray-900">
                Accès sécurisé
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe administrateur"
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg text-base outline-none transition-colors ${
                    error 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                  }`}
                  autoFocus
                />
                <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-md mb-4">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordInput(false);
                    setPassword('');
                    setError('');
                  }}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Annuler (ESC)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Confirmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Panneau des statistiques */}
      {isVisible && (
        <div className="fixed bottom-5 right-5 z-40 max-w-xs animate-slideIn">
          {/* En-tête */}
          <div className="bg-gray-800 text-white px-4 py-3 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">
                Statistiques visiteurs
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded font-medium ${getCounterBadgeColor()} text-white`}>
                {getCounterBadgeText()}
              </span>
              <button
                onClick={handleClose}
                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Fermer"
              >
                ×
              </button>
            </div>
          </div>

          {/* Contenu */}
          <div className="bg-white rounded-b-xl shadow-lg border border-gray-200 border-t-0 p-5">
            {/* Statistiques */}
            <div className="text-center mb-5">
              <div className="flex justify-around items-end">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {counterData.today}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Aujourd'hui
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-1 ${
                    counterData.total === 10 
                      ? 'bg-red-50 text-red-600 px-3 py-1 rounded-lg' 
                      : 'text-gray-900'
                  }`}>
                    {counterData.total.toLocaleString()}
                    {counterData.total === 10 && (
                      <span className="text-xs font-normal text-red-500 ml-2">
                        (bug)
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    Total
                  </div>
                </div>
              </div>
              
              {counterData.total === 10 && (
                <div className="mt-3 p-2 bg-red-50 rounded-lg text-xs text-red-600">
                  ⚠️ Valeur incorrecte. Cliquez sur "Réinitialiser à 0"
                </div>
              )}
            </div>

            {/* Boutons pour les liens */}
            <div className="space-y-3 mb-5">
              <button
                onClick={openYourCounterStats}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Tableau de bord (stats)
              </button>
              
              <button
                onClick={openCounterImage}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Voir l'image du compteur
              </button>
              
              <button
                onClick={openFreeCountersMain}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Site free-counters.org
              </button>
            </div>

            {/* Iframe invisible */}
            <div className="hidden">
              <iframe
                key={iframeKey}
                ref={iframeRef}
                srcDoc={counterHTML}
                title="Counter Free"
                sandbox="allow-scripts allow-same-origin"
                onLoad={() => {
                  setTimeout(requestCounterValue, 2500);
                }}
              />
            </div>

            {/* Messages d'état */}
            {!isOnline && (
              <div className="p-3 bg-red-50 rounded-lg mb-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-xs text-red-600">
                    Hors ligne - Données locales
                  </span>
                </div>
              </div>
            )}

            {loadingError && (
              <div className="p-3 bg-red-50 rounded-lg mb-4 text-center">
                <span className="text-xs text-red-600">
                  {loadingError}
                </span>
              </div>
            )}

            {/* Boutons d'action */}
            <div className="flex gap-3 mt-4 justify-center">
              <button
                onClick={handleRetry}
                disabled={!isOnline}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isOnline 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                Synchroniser
              </button>
              
              <button
                onClick={resetCounterToZero}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Réinitialiser à 0
              </button>
            </div>

            {/* Informations */}
            <div className="mt-5 pt-4 border-t border-gray-100 text-center">
              <div className="text-xs text-gray-600 mb-2">
                Compteur ID: <strong>1466002</strong> • Style: <strong>t/3</strong>
              </div>
              <div className="text-xs text-gray-400">
                {counterType === 'primary' 
                  ? '✓ Synchronisé avec free-counters.org'
                  : '⚠️ Données locales - Cliquez Synchroniser'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles d'animation */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default VisitorCounter;