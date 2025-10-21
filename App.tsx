
import React, { useState, useMemo, useEffect } from 'react';
import { EventType } from './types';
import Header from './components/Header';
import TownFilter from './components/TownFilter';
import EventList from './components/EventList';
import EventCalendar from './components/EventCalendar';

const App: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedTown, setSelectedTown] = useState<string>('Todos');
  const [view, setView] = useState<'list' | 'calendar'>('list');

  useEffect(() => {
    fetch('./database.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (selectedTown === 'Todos') {
      return sortedEvents;
    }
    return sortedEvents.filter(event => event.town === selectedTown);
  }, [sortedEvents, selectedTown]);

  const uniqueTownsWithEvents = useMemo(() => {
    const towns = new Set(events.map(event => event.town));
    return Array.from(towns).sort();
  }, [events]);

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans">
      <Header
        view={view}
        setView={setView}
      />
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <TownFilter
            towns={uniqueTownsWithEvents}
            selectedTown={selectedTown}
            onSelectTown={setSelectedTown}
          />
        </aside>
        <section className="md:col-span-3">
          {view === 'list' ? (
            <EventList events={filteredEvents} />
          ) : (
            <EventCalendar events={filteredEvents} />
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
