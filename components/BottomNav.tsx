
import React from 'react';
import { ICONS } from '../constants';

interface BottomNavProps {
  onHomeClick: () => void;
  onInfoClick: () => void;
  onFaqClick: () => void;
  onGuideClick: () => void;
  onFilterClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ 
  onHomeClick, 
  onInfoClick, 
  onFaqClick, 
  onGuideClick,
  onFilterClick
}) => {
  const navItemClass = "flex flex-col items-center justify-center w-full h-full text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-300 active:scale-95 transition-all";
  const labelClass = "text-[10px] font-bold mt-1";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-50 h-16 pb-safe px-2 animate-fade-in-up">
      <div className="flex justify-between items-center h-full max-w-lg mx-auto relative">
        
        {/* Inicio / Arriba */}
        <button onClick={onHomeClick} className={navItemClass}>
          {ICONS.home}
          <span className={labelClass}>Inicio</span>
        </button>

        {/* Guía */}
        <button onClick={onGuideClick} className={navItemClass}>
          {ICONS.book}
          <span className={labelClass}>Guía</span>
        </button>

        {/* Botón Central Destacado (Filtros) */}
        <div className="relative w-full flex justify-center items-end h-full pointer-events-none">
           <button 
            onClick={onFilterClick}
            className="pointer-events-auto absolute -top-5 bg-amber-400 text-slate-900 h-14 w-14 rounded-full shadow-lg flex items-center justify-center border-4 border-slate-50 dark:border-slate-900 transform active:scale-90 transition-transform hover:bg-amber-300"
            aria-label="Filtrar eventos"
          >
            {ICONS.filter}
          </button>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 mt-8">Filtrar</span>
        </div>

        {/* Ayuda / FAQ */}
        <button onClick={onFaqClick} className={navItemClass}>
          {ICONS.question}
          <span className={labelClass}>Ayuda</span>
        </button>

        {/* Info */}
        <button onClick={onInfoClick} className={navItemClass}>
          {ICONS.info}
          <span className={labelClass}>Info</span>
        </button>

      </div>
    </nav>
  );
};

export default BottomNav;
