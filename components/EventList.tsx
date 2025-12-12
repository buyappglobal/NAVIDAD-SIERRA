
import React, { useState, useMemo } from 'react';
import { EventType, EventCategory } from '../types';
import EventCard from './EventCard';
import { TOWNS, ICONS, ENABLE_AI_SEARCH } from '../constants';

interface EventListProps {
  events: EventType[];
  onSelectEvent: (eventId: string) => void;
  onResetFilters: () => void;
  onCategoryFilterClick: (category: EventCategory) => void;
  isAnyFilterActive: boolean;
  isLoading?: boolean;
  selectedTownIds: string[];
  selectedCategories: string[];
  onUpdateEvent: (updatedEvent: EventType) => void;
  // New handlers
  onShowInterest: (event: EventType) => void;
  onShowPlan: (event: EventType) => void;
  onShowWeather: (event: EventType) => void;
}

const FEED_BANNER_URL = "https://solonet.es/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-02-at-14.11.06.jpeg";

// Tipos de sub-filtros para la campaña
type CampaignType = 'todos' | 'musica' | 'teatro' | 'zambomba' | 'infantil';

const EventList: React.FC<EventListProps> = ({ 
    events, 
    onSelectEvent, 
    onResetFilters, 
    onCategoryFilterClick, 
    isAnyFilterActive, 
    isLoading,
    selectedTownIds,
    selectedCategories,
    onUpdateEvent,
    onShowInterest,
    onShowPlan,
    onShowWeather
}) => {
  
  // Estados locales para los filtros de la campaña
  const [campaignTypeFilter, setCampaignTypeFilter] = useState<CampaignType>('todos');
  const [campaignTownFilter, setCampaignTownFilter] = useState<string>('todos');

  // Logic to determine what town name(s) to show
  const getTownsHeader = () => {
      if (selectedTownIds.length === 0) return null;
      if (selectedTownIds.length === 1) {
          return TOWNS.find(t => t.id === selectedTownIds[0])?.name;
      }
      if (selectedTownIds.length <= 3) {
          return selectedTownIds.map(id => TOWNS.find(t => t.id === id)?.name).filter(Boolean).join(", ");
      }
      return `${selectedTownIds.length} Pueblos Seleccionados`;
  };

  const selectedTownName = getTownsHeader();
  const isTierraCulturaActive = selectedCategories.includes(EventCategory.TIERRA_DE_CULTURA);

  // --- LÓGICA DE FILTRADO INTERNO PARA TIERRA DE CULTURA ---
  const { filteredEvents, availableCampaignTowns } = useMemo(() => {
      // Si no estamos en la campaña, devolvemos los eventos tal cual
      if (!isTierraCulturaActive) {
          return { filteredEvents: events, availableCampaignTowns: [] };
      }

      // 1. Filtrar eventos de la campaña (excluyendo el banner padre si ya filtramos)
      let campaignEvents = events;
      
      // Si aplicamos filtros internos, ocultamos el evento "Portada/Padre" para ver solo los resultados
      if (campaignTypeFilter !== 'todos' || campaignTownFilter !== 'todos') {
          campaignEvents = campaignEvents.filter(e => e.id !== 'campaign-tierra-cultura');
      }

      // 2. Extraer pueblos disponibles en esta campaña para el dropdown
      const townsInCampaign = Array.from(new Set(events
          .filter(e => e.id !== 'campaign-tierra-cultura') // Excluir portada
          .map(e => e.town)
      )).sort();

      // 3. Aplicar Filtro de TIPO
      if (campaignTypeFilter !== 'todos') {
          campaignEvents = campaignEvents.filter(e => {
              const text = (e.title + ' ' + e.description).toLowerCase();
              switch (campaignTypeFilter) {
                  case 'musica':
                      return text.includes('concierto') || text.includes('coral') || text.includes('banda') || text.includes('orquesta') || text.includes('música') || text.includes('recital') || text.includes('macarena') || text.includes('argentina') || text.includes('regina') || text.includes('mellis') || text.includes('rocío medina') || text.includes('the baton');
                  case 'teatro':
                      return text.includes('teatro') || text.includes('monólogo') || text.includes('escena') || text.includes('naife') || text.includes('actor') || text.includes('actriz');
                  case 'zambomba':
                      return text.includes('zambomba') || text.includes('villancicos');
                  case 'infantil':
                      return text.includes('magia') || text.includes('circo') || text.includes('aloló') || text.includes('familiar') || text.includes('niños') || text.includes('infantil');
                  default:
                      return true;
              }
          });
      }

      // 4. Aplicar Filtro de PUEBLO
      if (campaignTownFilter !== 'todos') {
          campaignEvents = campaignEvents.filter(e => e.town === campaignTownFilter);
      }

      return { filteredEvents: campaignEvents, availableCampaignTowns: townsInCampaign };
  }, [events, isTierraCulturaActive, campaignTypeFilter, campaignTownFilter]);


  const renderTownHeader = () => {
    if (!selectedTownName) return null;
    
    const cleanBaseUrl = "https://huelvalate.es";

    const shareUrl = selectedTownIds.length === 1 
        ? `${cleanBaseUrl}/#/pueblo/${selectedTownIds[0]}` 
        : `${cleanBaseUrl}/`;
        
    const shareText = `¡Descubre la agenda de eventos de Navidad en ${selectedTownName} (Huelva)!`;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(`Eventos en ${selectedTownName}`)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;

    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-6 border-l-4 border-amber-400 animate-fade-in flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 font-display">
                Eventos en <span className="text-amber-500 dark:text-amber-400">{selectedTownName}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Descubre todo lo que ofrece esta selección de la Sierra.
            </p>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase mr-2">Compartir:</span>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" title="Compartir en WhatsApp" className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400 transition-colors">
              {ICONS.whatsapp}
            </a>
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" title="Compartir en Facebook" className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors">
              {ICONS.facebook}
            </a>
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" title="Compartir en X" className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 hover:text-black dark:hover:bg-slate-600 dark:hover:text-white transition-colors">
              {ICONS.twitter}
            </a>
            <a href={emailUrl} title="Compartir por Email" className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-100 hover:text-amber-600 dark:hover:bg-amber-900/30 dark:hover:text-amber-400 transition-colors">
              {ICONS.email}
            </a>
        </div>
      </div>
    );
  };

  const renderCampaignHeader = () => {
      // Check if Tierra de Cultura is selected
      if (!isTierraCulturaActive) return null;

      const shareUrl = `${window.location.origin}${window.location.pathname}#/categoria/${encodeURIComponent(EventCategory.TIERRA_DE_CULTURA)}`;
      const shareText = "Descubre la programación completa de Tierra de Cultura en la provincia de Huelva.";

      const handleShare = async () => {
          if (navigator.share) {
              try {
                  await navigator.share({
                      title: 'Tierra de Cultura - Programación',
                      text: shareText,
                      url: shareUrl
                  });
              } catch (err) {
                  console.error('Error sharing:', err);
              }
          } else {
              navigator.clipboard.writeText(shareUrl);
              alert('Enlace copiado al portapapeles');
          }
      };

      return (
          <div className="bg-gradient-to-r from-cyan-900 to-blue-900 text-white p-6 rounded-lg shadow-md mb-4 border-l-4 border-cyan-400 animate-fade-in flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-cyan-500 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>

                <div className="relative z-10 max-w-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Campaña Oficial</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display mb-2 leading-tight">Tierra de Cultura</h2>
                    <p className="text-cyan-100 text-sm">
                        Programación especial de la Diputación de Huelva. Artes escénicas y música por toda la provincia.
                    </p>
                </div>
                <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
                    <button 
                        onClick={handleShare}
                        className="flex items-center gap-2 bg-white text-cyan-900 font-bold py-3 px-6 rounded-full hover:bg-cyan-50 transition-colors shadow-lg active:scale-95"
                    >
                        {ICONS.share}
                        Compartir
                    </button>
                </div>
          </div>
      );
  };

  // --- COMPONENTE MENÚ DE FILTROS ESPECÍFICO DE CAMPAÑA ---
  const renderCampaignFilterMenu = () => {
      if (!isTierraCulturaActive) return null;

      const typeButtons: { id: CampaignType; label: string; icon: string }[] = [
          { id: 'todos', label: 'Todo', icon: '📋' },
          { id: 'musica', label: 'Música', icon: '🎶' },
          { id: 'zambomba', label: 'Zambombas', icon: '💃' },
          { id: 'teatro', label: 'Teatro', icon: '🎭' },
          { id: 'infantil', label: 'Familiar', icon: '🤹' },
      ];

      return (
          <div className="mb-6 sticky top-[70px] z-20 animate-fade-in">
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl border border-cyan-200 dark:border-cyan-800 p-3 shadow-lg flex flex-col gap-3">
                  
                  {/* Fila 1: Tipos de Espectáculo */}
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                      {typeButtons.map(btn => (
                          <button
                              key={btn.id}
                              onClick={() => setCampaignTypeFilter(btn.id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                                  campaignTypeFilter === btn.id
                                  ? 'bg-cyan-600 text-white border-cyan-600 shadow-md transform scale-105'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/30'
                              }`}
                          >
                              <span>{btn.icon}</span>
                              {btn.label}
                          </button>
                      ))}
                  </div>

                  {/* Fila 2: Selector de Pueblo y Contador */}
                  <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <div className="relative flex-grow max-w-[200px]">
                          <select
                              value={campaignTownFilter}
                              onChange={(e) => setCampaignTownFilter(e.target.value)}
                              className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 py-1.5 pl-3 pr-8 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          >
                              <option value="todos">🌍 Todos los pueblos</option>
                              {availableCampaignTowns.map(town => (
                                  <option key={town} value={town}>{town}</option>
                              ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                          </div>
                      </div>

                      <div className="text-xs font-bold text-cyan-700 dark:text-cyan-400">
                          {filteredEvents.filter(e => e.id !== 'campaign-tierra-cultura').length} Eventos
                      </div>
                  </div>
              </div>
          </div>
      );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 animate-fade-in">
        <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 dark:border-slate-700 border-t-amber-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 bg-white dark:bg-slate-800 rounded-full"></div>
            </div>
        </div>
        <h3 className="mt-6 text-xl font-bold text-orange-800 dark:text-amber-400 font-display animate-pulse">
          Preparando la agenda...
        </h3>
        <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
          Buscando los mejores planes en la Sierra
        </p>
      </div>
    );
  }

  const renderFilterResetBanner = () => (
    <div className="sticky top-20 z-30 bg-slate-100/95 dark:bg-slate-800/95 backdrop-blur-md p-4 rounded-lg mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in border border-slate-200 dark:border-slate-700 shadow-md">
      <p className="text-slate-600 dark:text-slate-300 text-center sm:text-left font-medium">
        Estás viendo una lista filtrada.
      </p>
      <button
        onClick={onResetFilters}
        className="bg-amber-400 text-slate-900 font-bold py-2 px-6 rounded-md hover:bg-amber-500 dark:hover:bg-amber-300 transition-colors whitespace-nowrap shadow-sm"
      >
        Limpiar todos los filtros
      </button>
    </div>
  );

  // Manejo de estado vacío específico
  if (filteredEvents.length === 0) {
    return (
      <>
        {selectedTownIds.length > 0 && renderTownHeader()}
        {renderCampaignHeader()}
        {renderCampaignFilterMenu()}
        {isAnyFilterActive && !isTierraCulturaActive && renderFilterResetBanner()}
        
        {/* Si estamos en la campaña y no hay eventos con los filtros seleccionados */}
        {isTierraCulturaActive ? (
             <div className="text-center py-12 px-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg animate-fade-in border border-cyan-100 dark:border-cyan-800/50">
                <div className="text-4xl mb-3">🕵️</div>
                <h3 className="text-xl font-bold text-cyan-800 dark:text-cyan-300 font-display">No hay resultados</h3>
                <p className="text-cyan-600 dark:text-cyan-400 mt-2 text-sm">
                    No hemos encontrado eventos con esos filtros. Prueba a cambiar el tipo o el pueblo.
                </p>
                <button
                    onClick={() => { setCampaignTypeFilter('todos'); setCampaignTownFilter('todos'); }}
                    className="mt-4 bg-cyan-600 text-white font-bold py-2 px-6 rounded-md hover:bg-cyan-700 transition-colors"
                >
                    Ver todo Tierra de Cultura
                </button>
            </div>
        ) : (
            // Estado vacío genérico (cuando no es campaña)
            <>
                {ENABLE_AI_SEARCH && (
                    <div className="mb-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-4 rounded-lg flex flex-col sm:flex-row gap-4 items-center text-center sm:text-left animate-fade-in">
                        <div className="p-3 bg-purple-100 dark:bg-purple-800 rounded-full text-purple-600 dark:text-purple-300">
                            {ICONS.sparkles}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-purple-800 dark:text-purple-300">¿No encuentras lo que buscas?</h4>
                            <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                                Prueba nuestro <strong>Buscador IA</strong> pulsando el botón mágico en la barra de búsqueda.
                            </p>
                        </div>
                    </div>
                )}

                <div className="text-center py-16 px-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg animate-fade-in border border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold text-orange-800 dark:text-slate-400 font-display">No hay eventos que mostrar</h3>
                <p className="text-slate-500 dark:text-slate-500 mt-2">Prueba a seleccionar otro pueblo o a borrar los filtros.</p>
                <button
                    onClick={onResetFilters}
                    className="mt-6 bg-amber-400 text-slate-900 font-bold py-2 px-6 rounded-md hover:bg-amber-500 dark:hover:bg-amber-300 transition-colors"
                >
                    Limpiar Filtros
                </button>
                </div>
            </>
        )}
      </>
    );
  }

  return (
    <>
      {selectedTownIds.length > 0 && renderTownHeader()}
      {renderCampaignHeader()}
      {renderCampaignFilterMenu()}
      
      {isAnyFilterActive && !isTierraCulturaActive && renderFilterResetBanner()}
      
      {isAnyFilterActive && isTierraCulturaActive && (
          <div className="mb-4 text-center">
              <button 
                onClick={onResetFilters}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 underline"
              >
                  Ver todos los eventos (Salir de la campaña)
              </button>
          </div>
      )}

      <div className="grid gap-6 md:gap-8 grid-cols-1">
        {filteredEvents.map((event, index) => (
          <React.Fragment key={event.id}>
            <div
                className="animate-fade-in-up"
                style={{ animationDelay: `${50 + index * 75}ms` }}
            >
                <EventCard 
                    event={event} 
                    onSelectEvent={onSelectEvent}
                    onCategoryFilterClick={onCategoryFilterClick}
                    onUpdateEvent={onUpdateEvent}
                    onShowInterest={() => onShowInterest(event)}
                    onShowPlan={() => onShowPlan(event)}
                    onShowWeather={() => onShowWeather(event)}
                />
            </div>
            
            {/* Banner inserter: After 5th item (index 4) and 10th item (index 9) */}
            {(!isTierraCulturaActive && (index === 4 || index === 9)) && (
                <div className="animate-fade-in-up w-full">
                    <img 
                        src={FEED_BANNER_URL} 
                        alt="Espacio Patrocinado" 
                        className="w-full h-auto rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 object-cover"
                        loading="lazy"
                    />
                </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default EventList;