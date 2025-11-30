
import React from 'react';

interface CookieConsentProps {
  isVisible: boolean;
  onClose: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ isVisible, onClose }) => {

  const updateGtagConsent = (granted: boolean) => {
    if (window.gtag) {
      const status = granted ? 'granted' : 'denied';
      window.gtag('consent', 'update', {
        'ad_storage': status,
        'ad_user_data': status,
        'ad_personalization': status,
        'analytics_storage': status
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    updateGtagConsent(true);
    onClose();
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    updateGtagConsent(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[100] animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 p-5 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🍪</span>
            <h3 className="font-bold text-slate-800 dark:text-slate-200 font-display">Privacidad y Cookies</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Usamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico. 
            No te preocupes, respetamos tu privacidad.
            <a 
                href="https://turisteandoporhuelva.es/privacidad/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 text-amber-600 dark:text-amber-400 hover:underline"
            >
                Más información
            </a>.
          </p>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleReject}
            className="flex-1 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 px-4 py-2 text-sm font-bold text-slate-900 bg-amber-400 rounded-md hover:bg-amber-500 transition-colors shadow-sm"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
