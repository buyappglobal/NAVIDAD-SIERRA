
import React, { useState, useEffect, useMemo } from 'react';
import { ALL_EVENTS } from './data/events';
import { ADS } from './data/ads';
import { PROVINCE_EVENTS } from './data/provinceEvents'; // Imported Province Events
import { townCoordinates } from './data/townCoordinates'; // Import coordinates for distance calculation
import { EventType, EventCategory } from './types';
import { ICONS, TOWNS, ENABLE_AI_SEARCH } from './constants';
import Header from './components/Header';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import EventCalendar from './components/EventCalendar';
import FilterSidebar from './components/FilterSidebar';
import FilterSidebarModal from './components/FilterSidebarModal';
import EventMapModal from './components/EventMapModal';
import ScrollToTopButton from './components/ScrollToTopButton';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Hero from './components/Hero';
import CookieConsent from './components/CookieConsent';
import AddEventModal from './components/AddEventModal';
import LoginModal from './components/LoginModal';
import SuggestEventModal from './components/SuggestEventModal';
import AiAssistantModal from './components/AiAssistantModal';
import InstallPwaModal from './components/InstallPwaModal';
import Toast from './components/Toast';
import InfoAppModal from './components/InfoAppModal';
import FaqModal from './components/FaqModal';
import HowItWorksModal from './components/HowItWorksModal';
import EventCounter from './components/EventCounter';
import MenuModal from './components/MenuModal';
import ProvinceEventsModal from './components/ProvinceEventsModal';
import PassportModal from './components/PassportModal'; 
import VideoGalleryModal from './components/VideoGalleryModal';
import WeekendHighlightModal from './components/WeekendHighlightModal';
import PromoModal from './components/PromoModal';
import InterestInfoModal from './components/InterestInfoModal';
import PlanMyDayModal from './components/PlanMyDayModal';
import WeatherModal from './components/WeatherModal';
import { analyzeSearchIntent } from './services/aiSearchService';
import { getEventMetrics } from './services/interactionService';
import { exportEventsToCSV } from './services/googleSheetsService';

// Helper for shuffling array
const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

// --- LOGIC RESTORATION START ---
// 1. Process metrics for all items
const visibleEvents = ALL_EVENTS.filter(e => !e.hidden);
const processedEvents = visibleEvents.map(getEventMetrics);
const processedAds = ADS.map(getEventMetrics);

// 2. IDENTIFICAR EVENTO PADRE (PRIORIDAD 1)
const CAMPAIGN_PARENT_ID = "campaign-tierra-cultura";
const campaignParentEvent = processedEvents.find(e => e.id === CAMPAIGN_PARENT_ID);

// 3. Separate Sponsored vs Regular (EXCLUYENDO AL PADRE para que no se mezcle)
// Note: We treat ADS separately for injection, so we exclude them from 'sponsoredEvents' to avoid duplication if they were in ALL_EVENTS (they are not, but safe check)
const sponsoredEvents = processedEvents.filter(e => e.sponsored && e.id !== CAMPAIGN_PARENT_ID);
const regularEvents = processedEvents.filter(e => !e.sponsored && e.id !== CAMPAIGN_PARENT_ID);

// 4. Shuffle Sponsored Events (Randomize on load) - Solo los otros patrocinados
const shuffledSponsored = shuffleArray(sponsoredEvents);

// 5. Sort Regular Events by Date (Chronological)
const sortedRegular = regularEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

// 6. Combine: [CAMPAIGN PARENT] + [Random Sponsored] + [Sorted Regular] + [Ads]
// We include Ads at the end initially; they will be repositioned during rendering.
const INITIAL_EVENTS = [
    ...(campaignParentEvent ? [campaignParentEvent] : []), // SIEMPRE EL PRIMERO
    ...shuffledSponsored,
    ...sortedRegular,
    ...processedAds
];
// --- LOGIC RESTORATION END ---

