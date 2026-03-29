import React from 'react';
import { MapPin, Navigation, Globe, Info } from 'lucide-react';
import { Theater } from '../services/theaterService';
import { motion } from 'motion/react';

interface TheaterCardProps {
  theater: Theater;
  distance?: number;
  onClick: () => void;
}

export const TheaterCard: React.FC<TheaterCardProps> = ({ theater, distance, onClick }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-retro-navy/80 border-2 border-retro-cyan p-4 rounded-lg cursor-pointer relative overflow-hidden group touch-manipulation"
      style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)' }}
    >
      <div className="absolute top-0 right-0 p-2 bg-retro-pink text-white text-xs font-retro transform translate-x-1 -translate-y-1 rotate-12">
        {distance ? `${distance.toFixed(1)} mi` : 'DRIVE-IN'}
      </div>
      
      <h3 className="font-display text-2xl text-retro-yellow mb-1 tracking-wider uppercase">
        {theater.name}
      </h3>
      
      <div className="flex items-start gap-2 text-sm text-gray-300 mb-3">
        <MapPin className="w-4 h-4 mt-0.5 text-retro-pink shrink-0" />
        <span>{theater.city}, {theater.state}</span>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${theater.name} ${theater.address} ${theater.city}`)}`, '_blank');
          }}
          className="flex-1 flex items-center justify-center gap-2 bg-retro-cyan/20 md:hover:bg-retro-cyan/40 border border-retro-cyan text-retro-cyan py-2 rounded font-retro text-sm transition-colors touch-manipulation"
        >
          <Navigation className="w-4 h-4" />
          DIRECTIONS
        </button>
        
        {theater.website && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              window.open(theater.website, '_blank');
            }}
            className="p-2 bg-retro-pink/20 md:hover:bg-retro-pink/40 border border-retro-pink text-retro-pink rounded transition-colors touch-manipulation"
          >
            <Globe className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
