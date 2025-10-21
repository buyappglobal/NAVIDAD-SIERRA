
import React from 'react';
import { EventType, EventCategory } from '../types';

interface EventCardProps {
  event: EventType;
}

const categoryColors: Record<EventCategory, { bg: string, text: string, border: string }> = {
  [EventCategory.BELEN_VIVIENTE]: { bg: 'bg-green-900/50', text: 'text-green-300', border: 'border-green-500/50' },
  [EventCategory.CAMPANILLEROS]: { bg: 'bg-yellow-900/50', text: 'text-yellow-300', border: 'border-yellow-500/50' },
  [EventCategory.CABALGATA]: { bg: 'bg-purple-900/50', text: 'text-purple-300', border: 'border-purple-500/50' },
  [EventCategory.FIESTA]: { bg: 'bg-red-900/50', text: 'text-red-300', border: 'border-red-500/50' },
  [EventCategory.MERCADO]: { bg: 'bg-blue-900/50', text: 'text-blue-300', border: 'border-blue-500/50' },
  [EventCategory.OTRO]: { bg: 'bg-gray-700/50', text: 'text-gray-300', border: 'border-gray-500/50' },
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { title, description, town, date, category, imageUrl } = event;
  const colors = categoryColors[category] || categoryColors[EventCategory.OTRO];

  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className={`bg-slate-800 rounded-lg shadow-lg overflow-hidden border-l-4 ${colors.border} transition-transform duration-300 hover:scale-[1.02] hover:shadow-amber-400/10`}>
      <div className="flex flex-col md:flex-row">
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
            <p className="text-md font-semibold text-slate-400">{town}</p>
            <p className="text-sm text-slate-500 capitalize">{formattedDate}</p>
          </div>
          <p className="text-slate-300 mt-4 text-base flex-grow">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
