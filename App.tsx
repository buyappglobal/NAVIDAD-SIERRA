
import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { EventType, EventCategory, ChangeInstruction } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import FilterSidebar from './components/FilterSidebar';
import EventList from './components/EventList';
import EventCalendar from './components/EventCalendar';
import EventDetail from './components/EventDetail';
import AddEventModal from './components/AddEventModal';
import EditEventModal from './components/EditEventModal';
import LoginModal from './components/LoginModal';
import ChangeRequestModal from './components/ChangeRequestModal';
import { TOWNS } from './constants';
import EventMapModal from './components/EventMapModal';
import Hero from './components/Hero';
import InstallPwaModal from './components/InstallPwaModal';
import Toast from './components/Toast';
import { ICONS } from './constants';
import FilterSidebarModal from './components/FilterSidebarModal';
import CookieConsent from './components/CookieConsent';
import { ALL_EVENTS } from './data/events';
import { ADS } from './data/ads';
import SuggestEventModal from './components/SuggestEventModal';
import { exportEventsToCSV } from './services/googleSheetsService';
import BottomNav from './components/BottomNav';
import InfoAppModal from './components/InfoAppModal';
import FaqModal from './components/FaqModal';
import HowItWorksModal from './components/HowItWorksModal';
import { getEventMetrics } from './services/interactionService';

const AiAssistantModal = lazy(() => import('./components/AiAssistantModal'));

// VERSION: v9.3 (Real-time Interaction Sync)

// Helper para normalizar cadenas para comparación (SUPER BLINDADO)
const normalizeString = (str: string | undefined | null) => {
    if (!str) return "";
    return String(str)
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "") // Eliminar diacríticos (tildes)
              .toLowerCase()
              .replace(/[^a-z0-9\s]/g, "") // Eliminar caracteres especiales pero mantener espacios
              .trim()
              .replace(/\s+/g, ' '); // Unificar espacios
};

// Diccionario de Sinónimos para Búsqueda "Genérica"
const CATEGORY_KEYWORDS: Record<EventCategory, string> = {
  [EventCategory.FERIA_GASTRONOMICA]: "comer beber tapas almuerzo cena degustacion jamon castañas gastronomia plato",
  [EventCategory.BELEN_VIVIENTE]: "nacimiento navidad historia teatro representacion biblica",
  [EventCategory.FIESTA]: "musica baile cante flamenco nochevieja fiesta concierto dj copas",
  [EventCategory.CABALGATA]: "niños reyes magos juguetes caramelos familia infantil ilusion",
  [EventCategory.CAMPANILLEROS]: "musica canciones guitarra navidad villancicos coro",
  [EventCategory.MERCADO]: "compras regalos artesania puestos mercadillo",
  [EventCategory.PUEBLO_DESTACADO]: "turismo visita paseo escapada rural",
  [EventCategory.OTRO]: "varios cultura exposicion",
};

