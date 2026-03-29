import React from 'react';
import { X, MapPin, Navigation, Globe, Clock, Star } from 'lucide-react';
import { Theater } from '../services/theaterService';
import { motion, AnimatePresence } from 'motion/react';

interface TheaterModalProps {
  theater: Theater | null;
  onClose: () => void;
}

export const TheaterModal: React.FC<TheaterModalProps> = ({ theater, onClose }) => {
  return (
    <AnimatePresence>
      {theater && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotate: 2 }}
            className="relative w-full max-w-lg bg-retro-navy border-4 border-white rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,0,255,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Header with retro pattern */}
          <div className="h-32 bg-retro-pink relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <h2 className="font-display text-4xl text-white text-center px-4 drop-shadow-lg uppercase tracking-widest">
              {theater.name}
            </h2>
            <button 
              onClick={onClose}
              className="absolute top-2 right-2 p-2 bg-white text-retro-pink rounded-full md:hover:bg-retro-yellow transition-colors touch-manipulation cursor-pointer active:scale-90"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-retro-cyan shrink-0" />
                <div>
                  <p className="text-white font-medium">{theater.address}</p>
                  <p className="text-gray-400">{theater.city}, {theater.state}</p>
                </div>
              </div>

              {theater.description && (
                <div className="flex items-start gap-3">
                  <Star className="w-6 h-6 text-retro-yellow shrink-0 fill-retro-yellow/20" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {theater.description}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${theater.name} ${theater.address} ${theater.city}`)}`, '_blank')}
                className="flex items-center justify-center gap-2 bg-retro-cyan text-retro-navy font-retro py-3 rounded-lg md:hover:bg-white transition-colors touch-manipulation cursor-pointer active:scale-95"
              >
                <Navigation className="w-5 h-5" />
                GET DIRECTIONS
              </button>
              
              {theater.website ? (
                <button 
                  onClick={() => window.open(theater.website, '_blank')}
                  className="flex items-center justify-center gap-2 bg-retro-pink text-white font-retro py-3 rounded-lg md:hover:bg-retro-cyan transition-colors touch-manipulation cursor-pointer active:scale-95"
                >
                  <Globe className="w-5 h-5" />
                  WEBSITE
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 bg-gray-800 text-gray-500 font-retro py-3 rounded-lg cursor-not-allowed">
                  <Globe className="w-5 h-5" />
                  NO SITE
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 text-center">
              <p className="text-xs font-retro text-retro-yellow uppercase tracking-widest">
                Support Your Local Drive-In!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    )}
    </AnimatePresence>
  );
};
