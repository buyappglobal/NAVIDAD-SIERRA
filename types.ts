export enum EventCategory {
  BELEN_VIVIENTE = "Belén Viviente",
  CAMPANILLEROS = "Campanilleros",
  CABALGATA = "Cabalgata de Reyes",
  FIESTA = "Fiesta / Zambombá",
  MERCADO = "Mercado Navideño",
  OTRO = "Otro",
}

export interface EventType {
  id: string;
  title: string;
  description: string;
  town: string;
  date: string; // YYYY-MM-DD
  category: EventCategory;
  imageUrl?: string;
  interestInfo?: string; // Información adicional sobre el pueblo, rutas, etc.
}

// Types for change instructions
export type ChangeAction = 'CREATE' | 'UPDATE' | 'DELETE';

export interface ChangeInstruction {
  action: ChangeAction;
  data: Partial<EventType>;
}