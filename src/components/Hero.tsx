
import React from 'react';
import { Button } from '@/components/ui/button';
import GlassMorphism from './GlassMorphism';
import AnimatedElement from './AnimatedElement';
import { Download, MapPin, Navigation } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-white via-white to-muted/50">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-1/2 h-1/2 bg-namma-blue/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-namma-purple/5 rounded-full filter blur-3xl" />
      
      <div className="container-section relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <AnimatedElement animation="fade-down" className="space-y-3">
              <div className="inline-block">
                <GlassMorphism className="px-4 py-2">
                  <span className="text-sm font-medium text-namma-purple flex items-center">
                    <Navigation className="h-4 w-4 mr-2" />
                    Community-driven ride-hailing
                  </span>
                </GlassMorphism>
              </div>
              <h1 className="heading-xl">
                Connecting <span className="text-namma-purple">Bengaluru</span>, one ride at a time
              </h1>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={0.1} className="text-lg text-namma-gray max-w-xl">
              Namma Yatri is a direct-to-driver platform that ensures 100% of your fare goes to drivers. 
              Experience transparent pricing, zero commissions, and community-driven service.
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={0.2} className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-namma-purple hover:bg-namma-purple/90 text-white px-8 py-6 rounded-xl text-lg">
                Book a Ride
              </Button>
              <Button variant="outline" className="border-namma-purple text-namma-purple hover:bg-namma-purple/10 px-8 py-6 rounded-xl text-lg">
                <Download className="mr-2 h-5 w-5" /> Get the App
              </Button>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={0.3}>
              <div className="flex items-center space-x-2 text-sm text-namma-gray">
                <MapPin className="h-4 w-4 text-namma-purple" />
                <span>Available in Bengaluru, Karnataka</span>
              </div>
            </AnimatedElement>
          </div>
          
          <AnimatedElement animation="scale-in" delay={0.2} className="relative h-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-namma-blue/20 rounded-full filter blur-xl animate-float" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-namma-purple/20 rounded-full filter blur-xl animate-float" style={{ animationDelay: '2s' }} />
              
              <GlassMorphism variant="light" className="relative z-10 overflow-hidden rounded-3xl shadow-xl">
                <img 
                  src="https://placehold.co/600x900/853EEF/FFFFFF?text=Namma+Yatri+App" 
                  alt="Namma Yatri App" 
                  className="w-full h-auto object-cover rounded-3xl transform transition-transform hover:scale-[1.02] duration-500"
                />
              </GlassMorphism>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </div>
  );
};

export default Hero;
