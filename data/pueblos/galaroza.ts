import { EventType, EventCategory } from '../../types';

export const INFO_GALAROZA = "🏞️ Lugares Emblemáticos que Debes Visitar en Galaroza\nConocido como el \"Valle del Agua\" por la Ribera de Múrtiga que lo atraviesa, Galaroza es un pueblo lleno de vida, agua y tradiciones.\n\nIglesia Parroquial de la Purísima Concepción: Un imponente templo del siglo XVII que domina el centro del pueblo, con una torre barroca y un valioso patrimonio artístico en su interior.\n\nErmita de Santa Brígida: Situada en el cerro que acoge el Belén Viviente, esta ermita del siglo XIV es un lugar de gran devoción local y un mirador natural excepcional.\n\nPaseo del Carmen y Fuente de Nuestra Señora del Carmen: El corazón social de Galaroza, un paseo arbolado junto a una fuente-monumento de Aníbal González (arquitecto de la Plaza de España de Sevilla). Un lugar perfecto para relajarse.\n\nArquitectura del Agua: No te pierdas sus numerosas fuentes, pilares y lavaderos que salpican las calles, testimonio de la importancia del agua en la vida del pueblo.\n\n🥾 Ruta de Senderismo Sugerida: Galaroza - Fuenteheridos (Ruta de las Cuestecillas)\nUn sendero que te sumerge en el corazón del Parque Natural.\n\nRecorrido: Galaroza – Fuenteheridos (lineal).\n\nDistancia y Dificultad: Aproximadamente 3 km (solo ida), de dificultad baja. Ideal para un paseo tranquilo.\n\nAtractivo: La ruta discurre entre huertas, castañares y dehesas, siguiendo en parte el curso de la Ribera de Múrtiga. Es un camino lleno de encanto que conecta dos de los pueblos más emblemáticos de la sierra.\n\nConexión: Puedes volver por el mismo camino o continuar hacia otros senderos de la red del parque.\n\n🛣️ Cómo Llegar a Galaroza\n\nDesde Huelva (Capital)\nEn Coche: Toma la N-435 en dirección a Badajoz. Al llegar a la altura de Gibraleón, sigue las indicaciones de la N-435. Pasarás Jabugo antes de llegar a Galaroza (aprox. 1h 25min - 110 km).\n\nEn Autobús: La empresa Damas conecta Huelva con Galaroza, siendo una de las paradas principales de la línea de la sierra.\n\nDesde Sevilla\nEn Coche: Toma la A-66 (Ruta de la Plata) y luego la N-433 (salida 75) dirección Aracena/Portugal. Sigue la N-433 pasando Aracena hasta llegar a Galaroza (aprox. 1h 25min - 115 km).\n\nEn Autobús: Damas ofrece servicios desde Sevilla que pasan por Galaroza.";

export const GALAROZA_EVENTS: EventType[] = [
  {
    "id": "16",
    "title": "Belén Viviente de Galaroza",
    "description": "Galaroza ilumina la Navidad con su Belén Viviente en el Cerro de Santa Brígida. Una representación mágica en un entorno natural único. Días 6, 7, 8, 13, 14, 20, 21, 27 y 28 de diciembre de 18:30 a 20:30 h.",
    "town": "Galaroza",
    "date": "2025-12-06",
    "endDate": "2025-12-28",
    "category": EventCategory.BELEN_VIVIENTE,
    "imageUrl": "https://solonet.es/wp-content/uploads/2025/11/BELEN-GALAROZA.jpg",
    "interestInfo": INFO_GALAROZA
  },
  {
    "id": "navidad-navahermosa",
    "title": "Navidad en Navahermosa",
    "description": "La aldea de Navahermosa (Galaroza) celebra sus fiestas navideñas con convivencias y actividades para todos los vecinos y visitantes.",
    "town": "Galaroza",
    "date": "2025-12-06",
    "category": EventCategory.OTRO,
    "imageUrl": "https://solonet.es/wp-content/uploads/2025/11/AGENDA-TURISTEANDO-ALAJAR-2-Rafael-Caballero-Vazquez-1.png"
  },
  {
    "id": "ruta-amantes-galaroza",
    "title": "Ruta de los Amantes",
    "description": "Descubre el lado más romántico y legendario del Valle del Múrtiga con la 'Ruta de los Amantes'. Este sendero turístico-cultural es una de las joyas de Galaroza, ideal para realizar en pareja o disfrutar de la naturaleza en su estado más poético.\n\nEl recorrido, de dificultad baja-media y aproximadamente 6 kilómetros, parte desde la emblemática Fuente de los Doce Caños. A lo largo del camino, te adentrarás en bosques de castaños y galerías de ribera que parecen sacados de un cuento, escenarios que han inspirado leyendas de amores prohibidos y encuentros furtivos a lo largo de los siglos.\n\nPuntos destacados de la ruta:\n- La Fuente de los Doce Caños: Inicio y fin, el corazón líquido del pueblo.\n- El Cerro de Santa Brígida: Ofrece vistas panorámicas que quitan el aliento.\n- La Era de la Cruz: Un lugar perfecto para el descanso y la contemplación.\n\nEs una oportunidad única para conectar con la naturaleza, respirar aire puro y dejarte envolver por la magia del otoño en la Sierra.",
    "town": "Galaroza",
    "date": "2025-12-07",
    "category": EventCategory.OTRO,
    "imageUrl": "https://solonet.es/wp-content/uploads/2025/11/AGENDA-TURISTEANDO.png",
    "interestInfo": INFO_GALAROZA,
    "itinerary": "**☕ 10:00 - Desayuno Serrano:**\nComienza con fuerza en la Plaza de los Álamos. Pide una tostada de jamón ibérico en el **Casino de la Sociedad** o en los bares cercanos.\n\n**🥾 11:00 - La Ruta:**\nInicia la **Ruta de los Amantes** desde la Fuente de los Doce Caños. Tómalo con calma, haz fotos de los castaños y disfruta del sonido del agua.\n\n**🍽️ 14:30 - Almuerzo:**\nAl volver, recupera energías en el **Restaurante Toribio** o **San Mamés**, degustando setas de temporada o carnes a la brasa.\n\n**📸 17:00 - Paseo Cultural:**\nVisita la **Iglesia de la Purísima Concepción** y la **Ermita del Carmen**. Compra algún dulce artesano antes de irte."
  }
];