
import React from 'react';
import { EventType, EventCategory } from '../types';

interface EventCardProps {
  event: EventType;
  onSelectEvent: (eventId: string) => void;
}

const categoryColors: Record<EventCategory, { bg: string, text: string, border: string }> = {
  [EventCategory.BELEN_VIVIENTE]: { bg: 'bg-green-900/50', text: 'text-green-300', border: 'border-green-500/50' },
  [EventCategory.CAMPANILLEROS]: { bg: 'bg-yellow-900/50', text: 'text-yellow-300', border: 'border-yellow-500/50' },
  [EventCategory.CABALGATA]: { bg: 'bg-purple-900/50', text: 'text-purple-300', border: 'border-purple-500/50' },
  [EventCategory.FIESTA]: { bg: 'bg-red-900/50', text: 'text-red-300', border: 'border-red-500/50' },
  [EventCategory.MERCADO]: { bg: 'bg-blue-900/50', text: 'text-blue-300', border: 'border-blue-500/50' },
  [EventCategory.OTRO]: { bg: 'bg-gray-700/50', text: 'text-gray-300', border: 'border-gray-500/50' },
};

const EventCard: React.FC<EventCardProps> = ({ event, onSelectEvent }) => {
  const { title, description, town, date, category, imageUrl } = event;
  const colors = categoryColors[category] || categoryColors[EventCategory.OTRO];

  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const truncatedDescription = description.length > 200
    ? `${description.substring(0, 200)}...`
    : description;

  return (
    <article className={`bg-slate-800 rounded-lg shadow-lg overflow-hidden border-l-4 ${colors.border} transition-transform duration-300 hover:scale-[1.02] hover:shadow-amber-400/10 flex flex-col`}>
      <div className="flex flex-col md:flex-row flex-grow">
        {imageUrl && (
          <div className="md:w-1/3 flex-shrink-0">
            <img src={imageUrl} alt={`Imagen de ${title}`} className="w-full h-48 md:h-full object-cover" />
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          <div>
            <div className="flex justify-between items-start mb-2">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colors.bg} ${colors.text}`}>
                    {category}
                </span>
            </div>
            <h3 className="text-2xl font-bold text-amber-300 font-display">{title}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-1 mt-2 text-slate-400">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <p className="text-md font-semibold">{town}</p>
                </div>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <p className="text-sm capitalize">{formattedDate}</p>
                </div>
            </div>
          </div>
          <p className="text-slate-300 mt-4 text-base flex-grow">{truncatedDescription}</p>
          
          <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-end">
            <button
              onClick={() => onSelectEvent(event.id)}
              className="bg-amber-400 text-slate-900 font-bold py-2 px-4 rounded-md hover:bg-amber-300 transition-colors text-sm"
            >
              Saber más
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
