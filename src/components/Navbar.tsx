
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import GlassMorphism from './GlassMorphism';
import AnimatedElement from './AnimatedElement';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Features', href: '#features' },
    { label: 'For Drivers', href: '#drivers' },
    { label: 'For Users', href: '#users' },
    { label: 'Download', href: '#download' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <GlassMorphism 
        variant={isScrolled ? 'light' : 'default'} 
        className={`transition-all duration-300 mx-4 ${isScrolled ? 'shadow-md' : ''}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between">
            <AnimatedElement animation="fade-in" className="flex items-center">
              <a href="#" className="flex items-center">
                <span className="text-2xl font-bold text-namma-purple mr-1">Namma</span>
                <span className="text-2xl font-bold text-namma-dark">Yatri</span>
              </a>
            </AnimatedElement>

            {/* Desktop Menu */}
            <AnimatedElement animation="fade-in" className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <a 
                  key={index} 
                  href={item.href} 
                  className="text-namma-dark hover:text-namma-purple transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </AnimatedElement>

            <AnimatedElement animation="fade-in" className="hidden md:block">
              <Button className="bg-namma-purple text-white hover:bg-namma-purple/90">
                Sign Up
              </Button>
            </AnimatedElement>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              className="md:hidden" 
              onClick={toggleMobileMenu}
              size="icon"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </nav>
        </div>
      </GlassMorphism>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <GlassMorphism variant="light" className="md:hidden mt-2 mx-4">
          <nav className="flex flex-col space-y-4 p-4">
            {navItems.map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                className="text-namma-dark hover:text-namma-purple transition-colors py-2 px-4 rounded-md hover:bg-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button className="bg-namma-purple text-white hover:bg-namma-purple/90 w-full">
              Sign Up
            </Button>
          </nav>
        </GlassMorphism>
      )}
    </header>
  );
};

export default Navbar;
