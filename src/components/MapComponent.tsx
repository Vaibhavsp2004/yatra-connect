
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Navigation, Locate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

// Define Bengaluru center coordinates
const BENGALURU_CENTER: [number, number] = [77.5946, 12.9716];

// Define type for markers
interface Marker {
  id: number;
  coordinates: { lat: number; lng: number };
  color: string;
  label?: string;
  radius: number;
}

interface MapComponentProps {
  isLoading?: boolean;
  markers?: Marker[];
  mapStyle?: string;
  mapboxAccessToken?: string;
  className?: string;
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
  showLocationPicker?: boolean;
  isDarkMode?: boolean;
  showDrivers?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({
  isLoading = false,
  markers = [],
  mapStyle = 'mapbox://styles/mapbox/light-v11',
  mapboxAccessToken = 'pk.eyJ1IjoidmFpYmhhdnNwLWFpMjMiLCJhIjoiY204OXYzZ3VuMHlyYTJzcXVtbW4yaXFtdiJ9.4vDOFDhaTFfxsSg0sezNJA',
  className = '',
  onLocationSelect,
  showLocationPicker = false,
  isDarkMode = false,
  showDrivers = false,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const myLocationMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [myLocation, setMyLocation] = useState<[number, number] | null>(null);
  const [pickupLocation, setPickupLocation] = useState<[number, number] | null>(null);
  const [dropLocation, setDropLocation] = useState<[number, number] | null>(null);
  const [locationMode, setLocationMode] = useState<'pickup' | 'drop' | null>(null);

  const form = useForm({
    defaultValues: {
      pickup: '',
      drop: '',
    },
  });

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = mapboxAccessToken;

    const actualMapStyle = isDarkMode 
      ? 'mapbox://styles/mapbox/dark-v11' 
      : mapStyle;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: actualMapStyle,
      center: BENGALURU_CENTER,
      zoom: 11,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Clean up existing markers when component unmounts
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      if (myLocationMarkerRef.current) myLocationMarkerRef.current.remove();
      map.current?.remove();
    };
  }, [mapboxAccessToken, mapStyle, isDarkMode]);

  // Handle click on map for location selection
  useEffect(() => {
    if (!map.current || !showLocationPicker) return;

    const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
      if (!locationMode) return;
      
      const lngLat = e.lngLat;
      
      if (locationMode === 'pickup') {
        setPickupLocation([lngLat.lng, lngLat.lat]);
        form.setValue('pickup', `${lngLat.lat.toFixed(4)}, ${lngLat.lng.toFixed(4)}`);
        setLocationMode(null);
      } else if (locationMode === 'drop') {
        setDropLocation([lngLat.lng, lngLat.lat]);
        form.setValue('drop', `${lngLat.lat.toFixed(4)}, ${lngLat.lng.toFixed(4)}`);
        setLocationMode(null);
      }
    };

    map.current.on('click', handleMapClick);

    return () => {
      map.current?.off('click', handleMapClick);
    };
  }, [locationMode, map.current, showLocationPicker, form]);

  // Add markers to the map
  useEffect(() => {
    if (!map.current || isLoading) return;

    // Clear previous markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    markers.forEach(markerData => {
      const { lat, lng } = markerData.coordinates;
      
      // Create a custom HTML element for the marker (circle with label)
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = `${markerData.radius * 2}px`;
      el.style.height = `${markerData.radius * 2}px`;
      el.style.borderRadius = '50%';
      el.style.backgroundColor = markerData.color;
      el.style.opacity = '0.7';
      el.style.display = 'flex';
      el.style.justifyContent = 'center';
      el.style.alignItems = 'center';
      el.style.color = 'white';
      el.style.fontWeight = 'bold';
      el.style.fontSize = '12px';
      
      if (markerData.label) {
        el.textContent = markerData.label;
      }

      const marker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .addTo(map.current!);

      markersRef.current.push(marker);
    });

    // Add driver markers if needed
    if (showDrivers) {
      // Generate random driver positions around Bengaluru
      const numDrivers = 20;
      for (let i = 0; i < numDrivers; i++) {
        // Random offset from center (smaller radius to represent individual drivers)
        const latOffset = (Math.random() - 0.5) * 0.15;
        const lngOffset = (Math.random() - 0.5) * 0.15;
        
        const lat = BENGALURU_CENTER[1] + latOffset;
        const lng = BENGALURU_CENTER[0] + lngOffset;
        
        // Create a custom HTML element for the driver marker
        const el = document.createElement('div');
        el.className = 'driver-marker';
        el.style.width = '12px';
        el.style.height = '12px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#fff';
        el.style.border = '2px solid #4CAF50';
        
        const marker = new mapboxgl.Marker(el)
          .setLngLat([lng, lat])
          .addTo(map.current!);

        markersRef.current.push(marker);
      }
    }

    // Add pickup and drop location markers if they exist
    if (pickupLocation) {
      const el = document.createElement('div');
      el.className = 'custom-pickup-marker';
      el.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#4CAF50" fill-opacity="0.2"/><circle cx="12" cy="12" r="6" fill="#4CAF50"/></svg>';
      
      const marker = new mapboxgl.Marker(el)
        .setLngLat(pickupLocation)
        .addTo(map.current!);

      markersRef.current.push(marker);
    }

    if (dropLocation) {
      const el = document.createElement('div');
      el.className = 'custom-drop-marker';
      el.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#F44336" fill-opacity="0.2"/><circle cx="12" cy="12" r="6" fill="#F44336"/></svg>';
      
      const marker = new mapboxgl.Marker(el)
        .setLngLat(dropLocation)
        .addTo(map.current!);

      markersRef.current.push(marker);
    }

  }, [markers, isLoading, map.current, showDrivers, pickupLocation, dropLocation]);

  // Get user's current location
  const handleGetMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMyLocation([longitude, latitude]);
          
          // Remove old marker if exists
          if (myLocationMarkerRef.current) {
            myLocationMarkerRef.current.remove();
          }
          
          // Create a custom HTML element for "my location" marker
          const el = document.createElement('div');
          el.className = 'my-location-marker';
          el.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; width: 40px; height: 40px;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1c78f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
          `;
          
          // Add new marker
          if (map.current) {
            myLocationMarkerRef.current = new mapboxgl.Marker(el)
              .setLngLat([longitude, latitude])
              .addTo(map.current);
            
            // Center map on user's location
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 14,
              speed: 1.5
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
          <div className="loading-spinner w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : null}
      
      <div ref={mapContainer} className="h-full w-full rounded-md overflow-hidden" />
      
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <Button 
          onClick={handleGetMyLocation} 
          size="icon" 
          className="bg-primary h-10 w-10 rounded-full shadow-lg"
        >
          <Locate className="h-5 w-5" />
        </Button>
      </div>

      {showLocationPicker && (
        <div className="absolute top-4 left-4 z-10 w-72 space-y-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant={locationMode === 'pickup' ? "default" : "outline"} 
                className="w-full justify-start"
                onClick={() => setLocationMode('pickup')}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {form.watch('pickup') || 'Select Pickup Location'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Click on the map to set pickup location</p>
                <Form {...form}>
                  <FormField
                    control={form.control}
                    name="pickup"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Latitude, Longitude" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Form>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant={locationMode === 'drop' ? "default" : "outline"} 
                className="w-full justify-start"
                onClick={() => setLocationMode('drop')}
              >
                <Navigation className="mr-2 h-4 w-4" />
                {form.watch('drop') || 'Select Drop Location'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Click on the map to set drop location</p>
                <Form {...form}>
                  <FormField
                    control={form.control}
                    name="drop"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Latitude, Longitude" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Form>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
