import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassMorphism from '@/components/GlassMorphism';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MapComponent from '@/components/MapComponent';

// Mock demand data for the heatmap (discrete zones for wards)
const demandData = [
  { id: 1, area: 'Yelahanka', level: 'High', coordinates: { lat: 13.1034, lng: 77.5855 } },
  { id: 2, area: 'Malleshwaram', level: 'Medium', coordinates: { lat: 12.9970, lng: 77.5705 } },
  { id: 3, area: 'Koramangala', level: 'High', coordinates: { lat: 12.9352, lng: 77.6245 } },
  { id: 4, area: 'HSR Layout', level: 'Medium', coordinates: { lat: 12.9116, lng: 77.6446 } },
  { id: 5, area: 'Jayanagar', level: 'Low', coordinates: { lat: 12.9300, lng: 77.5800 } },
  { id: 6, area: 'Indiranagar', level: 'High', coordinates: { lat: 12.9784, lng: 77.6408 } },
  { id: 7, area: 'Whitefield', level: 'Medium', coordinates: { lat: 12.9698, lng: 77.7500 } }
];

const getDemandMarkers = () => {
  return demandData.map(location => ({
    id: location.id,
    coordinates: location.coordinates,
    color: location.level === 'High' ? '#ef4444' :
           location.level === 'Medium' ? '#eab308' : '#22c55e',
    label: location.level,
    radius: location.level === 'High' ? 20 :  // Adjusted radius for better visibility
           location.level === 'Medium' ? 15 : 10
  }));
};

const DemandMap = () => {
  const [activeTab, setActiveTab] = useState("heatmap");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow container-section py-6">
        <Tabs defaultValue="heatmap" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="heatmap" className="flex items-center gap-2">
              <Flame className="w-4 h-4" /> Demand Heatmap
            </TabsTrigger>
          </TabsList>

          <TabsContent value="heatmap" className="space-y-6">
            <GlassMorphism className="relative aspect-video overflow-hidden">
              <MapComponent 
                isLoading={isLoading} 
                markers={getDemandMarkers()}
                mapStyle="mapbox://styles/mapbox/light-v11"
                mapboxAccessToken="pk.eyJ1IjoidmFpYmhhdnNwLWFpMjMiLCJhIjoiY204OXYzZ3VuMHlyYTJscXVtbW4yaXFtdiJ9.4vDOFDhaTFfxsSg0sezNJA"
                className="aspect-video"
              />
            </GlassMorphism>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default DemandMap;
