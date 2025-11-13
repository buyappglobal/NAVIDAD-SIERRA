


import React from 'react';
import { EventType, EventCategory, ChangeInstruction } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import FilterSidebar from './components/FilterSidebar';
import EventList from './components/EventList';
import EventCalendar from './components/EventCalendar';
import EventDetail from './components/EventDetail';
import EventMap from './components/EventMap';
import AddEventModal from './components/AddEventModal';
import EditEventModal from './components/EditEventModal';
import LoginModal from './components/LoginModal';
import ChangeRequestModal from './components/ChangeRequestModal';
import { TOWNS, ICONS } from './constants';
import EventMapModal from './components/EventMapModal';
import Hero from './components/Hero';

const initialEventsData: EventType[] = [
  {
    "id": "1",
    "title": "Belén Viviente de Alájar",
    "description": "Representación del nacimiento de Jesús por los habitantes del pueblo, en un entorno natural único. Una tradición con décadas de historia.",
    "town": "Alájar",
    "date": "2025-12-25",
    "category": EventCategory.BELEN_VIVIENTE,
    "imageUrl": "https://solonet.es/wp-content/uploads/2025/10/AGENDA-TURISTEANDO-ALAJAR-Rafael-Caballero-Vazquez.png",
    "interestInfo": "🏞️ Lugares Emblemáticos que Debes Visitar en Alájar\nAlájar, uno de los pueblos con más encanto de la sierra, te invita a descubrir su patrimonio natural y cultural.\n\nPeña de Arias Montano: Un monumento natural y lugar de peregrinación que ofrece vistas panorámicas espectaculares de la sierra. Alberga la Ermita de Nuestra Señora de los Ángeles y la Cátedra de San Victor.\n\nMonumento Natural de Alájar: Un enclave de gran valor geológico y paisajístico, ideal para los amantes de la naturaleza.\n\nIglesia de San Marcos: Templo parroquial de estilo barroco situado en el corazón del pueblo, en la Plaza de España.\n\nErmita de la Reina de los Ángeles: Un lugar de devoción y belleza, centro de la romería más famosa de la comarca.\n\n🥾 Ruta de Senderismo Sugerida: Sendero Alájar - Linares de la Sierra\nUna ruta clásica que conecta dos de los pueblos más pintorescos de la Sierra.\n\nRecorrido: Alájar – Linares de la Sierra (circular o lineal).\n\nDistancia y Dificultad: Aproximadamente 10 km (ida y vuelta), de dificultad baja-media, ideal para una mañana.\n\nAtractivo: El camino discurre por senderos empedrados, dehesas y bosques de castaños y alcornoques. Es una oportunidad única para disfrutar del paisaje serrano y la arquitectura tradicional de sus pueblos.\n\n🛣️ Cómo Llegar a Alájar\n\nDesde Huelva (Capital)\nEn Coche: Toma la N-435 dirección Badajoz, y después de pasar por la zona minera, toma el desvío hacia Aracena. Desde Aracena, sigue las indicaciones hacia Alájar por la HU-8121 (aprox. 1h 20min - 100 km).\n\nEn Autobús: La empresa Damas ofrece servicios que conectan Huelva con los pueblos de la sierra. Puede ser necesario hacer transbordo en Aracena.\n\nDesde Sevilla\nEn Coche: Toma la A-66 (Ruta de la Plata) dirección Mérida y sal en la salida 75 hacia Aracena por la N-433. Una vez pasado Aracena, encontrarás el desvío hacia Alájar (aprox. 1h 20min - 105 km).\n\nEn Autobús: Damas también conecta Sevilla con Aracena, desde donde se puede tomar un bus de enlace o taxi hasta Alájar."
  },
  {
    "id": "2",
    "title": "Campanilleros de Higuera",
    "description": "Coro de campanilleros que cantan villancicos por las calles del pueblo, manteniendo viva la tradición musical de la sierra.",
    "town": "Higuera de la Sierra",
    "date": "2025-12-24",
    "category": EventCategory.CAMPANILLEROS,
    "imageUrl": "https://solonet.es/wp-content/uploads/2025/11/belen-viviente-higuera.jpeg",
    "interestInfo": "🏞️ Lugares Emblemáticos que Debes Visitar en Higuera de la Sierra\nConocida por su cabalgata, la segunda más antigua de España, Higuera de la Sierra es un pueblo lleno de historia y sabor.\n\nCentro de Interpretación de la Cabalgata: Un espacio dedicado a la fiesta más importante del pueblo, donde podrás conocer su historia y ver las carrozas que desfilan cada 5 de enero.\n\nDestilerías Martes Santo: Visita una de las destilerías más antiguas de Andalucía y descubre el proceso de elaboración del anís y otros licores serranos. ¡No te vayas sin una degustación!\n\nIglesia Parroquial de San Sebastián: Un templo del siglo XVIII con un impresionante retablo barroco.\n\nPlaza de la Constitución: El corazón del pueblo, un lugar perfecto para tomar algo y disfrutar del ambiente local.\n\n🥾 Ruta de Senderismo Sugerida: Camino de las Tobas\nUn agradable paseo que te conectará con la naturaleza y el agua.\n\nRecorrido: Higuera de la Sierra - Cascada de la Lapa.\n\nDistancia y Dificultad: Ruta corta y de dificultad baja, ideal para toda la familia (aprox. 4 km ida y vuelta).\n\nAtractivo: El sendero sigue el curso del arroyo de la Lapa, llevándote a través de un bosque de ribera hasta una bonita cascada (con más agua en época de lluvias). Es un paseo refrescante y lleno de encanto.\n\n🛣️ Cómo Llegar a Higuera de la Sierra\n\nDesde Huelva (Capital)\nEn Coche: La ruta más directa es por la N-435 hacia Badajoz hasta el cruce de Zalamea la Real, y de ahí por la A-461 hacia la sierra. Pasado Campofrío, se toma la A-470 (aprox. 1h 10min - 87 km).\n\nEn Autobús: La empresa Damas opera rutas que conectan Huelva con Higuera de la Sierra.\n\nDesde Sevilla\nEn Coche: Toma la A-66 (Ruta de la Plata) y luego la N-433 (salida 75) dirección Aracena/Portugal. Higuera de la Sierra es uno de los primeros pueblos de la sierra que encontrarás en esta carretera (aprox. 1h - 80 km).\n\nEn Autobús: Damas ofrece servicios directos desde la Estación de Plaza de Armas de Sevilla a Higuera de la Sierra."
  },
  {
    "id": "3",
    "title": "Mercado Navideño de Aracena",
    "description": "La Plaza Marqués de Aracena se llena de puestos de artesanía, productos típicos de la sierra, dulces navideños y una gran variedad de artículos de regalo. Ideal para encontrar regalos únicos y disfrutar del ambiente festivo. Habrá talleres para niños y degustaciones.",
    "town": "Aracena",
    "date": "2025-12-14",
    "category": EventCategory.MERCADO,
    "interestInfo": "🏞️ Lugares Emblemáticos que Debes Visitar en Aracena\nAracena es la capital de la comarca y un centro neurálgico que combina patrimonio, naturaleza y gastronomía.\n\nGruta de las Maravillas: Una de las cuevas turísticas más espectaculares de España. Un viaje subterráneo a través de lagos y formaciones calcáreas que te dejará sin palabras. ¡Imprescindible reservar con antelación!\n\nCastillo de Aracena e Iglesia Prioral: Domina el pueblo desde su cerro. Pasea por las murallas del castillo fortaleza y visita la iglesia gótico-mudéjar, el templo más antiguo y emblemático de la localidad.\n\nMuseo del Jamón: Un centro de interpretación dedicado al producto estrella de la sierra. Descubre todo el proceso de elaboración del jamón ibérico de bellota, desde la dehesa hasta tu plato.\n\nPlaza Alta y Plaza Marqués de Aracena: El corazón social y arquitectónico de la ciudad, con edificios modernistas como el Casino de Arias Montano y el Ayuntamiento.\n\n🥾 Ruta de Senderismo Sugerida: Aracena - Linares de la Sierra\nUna de las rutas más clásicas y bellas de la comarca.\n\nRecorrido: Aracena – Linares de la Sierra (lineal).\n\nDistancia y Dificultad: Unos 5 km (solo ida), de dificultad baja. Ideal para hacer en una mañana y comer en Linares.\n\nAtractivo: El camino, conocido como 'el camino de las pedrizas', es un antiguo sendero empedrado que serpentea entre dehesas de encinas y alcornoques, muros de piedra y arroyos. El paisaje es puramente serrano.\n\nConexión: Puedes volver por el mismo camino o coordinar un taxi para el regreso.\n\n🛣️ Cómo Llegar a Aracena\n\nDesde Huelva (Capital)\nEn Coche: La ruta más común es por la N-435 en dirección a Badajoz. Tras pasar la zona minera, encontrarás las indicaciones para tomar la carretera hacia Aracena (aprox. 1h 15min - 100 km).\n\nEn Autobús: La empresa Damas ofrece conexiones directas y frecuentes desde Huelva.\n\nDesde Sevilla\nEn Coche: Toma la autovía A-66 (Ruta de la Plata) dirección Mérida y coge la salida 75 hacia la N-433 (dirección Portugal). Sigue esta carretera y te llevará directamente a Aracena (aprox. 1h 10min - 90 km).\n\nEn Autobús: Damas ofrece servicios directos desde la Estación de Autobuses Plaza de Armas de Sevilla."
  },
  {
    "id": "4",
    "title": "Fiesta de Nochevieja",
    "description": "Gran fiesta en la plaza del pueblo para dar la bienvenida al Año Nuevo, con música en directo y fuegos artificiales.",
    "town": "Cortegana",
    "date": "2025-12-31",
    "category": EventCategory.FIESTA,
    "interestInfo": "🏞️ Lugares Emblemáticos que Debes Visitar en Cortegana\nCortegana es un pueblo señorial dominado por su imponente fortaleza medieval, un lugar lleno de historia y leyendas.\n\nCastillo de Cortegana: Una impresionante fortaleza del siglo XIII que se alza sobre el pueblo. Es uno de los castillos mejor conservados de la provincia y ofrece unas vistas panorámicas espectaculares. Alberga el centro de interpretación de las Jornadas Medievales.\n\nIglesia del Divino Salvador: Un templo gótico-mudéjar con una impresionante portada de piedra y un valioso artesonado interior. Es el principal monumento religioso de la localidad.\n\nErmita de Nuestra Señora de la Piedad: Situada en un bello paraje, es el centro de la romería local y un agradable lugar para pasear.\n\nCasa Mudéjar y Lavaderos Públicos: Explora el casco antiguo y descubre rincones con encanto como esta casa tradicional o los antiguos lavaderos, que te transportarán a otra época.\n\n🥾 Ruta de Senderismo Sugerida: Camino de la Vía Verde\nUn sendero fácil que sigue el antiguo trazado del ferrocarril minero.\n\nRecorrido: Cortegana - La Corte.\n\nDistancia y Dificultad: Dificultad muy baja, ideal para un paseo familiar a pie o en bicicleta.\n\nAtractivo: El camino es llano y atraviesa paisajes de dehesa y bosques de ribera. Es una forma perfecta de disfrutar del entorno natural sin grandes esfuerzos, pasando por antiguos puentes y estaciones.\n\n🛣️ Cómo Llegar a Cortegana\n\nDesde Huelva (Capital)\nEn Coche: Toma la N-435 en dirección a Badajoz. Al llegar a la altura de Gibraleón, sigue las indicaciones de la N-435. Pasarás Jabugo y Galaroza antes de llegar a Cortegana (aprox. 1h 30min - 115 km).\n\nEn Autobús: La empresa Damas conecta Huelva con Cortegana, siendo una de las paradas principales de la línea de la sierra.\n\nDesde Sevilla\nEn Coche: Toma la A-66 (Ruta de la Plata) y luego la N-433 (salida 75) dirección Aracena/Portugal. Sigue la N-433 pasando Aracena y Galaroza hasta llegar a Cortegana (aprox. 1h 30min - 120 km).\n\nEn Autobús: Damas ofrece servicios desde Sevilla que pasan por Cortegana."
  },
  {
    "id": "5",
    "title": "Cabalgata de Reyes Magos",
    "description": "Sus Majestades los Reyes Magos de Oriente recorren las calles del pueblo repartiendo caramelos e ilusión a pequeños y mayores.",
    "town": "Zufre",
    "date": "2026-01-05",
    "category": EventCategory.CABALGATA,
    "interestInfo": "🏞️ Lugares Emblemáticos que Debes Visitar en Zufre\nConocido como el 'balcón de la sierra', Zufre se asoma de forma espectacular al embalse y ofrece uno de los conjuntos urbanos más pintorescos y mejor conservados.\n\nEl 'Paseo' o Mirador de Zufre: Un balcón natural con vistas impresionantes al embalse de Zufre y a las dehesas. Es el lugar perfecto para contemplar el atardecer y sentir la inmensidad del paisaje.\n\nAyuntamiento y Plaza de la Iglesia: El centro neurálgico del pueblo. El edificio del Ayuntamiento, con su arquitectura renacentista, y la contigua Iglesia Parroquial de la Purísima Concepción, forman un conjunto monumental de gran belleza.\n\nRecorrido por sus calles: Lo mejor de Zufre es perderse por su laberinto de calles estrechas, empinadas y encaladas. Cada rincón es una postal, con arcos, pasadizos y casas que cuelgan sobre el barranco.\n\nFuente del Concejo: Una fuente histórica de mármol que ha sido un punto de encuentro para los vecinos durante siglos.\n\n🥾 Ruta de Senderismo Sugerida: Ruta de las Riberas\nUn sendero que te sumerge en los paisajes de agua que rodean Zufre.\n\nRecorrido: Zufre - Ribera de Huelva.\n\nDistancia y Dificultad: Dificultad media, debido a algunos desniveles. La distancia puede variar según el tramo que elijas.\n\nAtractivo: La ruta desciende desde el pueblo hacia la Ribera de Huelva, atravesando dehesas y olivares. El contraste entre el pueblo encalado en lo alto y el verde de la ribera es espectacular. Es una zona de gran riqueza de flora y fauna.\n\n🛣️ Cómo Llegar a Zufre\n\nDesde Huelva (Capital)\nEn Coche: Toma la N-435 en dirección a Badajoz. Antes de llegar a Valverde del Camino, toma el desvío por la A-493 hacia La Palma del Condado y luego la A-461. Finalmente, coge la HU-7110 hasta Zufre (aprox. 1h 20min - 95 km).\n\nEn Autobús: Puede ser complicado llegar en transporte público directo. La mejor opción suele ser ir hasta Aracena con Damas y desde allí tomar un taxi.\n\nDesde Sevilla\nEn Coche: Toma la A-66 (Ruta de la Plata) dirección Mérida. Coge la salida 782 hacia Zufre/Castillo de las Guardas. Sigue la SE-185 y luego la HU-8116 que te llevará directamente al pueblo (aprox. 1h - 80 km). Esta es la ruta más directa.\n\nEn Autobús: No hay línea directa. La opción sería ir a Aracena y desde allí coordinar el transporte."
  },
  {
    "id": "6",
    "title": "Cabalgata de Almonaster la Real",
    "description": "La Cabalgata de Reyes Magos de Almonaster la Real comenzó su andadura histórica hace medio siglo. Era una Cabalgata  importante, los Reyes Magos iban a caballo, y se recogían entonces buenos regalos, normalmente en el porche de la Iglesia.\n\nComo curiosidad sobre 1986 la organizaban las Hermanas de la Providencia, junto a un grupo de personas. Entonces, todas las carrozas escenificaban pasajes de la vida de Jesús, siendo por tanto de temática bíblica.\n\nActualmente, la organiza un valiente e ilusionado grupo joven denominado Asociación Carbón Dulce, que comenzaron en 2019 su andadura con éxito tras la gran acogida del pueblo, padres y madres, y los niños como grandes protagonists.\n\nAnteriormente a este joven colectivo  fueron las madres del pueblo quiénes hicieron que la Cabalgata no desapareciera.\n\nA estos grupos y personas le ayudan de forma importante el Ayuntamiento de Almonaster y algunas empresas del municipio como las vinculadas con el sector minero.\n\nEl cortejo se compone de varias carrozas, durante estos últimos años en torno a seis, destacando los tronos de los tres Reyes Magos y el resto son de fantasía y animación que cada año van cambiando de temática.\n\nLa Cabalgata de Almonaster sale a las 18 horas desde el Polígono Industrial.\n\nSeguidamente, baja por el callejón de Carmona, llega a la plaza del Ayuntamiento, avanza por El Barrio hasta llegar a la Iglesia donde se realiza una ofrenda al Niño Jesús. Destacar que durante el recorrido la cabalgata es animada por una charanga.\n\nEl cortejo sigue de nuevo hacia la céntrica plaza donde se ubica el Ayuntamiento de Almonaster la Real, y allí se colocan  los Reyes Magos en sus tronos. A continuación, todos los niños del pueblo y presentes son recibidos por SS.MM para entregarles algún obsequio.\n\nComo curiosidad Almonaster la Real es el pueblo de Huelva con un mayor número de aldeas y además de la propia de Almonaster en muchas de ellas existen también Cabalgatas  (cuya salida suele ser el mismo día 5 por la tarde temprano) y otros actos típicos de la Navidad.",
    "town": "Almonaster la Real",
    "date": "2026-01-05",
    "category": EventCategory.CABALGATA,
    "interestInfo": "🏞️ Lugares Emblemáticos que Debes Visitar en Almonaster la Real\nAlmonaster la Real es un pueblo con una profunda herencia andalusí, declarado Conjunto Histórico-Artístico, que te transportará a otra época.\n\nMezquita del Castillo: La joya de Almonaster. Una mezquita rural del siglo X, increíblemente bien conservada, que se erige en la cima del cerro del Castillo. Es un lugar mágico, lleno de paz e historia, con vistas espectaculares.\n\nIglesia Parroquial de San Martín: Un templo gótico-mudéjar con una impresionante portada manuelina, única en la provincia de Huelva, que refleja la influencia portuguesa en la zona.\n\nPuente de las Tres Fuentes: Un puente romano que formaba parte de una antigua calzada. Un rincón con encanto a las afueras del pueblo.\n\nTenerías y Ermita de Santa Eulalia: Descubre las antiguas tenerías donde se curtía el cuero y visita la ermita, que acoge una popular romería.\n\n🥾 Ruta de Senderismo Sugerida: Subida al Cerro de San Cristóbal\nUn ascenso que te recompensará con las mejores vistas de la comarca.\n\nRecorrido: Almonaster - Cima del Cerro de San Cristóbal.\n\nDistancia y Dificultad: Unos 6 km (ida y vuelta), de dificultad media por la pendiente.\n\nAtractivo: Es el punto más alto de la provincia de Huelva. Desde la cima, en días claros, se puede ver hasta el mar. El camino atraviesa bosques de castaños y alcornoques, y el esfuerzo de la subida merece totalmente la pena.\n\n🛣️ Cómo Llegar a Almonaster la Real\n\nDesde Huelva (Capital)\nEn Coche: Toma la N-435 en dirección a Badajoz. Pasarás por Jabugo y Galaroza. Poco después de Cortegana, encontrarás el desvío hacia Almonaster (aprox. 1h 35min - 120 km).\n\nEn Autobús: La empresa Damas tiene líneas que paran en Almonaster, aunque la frecuencia puede ser limitada.\n\nDesde Sevilla\nEn Coche: Coge la A-66 (Ruta de la Plata) y luego la N-433 (salida 75) dirección Aracena/Portugal. Sigue por la N-433 hasta después de Cortegana, donde verás el desvío a Almonaster (aprox. 1h 40min - 130 km).\n\nEn Autobús: Damas ofrece servicios desde Sevilla, pero puede requerir transbordo."
  },
  {
    "id": "7",
    "title": "Cabalgata de Alájar",
    "description": "La Cabalgata de Reyes Magos de Alájar tiene sus origines en la década de los años 60 del pasado siglo XX. La organizaron, entonces, Eligio Martín, sargento de la Guardia Civil y un grupo de jóvenes de Acción Católica, junto con Manuel Delgado, párroco en ese momento de Alájar.\n\nLa primera cabalgata tuvo un gran éxito, saliendo del Chalet de las Monjas. Pasaron por la calle Arias Montano hasta llegar a la céntrica Plaza de España, donde se ubica hoy el Ayuntamiento y a cuyas puertas, en una especie de dosel, repartieron los juguetes.\n\nLa comitiva de entonces la abría un grupo de caballistas, seguido de un remolque o carro con la Estrella de Guía (Angélica Valera). Además, hubo personas a pie que formaron grupos de pastores o tunas cantando villancicos y las típicas canciones navideñas. También un rebaño de ovejas y un camión de Elías Valera con el nacimiento (San José fue Esteban Valera y la Virgen Isabel Fernández). Los Reyes fueron a caballo y estuvieron representados por los vecinos Eligio Martín, Pedro de los Reyes y Elías Valera. Iban intercalados en la comitiva junto a un grupo de caballistas y personas a pie.\n\nEl segundo año la lluvia deslució la cabalgata y hubo que repartir los juguetes a los niños en el antiguo Bar de Sancho (actual Mesón El Corcho).\n\nComo en otros pueblos la Cabalgata de Alájar quedó interrumpida. Su reactivación a principios de los años 80 del pasado siglo. Y desde entonces siempre ha habido Cabalgata.\n\nEn la actualidad cuenta con 7 carrozas, las más conocidas de estilo clásico, aunque hay años donde se cambia de temática, participando en varios de sus montajes algunas Asociaciones y Hermandades del municipio.\n\nGeneralmente, la comitiva la abre una Banda de Música o una Charanga, amenizando así el ambiente navideño.\n\nEsta comitiva, es organizada por los miembros de la Asociación Cultural Arias Montano (Cabalgata de Reyes Magos de Alájar), Asociaciones, Hermandades, el Excelentísimo Ayuntamiento de Alájar y diferentes vecinas y vecinos de la localidad, diseñando y montando así las diversas carrozas.\n\nSu salida es a las 8 de la tarde desde el Pabellón Municipal. La entrega de regalos se realiza en la Parroquia de San Marcos. Se financia gracias a las aportaciones y colaboración del pueblo a través de la iniciativa del colectivo cultural. El Ayuntamiento ayuda económicamente y colabora cediendo el lugar donde se ubican y preparan las carrozas, además del personal necesario.",
    "town": "Alájar",
    "date": "2026-01-05",
    "category": EventCategory.CABALGATA,
    "interestInfo": "🏞️ Lugares Emblemáticos que Debes Visitar en Alájar\nAlájar, uno de los pueblos con más encanto de la sierra, te invita a descubrir su patrimonio natural y cultural.\n\nPeña de Arias Montano: Un monumento natural y lugar de peregrinación que ofrece vistas panorámicas espectaculares de la sierra. Alberga la Ermita de Nuestra Señora de los Ángeles y la Cátedra de San Victor.\n\nMonumento Natural de Alájar: Un enclave de gran valor geológico y paisajístico, ideal para los amantes de la naturaleza.\n\nIglesia de San Marcos: Templo parroquial de estilo barroco situado en el corazón del pueblo, en la Plaza de España.\n\nErmita de la Reina de los Ángeles: Un lugar de devoción y belleza, centro de la romería más famosa de la comarca.\n\n🥾 Ruta de Senderismo Sugerida: Sendero Alájar - Linares de la Sierra\nUna ruta clásica que conecta dos de los pueblos más pintorescos de la Sierra.\n\nRecorrido: Alájar – Linares de la Sierra (circular o lineal).\n\nDistancia y Dificultad: Aproximadamente 10 km (ida y vuelta), de dificultad baja-media, ideal para una mañana.\n\nAtractivo: El camino discurre por senderos empedrados, dehesas y bosques de castaños y alcornoques. Es una oportunidad única para disfrutar del paisaje serrano y la arquitectura tradicional de sus pueblos.\n\n🛣️ Cómo Llegar a Alájar\n\nDesde Huelva (Capital)\nEn Coche: Toma la N-435 dirección Badajoz, y después de pasar por la zona minera, toma el desvío hacia Aracena. Desde Aracena, sigue las indicaciones hacia Alájar por la HU-8121 (aprox. 1h 20min - 100 km).\n\nEn Autobús: La empresa Damas ofrece servicios que conectan Huelva con los pueblos de la sierra. Puede ser necesario hacer transbordo en Aracena.\n\nDesde Sevilla\nEn Coche: Toma la A-66 (Ruta de la Plata) dirección Mérida y sal en la salida 75 hacia Aracena por la N-433. Una vez pasado Aracena, encontrarás el desvío hacia Alájar (aprox. 1h 20min - 105 km).\n\nEn Autobús: Damas también conecta Sevilla con Aracena, desde donde se puede tomar un bus de enlace o taxi hasta Alájar."
  },
  {
    "id": "8",
    "title": "Belén Viviente de Puerto Moral",
    "description": "El Belén Viviente de Puerto Moral es una de las tradiciones navideñas más emblemáticas de la Sierra de Aracena y la provincia de Huelva, destacando tanto por su belleza escénica como por la implicación de toda la comunidad local.\n\nHistoria y evolución\nEsta celebración nació en 2011 como iniciativa del Ayuntamiento de Puerto Moral y la colaboración altruista de sus vecinos. Desde sus inicios, el Belén Viviente se pensó como una recreación fiel de la aldea de Belén durante el nacimiento de Jesús, combinando escenas bíblicas con representaciones costumbristas de antiguos oficios, aportando así un marcado carácter serrano al evento. La primera edición se realizó en el Jardín Botánico Los Nogales, aunque en la actualidad la escenificación se sitúa en el Área Recreativa ‘Barranco La Madrona’ y el Molino de Rodezno, entornos naturales que realzan la puesta en escena.\nCada familia o grupo de vecinos se encarga del montaje y representación de una escena, lo que fomenta la unión del pueblo y el mantenimiento de las tradiciones. Entre las representaciones más típicas se encuentran la quesería, las lavanderas, el huerto, la zapatería, el taller de lanas, la carpintería y por supuesto, el portal del Nacimiento y la llegada de los Reyes Magos.\n\nCaracterísticas y ambiente\nEl evento destaca por su rigor en la ambientación y por la participación de más de 100 personas, entre figurantes y colaboradores, lo que convierte cada rincón del Barranco en una postal navideña viva y envolvente. Los visitantes pueden disfrutar de un ambiente sensorial y realista, con música, luz de candelas y degustaciones de dulces típicos y chocolate caliente. Además, la entrada es libre, aunque se aceptan donativos destinados a causas benéficas locales.​\n\nFechas y horarios 2025\nEn la edición de 2025, que marca la décimo cuarta celebración del evento, el Belén Viviente de Puerto Moral abrirá sus puertas el sábado 6 y domingo 7 de diciembre, en el horario de 17:30 a 21:00 horas, coincidiendo como cada año con el Puente de la Constitución-Inmaculada. Durante dos tardes mágicas y únicas, los asistentes podrán vivir la Navidad en el corazón de la sierra.​\n\nRelevancia y reconocimiento\nEste Belén Viviente se ha consolidado como una de las actividades navideñas más importantes y visitadas de la provincia de Huelva, superando en ocasiones las 5.000 visitas en solo dos días. La iniciativa no solo impulsa el turismo rural, sino que fortalece la convivencia y el sentido de pertenencia entre los habitantes del municipio, haciendo de Puerto Moral una cita obligada para quienes desean sumergirse en la magia y autenticidad de la Navidad serrana.\n\nFechas y horarios 2025 resumidos:\n\nSábado 6 y domingo 7 de diciembre\n\nDe 17:30 a 21:00 horas\n\nÁrea Recreativa Barranco de la Madrona, Puerto Moral (Huelva).",
    "town": "Puerto Moral",
    "date": "2025-12-06",
    "category": EventCategory.BELEN_VIVIENTE,
    "imageUrl": "https://solonet.es/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-30-at-08.00.19.jpeg",
    "interestInfo": "🏞️ Lugares Emblemáticos que Debes Visitar en Puerto Moral\nPuerto Moral es un pequeño y tranquilo pueblo serrano, un remanso de paz ideal para desconectar y disfrutar de la esencia rural de la comarca.\n\nIglesia de San Pedro y San Pablo: Un pequeño y coqueto templo de estilo mudéjar, con un característico porche porticado que es el centro de la vida social del pueblo.\n\nLavaderos Públicos: Un rincón etnográfico bien conservado que nos habla de las formas de vida tradicionales de la sierra. Están situados en un entorno natural muy agradable.\n\nEmbalse de Aracena: El pueblo se encuentra muy cerca de la cola del embalse, ofreciendo paisajes de agua y dehesa muy bonitos. Es un lugar ideal para la pesca o simplemente para pasear por sus orillas.\n\n🥾 Ruta de Senderismo Sugerida: Puerto Moral - Corteconcepción\nUn sendero que te lleva por el corazón de la dehesa serrana.\n\nRecorrido: Puerto Moral - Presa del Embalse de Aracena - Corteconcepción.\n\nDistancia y Dificultad: Dificultad baja, apta para todos los públicos.\n\nAtractivo: La ruta ofrece unas vistas espectaculares del embalse y permite caminar sobre la presa. Atraviesa dehesas donde es fácil ver cerdos ibéricos en libertad, especialmente en otoño.\n\n🛣️ Cómo Llegar a Puerto Moral\n\nDesde Huelva (Capital)\nEn Coche: Toma la N-435 dirección Badajoz. Desvíate hacia Aracena y, desde allí, toma la N-433. Pasado el cruce de Higuera de la Sierra, encontrarás el desvío hacia Puerto Moral (aprox. 1h 15min - 95 km).\n\nEn Autobús: No hay servicios directos. La mejor opción es viajar hasta Aracena con la empresa Damas y desde allí tomar un taxi.\n\nDesde Sevilla\nEn Coche: Coge la A-66 (Ruta de la Plata) y luego la N-433 (salida 75) dirección Aracena/Portugal. Unos kilómetros después de Higuera de la Sierra, verás el desvío a Puerto Moral (aprox. 1h 5min - 85 km).\n\nEn Autobús: Al igual que desde Huelva, la mejor opción es llegar a Aracena en autobús y continuar en taxi."
  },
  {
    "id": "14",
    "title": "Feria de la Castaña",
    "description": "Si hay un evento que encapsula la esencia del otoño y la riqueza natural de la Sierra de Aracena y Picos de Aroche, esa es, sin duda, la Feria de la Castaña de Fuenteheridos. Este pintoresco municipio onubense, cuyo nombre evoca sus \"fuentes frías\", se convierte cada año en el epicentro de una celebración que rinde culto a uno de sus frutos más emblemáticos y a la cultura que lo rodea.\n\n📅 Información y Actividades de la Feria\nLa Feria de la Castaña, que cuenta con una trayectoria de más de 40 años, se celebra tradicionalmente coincidiendo con el Puente de la Inmaculada y la Constitución.\n\nEs una cita ineludible que atrae a miles de visitantes con una programación rica y diversa:\n\n🌰 Mercado de Productos de la Zona: El corazón de la feria, donde podrás adquirir castañas frescas, dulces y repostería elaborada con este fruto, miel, embutidos ibéricos y una amplia gama de productos artesanales y ecológicos de la Sierra.\n\n🚶‍♀️ Rutas de Senderismo: Se organizan recorridos que invitan a sumergirse en los espectaculares castañares que rodean Fuenteheridos, ofreciendo una paleta cromática inigualable propia del otoño. Son una oportunidad perfecta para comprender la importancia histórica y económica del castaño en la comarca.\n\n🎉 Talleres y Actividades Lúdicas: El programa se completa con talleres infantiles, música en vivo, bailes, exposiciones fotográficas y actividades de gastronomía para todas las edades.\n\n🔥 Tostaderos de Castañas Populares: No puede faltar el aroma inconfundible de las castañas asándose al fuego en la Plaza del Coso, el punto de encuentro social por excelencia.\n\nLa feria es un reflejo de la riqueza cultural, gastronómica y paisajística de la Sierra de Huelva, convirtiéndose en una fuente de generación de riqueza local.",
    "town": "Fuenteheridos",
    "date": "2025-12-05",
    "category": EventCategory.FIESTA,
    "interestInfo": "🏞️ Lugares Emblemáticos que Debes Visitar en Fuenteheridos\nFuenteheridos, declarado Conjunto Histórico-Artístico, es un pueblo de postal con casas encaladas y tejados curvos. Aprovecha tu visita a la Feria para recorrer sus rincones más icónicos:\n\nFuente de los Doce Caños: Símbolo de la localidad y origen de su nombre. Se dice que cada uno de sus caños representa un mes del año. Nace aquí el río Múrtiga, siendo un importante acuífero y fuente de vida.\n\nPlaza del Coso: El centro neurálgico del pueblo y escenario principal de la Feria. Su nombre se debe a que antiguamente se celebraban corridas de toros en este lugar. Es el corazón palpitante de la vida social.\n\nIglesia Parroquial del Espíritu Santo: Un bello templo cuya construcción se inició en el siglo XVI y fue reformado tras el terremoto de Lisboa de 1755, destacando su arquitectura y su campanario de finales del siglo XVIII.\n\nPaseo de los Poetas y Nacimiento del Múrtiga: Conocido también como el antiguo \"Camino del Regaó\", un lugar de paseo y descanso junto al nacimiento del río, embellecido con cascadas y lagos artificiales.\n\nMirador de la Era la Carrera: Un punto panorámico que ofrece vistas espectaculares del casco urbano y del entorno natural circundante, ideal para capturar la belleza de la sierra.\n\n🥾 Ruta de Senderismo Sugerida: El Bosque Encantado\nTe proponemos la Ruta del Bosque Encantado, uno de los senderos más populares y bellos del Parque Natural Sierra de Aracena y Picos de Aroche.\n\nRecorrido: Fuenteheridos – Galaroza (o viceversa).\n\nDistancia y Dificultad: La ruta es de dificultad baja-media.\n\nAtractivo: El sendero discurre a través de castañares centenarios y dehesas, ofreciendo un paisaje mágico, especialmente en otoño. A lo largo del camino, te encontrarás con la flora y fauna local (cerdos ibéricos, ovejas, bellotas, setas) y puntos de interés como la antigua Casa Monteblanco (lagar de uva) y la fuente de las Cañas.\n\nConexión: Esta ruta conecta dos de los pueblos más bonitos de la Sierra. Puedes hacerla circular o aprovechar el autobús interurbano para volver al punto de partida.\n\n🛣️ Cómo Llegar a Fuenteheridos\nFuenteheridos se encuentra en el corazón de la Sierra de Aracena, bien comunicado con las principales capitales cercanas.\n\nDesde Huelva (Capital)\nEn Coche: La forma más rápida es a través de la N-435 (dirección Badajoz) hasta la Cuenca Minera (Riotinto - Campofrio), para luego tomar dirección Aracena. Desde Aracena, sigue la N-433 y la HU-8120 hasta Fuenteheridos (aprox. 1h 25min - 106 km).\n\nEn Transporte Público: Puedes tomar el tren Huelva-Zafra (RENFE) hasta la estación de Jabugo-Galaroza (El Repilado), que se encuentra a unos 10 km de Fuenteheridos, y desde allí tomar un taxi o un autobús de enlace. También hay líneas de autobús (Damas) con transbordo, por ejemplo, en Galaroza.\n\nDesde Sevilla\nEn Coche: Toma la autovía A-66 (Ruta de la Plata) y luego la N-433 (Sevilla-Lisboa) a la altura de la Pañoleta/Aracena. Sigue esta carretera, pasando Aracena, hasta encontrar el desvío hacia Fuenteheridos (aprox. 1h 15min - 100 km).\n\nEn Autobús: La empresa Damas ofrece servicios directos desde la Estación de Autobuses Plaza de Armas de Sevilla a Fuenteheridos, con una duración aproximada de 1h 55min.\n\nDesde Extremadura (Badajoz/Zafra)\nEn Coche: Lo más directo es tomar la N-435 en dirección a Huelva, o la N-433 que pasa por Zafra, en dirección a Sevilla, que te llevará directamente a la Sierra de Aracena.\n\nEn Tren: La línea de tren Zafra-Huelva tiene parada en la estación de Jabugo-Galaroza (El Repilado), la más cercana a Fuenteheridos (a 10 km).\n\nEn Autobús: La empresa Damas (o líneas con transbordo) comunica la zona. Es posible que debas bajarte en Galaroza o Aracena y tomar un bus de enlace o taxi."
  },
  {
    "id": "15",
    "title": "Migas Solidarias de La Umbría",
    "description": "Las Migas Solidarias de La Umbría, pedanía de Aracena en Huelva, son una tradición gastronómica y benéfica que reúne cada año a centenares de personas durante el Puente de la Constitución, en un acto que combina la solidaridad con la cultura serrana.​\n\nHistoria y sentido solidario\nEsta actividad se celebra de forma ininterrumpida desde 1999, cuando la Asociación Cultural 'El Pilar' de La Umbría ideó reunir a vecinos y visitantes en torno a uno de los platos más tradicionales de la Sierra de Aracena: las migas. Año tras año, el evento se ha consolidado, constituyéndose en referente festivo y solidario no solo de la comarca sino de toda la provincia de Huelva. La recaudación, obtenida a precios populares por la venta de migas, productos ibéricos y dulces caseros, se destina a diversas causas sociales y necesidades de la propia aldea, simbolizando la unión y el compromiso de los vecinos.​\n\nDesarrollo y ambiente\nEl día de las Migas Solidarias la aldea de La Umbría se transforma por completo. El evento tiene lugar en el Pabellón Cubierto de la aldea, ubicado junto a la iglesia mudéjar de Nuestra Señora de la Antigua, lo que permite su celebración independientemente de la meteorología. Voluntarios y vecinos se encargan de la elaboración de las migas, acompañadas tradicionalmente por sardinas asadas, caldereta, pruebas de chorizo, jamón ibérico y vinos del condado, así como dulces caseros y una popular tómbola para los asistentes.​\n\nLa atmósfera está marcada por la hospitalidad, la convivencia entre vecinos y forasteros, y la satisfacción de contribuir a una causa solidaria. Además, el Ayuntamiento de Aracena suele habilitar un servicio especial de autobuses lanzadera que conecta la localidad principal con la pedanía para evitar colapsos de tráfico.​\n\nFechas y horarios 2025\nLa próxima edición —que en 2025 mantendrá el espíritu de sus más de 25 años de historia— se celebrará el domingo 7 de diciembre a partir de las 12:00 del mediodía, en el Pabellón Cubierto de La Umbría. El servicio de transporte gratuito funcionará durante toda la jornada hasta las 18:00 horas.​\n\nResumen de fechas y horarios 2025:\n\nDomingo 7 de diciembre\n\nDesde las 12:00 hasta agotar existencias\n\nPabellón Cubierto de La Umbría, Aracena\n\nServicio de autobuses gratuito entre Aracena y La Umbría, de 12:00 a 18:00 h.",
    "town": "Aracena",
    "date": "2025-12-07",
    "category": EventCategory.OTRO,
    "imageUrl": "https://solonet.es/wp-content/uploads/2025/10/AGENDA-TURISTEANDO-ALAJAR-4-Rafael-Caballero-Vazquez.png",
    "interestInfo": "🏞️ Lugares Emblemáticos que Debes Visitar en Aracena\nAracena es la capital de la comarca y un centro neurálgico que combina patrimonio, naturaleza y gastronomía.\n\nGruta de las Maravillas: Una de las cuevas turísticas más espectaculares de España. Un viaje subterráneo a través de lagos y formaciones calcáreas que te dejará sin palabras. ¡Imprescindible reservar con antelación!\n\nCastillo de Aracena e Iglesia Prioral: Domina el pueblo desde su cerro. Pasea por las murallas del castillo fortaleza y visita la iglesia gótico-mudéjar, el templo más antiguo y emblemático de la localidad.\n\nMuseo del Jamón: Un centro de interpretación dedicado al producto estrella de la sierra. Descubre todo el proceso de elaboración del jamón ibérico de bellota, desde la dehesa hasta tu plato.\n\nPlaza Alta y Plaza Marqués de Aracena: El corazón social y arquitectónico de la ciudad, con edificios modernistas como el Casino de Arias Montano y el Ayuntamiento.\n\n🥾 Ruta de Senderismo Sugerida: Aracena - Linares de la Sierra\nUna de las rutas más clásicas y bellas de la comarca.\n\nRecorrido: Aracena – Linares de la Sierra (lineal).\n\nDistancia y Dificultad: Unos 5 km (solo ida), de dificultad baja. Ideal para hacer en una mañana y comer en Linares.\n\nAtractivo: El camino, conocido como 'el camino de las pedrizas', es un antiguo sendero empedrado que serpentea entre dehesas de encinas y alcornoques, muros de piedra y arroyos. El paisaje es puramente serrano.\n\nConexión: Puedes volver por el mismo camino o coordinar un taxi para el regreso.\n\n🛣️ Cómo Llegar a Aracena\n\nDesde Huelva (Capital)\nEn Coche: La ruta más común es por la N-435 en dirección a Badajoz. Tras pasar la zona minera, encontrarás las indicaciones para tomar la carretera hacia Aracena (aprox. 1h 15min - 100 km).\n\nEn Autobús: La empresa Damas ofrece conexiones directas y frecuentes desde Huelva.\n\nDesde Sevilla\nEn Coche: Toma la autovía A-66 (Ruta de la Plata) dirección Mérida y coge la salida 75 hacia la N-433 (dirección Portugal). Sigue esta carretera y te llevará directamente a Aracena (aprox. 1h 10min - 90 km).\n\nEn Autobús: Damas ofrece servicios directos desde la Estación de Autobuses Plaza de Armas de Sevilla."
  },
  {
    "id": "16",
    "title": "Belén Viviente de Galaroza",
    "description": `Galaroza Ilumina la Navidad con su Belén Viviente: Una Tradición que Renace en el Cerro de Santa Brígida

Galaroza, un pintoresco pueblo en el corazón de la Sierra de Huelva, se prepara una vez más para transportarnos al pasado con la celebración de su Belén Viviente. Más que una simple representación, este evento es un conmovedor tributo a la historia y la fe, que cada año atrae a visitantes de todas partes para experimentar la magia de la Navidad de una manera única.

Un Viaje a las Raíces del Belén Viviente

La tradición de los belenes vivientes, o "pesebres vivientes", tiene sus raíces en la Europa medieval, con San Francisco de Asís siendo uno de los pioneros al organizar la primera representación de este tipo en la Navidad de 1223 en Greccio, Italia. Su objetivo era acercar la historia del nacimiento de Jesús a la gente común de una manera tangible y emocional. Desde entonces, la práctica se extendió por todo el continente, adaptándose a las costumbres y paisajes locales. En España, los belenes vivientes han florecido en diversas regiones, y Galaroza ha sabido infundirle su propio espíritu y encanto, convirtiéndolo en un evento emblemático de la Sierra de Huelva.

El Cerro de Santa Brígida: Un Escenario Natural de Inigualable Belleza

Lo que distingue al Belén Viviente de Galaroza es, sin duda, su espectacular ubicación: el Cerro de Santa Brígida. Este enclave natural, que domina el paisaje de Galaroza, ofrece un telón de fondo incomparable para recrear la Judea de hace más de dos mil años. Las laderas del cerro, con su vegetación autóctona y sus vistas panorámicas, se transforman en las calles de Belén, el portal, el mercado, los oficios tradicionales y los campos de pastores. La topografía del terreno y la iluminación cuidadosamente diseñada crean una atmósfera mágica y envolvente, donde cada rincón cuenta una historia y cada personaje cobra vida con una autenticidad asombrosa. Pasear por el Cerro de Santa Brígida durante la representación es como hacer un verdadero viaje en el tiempo, sumergiéndose en la esencia de la Navidad.

Galaroza 2025: Un Belén Viviente que Cobra Vida de Nuevo

Según el cartel anunciador, Galaroza se prepara para recibir nuevamente a sus visitantes en el Belén Viviente 2025. Los detalles clave para no perderse esta experiencia son los siguientes:

Horario: El Belén estará abierto al público de 18:30 a 20:30 horas.

Días de Realización: Podrá disfrutarse los días 6, 7, 8, 13, 14, 20, 21, 27 y 28 de diciembre.

Lugar: Como ya es tradición, la representación tendrá lugar en el emblemático Cerro de Santa Brígida.

El Belén Viviente de Galaroza es una cita ineludible para quienes buscan una experiencia navideña auténtica y profundamente arraigada en la cultura y la tradición. Una oportunidad perfecta para disfrutar en familia, redescubrir la historia de la Navidad y maravillarse con la belleza de un pueblo que sabe mantener vivas sus costumbres.

Si estás planeando una escapada navideña, el Belén Viviente de Galaroza en el Cerro de Santa Brígida es una parada obligatoria. ¡Te esperamos para vivir la magia!`,
    "town": "Galaroza",
    "date": "2025-12-06",
    "category": EventCategory.BELEN_VIVIENTE,
    "imageUrl": "https://solonet.es/wp-content/uploads/2025/11/BELEN-GALAROZA.jpg",
    "interestInfo": `🏞️ Lugares Emblemáticos que Debes Visitar en Galaroza
Conocido como el "Valle del Agua" por la Ribera de Múrtiga que lo atraviesa, Galaroza es un pueblo lleno de vida, agua y tradiciones.

Iglesia Parroquial de la Purísima Concepción: Un imponente templo del siglo XVII que domina el centro del pueblo, con una torre barroca y un valioso patrimonio artístico en su interior.

Ermita de Santa Brígida: Situada en el cerro que acoge el Belén Viviente, esta ermita del siglo XIV es un lugar de gran devoción local y un mirador natural excepcional.

Paseo del Carmen y Fuente de Nuestra Señora del Carmen: El corazón social de Galaroza, un paseo arbolado junto a una fuente-monumento de Aníbal González (arquitecto de la Plaza de España de Sevilla). Un lugar perfecto para relajarse.

Arquitectura del Agua: No te pierdas sus numerosas fuentes, pilares y lavaderos que salpican las calles, testimonio de la importancia del agua en la vida del pueblo.

🥾 Ruta de Senderismo Sugerida: Galaroza - Fuenteheridos (Ruta de las Cuestecillas)
Un sendero que te sumerge en el corazón del Parque Natural.

Recorrido: Galaroza – Fuenteheridos (lineal).

Distancia y Dificultad: Aproximadamente 3 km (solo ida), de dificultad baja. Ideal para un paseo tranquilo.

Atractivo: La ruta discurre entre huertas, castañares y dehesas, siguiendo en parte el curso de la Ribera de Múrtiga. Es un camino lleno de encanto que conecta dos de los pueblos más emblemáticos de la sierra.

Conexión: Puedes volver por el mismo camino o continuar hacia otros senderos de la red del parque.

🛣️ Cómo Llegar a Galaroza

Desde Huelva (Capital)
En Coche: Toma la N-435 en dirección a Badajoz. Al llegar a la altura de Gibraleón, sigue las indicaciones de la N-435. Pasarás Jabugo antes de llegar a Galaroza (aprox. 1h 25min - 110 km).

En Autobús: La empresa Damas conecta Huelva con Galaroza, siendo una de las paradas principales de la línea de la sierra.

Desde Sevilla
En Coche: Toma la A-66 (Ruta de la Plata) y luego la N-433 (salida 75) dirección Aracena/Portugal. Sigue la N-433 pasando Aracena hasta llegar a Galaroza (aprox. 1h 25min - 115 km).

En Autobús: Damas ofrece servicios desde Sevilla que pasan por Galaroza.`
  },
  {
    "id": "17",
    "title": "Los Rehiletes de Aracena",
    "description": "En el corazón de la Sierra de Aracena, Huelva, justo en la víspera de la festividad de la Inmaculada Concepción, el calendario se detiene y la noche se ilumina con una de las tradiciones más espectaculares y queridas por sus habitantes: La Noche de los Rehiletes. Más que una simple celebración, es un ritual purificador, un cierre de ciclo agrícola y una fascinante muestra de la cultura serrana.\n\n📜 Historia y Simbología: El Triángulo de la Tradición\nEl origen exacto de los Rehiletes se pierde en la bruma del tiempo, lo que añade un aura de misterio y arraigo a la fiesta. Sin embargo, tres pilares fundamentales se entrelazan para dar sentido a esta ancestral celebración:\n\nEl Cierre del Ciclo Agrícola: La fiesta está íntimamente ligada al castañar, el motor económico y paisajístico de la Sierra. El 7 de diciembre marca, tradicionalmente, el final de la cosecha de la castaña y la caída masiva de la hoja. La quema del rehilete, compuesto por estas hojas secas, se interpreta como un acto de \"limpieza\" del campo, permitiendo que la tierra descanse y se prepare para las lluvias invernales.\n\nEl Fuego Purificador (Pagano): En la mayoría de las culturas, el fuego es un elemento de purificación y renovación. Quemar los rehiletes en grandes candelas (hogueras) en cada barrio es un rito ancestral para alejar los malos espíritus, purificar el año que termina y dar la bienvenida a la etapa siguiente con energías renovadas.\n\nLa Víspera Religiosa: La celebración ocurre la tarde-noche del 7 de diciembre, justo antes de la festividad de la Purísima Concepción o \"La Pura\" (8 de diciembre). Esta cercanía alude a la luz y la pureza del fuego en contraposición a las tinieblas de la noche, mezclando el carácter popular y pagano con la tradición cristiana.\n\n🔥 ¿Qué son exactamente los Rehiletes?\nEl protagonista absoluto de la noche es el Rehilete. No es una antorcha cualquiera, sino una ingeniosa y sencilla creación artesanal:\n\nComposición: Se elabora ensartando y prensando las hojas secas de los castaños en una fina vara de olivo.\n\nEl Sello: En el extremo, se utiliza una castaña o a veces un trozo de corcho para sellar y sujetar firmemente la ristra de hojas.\n\nEl ritual es sencillo y emocionante: se prende fuego al rehilete en las grandes candelas de barrio y, con un movimiento circular del brazo, se hace girar en el aire. La combinación de las hojas secas y el giro produce un efecto visual hipnótico: una estela de fuego y miles de chispas rojas y doradas que \"dibujan\" círculos y espirales en la oscuridad de la noche serrana.\n\nCuriosidad: Los días previos al 7 de diciembre, los niños y niñas de Aracena salen al castañar con sus varas de olivo para recoger y confeccionar personalmente sus propios rehiletes. Este acto, el de su fabricación, ya es parte del ceremonial.\n\n🌰 La Gastronomía de la Noche\nLa Noche de los Rehiletes es también una noche de intensa convivencia social y gastronomía serrana que se disfruta al calor de las brasas:\n\nEl Tostón de Castañas: El producto estrella de la noche. Las castañas se asan en grandes tostaós sobre las brasas de las candelas. A menudo, se organiza un Tostón Solidario de Castañas para recaudar fondos para causas sociales.\n\nSabor Ibérico: El fuego de las candelas se aprovecha para asar carnes ibéricas (chorizos, lomos, presa) de la excelente calidad que caracteriza a la Sierra.\n\nAcompañamiento: Todo esto se riega con el tradicional mosto serrano de la zona y se endulza con los buñuelos y dulces típicos de las asociaciones de mujeres del municipio.\n\nUn consejo experto: Vístase con ropa de abrigo, ya que las noches de diciembre en la Sierra son frías, pero ¡no olvide la calidez de las hogueras y la gente de Aracena le harán olvidarse del frío!",
    "town": "Aracena",
    "date": "2025-12-07",
    "category": EventCategory.OTRO,
    "imageUrl": "https://solonet.es/wp-content/uploads/2025/11/AGENDA-TURISTEANDO-ALAJAR-1-Rafael-Caballero-Vazquez.png",
    "interestInfo": "🏞️ Lugares Emblemáticos que Debes Visitar en Aracena\nAracena es la capital de la comarca y un centro neurálgico que combina patrimonio, naturaleza y gastronomía.\n\nGruta de las Maravillas: Una de las cuevas turísticas más espectaculares de España. Un viaje subterráneo a través de lagos y formaciones calcáreas que te dejará sin palabras. ¡Imprescindible reservar con antelación!\n\nCastillo de Aracena e Iglesia Prioral: Domina el pueblo desde su cerro. Pasea por las murallas del castillo fortaleza y visita la iglesia gótico-mudéjar, el templo más antiguo y emblemático de la localidad.\n\nMuseo del Jamón: Un centro de interpretación dedicado al producto estrella de la sierra. Descubre todo el proceso de elaboración del jamón ibérico de bellota, desde la dehesa hasta tu plato.\n\nPlaza Alta y Plaza Marqués de Aracena: El corazón social y arquitectónico de la ciudad, con edificios modernistas como el Casino de Arias Montano y el Ayuntamiento.\n\n🥾 Ruta de Senderismo Sugerida: Aracena - Linares de la Sierra\nUna de las rutas más clásicas y bellas de la comarca.\n\nRecorrido: Aracena – Linares de la Sierra (lineal).\n\nDistancia y Dificultad: Unos 5 km (solo ida), de dificultad baja. Ideal para hacer en una mañana y comer en Linares.\n\nAtractivo: El camino, conocido como 'el camino de las pedrizas', es un antiguo sendero empedrado que serpentea entre dehesas de encinas y alcornoques, muros de piedra y arroyos. El paisaje es puramente serrano.\n\nConexión: Puedes volver por el mismo camino o coordinar un taxi para el regreso.\n\n🛣️ Cómo Llegar a Aracena\n\nDesde Huelva (Capital)\nEn Coche: La ruta más común es por la N-435 en dirección a Badajoz. Tras pasar la zona minera, encontrarás las indicaciones para tomar la carretera hacia Aracena (aprox. 1h 15min - 100 km).\n\nEn Autobús: La empresa Damas ofrece conexiones directas y frecuentes desde Huelva.\n\nDesde Sevilla\nEn Coche: Toma la autovía A-66 (Ruta de la Plata) dirección Mérida y coge la salida 75 hacia la N-433 (dirección Portugal). Sigue esta carretera y te llevará directamente a Aracena (aprox. 1h 10min - 90 km).\n\nEn Autobús: Damas ofrece servicios directos desde la Estación de Autobuses Plaza de Armas de Sevilla."
  },
  {
    "id": "18",
    "title": "Saborea Cumbres Mayores",
    "description": "Cumbres Mayores: Donde la Tradición se Saborea\nCumbres Mayores, un pintoresco municipio en el corazón de la Sierra de Huelva, es célebre no solo por su imponente castillo medieval, sino también por ser cuna de una arraigada cultura gastronómica que tiene en el cerdo ibérico a su máximo exponente. Desde tiempos inmemoriales, la vida en Cumbres Mayores ha estado ligada al ciclo de la dehesa y a la maestría en la elaboración de productos curados, transmitida de generación en generación.\n\nEsta profunda conexión con sus raíces culinarias dio origen a un evento que hoy es referente en el calendario gastronómico andaluz: \"Saborea Cumbres Mayores\". Lo que comenzó como una iniciativa local para destacar y promover la calidad de sus productos, especialmente los derivados del cerdo ibérico de bellota, ha evolucionado hasta convertirse en una feria consolidada que atrae a miles de visitantes cada año. Es un reflejo de la pasión y el orgullo de un pueblo por su patrimonio, que se ha sabido mantener y potenciar a lo largo del tiempo.\n\nUn Festín para los Sentidos: Actividades de la Feria\n\"Saborea Cumbres Mayores\" es mucho más que una feria gastronómica; es una experiencia completa que celebra la cultura, la historia y, por supuesto, el inigualable sabor de la Sierra. A lo largo de sus jornadas, los asistentes pueden disfrutar de un variado programa de actividades diseñadas para deleitar y educar:\n\nDegustaciones y Mercado de Productos Locales: El corazón de la feria. Aquí, productores locales ofrecen sus exquisitos jamones, paletas, embutidos y quesos, permitiendo a los visitantes probar y adquirir directamente estas joyas gastronómicas. Es una oportunidad única para conocer de cerca la calidad y el mimo con el que se elaboran.\n\nTalleres y Demostraciones Culinarias: Chefs y maestros cortadores de jamón comparten sus secretos, enseñando a los asistentes las técnicas de corte perfecto y las mejores formas de disfrutar los productos ibéricos. También se suelen impartir talleres sobre elaboración artesanal de embutidos y otros productos típicos.\n\nCatas Dirigidas: Expertos guían a los participantes a través de catas de jamón, vino y aceite de oliva de la región, ayudándoles a apreciar los matices y la complejidad de estos productos.\n\nActividades Culturales y Artesanales: La feria se complementa con exposiciones de artesanía local, demostraciones de oficios tradicionales y actuaciones musicales y folclóricas, que enriquecen la experiencia y muestran la riqueza cultural de Cumbres Mayores.\n\nRutas Gastronómicas y Turísticas: Se organizan paseos y visitas guiadas por el pueblo y sus alrededores, incluyendo el castillo y las bodegas y secaderos, para que los visitantes puedan sumergirse completamente en el entorno y el proceso de producción.\n\nEste año, la XIV FERIA CULTURAL Y GASTRONÓMICA \"SABOREA CUMBRES MAYORES\" tendrá lugar del 5 al 8 de Diciembre. ¡No te pierdas esta fantástica oportunidad de sumergirte en la tradición y el sabor de la Sierra de Huelva!",
    "town": "Cumbres Mayores",
    "date": "2025-12-05",
    "category": EventCategory.OTRO,
    "imageUrl": "https://solonet.es/wp-content/uploads/2025/11/AGENDA-TURISTEANDO-ALAJAR-2-Rafael-Caballero-Vazquez.png",
    "interestInfo": "🏞️ Lugares Emblemáticos que Debes Visitar en Cumbres Mayores\nDominado por su imponente castillo, Cumbres Mayores es un pueblo con un rico patrimonio histórico y gastronómico.\n\nCastillo de Sancho IV: Una impresionante fortaleza del siglo XIII, declarada Monumento Nacional. Sus murallas y torres ofrecen un viaje al pasado y unas vistas espectaculares de las dehesas circundantes. Es uno de los castillos más importantes de la comarca.\n\nIglesia de San Miguel Arcángel: Un templo de origen gótico-mudéjar que destaca por su robusta torre y sus valiosas obras de arte sacro en el interior.\n\nConvento de las Clarisas (Nuestra Señora de las Llagas): Un convento de clausura del siglo XVII, un remanso de paz con una bella iglesia barroca.\n\nErmitas: No dejes de visitar la Ermita de Nuestra Señora del Amparo y la Ermita de la Candelaria, centros de devoción local situados en parajes con encanto.\n\n🥾 Ruta de Senderismo Sugerida: Ruta de la Ribera del Sillo\nUn sendero que te conecta con el paisaje de agua y dehesa.\n\nRecorrido: Cumbres Mayores - Ribera del Sillo (circular).\n\nDistancia y Dificultad: Dificultad baja-media, ideal para disfrutar de la naturaleza en una mañana.\n\nAtractivo: La ruta sigue el curso de la Ribera del Sillo, donde podrás ver antiguos molinos harineros y un paisaje de bosque de ribera y dehesas. Es una zona de gran valor ecológico.\n\n🛣️ Cómo Llegar a Cumbres Mayores\n\nDesde Huelva (Capital)\nEn Coche: Toma la N-435 en dirección a Badajoz. Tras pasar Jabugo y Cortegana, toma la A-470 en dirección a Cumbres Mayores (aprox. 1h 50min - 140 km).\n\nEn Autobús: La empresa Damas conecta Huelva con la sierra. Puede ser necesario hacer transbordo en Aracena o Cortegana.\n\nDesde Sevilla\nEn Coche: Toma la A-66 (Ruta de la Plata) dirección Mérida. Coge la salida 722 hacia Santa Olalla del Cala y luego sigue la A-434 y la HU-9123 que te llevarán directamente a Cumbres Mayores (aprox. 1h 30min - 120 km). Es la ruta más directa y rápida.\n\nEn Autobús: No hay línea directa. La opción sería ir a Aracena y desde allí coordinar el transporte o buscar líneas interurbanas."
  },
  {
    "id": "19",
    "title": "Mercado del queso artesano de Aracena",
    "description": `🧀 Aracena: La Capital del Queso Artesano en Huelva

El Mercado del Queso Artesano de Aracena se ha consolidado como una de las citas gastronómicas más importantes del calendario andaluz y un referente a nivel nacional para los amantes de este manjar. Celebrado anualmente en la encantadora localidad onubense de Aracena, en pleno corazón del Parque Natural Sierra de Aracena y Picos de Aroche, este evento es mucho más que una feria: es una celebración de la tradición, la calidad y la diversidad quesera.

Un Viaje Histórico al Sabor Tradicional
Aunque la tradición quesera en la Sierra de Huelva es ancestral, ligada intrínsecamente a la ganadería caprina y ovina, el Mercado del Queso Artesano de Aracena como evento organizado tiene una historia relativamente reciente, pero intensa y exitosa.

Surgió con la clara vocación de promocionar y valorizar el queso artesano, tanto el producido localmente como el de otras regiones de España. La Sierra de Aracena, conocida por su dehesa y sus excelentes productos derivados del cerdo ibérico, encontró en esta feria la plataforma perfecta para destacar también la calidad de sus productos lácteos, elaborados por pequeñas queserías familiares que mantienen vivos los métodos de elaboración tradicionales.

A lo largo de sus más de dos décadas de existencia (la edición de 2023 fue la XXI), el Mercado se ha convertido en una cita ineludible, celebrándose habitualmente coincidiendo con el Puente de la Inmaculada y la Constitución (diciembre). Este enclave estratégico y su creciente popularidad lo han posicionado como un auténtico escaparate de la mejor producción quesera artesanal de la geografía española.

Actividades que Dan Sabor a la Feria
El Mercado del Queso Artesano se desarrolla en el Pabellón Ferial 'Ciudad de Aracena' y se extiende durante varios días, ofreciendo a sus miles de visitantes una experiencia completa que va más allá de la simple compra.

1. Exposición y Venta de Quesos
El Corazón del Mercado: Es el principal atractivo. Reúne a más de 20 queserías procedentes de distintas comunidades autónomas de España (Andalucía, Extremadura, Baleares, Cantabria, País Vasco, etc.), ofreciendo una gama inmensa de quesos de cabra, oveja y vaca, con distintas maduraciones y elaboraciones.

Venta Directa: Los visitantes tienen la oportunidad de comprar directamente a los productores, conociendo de primera mano las historias y métodos detrás de cada queso.

Bono-Degustación: Uno de los sistemas más populares es el bono-degustación, que permite a los asistentes probar una selección de diferentes quesos a un precio asequible, facilitando el descubrimiento de nuevos sabores.

2. Talleres y Experiencias Culinarias
Taller Culinario del Queso: Se organizan talleres y showcookings con chefs y maestros queseros. Estas actividades se centran en mostrar la versatilidad del queso en la cocina y su maridaje, a menudo con la colaboración de restaurantes locales.

Demostraciones de Elaboración: Los visitantes pueden asistir a demostraciones sobre cómo se elabora el queso artesanalmente, desde la cuajada hasta el prensado.

Degustaciones Especiales: Frecuentemente se incluyen degustaciones específicas, como la de quesos con la Marca "Parque Natural de Andalucía", poniendo en valor los productos de la región.

3. Stands de Productos Complementarios y Artesanía
Productos Artesanos: Junto a los quesos, la feria acoge otros stands de productos gourmet y artesanía local, como dulces, patés ibéricos, licores, y miel, complementando la oferta gastronómica de la Sierra.

Servicio de Bar Benéfico: Es tradición que el servicio de bar esté a cargo de ONG locales, como Ibermed, destinando los beneficios a causas sociales.

4. Sorteos y Reconocimientos
Sorteo de Productos: El Mercado suele culminar con el sorteo de lotes de productos artesanos entre los participantes en las degustaciones, manteniendo el espíritu festivo hasta el final.

El Mercado del Queso Artesano de Aracena es, en definitiva, una cita obligada para el paladar que aúna tradición, cultura gastronómica y un ambiente inigualable en un entorno natural privilegiado.`,
    "town": "Aracena",
    "date": "2025-12-05",
    "category": EventCategory.OTRO,
    "imageUrl": "https://solonet.es/wp-content/uploads/2023/12/queso-aracena-2023.jpeg",
    "interestInfo": "🏞️ Lugares Emblemáticos que Debes Visitar en Aracena\nAracena es la capital de la comarca y un centro neurálgico que combina patrimonio, naturaleza y gastronomía.\n\nGruta de las Maravillas: Una de las cuevas turísticas más espectaculares de España. Un viaje subterráneo a través de lagos y formaciones calcáreas que te dejará sin palabras. ¡Imprescindible reservar con antelación!\n\nCastillo de Aracena e Iglesia Prioral: Domina el pueblo desde su cerro. Pasea por las murallas del castillo fortaleza y visita la iglesia gótico-mudéjar, el templo más antiguo y emblemático de la localidad.\n\nMuseo del Jamón: Un centro de interpretación dedicado al producto estrella de la sierra. Descubre todo el proceso de elaboración del jamón ibérico de bellota, desde la dehesa hasta tu plato.\n\nPlaza Alta y Plaza Marqués de Aracena: El corazón social y arquitectónico de la ciudad, con edificios modernistas como el Casino de Arias Montano y el Ayuntamiento.\n\n🥾 Ruta de Senderismo Sugerida: Aracena - Linares de la Sierra\nUna de las rutas más clásicas y bellas de la comarca.\n\nRecorrido: Aracena – Linares de la Sierra (lineal).\n\nDistancia y Dificultad: Unos 5 km (solo ida), de dificultad baja. Ideal para hacer en una mañana y comer en Linares.\n\nAtractivo: El camino, conocido como 'el camino de las pedrizas', es un antiguo sendero empedrado que serpentea entre dehesas de encinas y alcornoques, muros de piedra y arroyos. El paisaje es puramente serrano.\n\nConexión: Puedes volver por el mismo camino o coordinar un taxi para el regreso.\n\n🛣️ Cómo Llegar a Aracena\n\nDesde Huelva (Capital)\nEn Coche: La ruta más común es por la N-435 en dirección a Badajoz. Tras pasar la zona minera, encontrarás las indicaciones para tomar la carretera hacia Aracena (aprox. 1h 15min - 100 km).\n\nEn Autobús: La empresa Damas ofrece conexiones directas y frecuentes desde Huelva.\n\nDesde Sevilla\nEn Coche: Toma la autovía A-66 (Ruta de la Plata) dirección Mérida y coge la salida 75 hacia la N-433 (dirección Portugal). Sigue esta carretera y te llevará directamente a Aracena (aprox. 1h 10min - 90 km).\n\nEn Autobús: Damas ofrece servicios directos desde la Estación de Autobuses Plaza de Armas de Sevilla."
  }
];


