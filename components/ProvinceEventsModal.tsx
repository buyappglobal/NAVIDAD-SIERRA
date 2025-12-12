
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ICONS, IMAGE_PLACEHOLDER } from '../constants';
import { PROVINCE_EVENTS, ProvinceEvent } from '../data/provinceEvents';
import { generateProvinceEventDetails } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';
import WeatherModal from './WeatherModal';
import { townCoordinates } from '../data/townCoordinates';

interface ProvinceEventsModalProps {
  onClose: () => void;
  initialEventId?: string | null;
}

const ZONES = ['Capital', 'Costa', 'Condado', 'Andévalo', 'Cuenca Minera'];

const ProvinceEventsModal: React.FC<ProvinceEventsModalProps> = ({ onClose, initialEventId }) => {
  const [selectedEvent, setSelectedEvent] = useState<ProvinceEvent | null>(null);
  const [eventDetails, setEventDetails] = useState<string | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  
  const [events, setEvents] = useState<ProvinceEvent[]>(PROVINCE_EVENTS);
  const [filterZone, setFilterZone] = useState<string>('Todas');
  
  // Dropdown states
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowZoneDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Initial Event Selection (Deep Linking from Map)
  useEffect(() => {
      if (initialEventId) {
          const evt = events.find(e => e.id === initialEventId);
          if (evt) {
              handleEventClick(evt);
          }
      }
  }, [initialEventId]);

  // Intentar obtener la API Key de forma segura
  const getApiKey = () => {
      try {
          // @ts-ignore
          return (typeof process !== 'undefined' && process.env && process.env.API_KEY) || sessionStorage.getItem('gemini-api-key');
      } catch (e) {
          return sessionStorage.getItem('gemini-api-key');
      }
  };

  // Filtrar eventos pasados y por zona
  const visibleEvents = useMemo(() => {
      const today = new Date().toISOString().split('T')[0];
      return events.filter(event => {
          // Filtro de fecha (futuros o sin fecha)
          const isFuture = !event.date || event.date >= today;
          
          // Filtro de zona (Location contiene la zona o es 'Todas')
          // Asumimos que location incluye el nombre de la zona (ej: "Huelva Capital")
          const matchesZone = filterZone === 'Todas' || (event.location && event.location.includes(filterZone));

          return isFuture && matchesZone;
      });
  }, [events, filterZone]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = IMAGE_PLACEHOLDER;
  };

  const handleShare = async () => {
    const shareUrl = "https://huelvalate.es/#/provincia";
    const shareData = {
        title: 'Más Navidad en Huelva',
        text: 'Descubre los mejores eventos navideños en la capital y el resto de la provincia de Huelva.',
        url: shareUrl
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Error sharing', err);
        }
    } else {
        navigator.clipboard.writeText(shareUrl);
        alert('Enlace copiado al portapapeles');
    }
  };

  const handleZoneSelect = (zone: string) => {
      setFilterZone(zone);
      setShowZoneDropdown(false);
  };

  const handleRefreshDetails = async () => {
      if (!selectedEvent) return;
      
      const apiKey = getApiKey();
      if (!apiKey) {
          alert("Configura tu clave API en el asistente primero.");
          return;
      }

      setDetailsLoading(true);
      
      try {
          const detailsResponse: any = await generateProvinceEventDetails(apiKey, selectedEvent.title || "", selectedEvent.location || "");
          
          let newTitle = selectedEvent.title;
          let newContent = "";

          if (typeof detailsResponse === 'object' && detailsResponse.content) {
              newContent = detailsResponse.content;
              if (detailsResponse.title) {
                  newTitle = detailsResponse.title;
                  setSelectedEvent(prev => prev ? { ...prev, title: newTitle } : null);
                  setEvents(prevEvents => prevEvents.map(e => e.id === selectedEvent.id ? { ...e, title: newTitle! } : e));
              }
          } else {
              newContent = typeof detailsResponse === 'string' ? detailsResponse : "Información no disponible.";
          }

          setEventDetails(newContent);
          
          const cacheKey = `prov_event_details_${selectedEvent.title}_${selectedEvent.location}`;
          try {
              sessionStorage.setItem(cacheKey, JSON.stringify({ title: newTitle, content: newContent }));
          } catch(e) {}

      } catch (error) {
          console.error(error);
          setEventDetails("Error al obtener detalles actualizados.");
      } finally {
          setDetailsLoading(false);
      }
  };

  const handleEventClick = async (event: ProvinceEvent) => {
      setSelectedEvent(event);
      setEventDetails(null); 
      setDetailsLoading(true);

      const cacheKey = `prov_event_details_${event.title}_${event.location}`;
      try {
          const cachedData = sessionStorage.getItem(cacheKey);
          if (cachedData) {
              try {
                  const parsed = JSON.parse(cachedData);
                  if (parsed.content) {
                      setEventDetails(parsed.content);
                      if (parsed.title) setSelectedEvent(prev => prev ? { ...prev, title: parsed.title } : null);
                  } else {
                      setEventDetails(cachedData); 
                  }
              } catch {
                  setEventDetails(cachedData); 
              }
              setDetailsLoading(false);
              return;
          }
      } catch(e) {
          console.warn("Session storage not available");
      }

      if (event.description) {
          setEventDetails(event.description);
          setDetailsLoading(false);
          return;
      }

      const apiKey = getApiKey();
      if (!apiKey) {
          setEventDetails("Configura tu clave API para generar los detalles completos de este evento.");
          setDetailsLoading(false);
          return;
      }

      try {
          const response: any = await generateProvinceEventDetails(apiKey, event.title || "", event.location || "");
          
          let content = "";
          let title = event.title;

          if (typeof response === 'object' && response.content) {
              content = response.content;
              if (response.title) {
                  title = response.title;
                  setSelectedEvent(prev => prev ? { ...prev, title: title } : null);
                  setEvents(prevEvents => prevEvents.map(e => e.id === event.id ? { ...e, title: title! } : e));
              }
          } else {
              content = typeof response === 'string' ? response : "Detalles no disponibles.";
          }

          setEventDetails(content);
          
          try {
              sessionStorage.setItem(cacheKey, JSON.stringify({ title, content }));
          } catch(e) {}

      } catch (error) {
          setEventDetails("Lo sentimos, no pudimos generar los detalles en este momento.");
      } finally {
          setDetailsLoading(false);
      }
  };

  // Helper para encontrar el mejor match de coordenadas para el tiempo
  const findBestTownMatch = (locationName?: string): string | null => {
      if (!locationName) return null;
      
      // 1. Match exacto
      if (townCoordinates[locationName]) return locationName;

      // 2. Match parcial (ej: "Lepe" machea con "Lepe (La Costa)")
      const keys = Object.keys(townCoordinates);
      const match = keys.find(k => k.includes(locationName) || locationName.includes(k));
      
      return match || null;
  };

  const formatDate = (dateStr?: string) => {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-0 z-[80] backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full h-full md:h-[90vh] md:w-[90vw] md:rounded-xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full text-amber-600 dark:text-amber-400">
                {ICONS.globe}
            </div>
            <div>
                <h2 className="text-xl font-display text-slate-900 dark:text-white leading-tight">Más Navidad en Huelva</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Eventos en la Costa, Condado y Capital.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
                onClick={handleShare}
                className="p-2 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-full transition-colors flex items-center gap-1"
                title="Compartir sección"
            >
                {ICONS.share}
                <span className="text-xs font-bold hidden sm:inline">Compartir</span>
            </button>
            <button onClick={onClose} className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                {ICONS.close}
            </button>
          </div>
        </div>

        {/* Toolbar Filtros */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center relative">
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Filtra por zonas para ver qué hay cerca de ti.
            </p>
            
            {/* ZONES DROPDOWN CONTAINER */}
            <div className="relative ml-auto" ref={dropdownRef}>
                <button 
                    onClick={() => setShowZoneDropdown(!showZoneDropdown)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-500 transition-colors shadow-md"
                >
                    {ICONS.filter}
                    {filterZone === 'Todas' ? 'Filtrar por Zona' : filterZone}
                    <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {showZoneDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden animate-fade-in-up">
                        <div className="py-1">
                            <button
                                onClick={() => handleZoneSelect('Todas')}
                                className={`block w-full text-left px-4 py-2 text-sm border-b border-slate-100 dark:border-slate-700 ${filterZone === 'Todas' ? 'font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                            >
                                Todas las Zonas
                            </button>
                            {ZONES.map((zone) => (
                                <button
                                    key={zone}
                                    onClick={() => handleZoneSelect(zone)}
                                    className={`block w-full text-left px-4 py-2 text-sm ${filterZone === zone ? 'font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                                >
                                    {zone}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-black/20">
            {visibleEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400 opacity-60">
                    {ICONS.gallery}
                    <p className="mt-4 text-sm">No hay eventos en esta zona por ahora.</p>
                    <button onClick={() => setFilterZone('Todas')} className="mt-2 text-purple-500 hover:underline text-sm font-bold">
                        Ver todas las zonas
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-20">
                    {visibleEvents.map((event) => (
                        <div 
                            key={event.id} 
                            className="group relative aspect-video sm:aspect-[3/4] bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border border-slate-200 dark:border-slate-700 flex flex-col"
                            onClick={() => handleEventClick(event)}
                        >
                            {/* Imagen de fondo (con overlay oscuro para legibilidad) */}
                            <div className="absolute inset-0">
                                <img 
                                    src={event.imageUrl} 
                                    alt={event.title || 'Evento Provincia'} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                    onError={handleImageError}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                            </div>

                            {/* Contenido Texto */}
                            <div className="relative z-10 flex flex-col justify-end h-full p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white shadow-sm">
                                        {event.location}
                                    </span>
                                    {event.date && (
                                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-black/50 text-white shadow-sm backdrop-blur-sm">
                                            {formatDate(event.date)}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-white font-display font-bold text-lg leading-tight mb-2 group-hover:text-amber-300 transition-colors">
                                    {event.title}
                                </h3>
                                <div className="flex items-center text-slate-300 text-xs gap-1 mt-1">
                                    <span className="bg-white/20 p-1 rounded-full">{ICONS.add}</span>
                                    <span>Clic para ver info</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* DETAILS OVERLAY (Modal Text) */}
        {selectedEvent && (
            <div 
                className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
                onClick={() => setSelectedEvent(null)}
            >
                <div 
                    className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-slate-200 dark:border-slate-700"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header Overlay */}
                    <div className="relative h-32 bg-slate-900 flex-shrink-0">
                        <img 
                            src={selectedEvent.imageUrl} 
                            className="w-full h-full object-cover opacity-50" 
                            alt="Header"
                            onError={handleImageError}
                        />
                        <div className="absolute inset-0 flex items-center p-6">
                            <h2 className="text-2xl font-display font-bold text-white shadow-black drop-shadow-md">
                                {selectedEvent.title}
                            </h2>
                        </div>
                        <button 
                            className="absolute top-2 right-2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors"
                            onClick={() => setSelectedEvent(null)}
                        >
                            {ICONS.close}
                        </button>
                    </div>

                    {/* Content Scrollable */}
                    <div className="p-6 overflow-y-auto flex-1 bg-white dark:bg-slate-800">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                                    {ICONS.map} {selectedEvent.location}
                                </span>
                                {selectedEvent.date && (
                                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 capitalize ml-6">
                                        📅 {new Date(selectedEvent.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex gap-2">
                                {/* Botón El Tiempo */}
                                {findBestTownMatch(selectedEvent.location) && (
                                    <button
                                        onClick={() => setShowWeatherModal(true)}
                                        className="flex items-center gap-2 bg-sky-100 dark:bg-sky-900/30 hover:bg-sky-200 dark:hover:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-xs font-bold px-3 py-1.5 rounded-full transition-colors border border-sky-200 dark:border-sky-800"
                                    >
                                        {ICONS.cloudSun}
                                        Tiempo
                                    </button>
                                )}

                                {/* Botón IA Específico del Evento */}
                                <button
                                    onClick={handleRefreshDetails}
                                    disabled={detailsLoading}
                                    className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold px-3 py-1.5 rounded-full transition-colors border border-purple-200 dark:border-purple-800 disabled:opacity-50"
                                >
                                    {detailsLoading ? (
                                        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    ) : ICONS.sparkles}
                                    Investigar con IA
                                </button>
                            </div>
                        </div>

                        {detailsLoading ? (
                            <div className="py-8 text-center">
                                <svg className="animate-spin h-8 w-8 text-purple-600 mx-auto mb-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p className="text-slate-600 dark:text-slate-300 animate-pulse">La IA está buscando detalles...</p>
                            </div>
                        ) : (
                            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                                <MarkdownRenderer text={eventDetails || "No hay información disponible. Pulsa 'Investigar con IA'."} />
                            </div>
                        )}
                    </div>

                    {/* Footer Warning */}
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border-t border-amber-100 dark:border-amber-800/30 text-center">
                        <p className="text-[10px] text-amber-700 dark:text-amber-400 flex items-center justify-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Información generada por IA. Recomendamos verificar con fuentes oficiales.
                        </p>
                    </div>
                </div>
            </div>
        )}

        {/* Weather Modal for Province Events */}
        {showWeatherModal && selectedEvent && (
            <WeatherModal
                town={findBestTownMatch(selectedEvent.location) || selectedEvent.location || "Huelva"}
                date={selectedEvent.date || new Date().toISOString().split('T')[0]}
                onClose={() => setShowWeatherModal(false)}
            />
        )}

      </div>
    </div>
  );
};

export default ProvinceEventsModal;
