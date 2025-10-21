
import React, { useState, useMemo, useEffect } from 'react';
import { EventType, EventCategory } from '../types';

// Copied from EventCard.tsx for consistency
const categoryColors: Record<EventCategory, string> = {
  [EventCategory.BELEN_VIVIENTE]: 'bg-green-500',
  [EventCategory.CAMPANILLEROS]: 'bg-yellow-500',
  [EventCategory.CABALGATA]: 'bg-purple-500',
  [EventCategory.FIESTA]: 'bg-red-500',
  [EventCategory.MERCADO]: 'bg-blue-500',
  [EventCategory.OTRO]: 'bg-gray-500',
};


interface EventCalendarProps {
  events: EventType[];
  onSelectEvent: (eventId: string) => void;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events, onSelectEvent }) => {
  // Default to a fallback date that will be updated by the effect.
  const [currentDate, setCurrentDate] = useState(new Date('2025-12-01T00:00:00'));

  // Effect to set the initial week to the first event's week.
  // This also updates the view when the filtered events change.
  useEffect(() => {
    if (events.length > 0) {
      // The parent component sorts events by date, so the first one is the earliest.
      const firstEventDate = events[0].date;
      setCurrentDate(new Date(`${firstEventDate}T00:00:00`));
    } else {
      // If there are no events to show, keep the default or reset to a known date.
      setCurrentDate(new Date('2025-12-01T00:00:00'));
    }
  }, [events]); // Re-run the effect if the events prop changes.


  const eventsByDate = useMemo(() => {
    const grouped: { [key: string]: EventType[] } = {};
    events.forEach(event => {
      const eventDate = new Date(event.date + 'T00:00:00');
      const key = eventDate.toISOString().split('T')[0];
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(event);
    });
    return grouped;
  }, [events]);

  const changeWeek = (offset: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + (offset * 7));
      return newDate;
    });
  };

  const getWeekDisplayRange = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const offsetToMonday = day === 0 ? -6 : 1 - day;
    startOfWeek.setDate(startOfWeek.getDate() + offsetToMonday);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };

    const startFormatted = startOfWeek.toLocaleDateString('es-ES', options);
    const endFormatted = endOfWeek.toLocaleDateString('es-ES', options);
    
    if (startOfWeek.getFullYear() !== endOfWeek.getFullYear()) {
         return `${startOfWeek.toLocaleDateString('es-ES')} - ${endOfWeek.toLocaleDateString('es-ES')}`;
    }

    if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${startOfWeek.getDate()} - ${endFormatted}, ${startOfWeek.getFullYear()}`;
    }

    return `${startFormatted} - ${endFormatted}, ${startOfWeek.getFullYear()}`;
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6 gap-2">
        <button onClick={() => changeWeek(-1)} className="py-2 px-3 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors text-white text-sm">Semana Ant.</button>
        <h2 className="text-xl sm:text-2xl text-amber-300 capitalize font-display text-center flex-grow">{getWeekDisplayRange(currentDate)}</h2>
        <button onClick={() => changeWeek(1)} className="py-2 px-3 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors text-white text-sm">Sig. Semana</button>
      </div>
    );
  };

  const renderWeekList = () => {
    const weekStart = new Date(currentDate);
    const dayOfWeek = weekStart.getDay();
    const offsetToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    weekStart.setDate(weekStart.getDate() + offsetToMonday);

    const days = [];
    let day = new Date(weekStart);

    for (let i = 0; i < 7; i++) {
      const dayForCell = new Date(day);
      const formattedDate = dayForCell.toISOString().split('T')[0];
      const dayEvents = eventsByDate[formattedDate] || [];
      const isToday = new Date().toDateString() === dayForCell.toDateString();
      
      const dayHeader = dayForCell.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

      days.push(
        <div key={dayForCell.toString()} className={`bg-slate-800/50 p-4 rounded-lg ${isToday ? 'border-l-4 border-amber-400' : ''}`}>
           <h3 className={`text-xl font-display capitalize ${isToday ? 'text-amber-300' : 'text-slate-300'}`}>
              {dayHeader}
           </h3>
           <div className="mt-3">
            {dayEvents.length > 0 ? (
                <div className="space-y-3">
                    {dayEvents.map(event => (
                        <div key={event.id} className="bg-slate-900/50 p-3 rounded-md flex items-start justify-between gap-4">
                            <div>
                                <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-1 text-white ${categoryColors[event.category]}`}>
                                    {event.category}
                                </span>
                                <p className="font-bold text-amber-400">{event.title}</p>
                                <p className="text-sm text-slate-400 font-semibold">{event.town}</p>
                            </div>
                            <button 
                                onClick={() => onSelectEvent(event.id)} 
                                className="text-amber-400 hover:text-amber-300 text-sm font-bold whitespace-nowrap self-center"
                            >
                                Saber más
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-slate-500 text-sm italic">No hay eventos programados.</p>
            )}
           </div>
        </div>
      );
      day.setDate(day.getDate() + 1);
    }
    return <div className="space-y-6">{days}</div>;
  };


  return (
    <div className="bg-slate-900/50 p-2 sm:p-4 rounded-lg shadow-lg">
      {renderHeader()}
      {renderWeekList()}
    </div>
  );
};

export default EventCalendar;