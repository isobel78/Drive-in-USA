import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Theater } from '../services/theaterService';

// Fix for default marker icon
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface TheaterMapProps {
  theaters: Theater[];
  onTheaterSelect: (theater: Theater) => void;
  userLocation: { lat: number; lng: number } | null;
}

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 500);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

const getStateColor = (state: string) => {
  const colors = [
    '#ff00ff', // retro-pink
    '#00ffff', // retro-cyan
    '#ffff00', // retro-yellow
    '#00ff00', // neon-green
    '#ff6600', // neon-orange
    '#ff0066', // hot-pink
    '#00ff99', // seafoam
    '#9900ff', // purple
  ];
  
  // Simple hash for state string
  let hash = 0;
  for (let i = 0; i < state.length; i++) {
    hash = state.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const TheaterMap: React.FC<TheaterMapProps> = ({ theaters, onTheaterSelect, userLocation }) => {
  const defaultCenter: [number, number] = [39.8283, -98.5795];
  const zoom = 4;

  return (
    <div className="h-full w-full">
      <MapContainer 
        center={userLocation ? [userLocation.lat, userLocation.lng] : defaultCenter} 
        zoom={userLocation ? 6 : zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        touchZoom={true}
      >
        <MapResizer />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {theaters.map((theater, idx) => {
          const color = getStateColor(theater.state);
          return (
            <Marker 
              key={`${theater.name}-${idx}`} 
              position={[theater.lat, theater.lng]}
              icon={L.divIcon({
                className: 'custom-theater-marker',
                html: `
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="${color}" stroke="white" stroke-width="1.5" style="filter: drop-shadow(0 0 5px ${color});">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                `,
                iconSize: [18, 18],
                iconAnchor: [9, 9]
              })}
            >
              <Popup>
                <div className="text-retro-navy p-1">
                  <h3 className="font-bold text-sm">{theater.name}</h3>
                  <p className="text-xs">{theater.city}, <span style={{ color: color, fontWeight: 'bold' }}>{theater.state}</span></p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('View Details clicked for:', theater.name);
                      onTheaterSelect(theater);
                    }}
                    className="mt-2 text-[10px] bg-retro-pink text-white px-2 py-1 rounded uppercase font-bold w-full touch-manipulation cursor-pointer active:scale-95"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {userLocation && (
          <Marker 
            position={[userLocation.lat, userLocation.lng]}
            icon={L.divIcon({
              className: 'user-location-marker',
              html: '<div class="w-4 h-4 bg-retro-cyan rounded-full border-2 border-white shadow-[0_0_10px_#00ffff]"></div>',
              iconSize: [16, 16],
              iconAnchor: [8, 8]
            })}
          >
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default TheaterMap;
