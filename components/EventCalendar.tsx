import React, { useState, useMemo } from 'react';
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
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  // Default to December 2024 since that's where most initial events are
  const [currentDate, setCurrentDate] = useState(new Date('2024-12-01T00:00:00'));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const eventsByDate = useMemo(() => {
    const grouped: { [key: string]: EventType[] } = {};
    events.forEach(event => {
      // Parse date string as-is to avoid timezone shifts. 'YYYY-MM-DD' is treated as UTC midnight.
      const eventDate = new Date(event.date + 'T00:00:00');
      const key = eventDate.toISOString().split('T')[0];
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(event);
    });
    return grouped;
  }, [events]);

  const changeMonth = (offset: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
    setSelectedDate(null);
  };

  const renderHeader = () => {
    const dateFormat = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' });
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors text-white">&lt;</button>
        <h2 className="text-2xl text-amber-300 capitalize font-display">{dateFormat.format(currentDate)}</h2>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors text-white">&gt;</button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    return (
      <div className="grid grid-cols-7 text-center font-bold text-slate-400 text-sm">
        {days.map(day => <div key={day} className="py-2 hidden sm:block">{day}</div>)}
        {days.map(day => <div key={day} className="py-2 sm:hidden">{day.substring(0,1)}</div>)}
      </div>
    );
  };
  
  const renderCells = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startDate = new Date(monthStart);
    
    let dayOfWeek = startDate.getDay();
    let diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Monday is 0, Sunday is 6
    startDate.setDate(startDate.getDate() - diff);
    
    const rows = [];
    let day = new Date(startDate);

    for (let i = 0; i < 6; i++) {
      const days = [];
      for (let j = 0; j < 7; j++) {
        const dayForCell = new Date(day);
        const formattedDate = dayForCell.toISOString().split('T')[0];
        const dayEvents = eventsByDate[formattedDate] || [];
        const isCurrentMonth = dayForCell.getMonth() === currentDate.getMonth();
        const isToday = new Date().toDateString() === dayForCell.toDateString();
        const isSelected = selectedDate && dayForCell.toDateString() === selectedDate.toDateString();

        days.push(
          <div
            key={dayForCell.toString()}
            className={`h-24 sm:h-32 border border-slate-700 p-1.5 flex flex-col overflow-hidden transition-colors relative ${
              !isCurrentMonth ? 'bg-slate-800/50 text-slate-600' : 'bg-slate-800 text-slate-300'
            } ${dayEvents.length > 0 ? 'cursor-pointer hover:bg-slate-700/50' : ''}
              ${isSelected ? 'bg-amber-400/20 ring-2 ring-amber-400 z-10' : ''}`}
            onClick={() => {
                if (dayEvents.length > 0) setSelectedDate(dayForCell);
                else setSelectedDate(null);
            }}
          >
            <span className={`font-bold text-sm ${isToday ? 'bg-amber-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>{dayForCell.getDate()}</span>
            <div className="flex-grow overflow-y-auto text-xs space-y-1 mt-1 pr-1">
              {dayEvents.slice(0, 3).map(event => (
                <div key={event.id} className="flex items-center gap-1 p-1 rounded-sm bg-slate-900/50">
                    <span className={`w-1.5 h-1.5 rounded-full ${categoryColors[event.category]} flex-shrink-0`}></span>
                    <span className="truncate text-white" title={event.title}>{event.title}</span>
                </div>
              ))}
            </div>
          </div>
        );
        day.setDate(day.getDate() + 1);
      }
      rows.push(<div className="grid grid-cols-7" key={i}>{days}</div>);
    }
    return <div className="mt-2 border-t border-l border-slate-700">{rows}</div>;
  };

  const renderSelectedDayEvents = () => {
    if (!selectedDate) {
        return (
            <div className="mt-6 text-center text-slate-500 py-4">
                Selecciona un día en el calendario para ver los eventos.
            </div>
        );
    }
    
    const dateKey = selectedDate.toISOString().split('T')[0];
    const dayEvents = eventsByDate[dateKey] || [];
    
    if(dayEvents.length === 0) {
        return (
            <div className="mt-6 text-center text-slate-500 py-4">
                No hay eventos para el día seleccionado.
            </div>
        );
    }

    const formattedDate = selectedDate.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    return (
        <div className="mt-6">
            <h3 className="text-xl text-amber-300 capitalize mb-3">Eventos del {formattedDate}</h3>
            <div className="space-y-3">
                 {dayEvents.map(event => (
                    <div key={event.id} className="bg-slate-800 p-4 rounded-md border border-slate-700 overflow-hidden">
                        {event.imageUrl && (
                          <img src={event.imageUrl} alt={`Imagen de ${event.title}`} className="w-full h-32 object-cover rounded-md mb-3" />
                        )}
                        <div className="flex justify-between items-start">
                             <div>
                                <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-1 text-white ${categoryColors[event.category]}`}>
                                    {event.category}
                                </span>
                                <p className="font-bold text-amber-400 text-lg">{event.title}</p>
                                <p className="text-sm font-semibold text-slate-300">{event.town}</p>
                            </div>
                        </div>
                        <p className="text-slate-400 mt-2">{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
  };

  return (
    <div className="bg-slate-900/50 p-2 sm:p-4 rounded-lg shadow-lg">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
      {renderSelectedDayEvents()}
    </div>
  );
};

export default EventCalendar;