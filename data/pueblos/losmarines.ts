import { EventType, EventCategory } from '../../types';

export const INFO_LOS_MARINES = "🏞️ Lugares Emblemáticos que Debes Visitar en Los Marines\nEn el corazón del Parque Natural, Los Marines es famoso por su tradición vinícola y sus espectaculares paisajes de castaños. Es el pueblo de las mil fuentes y el mosto.\n\nIglesia de Nuestra Señora de Gracia: Un templo del siglo XVIII que destaca por su esbelta torre y su retablo mayor, visible desde gran parte de la comarca.\n\nLavaderos Públicos y La Fuente: Un rincón con mucho encanto que evoca la vida tradicional del pueblo, donde el agua es protagonista indiscutible. El agua de Los Marines es famosa por su calidad.\n\nMonumento al Cargador: Homenaje a la figura tradicional de los cargadores que transportaban las castañas, fruto emblemático de la localidad junto con la uva.\n\nEl Apuntador: Un curioso monumento a la entrada del pueblo que recuerda la tradición de 'apuntar' el peso de las cargas.\n\n🥾 Ruta de Senderismo Sugerida: Ruta de los Castaños Monumentales\nUn paseo imprescindible para los amantes de la naturaleza.\n\nRecorrido: Los Marines - Cortelazor (tramo).\n\nDistancia y Dificultad: Baja-Media. El entorno inmediato del pueblo ofrece caminos rodeados de castaños centenarios de gran porte.\n\nAtractivo: Caminar bajo la copa de estos gigantes vegetales, especialmente en otoño e invierno, es una experiencia mágica. El paisaje cultural de la castaña es aquí el protagonista absoluto.\n\n🛣️ Cómo Llegar a Los Marines\n\nDesde Huelva (Capital)\nEn Coche: Toma la N-435 hacia Badajoz. Al llegar al cruce de la N-433, gira hacia Aracena/Sevilla. Los Marines se encuentra a pocos kilómetros de Fuenteheridos (aprox. 1h 20min).\n\nDesde Sevilla\nEn Coche: Toma la A-66 y sal hacia la N-433 (Aracena/Portugal). Sigue la carretera pasando Aracena. Los Marines está justo después, a pie de carretera (aprox. 1h 15min).";

export const LOS_MARINES_EVENTS: EventType[] = [
  {
    "id": "feria-mosto-marines",
    "title": "Feria del Mosto y Productos Artesanales",
    "description": "Los Marines celebra su tradicional Feria del Mosto, donde se puede degustar este delicioso caldo serrano acompañado de productos típicos de la zona. Un ambiente festivo con mercado de artesanía y música.",
    "town": "Los Marines",
    "date": "2025-12-06",
    "endDate": "2025-12-08",
    "category": EventCategory.FERIA_GASTRONOMICA,
    "imageUrl": "https://solonet.es/wp-content/uploads/2025/11/AGENDA-TURISTEANDO-ALAJAR-Rafael-Caballero-Vazquez-3.png", 
    "interestInfo": INFO_LOS_MARINES,
    "itinerary": "**🍇 Mañana (12:00):**\nAcércate al pabellón municipal para la apertura de la feria. Es el mejor momento para comprar productos de la huerta, miel y artesanía antes de que se llene.\n\n**🍷 Mediodía (13:30):**\n¡El momento clave! Degusta el **mosto serrano** de la nueva cosecha en la barra de la hermandad. Acompáñalo de unas migas o tapas de ibérico.\n\n**🌳 Tarde:**\nBaja la comida dando un paseo hasta los **Lavaderos Públicos** y la Fuente. Respira el aire puro rodeado de castaños.\n\n**🎶 Noche:**\nVuelve a la feria para disfrutar del ambiente festivo, la música en directo y quizás probar algún dulce casero."
  }
];