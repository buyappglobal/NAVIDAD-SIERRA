import React from 'react';
import { createRoot } from 'react-dom/client';
import events from '../database.json';

function App() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-800 dark:text-white mb-4">
                        La Sierra en Navidad
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                        Agenda Cultural de la Sierra de Aracena y Picos de Aroche
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <article
                            key={event.id}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group animate-fade-in-up"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-slate-200 dark:border-slate-700">
                                    {event.date}
                                </div>
                                {event.sponsored && (
                                    <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                        Destacado
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                                        {event.category}
                                    </span>
                                    <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-medium">
                                        <span className="mr-1">📍</span>
                                        {event.town}
                                    </div>
                                </div>

                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {event.title}
                                </h2>

                                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4">
                                    {event.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}