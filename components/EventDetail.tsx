import React, { useEffect } from 'react';
import { EventType, EventCategory } from '../types';

interface EventDetailProps {
  event: EventType;
  onBack: () => void;
}

// Consistent colors with EventCard
const categoryColors: Record<EventCategory, { bg: string, text: string, border: string }> = {
  [EventCategory.BELEN_VIVIENTE]: { bg: 'bg-green-900/50', text: 'text-green-300', border: 'border-green-500' },
  [EventCategory.CAMPANILLEROS]: { bg: 'bg-yellow-900/50', text: 'text-yellow-300', border: 'border-yellow-500' },
  [EventCategory.CABALGATA]: { bg: 'bg-purple-900/50', text: 'text-purple-300', border: 'border-purple-500' },
  [EventCategory.FIESTA]: { bg: 'bg-red-900/50', text: 'text-red-300', border: 'border-red-500' },
  [EventCategory.MERCADO]: { bg: 'bg-blue-900/50', text: 'text-blue-300', border: 'border-blue-500' },
  [EventCategory.OTRO]: { bg: 'bg-gray-700/50', text: 'text-gray-300', border: 'border-gray-500' },
};

const EventDetail: React.FC<EventDetailProps> = ({ event, onBack }) => {
  const { title, description, town, date, category, imageUrl } = event;
  const colors = categoryColors[category] || categoryColors[EventCategory.OTRO];

  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-amber-300 hover:text-amber-200 font-bold mb-6 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a la lista
      </button>

      <article className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        {imageUrl && (
          <img src={imageUrl} alt={`Imagen de ${title}`} className="w-full h-48 sm:h-64 object-cover" />
        )}
        
        <div className={`p-6 sm:p-8 border-t-4 ${colors.border}`}>
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${colors.bg} ${colors.text}`}>
            {category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-display text-amber-300 mb-4">{title}</h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-4 text-slate-300 mb-6 border-y border-slate-700/50 py-4">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xl font-bold">{town}</span>
            </div>
             <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-lg font-semibold capitalize">{formattedDate}</span>
            </div>
          </div>
          
          <div className="text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
            {description.split('\n').map((paragraph, index) => (
                <p key={index} className={index > 0 ? 'mt-4' : ''}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default EventDetail;