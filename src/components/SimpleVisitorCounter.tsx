import React, { useEffect, useState } from 'react';
import { RefreshCw, AlertCircle, Key, Shield, Globe, HardDrive } from 'lucide-react';
import CryptoJS from 'crypto-js';

// Configuration
const API_NAMESPACE = "ton-projet-unique-2025"; // Change ceci pour tes propres stats
const ENCRYPTED_PASSWORD_HASH = 'c9f69947af94021b86a1593f0e737a95071815cbe3767c1a9aacea0b0f7d7a10';

const VisitorCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ today: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  // 1. Logique de comptage dynamique
  const fetchStats = async (isInitialLoad: boolean) => {
    try {
      const sessionKey = 'has_visited_global';
      const isTracked = sessionStorage.getItem(sessionKey);
      
      let url = `https://api.counterapi.dev/v1/${API_NAMESPACE}/total`;
      
      // On n'incrémente que si c'est le premier chargement de la session
      if (isInitialLoad && !isTracked) {
        url += '/increment';
        sessionStorage.setItem(sessionKey, 'true');
      }

      const res = await fetch(url);
      const data = await res.json();
      
      // Gestion "Aujourd'hui" (Local Storage)
      const todayKey = `v_count_${new Date().toISOString().split('T')[0]}`;
      let todayCount = parseInt(localStorage.getItem(todayKey) || '0');
      
      if (isInitialLoad && !sessionStorage.getItem('has_visited_today')) {
        todayCount += 1;
        localStorage.setItem(todayKey, todayCount.toString());
        sessionStorage.setItem('has_visited_today', 'true');
      }

      setStats({ today: todayCount, total: data.count || 0 });
    } catch (err) {
      console.error("Erreur API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(true);
  }, []);

  // 2. Vérification du mot de passe via Hash
  const verifyPassword = (input: string) => {
    const hashedInput = CryptoJS.SHA256(input).toString();
    return hashedInput === ENCRYPTED_PASSWORD_HASH;
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPassword(password)) {
      setIsVisible(true);
      setShowPasswordInput(false);
      setError('');
      setPassword('');
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  // 3. Raccourci clavier (Ctrl + Shift + V)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        setShowPasswordInput(true);
      }
      if (e.key === 'Escape') {
        setShowPasswordInput(false);
        setIsVisible(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible && !showPasswordInput) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Modal Mot de passe sécurisé */}
      {showPasswordInput && (
        <div className="bg-white rounded-xl p-6 shadow-2xl border border-gray-200 w-80 animate-in fade-in zoom-in duration-200">
          <div className="flex items-center gap-3 mb-4 text-gray-800">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold">Accès Restreint</h3>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Code secret"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <Key className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            {error && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setShowPasswordInput(false)} className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">Annuler</button>
              <button type="submit" className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-md transition-colors">Valider</button>
            </div>
          </form>
        </div>
      )}

      {/* Panneau de Contrôle Dynamique */}
      {isVisible && (
        <div className="bg-gray-900 text-white rounded-2xl shadow-2xl overflow-hidden w-72 border border-gray-700 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[11px] font-black uppercase tracking-widest text-gray-300">Live Stats</span>
            </div>
            <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-white transition-colors text-xl">&times;</button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-800/50 rounded-xl border border-gray-700">
                <div className="text-2xl font-black text-blue-400">{stats.today}</div>
                <div className="text-[9px] text-gray-500 uppercase mt-1 flex items-center justify-center gap-1">
                  <HardDrive className="w-3 h-3" /> Aujourd'hui
                </div>
              </div>
              <div className="text-center p-3 bg-gray-800/50 rounded-xl border border-gray-700">
                <div className="text-2xl font-black text-green-400">
                  {loading ? "..." : stats.total}
                </div>
                <div className="text-[9px] text-gray-500 uppercase mt-1 flex items-center justify-center gap-1">
                  <Globe className="w-3 h-3" /> Total Global
                </div>
              </div>
            </div>

            <button 
              onClick={() => { setLoading(true); fetchStats(false); }}
              className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all active:scale-95"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> 
              Actualiser les données
            </button>

            <div className="mt-4 pt-4 border-t border-gray-800 text-[9px] text-gray-600 flex justify-between px-1">
              <span>ID: {API_NAMESPACE}</span>
              <span className="text-green-900 font-bold">ONLINE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorCounter;