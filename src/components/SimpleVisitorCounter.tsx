// components/VisitorCounter.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Lock, Eye, RefreshCw, AlertCircle, Key } from 'lucide-react';
import CryptoJS from 'crypto-js';

const VisitorCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [counterLoaded, setCounterLoaded] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [fallbackData, setFallbackData] = useState<number | null>(null);
  
  const scriptsLoadedRef = useRef(false);
  const safetyTimeoutRef = useRef<number | null>(null);

  const ENCRYPTED_PASSWORD_HASH = 'c9f69947af94021b86a1593f0e737a95071815cbe3767c1a9aacea0b0f7d7a10'; // SHA-256 de "claudio"
  
  // Clé de chiffrement pour le stockage (doit rester secrète côté client)
  const ENCRYPTION_KEY = 'visitor-counter-secret-key-2024';

  // Fonction pour vérifier le mot de passe
  const verifyPassword = (inputPassword: string): boolean => {
    try {
      // Hash du mot de passe saisi
      const hashedInput = CryptoJS.SHA256(inputPassword).toString();
      
      // Comparer avec le hash stocké
      const isValid = hashedInput === ENCRYPTED_PASSWORD_HASH;
      
      // Optionnel: journaliser les tentatives
      if (typeof window !== 'undefined') {
        const attempts = JSON.parse(localStorage.getItem('password_attempts') || '[]');
        attempts.push({
          timestamp: new Date().toISOString(),
          success: isValid,
          ipHash: CryptoJS.SHA256(window.navigator.userAgent).toString().substring(0, 16)
        });
        
        // Garder seulement les 10 dernières tentatives
        if (attempts.length > 10) {
          attempts.shift();
        }
        
        localStorage.setItem('password_attempts', JSON.stringify(attempts));
      }
      
      return isValid;
    } catch (error) {
      console.error('Erreur lors de la vérification du mot de passe:', error);
      return false;
    }
  };

  // Fonction pour chiffrer/déchiffrer les données locales
  const encryptData = (data: string): string => {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  };

  const decryptData = (ciphertext: string): string => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
      const result = bytes.toString(CryptoJS.enc.Utf8);
      return result || '';
    } catch (error) {
      console.error('Erreur de déchiffrement:', error);
      return '';
    }
  };

  // Charger le compteur depuis localStorage (chiffré) comme fallback
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Essayer d'abord la version chiffrée
        const encryptedCount = localStorage.getItem('visitorCounter_encrypted');
        if (encryptedCount) {
          const decryptedCount = decryptData(encryptedCount);
          if (decryptedCount) {
            const count = parseInt(decryptedCount, 10);
            if (!isNaN(count) && count > 0) {
              setFallbackData(count);
              return;
            }
          }
        }
        
        // Fallback à la version non chiffrée pour compatibilité
        const savedCount = localStorage.getItem('visitorCounter_fallback');
        if (savedCount) {
          const count = parseInt(savedCount, 10);
          if (!isNaN(count) && count > 0) {
            setFallbackData(count);
            // Migrer vers version chiffrée
            saveEncryptedCount(count);
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    }
  }, []);

  // Fonction pour sauvegarder le compteur de manière chiffrée
  const saveEncryptedCount = (count: number) => {
    try {
      const encryptedCount = encryptData(count.toString());
      localStorage.setItem('visitorCounter_encrypted', encryptedCount);
      
      // Sauvegarder aussi en clair pour compatibilité
      localStorage.setItem('visitorCounter_fallback', count.toString());
    } catch (error) {
      console.error('Erreur lors du chiffrement des données:', error);
    }
  };

  // Fonction de chargement du compteur
  const loadCounter = () => {
    try {
      console.log('🚀 Début du chargement du compteur...');
      setLoadingError(null);
      
      // Nettoyer les anciens scripts
      document.querySelectorAll('script[src*="freevisitorcounters"]').forEach(s => s.remove());
      scriptsLoadedRef.current = false;

      // Script d'authentification
      const authScript = document.createElement('script');
      authScript.src = 'https://www.freevisitorcounters.com/auth.php?id=563a80eaad0b117ba239981c798eeb7dc387390d';
      authScript.async = true;
      
      authScript.onerror = () => {
        console.error('❌ Erreur chargement auth script');
      };

      // Script du compteur
      const counterScript = document.createElement('script');
      counterScript.src = 'https://www.freevisitorcounters.com/en/home/counter/1465825/t/0';
      counterScript.async = true;
      
      counterScript.onload = () => {
        console.log('✅ Script de compteur chargé avec succès');
        scriptsLoadedRef.current = true;
        
        // Vérifier si le contenu a été injecté après un délai
        const contentCheckTimeout = window.setTimeout(() => {
          const counterDiv = document.getElementById('free-visitor-counter');
          if (counterDiv) {
            const hasRealContent = counterDiv.innerHTML.includes('counter') || 
                                   counterDiv.innerHTML.includes('digit') ||
                                   counterDiv.children.length > 1;
            
            console.log('📊 Contenu injecté:', hasRealContent, 'Nombre d\'enfants:', counterDiv.children.length);
            
            if (hasRealContent) {
              setCounterLoaded(true);
              setLoadingError(null);
              
              // Sauvegarder un fallback chiffré
              try {
                const counterText = counterDiv.textContent || '';
                const numbers = counterText.match(/\d+/g);
                if (numbers && numbers.length > 0) {
                  const count = parseInt(numbers[0], 10);
                  if (!isNaN(count)) {
                    saveEncryptedCount(count);
                    setFallbackData(count);
                  }
                }
              } catch (e) {
                console.log('⚠️ Impossible d\'extraire les données du compteur');
              }
            } else {
              console.warn('⚠️ Script chargé mais aucun contenu injecté');
              fallbackToLocalStorage();
            }
          }
        }, 1500);
        
        // Nettoyer le timeout
        return () => clearTimeout(contentCheckTimeout);
      };

      counterScript.onerror = (error) => {
        console.error('❌ Erreur chargement script compteur:', error);
        scriptsLoadedRef.current = false;
        fallbackToLocalStorage();
      };

      document.head.appendChild(authScript);
      document.head.appendChild(counterScript);

      // Timeout de sécurité
      safetyTimeoutRef.current = window.setTimeout(() => {
        console.log('⏱️ Timeout de sécurité - vérification de l\'état');
        if (!scriptsLoadedRef.current) {
          console.warn('⚠️ Timeout: scripts non chargés');
          fallbackToLocalStorage();
        }
      }, 5000);

    } catch (err) {
      console.error('❌ Erreur dans loadCounter:', err);
      fallbackToLocalStorage();
    }
  };

  // Fallback vers localStorage
  const fallbackToLocalStorage = () => {
    console.log('🔄 Activation du mode fallback');
    
    // Incrémenter le compteur local si c'est la première visite de la session
    if (typeof window !== 'undefined' && !sessionStorage.getItem('counter_viewed')) {
      const currentCount = fallbackData || 0;
      const newCount = currentCount + 1;
      
      saveEncryptedCount(newCount);
      setFallbackData(newCount);
      sessionStorage.setItem('counter_viewed', 'true');
    }
    
    setLoadingError('Le compteur externe n\'est pas disponible. Affichage des données locales.');
    setCounterLoaded(true);
  };

  // Charger le compteur seulement quand visible
  useEffect(() => {
    if (!isVisible) return;

    const timer = window.setTimeout(loadCounter, 100);
    
    return () => {
      clearTimeout(timer);
      if (safetyTimeoutRef.current !== null) {
        clearTimeout(safetyTimeoutRef.current);
        safetyTimeoutRef.current = null;
      }
      scriptsLoadedRef.current = false;
    };
  }, [isVisible]);

  // Gestionnaire de touches - CORRIGÉ: Ctrl+Shift+V
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Vérifier si Ctrl+Shift+V sont pressés
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        setShowPasswordInput(true);
        setPassword('');
        setError('');
        sessionStorage.removeItem('failed_attempts');
      }
      // Vérifier la touche Escape
      if (e.key === 'Escape') {
        if (showPasswordInput) {
          setShowPasswordInput(false);
          setPassword('');
          setError('');
          sessionStorage.removeItem('failed_attempts');
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
    
    // Vérifier si bloqué temporairement
    const failedAttempts = sessionStorage.getItem('failed_attempts') || '0';
    if (parseInt(failedAttempts) >= 3) {
      setError('Trop de tentatives échouées. Veuillez réessayer dans 30 secondes.');
      return;
    }
    
    // Vérifier le mot de passe via hash SHA-256
    if (verifyPassword(password)) {
      setIsVisible(true);
      setShowPasswordInput(false);
      setPassword('');
      setError('');
      sessionStorage.removeItem('failed_attempts');
      
      // Journaliser l'accès réussi
      console.log('🔓 Accès autorisé à', new Date().toLocaleTimeString());
    } else {
      const newAttempts = parseInt(failedAttempts) + 1;
      sessionStorage.setItem('failed_attempts', newAttempts.toString());
      
      if (newAttempts >= 3) {
        setError('Trop de tentatives échouées. Veuillez réessayer dans 30 secondes.');
        
        // Débloquer après 30 secondes
        setTimeout(() => {
          sessionStorage.removeItem('failed_attempts');
          console.log('🔓 Compte débloqué après 30 secondes');
        }, 30000);
      } else {
        setError(`Mot de passe incorrect (${3 - newAttempts} tentative(s) restante(s))`);
      }
      
      setPassword('');
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    // Nettoyer les scripts
    document.querySelectorAll('script[src*="freevisitorcounters"]').forEach(s => s.remove());
    if (safetyTimeoutRef.current !== null) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
    setCounterLoaded(false);
    setLoadingError(null);
  };

  const handleRetry = () => {
    setCounterLoaded(false);
    setLoadingError(null);
    loadCounter();
  };

  // Rien n'est affiché par défaut
  if (!isVisible && !showPasswordInput) return null;

  return (
    <>
      {/* Modal de mot de passe */}
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
              <Lock size={24} />
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
                Accès sécurisé aux statistiques
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe sécurisé"
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
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
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
                    sessionStorage.removeItem('failed_attempts');
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
                    fontWeight: '500',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                >
                  Confirmer
                </button>
              </div>
            </form>

            {/* <div style={{
              marginTop: '20px',
              padding: '12px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#64748b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Lock size={12} />
                <strong>Sécurité renforcée</strong>
              </div>
              <p style={{ margin: '4px 0' }}>
                • Mot de passe chiffré avec SHA-256
              </p>
              <p style={{ margin: '4px 0' }}>
                • Données locales protégées par AES
              </p>
              <p style={{ margin: '4px 0' }}>
                • 3 tentatives maximum autorisées
              </p>
            </div> */}

            {/* <div style={{
              marginTop: '16px',
              fontSize: '12px',
              color: '#6b7280',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0 }}>
                Appuyez sur <strong>Ctrl+Shift+V</strong> pour afficher cette fenêtre
              </p>
              <p style={{ margin: '4px 0 0 0' }}>
                <strong>ESC</strong> pour annuler • Mot de passe: <strong>claudio</strong>
              </p>
            </div> */}
          </div>
        </div>
      )}

      {/* Le compteur (seulement visible après authentification) */}
      {isVisible && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9998,
          maxWidth: '320px'
        }}>
          {/* En-tête avec bouton fermer */}
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
                backgroundColor: '#10b981',
                padding: '2px 6px',
                borderRadius: '4px',
                color: 'white'
              }}>
                🔐 Sécurisé
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

          {/* Contenu du compteur */}
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
            {/* Placeholder en attendant le chargement */}
            {!counterLoaded ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ 
                  display: 'inline-block',
                  width: '30px',
                  height: '30px',
                  border: '3px solid #f3f3f3',
                  borderTop: '3px solid #3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '15px'
                }} />
                <p style={{ margin: 0, color: '#6b7280' }}>
                  Chargement sécurisé des statistiques...
                </p>
              </div>
            ) : (
              <div id="free-visitor-counter">
                {/* Affichage d'erreur ou fallback */}
                {loadingError && (
                  <div style={{
                    padding: '15px',
                    backgroundColor: '#fef2f2',
                    borderRadius: '8px',
                    marginBottom: '15px',
                    border: '1px solid #fecaca'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <AlertCircle size={16} color="#dc2626" />
                      <span style={{ color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>
                        Mode local activé
                      </span>
                    </div>
                    <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>
                      {loadingError}
                    </p>
                  </div>
                )}

                {/* Fallback display */}
                {fallbackData !== null && (
                  <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <div style={{
                      fontSize: '42px',
                      fontWeight: 'bold',
                      color: '#1f2937',
                      marginBottom: '5px',
                      letterSpacing: '2px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {fallbackData.toLocaleString()}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}>
                      <Lock size={12} />
                      Visiteurs sécurisés
                    </div>
                  </div>
                )}

                {/* Zone pour le contenu injecté par le script */}
                <div style={{ 
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Le script externe injectera son contenu ici */}
                </div>

                {/* Bouton de rafraîchissement */}
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
                      fontWeight: '500',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#e5e7eb';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <RefreshCw size={14} />
                    Rafraîchir les données
                  </button>
                </div>
              </div>
            )}

            {/* Indicateur de sécurité */}
            <div style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: '#f0f9ff',
              borderRadius: '6px',
              border: '1px solid #e0f2fe',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Lock size={12} color="#0369a1" />
                <span style={{ fontSize: '11px', color: '#0369a1' }}>
                  Données chiffrées avec AES-256 • Protection SHA-256
                </span>
              </div>
            </div>

            {/* Lien vers free-counters */}
            <div style={{
              marginTop: '10px',
              paddingTop: '10px',
              borderTop: '1px solid #f3f4f6',
              textAlign: 'center'
            }}>
              <a
                href="https://www.free-counters.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#3b82f6'}
                onMouseOut={(e) => e.currentTarget.style.color = '#6b7280'}
              >
                Powered by Free-Counters.org
              </a>
            </div>

            {/* Indicateur de raccourci clavier */}
            <div style={{
              marginTop: '10px',
              fontSize: '10px',
              color: '#9ca3af',
              textAlign: 'center'
            }}>
              Ctrl+Shift+V pour afficher • ESC pour fermer
            </div>
          </div>

          {/* Style pour le spinner */}
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default VisitorCounter;