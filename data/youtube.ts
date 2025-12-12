
export interface Playlist {
    id: string;
    title: string;
    description: string;
    thumbnailUrl?: string; // Opcional: si queremos poner una portada personalizada
}

export const PLAYLISTS: Playlist[] = [
    {
        id: "PLxKi_vggr-lJUYUl5lFvBk1cvyRO0cfXB", // Reemplazar con ID real de la lista
        title: "Navidad en la Sierra",
        description: "Disfruta de los mejores momentos navideños: belenes, luces y ambiente festivo.",
        thumbnailUrl: "https://images.unsplash.com/photo-1544256673-9825eb270a41?q=80&w=1920&auto=format&fit=crop"
    },
    {
        id: "PLxKi_vggr-lKnWrmSspdQnW9F-_2fXC41", // Reemplazar con ID real
        title: "Pueblos con Encanto",
        description: "Recorrido visual por las calles y rincones más bonitos de nuestros pueblos.",
        thumbnailUrl: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?q=80&w=1920&auto=format&fit=crop"
    },
    {
        id: "PLxKi_vggr-lLAxW4VmVa9ZZMu_-ldXaqr", // Reemplazar con ID real
        title: "Gastronomía Serrana",
        description: "El sabor auténtico de Huelva: jamón, setas y recetas tradicionales.",
        thumbnailUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1920&auto=format&fit=crop"
    }
];

// Instrucciones para el usuario:
// 1. Ve a tu canal de YouTube: https://www.youtube.com/@turisteandoporhuelva/playlists
// 2. Haz clic en una lista de reproducción.
// 3. En la URL, copia el código que aparece después de "list=". Ejemplo: &list=PLxxxxxxxxx
// 4. Pega ese código en el campo 'id' de arriba.
