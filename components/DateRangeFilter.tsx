
import React from 'react';

interface DateRangeFilterProps {
  startDate: string | null;
  endDate: string | null;
  onDateChange: (start: string | null, end: string | null) => void;
  showPastEvents: boolean;
  onTogglePastEvents: () => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ startDate, endDate, onDateChange, showPastEvents, onTogglePastEvents }) => {

  const handlePresetClick = (preset: 'today' | 'weekend' | 'week') => {
    // If we select a preset, we ensure we are NOT in past mode
    if (showPastEvents) {
        onTogglePastEvents();
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    let start: Date = new Date(today);
    let end: Date = new Date(today);

    switch (preset) {
      case 'today':
        break;
      case 'weekend':
        const dayOfWeek = today.getDay(); 
        const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
        start.setDate(today.getDate() + daysUntilSaturday);
        end.setDate(start.getDate() + 1); 
        break;
      case 'week':
        end.setDate(today.getDate() + 6);
        break;
    }

    onDateChange(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
  };
  
  const handleClear = () => {
    onDateChange(null, null);
  };

  const presetButtonClass = "flex-shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium px-4 py-2 rounded-full text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors";

  return (
    <div className="space-y-4">
      {/* Chips de acceso rápido */}
      <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide -mx-2 px-2 items-center">
          <button onClick={() => handlePresetClick('today')} className={presetButtonClass}>Hoy</button>
          <button onClick={() => handlePresetClick('weekend')} className={presetButtonClass}>Fin de semana</button>
          <button onClick={() => handlePresetClick('week')} className={presetButtonClass}>Esta semana</button>
          
          <button 
            onClick={onTogglePastEvents} 
            className={`flex-shrink-0 font-medium px-4 py-2 rounded-full text-sm transition-colors border ${
                showPastEvents 
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700 shadow-sm' 
                : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Anteriores
          </button>

          {(startDate || endDate) && (
            <button onClick={handleClear} className="flex-shrink-0 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-bold">
                Borrar Fechas
            </button>
          )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border ${showPastEvents ? 'opacity-50 pointer-events-none' : ''} border-slate-200 dark:border-slate-700`}>
          <label htmlFor="start-date" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">Desde</label>
          <input
            type="date"
            id="start-date"
            value={startDate || ''}
            onChange={(e) => onDateChange(e.target.value, endDate)}
            className="w-full bg-transparent text-slate-900 dark:text-white font-semibold focus:outline-none text-sm"
            disabled={showPastEvents}
          />
        </div>
        <div className={`bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border ${showPastEvents ? 'opacity-50 pointer-events-none' : ''} border-slate-200 dark:border-slate-700`}>
          <label htmlFor="end-date" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">Hasta</label>
          <input
            type="date"
            id="end-date"
            value={endDate || ''}
            onChange={(e) => onDateChange(startDate, e.target.value)}
            className="w-full bg-transparent text-slate-900 dark:text-white font-semibold focus:outline-none text-sm"
            disabled={showPastEvents}
          />
        </div>
      </div>
      {showPastEvents && (
          <p className="text-xs text-amber-600 dark:text-amber-400 text-center italic">
              Mostrando eventos pasados. Desactiva "Anteriores" para filtrar por fechas futuras.
          </p>
      )}
    </div>
  );
};

export default DateRangeFilter;
