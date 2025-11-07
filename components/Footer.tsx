import React from 'react';
import { GOOGLE_FORM_URL } from '../constants';

interface FooterProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ isLoggedIn, onLoginClick, onLogoutClick }) => {
  const currentYear = new Date().getFullYear();

  const friendLinks = [
    { name: 'Delegación de Turismo', url: 'https://www.turismohuelva.org/' },
    { name: 'Diputación de Huelva', url: 'https://www.diphuelva.es/' },
    { name: 'Agencia Destino Huelva', url: 'https://www.turismohuelva.org/blog/' },
    { name: 'Andalucía Flamenco Land', url: 'https://nuevobuscador.afland.es' },
  ];

  const legalLinks = [
    { name: 'Política de Cookies', url: 'https://turisteandoporhuelva.es/cookies/' },
    { name: 'Política de Privacidad', url: 'https://turisteandoporhuelva.es/privacidad/' },
    { name: 'Aviso Legal', url: 'https://turisteandoporhuelva.es/privacidad/' },
  ];

  return (
    <footer className="bg-slate-800 text-slate-400 text-sm p-8 mt-16 border-t border-slate-700/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Columna 1: Marca y Logo */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-display text-amber-300">La Sierra en Navidad</h3>
            <p className="mt-1 text-xs">Una guía de eventos para no perderte nada.</p>
            <svg className="w-24 h-auto mt-4 text-amber-400 opacity-50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 50L20 20L40 40L60 15L80 35L100 10V50H0Z" fill="currentColor" fillOpacity="0.3"/>
              <path d="M5 45L25 25L45 45L65 20L85 40L100 20V50H5L5 45Z" fill="currentColor" fillOpacity="0.5"/>
              <path d="M70 10L68 12L70 14L72 12L70 10Z" fill="#FCD34D"/>
            </svg>
          </div>

          {/* Columna 2: Webs Amigas */}
          <div>
            <h3 className="text-lg font-bold text-slate-200 mb-3 font-display">Webs Amigas</h3>
            <ul className="space-y-2">
              {friendLinks.map(link => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Legal */}
          <div>
            <h3 className="text-lg font-bold text-slate-200 mb-3 font-display">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map(link => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700/50 mt-8 pt-6 text-center text-xs">
          <p>&copy; {currentYear} | Guía de eventos de la Sierra de Aracena y Picos de Aroche.</p>
          <p className="mt-2">
            Inspirado y en colaboración con <a href="https://turisteandoporhuelva.es/" target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-300 hover:text-amber-200 transition-colors">Turisteando por Huelva</a>.
          </p>
           <p className="mt-2">
            Hecho con ❤️ para la Sierra. ¿Falta algún evento o ves algún error?{' '}
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-300 hover:text-amber-200 transition-colors"
            >
              Ayúdanos a mejorar
            </a>
            .
          </p>
          <div className="mt-4">
            {isLoggedIn ? (
              <button onClick={onLogoutClick} className="text-slate-500 hover:text-slate-300 transition-colors text-xs">Cerrar Sesión</button>
            ) : (
              <button onClick={onLoginClick} className="text-slate-500 hover:text-slate-300 transition-colors text-xs">Admin</button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;