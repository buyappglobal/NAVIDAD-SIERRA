
import { EventType, EventCategory } from '../types';
import { townCoordinates } from '../data/townCoordinates';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (data: PassportData) => boolean;
}

export interface PassportData {
  visitedTowns: string[];
  attendedEvents: string[]; // Store Event Categories visited
  unlockedBadges: string[];
  lastCheckIn?: string;
}

const STORAGE_KEY = 'huelva_late_passport_v1';

// Definición de Insignias (Logros)
export const BADGES: Badge[] = [
  {
    id: 'first_steps',
    name: 'Primeros Pasos',
    description: 'Realiza tu primer check-in en cualquier pueblo.',
    icon: '🦶',
    condition: (data) => data.visitedTowns.length >= 1
  },
  {
    id: 'explorer',
    name: 'Explorador Serrano',
    description: 'Visita 3 pueblos diferentes de la Sierra.',
    icon: '🧭',
    condition: (data) => data.visitedTowns.length >= 3
  },
  {
    id: 'adventurer',
    name: 'Gran Aventurero',
    description: 'Visita 5 pueblos diferentes.',
    icon: '🎒',
    condition: (data) => data.visitedTowns.length >= 5
  },
  {
    id: 'christmas_spirit',
    name: 'Espíritu Navideño',
    description: 'Asiste a un Belén Viviente o Cabalgata.',
    icon: '🎄',
    condition: (data) => data.attendedEvents.includes(EventCategory.BELEN_VIVIENTE) || data.attendedEvents.includes(EventCategory.CABALGATA)
  },
  {
    id: 'gourmet',
    name: 'Sibarita Serrano',
    description: 'Disfruta de una Feria Gastronómica.',
    icon: '🍖',
    condition: (data) => data.attendedEvents.includes(EventCategory.FERIA_GASTRONOMICA)
  },
  {
    id: 'party',
    name: 'Fiestero',
    description: 'Asiste a una Zambomba o Fiesta.',
    icon: '💃',
    condition: (data) => data.attendedEvents.includes(EventCategory.FIESTA)
  }
];

export const getPassportData = (): PassportData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Storage access restricted");
  }
  return { visitedTowns: [], attendedEvents: [], unlockedBadges: [] };
};

const savePassportData = (data: PassportData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Storage write restricted");
  }
};

// Fórmula de Haversine para calcular distancia en km
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const tryCheckIn = async (event: EventType): Promise<{ success: boolean; message: string; newBadge?: Badge }> => {
  if (!navigator.geolocation) {
    return { success: false, message: "Geolocalización no soportada." };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const townCoords = townCoordinates[event.town];

        if (!townCoords) {
          // Si no tenemos coordenadas del pueblo, permitimos check-in por confianza (fallback)
          const result = processSuccessfulCheckIn(event);
          resolve(result);
          return;
        }

        const distance = calculateDistance(latitude, longitude, townCoords[0], townCoords[1]);
        
        // Radio permitido: 10 km (para dar margen a aldeas y error de GPS)
        if (distance <= 10) {
          const result = processSuccessfulCheckIn(event);
          resolve(result);
        } else {
          resolve({ 
            success: false, 
            message: `Estás a ${distance.toFixed(1)}km de ${event.town}. Debes estar allí para sellar.` 
          });
        }
      },
      (error) => {
        console.error(error);
        resolve({ success: false, message: "No pudimos obtener tu ubicación. Activa el GPS." });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
};

const processSuccessfulCheckIn = (event: EventType): { success: boolean; message: string; newBadge?: Badge } => {
  const data = getPassportData();
  let newBadge: Badge | undefined;

  // Actualizar pueblos visitados
  if (!data.visitedTowns.includes(event.town)) {
    data.visitedTowns.push(event.town);
  }

  // Actualizar categorías de eventos
  if (!data.attendedEvents.includes(event.category)) {
    data.attendedEvents.push(event.category);
  }

  data.lastCheckIn = new Date().toISOString();

  // Verificar nuevas insignias
  BADGES.forEach(badge => {
    if (!data.unlockedBadges.includes(badge.id)) {
      if (badge.condition(data)) {
        data.unlockedBadges.push(badge.id);
        newBadge = badge;
      }
    }
  });

  savePassportData(data);

  return {
    success: true,
    message: "¡Pasaporte sellado con éxito!",
    newBadge
  };
};
