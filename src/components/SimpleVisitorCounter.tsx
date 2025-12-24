import React, { useEffect, useState } from 'react';
import { RefreshCw, Globe, HardDrive, Lock } from 'lucide-react';
import CryptoJS from 'crypto-js';

// 1. CHANGE LE NOM ICI pour tes stats perso (ex: mon-site-secret-78)
const API_NAMESPACE = "Portfolio"; 
const HASH = 'c9f69947af94021b86a1593f0e737a95071815cbe3767c1a9aacea0b0f7d7a10';

const VisitorCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState({ today: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  const fetchStats = async (isInitial: boolean) => {
    setLoading(true);
    try {
      const isTracked = sessionStorage.getItem('v_global');
      // On construit l'URL de base
      let targetUrl = `https://api.counterapi.dev/v1/${API_NAMESPACE}/total`;
      if (isInitial && !isTracked) {
        targetUrl += '/increment';
        sessionStorage.setItem('v_global', 'true');
      }

      // --- LE TRUC MAGIQUE : ON PASSE PAR UN PROXY POUR TROMPER L'ADBLOCKER ---
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}&ts=${Date.now()}`;
      
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      // AllOrigins renvoie les données dans un champ "contents" sous forme de texte
      const counterData = JSON.parse(data.contents);

      // Gestion Today (LocalStorage)
      const todayKey = `v_day_${new Date().toISOString().split('T')[0]}`;
      let todayCount = parseInt(localStorage.getItem(todayKey) || '0');
      if (isInitial && !sessionStorage.getItem('v_today')) {
        todayCount += 1;
        localStorage.setItem(todayKey, todayCount.toString());
        sessionStorage.setItem('v_today', 'true');
      }

      setStats({ today: todayCount, total: counterData.count || 0 });
    } catch (err) {
      console.error("Même le proxy a échoué:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(true); }, []);

  // Raccourci clavier : Ctrl + Shift + V
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') setShowPasswordInput(true);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (CryptoJS.SHA256(password).toString() === HASH) {
      setIsVisible(true);
      setShowPasswordInput(false);
    }
    setPassword('');
  };

  if (!isVisible && !showPasswordInput) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Fenêtre de Stats */}
      {isVisible && (
        <div className="bg-[#0f172a] text-slate-200 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800 w-72 animate-in slide-in-from-bottom-5">
          <div className="flex justify-between items-center mb-5 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Traffic</span>
            </div>
            <button onClick={() => setIsVisible(false)} className="hover:text-white transition-colors">✕</button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[9px] text-slate-500 uppercase font-bold">Aujourd'hui</div>
                <div className="text-2xl font-mono font-bold text-white">{stats.today}</div>
              </div>
              <HardDrive className="w-8 h-8 text-slate-700" />
            </div>

            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[9px] text-slate-500 uppercase font-bold">Total Cumulé</div>
                <div className="text-2xl font-mono font-bold text-blue-400">
                  {loading ? "..." : stats.total.toLocaleString()}
                </div>
              </div>
              <Globe className="w-8 h-8 text-blue-900/40" />
            </div>
          </div>

          <button 
            onClick={() => fetchStats(false)}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Mettre à jour
          </button>
        </div>
      )}

      {/* Input Mot de passe */}
      {showPasswordInput && (
        <div className="bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 w-72 animate-in fade-in zoom-in duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg"><Lock className="w-5 h-5 text-blue-600" /></div>
            <h3 className="font-bold text-slate-800">Admin Panel</h3>
          </div>
          <form onSubmit={handleAuth} className="space-y-3">
            <input 
              type="password" 
              autoFocus 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              placeholder="Entrez le code..."
            />
            <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors">Déverrouiller</button>
            <button type="button" onClick={() => setShowPasswordInput(false)} className="w-full text-[10px] text-slate-400 hover:text-slate-600 uppercase font-bold tracking-widest">Annuler</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default VisitorCounter;