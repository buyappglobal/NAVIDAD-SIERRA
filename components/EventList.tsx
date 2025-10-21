
import React from 'react';
import { EventType } from '../types';
import EventCard from './EventCard';

interface EventListProps {
  events: EventType[];
  onSelectEvent: (eventId: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onSelectEvent }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-slate-800/50 rounded-lg">
        <h3 className="text-2xl font-bold text-slate-400">No hay eventos que mostrar</h3>
        <p className="text-slate-500 mt-2">Prueba a seleccionar otro pueblo o a borrar los filtros.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:gap-8 grid-cols-1">
      {/* --- Banner Publicitario Añadido --- */}
      <div className="w-full">
         <a 
            href="http://www.turismohuelva.org/inicio/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block rounded-lg overflow-hidden shadow-lg hover:opacity-90 transition-opacity border border-slate-700"
            aria-label="Publicidad de Turismo Huelva"
        >
            <img 
                src="https://solonet.es/wp-content/uploads/2025/10/BANNER-HUELVA.webp" 
                alt="Publicidad de Turismo Huelva" 
                className="w-full h-auto object-contain"
            />
        </a>
      </div>

      {events.map(event => (
        <EventCard 
            key={event.id} 
            event={event} 
            onSelectEvent={onSelectEvent}
        />
      ))}
    </div>
  );
};

export default EventList;