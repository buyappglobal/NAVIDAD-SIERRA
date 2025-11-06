import React, { useState, useMemo, useEffect } from 'react';
import { EventType, ChangeInstruction, ChangeAction } from './types';
import Header from './components/Header';
import TownFilter from './components/TownFilter';
import EventList from './components/EventList';
import EventCalendar from './components/EventCalendar';
import EventDetail from './components/EventDetail';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import AddEventModal from './components/AddEventModal';
import EditEventModal from './components/EditEventModal';
import ChangeRequestModal from './components/ChangeRequestModal';

// --- Admin Credentials (for this demo) ---
const ADMIN_EMAIL = "admin@sierra.es";
const ADMIN_PASS = "navidad2025";

const App: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedTown, setSelectedTown] = useState<string>('Todos');
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // --- Admin State ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<EventType | null>(null);
  const [changeInstruction, setChangeInstruction] = useState<ChangeInstruction | null>(null);


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

  // --- Event Computations ---
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
  
  const selectedEvent = useMemo(() => {
    if (!selectedEventId) return null;
    return events.find(e => e.id === selectedEventId);
  }, [selectedEventId, events]);

  // --- Admin Handlers ---
  const handleLogin = (email: string, pass: string) => {
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginError(null);
    } else {
      setLoginError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };
  
  const handleLogout = () => setIsLoggedIn(false);

  const generateChangeInstruction = (action: ChangeAction, data: Partial<EventType>) => {
    setChangeInstruction({ action, data });
  };

  const handleAddEvent = (newEventData: Omit<EventType, 'id'>) => {
    const newEvent: EventType = {
      ...newEventData,
      id: `temp-${Date.now()}`, // Temporary ID for client-side
    };
    setEvents(prev => [...prev, newEvent]);
    setShowAddEventModal(false);
    // For CREATE, we don't send the temporary ID in the instruction
    const { id, ...dataForInstruction } = newEvent;
    generateChangeInstruction('CREATE', dataForInstruction);
  };
  
  const handleUpdateEvent = (updatedEvent: EventType) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    setEventToEdit(null);
    generateChangeInstruction('UPDATE', updatedEvent);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setEventToEdit(null);
    generateChangeInstruction('DELETE', { id: eventId });
  };


  // --- Render Logic ---
  if (selectedEvent) {
    return (
      <div className="bg-slate-900 text-white min-h-screen font-sans flex flex-col">
        <Header />
        <main className="container mx-auto p-4 flex-grow">
          <EventDetail 
            event={selectedEvent} 
            onBack={() => setSelectedEventId(null)} 
            isLoggedIn={isLoggedIn}
            onEdit={() => setEventToEdit(selectedEvent)}
          />
        </main>
        <Footer isLoggedIn={isLoggedIn} onLoginClick={() => setShowLoginModal(true)} onLogoutClick={handleLogout} />
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans flex flex-col">
      <Header
        view={view}
        setView={setView}
        isLoggedIn={isLoggedIn}
        onAddEventClick={() => setShowAddEventModal(true)}
      />
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-8 flex-grow">
        <aside className="md:col-span-1">
          <TownFilter
            towns={uniqueTownsWithEvents}
            selectedTown={selectedTown}
            onSelectTown={setSelectedTown}
          />
        </aside>
        <section className="md:col-span-3">
          {view === 'list' ? (
            <EventList 
              events={filteredEvents} 
              onSelectEvent={setSelectedEventId} 
              isLoggedIn={isLoggedIn}
              onEdit={event => setEventToEdit(event)}
            />
          ) : (
            <EventCalendar 
              events={filteredEvents} 
              onSelectEvent={setSelectedEventId} 
              isLoggedIn={isLoggedIn}
              onEdit={event => setEventToEdit(event)}
            />
          )}
        </section>
      </main>
      <Footer isLoggedIn={isLoggedIn} onLoginClick={() => setShowLoginModal(true)} onLogoutClick={handleLogout} />

      {/* --- Admin Modals --- */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLogin} error={loginError} />}
      {isLoggedIn && showAddEventModal && <AddEventModal onClose={() => setShowAddEventModal(false)} onAddEvent={handleAddEvent} />}
      {isLoggedIn && eventToEdit && <EditEventModal event={eventToEdit} onClose={() => setEventToEdit(null)} onUpdate={handleUpdateEvent} onDelete={handleDeleteEvent} />}
      {isLoggedIn && changeInstruction && <ChangeRequestModal instruction={changeInstruction} onClose={() => setChangeInstruction(null)} />}
    </div>
  );
};

export default App;