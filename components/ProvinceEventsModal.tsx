
import React, { useState } from 'react';
import { ICONS, IMAGE_PLACEHOLDER } from '../constants';
import { PROVINCE_EVENTS, ProvinceEvent } from '../data/provinceEvents';
import { findProvinceEvents, generateProvinceEventDetails } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';

interface ProvinceEventsModalProps {
  onClose: () => void;
}

const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1887&auto=format&fit=crop", // Luces genéricas
    "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1969&auto=format&fit=crop", // Mercado navidad
    "https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=2069&auto=format&fit=crop", // Decoración calle
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Muelle_de_Rio_Tinto.jpg/1200px-Muelle_de_Rio_Tinto.jpg", // Muelle Tinto
    "https://multimedia.andalucia.org/media/F3501E356673479B890DC83063673322/img/4955722340B94028A799DC972D738739/12-11-21_belen_viviente_beas_04.jpg?SX=1600&SY=900", // Belén
    "https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=2070&auto=format&fit=crop", // Luces ciudad
];

const ProvinceEventsModal: React.FC<ProvinceEventsModalProps> = ({ onClose }) => {
  const [selectedEvent, setSelectedEvent] = useState<ProvinceEvent | null>(null);
  const [eventDetails, setEventDetails] = useState<string | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  
  const [events, setEvents] = useState<ProvinceEvent[]>(PROVINCE_EVENTS);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Intentar obtener la API Key de forma segura
  const getApiKey = () => {
      try {
          // @ts-ignore
          return (typeof process !== 'undefined' && process.env && process.env.API_KEY) || sessionStorage.getItem('gemini-api-key');
      } catch (e) {
          return sessionStorage.getItem('gemini-api-key');
      }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = IMAGE_PLACEHOLDER;
  };

  const handleShare = async () => {
    // Construct sharing URL with hash - Force production domain
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

  const handleAiSearch = async () => {
      const apiKey = getApiKey();
      if (!apiKey) {
          alert("Necesitas configurar tu clave API en el Asistente IA primero.");
          return;
      }

      setIsLoading(true);
      try {
          const results = await findProvinceEvents(apiKey);
          if (results && results.length > 0) {
              // Mapear resultados a ProvinceEvent
              const newEvents: ProvinceEvent[] = results.map((item: any, index: number) => ({
                  id: `ai-prov-${Date.now()}-${index}`,
                  imageUrl: FALLBACK_IMAGES[index % FALLBACK_IMAGES.length], // Usamos fallbacks seguros
                  title: item.title || "Evento Navideño",
                  location: item.location || "Huelva Provincia"
              }));
              setEvents(newEvents);
              setHasSearched(true);
          } else {
              alert("La IA no encontró nuevos eventos en este momento.");
          }
      } catch (error) {
          console.error(error);
          alert("Error al buscar eventos. Inténtalo de nuevo más tarde.");
      } finally {
          setIsLoading(false);
      }
  };

  const handleRefreshDetails = async () => {
      if (!selectedEvent) return;
      
      const apiKey = getApiKey();
      if (!apiKey) {
          alert("Configura tu clave API primero.");
          return;
      }

      setDetailsLoading(true);
      
      try {
          // Ya no esperamos un simple string, sino un objeto JSON { title, content }
          const detailsResponse: any = await generateProvinceEventDetails(apiKey, selectedEvent.title || "", selectedEvent.location || "");
          
          let newTitle = selectedEvent.title;
          let newContent = "";

          // Comprobamos si la respuesta es un objeto (JSON parseado en el servicio) o texto plano (fallback)
          if (typeof detailsResponse === 'object' && detailsResponse.content) {
              newContent = detailsResponse.content;
              if (detailsResponse.title) {
                  newTitle = detailsResponse.title;
                  // Actualizamos el título del evento seleccionado en la vista
                  setSelectedEvent(prev => prev ? { ...prev, title: newTitle } : null);
                  // También actualizamos la lista principal para que se refleje al cerrar el modal
                  setEvents(prevEvents => prevEvents.map(e => e.id === selectedEvent.id ? { ...e, title: newTitle! } : e));
              }
          } else {
              newContent = typeof detailsResponse === 'string' ? detailsResponse : "Información no disponible.";
          }

          setEventDetails(newContent);
          
          // Actualizar caché
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
      setEventDetails(null); // Reset details
      setDetailsLoading(true);

      // 1. Comprobar CACHÉ de sesión (prioridad máxima)
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

      // 2. Comprobar si el evento trae su propia DESCRIPCIÓN (Eventos por defecto = Coste 0)
      if (event.description) {
          setEventDetails(event.description);
          setDetailsLoading(false);
          return;
      }

      // 3. Si no hay caché ni descripción, es un evento nuevo de IA o uno sin datos.
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

        {/* Toolbar IA */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Descubre 5 planes aleatorios fuera de la Sierra.
            </p>
            <button 
                onClick={handleAiSearch}
                disabled={isLoading}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md ml-auto"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Buscando...
                    </>
                ) : (
                    <>
                        {ICONS.sparkles}
                        {hasSearched ? "Actualizar Lista (5)" : "Buscar con IA"}
                    </>
                )}
            </button>
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-black/20">
            {events.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400 opacity-60">
                    {ICONS.gallery}
                    <p className="mt-4 text-sm">No hay eventos cargados. ¡Prueba el botón de IA!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-20">
                    {events.map((event) => (
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
                                <div className="mb-2">
                                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white mb-2 shadow-sm">
                                        {event.location}
                                    </span>
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
                        <div className="flex items-center justify-between gap-2 mb-4">
                            <span className="text-sm font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                                {ICONS.map} {selectedEvent.location}
                            </span>
                            
                            {/* BOTÓN EXPLÍCITO DE BÚSQUEDA ESPECÍFICA */}
                            <button
                                onClick={handleRefreshDetails}
                                disabled={detailsLoading}
                                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold px-3 py-1.5 rounded-full transition-colors border border-purple-200 dark:border-purple-800 disabled:opacity-50"
                            >
                                {detailsLoading ? (
                                    <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : ICONS.sparkles}
                                Investigar este evento con IA
                            </button>
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
                                <MarkdownRenderer text={eventDetails || "No hay información disponible."} />
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

      </div>
    </div>
  );
};

export default ProvinceEventsModal;