const App: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]); // Init empty to load metrics
  
  // Use array for multi-select. Empty array means "All"
  const [selectedTownIds, setSelectedTownIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isSuggestEventModalOpen, setIsSuggestEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventType | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showChangeRequestModal, setShowChangeRequestModal] = useState(false);
  const [pendingChange, setPendingChange] = useState<ChangeInstruction | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; icon: React.ReactNode } | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isPwaInstallable, setIsPwaInstallable] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);
  const [isCookieConsentOpen, setIsCookieConsentOpen] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [isAdminTestMode, setIsAdminTestMode] = useState(false);
  
  // New States for Sorting and Personal Filters
  const [sortBy, setSortBy] = useState<'date' | 'popularity'>('date');
  const [filterType, setFilterType] = useState<'all' | 'favorites' | 'attending'>('all');
  
  // Modal states for BottomNav
  const [showInfoAppModal, setShowInfoAppModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  
  // ROUTING: Handle hash changes for event details
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#\/evento\/(.+)$/);
      if (match && match[1]) {
        const eventId = match[1];
        // We check against ALL_EVENTS for validity, but the UI will pull from state 'events' later
        if (ALL_EVENTS.find(e => e.id === eventId) || ADS.find(e => e.id === eventId)) {
          setSelectedEventId(eventId);
        } else {
          history.replaceState(null, '', ' ');
          setSelectedEventId(null);
        }
      } else {
        setSelectedEventId(null);
      }
    };

    handleHashChange(); // Check on initial load
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ROUTING: Function to navigate and update URL hash
  const navigateToEvent = (eventId: string | null) => {
    window.location.hash = eventId ? `#/evento/${eventId}` : '';
  };


  // 0. AI Assistant Test Mode Check & Town Param Check
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin_test') === 'true') {
        setIsAdminTestMode(true);
    }
    
    // Check for town param
    const townParam = params.get('town');
    if (townParam) {
        // Find town ID from name or ID
        const normalizedParam = normalizeString(townParam);
        // Robust check: match id OR name (normalized)
        const foundTown = TOWNS.find(t => 
            normalizeString(t.id) === normalizedParam || 
            normalizeString(t.name) === normalizedParam ||
            normalizeString(t.id).replace(/\s/g, '') === normalizedParam // handle cases without spaces
        );
        if (foundTown) {
            setSelectedTownIds([foundTown.id]);
        }
    }
  }, []);

  // 1. Initialize Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('sierra-navidad-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('sierra-navidad-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // 2. Scroll to top on reload/init
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
  }, []);

  // 3. Load Events (With Interactions)
  useEffect(() => {
    setIsLoading(true);
    // Combine static data with local metrics
    const eventsWithMetrics = ALL_EVENTS.map(event => getEventMetrics(event));
    setEvents(eventsWithMetrics); 
    setIsLoading(false);
  }, []);

  // 4. PWA Installation logic...
  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    setIsAppInstalled(isStandalone);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPromptEvent(e);
      setIsPwaInstallable(true);
    };

    const handleAppInstalled = () => {
        setIsAppInstalled(true);
        setIsPwaInstallable(false);
        setInstallPromptEvent(null);
        showToast("¡App instalada correctamente!", ICONS.addToHomeScreen);
        if (window.gtag) window.gtag('event', 'pwa_install', { 'event_category': 'engagement' });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // 5. Cookie Consent Logic
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Small delay for UX on initial load
      const timer = setTimeout(() => setIsCookieConsentOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEngagementAction = () => {
    if (isAppInstalled) return;
    const lastDismissed = localStorage.getItem('pwa_dismissed_timestamp');
    if (lastDismissed) {
        const daysSinceDismissed = (Date.now() - parseInt(lastDismissed)) / (1000 * 60 * 60 * 24);
        if (daysSinceDismissed < 3) return;
    }
    setShowInstallModal(true);
  };

  const handleManualInstallClick = () => {
    if (installPromptEvent) {
        installPromptEvent.prompt();
        installPromptEvent.userChoice.then((choiceResult: any) => {
            setInstallPromptEvent(null);
        });
    } else {
        setShowInstallModal(true);
    }
  };

  const handleDismissPwa = () => {
    setShowInstallModal(false);
    localStorage.setItem('pwa_dismissed_timestamp', Date.now().toString());
  };

  const handleSelectTowns = (townId: string) => {
    if (townId === 'all') {
        setSelectedTownIds([]); // Empty means ALL
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    setSelectedTownIds(prev => {
        if (prev.includes(townId)) {
            return prev.filter(id => id !== townId);
        } else {
            return [...prev, townId];
        }
    });
  };

  const handleLogin = (email: string, pass: string) => {
    if (email === 'buyappglobal@gmail.com' && pass === 'sierra2025') {
      setIsLoggedIn(true);
      setIsLoginModalOpen(false);
      setLoginError(null);
      showToast("Sesión iniciada correctamente", ICONS.add);
    } else {
      setLoginError('Email o contraseña incorrectos.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showToast("Sesión cerrada", ICONS.logout);
  };

  const handleAddEvent = (newEventData: Omit<EventType, 'id'>) => {
    const newEvent: EventType = { ...newEventData, id: Date.now().toString() };
    setEvents(prev => [...prev, newEvent]);
    setIsAddEventModalOpen(false);
    
    // Generar instrucción de cambio para el admin
    setPendingChange({ action: 'CREATE', data: newEvent });
    setShowChangeRequestModal(true);
  };

  const handleUpdateEvent = (updatedEvent: EventType) => {
    // Optimistic Update locally
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? { ...e, ...updatedEvent } : e));
    setEditingEvent(null);
    // Only send instruction if it's an admin edit, not a social interaction
    if (isLoggedIn) {
        setPendingChange({ action: 'UPDATE', data: updatedEvent });
        setShowChangeRequestModal(true);
    }
  };
  
  // Real-time interaction handler (for Likes/Attending from users)
  const handleInteractionUpdate = (updatedEvent: EventType) => {
      setEvents(prevEvents => prevEvents.map(e => 
          e.id === updatedEvent.id ? updatedEvent : e
      ));
  };

  const handleDeleteEvent = (eventId: string) => {
    const eventToDelete = events.find(e => e.id === eventId);
    if (eventToDelete) {
      setEvents(prev => prev.filter(e => e.id !== eventId));
      setEditingEvent(null);
      setPendingChange({ action: 'DELETE', data: eventToDelete });
      setShowChangeRequestModal(true);
    }
  };

  // Función para descargar los datos en CSV (sincronización local)
  const handleExportData = () => {
      exportEventsToCSV(events);
      showToast("Descargando lista de eventos...", ICONS.download);
  };

  const showToast = (message: string, icon: React.ReactNode) => {
    setToast({ message, icon });
    setTimeout(() => setToast(null), 4500); 
  };

  // --- COMPUTE TOWN EVENT COUNTS (UPCOMING/ONGOING) ---
  const townEventCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    events.forEach(event => {
      const eventDate = new Date(event.date);
      const endDate = event.endDate ? new Date(event.endDate) : eventDate;
      const endInclusive = new Date(endDate);
      endInclusive.setHours(23, 59, 59, 999);

      if (endInclusive >= today) {
         const normalizedEventTown = normalizeString(event.town);
         let townId = null;

         const townObj = TOWNS.find(t => normalizeString(t.name) === normalizedEventTown);
         if (townObj) {
             townId = townObj.id;
         } else {
             townId = normalizedEventTown.replace(/\s/g, '');
         }

         if (townId) {
             counts[townId] = (counts[townId] || 0) + 1;
         }
      }
    });
    return counts;
  }, [events]);


  // --- DYNAMIC CATEGORY CALCULATION ---
  const availableCategories = useMemo(() => {
    const queryTerms = normalizeString(searchQuery).split(" ").filter(Boolean);

    const relevantEvents = events.filter(event => {
         const isAllTowns = selectedTownIds.length === 0;
         let matchesTown = true;
         if (!isAllTowns) {
              const normalizedEventTown = normalizeString(event.town);
              const townObj = TOWNS.find(t => normalizeString(t.name) === normalizedEventTown);
              
              if (townObj) {
                  matchesTown = selectedTownIds.includes(townObj.id);
              } else {
                  matchesTown = selectedTownIds.includes(normalizedEventTown.replace(/\s/g, ''));
              }
         }

         let matchesSearch = true;
         if (queryTerms.length > 0) {
             const keywords = CATEGORY_KEYWORDS[event.category] || "";
             const searchableText = normalizeString(
                 `${event.title} ${event.description} ${event.town} ${event.category} ${keywords}`
             );
             matchesSearch = queryTerms.every(term => searchableText.includes(term));
         }

         let matchesDate = true;
         if (startDate) {
             const filterStart = new Date(startDate);
             const filterEnd = endDate ? new Date(endDate) : new Date('2030-01-01'); // If no end date, assume future

             const eventStart = new Date(event.date);
             const eventEnd = event.endDate ? new Date(event.endDate) : eventStart;
             
             matchesDate = (eventStart <= filterEnd) && (eventEnd >= filterStart);
         }

         return matchesTown && matchesSearch && matchesDate;
    });

    const categories = new Set<EventCategory>();
    relevantEvents.forEach(e => categories.add(e.category));
    return Array.from(categories);
  }, [events, selectedTownIds, searchQuery, startDate, endDate]);


  // --- FILTERING LOGIC (STRICT ID) ---
  const filteredEvents = useMemo(() => {
    const isAllTowns = selectedTownIds.length === 0;
    const queryTerms = normalizeString(searchQuery).split(" ").filter(Boolean);

    return events.filter(event => {
      // 1. Personal Filter (Updated to ensure reactivity)
      if (filterType === 'favorites' && !event.isFavorite) return false;
      if (filterType === 'attending' && !event.isAttending) return false;

      // 2. Filtro de Pueblo Estricto
      let matchesTown = true;
      if (!isAllTowns) {
          const normalizedEventTown = normalizeString(event.town);
          const townObj = TOWNS.find(t => normalizeString(t.name) === normalizedEventTown);
          
          if (townObj) {
              matchesTown = selectedTownIds.includes(townObj.id);
          } else {
              const generatedId = normalizedEventTown.replace(/\s/g, '');
              matchesTown = selectedTownIds.includes(generatedId);
          }
      }
      
      // 3. Smart Search Logic
      let matchesSearch = true;
      if (queryTerms.length > 0) {
          const keywords = CATEGORY_KEYWORDS[event.category] || "";
          const searchableText = normalizeString(
              `${event.title} ${event.description} ${event.town} ${event.category} ${keywords}`
          );
          matchesSearch = queryTerms.every(term => searchableText.includes(term));
      }
        
      // 4. Filtro de Categoría
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => {
          if (cat === EventCategory.PUEBLO_DESTACADO) {
              return event.sponsored;
          }
          return event.category === cat;
      });
      
      // 5. Filtro de Fecha
      let matchesDate = true;
      if (startDate) {
        const filterStart = new Date(startDate);
        const filterEnd = endDate ? new Date(endDate) : new Date('2030-12-31');
        const eventStart = new Date(event.date);
        const eventEnd = event.endDate ? new Date(event.endDate) : eventStart;

        matchesDate = (eventStart <= filterEnd) && (eventEnd >= filterStart);
      }

      return matchesTown && matchesSearch && matchesCategory && matchesDate;
    });
  }, [events, selectedTownIds, searchQuery, selectedCategories, startDate, endDate, filterType]);

  const finalEventsList = useMemo(() => {
    // Los eventos en 'filteredEvents' son SOLO contenido (ya que events.ts ya no tiene ADS)
    const contentEvents = filteredEvents;

    // 1. Deduplicación inteligente (Pueblos Destacados vs Eventos Normales)
    const townsWithSpecificEvents = new Set(
        contentEvents
            .filter(e => e.category !== EventCategory.PUEBLO_DESTACADO)
            .map(e => normalizeString(e.town))
    );

    const dedupedContent = contentEvents.filter(e => {
        if (e.category === EventCategory.PUEBLO_DESTACADO) {
            const townId = normalizeString(e.town);
            return !townsWithSpecificEvents.has(townId);
        }
        return true;
    });

    // 2. SORTING LOGIC
    let sortedContent = [...dedupedContent];
    
    if (sortBy === 'popularity') {
        // Sort by Views (Descending)
        sortedContent.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
        // Standard Date Sort with Shuffle for Highlights
        const highlighted = sortedContent.filter(e => e.sponsored || e.category === EventCategory.PUEBLO_DESTACADO);
        const standard = sortedContent.filter(e => !e.sponsored && e.category !== EventCategory.PUEBLO_DESTACADO);
        
        // Shuffle highlighted to give fair rotation
        const shuffledHighlighted = [...highlighted].sort(() => Math.random() - 0.5);
        // Chronological for standard
        const sortedStandard = [...standard].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        sortedContent = [...shuffledHighlighted, ...sortedStandard];
    }

    // 3. AD INJECTION (Only if no town filter active)
    if (selectedTownIds.length > 0 || filterType !== 'all') {
        return sortedContent;
    }

    if (ADS.length === 0) {
        return sortedContent;
    }

    const result = [];
    let adIndex = 0;
    const shuffledAds = [...ADS].sort(() => Math.random() - 0.5);

    for (let i = 0; i < sortedContent.length; i++) {
        result.push(sortedContent[i]);
        if ((i + 1) % 3 === 0) {
            if (shuffledAds.length === 1 && adIndex > 0) {
                continue;
            }
            if (shuffledAds.length > 0) {
                const ad = shuffledAds[adIndex % shuffledAds.length];
                result.push(ad);
                adIndex++;
            }
        }
    }
    return result;

  }, [filteredEvents, selectedTownIds, sortBy, filterType]);

  const handleCategoryToggle = (category: EventCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleDateChange = (start: string | null, end: string | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleResetFilters = () => {
    setSelectedTownIds([]);
    setSearchQuery('');
    setSelectedCategories([]);
    setStartDate(null);
    setEndDate(null);
    setFilterType('all');
    setSortBy('date');
    
    // Clean URL
    const url = new URL(window.location.href);
    url.searchParams.delete('town');
    window.history.pushState({}, '', url);
  };

  const handleHomeClick = () => {
    setView('list');
    navigateToEvent(null);
    handleResetFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find selected event in main list or ADS
  // UPDATED: Look in the 'events' state to ensure we get the latest interaction status
  const selectedEvent = useMemo(() => {
      if (!selectedEventId) return null;
      
      // First try to find in the active, reactive events list
      const eventInState = events.find(e => e.id === selectedEventId);
      if (eventInState) return eventInState;
      
      // Fallback for ads which might not be in 'events' if filtered out, 
      // but usually ADS are handled separately. If needed, apply metrics to ad.
      const ad = ADS.find(e => e.id === selectedEventId);
      if (ad) return getEventMetrics(ad);
      
      // Last resort fallback (shouldn't happen if initialized correctly)
      const staticEvent = ALL_EVENTS.find(e => e.id === selectedEventId);
      return staticEvent ? getEventMetrics(staticEvent) : null;
  }, [selectedEventId, events]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300 pb-20">
      <Header 
        view={view} 
        setView={setView} 
        isMapVisible={isMapModalOpen} 
        onMapClick={() => setIsMapModalOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
        isPwaInstallable={true} 
        onInstallClick={handleManualInstallClick}
        onHomeClick={handleHomeClick}
        onSuggestClick={() => setIsSuggestEventModalOpen(true)}
      />
      
      <main className="container mx-auto p-4 flex-grow">
        <Hero />

        {selectedEvent ? (
          <EventDetail 
            event={selectedEvent} 
            onBack={() => navigateToEvent(null)}
            isLoggedIn={isLoggedIn}
            onEdit={() => setEditingEvent(selectedEvent)}
            onCategoryFilterClick={(cat) => { setSelectedCategories([cat]); navigateToEvent(null); }}
            showToast={showToast}
            onEngagement={handleEngagementAction}
            onUpdateEvent={handleInteractionUpdate}
          />
        ) : (
          <>
             {/* Botón de Filtros Estático (Visible solo en Móvil al inicio) */}
             <div className="md:hidden mb-6 animate-fade-in">
                <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="w-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 py-3 px-4 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-between transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                    <span className="flex items-center gap-2 font-bold font-display">
                        {ICONS.filter}
                        Filtrar y Buscar Eventos
                    </span>
                    <span className="text-xs font-semibold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                        {finalEventsList.filter(e => !e.externalUrl).length} resultados
                    </span>
                </button>
             </div>

             <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4 hidden md:block">
                  <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 scrollbar-hide hover:scrollbar-default">
                    <FilterSidebar 
                      towns={TOWNS}
                      selectedTowns={selectedTownIds}
                      onSelectTown={handleSelectTowns}
                      searchQuery={searchQuery}
                      onSearchQueryChange={setSearchQuery}
                      selectedCategories={selectedCategories}
                      onCategoryToggle={handleCategoryToggle}
                      startDate={startDate}
                      endDate={endDate}
                      onDateChange={handleDateChange}
                      availableCategories={availableCategories}
                      eventCounts={townEventCounts}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                      filterType={filterType}
                      onFilterTypeChange={setFilterType}
                    />
                  </div>
                </aside>

                <div className="w-full md:w-3/4">
                  {view === 'list' ? (
                    <EventList 
                      events={finalEventsList} 
                      onSelectEvent={navigateToEvent}
                      onResetFilters={handleResetFilters}
                      onCategoryFilterClick={(cat) => setSelectedCategories([cat])}
                      isAnyFilterActive={selectedTownIds.length > 0 || !!searchQuery || selectedCategories.length > 0 || !!startDate || filterType !== 'all'}
                      isLoading={isLoading}
                      selectedTownIds={selectedTownIds}
                      onUpdateEvent={handleInteractionUpdate}
                    />
                  ) : (
                    <EventCalendar events={finalEventsList} onSelectEvent={navigateToEvent} />
                  )}
                </div>
              </div>
          </>
        )}
      </main>

      <Footer 
        isLoggedIn={isLoggedIn} 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        onLogoutClick={handleLogout}
        onAddEventClick={() => setIsAddEventModalOpen(true)}
        onManageCookies={() => setIsCookieConsentOpen(true)}
        onSuggestClick={() => setIsSuggestEventModalOpen(true)}
        onExportClick={handleExportData}
      />

      <BottomNav 
        onHomeClick={handleHomeClick}
        onInfoClick={() => setShowInfoAppModal(true)}
        onFaqClick={() => setShowFaqModal(true)}
        onGuideClick={() => setShowGuideModal(true)}
        onFilterClick={() => setIsFilterModalOpen(true)}
      />

      {isFilterModalOpen && (
          <FilterSidebarModal 
            onClose={() => setIsFilterModalOpen(false)}
            resultsCount={finalEventsList.filter(e => !e.externalUrl).length}
            towns={TOWNS}
            selectedTowns={selectedTownIds}
            onSelectTown={handleSelectTowns}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
            availableCategories={availableCategories}
            eventCounts={townEventCounts}
            sortBy={sortBy}
            onSortChange={setSortBy}
            filterType={filterType}
            onFilterTypeChange={setFilterType}
          />
      )}

      {isAddEventModalOpen && (
        <AddEventModal 
          onClose={() => setIsAddEventModalOpen(false)} 
          onAddEvent={handleAddEvent}
          showToast={showToast}
        />
      )}

      {isSuggestEventModalOpen && (
        <SuggestEventModal onClose={() => setIsSuggestEventModalOpen(false)} />
      )}

      {editingEvent && (
        <EditEventModal 
          event={editingEvent} 
          onClose={() => setEditingEvent(null)} 
          onUpdate={handleUpdateEvent}
          onDelete={handleDeleteEvent}
        />
      )}

      {isLoginModalOpen && (
        <LoginModal 
          onClose={() => { setIsLoginModalOpen(false); setLoginError(null); }} 
          onLogin={handleLogin}
          error={loginError}
        />
      )}

      {showChangeRequestModal && pendingChange && (
        <ChangeRequestModal instruction={pendingChange} onClose={() => setShowChangeRequestModal(false)} />
      )}

      {isMapModalOpen && (
        <EventMapModal
            events={finalEventsList}
            onSelectEvent={(id) => { navigateToEvent(id); setIsMapModalOpen(false); }}
            onClose={() => setIsMapModalOpen(false)}
        />
      )}

      {showInstallModal && (
        <InstallPwaModal onInstall={handleManualInstallClick} onClose={handleDismissPwa} />
      )}

      {toast && (
        <Toast message={toast.message} icon={toast.icon} onClose={() => setToast(null)} />
      )}
      
      {/* Modals for Bottom Nav */}
      {showInfoAppModal && <InfoAppModal onClose={() => setShowInfoAppModal(false)} />}
      {showFaqModal && <FaqModal onClose={() => setShowFaqModal(false)} />}
      {showGuideModal && <HowItWorksModal onClose={() => setShowGuideModal(false)} />}

      {isAdminTestMode && (
        <>
            <button
                onClick={() => setShowAiAssistant(true)}
                className="fixed bottom-24 right-6 z-40 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 focus:outline-none border-2 border-white dark:border-slate-800 animate-fade-in"
                aria-label="Abrir asistente IA"
                title="Planificador de Viaje IA (Prueba)"
            >
                {ICONS.magic}
            </button>
            {showAiAssistant && (
                <Suspense fallback={<div className="fixed inset-0 bg-black/50 flex items-center justify-center text-white z-[100]">Cargando Asistente...</div>}>
                    <AiAssistantModal
                        onClose={() => setShowAiAssistant(false)}
                        allEvents={ALL_EVENTS}
                    />
                </Suspense>
            )}
        </>
      )}

      <CookieConsent 
        isVisible={isCookieConsentOpen} 
        onClose={() => setIsCookieConsentOpen(false)} 
      />
    </div>
  );
};

export default App;
