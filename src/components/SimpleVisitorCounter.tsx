// components/VisitorCounter.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Eye, RefreshCw, AlertCircle, Key, Shield } from 'lucide-react';
import CryptoJS from 'crypto-js';

const VisitorCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [counterLoaded, setCounterLoaded] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [counterData, setCounterData] = useState<{ today: number; total: number }>({ today: 0, total: 0 });
  const [counterType, setCounterType] = useState<'primary' | 'local'>('local');
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  const ENCRYPTED_PASSWORD_HASH = 'c9f69947af94021b86a1593f0e737a95071815cbe3767c1a9aacea0b0f7d7a10';
  const ENCRYPTION_KEY = 'visitor-counter-secret-key-2024';

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

  // Charger les données locales
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Charger le compteur total depuis localStorage
      const savedTotal = localStorage.getItem('counter_total');
      let total = 0; // Valeur par défaut
      
      if (savedTotal) {
        const decrypted = decryptData(savedTotal);
        if (decrypted) {
          total = parseInt(decrypted, 10);
        } else {
          total = parseInt(savedTotal, 10);
        }
      }

      // Charger les visites d'aujourd'hui
      const todayKey = `counter_${new Date().toDateString()}`;
      const savedToday = localStorage.getItem(todayKey);
      let today = 0;
      
      if (savedToday) {
        const decrypted = decryptData(savedToday);
        today = decrypted ? parseInt(decrypted, 10) : parseInt(savedToday, 10);
      }

      // Incrémenter la visite actuelle
      const sessionKey = 'counter_session_tracked';
      if (!sessionStorage.getItem(sessionKey)) {
        today += 1;
        total += 1;
        
        // Sauvegarder
        localStorage.setItem(todayKey, encryptData(today.toString()));
        localStorage.setItem('counter_total', encryptData(total.toString()));
        sessionStorage.setItem(sessionKey, 'true');
      }

      setCounterData({ today, total });
    } catch (error) {
      console.error('Erreur chargement données locales:', error);
    }
  }, []);

  // Code HTML complet pour l'iframe
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
          font-family: Arial, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }
        .counter-wrapper {
          text-align: center;
          padding: 10px;
        }
        .counter-link {
          color: #3b82f6;
          text-decoration: none;
          font-size: 12px;
          display: block;
          margin-bottom: 10px;
        }
        .counter-link:hover {
          text-decoration: underline;
        }
        .counter-value {
          font-size: 32px;
          font-weight: bold;
          color: #1f2937;
          margin: 10px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .counter-label {
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .loading {
          color: #9ca3af;
          font-size: 14px;
        }
        .error {
          color: #ef4444;
          font-size: 12px;
          padding: 10px;
          background: #fef2f2;
          border-radius: 6px;
        }
      </style>
    </head>
    <body>
      <div class="counter-wrapper">
        <a href="https://www.counters-free.net/" class="counter-link" target="_blank">
          COUNTER-free
        </a>
        
        <div id="counter-display">
          <div class="counter-value">0</div>
          <div class="counter-label">Total visiteurs</div>
        </div>
        
        <div id="counter-status" class="loading">
          Chargement du compteur en ligne...
        </div>
      </div>

      <script type='text/javascript' src='https://www.freevisitorcounters.com/auth.php?id=05c831b43a1825360ddb2529f328ec4d66014b44'></script>
      <script type="text/javascript" src="https://www.freevisitorcounters.com/en/home/counter/1465860/t/1"></script>
      
      <script>
        // Surveiller les changements dans le DOM
        let checkCount = 0;
        const maxChecks = 20;
        
        function checkForCounter() {
          checkCount++;
          
          // Chercher des éléments avec des nombres
          const allElements = document.body.getElementsByTagName('*');
          let foundValue = null;
          
          for (let elem of allElements) {
            const text = elem.textContent || '';
            // Chercher des nombres de 3 chiffres ou plus
            const matches = text.match(/\\b\\d{3,}\\b/g);
            if (matches) {
              for (let match of matches) {
                const num = parseInt(match, 10);
                if (num >= 100 && num <= 9999999) {
                  foundValue = num;
                  break;
                }
              }
            }
            if (foundValue) break;
          }
          
          if (foundValue) {
            document.getElementById('counter-display').innerHTML = \`
              <div class="counter-value">\${foundValue.toLocaleString()}</div>
              <div class="counter-label">Total visiteurs</div>
            \`;
            document.getElementById('counter-status').innerHTML = \`
              <div style="color: #10b981; font-size: 11px; margin-top: 5px;">
                ✓ Compteur en ligne actif
              </div>
            \`;
            
            // Envoyer la valeur au parent
            try {
              window.parent.postMessage({
                type: 'COUNTER_VALUE',
                value: foundValue
              }, '*');
            } catch (e) {
              console.log('Communication avec parent:', e);
            }
            
            return true;
          }
          
          if (checkCount < maxChecks) {
            setTimeout(checkForCounter, 500);
          } else {
            document.getElementById('counter-status').innerHTML = \`
              <div class="error">
                Compteur non détecté. Affichage des données locales.
              </div>
            \`;
          }
          return false;
        }
        
        // Démarrer la vérification après chargement
        setTimeout(checkForCounter, 1000);
        
        // Écouter les messages du parent
        window.addEventListener('message', function(event) {
          if (event.data.type === 'REQUEST_COUNTER_VALUE') {
            checkForCounter();
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
        if (onlineValue && onlineValue !== counterData.total) {
          console.log('Valeur compteur en ligne reçue:', onlineValue);
          setCounterData(prev => ({
            today: prev.today,
            total: onlineValue
          }));
          setCounterType('primary');
          setLoadingError(null);
          
          // Sauvegarder la valeur en ligne comme référence
          localStorage.setItem('counter_online_reference', onlineValue.toString());
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [counterData.total]);

  // Demander la valeur à l'iframe
  const requestCounterValue = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({
        type: 'REQUEST_COUNTER_VALUE'
      }, '*');
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
        e.preventDefault();
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
      console.log('🔓 Accès autorisé');
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
    setLoadingError('Rechargement du compteur...');
    
    setTimeout(() => {
      requestCounterValue();
    }, 1000);
  };

  if (!isVisible && !showPasswordInput) return null;

  const getCounterBadgeColor = () => {
    return counterType === 'primary' ? '#10b981' : '#f59e0b';
  };

  const getCounterBadgeText = () => {
    return counterType === 'primary' ? '🔐 En ligne' : '💾 Local';
  };

  return (
    <>
      {showPasswordInput && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
              color: '#333'
            }}>
              <Shield size={24} />
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
                Accès sécurisé
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe administrateur"
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 40px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    boxSizing: 'border-box'
                  }}
                  autoFocus
                />
                <Key 
                  size={16} 
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} 
                />
              </div>
              
              {error && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  color: '#ef4444', 
                  fontSize: '14px', 
                  marginTop: '8px',
                  padding: '8px',
                  backgroundColor: '#fef2f2',
                  borderRadius: '4px'
                }}>
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}

              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '24px',
                justifyContent: 'flex-end'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordInput(false);
                    setPassword('');
                    setError('');
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f3f4f6',
                    color: '#4b5563',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Annuler (ESC)
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Confirmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isVisible && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9998,
          maxWidth: '320px'
        }}>
          <div style={{
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '12px 16px',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={16} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>
                Statistiques visiteurs
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '10px',
                backgroundColor: getCounterBadgeColor(),
                padding: '2px 6px',
                borderRadius: '4px',
                color: 'white',
                fontWeight: '500'
              }}>
                {getCounterBadgeText()}
              </span>
              <button
                onClick={handleClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  fontSize: '20px',
                  lineHeight: '1'
                }}
                title="Fermer"
              >
                ×
              </button>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            borderTopLeftRadius: '0',
            borderTopRightRadius: '0',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            padding: '20px',
            border: '1px solid #e5e7eb',
            borderTop: 'none'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#3b82f6',
                    marginBottom: '4px'
                  }}>
                    {counterData.today}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    textTransform: 'uppercase'
                  }}>
                    Aujourd'hui
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    marginBottom: '4px',
                    background: 'transparent'
                  }}>
                    {counterData.total.toLocaleString()}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    textTransform: 'uppercase'
                  }}>
                    Total
                  </div>
                </div>
              </div>
            </div>

            {/* Iframe invisible pour charger le compteur */}
            <div style={{ display: 'none' }}>
              <iframe
                key={iframeKey}
                ref={iframeRef}
                srcDoc={counterHTML}
                title="Counter Free"
                sandbox="allow-scripts allow-same-origin"
                onLoad={() => {
                  setTimeout(requestCounterValue, 2000);
                }}
              />
            </div>

            {!isOnline && (
              <div style={{
                padding: '10px',
                backgroundColor: '#fef2f2',
                borderRadius: '6px',
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <AlertCircle size={14} color="#dc2626" />
                  <span style={{ color: '#dc2626', fontSize: '12px' }}>
                    Hors ligne - Données locales affichées
                  </span>
                </div>
              </div>
            )}

            {loadingError && (
              <div style={{
                padding: '10px',
                backgroundColor: '#fef2f2',
                borderRadius: '6px',
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                <span style={{ color: '#dc2626', fontSize: '12px' }}>
                  {loadingError}
                </span>
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <button
                onClick={handleRetry}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: '#f3f4f6',
                  color: '#4b5563',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                <RefreshCw size={14} />
                Synchroniser avec serveur
              </button>
            </div>

            <div style={{
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '1px solid #f3f4f6',
              textAlign: 'center'
            }}>
              <a
                href="https://www.counters-free.net/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Shield size={10} />
                Powered by COUNTER-free
              </a>
            </div>

            <div style={{
              marginTop: '10px',
              fontSize: '10px',
              color: '#9ca3af',
              textAlign: 'center'
            }}>
              {counterType === 'primary' 
                ? '✓ Données synchronisées en temps réel'
                : '⚠️ Utilisation des données locales'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VisitorCounter;