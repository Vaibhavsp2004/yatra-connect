
import React from 'react';
import GlassMorphism from './GlassMorphism';
import AnimatedElement from './AnimatedElement';
import { MapPin, CreditCard, Users, Clock, Shield, PhoneCall } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: 'Interactive Map Selection',
      description: 'Select precise pickup and drop-off locations with our interactive map interface.',
      icon: <MapPin className="h-12 w-12 p-2 text-namma-purple" />,
      delay: 0.1
    },
    {
      title: 'Direct Payments',
      description: '100% of your payment goes directly to drivers with no hidden commissions.',
      icon: <CreditCard className="h-12 w-12 p-2 text-namma-blue" />,
      delay: 0.2
    },
    {
      title: 'Driver Details',
      description: 'View driver profiles, ratings, and vehicle information before your ride.',
      icon: <Users className="h-12 w-12 p-2 text-namma-orange" />,
      delay: 0.3
    },
    {
      title: 'Real-Time Tracking',
      description: 'Monitor your ride in real-time with accurate location updates.',
      icon: <Clock className="h-12 w-12 p-2 text-namma-green" />,
      delay: 0.4
    },
    {
      title: 'Safety Features',
      description: 'Emergency assistance and 24/7 support for your safety and peace of mind.',
      icon: <Shield className="h-12 w-12 p-2 text-namma-red" />,
      delay: 0.5
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer service for all your ride-related issues.',
      icon: <PhoneCall className="h-12 w-12 p-2 text-namma-pink" />,
      delay: 0.6
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container-section">
        <AnimatedElement animation="fade-up" className="text-center mb-16">
          <h2 className="heading-lg mb-4">Designed for <span className="text-namma-purple">You</span></h2>
          <p className="text-namma-gray max-w-2xl mx-auto text-lg">
            Namma Yatri offers a suite of features focused on transparency, community, and ease of use.
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedElement key={index} animation="scale-in" delay={feature.delay} className="h-full">
              <GlassMorphism className="p-6 h-full">
                <div className="card-gradient rounded-xl p-3 inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-namma-gray">{feature.description}</p>
              </GlassMorphism>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
