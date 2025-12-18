// components/SimpleVisitorCounter.tsx - Version sécurisée avec hash
import { Eye, Lock } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SHA256 } from 'crypto-js';

interface Visitor {
  id: string;
  timestamp: number;
  page: string;
  userAgent: string;
  sessionId: string;
}

const SimpleVisitorCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [todayCount, setTodayCount] = useState(0);
  const [uniqueTodayCount, setUniqueTodayCount] = useState(0);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  // ⚠️ REMPLACEZ CE HASH PAR LE VÔTRE (hash SHA-256 de votre mot de passe)
  const ADMIN_PASSWORD_HASH = 'c9f69947af94021b86a1593f0e737a95071815cbe3767c1a9aacea0b0f7d7a10';

  // Fonction pour vérifier le mot de passe
  const verifyPassword = (input: string): boolean => {
    const inputHash = SHA256(input).toString();
    return inputHash === ADMIN_PASSWORD_HASH;
  };

  // Créer un ID de session pour éviter les doublons
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('visit_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('visit_session_id', sessionId);
    }
    return sessionId;
  };

  // Vérifier le code admin avec raccourci clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl+Shift+V pour afficher la demande de code
      if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        e.preventDefault();
        setShowPasswordPrompt(true);
        setError('');
      }
      // ESC pour cacher
      if (e.key === 'Escape') {
        if (showPasswordPrompt) {
          setShowPasswordPrompt(false);
          setPasswordInput('');
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showPasswordPrompt]);

  // Gérer la soumission du mot de passe
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPassword(passwordInput)) {
      setIsVisible(true);
      setShowPasswordPrompt(false);
      setPasswordInput('');
      setError('');
    } else {
      setError('Code incorrect');
    }
  };

  // Gérer le prompt direct (si vous gardez cette fonctionnalité)
//   const handleDirectPrompt = () => {
//     const input = prompt('Code admin:');
//     if (input && verifyPassword(input)) {
//       setIsVisible(true);
//     } else if (input) {
//       alert('Code incorrect');
//     }
//   };

  // Enregistrer cette visite (une seule fois par session)
  useEffect(() => {
    const sessionId = getSessionId();
    const today = new Date().toDateString();
    
    const alreadyVisitedToday = localStorage.getItem(`visited_${today}_${sessionId}`);
    
    if (!alreadyVisitedToday) {
      const logVisit = () => {
        const visit: Visitor = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          page: window.location.pathname,
          userAgent: navigator.userAgent,
          sessionId: sessionId
        };

        const stored = localStorage.getItem('visitor_logs');
        const logs: Visitor[] = stored ? JSON.parse(stored) : [];
        
        const updatedLogs = [visit, ...logs].slice(0, 1000);
        localStorage.setItem('visitor_logs', JSON.stringify(updatedLogs));
        localStorage.setItem(`visited_${today}_${sessionId}`, 'true');
      };

      const timer = setTimeout(logVisit, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Récupérer et compter les visiteurs
  useEffect(() => {
    if (!isVisible) return;

    const stored = localStorage.getItem('visitor_logs');
    const logs: Visitor[] = stored ? JSON.parse(stored) : [];
    setVisitors(logs);

    const today = new Date().toDateString();
    const todayVisits = logs.filter(v => 
      new Date(v.timestamp).toDateString() === today
    );
    
    setTodayCount(todayVisits.length);
    
    const uniqueSessions = new Set(todayVisits.map(v => v.sessionId));
    setUniqueTodayCount(uniqueSessions.size);
  }, [isVisible]);

  // Si invisible et pas de prompt, ne rien afficher
  if (!isVisible && !showPasswordPrompt) return null;

  return (
    <>
      {/* Prompt de mot de passe */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gray-700 dark:text-gray-300" /> Accès aux statistiques
            </h3>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Entrez le code d'accès"
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    setPasswordInput('');
                    setError('');
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Annuler (ESC)
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Accéder
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              Ctrl+Shift+V pour afficher • ESC pour annuler
            </p>
          </div>
        </div>
      )}

      {/* Section des statistiques intégrée à la page */}
      {isVisible && (
        <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" /> Statistiques Visiteurs (Admin)
              </h2>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Masquer les statistiques"
              >
                <span className="text-xl">×</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {visitors.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total des visites
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {todayCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Visites aujourd'hui
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {uniqueTodayCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Visiteurs uniques aujourd'hui
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Dernières visites
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Date & Heure
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Page
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Navigateur
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {visitors.slice(0, 10).map(visitor => (
                      <tr key={visitor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {new Date(visitor.timestamp).toLocaleDateString('fr-FR')}
                          <br />
                          <span className="text-gray-500 dark:text-gray-400">
                            {new Date(visitor.timestamp).toLocaleTimeString('fr-FR')}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-xs">
                            {visitor.page}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                          <div className="truncate max-w-xs" title={visitor.userAgent}>
                            {visitor.userAgent.split(' ')[0]}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ctrl+Shift+V pour afficher • ESC pour masquer • Données stockées localement
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SimpleVisitorCounter;