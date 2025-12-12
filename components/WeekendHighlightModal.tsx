
import React, { useMemo } from 'react';
import { ICONS } from '../constants';
import { ALL_EVENTS } from '../data/events';
import { EventCategory } from '../types';

interface WeekendHighlightModalProps {
  onClose: () => void;
  onSelectEvent: (eventId: string) => void;
  onInstall: () => void;
}

const WeekendHighlightModal: React.FC<WeekendHighlightModalProps> = ({ onClose, onSelectEvent, onInstall }) => {
  
  // Helper para formato de fecha corto (ej: "6-8 Dic")
  const formatDateRange = (dateStr: string, endDateStr?: string) => {
    const start = new Date(dateStr);
    const dayStart = start.getDate();
    const month = start.toLocaleString('es-ES', { month: 'short' }); // "dic"

    if (endDateStr) {
      const end = new Date(endDateStr);
      const dayEnd = end.getDate();
      // Si es el mismo mes
      if (start.getMonth() === end.getMonth()) {
        return `${dayStart}-${dayEnd} ${month}`;
      }
      // Meses distintos
      const monthEnd = end.toLocaleString('es-ES', { month: 'short' });
      return `${dayStart} ${month} - ${dayEnd} ${monthEnd}`;
    }
    
    return `${dayStart} ${month}`;
  };

  // Filtrar eventos de TIERRA DE CULTURA aleatorios
  const highlights = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Filtrar solo eventos de la campaña Tierra de Cultura
    const campaignEvents = ALL_EVENTS.filter(e => 
        e.category === EventCategory.TIERRA_DE_CULTURA && 
        !e.hidden
    );

    // 2. Filtrar eventos pasados
    const futureEvents = campaignEvents.filter(e => {
         const end = e.endDate ? new Date(e.endDate) : new Date(e.date);
         // Añadimos un día de margen al final
         const endWithMargin = new Date(end);
         endWithMargin.setDate(endWithMargin.getDate() + 1);
         return endWithMargin >= today; 
    });

    // 3. Separar el evento "Padre" (Campaña General) de los eventos específicos
    const parentEvent = futureEvents.find(e => e.id === 'campaign-tierra-cultura');
    const subEvents = futureEvents.filter(e => e.id !== 'campaign-tierra-cultura');

    // 4. Barajar (Shuffle) los eventos específicos
    const shuffledSubEvents = [...subEvents].sort(() => 0.5 - Math.random());

    // 5. Seleccionar los 4 primeros eventos aleatorios
    const randomSelection = shuffledSubEvents.slice(0, 4);

    // 6. Construir la lista final: Padre primero (si existe/es futuro) + Aleatorios
    const finalSelection = parentEvent 
        ? [parentEvent, ...randomSelection]
        : randomSelection.slice(0, 5); // Si no hay padre, mostramos 5 aleatorios

    return finalSelection.map(e => ({
        id: e.id,
        title: e.title,
        place: e.town,
        day: formatDateRange(e.date, e.endDate),
        icon: e.id === 'campaign-tierra-cultura' ? '⭐' : '🎭' // Icono especial para la portada
    }));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[90] backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm relative border-2 border-cyan-500/50 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Background Header - CAMBIADO A CYAN/AZUL TIERRA DE CULTURA */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-6 text-white text-center relative flex-shrink-0">
            <button 
                onClick={onClose}
                className="absolute top-2 right-2 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-1 transition-colors"
            >
                {ICONS.close}
            </button>
            <h2 className="text-2xl font-display font-bold mb-1">Tierra de Cultura</h2>
            <p className="text-cyan-100 text-sm font-medium">Programación Especial Diputación de Huelva</p>
            
            {/* Decoration */}
            <div className="absolute top-2 left-4 text-3xl opacity-30">🎭</div>
            <div className="absolute bottom-2 right-4 text-2xl opacity-30">🎶</div>
        </div>

        <div className="p-5 overflow-y-auto">
            <p className="text-slate-600 dark:text-slate-300 text-center text-sm mb-4">
                Descubre una selección aleatoria de los espectáculos culturales que recorren nuestra provincia estos días:
            </p>

            <div className="space-y-3">
                {highlights.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            onSelectEvent(item.id);
                            onClose();
                        }}
                        className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl hover:bg-cyan-50 dark:hover:bg-slate-700 hover:scale-[1.02] transition-all border border-slate-100 dark:border-slate-700 group"
                    >
                        <div className="flex items-center gap-3 text-left">
                            <span className="text-2xl flex-shrink-0">{item.icon}</span>
                            <div className="min-w-0">
                                <p className="font-bold text-slate-800 dark:text-slate-200 text-sm group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors truncate">
                                    {item.title}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                    {item.place} • <span className="capitalize">{item.day}</span>
                                </p>
                            </div>
                        </div>
                        <div className="text-cyan-600 dark:text-cyan-400 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </button>
                ))}
                
                {highlights.length === 0 && (
                    <p className="text-center text-sm text-slate-500 italic py-4">
                        No hay eventos de Tierra de Cultura disponibles en este momento.
                    </p>
                )}
            </div>

            <button 
                onClick={() => {
                    // Navegar a la categoría específica
                    window.location.hash = `#/categoria/${encodeURIComponent(EventCategory.TIERRA_DE_CULTURA)}`;
                    onClose();
                }}
                className="w-full mt-4 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 font-bold py-3 rounded-xl hover:bg-cyan-200 dark:hover:bg-cyan-900/50 transition-colors text-sm border border-cyan-200 dark:border-cyan-800"
            >
                Ver programación completa
            </button>

            {/* Install App Recommendation */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 text-center relative z-20">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    Para no perderte ningún evento cultural instala la app
                </p>
                <button
                    onClick={() => {
                        onInstall();
                        onClose();
                    }}
                    className="text-white text-xs font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 mx-auto bg-slate-800 shadow-lg hover:bg-slate-700 px-6 py-3 rounded-full"
                >
                    {ICONS.addToHomeScreen} Instalar App
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WeekendHighlightModal;
