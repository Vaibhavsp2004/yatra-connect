
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import DriverSection from '@/components/DriverSection';
import UserSection from '@/components/UserSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { MapPin, ThumbsUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassMorphism from '@/components/GlassMorphism';

const Index = () => {
  useEffect(() => {
    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Clean up event listeners on component unmount
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <DriverSection />
        <UserSection />
        
        {/* New Features Section */}
        <section className="py-20 overflow-hidden">
          <div className="container-section">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Advanced <span className="text-namma-purple">Features</span></h2>
              <p className="text-namma-gray text-lg max-w-3xl mx-auto">
                Discover our newest innovations designed to make your Namma Yatri experience even better, 
                whether you're a driver or a rider.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Demand Map Card */}
              <GlassMorphism variant="default" className="p-6 text-center">
                <div className="bg-gradient-to-br from-namma-green to-namma-blue inline-flex p-3 rounded-full mb-4">
                  <MapPin className="h-8 w-8 text-namma-dark" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Demand Maps</h3>
                <p className="text-namma-gray mb-6">
                  Interactive heatmaps showing real-time ride demand and driver density for optimal positioning.
                </p>
                <Link to="/demand-map">
                  <Button className="bg-namma-green hover:bg-namma-green/90 text-namma-dark">
                    Explore Demand Maps
                  </Button>
                </Link>
              </GlassMorphism>
              
              {/* Acceptance Rates Card */}
              <GlassMorphism variant="default" className="p-6 text-center">
                <div className="bg-gradient-to-br from-namma-purple to-namma-blue inline-flex p-3 rounded-full mb-4">
                  <ThumbsUp className="h-8 w-8 text-namma-dark" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Acceptance Rates</h3>
                <p className="text-namma-gray mb-6">
                  Track driver acceptance and user cancellation rates to improve reliability and service quality.
                </p>
                <Link to="/acceptance-rates">
                  <Button className="bg-namma-purple hover:bg-namma-purple/90 text-white">
                    View Acceptance Metrics
                  </Button>
                </Link>
              </GlassMorphism>
              
              {/* Pre-Booking Card */}
              <GlassMorphism variant="default" className="p-6 text-center">
                <div className="bg-gradient-to-br from-namma-blue to-namma-purple inline-flex p-3 rounded-full mb-4">
                  <Calendar className="h-8 w-8 text-namma-dark" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pre-Booking</h3>
                <p className="text-namma-gray mb-6">
                  Schedule rides in advance for guaranteed availability and peace of mind.
                </p>
                <Link to="/pre-booking">
                  <Button className="bg-namma-blue hover:bg-namma-blue/90 text-namma-dark">
                    Schedule a Ride
                  </Button>
                </Link>
              </GlassMorphism>
            </div>
          </div>
        </section>
        
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