const App: React.FC = () => {
  // --- STATE ---
  const [events, setEvents] = useState<EventType[]>(INITIAL_EVENTS);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  
  // --- ROUTING LOGIC ---
  const parseRoute = () => {
      const hash = window.location.hash; // e.g. #/pueblo/aroche
      // We keep search params as a fallback for legacy links, but Hash is priority
      const params = new URLSearchParams(window.location.search); 
      
      let initialTowns: string[] = [];
      let initialEventId: string | null = null;
      let initialCategories: string[] = [];

      // 1. Hash Routing (Priority) - /#/pueblo/ID, /#/evento/ID, or /#/categoria/NAME
      if (hash.includes('#/pueblo/')) {
          // Extract everything after #/pueblo/
          const rawTown = decodeURIComponent(hash.split('#/pueblo/')[1]);
          const townEntry = TOWNS.find(t => 
              t.id.toLowerCase() === rawTown.toLowerCase() || 
              t.name.toLowerCase() === rawTown.toLowerCase()
          );
          if (townEntry) initialTowns = [townEntry.id];
      } else if (hash.includes('#/evento/')) {
          const eventId = decodeURIComponent(hash.split('#/evento/')[1]);
          if (INITIAL_EVENTS.some(e => e.id === eventId)) {
              initialEventId = eventId;
          }
      } else if (hash.includes('#/categoria/')) {
          const rawCat = decodeURIComponent(hash.split('#/categoria/')[1]);
          // Check if valid category value
          if (Object.values(EventCategory).includes(rawCat as EventCategory)) {
              initialCategories = [rawCat];
          }
      }
      // 2. Query Param Fallback (Legacy support for ?town=...)
      else if (params.get('town')) {
          const townParam = params.get('town')!;
          const townEntry = TOWNS.find(t => 
              t.id.toLowerCase() === townParam.toLowerCase() || 
              t.name.toLowerCase() === townParam.toLowerCase()
          );
          if (townEntry) initialTowns = [townEntry.id];
      } else if (params.get('event')) {
          const eventParam = params.get('event');
          if (eventParam && INITIAL_EVENTS.some(e => e.id === eventParam)) {
              initialEventId = eventParam;
          }
      }

      return { initialTowns, initialEventId, initialCategories };
  };

  const routeData = parseRoute();

  const [selectedTowns, setSelectedTowns] = useState<string[]>(routeData.initialTowns);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(routeData.initialEventId);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(routeData.initialCategories);
  const [initialProvinceEventId, setInitialProvinceEventId] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'popularity'>('date');
  const [filterType, setFilterType] = useState<'all' | 'favorites' | 'attending'>('all');
  const [showPastEvents, setShowPastEvents] = useState(false);

  // New Location Filter State
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Interaction Modals State (List View)
  const [interactionModal, setInteractionModal] = useState<{ type: 'info' | 'plan' | 'weather', event: EventType } | null>(null);

  // UI State
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isAiSearching, setIsAiSearching] = useState(false);
  
  // Modals
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showProvinceEventsModal, setShowProvinceEventsModal] = useState(false);
  const [showPassportModal, setShowPassportModal] = useState(false); 
  const [showVideoModal, setShowVideoModal] = useState(false);

  const [showWeekendModal, setShowWeekendModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);

  // Auth & Toast
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toast, setToast] = useState<{ message: string; icon: React.ReactNode } | null>(null);

  // --- EFFECTS ---

  useEffect(() => {
    // Theme initialization
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    
    // Cookie consent check
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setTimeout(() => setShowCookieConsent(true), 2000);
    }

    // --- PROMO MODAL LOGIC (Priority 1) ---
    const promoShowTimer = setTimeout(() => {
        setShowPromoModal(true);
    }, 5000);

    const promoHideTimer = setTimeout(() => {
        setShowPromoModal(false);
    }, 10000); 

    // --- WEEKEND HIGHLIGHT LOGIC (Priority 2) ---
    let weekendTimer: ReturnType<typeof setTimeout>;
    
    try {
        const visitKey = 'sierra_weekend_highlight_visits_v1';
        const currentVisits = parseInt(localStorage.getItem(visitKey) || '0', 10);
        const newVisits = currentVisits + 1;
        localStorage.setItem(visitKey, newVisits.toString());

        if ((newVisits - 1) % 3 === 0) {
            weekendTimer = setTimeout(() => {
                setShowPromoModal(prevIsPromoOpen => {
                    if (!prevIsPromoOpen) {
                        setShowWeekendModal(true);
                    }
                    return prevIsPromoOpen; 
                });
            }, 20000); 
        }
    } catch (e) {
        console.warn("Local storage error for visits", e);
    }

    // Listen for Hash Changes (Back/Forward navigation)
    const handleHashChange = () => {
        const { initialTowns, initialEventId, initialCategories } = parseRoute();
        // Update state to match URL
        setSelectedTowns(initialTowns);
        setSelectedEventId(initialEventId);
        setSelectedCategories(initialCategories);
        
        // Handle Province Route
        if (window.location.hash.includes('provincia')) {
            setShowProvinceEventsModal(true);
        } else {
            setShowProvinceEventsModal(false);
        }

        // Reset other filters if we navigate back to home (empty hash)
        if (initialTowns.length === 0 && !initialEventId && initialCategories.length === 0 && (!window.location.hash || window.location.hash === '#/' || window.location.hash === '#')) {
            setSelectedCategories([]);
            setSearchQuery('');
            setStartDate(null);
            setEndDate(null);
            setShowPastEvents(false);
            setUserLocation(null); // Reset location filter too
        }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Trigger on mount
    handleHashChange();

    return () => {
        window.removeEventListener('hashchange', handleHashChange);
        clearTimeout(promoShowTimer);
        clearTimeout(promoHideTimer);
        if (weekendTimer) clearTimeout(weekendTimer);
    };
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // --- HANDLERS ---

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const showToastMessage = (message: string, icon: React.ReactNode) => {
    setToast({ message, icon });
  };

  const handleLogin = (email: string, pass: string) => {
      if (email === 'admin@huelvalate.es' && pass === 'sierra2025') {
          setIsLoggedIn(true);
          setShowLoginModal(false);
          showToastMessage("Sesión de administrador iniciada", ICONS.magic);
      } else {
          alert("Credenciales incorrectas");
      }
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      showToastMessage("Sesión cerrada", ICONS.logout);
  };

  const handleAddEvent = (newEventData: any) => {
      const newEvent: EventType = {
          ...newEventData,
          id: Date.now().toString(),
          views: 0,
          likes: 0,
          attendees: 0
      };
      setEvents(prev => [newEvent, ...prev]);
      setShowAddEventModal(false);
      showToastMessage("Evento añadido correctamente", ICONS.checkCircle);
  };

  const handleUpdateEvent = (updatedEvent: EventType) => {
      setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const handleSearchChange = (query: string) => {
      setSearchQuery(query);
  };

  const handleAiSearch = async () => {
      if (!searchQuery.trim()) return;
      
      setIsAiSearching(true);
      const apiKey = process.env.API_KEY || sessionStorage.getItem('gemini-api-key');
      
      if (!apiKey) {
          setShowAiAssistant(true);
          setIsAiSearching(false);
          return;
      }

      try {
          const result = await analyzeSearchIntent(searchQuery, apiKey);
          if (result) {
              if (result.townIds.length > 0) setSelectedTowns(result.townIds);
              if (result.categories.length > 0) setSelectedCategories(result.categories.map(c => c.toString()));
              
              showToastMessage("Búsqueda inteligente aplicada", ICONS.sparkles);
          } else {
              showToastMessage("No se pudo interpretar la búsqueda", ICONS.question);
          }
      } catch (e) {
          console.error(e);
          showToastMessage("Error en la búsqueda IA", ICONS.wifiOff);
      } finally {
          setIsAiSearching(false);
      }
  };

  // --- SPECIAL HANDLER FOR CAMPAIGNS ---
  const handleEventSelect = (id: string) => {
      // SPECIAL LOGIC: Campaign Parent Event
      if (id === 'campaign-tierra-cultura') {
          // Instead of opening detail, filter by the campaign category
          setSelectedCategories([EventCategory.TIERRA_DE_CULTURA]);
          // Clear other conflicting filters to show results
          setSelectedTowns([]);
          setSearchQuery('');
          
          // UPDATE URL TO REFLECT CATEGORY FILTER
          window.location.hash = `#/categoria/${encodeURIComponent(EventCategory.TIERRA_DE_CULTURA)}`;

          // Visual feedback
          window.scrollTo({ top: 0, behavior: 'smooth' });
          showToastMessage("Mostrando programación de Tierra de Cultura", ICONS.filter);
          return;
      }

      // Default behavior
      setSelectedEventId(id);
  };

  const handleCloseDetail = () => {
      setSelectedEventId(null);
      // Ensure overlays are closed when going home from detail view
      setShowProvinceEventsModal(false); 
      
      if (window.location.hash.includes('#/evento/')) {
          history.pushState("", document.title, window.location.pathname + window.location.search);
      }
      
      // Check for PWA install prompt logic (simplified)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
      const hasInstalledStorage = localStorage.getItem('pwa_installed') === 'true';
      const hasShownSession = sessionStorage.getItem('pwa_prompt_shown_session') === 'true';

      if (!isStandalone && !hasInstalledStorage && !hasShownSession) {
          setTimeout(() => {
              setShowInstallModal(true);
              sessionStorage.setItem('pwa_prompt_shown_session', 'true');
          }, 1500); 
      }
  };

  // --- LOCATION LOGIC ---
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleNearMeClick = () => {
      if (userLocation) {
          setUserLocation(null);
          showToastMessage("Ubicación desactivada. Mostrando todos los eventos.", ICONS.map);
          return;
      }

      if (!navigator.geolocation) {
          showToastMessage("Tu navegador no soporta geolocalización.", ICONS.wifiOff);
          return;
      }

      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
          (position) => {
              setUserLocation({
                  lat: position.coords.latitude,
                  lon: position.coords.longitude
              });
              setIsLocating(false);
              showToastMessage("Mostrando eventos a menos de 20km", ICONS.location);
          },
          (error) => {
              console.error(error);
              setIsLocating(false);
              showToastMessage("No se pudo obtener tu ubicación. Revisa los permisos.", ICONS.wifiOff);
          },
          { enableHighAccuracy: true }
      );
  };

  // Handlers for List View Actions
  const handleShowInterest = (event: EventType) => setInteractionModal({ type: 'info', event });
  const handleShowPlan = (event: EventType) => setInteractionModal({ type: 'plan', event });
  const handleShowWeather = (event: EventType) => setInteractionModal({ type: 'weather', event });

  // --- FILTERING & SORTING LOGIC ---

  const filteredEvents = useMemo(() => {
    // Determine "Today"
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - (offset*60*1000));
    const todayStr = localToday.toISOString().split('T')[0];

    // 1. FILTERING
    const filtered = events.filter(event => {
      if (event.hidden) return false;

      const eventEndStr = event.endDate || event.date;
      
      if (showPastEvents) {
          if (eventEndStr >= todayStr) return false;
      } else {
          if (eventEndStr < todayStr) return false;
      }

      const isAd = event.id.startsWith('ad-');
      if (isAd && filterType === 'all') return true;
      if (filterType === 'favorites') { if (!event.isFavorite) return false; }
      if (filterType === 'attending') { if (!event.isAttending) return false; }

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = event.title.toLowerCase().includes(q);
        const matchDesc = event.description.toLowerCase().includes(q);
        const matchTown = event.town.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchTown) return false;
      }

      if (selectedTowns.length > 0 && !selectedTowns.includes('all')) {
         const townObj = TOWNS.find(t => t.name === event.town);
         if (!townObj || !selectedTowns.includes(townObj.id)) return false;
      }

      if (selectedCategories.length > 0 && !selectedCategories.includes(event.category)) {
          return false;
      }

      if (startDate) {
          const eventStart = new Date(event.date);
          const filterStart = new Date(startDate);
          if (event.endDate) {
              const eventEnd = new Date(event.endDate);
              if (eventEnd < filterStart) return false;
          } else {
              if (eventStart < filterStart) return false;
          }
      }
      
      if (endDate) {
          const eventStart = new Date(event.date);
          const filterEnd = new Date(endDate);
          if (eventStart > filterEnd) return false;
      }

      // Location Filter (20km radius)
      if (userLocation && !isAd) {
          const townCoords = townCoordinates[event.town];
          if (townCoords) {
              const distance = calculateDistance(userLocation.lat, userLocation.lon, townCoords[0], townCoords[1]);
              if (distance > 20) return false;
          }
          else {
              return false;
          }
      }

      return true;
    });

    // 2. SEPARATE CAMPAIGN PARENT
    const CAMPAIGN_PARENT_ID = "campaign-tierra-cultura";
    const campaignParent = filtered.find(e => e.id === CAMPAIGN_PARENT_ID);
    const others = filtered.filter(e => e.id !== CAMPAIGN_PARENT_ID);

    // Check for active filters (to hide parent)
    const hasActiveFilters = (selectedTowns.length > 0 && !selectedTowns.includes('all')) || 
                             selectedCategories.length > 0 || 
                             !!startDate || 
                             !!endDate || 
                             !!searchQuery || 
                             showPastEvents || 
                             !!userLocation;

    // 3. SORT & INJECT ADS (on 'others')
    let result = [];

    if (sortBy === 'date') {
        const adsList = others.filter(e => e.id.startsWith('ad-'));
        const contentList = others.filter(e => !e.id.startsWith('ad-'));
        
        let sortedContent = [...contentList];
        
        if (showPastEvents) {
             sortedContent.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        // NOTE: Standard order (state order) is implicitly chronological for Regular events, so no sort needed if !showPastEvents

        result = [...sortedContent];

        if (adsList.length > 0) {
            const adToInject = adsList[0];
            if (result.length >= 3) {
                result.splice(3, 0, adToInject);
            } else {
                result.push(adToInject);
            }
        }
    } else {
        // Popularity Sort
        result = others.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }

    // 4. RECOMBINE: Parent always first if it survived filters AND NO FILTERS ARE ACTIVE
    if (campaignParent && !hasActiveFilters) {
        return [campaignParent, ...result];
    }
    return result;

  }, [events, searchQuery, selectedTowns, selectedCategories, startDate, endDate, sortBy, filterType, showPastEvents, userLocation]);

  // Calculate Active Province Events Count
  const activeProvinceEventsCount = useMemo(() => {
      const today = new Date().toISOString().split('T')[0];
      return PROVINCE_EVENTS.filter(e => !e.date || e.date >= today).length;
  }, []);

  // --- MAP PREPARATION ---
  // Combine Sierra events with mapped Province events for the map
  const mapEvents = useMemo(() => {
      const provinceMapEvents: EventType[] = PROVINCE_EVENTS.map(pe => ({
          id: pe.id,
          title: pe.title || 'Evento en Provincia',
          description: pe.description || '',
          town: pe.location || 'Huelva', // This string MUST exist in townCoordinates.ts keys
          date: pe.date || new Date().toISOString().split('T')[0],
          category: EventCategory.OTRO,
          imageUrl: pe.imageUrl,
          // Dummy data to satisfy EventType
          interestInfo: '',
          sponsored: false
      } as EventType));

      return [...filteredEvents, ...provinceMapEvents];
  }, [filteredEvents]);

  const handleMapEventSelect = (id: string) => {
      // Check if it is a province event (id exists in PROVINCE_EVENTS)
      const isProvinceEvent = PROVINCE_EVENTS.some(e => e.id === id);
      
      if (isProvinceEvent) {
          setIsMapVisible(false);
          setInitialProvinceEventId(id);
          setShowProvinceEventsModal(true);
      } else {
          handleEventSelect(id);
          setIsMapVisible(false);
      }
  };

  const eventCounts = useMemo(() => {
      const counts: Record<string, number> = {};
      // Logic duplicated for count consistency... simplified for brevity here
      // Ideally reuse filter logic or just count filteredEvents towns
      filteredEvents.forEach(e => {
          const t = TOWNS.find(town => town.name === e.town);
          if (t) {
              counts[t.id] = (counts[t.id] || 0) + 1;
          }
      });
      return counts;
  }, [filteredEvents]);

  const availableCategories = useMemo(() => {
      return Array.from(new Set(filteredEvents.map(e => e.category)));
  }, [filteredEvents]);

  const selectedEvent = useMemo(() => 
    selectedEventId ? events.find(e => e.id === selectedEventId) : null
  , [events, selectedEventId]);

  // --- RENDER ---

  if (selectedEvent) {
      return (
          <div className={theme}>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white pb-20">
                <div className="container mx-auto p-4">
                    <EventDetail 
                        event={selectedEvent} 
                        onBack={handleCloseDetail}
                        isLoggedIn={isLoggedIn}
                        onEdit={() => {}}
                        onCategoryFilterClick={(cat) => { setSelectedCategories([cat]); setSelectedEventId(null); }}
                        showToast={showToastMessage}
                        onEngagement={() => {}}
                        onUpdateEvent={handleUpdateEvent}
                        allEvents={events}
                        onSelectEvent={handleEventSelect}
                        onOpenPassport={() => setShowPassportModal(true)}
                    />
                </div>
                <BottomNav 
                    onHomeClick={handleCloseDetail}
                    onMenuClick={() => {
                        setShowMenuModal(true);
                        setShowProvinceEventsModal(false);
                    }}
                    onFaqClick={() => {
                        setShowFaqModal(true);
                        setShowProvinceEventsModal(false);
                    }}
                    onGuideClick={() => {
                        setShowGuideModal(true);
                        setShowProvinceEventsModal(false);
                    }}
                    onFilterClick={() => { 
                        setSelectedEventId(null); 
                        setIsFilterModalOpen(true); 
                        setShowProvinceEventsModal(false);
                    }}
                />
            </div>
            {toast && <Toast message={toast.message} icon={toast.icon} onClose={() => setToast(null)} />}
            
            {showMenuModal && (
                <MenuModal 
                    onClose={() => setShowMenuModal(false)}
                    onInstall={() => setShowInstallModal(true)}
                    onSuggest={() => setShowSuggestModal(true)}
                    toggleTheme={handleToggleTheme}
                    onInfo={() => setShowInfoModal(true)}
                    onProvinceEvents={() => setShowProvinceEventsModal(true)}
                    onPassport={() => setShowPassportModal(true)}
                    onVideoGallery={() => setShowVideoModal(true)}
                    isPwaInstallable={true}
                    theme={theme}
                />
            )}
            
            {showPassportModal && (
                <PassportModal onClose={() => setShowPassportModal(false)} />
            )}

            {showVideoModal && (
                <VideoGalleryModal onClose={() => setShowVideoModal(false)} />
            )}

            {showProvinceEventsModal && (
                <ProvinceEventsModal 
                    onClose={() => {
                        setShowProvinceEventsModal(false);
                        setInitialProvinceEventId(null);
                        if (window.location.hash.includes('provincia')) {
                            history.pushState("", document.title, window.location.pathname + window.location.search);
                        }
                    }} 
                    initialEventId={initialProvinceEventId}
                />
            )}
            
            {showInstallModal && (
                <InstallPwaModal 
                    onClose={() => setShowInstallModal(false)}
                    onInstall={() => {
                        localStorage.setItem('pwa_installed', 'true');
                        setShowInstallModal(false);
                    }}
                />
            )}
            
            {showInfoModal && <InfoAppModal onClose={() => setShowInfoModal(false)} />}
            {showSuggestModal && <SuggestEventModal onClose={() => setShowSuggestModal(false)} />}
          </div>
      );
  }

  return (
    <div className={theme}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300 pb-20">
        <Header 
            view={view} 
            setView={setView} 
            isMapVisible={isMapVisible} 
            onMapClick={() => setIsMapVisible(true)}
            onHomeClick={() => {
                setSelectedTowns([]);
                setSelectedCategories([]);
                setSearchQuery('');
                setStartDate(null);
                setEndDate(null);
                setShowPastEvents(false);
                setUserLocation(null);
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }}
            onPassportClick={() => setShowPassportModal(true)}
        />

        <main className="container mx-auto p-4 md:flex gap-8">
            <aside className="hidden md:block w-80 flex-shrink-0 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-2">
                <FilterSidebar 
                    towns={TOWNS}
                    selectedTowns={selectedTowns}
                    onSelectTown={(id) => setSelectedTowns(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id])}
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                    selectedCategories={selectedCategories}
                    onCategoryToggle={(cat) => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}
                    startDate={startDate}
                    endDate={endDate}
                    onDateChange={(s, e) => { setStartDate(s); setEndDate(e); }}
                    availableCategories={availableCategories}
                    eventCounts={eventCounts}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    filterType={filterType}
                    onFilterTypeChange={setFilterType}
                    showPastEvents={showPastEvents}
                    onTogglePastEvents={() => {
                        const newState = !showPastEvents;
                        setShowPastEvents(newState);
                        if (newState) {
                            setStartDate(null);
                            setEndDate(null);
                        }
                    }}
                />
            </aside>

            <div className="flex-1 min-w-0">
                  {/* Buscador Rápido con IA */}
                  <div className="mb-6">
                      <div className="bg-white dark:bg-slate-800 p-3 md:p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                          <div className="flex justify-between items-end mb-2">
                              <label className="block text-xs font-bold text-slate-500 uppercase">Buscador Inteligente</label>
                              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded-full flex items-center gap-1 border border-purple-200 dark:border-purple-800">
                                  {ICONS.sparkles} Impulsado por IA
                              </span>
                          </div>
                          <div className="w-full">
                             <div className="relative">
                                 <input
                                    type="text" 
                                    className="w-full p-3 pl-10 pr-20 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-amber-400 focus:border-amber-400 disabled:opacity-50"
                                    placeholder={isAiSearching ? "Analizando..." : "Puente de diciembre, Cabalgata..."}
                                    value={searchQuery}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                                    disabled={isAiSearching}
                                 />
                                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                 </div>
                                 {ENABLE_AI_SEARCH && (
                                     <button 
                                        onClick={handleAiSearch}
                                        disabled={isAiSearching || !searchQuery.trim()}
                                        className="absolute inset-y-1 right-1 px-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-md hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center gap-2 disabled:opacity-50"
                                     >
                                         {isAiSearching ? (
                                             <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                         ) : (
                                             ICONS.sparkles
                                         )}
                                         <span className="text-xs font-bold">IA</span>
                                     </button>
                                 )}
                             </div>
                             
                             {/* Botón Geolocalización */}
                             <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
                                <button
                                    onClick={handleNearMeClick}
                                    disabled={isLocating}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors whitespace-nowrap ${
                                        userLocation 
                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' 
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600'
                                    }`}
                                >
                                    {isLocating ? (
                                        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    ) : (
                                        ICONS.location
                                    )}
                                    {userLocation ? 'Ubicación Activa (20km)' : 'Eventos cerca de mí'}
                                </button>
                             </div>
                          </div>
                      </div>
                  </div>

                <Hero />

                {showPastEvents && (
                    <div className="bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500 text-amber-800 dark:text-amber-300 p-4 mb-4 rounded-r shadow-sm animate-fade-in flex justify-between items-center">
                        <div>
                            <p className="font-bold">Estás viendo eventos pasados</p>
                            <p className="text-xs">Mostrando el historial de actividades finalizadas.</p>
                        </div>
                        <button 
                            onClick={() => setShowPastEvents(false)}
                            className="bg-amber-200 dark:bg-amber-800 px-3 py-1 rounded text-xs font-bold hover:bg-amber-300 dark:hover:bg-amber-700 transition-colors"
                        >
                            Ver Actuales
                        </button>
                    </div>
                )}

                {/* Contador de Eventos */}
                <div className="mb-4">
                    <EventCounter 
                        total={filteredEvents.filter(e => !e.id.startsWith('ad-')).length} 
                        onClick={() => {
                            setSelectedTowns([]);
                            setSelectedCategories([]);
                            setSearchQuery('');
                            setStartDate(null);
                            setEndDate(null);
                            setFilterType('all');
                            setShowPastEvents(false);
                            setUserLocation(null);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            history.pushState("", document.title, window.location.pathname + window.location.search);
                        }}
                    />
                </div>

                {view === 'calendar' ? (
                    <EventCalendar events={filteredEvents} onSelectEvent={handleEventSelect} />
                ) : (
                    <EventList 
                        events={filteredEvents} 
                        onSelectEvent={handleEventSelect} 
                        onResetFilters={() => {
                            setSelectedTowns([]);
                            setSelectedCategories([]);
                            setStartDate(null);
                            setEndDate(null);
                            setSearchQuery('');
                            setShowPastEvents(false);
                            setUserLocation(null);
                            history.pushState("", document.title, window.location.pathname + window.location.search);
                        }}
                        onCategoryFilterClick={(cat) => setSelectedCategories([cat])}
                        isAnyFilterActive={selectedTowns.length > 0 || selectedCategories.length > 0 || !!startDate || !!endDate || !!searchQuery || showPastEvents || !!userLocation}
                        selectedTownIds={selectedTowns}
                        selectedCategories={selectedCategories}
                        onUpdateEvent={handleUpdateEvent}
                        
                        onShowInterest={handleShowInterest}
                        onShowPlan={handleShowPlan}
                        onShowWeather={handleShowWeather}
                    />
                )}
            </div>
        </main>

        <Footer 
            isLoggedIn={isLoggedIn}
            onLoginClick={() => setShowLoginModal(true)}
            onLogoutClick={handleLogout}
            onAddEventClick={() => setShowAddEventModal(true)}
            onManageCookies={() => setShowCookieConsent(true)}
            onSuggestClick={() => setShowSuggestModal(true)}
            onExportClick={() => exportEventsToCSV(events)}
        />

        <BottomNav 
            onHomeClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setSelectedEventId(null);
                setShowProvinceEventsModal(false); // Force close province modal
                history.pushState("", document.title, window.location.pathname + window.location.search);
            }}
            onMenuClick={() => {
                setShowMenuModal(true);
                setShowProvinceEventsModal(false);
            }}
            onFaqClick={() => {
                setShowFaqModal(true);
                setShowProvinceEventsModal(false);
            }}
            onGuideClick={() => {
                setShowGuideModal(true);
                setShowProvinceEventsModal(false);
            }}
            onFilterClick={() => {
                setIsFilterModalOpen(true);
                setShowProvinceEventsModal(false);
            }}
        />

        {/* MODALS */}
        {interactionModal?.type === 'info' && (
            <InterestInfoModal 
                town={interactionModal.event.town}
                content={interactionModal.event.interestInfo || ''}
                onClose={() => setInteractionModal(null)}
            />
        )}
        {interactionModal?.type === 'plan' && (
            <PlanMyDayModal 
                event={interactionModal.event}
                onClose={() => setInteractionModal(null)}
            />
        )}
        {interactionModal?.type === 'weather' && (
            <WeatherModal 
                town={interactionModal.event.town}
                date={interactionModal.event.date}
                onClose={() => setInteractionModal(null)}
            />
        )}

        {isFilterModalOpen && (
            <FilterSidebarModal 
                onClose={() => setIsFilterModalOpen(false)}
                resultsCount={filteredEvents.length}
                towns={TOWNS}
                selectedTowns={selectedTowns}
                onSelectTown={(id) => setSelectedTowns(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id])}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                selectedCategories={selectedCategories}
                onCategoryToggle={(cat) => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])}
                startDate={startDate}
                endDate={endDate}
                onDateChange={(s, e) => { setStartDate(s); setEndDate(e); }}
                availableCategories={availableCategories}
                eventCounts={eventCounts}
                sortBy={sortBy}
                onSortChange={setSortBy}
                filterType={filterType}
                onFilterTypeChange={setFilterType}
                showPastEvents={showPastEvents}
                onTogglePastEvents={() => {
                    const newState = !showPastEvents;
                    setShowPastEvents(newState);
                    if (newState) {
                        setStartDate(null);
                        setEndDate(null);
                    }
                }}
            />
        )}

        {isMapVisible && (
            <EventMapModal 
                events={filteredEvents}
                onSelectEvent={handleMapEventSelect}
                onClose={() => setIsMapVisible(false)} 
            />
        )}

        {showAddEventModal && (
            <AddEventModal 
                onClose={() => setShowAddEventModal(false)}
                onAddEvent={handleAddEvent}
                showToast={showToastMessage}
            />
        )}

        {showLoginModal && (
            <LoginModal 
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLogin}
                error={null}
            />
        )}

        {showSuggestModal && (
            <SuggestEventModal onClose={() => setShowSuggestModal(false)} />
        )}

        {showAiAssistant && (
            <AiAssistantModal 
                onClose={() => setShowAiAssistant(false)}
                allEvents={events}
            />
        )}

        {showInstallModal && (
            <InstallPwaModal 
                onClose={() => setShowInstallModal(false)}
                onInstall={() => {
                    localStorage.setItem('pwa_installed', 'true');
                    setShowInstallModal(false);
                }}
            />
        )}

        {showMenuModal && (
            <MenuModal 
                onClose={() => setShowMenuModal(false)}
                onInstall={() => setShowInstallModal(true)}
                onSuggest={() => setShowSuggestModal(true)}
                toggleTheme={handleToggleTheme}
                onInfo={() => setShowInfoModal(true)}
                onProvinceEvents={() => setShowProvinceEventsModal(true)}
                onPassport={() => setShowPassportModal(true)}
                onVideoGallery={() => setShowVideoModal(true)}
                isPwaInstallable={true}
                theme={theme}
            />
        )}

        {showPassportModal && (
            <PassportModal onClose={() => setShowPassportModal(false)} />
        )}

        {showVideoModal && (
            <VideoGalleryModal onClose={() => setShowVideoModal(false)} />
        )}

        {showProvinceEventsModal && (
            <ProvinceEventsModal 
                onClose={() => {
                    setShowProvinceEventsModal(false);
                    setInitialProvinceEventId(null);
                    if (window.location.hash.includes('provincia')) {
                        history.pushState("", document.title, window.location.pathname + window.location.search);
                    }
                }} 
                initialEventId={initialProvinceEventId}
            />
        )}

        {showWeekendModal && (
            <WeekendHighlightModal 
                onClose={() => setShowWeekendModal(false)}
                onSelectEvent={handleEventSelect}
                onInstall={() => setShowInstallModal(true)}
            />
        )}

        {showPromoModal && (
            <PromoModal 
                imageUrl="https://solonet.es/wp-content/uploads/2025/12/WhatsApp-Image-2025-12-04-at-13.27.18.jpeg"
                onClose={() => setShowPromoModal(false)}
            />
        )}

        {showInfoModal && <InfoAppModal onClose={() => setShowInfoModal(false)} />}
        {showFaqModal && <FaqModal onClose={() => setShowFaqModal(false)} />}
        {showGuideModal && <HowItWorksModal onClose={() => setShowGuideModal(false)} />}

        <CookieConsent isVisible={showCookieConsent} onClose={() => setShowCookieConsent(false)} />
        
        {toast && <Toast message={toast.message} icon={toast.icon} onClose={() => setToast(null)} />}
        
      </div>
    </div>
  );
};

export default App;