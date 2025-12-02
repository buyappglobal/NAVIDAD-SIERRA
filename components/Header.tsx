import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from '../constants';

interface HeaderProps {
    view?: 'list' | 'calendar';
    setView?: (view: 'list' | 'calendar') => void;
    isMapVisible?: boolean;
    onMapClick?: () => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    isPwaInstallable?: boolean;
    onInstallClick?: () => void;
    onHomeClick?: () => void;
    onSuggestClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
    view, 
    setView, 
    isMapVisible, 
    onMapClick, 
    theme, 
    toggleTheme, 
    isPwaInstallable, 
    onInstallClick, 
    onHomeClick,
    onSuggestClick 
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleShareApp = async () => {
        const shareData = {
            title: 'La Sierra en Navidad',
            text: 'Descubre todos los eventos navideños en la Sierra de Aracena y Picos de Aroche con esta agenda cultural.',
            url: 'https://huelvalate.es/?share=app'
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error al compartir:', err);
            }
        } else {
            navigator.clipboard.writeText(shareData.url);
            alert('¡Enlace copiado al portapapeles! Compártelo con tus amigos.');
        }
        setIsMenuOpen(false);
    };

    return (
        <>
        <style>{`
            @keyframes cometSlideLeft {
                0% { transform: translateX(100vw); }
                100% { transform: translateX(-150%); }
            }
        `}</style>
        <header className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40 px-3 py-3 sm:p-4 shadow-lg mb-6 sm:mb-8 transition-all duration-300 relative overflow-hidden">
            
            {/* Borde Inferior Animado (Cometa de Derecha a Izquierda) */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] pointer-events-none overflow-hidden z-20">
                {/* Contenedor del cometa */}
                <div 
                    className="absolute bottom-0 left-0 h-full flex items-center"
                    style={{ 
                        animation: 'cometSlideLeft 6s linear infinite', // Un poco más lento que el de abajo
                        width: '150px',
                        willChange: 'transform'
                    }}
                >
                     {/* La Estrella (Cabeza) - Va primero porque nos movemos hacia la izquierda */}
                     <div className="relative -mr-1 text-amber-500 z-10 filter drop-shadow-[0_0_5px_rgba(251,191,36,0.9)]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                    </div>

                    {/* La Cola (Degradado de dorado a transparente) */}
                    <div className="flex-grow h-[2px] bg-gradient-to-r from-amber-500 via-amber-400/50 to-transparent rounded-full"></div>
                </div>
            </div>

            {/* Static Bottom Border Fallback (Visible underneath) */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-200 dark:bg-slate-800 -z-10"></div>

            <div className="container mx-auto flex justify-between items-center gap-2 sm:gap-4 relative z-30">
                 <div 
                    className="flex-shrink min-w-0 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={onHomeClick}
                 >
                    <h1 className="text-lg sm:text-3xl font-display text-orange-800 dark:text-amber-300 truncate leading-tight animate-fade-in">La Sierra en Navidad</h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 -mt-1 hidden sm:block truncate">Sierra de Aracena y Picos de Aroche</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2">
                    {/* View Toggler */}
                    {setView && (
                        <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-md flex gap-0.5 sm:gap-1 shadow-inner">
                            <button
                                onClick={() => setView('list')}
                                className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-1 text-sm rounded transition-colors ${view === 'list' && !isMapVisible ? 'bg-amber-400 text-slate-900 shadow-sm font-medium' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                                title="Vista de lista"
                            >
                                {ICONS.list}
                                <span className="hidden sm:inline">Lista</span>
                            </button>
                            <button
                                onClick={() => setView('calendar')}
                                 className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-1 text-sm rounded transition-colors ${view === 'calendar' && !isMapVisible ? 'bg-amber-400 text-slate-900 shadow-sm font-medium' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                                 title="Vista de calendario"
                            >
                               {ICONS.calendar}
                               <span className="hidden sm:inline">Calendario</span>
                            </button>
                            <button
                                onClick={onMapClick}
                                 className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-1 text-sm rounded transition-colors ${isMapVisible ? 'bg-amber-400 text-slate-900 shadow-sm font-medium' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                                 title="Mapa de eventos"
                            >
                               {ICONS.map}
                               <span className="hidden sm:inline">Mapa</span>
                            </button>
                        </div>
                    )}
                    
                    <div className="relative ml-0.5 sm:ml-2" ref={menuRef}>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-1.5 sm:p-2 rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300 shadow-sm"
                            aria-label="Más opciones"
                            title="Más opciones"
                        >
                            {ICONS.more}
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-md shadow-xl ring-1 ring-black ring-opacity-5 py-1 z-50 animate-fade-in border border-slate-200 dark:border-slate-700 transform origin-top-right">
                                {isPwaInstallable && (
                                    <button
                                        onClick={() => { onInstallClick?.(); setIsMenuOpen(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                    >
                                        {ICONS.addToHomeScreen}
                                        <span>Instalar App</span>
                                    </button>
                                )}
                                <button
                                    onClick={handleShareApp}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    {ICONS.share}
                                    <span>Compartir App</span>
                                </button>
                                <button
                                    onClick={() => { onSuggestClick?.(); setIsMenuOpen(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    {ICONS.add}
                                    <span>Sugerir Evento</span>
                                </button>
                                <button
                                    onClick={() => { toggleTheme(); setIsMenuOpen(false); }}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    {theme === 'light' ? ICONS.moon : ICONS.sun}
                                    <span>Cambiar a Tema {theme === 'light' ? 'Oscuro' : 'Claro'}</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
        </>
    );
};

export default Header;