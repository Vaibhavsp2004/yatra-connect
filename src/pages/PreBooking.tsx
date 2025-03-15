
import React, { useState } from 'react';
import { Calendar, Clock, Bell, Car, AlertCircle, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassMorphism from '@/components/GlassMorphism';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

const PreBooking = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  
  // Mock data for previous bookings
  const previousBookings = [
    { 
      id: 1, 
      pickup: "Indiranagar", 
      dropoff: "Whitefield", 
      date: "2023-06-20", 
      time: "09:30 AM", 
      status: "completed", 
      driverName: "Rajesh K",
      driverRating: 4.8
    },
    { 
      id: 2, 
      pickup: "Koramangala", 
      dropoff: "Electronic City", 
      date: "2023-06-22", 
      time: "06:00 PM", 
      status: "upcoming", 
      driverName: "Suresh M",
      driverRating: 4.9
    },
    { 
      id: 3, 
      pickup: "MG Road", 
      dropoff: "Airport", 
      date: "2023-06-25", 
      time: "04:15 AM", 
      status: "upcoming", 
      driverName: "Pending",
      driverRating: null
    }
  ];
  
  type FormValues = {
    pickup: string;
    dropoff: string;
    date: Date;
    time: string;
    notes: string;
  };

  const form = useForm<FormValues>({
    defaultValues: {
      pickup: "",
      dropoff: "",
      time: "",
      notes: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    console.log("Booking data:", { ...data, date });
    
    // Simulate booking confirmation
    setTimeout(() => {
      setBookingSubmitted(true);
      
      toast({
        title: "Ride Pre-Booked Successfully!",
        description: `Your ride from ${data.pickup} to ${data.dropoff} has been scheduled for ${format(date!, 'PPP')} at ${data.time}.`,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container-section py-6">
        <div className="mb-8">
          <h1 className="heading-lg mb-2">Pre-Book Your <span className="text-namma-blue">Ride</span></h1>
          <p className="text-namma-gray">
            Schedule rides in advance to ensure availability and avoid waiting times.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="order-2 lg:order-1">
            <GlassMorphism variant="light" className="p-6">
              {!bookingSubmitted ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="pickup"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pickup Location</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter pickup address" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="dropoff"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dropoff Location</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter destination address" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                      
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} required />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Instructions (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Any special requirements for the driver?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Pre-booking guidelines:</p>
                        <ul className="text-xs list-disc pl-4 mt-1 space-y-1">
                          <li>Schedule rides at least 2 hours in advance</li>
                          <li>You'll be notified when a driver accepts your ride</li>
                          <li>Free cancellation up to 30 minutes before pickup</li>
                        </ul>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-namma-blue hover:bg-namma-blue/90"
                      disabled={!date}
                    >
                      Schedule Ride
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-green-500/10 p-4 rounded-full inline-flex mb-4">
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                  <p className="text-namma-gray mb-6">Your ride has been scheduled successfully.</p>
                  
                  <div className="text-left bg-white/10 p-4 rounded-lg mb-6">
                    <div className="grid grid-cols-2 gap-y-3">
                      <div>
                        <p className="text-xs text-namma-gray">Pickup</p>
                        <p className="font-medium">{form.getValues().pickup}</p>
                      </div>
                      <div>
                        <p className="text-xs text-namma-gray">Dropoff</p>
                        <p className="font-medium">{form.getValues().dropoff}</p>
                      </div>
                      <div>
                        <p className="text-xs text-namma-gray">Date</p>
                        <p className="font-medium">{date ? format(date, "PPP") : ""}</p>
                      </div>
                      <div>
                        <p className="text-xs text-namma-gray">Time</p>
                        <p className="font-medium">{form.getValues().time}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center bg-blue-500/10 p-3 rounded-lg">
                    <Bell className="h-5 w-5 text-blue-500 mr-2" />
                    <p className="text-sm">You'll receive notifications about your ride</p>
                  </div>
                  
                  <Button 
                    className="mt-8 bg-namma-blue hover:bg-namma-blue/90"
                    onClick={() => setBookingSubmitted(false)}
                  >
                    Book Another Ride
                  </Button>
                </div>
              )}
            </GlassMorphism>
          </div>
          
          {/* Information Sidebar */}
          <div className="order-1 lg:order-2 space-y-6">
            <GlassMorphism className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-namma-purple" />
                Why Pre-Book with Namma Yatri?
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-namma-blue/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-namma-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">Plan Ahead</h3>
                    <p className="text-sm text-namma-gray">Schedule rides up to 7 days in advance for peace of mind</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-namma-green/10 p-2 rounded-full">
                    <Car className="h-5 w-5 text-namma-green" />
                  </div>
                  <div>
                    <h3 className="font-medium">Guaranteed Availability</h3>
                    <p className="text-sm text-namma-gray">Ensure a driver is available even during peak hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-namma-purple/10 p-2 rounded-full">
                    <Bell className="h-5 w-5 text-namma-purple" />
                  </div>
                  <div>
                    <h3 className="font-medium">Timely Notifications</h3>
                    <p className="text-sm text-namma-gray">Receive reminders and driver updates before your scheduled ride</p>
                  </div>
                </div>
              </div>
            </GlassMorphism>
            
            <GlassMorphism className="p-6">
              <h2 className="text-xl font-semibold mb-4">Your Scheduled Rides</h2>
              
              {previousBookings.length > 0 ? (
                <div className="space-y-4">
                  {previousBookings.map(booking => (
                    <div 
                      key={booking.id} 
                      className={`p-3 rounded-lg border ${
                        booking.status === 'completed' 
                          ? 'border-gray-200/20 bg-white/5' 
                          : 'border-blue-500/20 bg-blue-500/5'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{booking.pickup} to {booking.dropoff}</span>
                            {booking.status === 'upcoming' && (
                              <span className="bg-blue-500/20 text-blue-500 text-xs px-2 py-0.5 rounded-full">
                                Upcoming
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-namma-gray mt-1">
                            {booking.date} at {booking.time}
                          </p>
                        </div>
                        {booking.status === 'upcoming' && (
                          <Button variant="outline" size="sm" className="text-xs h-7">
                            Cancel
                          </Button>
                        )}
                      </div>
                      
                      <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-namma-gray" />
                          <span className="text-sm">
                            {booking.driverName} 
                            {booking.driverRating && ` · ⭐ ${booking.driverRating}`}
                          </span>
                        </div>
                        {booking.status === 'upcoming' && booking.driverRating && (
                          <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                            Contact
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-white/5 rounded-lg">
                  <Calendar className="h-10 w-10 mx-auto text-namma-gray mb-2" />
                  <p>No scheduled rides yet</p>
                  <p className="text-sm text-namma-gray mt-1">Your upcoming rides will appear here</p>
                </div>
              )}
            </GlassMorphism>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PreBooking;
