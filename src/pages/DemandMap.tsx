
import React, { useState, useEffect } from 'react';
import { Flame, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassMorphism from '@/components/GlassMorphism';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MapComponent from '@/components/MapComponent';
import { createClient } from '@supabase/supabase-js';
import { predictionResults } from '@/utils/predictionService';

// Initialize Supabase Client
const SUPABASE_URL = 'https://ryghbxydtrlmowsiywio.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5Z2hieHlkdHJsbW93c2l5d2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNDQyNTUsImV4cCI6MjA1NzYyMDI1NX0.b2JoADwNRWGKQnp8VViiDKYt8CaaEDkzGBP_v9FEddQ';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Updated demand data for the heatmap with larger circles and new areas
const demandData = [
  { id: 1, area: 'Yelahanka', level: 'High', coordinates: { lat: 13.1034, lng: 77.5855 } },
  { id: 2, area: 'Malleshwaram', level: 'Medium', coordinates: { lat: 12.9970, lng: 77.5705 } },
  { id: 3, area: 'Koramangala', level: 'High', coordinates: { lat: 12.9352, lng: 77.6245 } },
  { id: 4, area: 'HSR Layout', level: 'Medium', coordinates: { lat: 12.9116, lng: 77.6446 } },
  { id: 5, area: 'Jayanagar', level: 'Low', coordinates: { lat: 12.9300, lng: 77.5800 } },
  { id: 6, area: 'Indiranagar', level: 'High', coordinates: { lat: 12.9784, lng: 77.6408 } },
  { id: 7, area: 'Whitefield', level: 'Medium', coordinates: { lat: 12.9698, lng: 77.7500 } },
  { id: 8, area: 'Electronic City', level: 'High', coordinates: { lat: 12.8452, lng: 77.6602 } },
  { id: 9, area: 'JP Nagar', level: 'Medium', coordinates: { lat: 12.9100, lng: 77.5900 } },
  { id: 10, area: 'Marathahalli', level: 'High', coordinates: { lat: 12.9591, lng: 77.6987 } }
];

// Function to get demand markers with increased sizes
const getDemandMarkers = () => {
  return demandData.map(location => ({
    id: location.id,
    coordinates: location.coordinates,
    color: location.level === 'High' ? '#ef4444' :
           location.level === 'Medium' ? '#eab308' : '#22c55e',
    label: location.area,
    radius: location.level === 'High' ? 35 :
           location.level === 'Medium' ? 25 : 20
  }));
};

// Store prediction data in Supabase
const storePredictionData = async (predictionData) => {
  const { data, error } = await supabase
    .from('predictions')
    .insert([{ 
      prediction_data: predictionData,
      timestamp: new Date().toISOString()
    }]);
    
  if (error) console.error('Error storing prediction data:', error);
  return data;
};

const DemandMap = () => {
  const [activeTab, setActiveTab] = useState("heatmap");
  const [isLoading, setIsLoading] = useState(true);
  const [predictionData, setPredictionData] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handlePredictRides = async () => {
    setIsPredicting(true);
    try {
      // Simulating model prediction with the imported data
      const results = predictionResults;
      setPredictionData(results);
      
      // Store prediction data in Supabase
      await storePredictionData(results);
      
      // Show the highest demand areas on the map
      const highDemandAreas = results.filter(area => area.predicted_demand > 0.7);
      console.log('High demand areas:', highDemandAreas);
      
    } catch (error) {
      console.error('Error predicting rides:', error);
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow container-section py-6">
        <Tabs defaultValue="heatmap" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="heatmap" className="flex items-center gap-2">
              <Flame className="w-4 h-4" /> Demand Heatmap
            </TabsTrigger>
            <TabsTrigger value="drivers" className="flex items-center gap-2">
              <MapIcon className="w-4 h-4" /> Driver Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="heatmap" className="space-y-6">
            <div className="flex justify-end mb-4">
              <Button 
                onClick={handlePredictRides} 
                disabled={isPredicting}
                className="gap-2"
              >
                {isPredicting ? 'Predicting...' : 'Predict High Demand Areas'}
                {isPredicting && <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"></div>}
              </Button>
            </div>

            <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
              <MapComponent 
                isLoading={isLoading} 
                markers={getDemandMarkers()} 
                mapStyle="mapbox://styles/mapbox/dark-v11"
                className="w-full h-full"
                isDarkMode={true}
              />
            </div>

            {predictionData && (
              <div className="bg-black/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Ride Demand Predictions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {predictionData.slice(0, 3).map((area, idx) => (
                    <div key={idx} className="bg-white/5 p-3 rounded-lg">
                      <h4 className="font-semibold">{area.area}</h4>
                      <div className="flex items-center mt-2">
                        <div 
                          className="w-full bg-gray-200 rounded-full h-2.5 mr-2" 
                        >
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${area.predicted_demand * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{Math.round(area.predicted_demand * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="drivers" className="space-y-6">
            <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
              <MapComponent 
                isLoading={isLoading} 
                mapStyle="mapbox://styles/mapbox/dark-v11"
                className="w-full h-full"
                isDarkMode={true}
                showDrivers={true}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default DemandMap;
