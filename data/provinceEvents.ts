
export interface ProvinceEvent {
    id: string;
    imageUrl: string;
    title?: string;
    location?: string;
    description?: string; // Información pre-cargada para evitar coste de API inicial
    date?: string; // YYYY-MM-DD para filtrado
}

export const PROVINCE_EVENTS: ProvinceEvent[] = [
    {
        id: 'prov-huelva-2025',
        imageUrl: 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?q=80&w=1974&auto=format&fit=crop',
        title: 'Mercado Navideño Plaza de las Monjas',
        location: 'Huelva Capital',
        date: '2025-12-05',
        description: "**Mercado Navideño de Huelva**\n\nEl corazón de la capital onubense late con fuerza en Navidad. La Plaza de las Monjas acoge su tradicional mercado con decenas de puestos de artesanía, decoración y dulces típicos.\n\n**¿Qué encontrarás?**\n* Luces espectaculares en la Gran Vía.\n* Puestos de castañas y churros.\n* Actividades infantiles diarias.\n\nEs el punto de encuentro ideal para comenzar una tarde de compras y paseo por el centro iluminado."
    },
    {
        id: 'prov-lepe-2025',
        imageUrl: 'https://images.unsplash.com/photo-1576919323737-2959828b4c27?q=80&w=1974&auto=format&fit=crop',
        title: 'Video Mapping y Nevada',
        location: 'Lepe',
        date: '2025-12-06',
        description: "**Navidad Mágica en Lepe**\n\nLepe se supera cada año con su espectáculo de luz y sonido. La Plaza de España es el escenario de un impresionante **Video Mapping** proyectado sobre la Espadaña de la Iglesia Santo Domingo de Guzmán.\n\n**Horarios:**\nSuele haber pases diarios a las 19:30 y 20:30 h (a confirmar).\n\nAdemás, tras la proyección, ¡nieva en Lepe! Una nevada artificial cubre la plaza para deleite de los más pequeños."
    },
    {
        id: 'prov-almonte-2025',
        imageUrl: 'https://images.unsplash.com/photo-1544144432-15e7a9b70b3b?q=80&w=2070&auto=format&fit=crop',
        title: 'Belén Viviente de El Rocío',
        location: 'Almonte (El Rocío)',
        date: '2025-12-06',
        description: "**Belén Viviente en la Aldea**\n\nUn entorno único en el mundo, las marismas de Doñana y la aldea de El Rocío, sirven de telón de fondo para este Belén Viviente.\n\n**Lo más destacado:**\n* Recreación con animales de granja reales.\n* Escenas costumbristas en las chozas tradicionales.\n* Ambiente marismeño único.\n\nUna oportunidad perfecta para visitar la Ermita y disfrutar del ambiente navideño en un entorno natural privilegiado."
    },
    {
        id: 'prov-moguer-2025',
        imageUrl: 'https://images.unsplash.com/photo-1514328526035-7cb6960787fa?q=80&w=1976&auto=format&fit=crop',
        title: 'Zambombá y Alumbrado',
        location: 'Moguer',
        date: '2025-12-13',
        description: "**Navidad en la Tierra de Juan Ramón**\n\nMoguer brilla con luz propia. El casco histórico, declarado Bien de Interés Cultural, se ilumina con una elegancia especial.\n\n**No te pierdas:**\n* La Gran Zambombá en la Plaza del Cabildo: villancicos flamencos, hogueras y anís.\n* Ruta de los Belenes por las capillas e iglesias.\n* Dulces de los conventos locales, famosos en toda la provincia."
    },
    {
        id: 'prov-ayamonte-2025',
        imageUrl: 'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=1962&auto=format&fit=crop',
        title: 'Poblado Navideño',
        location: 'Ayamonte',
        date: '2025-12-06',
        description: "**Poblado Navideño de Ayamonte**\n\nLa Plaza de la Laguna se transforma en un cuento de Navidad. Ayamonte, con su luz especial de desembocadura, ofrece un plan ideal para familias.\n\n**Actividades:**\n* Casa de Papá Noel visitable.\n* Mercado de artesanía y regalos.\n* Atracciones infantiles en el centro peatonal.\n\nAprovecha para cruzar en ferry a Portugal y vivir una experiencia navideña internacional en una sola tarde."
    },
    {
        "id": "huelva-ruta-zambombas-2025",
        "title": "🎶 Ruta de la Zambomba: Tradición en los Barrios",
        "location": "Huelva Capital",
        "date": "2025-12-12",
        "description": "¡Huelva suena a Navidad! Este viernes la **Ruta de la Zambomba** toma las plazas. Destacan las actuaciones de la **Hermandad de la Fe** (Plaza Colombina) y la del **Santo Entierro** (Paseo de Santa Fe). Ambiente festivo, *villancicos flamencos* y barras solidarias.\n\n⏰ **Horario:** De 12:00h a 00:00h (aprox).\n📍 **Zonas:** Plaza de las Carretas, Plaza Colombina y Paseo de Santa Fe.",
        "imageUrl": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000"
    },
    {
        "id": "condado-beas-belen-viviente-2025",
        "title": "🌟 Belén Viviente de Beas: El Decano de Andalucía",
        "location": "Beas (El Condado)",
        "date": "2025-12-13",
        "description": "Es el **Belén Viviente más antiguo de Andalucía**. Un recorrido mágico por escenas bíblicas con animales reales y oficios artesanos. Imprescindible comprar entrada online con antelación debido a la alta demanda este fin de semana.\n\n⏰ **Sábado:** 15:30h - 19:30h.\n⏰ **Domingo:** 11:00h - 13:00h y 15:30h - 19:30h.",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bel%C3%A9n_Viviente_de_Beas.jpg/800px-Bel%C3%A9n_Viviente_de_Beas.jpg"
    },
    {
        "id": "andevalo-alosno-zambomba-sones-2025",
        "title": "🔥 Zambomba 'Sones de Navidad' en la Cuna del Fandango",
        "location": "Alosno (Andévalo)",
        "date": "2025-12-13",
        "description": "Vive la auténtica Navidad del Andévalo. El **Paseo de Arriba** acoge el espectáculo *'Sones de Navidad'* con Abel Moreno y su grupo. Una oportunidad única para escuchar villancicos con el toque único de esta tierra minera y fandanguera.\n\n⏰ **Inicio:** 18:00h.\n📍 **Lugar:** Paseo de Arriba, Alosno.",
        "imageUrl": "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1000"
    },
    {
        "id": "costa-corrales-belen-teatro-2025",
        "title": "🎭 Belén Viviente de Corrales: Teatro al Aire Libre",
        "location": "Corrales, Aljaraque (La Costa)",
        "date": "2025-12-14",
        "description": "Más que un belén, una recreación histórica en el entorno del **Teatro Cinema Corrales**. Con más de 200 figurantes, destaca por su increíble ambientación y la degustación de productos típicos. Ideal para ir con niños este sábado tarde o domingo mañana.\n\n⏰ **Sábado 14:** 17:30h - 21:00h.\n⏰ **Domingo 15:** 11:30h - 14:00h.",
        "imageUrl": "https://images.unsplash.com/photo-1544144432-15e7a9b70b3b?q=80&w=1000"
    },
    {
        "id": "costa-ayamonte-ruta-belenes-2025",
        "title": "🎄 Navidad en la Frontera: XI Ruta de Belenes",
        "location": "Ayamonte (La Costa)",
        "date": "2025-12-15",
        "description": "Disfruta del domingo paseando por la desembocadura del Guadiana. Ayamonte ofrece su **XI Ruta de Belenes** por iglesias y escaparates, complementada con su espectacular **alumbrado navideño** en la Plaza de la Laguna. Perfecto para cerrar el fin de semana.\n\n⏰ **Disponibilidad:** Todo el fin de semana.\n✨ **Tip:** Visita la Plaza de la Laguna al anochecer.",
        "imageUrl": "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1000"
    },
    {
        "id": "costa-lepe-gran-nevada-2025",
        "title": "❄️ La Gran Nevada y Videomapping de Lepe",
        "location": "Lepe (La Costa)",
        "date": "2025-12-12",
        "description": "Uno de los eventos más esperados de la costa. La Plaza de España se tiñe de blanco con la **caída de nieve artificial** programada para el viernes y sábado. Se acompaña de un espectáculo de luz y sonido (**Videomapping**) sobre la fachada de la Iglesia de Santo Domingo de Guzmán.\n\n⏰ **Horario:** Pases a las 19:30h y 20:30h (viernes y sábado).\n📍 **Lugar:** Plaza de España.",
        "imageUrl": "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1000"
    },
    {
        "id": "minera-riotinto-tren-navidad-2025",
        "title": "🚂 El Tren de la Navidad de Riotinto",
        "location": "Minas de Riotinto (Cuenca Minera)",
        "date": "2025-12-13",
        "description": "Una experiencia única en el histórico ferrocarril minero. Recorre los paisajes marcianos del Río Tinto a bordo de vagones de época, acompañado por el **Cartero Real** y personajes navideños. Ideal para familias.\n\n⏰ **Salidas:** Varios turnos (13:30h, 16:00h). Imprescindible reserva previa.\n📍 **Salida:** Estación de Talleres Mina.",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ferrocarril_Tur%C3%ADstico_Minero_-_R%C3%ADo_Tinto.jpg/800px-Ferrocarril_Tur%C3%ADstico_Minero_-_R%C3%ADo_Tinto.jpg"
    },
    {
        "id": "condado-moguer-navidad-poeta-2025",
        "title": "📖 Navidad en la Ciudad del Poeta",
        "location": "Moguer (El Condado)",
        "date": "2025-12-13",
        "description": "Moguer brilla con luz propia. Este sábado destaca la **Gran Zambomba Flamenca** organizada por la Hermandad del Rocío en la Plaza del Cabildo. Disfruta de los villancicos, el ambiente señorial del pueblo y los dulces tradicionales de la zona.\n\n⏰ **Hora:** A partir de las 13:00h y tardeo.\n📍 **Lugar:** Plaza del Cabildo y centro histórico.",
        "imageUrl": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000"
    },
    {
        "id": "capital-huelva-mercado-monjas-2025",
        "title": "🎁 Mercado Navideño y Alumbrado Musical",
        "location": "Huelva Capital",
        "date": "2025-12-14",
        "description": "El corazón de la navidad onubense. Pasea por las casetas de artesanía y gastronomía en la **Plaza de las Monjas**. No te pierdas los pases del **espectáculo de luces al ritmo de la música** en la Gran Vía y Calle Concepción.\n\n⏰ **Mercado:** 11:00h - 22:00h.\n⏰ **Luces:** Pases a las 19:00h, 20:00h y 21:00h.",
        "imageUrl": "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1000"
    },
    {
        "id": "metro-gibraleon-belen-alcazar-2025",
        "title": "🏰 Belén Viviente de Gibraleón",
        "location": "Gibraleón (Área Metro)",
        "date": "2025-12-13",
        "description": "Ubicado en el cerro del antiguo Alcázar, este Belén destaca por su orografía y realismo. Más de 20 escenas que recrean la vida de la época entre murallas y caminos de tierra. Es uno de los **más visitados de la provincia** junto al de Beas.\n\n⏰ **Sábado:** 16:00h - 21:00h.\n⏰ **Domingo:** 11:00h - 13:30h y 16:00h - 21:00h.",
        "imageUrl": "https://images.unsplash.com/photo-1544144432-15e7a9b70b3b?q=80&w=1000"
    },
    {
        "id": "costa-punta-zambomba-hermandades-2025",
        "title": "💃 Gran Zambomba Flamenca de Punta Umbría",
        "location": "Punta Umbría (La Costa)",
        "date": "2025-12-13",
        "description": "El ambiente marinero se mezcla con la tradición navideña en la **Plaza 26 de Abril**. Las distintas hermandades del pueblo organizan una jornada de convivencia con cante en directo, fogatas y degustación de dulces típicos y aguardiente.\n\n⏰ **Horario:** Desde el mediodía hasta la madrugada.\n📍 **Lugar:** Plaza 26 de Abril.",
        "imageUrl": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000"
    },
    {
        "id": "capital-huelva-concierto-sinfonica-2025",
        "title": "🎻 Concierto Extraordinario 'Sones de Pascua'",
        "location": "Huelva Capital",
        "date": "2025-12-12",
        "description": "La **Banda Sinfónica Municipal de Huelva** ofrece su tradicional concierto de Navidad en el Palacio de Congresos (Casa Colón). Un repertorio clásico que mezcla valses vieneses con adaptaciones sinfónicas de villancicos populares onubenses.\n\n⏰ **Hora:** 20:00h.\n🎟️ **Entrada:** Gratuita o donativo solidario (consultar taquilla).",
        "imageUrl": "https://images.unsplash.com/photo-1465847899078-b413929f7120?q=80&w=1000"
    },
    {
        "id": "condado-palos-pista-hielo-2025",
        "title": "⛸️ Pista de Hielo y Navidad en Palos",
        "location": "Palos de la Frontera (El Condado)",
        "date": "2025-12-14",
        "description": "Palos se transforma en un parque temático navideño. Este domingo es ideal para disfrutar de su **Pista de Hielo Ecológica** y la gran carpa navideña. Además, a las 18:30h suele haber pasacalles o nevada en la Plaza Comandante Franco.\n\n⏰ **Horario Pista:** 12:00h - 14:00h y 16:00h - 21:00h.\n✨ **Destacado:** Sus famosos borrachuelos y dulces locales.",
        "imageUrl": "https://images.unsplash.com/photo-1482329334960-b6f7091152a4?q=80&w=1000"
    },
    {
        "id": "andevalo-valverde-casa-navidad-2025",
        "title": "🏠 La Casa de la Navidad de Valverde",
        "location": "Valverde del Camino (Andévalo)",
        "date": "2025-12-13",
        "description": "El Teatro Municipal y sus aledaños acogen la **Casa de Papá Noel y el Cartero Real**. Un evento mágico para los niños del Andévalo, con talleres de manualidades y un pequeño mercado artesanal de cuero y madera, típico de la localidad.\n\n⏰ **Horario:** 17:00h - 20:30h.\n📍 **Lugar:** Entorno del Teatro Municipal.",
        "imageUrl": "https://images.unsplash.com/photo-1512404223298-508933b93433?q=80&w=1000"
    },
    {
        "id": "condado-bollullos-mercado-vino-2025",
        "title": "🍷 Mercado Navideño 'Vino y Tradición'",
        "location": "Bollullos par del Condado (El Condado)",
        "date": "2025-12-13",
        "description": "En pleno corazón del Condado, este mercado marida la Navidad con la enología. Ubicado en las calles céntricas (zona calle Real/Plaza), ofrece **productos navideños, artesanía y mosto de la tierra**. Perfecto para comprar regalos y tapear.\n\n⏰ **Horario:** Sábado completo (11:00h - 23:00h).\n🥂 **Tip:** Prueba los dulces de las confiterías locales.",
        "imageUrl": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000"
    },
    {
        "id": "rabida-mercado-muelle-2025",
        "title": "⛵ Mercado Navideño del Muelle de las Carabelas",
        "location": "La Rábida, Palos de la Frontera",
        "date": "2025-12-19",
        "description": "Un clásico imprescindible. El entorno de las carabelas de Colón se llena de puestos de artesanía, talleres infantiles gratuitos y música en directo. Es una alternativa cultural perfecta al bullicio comercial, ideal para pasar el día completo con la familia.\n\n⏰ **Horario:** 10:30h - 19:30h (Viernes, Sábado y Domingo).\n🎟️ **Entrada:** Precio reducido habitual del monumento.",
        "imageUrl": "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1000"
    },
    {
        "id": "capital-huelva-papanoelada-motera-2025",
        "title": "🏍️ VI Papanoelada Motera de Huelva",
        "location": "Huelva Capital",
        "date": "2025-12-21",
        "description": "El evento más ruidoso y solidario. Cientos de moteros vestidos de Papá Noel recorren las avenidas principales de la capital el domingo por la mañana, terminando con una fiesta de convivencia y recogida de juguetes. Espectacular de ver, especialmente en la Avenida de Andalucía.\n\n⏰ **Salida:** 11:30h (aprox).\n📍 **Ruta:** Desde el Estadio Nuevo Colombino hacia el centro.",
        "imageUrl": "https://images.unsplash.com/photo-1606925792209-6689d71c828a?q=80&w=1000"
    },
    {
        "id": "condado-villarrasa-belen-viviente-2025",
        "title": "🌾 Belén Viviente de Villarrasa",
        "location": "Villarrasa (El Condado)",
        "date": "2025-12-20",
        "description": "Una joya menos masificada que Beas o Corrales. Se monta en el **Centro Gadea** y destaca por su cercanía y detalle. Recrean el mercado, la posada y el castillo con gran encanto. Ideal si buscas una experiencia de Belén Viviente sin las grandes aglomeraciones de los más famosos.\n\n⏰ **Sábado:** 16:00h - 20:00h (aprox).\n📍 **Lugar:** Centro Gadea.",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bel%C3%A9n_Viviente_de_Beas.jpg/800px-Bel%C3%A9n_Viviente_de_Beas.jpg"
    },
    {
        "id": "costa-isla-nevada-flores-2025",
        "title": "❄️ Gran Nevada en la Plaza de las Flores",
        "location": "Isla Cristina (La Costa)",
        "date": "2025-12-19",
        "description": "Isla Cristina celebra su gran fiesta pre-navideña el viernes. La emblemática **Plaza de las Flores** se cubre de nieve artificial, acompañada de animación infantil y visita de personajes Disney. Perfecto para los niños de la zona costera occidental.\n\n⏰ **Hora:** A partir de las 17:30h.\n✨ **Tip:** Aprovecha para comprar gamba blanca en el mercado cercano.",
        "imageUrl": "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1000"
    },
    {
        "id": "minera-nerva-concierto-banda-2025",
        "title": "🎺 Concierto de Navidad 'Villa de Nerva'",
        "location": "Nerva (Cuenca Minera)",
        "date": "2025-12-20",
        "description": "Cultura en estado puro. La **Banda de Música Villa de Nerva**, una de las más antiguas y prestigiosas de Andalucía, ofrece su concierto extraordinario en el Teatro Javier Perianes. Un repertorio solemne y festivo que es orgullo de la Cuenca Minera.\n\n⏰ **Hora:** 20:00h.\n📍 **Lugar:** Teatro Javier Perianes.",
        "imageUrl": "https://images.unsplash.com/photo-1465847899078-b413929f7120?q=80&w=1000"
    },
    {
        "id": "minera-tharsis-belen-minas-2025",
        "title": "⛏️ Belén Viviente de Tharsis",
        "location": "Tharsis (Cuenca Minera)",
        "date": "2025-12-20",
        "description": "El segundo Belén Viviente más importante de la zona minera, ubicado en el singular entorno de **Pueblo Nuevo**. Destaca por recrear el mercado hebreo con la estética de las antiguas casas coloniales inglesas de las minas. Muy auténtico y acogedor.\n\n⏰ **Horario:** Sábado y Domingo de 16:30h a 20:30h.\n📍 **Lugar:** Entorno del Mercado de Abastos.",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bel%C3%A9n_Viviente_de_Beas.jpg/800px-Bel%C3%A9n_Viviente_de_Beas.jpg"
    },
    {
        "id": "condado-palma-videomapping-2025",
        "title": "✨ Navidad de Luz y Videomapping",
        "location": "La Palma del Condado (El Condado)",
        "date": "2025-12-19",
        "description": "La monumental Plaza de España es el escenario de un espectáculo visual impresionante. Se proyecta un **Videomapping Navideño** sobre la fachada de la Iglesia Parroquial de San Juan Bautista. El viernes suele haber ambiente especial con coros de campanilleros.\n\n⏰ **Pases:** A partir de las 19:30h (varios pases cada media hora).\n📍 **Lugar:** Plaza de España.",
        "imageUrl": "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1000"
    },
    {
        "id": "costa-cartaya-mercado-navidad-2025",
        "title": "🎁 Mercadillo Navideño de Cartaya",
        "location": "Cartaya (La Costa)",
        "date": "2025-12-19",
        "description": "La **Plaza Redonda** y las calles peatonales aledañas se llenan de vida este fin de semana. Es un mercado tradicional con puestos de madera, ideal para últimas compras, con la visita de Papá Noel en el Ayuntamiento y actuaciones de la Academia Municipal de Baile.\n\n⏰ **Horario:** 11:00h - 22:00h.\n🎄 **Destacado:** La nevada artificial sobre la plaza.",
        "imageUrl": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000"
    },
    {
        "id": "condado-rocio-navidad-aldea-2025",
        "title": "🕊️ Navidad Doñana: Zambomba en El Rocío",
        "location": "El Rocío (Almonte)",
        "date": "2025-12-20",
        "description": "Vivir la Navidad pisando arena es una experiencia única. Varios coros rocieros y hermandades organizan **zambombas en las casas de hermandad** y plazas de la Aldea. El ambiente es puramente flamenco y devocional, muy diferente a la ciudad.\n\n⏰ **Horario:** Tarde-noche del sábado.\n📍 **Lugar:** Alrededores del Santuario y Plaza del Acebuchal.",
        "imageUrl": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000"
    },
    {
        "id": "capital-huelva-teatro-cuento-2025",
        "title": "🎭 Teatro Familiar: Clásicos de Navidad",
        "location": "Huelva Capital",
        "date": "2025-12-21",
        "description": "El **Gran Teatro de Huelva** suele reservar este domingo para una gran producción familiar (tipo 'Cuento de Navidad' o Musical Infantil) antes de las vacaciones escolares. Es el plan cultural perfecto para resguardarse del frío y entretener a los pequeños.\n\n⏰ **Hora:** Habitualmente 18:00h.\n🎟️ **Entradas:** Taquilla del Gran Teatro o web oficial.",
        "imageUrl": "https://images.unsplash.com/photo-1465847899078-b413929f7120?q=80&w=1000"
    },
    {
        "id": "condado-paterna-belen-viviente-2025",
        "title": "🏘️ Belén Viviente de Paterna del Campo",
        "location": "Paterna del Campo (El Condado)",
        "date": "2025-12-20",
        "description": "Una joya escondida del Condado. Los vecinos recrean la Judea del siglo I con gran fidelidad histórica en las calles del pueblo. Es más íntimo que los grandes belenes turísticos y destaca por la **degustación de castañas y dulces caseros**.\n\n⏰ **Horario:** Sábado y Domingo tarde (aprox. 16:30h - 20:30h).\n📍 **Lugar:** Calles céntricas de Paterna.",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bel%C3%A9n_Viviente_de_Beas.jpg/800px-Bel%C3%A9n_Viviente_de_Beas.jpg"
    },
    {
        "id": "metro-sanjuan-gran-fiesta-2025",
        "title": "❄️ Neva en San Juan: Fiesta Pre-Navideña",
        "location": "San Juan del Puerto (Área Metro)",
        "date": "2025-12-19",
        "description": "La **Plaza de España** se convierte en el epicentro de la fiesta joven y familiar. El ayuntamiento suele programar una espectacular **nevada artificial**, DJ o música en directo y animación infantil. Ambiente muy animado a solo 10 minutos de la capital.\n\n⏰ **Hora:** A partir de las 19:00h.\n📍 **Lugar:** Plaza de España (frente al Ayuntamiento).",
        "imageUrl": "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1000"
    },
    {
        "id": "condado-moguer-zambomba-jondo-2025",
        "title": "🎤 Zambomba de la Peña de Cante Jondo",
        "location": "Moguer (El Condado)",
        "date": "2025-12-20",
        "description": "Para los puristas del flamenco. La prestigiosa **Peña de Cante Jondo de Moguer** celebra su tradicional zambomba. Aquí se escuchan los villancicos con el compás más auténtico y respetuoso, lejos del bullicio comercial. Una experiencia cultural de primer nivel.\n\n⏰ **Hora:** Noche (aprox 21:00h).\n📍 **Lugar:** Sede de la Peña de Cante Jondo.",
        "imageUrl": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000"
    },
    {
        "id": "capital-huelva-belen-diputacion-2025",
        "title": "🏛️ Belén Monumental de la Provincia",
        "location": "Huelva Capital",
        "date": "2025-12-20",
        "description": "Ubicado en la **Sala de la Provincia (Gran Vía)**, es una visita obligada si estás en el centro viendo las luces. Es un belén tradicional de grandes dimensiones que suele rendir homenaje a algún pueblo o costumbre onubense. Entrada libre y perfecto para una parada tranquila.\n\n⏰ **Horario:** 10:00h - 14:00h y 17:00h - 21:00h.\n📍 **Lugar:** Gran Vía (frente al Ayuntamiento).",
        "imageUrl": "https://images.unsplash.com/photo-1544144432-15e7a9b70b3b?q=80&w=1000"
    },
    {
        "id": "costa-ayamonte-concierto-cardenio-2025",
        "title": "🎼 Concierto de Navidad Banda Ciudad de Ayamonte",
        "location": "Ayamonte (La Costa)",
        "date": "2025-12-21",
        "description": "El histórico **Teatro Cardenio** acoge el concierto más solemne de las fiestas. La Banda de Música Ciudad de Ayamonte, acompañada a menudo por corales, repasa los clásicos navideños. Un plan elegante para cerrar el domingo antes de la cena.\n\n⏰ **Hora:** 12:30h (matinal) o 19:00h (tarde, confirmar cartel).\n📍 **Lugar:** Teatro Cardenio.",
        "imageUrl": "https://images.unsplash.com/photo-1465847899078-b413929f7120?q=80&w=1000"
    }
];
