
import React from 'react';
import { Button } from '@/components/ui/button';
import GlassMorphism from './GlassMorphism';
import AnimatedElement from './AnimatedElement';
import { Check, Percent, Wallet, Users, Award } from 'lucide-react';

const DriverSection = () => {
  const benefits = [
    {
      text: 'Zero commission platform',
      icon: <Percent className="h-5 w-5 text-namma-green" />
    },
    {
      text: 'Keep 100% of your earnings',
      icon: <Wallet className="h-5 w-5 text-namma-green" />
    },
    {
      text: 'Direct connection with riders',
      icon: <Users className="h-5 w-5 text-namma-green" />
    },
    {
      text: 'Community support and recognition',
      icon: <Award className="h-5 w-5 text-namma-green" />
    }
  ];

  return (
    <section id="drivers" className="py-20 overflow-hidden">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedElement animation="slide-right" className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-namma-purple/10 rounded-full filter blur-xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-namma-green/10 rounded-full filter blur-xl" />
              
              <GlassMorphism variant="light" className="relative z-10 overflow-hidden rounded-2xl shadow-lg p-3">
                <img
                  src="https://placehold.co/600x400/7CEF3E/333333?text=Driver+Empowerment"
                  alt="Namma Yatri Driver"
                  className="w-full h-auto rounded-xl"
                />
              </GlassMorphism>
            </div>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-left" className="order-1 lg:order-2 space-y-8">
            <div>
              <h2 className="heading-lg mb-4">Empowering <span className="text-namma-green">Drivers</span></h2>
              <p className="text-namma-gray text-lg">
                Namma Yatri puts drivers first with a zero-commission model that ensures they keep 100% of their earnings, fostering a sustainable livelihood and community connection.
              </p>
            </div>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="rounded-full bg-namma-green/10 p-1">
                      {benefit.icon}
                    </div>
                  </div>
                  <p className="text-namma-dark">{benefit.text}</p>
                </div>
              ))}
            </div>
            
            <Button className="bg-namma-green hover:bg-namma-green/90 text-namma-dark font-medium px-8 py-6 rounded-xl text-lg">
              Join as a Driver
            </Button>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default DriverSection;
