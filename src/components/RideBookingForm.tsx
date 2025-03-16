
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { MapPin, Navigation, Calendar, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface BookingFormValues {
  pickup: string;
  destination: string;
  date?: Date;
  time?: string;
}

const RideBookingForm = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();

  const form = useForm<BookingFormValues>({
    defaultValues: {
      pickup: '',
      destination: '',
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    // Add date and time if selected
    if (date) {
      data.date = date;
    }
    
    console.log('Booking data:', data);
    
    // Show success toast
    toast({
      title: "Ride Booked!",
      description: `Your ride from ${data.pickup} to ${data.destination} has been booked.`,
      duration: 5000,
    });
    
    // Reset form
    form.reset();
    setDate(undefined);
  };

  return (
    <Card className="p-6 shadow-md border border-border/50 bg-white">
      <h2 className="text-2xl font-bold mb-6">Book Your Ride</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="pickup"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-namma-purple" />
                  Pickup Location
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter pickup location" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-namma-purple" />
                  Destination
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter destination" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <FormLabel className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-namma-blue" />
                Date (Optional)
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="flex items-center gap-2">
                    Time (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-namma-purple hover:bg-namma-purple/90 text-white"
            >
              Book Now
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-2 justify-center">
            <AlertCircle className="h-3 w-3" />
            <span>You can also use our demand map for finding the best driver availability</span>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default RideBookingForm;
