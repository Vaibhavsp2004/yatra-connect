
import React, { useState, useEffect } from 'react';
import { MapPin, Flame, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassMorphism from '@/components/GlassMorphism';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock demand data for the heatmap
const demandData = [
  { id: 1, area: 'Downtown', level: 'High', coordinates: { lat: 12.97, lng: 77.59 } },
  { id: 2, area: 'Electronic City', level: 'Medium', coordinates: { lat: 12.84, lng: 77.67 } },
  { id: 3, area: 'Whitefield', level: 'High', coordinates: { lat: 12.97, lng: 77.75 } },
  { id: 4, area: 'Indiranagar', level: 'Medium', coordinates: { lat: 12.97, lng: 77.64 } },
  { id: 5, area: 'Koramangala', level: 'High', coordinates: { lat: 12.93, lng: 77.62 } },
  { id: 6, area: 'Jayanagar', level: 'Low', coordinates: { lat: 12.93, lng: 77.58 } },
  { id: 7, area: 'HSR Layout', level: 'Medium', coordinates: { lat: 12.91, lng: 77.64 } },
  { id: 8, area: 'Bannerghatta Road', level: 'Low', coordinates: { lat: 12.88, lng: 77.59 } },
];

// Mock driver density data
const driverData = [
  { id: 1, area: 'Downtown', density: 'High', count: 25, coordinates: { lat: 12.97, lng: 77.59 } },
  { id: 2, area: 'Electronic City', density: 'Low', count: 8, coordinates: { lat: 12.84, lng: 77.67 } },
  { id: 3, area: 'Whitefield', density: 'Medium', count: 15, coordinates: { lat: 12.97, lng: 77.75 } },
  { id: 4, area: 'Indiranagar', density: 'High', count: 22, coordinates: { lat: 12.97, lng: 77.64 } },
  { id: 5, area: 'Koramangala', density: 'Medium', count: 17, coordinates: { lat: 12.93, lng: 77.62 } },
];

// Mock predictive demand data
const predictiveData = [
  { id: 1, area: 'Downtown', prediction: 'Surge expected in 30 mins', confidence: 85 },
  { id: 2, area: 'Electronic City', prediction: 'Steady demand for next 2 hours', confidence: 75 },
  { id: 3, area: 'Whitefield', prediction: 'Demand dropping in 1 hour', confidence: 70 },
  { id: 4, area: 'Indiranagar', prediction: 'High demand expected after 9 PM', confidence: 90 },
];

const HeatmapLegend = () => (
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
);

const DemandMap = () => {
  const [activeTab, setActiveTab] = useState("heatmap");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container-section py-6">
        <div className="mb-8">
          <h1 className="heading-lg mb-2">Driver <span className="text-namma-green">Demand Map</span></h1>
          <p className="text-namma-gray">
            View real-time demand, driver density, and predictive analytics to optimize your routes and earnings.
          </p>
        </div>

        <Tabs defaultValue="heatmap" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="heatmap" className="flex items-center gap-2">
              <Flame className="w-4 h-4" /> Demand Heatmap
            </TabsTrigger>
            <TabsTrigger value="drivers" className="flex items-center gap-2">
              <Users className="w-4 h-4" /> Driver Density
            </TabsTrigger>
            <TabsTrigger value="predictive" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Predictive Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="heatmap" className="space-y-6">
            <GlassMorphism className="relative aspect-video overflow-hidden">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-namma-green"></div>
                </div>
              ) : (
                <>
                  {/* This would be replaced with an actual map implementation */}
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <div className="text-center p-4">
                      <p className="text-white/70 mb-2">Map visualization would go here</p>
                      <p className="text-xs text-white/50">(Integrate with a map service like Google Maps or Mapbox)</p>
                    </div>
                  </div>
                  
                  {/* Demand markers would be positioned on the map */}
                  {demandData.map(location => (
                    <div 
                      key={location.id} 
                      className="absolute"
                      style={{ 
                        top: `${(1 - (location.coordinates.lat - 12.8) / 0.2) * 80}%`, 
                        left: `${((location.coordinates.lng - 77.55) / 0.25) * 90}%`
                      }}
                    >
                      <div className={`flex items-center justify-center h-6 w-6 rounded-full 
                        ${location.level === 'High' ? 'bg-red-500' : 
                          location.level === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'} 
                        opacity-70`}>
                      </div>
                    </div>
                  ))}
                  
                  {/* Map controls */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <HeatmapLegend />
                    <Button size="sm" variant="secondary" className="bg-white/20">
                      <MapPin className="h-4 w-4 mr-1" /> My Location
                    </Button>
                  </div>
                </>
              )}
            </GlassMorphism>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {demandData.slice(0, 3).map(area => (
                <GlassMorphism key={area.id} className="p-4">
                  <h3 className="font-semibold">{area.area}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-3 h-3 rounded-full 
                      ${area.level === 'High' ? 'bg-red-500' : 
                        area.level === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                    </div>
                    <span className="text-sm">{area.level} Demand</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {area.level === 'High' ? 'Many ride requests in this area' : 
                     area.level === 'Medium' ? 'Moderate ride requests in this area' : 
                     'Few ride requests in this area'}
                  </p>
                </GlassMorphism>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drivers" className="space-y-6">
            <GlassMorphism className="relative aspect-video overflow-hidden">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-namma-blue"></div>
                </div>
              ) : (
                <>
                  {/* This would be replaced with an actual map implementation */}
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <div className="text-center p-4">
                      <p className="text-white/70 mb-2">Driver density map would go here</p>
                      <p className="text-xs text-white/50">(Integrate with a map service like Google Maps or Mapbox)</p>
                    </div>
                  </div>
                  
                  {/* Driver density markers */}
                  {driverData.map(location => (
                    <div 
                      key={location.id} 
                      className="absolute"
                      style={{ 
                        top: `${(1 - (location.coordinates.lat - 12.8) / 0.2) * 80}%`, 
                        left: `${((location.coordinates.lng - 77.55) / 0.25) * 90}%`
                      }}
                    >
                      <div className={`flex items-center justify-center h-8 w-8 rounded-full 
                        ${location.density === 'High' ? 'bg-blue-500/70' : 
                          location.density === 'Medium' ? 'bg-blue-400/70' : 'bg-blue-300/70'}`}>
                        <span className="text-xs text-white font-bold">{location.count}</span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Map controls */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-xs">High</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                        <span className="text-xs">Medium</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                        <span className="text-xs">Low</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </GlassMorphism>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {driverData.slice(0, 3).map(area => (
                <GlassMorphism key={area.id} className="p-4">
                  <h3 className="font-semibold">{area.area}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="h-4 w-4 text-namma-blue" />
                    <span className="text-sm">{area.count} drivers active</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {area.density === 'High' ? 'Highly competitive area, consider alternatives' : 
                     area.density === 'Medium' ? 'Moderately busy area, worth considering' : 
                     'Low competition, good opportunity to get rides'}
                  </p>
                </GlassMorphism>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="predictive" className="space-y-6">
            <GlassMorphism className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-namma-purple" />
                Demand Predictions
              </h2>
              
              <div className="space-y-4">
                {predictiveData.map(item => (
                  <div key={item.id} className="border-b border-white/10 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.area}</h3>
                        <p className="text-sm mt-1">{item.prediction}</p>
                      </div>
                      <div className="bg-white/10 rounded-full px-2 py-1 text-xs">
                        {item.confidence}% confidence
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>Predictions are based on historical data, current events, and weather conditions.</p>
              </div>
            </GlassMorphism>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GlassMorphism className="p-4">
                <h3 className="font-semibold flex items-center">
                  <Flame className="mr-2 h-4 w-4 text-namma-green" />
                  Hot Spots Today
                </h3>
                <ul className="mt-3 space-y-2">
                  <li className="text-sm flex justify-between">
                    <span>Koramangala</span>
                    <span className="text-namma-green">Very High</span>
                  </li>
                  <li className="text-sm flex justify-between">
                    <span>Airport Road</span>
                    <span className="text-namma-green">High</span>
                  </li>
                  <li className="text-sm flex justify-between">
                    <span>MG Road</span>
                    <span className="text-namma-green">High</span>
                  </li>
                </ul>
              </GlassMorphism>
              
              <GlassMorphism className="p-4">
                <h3 className="font-semibold flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4 text-namma-purple" />
                  Upcoming Events
                </h3>
                <ul className="mt-3 space-y-2">
                  <li className="text-sm">Tech Conference at Whitefield (09:00 - 18:00)</li>
                  <li className="text-sm">Concert at Palace Grounds (19:00 - 23:00)</li>
                  <li className="text-sm">Cricket Match at Chinnaswamy Stadium (16:00 - 20:00)</li>
                </ul>
              </GlassMorphism>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default DemandMap;
