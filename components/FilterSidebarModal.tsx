
import React from 'react';
import FilterSidebar from './FilterSidebar';
import { ICONS } from '../constants';
import { EventCategory } from '../types';

interface Town {
  id: string;
  name: string;
}

interface FilterSidebarModalProps {
    onClose: () => void;
    resultsCount: number;
    towns: Town[];
    selectedTowns: string[]; // Changed to array
    onSelectTown: (townId: string) => void;
    selectedCategories: string[];
    onCategoryToggle: (category: EventCategory) => void;
    startDate: string | null;
    endDate: string | null;
    onDateChange: (start: string | null, end: string | null) => void;
    availableCategories?: EventCategory[];
    eventCounts?: Record<string, number>;
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
    sortBy: 'date' | 'popularity';
    onSortChange: (sort: 'date' | 'popularity') => void;
    filterType: 'all' | 'favorites' | 'attending';
    onFilterTypeChange: (type: 'all' | 'favorites' | 'attending') => void;
}

const FilterSidebarModal: React.FC<FilterSidebarModalProps> = (props) => {
    const { onClose, resultsCount, ...filterProps } = props;

    const getButtonText = () => {
        if (resultsCount === 0) return "Aplicar (0 Resultados)";
        if (resultsCount === 1) return "Aplicar Filtros (1 Evento)";
        return `Aplicar Filtros (${resultsCount} Eventos)`;
    };

    return (
        <div className="fixed inset-0 z-[120] flex items-end justify-center pointer-events-none">
            {/* Backdrop con blur */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" 
                onClick={onClose} 
            />
            
            {/* Bottom Sheet Container */}
            <div className="bg-white dark:bg-slate-900 w-full max-h-[90vh] rounded-t-3xl shadow-2xl flex flex-col pointer-events-auto animate-slide-up transform transition-transform border-t border-slate-200 dark:border-slate-800 relative overflow-hidden">
                
                {/* Drag Handle Indicator */}
                <div className="flex justify-center pt-3 pb-1 cursor-pointer flex-shrink-0 z-10 bg-white dark:bg-slate-900" onClick={onClose}>
                    <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full" />
                </div>

                {/* Header Compacto */}
                <div className="flex justify-between items-center px-6 py-2 border-b border-slate-100 dark:border-slate-800 flex-shrink-0 bg-white dark:bg-slate-900 z-10">
                    <h2 className="text-lg font-bold font-display text-slate-800 dark:text-slate-200">Filtrar Agenda</h2>
                    <button 
                        onClick={onClose} 
                        className="p-2 -mr-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                    >
                        {ICONS.close}
                    </button>
                </div>

                {/* Content Scrollable */}
                {/* PB-48 es crucial: añade mucho espacio al final del scroll para que el último elemento 
                    se vea por encima del botón flotante */}
                <div className="flex-1 overflow-y-auto px-6 pt-4 pb-48 space-y-6 overscroll-contain">
                    <FilterSidebar {...filterProps} onFilterAndClose={undefined} />
                </div>

                {/* Sticky/Absolute Footer Button - Flotando sobre el contenido */}
                <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 md:pb-8 bg-gradient-to-t from-white via-white to-white/90 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900/90 z-20 border-t border-slate-100 dark:border-slate-800">
                    <button 
                        onClick={onClose} 
                        className="w-full bg-amber-400 text-slate-900 font-bold text-lg py-4 px-6 rounded-2xl hover:bg-amber-500 active:scale-[0.98] transition-all shadow-xl flex justify-center items-center gap-2"
                    >
                       <span className="text-slate-800">{ICONS.checkCircle}</span>
                        {getButtonText()}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebarModal;
