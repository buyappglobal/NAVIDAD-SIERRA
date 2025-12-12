
import React, { useEffect, useState } from 'react';
import { ICONS } from '../constants';
import { BADGES, getPassportData, PassportData } from '../services/passportService';

interface PassportModalProps {
  onClose: () => void;
}

const PassportModal: React.FC<PassportModalProps> = ({ onClose }) => {
  const [data, setData] = useState<PassportData | null>(null);

  useEffect(() => {
    setData(getPassportData());
  }, []);

  if (!data) return null;

  const unlockedCount = data.unlockedBadges.length;
  
  // Determinar Nivel
  let level = "Turista";
  let levelColor = "text-slate-500";
  if (unlockedCount >= 2) { level = "Aventurero"; levelColor = "text-green-500"; }
  if (unlockedCount >= 4) { level = "Experto Serrano"; levelColor = "text-amber-500"; }
  if (unlockedCount >= 6) { level = "Embajador"; levelColor = "text-purple-500"; }

  const handleShare = () => {
      const text = `¡Soy nivel ${level} en el Pasaporte Huelva Late! He visitado ${data.visitedTowns.length} pueblos y conseguido ${unlockedCount} insignias. 🎖️`;
      if (navigator.share) {
          navigator.share({
              title: 'Mi Pasaporte Cultural',
              text: text,
              url: 'https://huelvalate.es'
          });
      } else {
          navigator.clipboard.writeText(text);
          alert("Texto copiado al portapapeles");
      }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[80] backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera estilo Pasaporte */}
        <div className="bg-blue-900 p-6 text-center relative border-b-4 border-amber-400">
            <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">{ICONS.close}</button>
            <div className="w-16 h-16 bg-amber-400 rounded-full mx-auto flex items-center justify-center mb-2 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8M3 13l6-6 6 6m-6-6V3" />
                </svg>
            </div>
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-widest">Pasaporte</h2>
            <p className="text-amber-300 text-xs font-bold uppercase tracking-wide">Huelva Cultural</p>
        </div>

        {/* Datos de Usuario */}
        <div className="p-6 bg-slate-50 dark:bg-black/20 text-center border-b border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold mb-1">Nivel de Viajero</p>
            <h3 className={`text-2xl font-black ${levelColor} mb-4`}>{level}</h3>
            
            <div className="flex justify-center gap-8 text-center">
                <div>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{data.visitedTowns.length}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Pueblos</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-slate-800 dark:text-white">{unlockedCount}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Insignias</p>
                </div>
            </div>
        </div>

        {/* Grid de Insignias */}
        <div className="flex-1 p-6 overflow-y-auto bg-white dark:bg-slate-900">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase">Tus Logros</h4>
            <div className="grid grid-cols-3 gap-4">
                {BADGES.map(badge => {
                    const isUnlocked = data.unlockedBadges.includes(badge.id);
                    return (
                        <div key={badge.id} className="flex flex-col items-center group">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-inner mb-2 transition-all duration-300 ${isUnlocked ? 'bg-amber-100 dark:bg-amber-900/30 scale-100' : 'bg-slate-200 dark:bg-slate-800 grayscale opacity-50 scale-90'}`}>
                                {badge.icon}
                            </div>
                            <p className={`text-[10px] font-bold text-center leading-tight ${isUnlocked ? 'text-slate-800 dark:text-white' : 'text-slate-400'}`}>
                                {badge.name}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
            <button 
                onClick={handleShare}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
                {ICONS.share}
                Compartir Progreso
            </button>
        </div>
      </div>
    </div>
  );
};

export default PassportModal;