const App: React.FC = () => {
  const [allEvents, setAllEvents] = React.useState<EventType[]>(() => {
    try {
      const storedEventsString = localStorage.getItem('sierra-navidad-events');

      // Si no hay eventos guardados, se usa la lista inicial.
      if (!storedEventsString) {
        return initialEventsData;
      }

      const storedEvents: EventType[] = JSON.parse(storedEventsString);

      // Se crea un mapa con los eventos iniciales para facilitar la búsqueda.
      const initialEventsMap = new Map(initialEventsData.map(e => [e.id, e]));
      
      // Se filtran los eventos guardados para mantener solo los que ha añadido el usuario (los que no están en la lista inicial).
      const userAddedEvents = storedEvents.filter(e => !initialEventsMap.has(e.id));

      // Se combinan los eventos iniciales (siempre actualizados desde el código) con los eventos añadidos por el usuario.
      const finalEvents = [...initialEventsData, ...userAddedEvents];
      
      return finalEvents;

    } catch (e) {
      console.error("Fallo al procesar eventos de localStorage, se usará la lista de eventos inicial.", e);
      return initialEventsData;
    }
  });

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);

  const [view, setView] = React.useState<'list' | 'calendar'>('list');
  const [showMapModal, setShowMapModal] = React.useState(false);
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);

  const [selectedTown, setSelectedTown] = React.useState('Todos');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [startDate, setStartDate] = React.useState<string | null>(null);
  const [endDate, setEndDate] = React.useState<string | null>(null);

  const [showAddModal, setShowAddModal] = React.useState(false);
  const [eventToEdit, setEventToEdit] = React.useState<EventType | null>(null);
  const [changeInstruction, setChangeInstruction] = React.useState<ChangeInstruction | null>(null);
  
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = React.useState(false);
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('sierra-navidad-events', JSON.stringify(allEvents));
  }, [allEvents]);

  React.useEffect(() => {
    const checkScrollTop = () => {
      const offset = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollToTop(offset > 300);
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const handleLogin = (email: string, password: string) => {
    if (email === 'admin@sierranavidad.es' && password === '123456') {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginError(null);
    } else {
      setLoginError('Email o contraseña incorrectos.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  const handleCategoryToggle = (category: EventCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    scrollToTop();
  };

  const handleCategoryFilterClick = (category: EventCategory) => {
    setView('list'); // Switch to list view
    setSelectedEventId(null); // Go back from detail view if open
    setSelectedCategories([category]); // Set only this category
    // Reset other filters for a clean search
    setSelectedTown('Todos');
    setSearchQuery('');
    setStartDate(null);
    setEndDate(null);
    // Scroll to top instantly
    window.scrollTo({ top: 0, behavior: 'auto' });
  };


  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };
  
  const sortedEvents = React.useMemo(() => {
      return [...allEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [allEvents]);


  const filteredEvents = React.useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery);
    return sortedEvents
      .filter(event => {
        const townMatch = selectedTown === 'Todos' || event.town === selectedTown;
        
        const searchMatch =
          !searchQuery ||
          normalizeText(event.title).includes(normalizedQuery) ||
          normalizeText(event.description).includes(normalizedQuery);

        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(event.category);
        
        const eventDate = new Date(event.date + 'T00:00:00');
        const startMatch = !startDate || eventDate >= new Date(startDate + 'T00:00:00');
        const endMatch = !endDate || eventDate <= new Date(endDate + 'T23:59:59');

        return townMatch && searchMatch && categoryMatch && startMatch && endMatch;
      });
  }, [sortedEvents, selectedTown, searchQuery, selectedCategories, startDate, endDate]);

  const isAnyFilterActive = React.useMemo(() => {
    return selectedTown !== 'Todos' ||
           searchQuery !== '' ||
           selectedCategories.length > 0 ||
           startDate !== null ||
           endDate !== null;
  }, [selectedTown, searchQuery, selectedCategories, startDate, endDate]);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleResetFilters = () => {
    setSelectedTown('Todos');
    setSearchQuery('');
    setSelectedCategories([]);
    setStartDate(null);
    setEndDate(null);
    scrollToTop();
  };


  const handleAddEvent = (eventData: Omit<EventType, 'id'>) => {
    const newEvent: EventType = {
      ...eventData,
      id: `evt-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setAllEvents(prev => [...prev, newEvent]);
    setShowAddModal(false);
    if (isLoggedIn) {
      setChangeInstruction({ action: 'CREATE', data: newEvent });
    }
  };

  const handleUpdateEvent = (updatedEvent: EventType) => {
    setAllEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    setEventToEdit(null);
    if (isLoggedIn) {
      setChangeInstruction({ action: 'UPDATE', data: updatedEvent });
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    const eventToDelete = allEvents.find(e => e.id === eventId);
    setAllEvents(prev => prev.filter(e => e.id !== eventId));
    setEventToEdit(null);
    if (isLoggedIn && eventToDelete) {
      setChangeInstruction({ action: 'DELETE', data: { id: eventToDelete.id } });
    }
  };

  const selectedEvent = React.useMemo(() => {
    return selectedEventId ? allEvents.find(e => e.id === selectedEventId) ?? null : null;
  }, [selectedEventId, allEvents]);
  
  const handleMapClick = () => {
      setShowMapModal(true);
  }

  const sortedTownsForFilter = React.useMemo(() => {
    const townsWithEvents = new Set(allEvents.map(event => event.town));
    
    const activeTowns = TOWNS
      .filter(town => townsWithEvents.has(town))
      .sort((a, b) => a.localeCompare(b));

    const inactiveTowns = TOWNS
      .filter(town => !townsWithEvents.has(town))
      .sort((a, b) => a.localeCompare(b));

    const result = [...activeTowns];
    if (activeTowns.length > 0 && inactiveTowns.length > 0) {
      result.push('---SEPARATOR---');
    }
    result.push(...inactiveTowns);
    
    return result;
  }, [allEvents]);

  const handleViewChange = (newView: 'list' | 'calendar') => {
    if (view !== newView) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      setView(newView);
    }
  };

  if (selectedEvent) {
    return (
      <div className="bg-slate-900 text-slate-200 min-h-screen font-sans">
        <main className="container mx-auto p-4 sm:p-8">
            <EventDetail 
              event={selectedEvent} 
              onBack={() => setSelectedEventId(null)}
              isLoggedIn={isLoggedIn}
              onEdit={() => setEventToEdit(selectedEvent)}
              onCategoryFilterClick={handleCategoryFilterClick}
            />
        </main>
        {eventToEdit && (
            <EditEventModal
                event={eventToEdit}
                onClose={() => setEventToEdit(null)}
                onUpdate={handleUpdateEvent}
                onDelete={handleDeleteEvent}
            />
        )}
      </div>
    );
  }

  const renderContent = () => {
    switch(view) {
        case 'list':
            return <EventList events={filteredEvents} onSelectEvent={setSelectedEventId} isLoggedIn={isLoggedIn} onEdit={setEventToEdit} onResetFilters={handleResetFilters} onCategoryFilterClick={handleCategoryFilterClick} isAnyFilterActive={isAnyFilterActive} />;
        case 'calendar':
            return <EventCalendar events={filteredEvents} onSelectEvent={setSelectedEventId} isLoggedIn={isLoggedIn} onEdit={setEventToEdit} />;
        default:
            return null;
    }
  }

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen font-sans flex flex-col">
      <Header
        view={view}
        setView={handleViewChange}
        isMapVisible={showMapModal}
        onMapClick={handleMapClick}
        isLoggedIn={isLoggedIn}
        onAddEventClick={() => setShowAddModal(true)}
      />
      <main className="container mx-auto flex-grow p-4">
        <div className="md:grid md:grid-cols-4 md:gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block md:col-span-1">
                <div className="sticky top-24">
                    <FilterSidebar
                        towns={sortedTownsForFilter}
                        selectedTown={selectedTown}
                        onSelectTown={(town) => {setSelectedTown(town); scrollToTop();}}
                        searchQuery={searchQuery}
                        onSearchQueryChange={(query) => {setSearchQuery(query); scrollToTop();}}
                        selectedCategories={selectedCategories}
                        onCategoryToggle={handleCategoryToggle}
                        startDate={startDate}
                        endDate={endDate}
                        onDateChange={(start, end) => { setStartDate(start); setEndDate(end); scrollToTop(); }}
                    />
                </div>
            </aside>

            {/* Content Area */}
            <div className="md:col-span-3">
                {/* Mobile Filter Button and Sidebar Modal */}
                <div className="md:hidden mb-6">
                    <button
                        onClick={() => setIsFilterSidebarOpen(true)}
                        className="w-full flex items-center justify-center gap-3 bg-slate-800 p-3 rounded-lg shadow-md text-amber-300 font-bold"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
                        Filtros y Búsqueda
                    </button>
                    {isFilterSidebarOpen && (
                        <div className="fixed inset-0 bg-black/70 z-50 animate-fade-in">
                            <div className="bg-slate-900 h-full w-4/5 max-w-sm p-6 overflow-y-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-display text-amber-300">Filtros</h2>
                                    <button onClick={() => setIsFilterSidebarOpen(false)}>{ICONS.close}</button>
                                </div>
                                <FilterSidebar
                                    towns={sortedTownsForFilter}
                                    selectedTown={selectedTown}
                                    onSelectTown={(town) => { 
                                        setSelectedTown(town); 
                                        scrollToTop(); 
                                        setIsFilterSidebarOpen(false); 
                                    }}
                                    searchQuery={searchQuery}
                                    onSearchQueryChange={setSearchQuery}
                                    selectedCategories={selectedCategories}
                                    onCategoryToggle={(category) => {
                                        handleCategoryToggle(category);
                                        setIsFilterSidebarOpen(false);
                                    }}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onDateChange={(start, end) => {
                                        setStartDate(start);
                                        setEndDate(end);
                                        scrollToTop();
                                        setIsFilterSidebarOpen(false);
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {view === 'list' && <Hero />}
                
                {renderContent()}
            </div>
        </div>
    </main>
      <Footer 
        isLoggedIn={isLoggedIn} 
        onLoginClick={() => setShowLoginModal(true)}
        onLogoutClick={handleLogout}
      />

      {showScrollToTop && (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-amber-400 text-slate-900 p-3 rounded-full shadow-lg hover:bg-amber-300 transition-all duration-300 z-50 animate-fade-in"
            aria-label="Volver arriba"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        </button>
      )}

      {/* Modals */}
      {showMapModal && (
         <EventMapModal
            events={sortedEvents}
            onSelectEvent={(id) => {
                setShowMapModal(false);
                setSelectedEventId(id);
            }}
            onClose={() => setShowMapModal(false)}
        />
      )}
      {showAddModal && <AddEventModal onClose={() => setShowAddModal(false)} onAddEvent={handleAddEvent} />}
      {eventToEdit && (
        <EditEventModal
          event={eventToEdit}
          onClose={() => setEventToEdit(null)}
          onUpdate={handleUpdateEvent}
          onDelete={handleDeleteEvent}
        />
      )}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          error={loginError}
        />
      )}
      {changeInstruction && (
        <ChangeRequestModal
            instruction={changeInstruction}
            onClose={() => setChangeInstruction(null)}
        />
      )}
    </div>
  );
}

export default App;