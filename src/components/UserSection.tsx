
import React from 'react';
import { Button } from '@/components/ui/button';
import GlassMorphism from './GlassMorphism';
import AnimatedElement from './AnimatedElement';
import { MapPin, Clock, CreditCard, Shield } from 'lucide-react';

const UserSection = () => {
  const benefits = [
    {
      title: 'Easy Booking',
      description: 'Select your pickup and drop-off locations with our intuitive map interface',
      icon: <MapPin className="h-6 w-6 text-namma-blue" />
    },
    {
      title: 'Real-Time Updates',
      description: 'Track your ride in real-time and get accurate ETAs',
      icon: <Clock className="h-6 w-6 text-namma-blue" />
    },
    {
      title: 'Transparent Pricing',
      description: 'See the exact fare upfront with no hidden charges',
      icon: <CreditCard className="h-6 w-6 text-namma-blue" />
    },
    {
      title: 'Safety First',
      description: 'Emergency features and verified drivers for your peace of mind',
      icon: <Shield className="h-6 w-6 text-namma-blue" />
    }
  ];

  return (
    <section id="users" className="py-20 bg-muted/30 overflow-hidden">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedElement animation="slide-right" className="space-y-8">
            <div>
              <h2 className="heading-lg mb-4">For <span className="text-namma-blue">Riders</span></h2>
              <p className="text-namma-gray text-lg">
                Experience seamless, reliable, and transparent ride-hailing with Namma Yatri. 
                Our community-focused approach ensures a better experience for everyone.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <GlassMorphism key={index} className="p-5 h-full">
                  <div className="card-gradient rounded-xl p-2 inline-block mb-3">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-namma-gray">{benefit.description}</p>
                </GlassMorphism>
              ))}
            </div>
            
            <Button className="bg-namma-blue hover:bg-namma-blue/90 text-namma-dark font-medium px-8 py-6 rounded-xl text-lg">
              Book a Ride Now
            </Button>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-left">
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-namma-blue/10 rounded-full filter blur-xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-namma-purple/10 rounded-full filter blur-xl" />
              
              <GlassMorphism variant="light" className="relative z-10 overflow-hidden rounded-2xl shadow-lg p-3">
                <img
                  src="https://placehold.co/600x400/3EEFC3/333333?text=Rider+Experience"
                  alt="Namma Yatri User Experience"
                  className="w-full h-auto rounded-xl"
                />
              </GlassMorphism>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default UserSection;
