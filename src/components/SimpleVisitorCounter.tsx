// components/SimpleVisitorCounter.tsx - Version finale réelle et dynamique
import { Eye, Lock, Users, Globe, TrendingUp, Calendar, Clock, Monitor, Trash2, AlertTriangle, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SHA256 } from 'crypto-js';

interface Visitor {
  id: string;
  timestamp: number;
  page: string;
  userAgent: string;
  sessionId: string;
  isNewSession?: boolean;
}

const SimpleVisitorCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [todayCount, setTodayCount] = useState(0);
//   const [uniqueTodayCount, setUniqueTodayCount] = useState(0);
  const [totalPageViews, setTotalPageViews] = useState(0);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [currentVisitors, setCurrentVisitors] = useState<string[]>([]);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteMode, setDeleteMode] = useState<'all' | 'old' | 'selected' | 'today' | 'session' | null>(null);
  const [selectedVisitors, setSelectedVisitors] = useState<Set<string>>(new Set());
  const [confirmationInput, setConfirmationInput] = useState('');
  const [deleteDaysThreshold, setDeleteDaysThreshold] = useState(30);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ⚠️ REMPLACEZ CE HASH PAR LE VÔTR (hash SHA-256 de votre mot de passe)
  const ADMIN_PASSWORD_HASH = 'c9f69947af94021b86a1593f0e737a95071815cbe3767c1a9aacea0b0f7d7a10';

  // Fonction pour vérifier le mot de passe
  const verifyPassword = (input: string): boolean => {
    const inputHash = SHA256(input).toString();
    return inputHash === ADMIN_PASSWORD_HASH;
  };

  // Générer un ID de session unique
  const getSessionId = (): string => {
    let sessionId = sessionStorage.getItem('visit_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('visit_session_id', sessionId);
      sessionStorage.setItem('session_start_time', Date.now().toString());
    }
    return sessionId;
  };

  // Enregistrer une visite EN TEMPS RÉEL
  useEffect(() => {
    const sessionId = getSessionId();
    const now = Date.now();

    // Marquer la session comme active
    const activeSessions = JSON.parse(localStorage.getItem('active_sessions') || '{}');
    activeSessions[sessionId] = now;
    localStorage.setItem('active_sessions', JSON.stringify(activeSessions));

    // Enregistrer la visite IMMÉDIATEMENT
    const logVisit = () => {
      const visit: Visitor = {
        id: now.toString() + '_' + Math.random().toString(36).substr(2, 9),
        timestamp: now,
        page: window.location.pathname,
        userAgent: navigator.userAgent,
        sessionId: sessionId,
        isNewSession: !sessionStorage.getItem('has_visited')
      };

      if (!sessionStorage.getItem('has_visited')) {
        sessionStorage.setItem('has_visited', 'true');
      }

      const stored = localStorage.getItem('visitor_logs');
      const logs: Visitor[] = stored ? JSON.parse(stored) : [];
      
      const updatedLogs = [visit, ...logs].slice(0, 1000);
      localStorage.setItem('visitor_logs', JSON.stringify(updatedLogs));
      
      // Mettre à jour le compteur de pages vues total
      const totalViews = parseInt(localStorage.getItem('total_page_views') || '0') + 1;
      localStorage.setItem('total_page_views', totalViews.toString());
      
      // Mettre à jour l'état
      setTotalPageViews(totalViews);
      setVisitors(updatedLogs);
      updateStatistics(updatedLogs);
      setLastUpdate(new Date().toLocaleTimeString('fr-FR'));
      
      // Émettre un événement pour les autres onglets
      window.dispatchEvent(new CustomEvent('visitLogged', { detail: visit }));
    };

    logVisit();

    // Nettoyer les sessions inactives (plus de 30 minutes)
    const cleanupInterval = setInterval(() => {
      const sessions = JSON.parse(localStorage.getItem('active_sessions') || '{}');
      const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
      
      Object.keys(sessions).forEach(sessionId => {
        if (sessions[sessionId] < thirtyMinutesAgo) {
          delete sessions[sessionId];
        }
      });
      
      localStorage.setItem('active_sessions', JSON.stringify(sessions));
      setCurrentVisitors(Object.keys(sessions));
    }, 60000); // Vérifier toutes les minutes

    // Écouter les visites depuis d'autres onglets
    const handleVisitLogged = (event: CustomEvent) => {
      const visit = event.detail;
      setVisitors(prev => [visit, ...prev.slice(0, 999)]);
      updateStatistics([visit, ...visitors]);
      setTotalPageViews(prev => prev + 1);
      setLastUpdate(new Date().toLocaleTimeString('fr-FR'));
    };

    window.addEventListener('visitLogged' as any, handleVisitLogged as EventListener);

    return () => {
      clearInterval(cleanupInterval);
      window.removeEventListener('visitLogged' as any, handleVisitLogged as EventListener);
    };
  }, []);

  // Mettre à jour les statistiques
  const updateStatistics = (logs: Visitor[]) => {
    const today = new Date().toDateString();
    
    // Visites aujourd'hui
    const todayVisits = logs.filter(v => 
      new Date(v.timestamp).toDateString() === today
    );
    setTodayCount(todayVisits.length);
    
    // Visiteurs uniques aujourd'hui
    // const uniqueTodaySessions = new Set(todayVisits.map(v => v.sessionId));
    // setUniqueTodayCount(uniqueTodaySessions.size);
    
    // Visiteurs uniques totaux
    const allUniqueSessions = new Set(logs.map(v => v.sessionId));
    setUniqueVisitors(allUniqueSessions.size);
    
    // Visiteurs actuellement en ligne (sessions actives des 30 dernières minutes)
    const activeSessions = JSON.parse(localStorage.getItem('active_sessions') || '{}');
    const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
    const currentSessions = Object.keys(activeSessions).filter(
      sessionId => activeSessions[sessionId] > thirtyMinutesAgo
    );
    setCurrentVisitors(currentSessions);
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
        } else if (showDeleteDialog) {
          setShowDeleteDialog(false);
          setDeleteMode(null);
          setConfirmationInput('');
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showPasswordPrompt, showDeleteDialog]);

  // Mettre à jour les statistiques lorsque visible
  useEffect(() => {
    if (isVisible) {
      const loadData = () => {
        const stored = localStorage.getItem('visitor_logs');
        const logs: Visitor[] = stored ? JSON.parse(stored) : [];
        setVisitors(logs);
        
        const totalViews = parseInt(localStorage.getItem('total_page_views') || '0');
        setTotalPageViews(totalViews);
        
        updateStatistics(logs);
        setLastUpdate(new Date().toLocaleTimeString('fr-FR'));
      };

      loadData();
      
      // Rafraîchir les données toutes les 5 secondes quand visible
      const refreshInterval = setInterval(loadData, 5000);

      return () => clearInterval(refreshInterval);
    }
  }, [isVisible]);

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

  // Fonctions pour supprimer les visiteurs
  const deleteVisitors = () => {
    if (!deleteMode) return;

    setDeleteLoading(true);

    setTimeout(() => {
      const stored = localStorage.getItem('visitor_logs');
      let logs: Visitor[] = stored ? JSON.parse(stored) : [];
      const currentTime = Date.now();

      let newLogs: Visitor[] = [];
      let deletedCount = 0;

      switch (deleteMode) {
        case 'all':
          // Supprimer tous les visiteurs
          deletedCount = logs.length;
          newLogs = [];
          localStorage.setItem('total_page_views', '0');
          setTotalPageViews(0);
          break;

        case 'old':
          // Supprimer les visiteurs plus anciens que X jours
          const thresholdTime = currentTime - (deleteDaysThreshold * 24 * 60 * 60 * 1000);
          newLogs = logs.filter(visitor => visitor.timestamp > thresholdTime);
          deletedCount = logs.length - newLogs.length;
          break;

        case 'today':
          // Supprimer les visiteurs d'aujourd'hui
          const today = new Date().toDateString();
          newLogs = logs.filter(visitor => 
            new Date(visitor.timestamp).toDateString() !== today
          );
          deletedCount = logs.length - newLogs.length;
          break;

        case 'session':
          // Supprimer par session ID (visiteurs actuels)
          const activeSessions = JSON.parse(localStorage.getItem('active_sessions') || '{}');
          const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
          const currentSessionIds = Object.keys(activeSessions).filter(
            sessionId => activeSessions[sessionId] > thirtyMinutesAgo
          );
          
          newLogs = logs.filter(visitor => 
            !currentSessionIds.includes(visitor.sessionId)
          );
          deletedCount = logs.length - newLogs.length;
          break;

        case 'selected':
          // Supprimer les visiteurs sélectionnés
          if (selectedVisitors.size > 0) {
            newLogs = logs.filter(visitor => !selectedVisitors.has(visitor.id));
            deletedCount = selectedVisitors.size;
            setSelectedVisitors(new Set());
          } else {
            newLogs = logs;
          }
          break;
      }

      // Sauvegarder les nouveaux logs
      localStorage.setItem('visitor_logs', JSON.stringify(newLogs));
      
      // Mettre à jour l'état
      setVisitors(newLogs);
      updateStatistics(newLogs);
      setLastUpdate(new Date().toLocaleTimeString('fr-FR'));

      // Réinitialiser les états de suppression
      setShowDeleteDialog(false);
      setDeleteMode(null);
      setConfirmationInput('');
      setDeleteLoading(false);

      // Afficher une notification (vous pourriez ajouter un système de toasts)
      alert(`${deletedCount} visites ont été supprimées avec succès.`);
      
      // Émettre un événement pour les autres onglets
      window.dispatchEvent(new CustomEvent('visitorsDeleted'));
      
    }, 500); // Petit délai pour l'effet de chargement
  };

  // Gérer la sélection/désélection d'un visiteur
  const toggleVisitorSelection = (visitorId: string) => {
    const newSelected = new Set(selectedVisitors);
    if (newSelected.has(visitorId)) {
      newSelected.delete(visitorId);
    } else {
      newSelected.add(visitorId);
    }
    setSelectedVisitors(newSelected);
  };

  // Sélectionner/désélectionner tous les visiteurs
  const toggleSelectAll = () => {
    if (selectedVisitors.size === visitors.length) {
      setSelectedVisitors(new Set());
    } else {
      const allIds = visitors.map(v => v.id);
      setSelectedVisitors(new Set(allIds));
    }
  };

  // Calculer le nombre de visiteurs sélectionnés
  const selectedCount = selectedVisitors.size;

  // Ouvrir le dialogue de suppression
  const openDeleteDialog = (mode: 'all' | 'old' | 'today' | 'session' | 'selected') => {
    setDeleteMode(mode);
    setShowDeleteDialog(true);
    setConfirmationInput('');
  };

  // Si invisible et pas de prompt, ne rien afficher
  if (!isVisible && !showPasswordPrompt && !showDeleteDialog) return null;

  // Formater la date et heure complète
  const formatDateTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Formatage du temps relatif
  const timeAgo = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'À l\'instant';
    if (seconds < 120) return 'Il y a 1 minute';
    if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} minutes`;
    if (seconds < 7200) return 'Il y a 1 heure';
    if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)} heures`;
    if (seconds < 172800) return 'Il y a 1 jour';
    return `Il y a ${Math.floor(seconds / 86400)} jours`;
  };

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

      {/* Dialogue de suppression */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center gap-2 mb-4 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold">Confirmer la suppression</h3>
            </div>
            
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {deleteMode === 'all' && "Vous êtes sur le point de supprimer TOUTES les visites. Cette action est irréversible."}
                {deleteMode === 'old' && `Vous allez supprimer les visites de plus de ${deleteDaysThreshold} jours.`}
                {deleteMode === 'today' && "Vous allez supprimer toutes les visites d'aujourd'hui."}
                {deleteMode === 'session' && "Vous allez supprimer les visites des sessions actives (visiteurs en ligne)."}
                {deleteMode === 'selected' && `Vous allez supprimer ${selectedCount} visite(s) sélectionnée(s).`}
              </p>
            </div>

            {deleteMode === 'old' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Âge des données à supprimer (jours) :
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="365"
                    value={deleteDaysThreshold}
                    onChange={(e) => setDeleteDaysThreshold(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {deleteDaysThreshold} jours
                  </span>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tapez "SUPPRIMER" pour confirmer :
              </label>
              <input
                type="text"
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="SUPPRIMER"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteDialog(false);
                  setDeleteMode(null);
                  setConfirmationInput('');
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white flex items-center gap-2"
                disabled={deleteLoading}
              >
                <X className="w-4 h-4" /> Annuler
              </button>
              <button
                type="button"
                onClick={deleteVisitors}
                disabled={confirmationInput !== 'SUPPRIMER' || deleteLoading}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  confirmationInput === 'SUPPRIMER' && !deleteLoading
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {deleteLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Suppression...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" /> Supprimer
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section des statistiques */}
      {isVisible && (
        <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" /> Statistiques Visiteurs (Admin)
              </h2>
              <div className="flex items-center gap-4">
                {/* Bouton de suppression */}
                <div className="relative group">
                  <button
                    onClick={() => {
                      if (selectedCount > 0) {
                        openDeleteDialog('selected');
                      } else {
                        // Ouvrir un menu déroulant si aucune sélection
                        const dropdown = document.getElementById('deleteDropdown');
                        if (dropdown) {
                          dropdown.classList.toggle('hidden');
                        }
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    title="Options de suppression"
                  >
                    <Trash2 className="w-4 h-4" />
                    {selectedCount > 0 ? `Supprimer (${selectedCount})` : 'Supprimer'}
                  </button>
                  
                  {/* Menu déroulant des options de suppression */}
                  <div id="deleteDropdown" className="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                    <div className="p-2">
                      <button
                        onClick={() => openDeleteDialog('selected')}
                        className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          selectedCount === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300'
                        }`}
                        disabled={selectedCount === 0}
                      >
                        Supprimer sélection ({selectedCount})
                      </button>
                      <button
                        onClick={() => openDeleteDialog('today')}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        Supprimer visites d'aujourd'hui
                      </button>
                      <button
                        onClick={() => openDeleteDialog('old')}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        Supprimer vieilles visites
                      </button>
                      <button
                        onClick={() => openDeleteDialog('session')}
                        className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        Supprimer visiteurs en ligne
                      </button>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={() => openDeleteDialog('all')}
                        className="w-full text-left px-3 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 font-medium"
                      >
                        Tout supprimer
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsVisible(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Masquer les statistiques"
                >
                  <span className="text-xl">×</span>
                </button>
              </div>
            </div>

            {/* Statistiques principales */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {totalPageViews}
                  </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  Pages vues total
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-green-500" />
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {visitors.length}
                  </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  Visites enregistrées
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {uniqueVisitors}
                  </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  Visiteurs uniques
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-yellow-500" />
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {todayCount}
                  </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  Visites aujourd'hui
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-4 h-4 text-red-500" />
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {currentVisitors.length}
                  </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  En ligne maintenant
                </div>
              </div>
            </div>

            {/* Dernières visites en temps réel */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Dernières visites en temps réel
                  </h3>
                  {selectedCount > 0 && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm rounded-full">
                      {selectedCount} sélectionné(s)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleSelectAll}
                    className="text-sm px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {selectedVisitors.size === visitors.length ? 'Tout désélectionner' : 'Tout sélectionner'}
                  </button>
                  <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded">
                    Auto-rafraîchi
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Dernière maj: {lastUpdate}
                  </span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase w-8">
                        <input
                          type="checkbox"
                          checked={selectedVisitors.size === visitors.length && visitors.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded border-gray-300 dark:border-gray-600"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Date & Heure complète
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Il y a
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Page visitée
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Navigateur
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {visitors.slice(0, 20).map(visitor => {
                      const isRecent = Date.now() - visitor.timestamp < 300000; // 5 minutes
                      const isOnline = Date.now() - visitor.timestamp < 1800000; // 30 minutes
                      const isSelected = selectedVisitors.has(visitor.id);
                      
                      return (
                        <tr 
                          key={visitor.id} 
                          className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                            isSelected ? 'bg-blue-50 dark:bg-blue-900/20' :
                            isRecent ? 'bg-blue-50 dark:bg-blue-900/20' : 
                            isOnline ? 'bg-green-50 dark:bg-green-900/10' : ''
                          }`}
                        >
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleVisitorSelection(visitor.id)}
                              className="rounded border-gray-300 dark:border-gray-600"
                            />
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                            {formatDateTime(visitor.timestamp)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                            {timeAgo(visitor.timestamp)}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-xs font-mono">
                              {visitor.page}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                            <div className="truncate max-w-xs" title={visitor.userAgent}>
                              {(() => {
                                // Détecter le navigateur
                                const ua = visitor.userAgent.toLowerCase();
                                if (ua.includes('chrome')) return 'Chrome';
                                if (ua.includes('firefox')) return 'Firefox';
                                if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari';
                                if (ua.includes('edge')) return 'Edge';
                                if (ua.includes('opera')) return 'Opera';
                                return 'Navigateur';
                              })()}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-xs" title={visitor.userAgent}>
                              {visitor.userAgent.length > 50 
                                ? visitor.userAgent.substring(0, 50) + '...' 
                                : visitor.userAgent
                              }
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {isRecent ? (
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs rounded">
                                En ligne
                              </span>
                            ) : isOnline ? (
                              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded">
                                Récent
                              </span>
                            ) : visitor.isNewSession ? (
                              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 text-xs rounded">
                                Nouveau
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                                Retour
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
                {visitors.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    Aucune visite enregistrée pour le moment
                  </div>
                )}
              </div>
            </div>

            {/* Résumé des 7 derniers jours */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Activité des 7 derniers jours
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, index) => {
                  const date = new Date();
                  date.setDate(date.getDate() - index);
                  const dayString = date.toDateString();
                  
                  const dayVisits = visitors.filter(v => 
                    new Date(v.timestamp).toDateString() === dayString
                  );
                  
                  const uniqueDaySessions = new Set(dayVisits.map(v => v.sessionId));
                  
                  const maxVisits = Math.max(...Array.from({ length: 7 }).map((_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    const ds = d.toDateString();
                    return visitors.filter(v => new Date(v.timestamp).toDateString() === ds).length;
                  }));
                  
                  const height = maxVisits > 0 ? (dayVisits.length / maxVisits) * 80 : 0;
                  
                  return (
                    <div key={index} className="text-center">
                      <div className="mb-2">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {date.getDate()}/{date.getMonth() + 1}
                        </div>
                      </div>
                      <div className="relative h-20 flex flex-col justify-end">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-300"
                          style={{ height: `${height}%` }}
                          title={`${dayVisits.length} visites, ${uniqueDaySessions.size} uniques`}
                        />
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 dark:text-gray-300">
                          {dayVisits.length}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {uniqueDaySessions.size} uniques
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Informations de bas de page */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Données en temps réel • Mis à jour automatiquement toutes les 5 secondes
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {/* Ctrl+Shift+V pour afficher • ESC pour masquer • Données stockées localement */}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {visitors.length} visites enregistrées au total • Dernière mise à jour : {new Date().toLocaleTimeString('fr-FR')}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SimpleVisitorCounter;