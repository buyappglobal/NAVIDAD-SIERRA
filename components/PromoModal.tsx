
import React from 'react';
import { ICONS } from '../constants';

interface PromoModalProps {
  imageUrl: string;
  onClose: () => void;
}

const PromoModal: React.FC<PromoModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div 
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="relative max-w-md w-full bg-transparent rounded-2xl shadow-2xl overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar flotante */}
        <button 
            onClick={onClose} 
            className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10 backdrop-blur-md"
            aria-label="Cerrar publicidad"
        >
            {ICONS.close}
        </button>
        
        {/* Imagen */}
        <img 
            src={imageUrl} 
            alt="Anuncio destacado" 
            className="w-full h-auto object-contain rounded-2xl shadow-lg"
        />
        
        {/* Barra de progreso visual (opcional, para indicar que se cierra solo) */}
        <div className="absolute bottom-0 left-0 h-1 bg-amber-400 animate-shrink-width w-full"></div>
        <style>{`
            @keyframes shrinkWidth {
                from { width: 100%; }
                to { width: 0%; }
            }
            .animate-shrink-width {
                animation: shrinkWidth 5s linear forwards;
            }
        `}</style>
      </div>
    </div>
  );
};

export default PromoModal;
