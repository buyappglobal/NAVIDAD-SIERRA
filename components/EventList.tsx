import React from 'react';
import { EventType, EventCategory } from '../types';
import EventCard from './EventCard';

interface EventListProps {
  events: EventType[];
  onSelectEvent: (eventId: string) => void;
  isLoggedIn: boolean;
  onEdit: (event: EventType) => void;
  onResetFilters: () => void;
  onCategoryFilterClick: (category: EventCategory) => void;
  isAnyFilterActive: boolean;
}

const EventList: React.FC<EventListProps> = ({ events, onSelectEvent, isLoggedIn, onEdit, onResetFilters, onCategoryFilterClick, isAnyFilterActive }) => {
  const renderFilterResetBanner = () => (
    <div className="bg-slate-800 p-4 rounded-lg mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
      <p className="text-slate-300 text-center sm:text-left">
        Estás viendo una lista filtrada.
      </p>
      <button
        onClick={onResetFilters}
        className="bg-amber-400 text-slate-900 font-bold py-2 px-6 rounded-md hover:bg-amber-300 transition-colors whitespace-nowrap"
      >
        Limpiar todos los filtros
      </button>
    </div>
  );

  if (events.length === 0) {
    return (
      <>
        {isAnyFilterActive && renderFilterResetBanner()}
        <div className="text-center py-16 px-4 bg-slate-800/50 rounded-lg animate-fade-in">
          <h3 className="text-2xl font-bold text-slate-400 font-display">No hay eventos que mostrar</h3>
          <p className="text-slate-500 mt-2">Prueba a seleccionar otro pueblo o a borrar los filtros.</p>
          <button
            onClick={onResetFilters}
            className="mt-6 bg-amber-400 text-slate-900 font-bold py-2 px-6 rounded-md hover:bg-amber-300 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {isAnyFilterActive && renderFilterResetBanner()}
      <div className="grid gap-6 md:gap-8 grid-cols-1">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${50 + index * 75}ms` }}
          >
            <EventCard 
                event={event} 
                onSelectEvent={onSelectEvent}
                isLoggedIn={isLoggedIn}
                onEdit={onEdit}
                onCategoryFilterClick={onCategoryFilterClick}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default EventList;