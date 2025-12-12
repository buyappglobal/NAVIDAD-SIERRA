
import React from 'react';
import { ICONS } from '../constants';

interface MenuModalProps {
    onClose: () => void;
    onInstall?: () => void;
    onSuggest: () => void;
    toggleTheme: () => void;
    onInfo: () => void;
    onProvinceEvents: () => void;
    onPassport?: () => void; 
    onVideoGallery?: () => void;
    isPwaInstallable: boolean;
    theme: 'light' | 'dark';
}

const MenuModal: React.FC<MenuModalProps> = ({
    onClose,
    onInstall,
    onSuggest,
    toggleTheme,
    onInfo,
    onProvinceEvents,
    onPassport,
    onVideoGallery,
    isPwaInstallable,
    theme
}) => {

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
    };

    const handleTestAnalytics = () => {
        if (window.gtag) {
            window.gtag('event', 'test_pwa_connection', {
                'event_category': 'debug',
                'value': 1,
                'debug_mode': true
            });
            alert("✅ Evento de prueba enviado a Google Analytics.");
        } else {
            alert("❌ Error: Google Analytics no está cargado.");
        }
    };

    // Botón de Grid (Cuadrícula)
    const GridButton = ({ icon, label, onClick, colorClass }: { icon: any, label: string, onClick: () => void, colorClass: string }) => (
        <button 
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-all active:scale-95 hover:shadow-md ${colorClass}`}
        >
            <div className="mb-2 text-3xl">
                {icon}
            </div>
            <span className="text-xs font-bold text-center leading-tight">{label}</span>
        </button>
    );

    // Botón de Lista (Herramientas)
    const ListButton = ({ icon, label, onClick, extra }: { icon: any, label: string, onClick: () => void, extra?: React.ReactNode }) => (
        <button 
            onClick={onClick}
            className="w-full flex items-center justify-between px-4 py-3.5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0"
        >
            <div className="flex items-center gap-3">
                <span className="text-slate-400 dark:text-slate-500">{icon}</span>
                <span className="font-medium text-sm">{label}</span>
            </div>
            {extra && <div className="text-slate-400">{extra}</div>}
        </button>
    );

    return (
        <div className="fixed inset-0 z-[60] flex items-end justify-center pointer-events-none">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={onClose} />
            
            <div className="bg-white dark:bg-slate-900 w-full rounded-t-3xl shadow-2xl flex flex-col pointer-events-auto animate-slide-up transform transition-transform border-t border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-hidden">
                
                {/* Cabecera Visual con Imagen de Fondo */}
                <div className="relative h-40 flex-shrink-0 bg-slate-900 overflow-hidden group">
                    <img 
                        src="https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1920&auto=format&fit=crop" 
                        alt="Fondo Navideño" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1544256673-9825eb270a41?q=80&w=1920&auto=format&fit=crop"; // Fallback
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    
                    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
                        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto backdrop-blur-md cursor-pointer" onClick={onClose} />
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                        <h2 className="text-2xl font-display font-bold text-white mb-1 drop-shadow-md">Menú</h2>
                        <p className="text-slate-200 text-sm font-medium drop-shadow-md">Explora, descubre y comparte la Sierra.</p>
                    </div>

                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 bg-black/30 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/50 transition-colors"
                    >
                        {ICONS.close}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 p-6 pb-safe">
                    
                    {/* SECCIÓN 1: CONTENIDO DESTACADO (GRID) */}
                    <div className="mb-8">
                        <h3 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-3 tracking-wider ml-1">Explora</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {onPassport && (
                                <GridButton 
                                    icon="🛂" 
                                    label="Mi Pasaporte" 
                                    onClick={() => { onPassport(); onClose(); }} 
                                    colorClass="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                                />
                            )}
                            {onVideoGallery && (
                                <GridButton 
                                    icon="📺" 
                                    label="Turisteando TV" 
                                    onClick={() => { onVideoGallery(); onClose(); }} 
                                    colorClass="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-100 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40"
                                />
                            )}
                            <GridButton 
                                icon="🌍" 
                                label="Más de Huelva" 
                                onClick={() => { onProvinceEvents(); onClose(); }} 
                                colorClass="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/40"
                            />
                            <GridButton 
                                icon="💡" 
                                label="Sugerir Evento" 
                                onClick={() => { onSuggest(); onClose(); }} 
                                colorClass="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
                            />
                        </div>
                    </div>

                    {/* SECCIÓN 2: HERRAMIENTAS (LISTA) */}
                    <div>
                        <h3 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-3 tracking-wider ml-1">Herramientas</h3>
                        <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
                            
                            {isPwaInstallable && (
                                <ListButton 
                                    icon={ICONS.addToHomeScreen} 
                                    label="Instalar Aplicación" 
                                    onClick={() => { onInstall?.(); onClose(); }} 
                                />
                            )}

                            <ListButton 
                                icon={ICONS.share} 
                                label="Compartir App" 
                                onClick={handleShareApp} 
                            />

                            <ListButton 
                                icon={theme === 'light' ? ICONS.moon : ICONS.sun} 
                                label={`Cambiar a Tema ${theme === 'light' ? 'Oscuro' : 'Claro'}`} 
                                onClick={toggleTheme} 
                            />

                            <ListButton 
                                icon={ICONS.info} 
                                label="Sobre la App" 
                                onClick={() => { onInfo(); onClose(); }} 
                            />

                            {/* Debug Button (Oculto visualmente pero accesible) */}
                            <button onClick={handleTestAnalytics} className="w-full text-center py-2 text-[10px] text-slate-300 dark:text-slate-700 hover:text-slate-500 flex items-center justify-center gap-1 opacity-50">
                                {ICONS.chart} v2.0.2 (Debug)
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MenuModal;
