import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram } from 'lucide-react';
import Logo from './Logo'; // Assuming this is the component that renders your RB logo

// Define a global type for the window object to include our custom function
declare global {
  interface Window {
    triggerGoldenLogoFound?: (logoId: string) => void;
  }
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const [isLogo1Found, setIsLogo1Found] = React.useState(false);

  useEffect(() => {
    const foundLogos = JSON.parse(localStorage.getItem('recklessbear_found_logos') || '[]');
    if (foundLogos.includes('golden-logo-1')) {
      setIsLogo1Found(true);
    }
  }, []);

  const handleLogo1Click = () => {
    if (!isLogo1Found) {
      if (window.triggerGoldenLogoFound) {
        window.triggerGoldenLogoFound('golden-logo-1');
        setIsLogo1Found(true);
      } else {
        console.warn('window.triggerGoldenLogoFound is not defined. CompetitionProvider might not be loaded.');
      }
    }
  };

  // Condition to check if we are on the homepage
  const isOnHomepage = location.pathname === '/';
  // Condition to render the golden logo only on homepage AND if not yet found
  const shouldRenderGoldenLogo1 = isOnHomepage && !isLogo1Found;

  return (
    <footer className="bg-rb-gray-900 pt-16 pb-8 border-t border-rb-gray-800 relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo and Tagline */}
          <div className="flex flex-col relative items-start"> 
            {/* This div will contain the Logo component and potentially the golden logo overlay */}
            <div style={{ position: 'relative', display: 'inline-block' }}> {/* Added inline-block for proper sizing */}
              <Logo size="small" style={{ pointerEvents: shouldRenderGoldenLogo1 ? 'none' : 'auto' }} /> {/* Pass style to disable clicks on original logo */}
              
              {/* Golden Logo 1 - Positioned precisely over the small RB icon within the Logo component */}
              {shouldRenderGoldenLogo1 && (
                <img
                  id="golden-logo-1" // Unique ID for this logo
                  src="/Golden-Logo.png" // Path to your golden logo image
                  alt="Hidden Golden Logo"
                  className={`golden-logo-image absolute z-20`} // z-20 ensures it's on top
                  onClick={handleLogo1Click}
                  // These values are fine-tuned estimates for overlaying the small RB icon within your Logo component
                  // You might need to adjust top/left by a few pixels after deployment based on exact rendering.
                  style={{
                    width: '40px', // Estimated size of the RB icon
                    height: '40px', // Estimated size
                    top: '0px', // Align to the top of the Logo component's container
                    left: '0px', // Align to the left of the Logo component's container
                    opacity: 1, // FULLY VISIBLE when replacing the logo
                  }}
                />
              )}
            </div>

            <p className="mt-4 text-rb-gray-400">ELEVATE YOUR GAME. DO IT RECKLESS.</p>
            <div className="flex mt-6 space-x-4">
              <a href="https://www.facebook.com/Recklessbearfitness01" target="_blank" rel="noopener noreferrer" 
                className="bg-rb-gray-800 p-2 rounded-full text-rb-gray-400 hover:text-rb-white hover:bg-rb-red transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/recklessbearapparel/" target="_blank" rel="noopener noreferrer"
                className="bg-rb-gray-800 p-2 rounded-full text-rb-gray-400 hover:text-rb-white hover:bg-rb-red transition-colors duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl mb-4 text-rb-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Home</Link></li>
              <li><Link to="/services" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Services</Link></li>
              <li><Link to="/gallery" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Gallery</Link></li>
              <li><Link to="/about" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">About</Link></li>
              <li><Link to="/contact" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Book a Call</Link></li>
            </ul>
          </div>
          
          {/* Services - Updated headers */}
          <div>
            <h3 className="text-xl mb-4 text-rb-white">Our Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Custom Sports Kits</Link></li>
              <li><Link to="/services" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Corporate Uniforms</Link></li>
              <li><Link to="/services" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Fitness Gear
