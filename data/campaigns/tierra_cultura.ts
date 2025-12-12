
import { EventType, EventCategory } from '../../types';

// Placeholder específico para Tierra de Cultura
const TIERRA_CULTURA_PLACEHOLDER = "https://solonet.es/wp-content/uploads/2025/12/Gemini_Generated_Image_5g5zwr5g5zwr5g5z-scaled.png";

// Descripción genérica para la campaña
const CAMPAIGN_DESC = "La Diputación de Huelva presenta 'Tierra de Cultura', una programación especial que lleva las mejores artes escénicas y musicales a los rincones de nuestra provincia. Disfruta de una Navidad llena de cultura.";

export const TIERRA_CULTURA_EVENTS: EventType[] = [
    // --- EVENTO PADRE (PORTADA) ---
    {
        id: "campaign-tierra-cultura",
        title: "Huelva: Tierra de Cultura",
        description: "Descubre la programación cultural especial de la Diputación de Huelva para esta Navidad. Música, teatro y espectáculos de primer nivel recorren nuestros pueblos. Pulsa para ver la agenda completa.",
        town: "Provincia de Huelva",
        date: "2025-12-01",
        endDate: "2026-01-06",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        sponsored: true,
        interestInfo: "Esta es una campaña oficial de la Diputación de Huelva para fomentar la cultura en la provincia durante las fiestas navideñas, llevando espectáculos de calidad a municipios de todas las comarcas: Sierra, Andévalo, Condado y Costa.",
        itinerary: "**🎭 Plan Cultural:**\nSelecciona el evento que más te guste de la lista.\n**🚗 Viaje:**\nAprovecha para conocer un pueblo nuevo de nuestra provincia.\n**🍷 Gastronomía:**\nConsume en los bares y restaurantes locales para apoyar la economía de nuestros pueblos."
    },
    // --- EVENTOS ORIGINALES ---
    {
        id: "tc-macarena-torre",
        title: "Concierto: Macarena de la Torre",
        description: `Espectáculo 'Andalucía canta a la Navidad'. La artista onubense Macarena de la Torre nos trae un repertorio lleno de sentimiento, fusionando el flamenco con los villancicos tradicionales.\n\n${CAMPAIGN_DESC}`,
        town: "Aljaraque",
        date: "2025-12-12",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🏞️ **Aljaraque y Corrales**\nUn entorno único rodeado de marismas y pinares. Destaca el núcleo de Corrales con su pasado minero inglés.\n\n* **Muelle de Tharsis:** Un antiguo cargadero de mineral sobre el río Odiel, perfecto para pasear al atardecer.\n* **Teatro Cinema Corrales:** Un edificio histórico rehabilitado que es el corazón cultural de la zona.\n* **Paraje Natural Marismas del Odiel:** A un paso, ideal para la observación de aves como flamencos y espátulas.",
        itinerary: "**☕ Tarde (16:00):** Paseo por el Muelle de Tharsis y las marismas en Corrales.\n**🎭 17:00 - Teatro:** Disfruta del espectáculo en el Teatro Cinema Corrales.\n**🍻 Noche:** Tapeo en el Casino Minero de Corrales o en la plaza del pueblo."
    },
    {
        id: "tc-argentina-navidad",
        title: "Argentina: Idilio de Navidad",
        description: `Una de las voces más potentes del flamenco actual, Argentina, llega a la Sierra con su espectáculo navideño. Un recorrido por los cantes de la tierra adaptados a estas fechas tan señaladas.\n\n${CAMPAIGN_DESC}`,
        town: "Aracena",
        date: "2025-12-19",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🏰 **Aracena: Capital de la Sierra**\nEl corazón turístico de la comarca, famosa por su Gruta y su castillo templario.\n\n* **Gruta de las Maravillas:** Imprescindible reservar. Un viaje al interior de la tierra.\n* **Museo del Jamón:** Descubre el secreto del ibérico.\n* **Confitería Rufino:** Parada obligatoria para los amantes del dulce.",
        itinerary: "**🏰 Mañana:** Visita al Castillo y la Iglesia Prioral.\n**🍽️ Mediodía:** Almuerzo en los restaurantes de la Plaza Marqués de Aracena.\n**🎶 Tarde/Noche:** Concierto de Argentina. ¡Llega con tiempo para aparcar!"
    },
    {
        id: "tc-teatro-fundicion",
        title: "Teatro: Cuento de Navidad",
        description: `La compañía La Fundición presenta una adaptación clásica del 'Cuento de Navidad' de Dickens. Una obra perfecta para disfrutar en familia y redescubrir los valores de estas fiestas.\n\n${CAMPAIGN_DESC}`,
        town: "Cortegana",
        date: "2025-12-20",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "⚔️ **Cortegana Medieval**\nBajo la atenta mirada de su castillo, Cortegana es historia viva.\n\n* **Castillo de Cortegana:** Una de las fortalezas mejor conservadas, sede de las Jornadas Medievales.\n* **Nacimiento del Río Chanza:** Un entorno natural precioso para pasear.\n* **Iglesia del Divino Salvador:** Joya gótico-mudéjar.",
        itinerary: "**🏰 Mañana:** Visita guiada al Castillo de Cortegana.\n**🍽️ Mediodía:** Prueba el guiso de revuelto de setas de temporada.\n**🎭 Tarde:** 'Cuento de Navidad' en el teatro. Ideal para ir con niños."
    },
    {
        id: "tc-zambomba-jerez",
        title: "Zambomba: Aires de Jerez",
        description: `El auténtico compás de Jerez llega a Huelva. Un grupo de artistas jerezanos trae la esencia de las zambombas tradicionales, invitando al público a participar en una fiesta de palmas y villancicos.\n\n${CAMPAIGN_DESC}`,
        town: "Galaroza",
        date: "2025-12-13",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "💧 **Galaroza: El Valle del Agua**\nEn el corazón del parque natural, famoso por sus fuentes y la artesanía en madera.\n\n* **Fuente de los Doce Caños:** El símbolo del pueblo.\n* **Cerro de Santa Brígida:** Vistas panorámicas increíbles.\n* **Artesanía:** Visita las tiendas de sillas de anea y madera.",
        itinerary: "**🥾 Mañana:** Ruta senderista Ribera del Jabugo.\n**🍽️ Mediodía:** Migas serranas en la plaza.\n**💃 Tarde:** ¡Zambomba! Prepárate para dar palmas y cantar villancicos."
    },
    {
        id: "tc-coro-gospel",
        title: "Concierto: Coro Gospel de Huelva",
        description: `Energía, voces potentes y espiritualidad. El Coro Gospel de Huelva ofrece un concierto vibrante con los clásicos del género y temas navideños internacionales.\n\n${CAMPAIGN_DESC}`,
        town: "Zufre",
        date: "2025-12-21",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🔭 **Zufre: El Balcón de la Sierra**\nUn pueblo colgado sobre la sierra con una arquitectura impresionante.\n\n* **Plaza de la Iglesia:** El mirador natural ofrece vistas al embalse.\n* **Ayuntamiento:** Un edificio histórico precioso.\n* **Calles empedradas:** Piérdete por su casco antiguo, declarado BIC.",
        itinerary: "**📸 Mañana:** Fotos panorámicas desde el Paseo de los Alcaldes.\n**🍽️ Mediodía:** Almuerzo con vistas en los restaurantes locales.\n**🎶 Tarde:** Concierto Gospel para llenar de energía la Navidad."
    },
    {
        id: "tc-magia-familiar",
        title: "Gala de Magia Familiar",
        description: `Un espectáculo de ilusionismo y humor para todas las edades. Magos de la provincia se unen para llenar de asombro las caras de los más pequeños.\n\n${CAMPAIGN_DESC}`,
        town: "Cala",
        date: "2025-12-26",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🏰 **Cala: Frontera y Mina**\nEn el límite con Extremadura, tierra de historia y naturaleza.\n\n* **Castillo de Cala:** Fortaleza medieval en lo alto del cerro.\n* **Ruta de los Molinos:** A lo largo de la rivera de Cala.\n* **Gastronomía:** Platos de caza y setas.",
        itinerary: "**🏰 Mañana:** Subida al Castillo de Cala.\n**🍽️ Mediodía:** Carne a la brasa para reponer fuerzas.\n**🎩 Tarde:** Espectáculo de magia, perfecto para la tarde del día después de Navidad."
    },

    // --- NUEVOS EVENTOS ---
    {
        id: "tc-villablanca-macarena",
        title: "Andalucía en Navidad: Macarena de la Torre",
        description: `Villablanca recibe a Macarena de la Torre en la Plaza de la Constitución a las 20:30h.\n\n${CAMPAIGN_DESC}`,
        town: "Villablanca",
        date: "2025-12-05",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "💃 **Villablanca: Tierra de Danza**\nConocida internacionalmente por su festival de danzas, es un pueblo blanco del Andévalo cerca de la costa.\n\n* **Plaza de la Constitución:** Centro neurálgico con la Iglesia de San Sebastián.\n* **Ermita de la Virgen de la Blanca:** Un lugar de devoción y romería.\n* **Molinos de Viento:** Testigos de la historia agrícola.",
        itinerary: "**🚶 Tarde (19:00):** Paseo por el centro y visita a la Iglesia de San Sebastián.\n**🎶 20:30:** Concierto de Macarena de la Torre en la Plaza.\n**🍽️ Noche:** Cena tapeando en los bares alrededor de la plaza."
    },
    {
        id: "tc-linares-regina",
        title: "De Andalucía a Belén: Regina",
        description: `Linares de la Sierra acoge el espectáculo de Regina a las 12:00h en la Plaza de Toros.\n\n${CAMPAIGN_DESC}`,
        town: "Linares de la Sierra",
        date: "2025-12-06",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🌺 **Linares: El Valle Escondido**\nUn pueblo de cuento con calles empedradas artísticas (llanos).\n\n* **Plaza de Toros:** Integrada en el pueblo, escenario único.\n* **Lavaderos:** De los más bonitos de la Sierra.\n* **Senderos:** Rutas preciosas hacia Alájar o Aracena.",
        itinerary: "**☕ Mañana (10:30):** Desayuno serrano y paseo por los 'llanos'.\n**💃 12:00 - Concierto:** Regina en la Plaza de Toros. Ambiente único.\n**🍽️ Mediodía:** Almuerzo en 'Arrieros' (reservar) o bares locales."
    },
    {
        id: "tc-villalba-macarena",
        title: "Andalucía en Navidad: Macarena de la Torre",
        description: `Villalba del Alcor disfruta del arte de Macarena de la Torre a las 19:00h en la Plaza de la Constitución.\n\n${CAMPAIGN_DESC}`,
        town: "Villalba del Alcor",
        date: "2025-12-07",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🏰 **Villalba del Alcor: Historia y Vino**\nEn el Condado de Huelva, destaca por su patrimonio monumental.\n\n* **Iglesia de San Bartolomé:** Una iglesia-fortaleza impresionante.\n* **Convento de San Juan Bautista:** De clausura, famoso por su repostería.\n* **Bodegas:** Tierra de buenos vinos.",
        itinerary: "**🏰 Tarde (17:30):** Visita exterior a la Iglesia-Fortaleza.\n**🎶 19:00:** Disfruta del concierto en la Plaza.\n**🍷 Noche:** Prueba el vino del condado en las tabernas locales."
    },
    {
        id: "tc-aljaraque-naife",
        title: "La Receta de Navidad (Teatro)",
        description: `Naife presenta 'La receta de Navidad (Merienda de Navidad)' a las 17:00h en el Teatro Cinema Corrales.\n\n${CAMPAIGN_DESC}`,
        town: "Aljaraque",
        date: "2025-12-12",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🚂 **Corrales (Aljaraque): Legado Inglés**\nUn barrio con una arquitectura minera británica única junto al río Odiel.\n\n* **Muelle de Tharsis:** Icono industrial sobre la ría.\n* **Barrio Obrero:** Casas coloniales inglesas restauradas.\n* **Teatro Cinema:** Edificio histórico cultural.",
        itinerary: "**☕ 16:00:** Merienda en el Casino Minero de Corrales.\n**🎭 17:00:** Teatro familiar en el Cinema Corrales.\n**🌅 18:30:** Paseo al atardecer por el Muelle de Tharsis."
    },
    {
        id: "tc-redondela-zambomba",
        title: "Zambomba: Un Canto a la Navidad",
        description: `La Redondela celebra la Navidad a las 19:00h en la Plaza del Concejo.\n\n${CAMPAIGN_DESC}`,
        town: "La Redondela",
        date: "2025-12-12",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🌲 **La Redondela: Pinar y Mar**\nCerca de Isla Cristina, destaca por su entorno natural y su huerta.\n\n* **Sala Mudéjar:** Edificio del siglo XV, actual ayuntamiento.\n* **Pinares:** Un bosque litoral precioso para pasear.\n* **Playa:** A pocos kilómetros, ideal incluso en invierno.",
        itinerary: "**🌲 Tarde:** Paseo por los pinares o la Vía Verde.\n**🔥 19:00:** Zambomba en la Plaza del Concejo.\n**🍽️ Noche:** Cena en Isla Cristina con pescado fresco."
    },
    {
        id: "tc-zarza-duo",
        title: "Solo de Dos: Duo x Caso",
        description: `La Zarza-Perrunal disfruta del espectáculo a las 12:00h en el Paseo del Minero.\n\n${CAMPAIGN_DESC}`,
        town: "La Zarza-Perrunal",
        date: "2025-12-13",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "⛏️ **La Zarza-Perrunal: Corazón Minero**\nHistoria minera a cielo abierto en el Andévalo.\n\n* **Corta de los Silos:** Un paisaje minero impresionante.\n* **Arquitectura Minera:** Casas de estilo francés e inglés.\n* **Paseo del Minero:** Centro de la vida social.",
        itinerary: "**⛏️ Mañana (10:30):** Visita al mirador de la Corta.\n**🎶 12:00:** Espectáculo en el Paseo del Minero.\n**🍻 Mediodía:** Aperitivo minero en los bares del pueblo."
    },
    {
        id: "tc-cumbres-regina",
        title: "De Andalucía a Belén: Regina",
        description: `Cumbres de San Bartolomé recibe a Regina a las 13:00h en la Plaza de España.\n\n${CAMPAIGN_DESC}`,
        town: "Cumbres de San Bartolomé",
        date: "2025-12-13",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🏰 **Cumbres de San Bartolomé: La Frontera**\nPequeño pueblo serrano con una gran fortaleza.\n\n* **Castillo de Torres:** Fortaleza medieval defensiva.\n* **Dehesas:** Entorno ideal para ver cerdo ibérico en libertad.\n* **Tranquilidad:** Un lugar para desconectar del mundo.",
        itinerary: "**🏰 Mañana:** Subida al Castillo para ver las vistas.\n**💃 13:00:** Concierto de Regina en la Plaza.\n**🍽️ Mediodía:** Almuerzo tradicional serrano."
    },
    {
        id: "tc-granado-duo",
        title: "Solo de Dos: Duo x Caso",
        description: `El Granado acoge este espectáculo a las 18:00h en el Salón Cultural.\n\n${CAMPAIGN_DESC}`,
        town: "El Granado",
        date: "2025-12-13",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🌬️ **El Granado: Mirando al Guadiana**\nEn el límite con Portugal, tierra de molinos.\n\n* **Molino de Viento:** Restaurado y visitable.\n* **Puerto de la Laja:** Antiguo puerto mineral en el Guadiana.\n* **Vía Verde:** Ideal para bicicletas junto al río.",
        itinerary: "**🚲 Tarde:** Paseo hasta el Puerto de la Laja.\n**🎭 18:00:** Espectáculo cultural en el Salón.\n**🌙 Noche:** Contempla las estrellas, cielo muy limpio."
    },
    {
        id: "tc-granada-rio-tinto",
        title: "Concierto: Hogueras y Candiles",
        description: `La Granada de Río Tinto celebra su Concierto de Navidad 2025 a las 18:30h en la Iglesia Ntra Sra de la Granada.\n\n${CAMPAIGN_DESC}`,
        town: "La Granada de Río Tinto",
        date: "2025-12-13",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "⛰️ **La Granada de Río Tinto**\nPequeña localidad en la Cuenca Minera, puerta a la sierra.\n\n* **Lavaderos:** Fuente y lavaderos tradicionales.\n* **Iglesia:** Templo mudéjar con encanto.\n* **Paisaje:** Transición entre mina y sierra.",
        itinerary: "**🚶 Tarde:** Paseo tranquilo por el pueblo.\n**🎼 18:30:** Concierto de Navidad en la Iglesia.\n**🔥 Noche:** Cena junto a la chimenea en algún bar local."
    },
    {
        id: "tc-campofrio-zambomba",
        title: "Zambomba de Pata Negra",
        description: `Campofrío se llena de compás a las 17:00h en la Plaza de España.\n\n${CAMPAIGN_DESC}`,
        town: "Campofrío",
        date: "2025-12-14",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🐂 **Campofrío: Toros y Dehesa**\nFamoso por tener la plaza de toros más antigua de España.\n\n* **Plaza de Toros:** Construida en 1716, imprescindible.\n* **Paseo de los Leones:** Parque agradable.\n* **Puente Romano:** Sobre el río Odiel.",
        itinerary: "**🐂 Mediodía:** Visita a la Plaza de Toros histórica.\n**🍽️ Almuerzo:** Carnes a la brasa en ventas cercanas.\n**💃 17:00:** Zambomba flamenca en la Plaza de España."
    },
    {
        id: "tc-paymogo-aires",
        title: "Aires de Huelva en Navidad",
        description: `Alejandra Almendro y Jeromo Segura actúan en Paymogo a las 19:00h en la Plaza San Mateo.\n\n${CAMPAIGN_DESC}`,
        town: "Paymogo",
        date: "2025-12-19",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🍄 **Paymogo: País del Mago**\nEn el Andévalo, famoso por el gurumelo y su cercanía a Portugal.\n\n* **Iglesia Santa María Magdalena:** Con aspecto de fortaleza.\n* **Castillo:** Restos de la fortificación fronteriza.\n* **Entorno:** Dehesas infinitas.",
        itinerary: "**🏰 Tarde:** Visita al Castillo y la Iglesia.\n**🎶 19:00:** Espectáculo flamenco navideño en Plaza San Mateo.\n**🍷 Noche:** Prueba la gastronomía de frontera."
    },
    {
        id: "tc-cabezas-baton",
        title: "Concierto: The Baton",
        description: `Cabezas Rubias disfruta de 'The Baton en concierto' a las 19:00h en la Parroquia Ntra. Sra. De la Consolación.\n\n${CAMPAIGN_DESC}`,
        town: "Cabezas Rubias",
        date: "2025-12-19",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "💨 **Cabezas Rubias: Molinos y Vistas**\nEn el corazón del Andévalo, destaca por su altura y vientos.\n\n* **Molino de la Divisa:** Vistas panorámicas del Andévalo.\n* **Ermita de San Sebastián:** En un paraje natural precioso.\n* **Calzada Romana:** Restos de antiguas vías.",
        itinerary: "**📸 Tarde:** Sube al Molino de la Divisa para ver el atardecer.\n**🎼 19:00:** Concierto en la Parroquia.\n**🍻 Noche:** Convivencia en la plaza del pueblo."
    },
    {
        id: "tc-hinojales-ilusion",
        title: "La Ilusión: Bella de Sousa",
        description: `Hinojales recibe el espectáculo 'La Ilusión' a las 19:30h en la Plaza de Huelva.\n\n${CAMPAIGN_DESC}`,
        town: "Hinojales",
        date: "2025-12-20",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🖼️ **Hinojales: Arte y Naturaleza**\nPueblo blanco serrano con tesoros escondidos.\n\n* **Iglesia Ntra. Sra. de la Consolación:** Famosa por sus frescos góticos.\n* **Senderismo:** Ruta del Camino de la Víbora.\n* **Tranquilidad:** Uno de los pueblos más auténticos.",
        itinerary: "**⛪ Tarde (18:00):** Visita la Iglesia y sus pinturas murales.\n**🎶 19:30:** Espectáculo de Bella de Sousa en la plaza.\n**🍲 Noche:** Cena tradicional serrana."
    },
    {
        id: "tc-berrocal-zambomba",
        title: "Zambomba de Pata Negra",
        description: `Berrocal celebra la Navidad con zambomba a las 13:00h en la Plaza de Andalucía.\n\n${CAMPAIGN_DESC}`,
        town: "Berrocal",
        date: "2025-12-21",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🌳 **Berrocal: Corcho y Río Tinto**\nSituado entre la sierra y la mina, famoso por su industria del corcho.\n\n* **Río Tinto:** Pasa por su término, paisajes rojos.\n* **Alcornocales:** Grandes bosques para senderismo.\n* **Iglesia San Juan Bautista:** En lo alto del pueblo.",
        itinerary: "**🔴 Mañana:** Ruta por el Río Tinto y el Puente de las Brujas.\n**💃 13:00:** Zambomba en la plaza. ¡Aperitivo flamenco!\n**🍽️ Mediodía:** Caldereta de venado local."
    },
    {
        id: "tc-canaveral-ilusion",
        title: "La Ilusión: Bella de Sousa",
        description: `Cañaveral de León acoge a Bella de Sousa a las 13:00h en el Teatro Municipal.\n\n${CAMPAIGN_DESC}`,
        town: "Cañaveral de León",
        date: "2025-12-21",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "💧 **Cañaveral de León: La Laguna**\nFamoso por su piscina natural en el centro del pueblo.\n\n* **La Laguna:** Bien de Interés Cultural, un oasis.\n* **Calles blancas:** Arquitectura típica serrana.\n* **Miradores:** Vistas a las dehesas extremeñas.",
        itinerary: "**📸 Mañana:** Visita y fotos en La Laguna (aunque sea invierno es preciosa).\n**🎶 13:00:** Espectáculo en el Teatro Municipal.\n**🍽️ Mediodía:** Almuerzo en los bares de la plaza."
    },
    {
        id: "tc-alosno-rocio",
        title: "Navidad 2025: Rocío Medina",
        description: `Alosno celebra con Rocío Medina a las 19:00h en el Salón Sociocultural.\n\n${CAMPAIGN_DESC}`,
        town: "Alosno",
        date: "2025-12-21",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🎸 **Alosno: Cuna del Fandango**\nEl pueblo más flamenco de Huelva, tierra de chacina y pan.\n\n* **Monumento al Fandango:** Homenaje a su cante.\n* **Convento:** Historia religiosa del Andévalo.\n* **Gastronomía:** Jamón y sus famosos 'cascos' de calabaza.",
        itinerary: "**🎸 Tarde:** Paseo por el pueblo, visita monumentos al fandango.\n**🎶 19:00:** Concierto de Rocío Medina.\n**🥪 Noche:** Prueba el pan de pueblo y la chacina local."
    },
    {
        id: "tc-castillejos-baton",
        title: "Concierto: The Baton",
        description: `Villanueva de los Castillejos recibe a 'The Baton' a las 19:00h en la Iglesia Purísima Concepción.\n\n${CAMPAIGN_DESC}`,
        town: "Villanueva de los Castillejos",
        date: "2025-12-21",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🍊 **Villanueva de los Castillejos: Andévalo Puro**\nRodeado de dehesas y cultivos de cítricos.\n\n* **Iglesia Purísima Concepción:** Templo emblemático.\n* **Paseo por la Dehesa:** Rutas llanas y agradables.\n* **Fábricas de Harina:** Patrimonio industrial.",
        itinerary: "**🚶 Tarde:** Paseo por el entorno rural.\n**🎼 19:00:** Concierto en la Iglesia.\n**🍻 Noche:** Tapeo en el centro del pueblo."
    },
    {
        id: "tc-palma-orquesta",
        title: "Orquesta Clásica de Huelva",
        description: `La Palma del Condado disfruta de la música clásica a las 20:00h en el Teatro España.\n\n${CAMPAIGN_DESC}`,
        town: "La Palma del Condado",
        date: "2025-12-22",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🍷 **La Palma del Condado: Ciudad del Vino**\nConjunto Histórico-Artístico señorial en el Condado.\n\n* **Bodegas:** Visita obligada a bodegas históricas.\n* **Iglesia de San Juan Bautista:** Torre barroca espectacular.\n* **Estación de Tren:** Arquitectura neomudéjar.",
        itinerary: "**🍷 Tarde (18:00):** Visita a una bodega o paseo por el casco histórico.\n**🎻 20:00:** Concierto de música clásica en el Teatro España.\n**🍽️ Noche:** Cena maridada con vinos del Condado."
    },
    {
        id: "tc-galaroza-mellis",
        title: "Huelva en Navidad: Los Mellis",
        description: `Galaroza se llena de arte con Los Mellis a las 18:00h en el Paseo del Carmen.\n\n${CAMPAIGN_DESC}`,
        town: "Galaroza",
        date: "2025-12-23",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🌰 **Galaroza: Agua y Castaños**\nUno de los pueblos más bonitos, famoso por el agua.\n\n* **Fuente de los Doce Caños:** Lugar de reunión.\n* **Iglesia de la Purísima:** En lo alto del pueblo.\n* **Senderos:** Caminos de agua y bosque.",
        itinerary: "**💧 Tarde:** Merienda junto a la Fuente de los Doce Caños.\n**🎶 18:00:** Concierto de 'Los Mellis' en el Paseo.\n**🌃 Noche:** Paseo nocturno por el pueblo iluminado."
    },
    {
        id: "tc-chucena-navidad",
        title: "Navidad de Luz",
        description: `Chucena celebra 'Navidad de Luz' a las 20:00h en la Plaza del Ayuntamiento.\n\n${CAMPAIGN_DESC}`,
        town: "Chucena",
        date: "2025-12-23",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🍇 **Chucena: Vino y Devoción**\nFamosa por su vino y su Virgen de la Estrella.\n\n* **Iglesia de la Estrella:** Templo barroco.\n* **Cooperativa Vitivinícola:** El motor del pueblo.\n* **Entorno:** Viñedos infinitos.",
        itinerary: "**⛪ Tarde:** Visita a la Iglesia de la Estrella.\n**💡 20:00:** Espectáculo 'Navidad de Luz' en la plaza.\n**🍷 Noche:** Brinda con vino de Chucena por la Navidad."
    },
    {
        id: "tc-encinasola-zambomba",
        title: "Zambomba: Un Canto a la Navidad",
        description: `Encinasola canta a la Navidad a las 19:00h en la Plaza Mayor.\n\n${CAMPAIGN_DESC}`,
        town: "Encinasola",
        date: "2025-12-26",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🏰 **Encinasola: El Baluarte**\nFrontera con Portugal y Extremadura, historia defensiva.\n\n* **Castillo:** Restos de la fortaleza.\n* **Fuertes de San Felipe y San Juan:** Arquitectura militar.\n* **Naturaleza:** Paraje de la Contienda.",
        itinerary: "**🏰 Tarde:** Ruta de los fuertes defensivos.\n**🔥 19:00:** Zambomba en la Plaza Mayor.\n**🍲 Noche:** Gastronomía de frontera (migas, setas)."
    },
    {
        id: "tc-santaana-zambomba",
        title: "Zambomba Flamenca",
        description: `Santa Ana la Real disfruta de Furruco, Azalea y amigos a las 19:00h en la Plaza de España.\n\n${CAMPAIGN_DESC}`,
        town: "Santa Ana la Real",
        date: "2025-12-26",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🌳 **Santa Ana la Real: Bosque de las Letras**\nInnovación turística en plena naturaleza.\n\n* **Bosque de las Letras:** Sendero literario único.\n* **Chorrera de Joyarancón:** Cascada espectacular en época de lluvias.\n* **Hornos de Cal:** Patrimonio etnográfico.",
        itinerary: "**📖 Tarde:** Recorrido corto por el Bosque de las Letras.\n**💃 19:00:** Zambomba flamenca en la plaza.\n**🍻 Noche:** Ambiente festivo en el centro."
    },
    {
        id: "tc-lucena-baton",
        title: "Concierto: The Baton",
        description: `Lucena del Puerto recibe a 'The Baton' a las 20:00h en la Iglesia San Vicente Mártir.\n\n${CAMPAIGN_DESC}`,
        town: "Lucena del Puerto",
        date: "2025-12-26",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🍓 **Lucena del Puerto: Luz y Frutos Rojos**\nEntre viñedos y pinares, cerca de Doñana.\n\n* **Monasterio de la Luz:** Joya gótica-mudéjar.\n* **Iglesia San Vicente:** Con vistas a la ría.\n* **Entorno:** Cultivos y naturaleza.",
        itinerary: "**⛪ Tarde (18:00):** Visita exterior al Monasterio de la Luz.\n**🎼 20:00:** Concierto en la Iglesia San Vicente.\n**🍽️ Noche:** Cena en el pueblo."
    },
    {
        id: "tc-villanueva-alolo",
        title: "Aloló: Cirko Psikario",
        description: `Villanueva de las Cruces disfruta del circo a las 12:30h en la Calle Juan Ramón Jiménez (Paseo).\n\n${CAMPAIGN_DESC}`,
        town: "Villanueva de las Cruces",
        date: "2025-12-27",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🛤️ **Villanueva de las Cruces: Naturaleza y Tren**\nPueblo tranquilo del Andévalo.\n\n* **Puente del Ferrocarril:** Antigua línea minera.\n* **Charco del Toro:** Paraje natural en el río.\n* **Gastronomía:** Dulces caseros.",
        itinerary: "**🚂 Mañana:** Paseo hasta el puente del ferrocarril.\n**🤹 12:30:** Espectáculo de circo en el Paseo.\n**🍽️ Mediodía:** Almuerzo de convivencia en los bares locales."
    },
    {
        id: "tc-beas-aires",
        title: "Aires de Huelva en Navidad",
        description: `Alejandra Almendro y Jeromo Segura actúan en el Recinto Navideño del Belén Viviente de Beas a las 18:30h.\n\n${CAMPAIGN_DESC}`,
        town: "Beas",
        date: "2025-12-27",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🌟 **Beas: Capital de la Navidad**\nFamosa por su Belén Viviente, el más antiguo de Andalucía.\n\n* **Belén Viviente:** Visita obligada (reserva entrada).\n* **Ruta del Aceite:** Tierra de olivares y almazaras.\n* **Iglesia de San Bartolomé:** Torre barroca.",
        itinerary: "**🌟 Tarde (16:30):** Visita al Belén Viviente de Beas.\n**🎶 18:30:** Concierto flamenco en el recinto navideño.\n**🍩 Noche:** Chocolate con dulces tradicionales."
    },
    {
        id: "tc-trigueros-navidad",
        title: "Navidad de Luz",
        description: `Trigueros acoge 'Navidad de Luz' a las 20:00h en el Convento de Santa Catalina.\n\n${CAMPAIGN_DESC}`,
        town: "Trigueros",
        date: "2025-12-27",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🗿 **Trigueros: Historia Milenaria**\nCuna del Dolmen de Soto y San Antonio Abad.\n\n* **Dolmen de Soto:** La catedral del neolítico (reservar).\n* **Convento del Carmen:** Centro cultural impresionante.\n* **Iglesia de San Antonio:** Devoción popular.",
        itinerary: "**🗿 Tarde (17:00):** Visita guiada al Dolmen de Soto.\n**💡 20:00:** Espectáculo de luz en el Convento.\n**🍽️ Noche:** Cena en la Plaza de la Constitución."
    },
    {
        id: "tc-puerto-alolo",
        title: "Aloló: Cirko Psikario",
        description: `Puerto Moral disfruta del espectáculo circense a las 12:00h en la Plaza de la Iglesia.\n\n${CAMPAIGN_DESC}`,
        town: "Puerto Moral",
        date: "2025-12-28",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🌸 **Puerto Moral: Jardín Serrano**\nPequeño pueblo con encanto junto al embalse.\n\n* **Jardín Botánico:** Colección de flora autóctona.\n* **Embalse de Aracena:** Vistas y paseos.\n* **Iglesia:** Pequeña joya rural.",
        itinerary: "**🌸 Mañana:** Visita al Jardín Botánico Los Nogales.\n**🤹 12:00:** Circo en la Plaza de la Iglesia.\n**🍽️ Mediodía:** Almuerzo en el bar del pueblo con vistas."
    },
    {
        id: "tc-cala-rocio",
        title: "Navidad 2025: Rocío Medina",
        description: `Cala celebra con Rocío Medina a las 18:00h en el Salón cultural Emilia Barragán.\n\n${CAMPAIGN_DESC}`,
        town: "Cala",
        date: "2025-12-28",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🏰 **Cala: Historia en la Raya**\nCastillo y naturaleza en la frontera.\n\n* **Castillo de Cala:** Restaurado y visitable.\n* **Rivera de Cala:** Entorno natural.\n* **Iglesia:** Gótico-mudéjar.",
        itinerary: "**🏰 Tarde:** Subida al castillo para ver las vistas.\n**🎶 18:00:** Concierto de Rocío Medina.\n**🍻 Noche:** Tapeo en la plaza."
    },
    {
        id: "tc-gibraleon-baton",
        title: "Concierto: The Baton",
        description: `Gibraleón recibe a 'The Baton' a las 18:00h en el Centro cultural Orillas del Odiel.\n\n${CAMPAIGN_DESC}`,
        town: "Gibraleón",
        date: "2025-12-28",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🏰 **Gibraleón: Tierra de Olivos**\nCerca de Huelva capital, con mucha historia.\n\n* **Alcázar:** Restos del castillo y murallas.\n* **Convento del Vado:** Arquitectura religiosa.\n* **Aceite:** Famoso por su oro líquido.",
        itinerary: "**🏰 Tarde:** Paseo por el Alcázar y el río Odiel.\n**🎼 18:00:** Concierto en el Centro Cultural.\n**🍽️ Noche:** Cena en los bares de tapas del pueblo."
    },
    {
        id: "tc-rociana-orquesta",
        title: "Orquesta Clásica de Huelva",
        description: `Rociana del Condado disfruta de la Orquesta Clásica a las 19:30h en la Parroquia San Bartolomé Apóstol.\n\n${CAMPAIGN_DESC}`,
        town: "Rociana del Condado",
        date: "2025-12-29",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🍇 **Rociana del Condado: Patrimonio Vitivinícola**\nCasco histórico declarado BIC.\n\n* **Sociedad Cultural Casino:** Edificio singular.\n* **Iglesia San Bartolomé:** Templo mudéjar.\n* **Bodegas:** Tradición vinícola.",
        itinerary: "**🏛️ Tarde:** Visita al Casino y paseo por el centro histórico.\n**🎻 19:30:** Concierto clásico en la Parroquia.\n**🍷 Noche:** Copa de vino local para celebrar el año nuevo."
    },
    {
        id: "tc-santaolalla-mellis",
        title: "Huelva en Navidad: Los Mellis",
        description: `Santa Olalla del Cala despide el año con Los Mellis a las 19:00h en la Plaza de la Constitución.\n\n${CAMPAIGN_DESC}`,
        town: "Santa Olalla del Cala",
        date: "2025-12-30",
        category: EventCategory.TIERRA_DE_CULTURA,
        imageUrl: TIERRA_CULTURA_PLACEHOLDER,
        interestInfo: "🏰 **Santa Olalla: Centinela de la Ruta**\nEn plena Vía de la Plata.\n\n* **Castillo:** Impresionante fortaleza medieval.\n* **Sinagoga:** Restos judíos en la iglesia.\n* **Dehesa:** Paisaje de encinas y cerdos.",
        itinerary: "**🏰 Tarde:** Visita al Castillo al atardecer.\n**🎶 19:00:** Concierto flamenco de despedida de año.\n**🥂 Noche:** Brindis pre-uvas en la plaza."
    }
];
