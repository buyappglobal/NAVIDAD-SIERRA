import React from 'react';
import { ICONS, GOOGLE_FORM_URL } from '../constants';

interface HeaderProps {
    view?: 'list' | 'calendar';
    setView?: (view: 'list' | 'calendar') => void;
    isMapVisible?: boolean;
    onMapClick?: () => void;
    isLoggedIn?: boolean;
    onAddEventClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ view, setView, isMapVisible, onMapClick, isLoggedIn, onAddEventClick }) => {
    return (
        <header className="bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40 p-4 shadow-lg mb-8">
            <div className="container mx-auto flex justify-between items-center gap-4">
                 <div className="flex-shrink-0">
                    <h1 className="text-2xl sm:text-3xl font-display text-amber-300 whitespace-nowrap">La Sierra en Navidad</h1>
                    <p className="text-xs sm:text-sm text-slate-400 -mt-1 hidden sm:block">Sierra de Aracena y Picos de Aroche</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* View Toggler */}
                    {setView && (
                        <div className="bg-slate-800 p-1 rounded-md flex gap-1">
                            <button
                                onClick={() => setView('list')}
                                className={`flex items-center gap-2 px-3 py-1 text-sm rounded transition-colors ${view === 'list' && !isMapVisible ? 'bg-amber-400 text-slate-900' : 'text-slate-300 hover:bg-slate-700'}`}
                            >
                                {ICONS.list}
                                <span className="hidden sm:inline">Lista</span>
                            </button>
                            <button
                                onClick={() => setView('calendar')}
                                 className={`flex items-center gap-2 px-3 py-1 text-sm rounded transition-colors ${view === 'calendar' && !isMapVisible ? 'bg-amber-400 text-slate-900' : 'text-slate-300 hover:bg-slate-700'}`}
                            >
                               {ICONS.calendar}
                               <span className="hidden sm:inline">Calendario</span>
                            </button>
                            <button
                                onClick={onMapClick}
                                 className={`flex items-center gap-2 px-3 py-1 text-sm rounded transition-colors ${isMapVisible ? 'bg-amber-400 text-slate-900' : 'text-slate-300 hover:bg-slate-700'}`}
                            >
                               {ICONS.map}
                               <span className="hidden sm:inline">Mapa</span>
                            </button>
                        </div>
                    )}
                    
                    {isLoggedIn ? (
                         <button
                            onClick={onAddEventClick}
                            className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-500 transition-colors ml-2"
                            title="Añadir un nuevo evento"
                        >
                            {ICONS.add}
                            <span className="hidden sm:inline">Añadir Evento</span>
                        </button>
                    ) : (
                        <a
                            href={GOOGLE_FORM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-500 transition-colors ml-2"
                            title="Sugiere un nuevo evento"
                        >
                            {ICONS.add}
                            <span className="hidden sm:inline">Sugerir Evento</span>
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;