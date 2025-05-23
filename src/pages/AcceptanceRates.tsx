
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, UserCheck, UserX, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassMorphism from '@/components/GlassMorphism';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// Mock driver data
const driverData = [
  { name: 'Rajesh K', acceptanceRate: 98, cancellationRate: 2, completedRides: 1250, rating: 4.9 },
  { name: 'Suresh M', acceptanceRate: 92, cancellationRate: 8, completedRides: 876, rating: 4.7 },
  { name: 'Mahesh B', acceptanceRate: 85, cancellationRate: 15, completedRides: 1543, rating: 4.8 },
  { name: 'Venkat P', acceptanceRate: 78, cancellationRate: 22, completedRides: 624, rating: 4.5 },
  { name: 'Kumar S', acceptanceRate: 95, cancellationRate: 5, completedRides: 2143, rating: 4.9 },
];

// Mock user data
const userData = [
  { name: 'Priya S', cancellationRate: 3, completedRides: 87, rating: 4.9 },
  { name: 'Arun K', cancellationRate: 12, completedRides: 64, rating: 4.6 },
  { name: 'Deepa R', cancellationRate: 1, completedRides: 132, rating: 5.0 },
  { name: 'Karthik V', cancellationRate: 8, completedRides: 43, rating: 4.7 },
  { name: 'Meena T', cancellationRate: 18, completedRides: 28, rating: 4.4 },
];

const AcceptanceRates = () => {
  const [activeTab, setActiveTab] = useState("drivers");

  const getStatusColor = (rate, isAcceptance = true) => {
    if (isAcceptance) {
      return rate >= 90 ? "text-green-500" : rate >= 80 ? "text-yellow-500" : "text-red-500";
    } else {
      return rate <= 5 ? "text-green-500" : rate <= 15 ? "text-yellow-500" : "text-red-500";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container-section py-6">
        <div className="mb-8">
          <h1 className="heading-lg mb-2">Acceptance & <span className="text-namma-purple">Cancellation</span> Rates</h1>
          <p className="text-namma-gray">
            Monitor driver and user reliability metrics to enhance ride matching and improve service quality.
          </p>
        </div>

        <Tabs defaultValue="drivers" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="drivers" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" /> Driver Metrics
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <UserX className="w-4 h-4" /> User Metrics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drivers" className="space-y-6">
            <GlassMorphism className="p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <ThumbsUp className="mr-2 h-5 w-5 text-namma-green" />
                  Driver Acceptance Rates
                </h2>
                <div className="flex items-center text-sm bg-white/10 px-3 py-1 rounded-full">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{driverData.length} Drivers</span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left pb-2">Driver</th>
                      <th className="text-left pb-2">Acceptance Rate</th>
                      <th className="text-left pb-2">Cancellation Rate</th>
                      <th className="text-left pb-2">Completed Rides</th>
                      <th className="text-left pb-2">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {driverData.map((driver, index) => (
                      <tr key={index} className="border-b border-white/5 last:border-b-0">
                        <td className="py-3 font-medium">{driver.name}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Progress value={driver.acceptanceRate} className="w-24 h-2" />
                            <span className={getStatusColor(driver.acceptanceRate)}>
                              {driver.acceptanceRate}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Progress value={driver.cancellationRate} className="w-24 h-2" />
                            <span className={getStatusColor(driver.cancellationRate, false)}>
                              {driver.cancellationRate}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3">{driver.completedRides}</td>
                        <td className="py-3">⭐ {driver.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassMorphism>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GlassMorphism className="p-4">
                <h3 className="font-semibold flex items-center">
                  <ThumbsUp className="mr-2 h-4 w-4 text-namma-green" />
                  Platform Averages
                </h3>
                <div className="mt-3 space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Acceptance Rate</span>
                      <span className="font-medium">89.6%</span>
                    </div>
                    <Progress value={89.6} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Cancellation Rate</span>
                      <span className="font-medium">10.4%</span>
                    </div>
                    <Progress value={10.4} className="h-2" />
                  </div>
                </div>
              </GlassMorphism>
              
              <GlassMorphism className="p-4 col-span-2">
                <h3 className="font-semibold mb-3">Impact on Driver Earnings</h3>
                <p className="text-sm">
                  Drivers with acceptance rates above 90% earn an average of 25% more than those with rates below 80%. 
                  High cancellation rates can reduce visibility in the ride matching algorithm.
                </p>
                <div className="mt-3 p-3 bg-white/5 rounded-lg text-sm">
                  <p className="font-medium">Recommendation:</p>
                  <p>Maintain at least a 90% acceptance rate to maximize earnings potential and ride opportunities.</p>
                </div>
              </GlassMorphism>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <GlassMorphism className="p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <UserX className="mr-2 h-5 w-5 text-namma-purple" />
                  User Cancellation Rates
                </h2>
                <div className="flex items-center text-sm bg-white/10 px-3 py-1 rounded-full">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{userData.length} Recent Users</span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left pb-2">User</th>
                      <th className="text-left pb-2">Cancellation Rate</th>
                      <th className="text-left pb-2">Completed Rides</th>
                      <th className="text-left pb-2">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((user, index) => (
                      <tr key={index} className="border-b border-white/5 last:border-b-0">
                        <td className="py-3 font-medium">{user.name}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Progress value={user.cancellationRate} className="w-24 h-2" />
                            <span className={getStatusColor(user.cancellationRate, false)}>
                              {user.cancellationRate}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3">{user.completedRides}</td>
                        <td className="py-3">⭐ {user.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassMorphism>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GlassMorphism className="p-4">
                <h3 className="font-semibold mb-3">User Reliability Score</h3>
                <p className="text-sm mb-4">
                  Namma Yatri's algorithm assigns a reliability score to users based on their 
                  cancellation history and ride completion rates.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>High Reliability (0-5% cancellation)</span>
                      <span className="font-medium text-green-500">62% of users</span>
                    </div>
                    <Progress value={62} className="h-2 bg-white/10" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Medium Reliability (5-15% cancellation)</span>
                      <span className="font-medium text-yellow-500">28% of users</span>
                    </div>
                    <Progress value={28} className="h-2 bg-white/10" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Low Reliability (&gt;15% cancellation)</span>
                      <span className="font-medium text-red-500">10% of users</span>
                    </div>
                    <Progress value={10} className="h-2 bg-white/10" />
                  </div>
                </div>
              </GlassMorphism>
              
              <GlassMorphism className="p-4">
                <h3 className="font-semibold mb-3">Impact on Ride Matching</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h4 className="font-medium text-green-500 flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1" /> High Reliability Users
                    </h4>
                    <p className="text-sm mt-1">
                      Priority matching with top-rated drivers
                    </p>
                    <p className="text-sm mt-1">
                      Access to premium features and promotions
                    </p>
                  </div>
                  
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h4 className="font-medium text-yellow-500 flex items-center">
                      <ThumbsDown className="h-4 w-4 mr-1" /> Low Reliability Users
                    </h4>
                    <p className="text-sm mt-1">
                      May experience longer wait times for matching
                    </p>
                    <p className="text-sm mt-1">
                      Potential restriction of certain platform features
                    </p>
                  </div>
                </div>
              </GlassMorphism>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default AcceptanceRates;
