

import React from 'react';
import { EventType, EventCategory } from '../types';
import { IMAGE_PLACEHOLDER } from '../constants';

const categoryColors: Record<EventCategory, string> = {
  [EventCategory.BELEN_VIVIENTE]: 'bg-green-500',
  [EventCategory.CAMPANILLEROS]: 'bg-yellow-500',
  [EventCategory.CABALGATA]: 'bg-purple-500',
  [EventCategory.FIESTA]: 'bg-red-500',
  [EventCategory.MERCADO]: 'bg-blue-500',
  [EventCategory.OTRO]: 'bg-gray-500',
};

interface EventCardProps {
  event: EventType;
  onSelectEvent: (eventId: string) => void;
  isLoggedIn: boolean;
  onEdit: (event: EventType) => void;
  onCategoryFilterClick: (category: EventCategory) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onSelectEvent, isLoggedIn, onEdit, onCategoryFilterClick }) => {
  const { id, title, description, town, date, category, imageUrl } = event;

  const eventDate = new Date(date + 'T00:00:00');
  const formattedDate = eventDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
  });
  const weekday = eventDate.toLocaleDateString('es-ES', { weekday: 'long' });

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = IMAGE_PLACEHOLDER;
  };

  return (
    <article className="bg-white dark:bg-slate-800 md:rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row group transition-all duration-300 hover:shadow-2xl border border-slate-200 dark:border-slate-700/50">
      <div className="md:w-2/5 flex-shrink-0 h-56 md:h-auto flex items-center justify-center p-4">
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center p-2">
                <img
                    src={imageUrl || IMAGE_PLACEHOLDER}
                    alt={`Imagen para ${title}`}
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105 rounded-md shadow-lg"
                    onError={handleImageError}
                    loading="lazy"
                />
            </div>
        </div>
      </div>
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-start mb-2">
             <button
                onClick={() => onCategoryFilterClick(category)}
                className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full text-white ${categoryColors[category]} transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 focus:ring-amber-400`}
            >
              {category}
            </button>
          </div>
          <h2 className="text-2xl font-display text-orange-800 dark:text-amber-300 mb-2">{title}</h2>
          <p className="text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">{description}</p>
        </div>
        <div className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-slate-700 dark:text-slate-300">
            <p className="font-bold text-lg">{town}</p>
            <p className="text-sm capitalize">{weekday}, {formattedDate}</p>
          </div>
          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(event);
                }}
                className="bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-white font-bold py-2 px-4 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors text-sm"
              >
                Editar
              </button>
            )}
            <button
              onClick={() => onSelectEvent(id)}
              className="bg-amber-400 text-slate-900 font-bold py-2 px-6 rounded-md hover:bg-amber-500 dark:hover:bg-amber-300 transition-colors whitespace-nowrap"
            >
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventCard;