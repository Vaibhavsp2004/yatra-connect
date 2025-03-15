
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-namma-purple mr-1">Namma</span>
              <span className="text-2xl font-bold text-namma-dark">Yatri</span>
            </div>
            <p className="text-namma-gray text-sm">
              A community-driven ride-hailing platform that ensures 100% of your payment goes directly to drivers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-namma-purple hover:text-namma-purple/80 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-namma-purple hover:text-namma-purple/80 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-namma-purple hover:text-namma-purple/80 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-namma-purple hover:text-namma-purple/80 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-namma-gray hover:text-namma-purple transition-colors">Home</a></li>
              <li><a href="#features" className="text-namma-gray hover:text-namma-purple transition-colors">Features</a></li>
              <li><a href="#drivers" className="text-namma-gray hover:text-namma-purple transition-colors">For Drivers</a></li>
              <li><a href="#users" className="text-namma-gray hover:text-namma-purple transition-colors">For Users</a></li>
              <li><a href="#download" className="text-namma-gray hover:text-namma-purple transition-colors">Download</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-namma-gray hover:text-namma-purple transition-colors">Help Center</a></li>
              <li><a href="#" className="text-namma-gray hover:text-namma-purple transition-colors">Safety</a></li>
              <li><a href="#" className="text-namma-gray hover:text-namma-purple transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-namma-gray hover:text-namma-purple transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-namma-gray hover:text-namma-purple transition-colors">Driver FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-namma-purple mr-2 mt-0.5" />
                <span className="text-namma-gray">Bengaluru, Karnataka, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-namma-purple mr-2" />
                <span className="text-namma-gray">+91 12345 67890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-namma-purple mr-2" />
                <span className="text-namma-gray">support@nammayatri.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-10 pt-6 text-center text-namma-gray text-sm">
          <p>&copy; {currentYear} Namma Yatri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
