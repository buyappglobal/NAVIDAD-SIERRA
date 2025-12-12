
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { EventCategory } from '../types';
import { TOWNS } from '../constants';

// Definición de tipos para la respuesta de la IA
export interface SearchIntent {
  townIds: string[];
  categories: EventCategory[];
  startDate?: string;
  endDate?: string;
  keywords: string[];
}

// Mapa de normalización de pueblos para ayudar a la IA (enviamos nombres normalizados)
const townNames = TOWNS.map(t => t.name);

export const analyzeSearchIntent = async (query: string, apiKey: string): Promise<SearchIntent | null> => {
  if (!apiKey || !query.trim()) return null;

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `
    Eres un motor de búsqueda inteligente para una agenda cultural en la provincia de Huelva (España). Año de referencia: 2025.
    Tu trabajo es interpretar la búsqueda del usuario, corregir errores ortográficos severos y devolver un filtro estructurado JSON.
    
    Tus herramientas y datos de referencia:
    1. Lista de pueblos disponibles: ${townNames.join(", ")}.
    2. Categorías disponibles: ${Object.values(EventCategory).join(", ")}.
    
    Reglas de interpretación:
    - CAMPAÑA ESPECIAL: Si el usuario busca "Tierra de Cultura", "Diputación", "cultura en la provincia", "Villablanca", "Aljaraque" o pueblos fuera de la Sierra, asígnalo a la categoría '${EventCategory.TIERRA_DE_CULTURA}' y añade el pueblo a 'townIds' si corresponde.
    - PUEBLOS: Si el usuario menciona un pueblo (o parecido), añádelo a 'townIds' usando el nombre exacto de la lista.
    - CATEGORÍAS: Si busca un tipo de evento, asígnalo a la 'categories' más adecuada.
      - "belen", "nacimiento", "portal" -> Belén Viviente.
      - "comer", "tapa", "jamón", "gastronomía" -> Feria Gastronómica.
      - "reyes", "cabalgata", "cartero" -> Cabalgata de Reyes.
      - "música", "concierto", "zambomba" -> Fiesta / Zambomba.
    - FECHAS: Interpreta expresiones temporales para Diciembre 2025 / Enero 2026.
      - "Puente de diciembre", "el puente": Del 2025-12-05 al 2025-12-08.
      - "Este fin de semana": Calcula el próximo fin de semana relativo a la fecha actual (asume hoy es inicio de diciembre 2025).
      - "Navidad": 2025-12-24 a 2025-12-25.
      - "Reyes": 2026-01-05.
    - KEYWORDS (IMPORTANTE): Extrae palabras clave adicionales para filtrar por texto en el título o descripción.
      - CORRIGE la ortografía antes de devolverlas.
      - LIMPIEZA INTELIGENTE: EXCLUYE palabras que ya se hayan usado para determinar el Pueblo, la Categoría o la Fecha.
      - Ejemplo 1: Si busca "belen en aracena" -> Pueblo="Aracena", Categoría="Belén Viviente", Keywords=[].
      - Ejemplo 2: Si busca "tierra de cultura" -> Categoría="Tierra de Cultura", Keywords=[].
  `;

  const prompt = `Analiza esta búsqueda: "${query}"`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            townIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Nombres de los pueblos detectados."
            },
            categories: {
              type: Type.ARRAY,
              items: { type: Type.STRING, enum: Object.values(EventCategory) },
              description: "Categorías detectadas."
            },
            startDate: {
              type: Type.STRING,
              description: "Fecha inicio (YYYY-MM-DD).",
            },
            endDate: {
              type: Type.STRING,
              description: "Fecha fin (YYYY-MM-DD).",
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Palabras clave adicionales limpias y corregidas (sin faltas). Si la palabra definió una categoría, NO la incluyas aquí."
            }
          }
        }
      }
    }) as GenerateContentResponse;

    const jsonString = response.text?.trim();
    if (jsonString) {
      const result = JSON.parse(jsonString);
      
      // Post-procesado para mapear nombres de pueblos a IDs
      const mappedTownIds = (result.townIds || []).map((name: string) => {
        const found = TOWNS.find(t => t.name.toLowerCase() === name.toLowerCase());
        return found ? found.id : null;
      }).filter(Boolean);

      return {
        townIds: mappedTownIds,
        categories: result.categories || [],
        startDate: result.startDate || undefined,
        endDate: result.endDate || undefined,
        keywords: result.keywords || []
      };
    }
    return null;

  } catch (error) {
    console.error("Error en AI Search:", error);
    return null;
  }
};
