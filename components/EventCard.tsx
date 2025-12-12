
import React, { useMemo } from 'react';
import { EventType, EventCategory } from '../types';
import { IMAGE_PLACEHOLDER, ICONS } from '../constants';
import { toggleLikeEvent, toggleAttendEvent } from '../services/interactionService';
import { townCoordinates } from '../data/townCoordinates';
import { SPONSORS } from '../data/sponsors';

const categoryColors: Record<EventCategory, string> = {
  [EventCategory.PUEBLO_DESTACADO]: 'bg-teal-500',
  [EventCategory.BELEN_VIVIENTE]: 'bg-green-500',
  [EventCategory.CAMPANILLEROS]: 'bg-yellow-500',
  [EventCategory.CABALGATA]: 'bg-purple-500',
  [EventCategory.FIESTA]: 'bg-red-500',
  [EventCategory.MERCADO]: 'bg-blue-500',
  [EventCategory.FERIA_GASTRONOMICA]: 'bg-orange-500',
  [EventCategory.TIERRA_DE_CULTURA]: 'bg-cyan-600', // Nuevo color
  [EventCategory.OTRO]: 'bg-gray-500',
};

interface EventCardProps {
  event: EventType;
  onSelectEvent: (eventId: string) => void;
  onCategoryFilterClick: (category: EventCategory) => void;
  onUpdateEvent?: (updatedEvent: EventType) => void;
  // New props for utility actions
  onShowInterest: () => void;
  onShowPlan: () => void;
  onShowWeather: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ 
    event, 
    onSelectEvent, 
    onCategoryFilterClick, 
    onUpdateEvent,
    onShowInterest,
    onShowPlan,
    onShowWeather
}) => {
  const { id, title, description, town, date, endDate, category, imageUrl, sponsored, externalUrl, views, likes, attendees, isFavorite, isAttending, interestInfo } = event;

  const isPuebloDestacado = category === EventCategory.PUEBLO_DESTACADO;
  const isCampaign = id === "campaign-tierra-cultura"; // Identificar evento padre
  const badgeColor = categoryColors[category] || 'bg-slate-500';
  const hasCoordinates = !!townCoordinates[town];

  // Logic for expired events (to disable planning)
  const todayStr = new Date().toISOString().split('T')[0];
  const eventEndStr = endDate || date;
  const isExpired = eventEndStr < todayStr;

  // --- LÓGICA DE PATROCINADOR ---
  // Usamos el ID del evento para seleccionar un patrocinador de forma determinista.
  // Esto asegura que el patrocinador no cambie cada vez que se renderiza el componente,
  // pero parezca aleatorio entre diferentes tarjetas.
  const sponsor = useMemo(() => {
      if (SPONSORS.length === 0) return null;
      // Si es publicidad o pueblo destacado, no mostramos patrocinador extra para no saturar
      if (externalUrl || isPuebloDestacado || isCampaign) return null;

      let hash = 0;
      for (let i = 0; i < id.length; i++) {
          hash = id.charCodeAt(i) + ((hash << 5) - hash);
      }
      const index = Math.abs(hash) % SPONSORS.length;
      return SPONSORS[index];
  }, [id, externalUrl, isPuebloDestacado, isCampaign]);


  const formatEventDate = () => {
    const start = new Date(date + 'T00:00:00');
    const startDay = start.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
    
    if (endDate) {
        const end = new Date(endDate + 'T00:00:00');
        const endDay = end.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
        return `Del ${startDay} al ${endDay}`;
    }

    const weekday = start.toLocaleDateString('es-ES', { weekday: 'long' });
    return `${weekday}, ${startDay}`;
  };

  const dateDisplay = formatEventDate();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = IMAGE_PLACEHOLDER;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const newStatus = toggleLikeEvent(id);
    if (onUpdateEvent) {
        onUpdateEvent({
            ...event,
            isFavorite: newStatus,
            likes: (likes || 0) + (newStatus ? 1 : -1)
        });
    }
  };

  const handleAttend = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const newStatus = toggleAttendEvent(id);
    if (onUpdateEvent) {
        onUpdateEvent({
            ...event,
            isAttending: newStatus,
            attendees: (attendees || 0) + (newStatus ? 1 : -1)
        });
    }
  };

  const handleSponsorClick = (e: React.MouseEvent, url: string) => {
      e.stopPropagation();
      window.open(url, '_blank');
  };

  // Helper for action buttons
  const ActionButton = ({ icon, label, onClick, disabled, className }: { icon: React.ReactNode, label?: string, onClick: (e: React.MouseEvent) => void, disabled?: boolean, className?: string }) => (
      <button
        onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onClick(e);
        }}
        disabled={disabled}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors border border-transparent shadow-sm ${
            disabled 
            ? 'opacity-40 cursor-not-allowed bg-slate-50 dark:bg-slate-900 text-slate-400' 
            : className || 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
        }`}
        title={label}
      >
          {icon}
          {label && <span className="hidden sm:inline">{label}</span>}
      </button>
  );

  const cardContent = (
    <article className={`bg-white dark:bg-slate-800 md:rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row group transition-all duration-300 hover:shadow-2xl border ${isCampaign ? 'border-cyan-400 dark:border-cyan-600' : 'border-slate-200 dark:border-slate-700/50'} h-full relative`}>
      <div className="md:w-2/5 flex-shrink-0 h-56 md:h-auto flex items-center justify-center bg-slate-100 dark:bg-slate-900/50 md:rounded-l-lg relative overflow-hidden">
        <img
            src={imageUrl || IMAGE_PLACEHOLDER}
            alt={`Imagen para ${title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
            loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-bold flex items-center gap-1">
            {ICONS.eye} {views || 0}
        </div>
      </div>
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          {/* Top Row: Categories & Featured */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
             {externalUrl ? (
                <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full text-white ${badgeColor}`}>
                  Publicidad
                </span>
              ) : (
                <button
                    onClick={(e) => { e.stopPropagation(); onCategoryFilterClick(category); }}
                    className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full text-white ${badgeColor} transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-amber-400`}
                >
                  {category}
                </button>
            )}
            {sponsored && !externalUrl && (
                <span className="flex items-center gap-1 text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/50 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span>{isCampaign ? 'Campaña Oficial' : 'Pueblo Destacado'}</span>
                </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-display text-orange-800 dark:text-amber-300 mb-2 leading-tight">{title}</h2>
          
          {/* Middle Row: Location & Date + Social Actions (Relocated) */}
          <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-700 pb-3 mb-3">
             <div className="text-slate-700 dark:text-slate-300">
                <p className="font-bold text-base flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {town}
                </p>
                {!isPuebloDestacado && !isCampaign && (
                    <p className="text-sm capitalize font-medium text-amber-700 dark:text-amber-500 ml-5">
                        {dateDisplay}
                    </p>
                )}
             </div>

             {/* Relocated Social Buttons - Compact Version */}
             {!externalUrl && !isCampaign && (
                <div className="flex gap-2">
                    <button 
                        onClick={handleLike}
                        className={`flex items-center gap-1 text-xs font-bold py-1 px-2 rounded transition-colors border ${
                            isFavorite 
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-500 border-red-200 dark:border-red-800' 
                            : 'bg-slate-50 dark:bg-slate-700 text-slate-400 border-slate-200 dark:border-slate-600 hover:text-red-400'
                        }`}
                        title="Me gusta"
                    >
                        {isFavorite ? ICONS.heartFilled : ICONS.heart}
                        <span>{likes || 0}</span>
                    </button>
                    <button 
                        onClick={handleAttend}
                        className={`flex items-center gap-1 text-xs font-bold py-1 px-2 rounded transition-colors border ${
                            isAttending 
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-600 border-green-200 dark:border-green-800' 
                            : 'bg-slate-50 dark:bg-slate-700 text-slate-400 border-slate-200 dark:border-slate-600 hover:text-green-500'
                        }`}
                        title="Asistiré"
                    >
                        {isAttending ? ICONS.checkCircle : ICONS.userGroup}
                        <span>{attendees || 0}</span>
                    </button>
                </div>
             )}
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 line-clamp-3 text-sm">{isPuebloDestacado ? `Descubre ${town}, uno de los pueblos con más encanto de la Sierra.` : description}</p>
        
          {/* SECCIÓN DE PATROCINADOR */}
          {sponsor && (
              <div 
                className="mt-3 py-1.5 px-3 bg-slate-50 dark:bg-slate-900/50 rounded border border-slate-100 dark:border-slate-700 flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={(e) => handleSponsorClick(e, sponsor.url)}
              >
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Patrocinado por:</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1">
                      {sponsor.name}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </span>
              </div>
          )}
        </div>

        {/* New Action Bar (Footer) */}
        {!externalUrl && (
            <div className="mt-4 pt-2 flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
                <div className="flex gap-2">
                    {interestInfo && (
                        <ActionButton 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                            label="Info" 
                            onClick={onShowInterest}
                            className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 hover:text-emerald-800 dark:hover:text-emerald-200" 
                        />
                    )}
                    {hasCoordinates && !isPuebloDestacado && !isCampaign && (
                        <ActionButton 
                            icon={ICONS.cloudSun} 
                            onClick={onShowWeather} 
                            label="Tiempo"
                            className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 hover:bg-sky-200 dark:hover:bg-sky-900/50 hover:text-sky-800 dark:hover:text-sky-200"
                        />
                    )}
                    {!isPuebloDestacado && !isCampaign && (
                        <ActionButton 
                            icon={ICONS.magic} 
                            onClick={onShowPlan} 
                            disabled={isExpired}
                            label="Planear"
                            className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 hover:text-purple-800 dark:hover:text-purple-200"
                        />
                    )}
                </div>

                <button
                    onClick={(e) => { e.preventDefault(); onSelectEvent(id); }}
                    className={`flex-shrink-0 text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1 transition-colors shadow-sm ml-auto ${isCampaign ? 'bg-cyan-600 text-white hover:bg-cyan-700' : 'bg-amber-400 text-slate-900 hover:bg-amber-500'}`}
                >
                    {isCampaign ? 'Ver Programación Completa' : (isPuebloDestacado ? 'Descubrir' : 'Ver más')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        )}

        {externalUrl && (
            <div className="mt-4 flex justify-end">
                <span className="bg-amber-400 text-slate-900 text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-1 hover:bg-amber-500 transition-colors cursor-pointer">
                    Visitar Web
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </span>
            </div>
        )}
      </div>
    </article>
  );

  if (externalUrl) {
    return (
      <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
        {cardContent}
      </a>
    );
  }

  return (
      <div className="h-full block cursor-pointer" onClick={() => onSelectEvent(id)}>
          {cardContent}
      </div>
  );
};

export default EventCard;