
import React, { useMemo } from 'react';
import { ICONS } from '../constants';
import { ALL_EVENTS } from '../data/events';
import { EventCategory } from '../types';

interface WeekendHighlightModalProps {
  onClose: () => void;
  onSelectEvent: (eventId: string) => void;
}

const WeekendHighlightModal: React.FC<WeekendHighlightModalProps> = ({ onClose, onSelectEvent }) => {
  
  // Helper para iconos según categoría
  const getIconForCategory = (category: EventCategory) => {
    switch (category) {
      case EventCategory.BELEN_VIVIENTE: return "✨";
      case EventCategory.MERCADO: return "🛍️";
      case EventCategory.FERIA_GASTRONOMICA: return "🧀";
      case EventCategory.FIESTA: return "💃";
      case EventCategory.CABALGATA: return "👑";
      case EventCategory.CAMPANILLEROS: return "🎶";
      case EventCategory.PUEBLO_DESTACADO: return "⭐";
      default: return "🎉";
    }
  };

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

  // Filtrar eventos destacados (sponsored: true) dinámicamente
  const highlights = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return ALL_EVENTS
      .filter(e => e.sponsored === true) // Solo destacados
      .filter(e => {
         // Opcional: Filtrar para no mostrar eventos pasados
         const end = e.endDate ? new Date(e.endDate) : new Date(e.date);
         // Añadimos un día de margen al final para que no desaparezca el mismo día
         const endWithMargin = new Date(end);
         endWithMargin.setDate(endWithMargin.getDate() + 1);
         return endWithMargin >= today; 
      })
      // Ordenar por fecha (el más próximo primero)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      // Limitar a 5 para que quepa bien en el modal
      .slice(0, 5)
      .map(e => ({
        id: e.id,
        title: e.title,
        place: e.town,
        day: formatDateRange(e.date, e.endDate),
        icon: getIconForCategory(e.category)
      }));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[90] backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm relative overflow-hidden border-2 border-amber-400/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Background Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white text-center relative">
            <button 
                onClick={onClose}
                className="absolute top-2 right-2 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-1 transition-colors"
            >
                {ICONS.close}
            </button>
            <h2 className="text-2xl font-display font-bold mb-1">¡Destacados!</h2>
            <p className="text-amber-100 text-sm font-medium">Eventos recomendados en la Sierra</p>
            
            {/* Sparkles decoration */}
            <div className="absolute top-2 left-4 text-3xl opacity-30">✨</div>
            <div className="absolute bottom-2 right-4 text-2xl opacity-30">❄️</div>
        </div>

        <div className="p-5">
            <p className="text-slate-600 dark:text-slate-300 text-center text-sm mb-4">
                No te pierdas nuestra selección de pueblos y eventos imprescindibles para estos días:
            </p>

            <div className="space-y-3">
                {highlights.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            onSelectEvent(item.id);
                            onClose();
                        }}
                        className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl hover:bg-amber-50 dark:hover:bg-slate-700 hover:scale-[1.02] transition-all border border-slate-100 dark:border-slate-700 group"
                    >
                        <div className="flex items-center gap-3 text-left">
                            <span className="text-2xl flex-shrink-0">{item.icon}</span>
                            <div className="min-w-0">
                                <p className="font-bold text-slate-800 dark:text-slate-200 text-sm group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                                    {item.title}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                    {item.place} • <span className="capitalize">{item.day}</span>
                                </p>
                            </div>
                        </div>
                        <div className="text-amber-500 dark:text-amber-400 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </button>
                ))}
                
                {highlights.length === 0 && (
                    <p className="text-center text-sm text-slate-500 italic py-4">
                        No hay eventos destacados próximos en este momento.
                    </p>
                )}
            </div>

            <button 
                onClick={onClose}
                className="w-full mt-6 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm"
            >
                Ver agenda completa
            </button>
        </div>
      </div>
    </div>
  );
};

export default WeekendHighlightModal;
