
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Set Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidmFpYmhhdnNwLWFpMjMiLCJhIjoiY204OXYzZ3VuMHlyYTJscXVtbW4yaXFtdiJ9.4vDOFDhaTFfxsSg0sezNJA';

// Bengaluru coordinates as a tuple [longitude, latitude]
const BENGALURU_CENTER: [number, number] = [77.5946, 12.9716];

interface MapComponentProps {
  isLoading?: boolean;
  markers?: Array<{
    id: number;
    coordinates: { lat: number; lng: number };
    color: string;
    label?: string | number;
  }>;
  showControls?: boolean;
  mapStyle?: string;
  className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  isLoading = false,
  markers = [],
  showControls = true,
  mapStyle = 'mapbox://styles/mapbox/dark-v11',
  className = '',
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [showLegend, setShowLegend] = useState(true);
  const markerRefs = useRef<{ [key: number]: mapboxgl.Marker }>({});

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: BENGALURU_CENTER,
      zoom: 11,
      pitch: 30,
      bearing: -15,
    });

    // Add navigation controls if needed
    if (showControls) {
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
    }

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapStyle, showControls]);

  // Handle markers update
  useEffect(() => {
    if (!map.current || isLoading) return;

    // Remove all existing markers
    Object.values(markerRefs.current).forEach(marker => marker.remove());
    markerRefs.current = {};

    // Add new markers
    markers.forEach((marker) => {
      const element = document.createElement('div');
      element.className = 'flex items-center justify-center rounded-full w-6 h-6';
      element.style.backgroundColor = marker.color;
      
      if (marker.label !== undefined) {
        element.innerHTML = `<span class="text-xs font-bold text-white">${marker.label}</span>`;
      }

      const mapMarker = new mapboxgl.Marker(element)
        .setLngLat([marker.coordinates.lng, marker.coordinates.lat])
        .addTo(map.current!);
      
      markerRefs.current[marker.id] = mapMarker;
    });
  }, [markers, isLoading]);

  // Go to user's location
  const goToMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (map.current) {
            map.current.flyTo({
              center: [position.coords.longitude, position.coords.latitude],
              zoom: 14,
              essential: true
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-namma-green"></div>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
          
          {/* Map controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {showLegend && (
              <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Low</span>
                </div>
              </div>
            )}
            <Button 
              size="sm" 
              variant="secondary" 
              className="bg-white/20"
              onClick={goToMyLocation}
            >
              <MapPin className="h-4 w-4 mr-1" /> My Location
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MapComponent;
