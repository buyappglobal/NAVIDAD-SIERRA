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
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
    selectedCategories: string[];
    onCategoryToggle: (category: EventCategory) => void;
    startDate: string | null;
    endDate: string | null;
    onDateChange: (start: string | null, end: string | null) => void;
    availableCategories?: EventCategory[];
    eventCounts?: Record<string, number>;
}

const FilterSidebarModal: React.FC<FilterSidebarModalProps> = (props) => {
    const { onClose, resultsCount, ...filterProps } = props;

    const getButtonText = () => {
        if (resultsCount === 1) {
            return `Ver 1 Evento`;
        }
        return `Ver ${resultsCount} Eventos`;
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-end justify-center pointer-events-none">
            {/* Backdrop con blur */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" 
                onClick={onClose} 
            />
            
            {/* Bottom Sheet Container */}
            <div className="bg-white dark:bg-slate-900 w-full max-h-[90vh] rounded-t-3xl shadow-2xl flex flex-col pointer-events-auto animate-slide-up transform transition-transform border-t border-slate-200 dark:border-slate-800">
                
                {/* Drag Handle Indicator */}
                <div className="flex justify-center pt-3 pb-1" onClick={onClose}>
                    <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full" />
                </div>

                {/* Header Compacto */}
                <div className="flex justify-between items-center px-6 py-2 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
                    <h2 className="text-lg font-bold font-display text-slate-800 dark:text-slate-200">Filtrar</h2>
                    <button 
                        onClick={onClose} 
                        className="p-2 -mr-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                    >
                        {ICONS.close}
                    </button>
                </div>

                {/* Content Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                    <FilterSidebar {...filterProps} onFilterAndClose={undefined} />
                    {/* Espaciador para no tapar contenido con el botón sticky */}
                    <div className="h-24"></div>
                </div>

                {/* Sticky Footer Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 rounded-t-2xl">
                    <button 
                        onClick={onClose} 
                        className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg py-3 px-6 rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex justify-center items-center gap-2"
                    >
                       {ICONS.list}
                        {getButtonText()}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebarModal;