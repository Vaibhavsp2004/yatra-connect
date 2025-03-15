
import React from 'react';
import { Button } from '@/components/ui/button';
import GlassMorphism from './GlassMorphism';
import AnimatedElement from './AnimatedElement';
import { Download, ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section id="download" className="py-20 overflow-hidden">
      <div className="container-section">
        <AnimatedElement animation="fade-up" className="max-w-4xl mx-auto">
          <GlassMorphism variant="colored" className="p-12 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-namma-purple/20 rounded-full filter blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-namma-blue/20 rounded-full filter blur-3xl" />
            
            <div className="relative z-10 text-center space-y-6">
              <h2 className="heading-lg mb-4 text-balance">Ready to Experience <span className="text-namma-purple">Namma Yatri</span>?</h2>
              <p className="text-namma-dark text-lg max-w-2xl mx-auto">
                Join thousands of satisfied riders and drivers in our community-driven platform. Download the app today and enjoy transparent, commission-free rides.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-namma-purple hover:bg-namma-purple/90 text-white px-8 py-6 rounded-xl text-lg flex items-center gap-2">
                  <Download className="h-5 w-5" /> Android App
                </Button>
                <Button className="bg-namma-dark hover:bg-namma-dark/90 text-white px-8 py-6 rounded-xl text-lg flex items-center gap-2">
                  <Download className="h-5 w-5" /> iOS App
                </Button>
              </div>
              
              <div className="pt-2">
                <a href="#" className="text-namma-purple hover:text-namma-purple/90 font-medium inline-flex items-center">
                  Learn more about our community <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </GlassMorphism>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default CTASection;
