
export interface ProvinceEvent {
    id: string;
    imageUrl: string;
    title?: string;
    location?: string;
    description?: string; // Información pre-cargada para evitar coste de API inicial
}

export const PROVINCE_EVENTS: ProvinceEvent[] = [
    {
        id: 'prov-huelva-2025',
        imageUrl: 'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?q=80&w=1974&auto=format&fit=crop',
        title: 'Mercado Navideño Plaza de las Monjas',
        location: 'Huelva Capital',
        description: "**Mercado Navideño de Huelva**\n\nEl corazón de la capital onubense late con fuerza en Navidad. La Plaza de las Monjas acoge su tradicional mercado con decenas de puestos de artesanía, decoración y dulces típicos.\n\n**¿Qué encontrarás?**\n* Luces espectaculares en la Gran Vía.\n* Puestos de castañas y churros.\n* Actividades infantiles diarias.\n\nEs el punto de encuentro ideal para comenzar una tarde de compras y paseo por el centro iluminado."
    },
    {
        id: 'prov-lepe-2025',
        imageUrl: 'https://images.unsplash.com/photo-1576919323737-2959828b4c27?q=80&w=1974&auto=format&fit=crop',
        title: 'Video Mapping y Nevada',
        location: 'Lepe',
        description: "**Navidad Mágica en Lepe**\n\nLepe se supera cada año con su espectáculo de luz y sonido. La Plaza de España es el escenario de un impresionante **Video Mapping** proyectado sobre la Espadaña de la Iglesia Santo Domingo de Guzmán.\n\n**Horarios:**\nSuele haber pases diarios a las 19:30 y 20:30 h (a confirmar).\n\nAdemás, tras la proyección, ¡nieva en Lepe! Una nevada artificial cubre la plaza para deleite de los más pequeños."
    },
    {
        id: 'prov-almonte-2025',
        imageUrl: 'https://images.unsplash.com/photo-1544144432-15e7a9b70b3b?q=80&w=2070&auto=format&fit=crop',
        title: 'Belén Viviente de El Rocío',
        location: 'Almonte (El Rocío)',
        description: "**Belén Viviente en la Aldea**\n\nUn entorno único en el mundo, las marismas de Doñana y la aldea de El Rocío, sirven de telón de fondo para este Belén Viviente.\n\n**Lo más destacado:**\n* Recreación con animales de granja reales.\n* Escenas costumbristas en las chozas tradicionales.\n* Ambiente marismeño único.\n\nUna oportunidad perfecta para visitar la Ermita y disfrutar del ambiente navideño en un entorno natural privilegiado."
    },
    {
        id: 'prov-moguer-2025',
        imageUrl: 'https://images.unsplash.com/photo-1514328526035-7cb6960787fa?q=80&w=1976&auto=format&fit=crop',
        title: 'Zambombá y Alumbrado',
        location: 'Moguer',
        description: "**Navidad en la Tierra de Juan Ramón**\n\nMoguer brilla con luz propia. El casco histórico, declarado Bien de Interés Cultural, se ilumina con una elegancia especial.\n\n**No te pierdas:**\n* La Gran Zambombá en la Plaza del Cabildo: villancicos flamencos, hogueras y anís.\n* Ruta de los Belenes por las capillas e iglesias.\n* Dulces de los conventos locales, famosos en toda la provincia."
    },
    {
        id: 'prov-ayamonte-2025',
        imageUrl: 'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=1962&auto=format&fit=crop',
        title: 'Poblado Navideño',
        location: 'Ayamonte',
        description: "**Poblado Navideño de Ayamonte**\n\nLa Plaza de la Laguna se transforma en un cuento de Navidad. Ayamonte, con su luz especial de desembocadura, ofrece un plan ideal para familias.\n\n**Actividades:**\n* Casa de Papá Noel visitable.\n* Mercado de artesanía y regalos.\n* Atracciones infantiles en el centro peatonal.\n\nAprovecha para cruzar en ferry a Portugal y vivir una experiencia navideña internacional en una sola tarde."
    }
];
