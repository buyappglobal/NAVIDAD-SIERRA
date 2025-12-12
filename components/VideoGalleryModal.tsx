
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { PLAYLISTS } from '../data/youtube';

interface VideoGalleryModalProps {
  onClose: () => void;
}

const VideoGalleryModal: React.FC<VideoGalleryModalProps> = ({ onClose }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  // Si no hay listas configuradas (o el usuario no ha editado el archivo), mostramos un mensaje amigable
  const hasPlaylists = PLAYLISTS.length > 0 && PLAYLISTS[0].id !== "PL7k0yL5xY3R6-X7q8Z9w0_1V23456789"; 

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[90] backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-red-600 p-6 text-center relative text-white">
            <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">{ICONS.close}</button>
            <div className="flex items-center justify-center gap-3 mb-2">
                <div className="bg-white text-red-600 rounded-full p-2">
                    {ICONS.youtube}
                </div>
                <h2 className="text-2xl font-display font-bold uppercase tracking-widest">Turisteando TV</h2>
            </div>
            <p className="text-red-100 text-sm font-medium">Canal Oficial: @turisteandoporhuelva</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-900/50">
            
            {selectedPlaylist ? (
                <div className="flex flex-col h-full animate-fade-in">
                    <button 
                        onClick={() => setSelectedPlaylist(null)}
                        className="self-start mb-4 flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 font-bold text-sm transition-colors"
                    >
                        ← Volver a listas
                    </button>
                    <div className="flex-grow relative w-full rounded-xl overflow-hidden shadow-2xl bg-black aspect-video">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/videoseries?list=${selectedPlaylist}`} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        ></iframe>
                    </div>
                </div>
            ) : (
                <>
                    <p className="text-center text-slate-600 dark:text-slate-300 mb-6">
                        Descubre la Sierra a través de nuestros vídeos. Selecciona una lista de reproducción:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PLAYLISTS.map((playlist, index) => (
                            <div 
                                key={index}
                                onClick={() => setSelectedPlaylist(playlist.id)}
                                className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border border-slate-200 dark:border-slate-700 flex flex-col"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img 
                                        src={playlist.thumbnailUrl || `https://img.youtube.com/vi/${playlist.id}/mqdefault.jpg`} 
                                        alt={playlist.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"; }}
                                    />
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{playlist.title}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3">{playlist.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {!hasPlaylists && (
                        <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-center">
                            <p className="text-sm text-amber-800 dark:text-amber-200">
                                🚧 <strong>Nota para el administrador:</strong> Edita el archivo <code>data/youtube.ts</code> para añadir los IDs reales de tus listas de reproducción de YouTube.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 text-center">
            <a 
                href="https://www.youtube.com/@turisteandoporhuelva/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-bold hover:underline"
            >
                {ICONS.youtube}
                Visitar Canal en YouTube
            </a>
        </div>
      </div>
    </div>
  );
};

export default VideoGalleryModal;
