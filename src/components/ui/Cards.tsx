import React, { useState, useEffect } from 'react'; // Import useEffect
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import Button from './Button';
import { useLocation } from 'react-router-dom'; // Import useLocation

// Define a global type for the window object to include our custom function
declare global {
  interface Window {
    triggerGoldenLogoFound?: (logoId: string) => void;
  }
}

// Consolidated card components
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="relative bg-rb-gray-900 p-8 rounded-lg overflow-hidden group transition-colors duration-300 hover:bg-rb-gray-800">
    <Icon size={40} className="text-rb-red mb-4" />
    <h3 className="text-2xl font-bebas mb-4 text-rb-white">{title}</h3>
    <p className="text-rb-gray-400 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
      {description}
    </p>
  </div>
);

export const FlipCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[300px] perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className={`absolute inset-0 bg-rb-gray-900 rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all duration-500 ${
          isFlipped ? 'rotate-y-180 backface-hidden' : 'backface-hidden'
        }`}
      >
        <Icon size={48} className="text-rb-red mb-6" />
        <h3 className="text-2xl font-bebas text-rb-white">{title}</h3>
      </motion.div>

      <motion.div
        className={`absolute inset-0 bg-rb-gray-900 rounded-lg p-8 flex flex-col items-center justify-center text-center transition-all duration-500 ${
          isFlipped ? 'backface-hidden' : 'rotate-y-180 backface-hidden'
        }`}
      >
        <p className="text-rb-gray-300">{description}</p>
      </motion.div>
    </div>
  );
};

interface GalleryItemProps {
  image: string;
  title: string;
  category: string;
  index: number;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({ image, title, category, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation(); // Get current location
  const [isLogo2Found, setIsLogo2Found] = useState(false); // State for this specific logo

  // Check local storage on mount to see if this logo was already found
  useEffect(() => {
    const foundLogos = JSON.parse(localStorage.getItem('recklessbear_found_logos') || '[]');
    if (foundLogos.includes('golden-logo-2')) {
      setIsLogo2Found(true);
    }
  }, []);

  // Handle click for golden-logo-2
  const handleLogo2Click = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the parent card's click/link from triggering
    if (!isLogo2Found) {
      if (window.triggerGoldenLogoFound) {
        window.triggerGoldenLogoFound('golden-logo-2');
        setIsLogo2Found(true); // Optimistically update state for immediate visual feedback
      } else {
        console.warn('window.triggerGoldenLogoFound is not defined. CompetitionProvider might not be loaded.');
      }
    }
  };

  // Conditional rendering for golden-logo-2
  // Only render if:
  // 1. It's the "Cricket Pants" card (based on title, adjust if you have a product slug/ID)
  // 2. The current page is '/products/school-team-sports'
  // 3. The logo hasn't been found yet
  const shouldRenderGoldenLogo2 = 
    title === "CRICKET PANTS" && // Target the specific product card
    location.pathname === '/products/school-team-sports' && // Target the specific category page
    !isLogo2Found; // Only show if not yet found
  
  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg cursor-pointer aspect-square"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500"
        style={{ 
          backgroundImage: `url(${image})`,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
        }}
      >
        {/* Golden Logo 2 - Positioned over the RB logo on the Cricket Pants */}
        {shouldRenderGoldenLogo2 && (
          <img
            id="golden-logo-2" // Unique ID for this logo
            src="/Golden-Logo.png" // Path to your golden logo image
            alt="Hidden Golden Logo"
            className={`golden-logo-image absolute z-30`} // z-index higher than overlay
            onClick={handleLogo2Click}
            // Fine-tuned styles for precise overlay on the RB logo on the pants image
            // These values are estimates and might require pixel-perfect adjustment
            // after deployment by inspecting the live site.
            style={{
              width: '20px', // Estimated size of the RB logo on the pants
              height: '20px', // Estimated size
              top: '25%', // Adjust vertically (percentage relative to image height)
              left: '40%', // Adjust horizontally (percentage relative to image width)
              opacity: 0.15, // Subtle transparency
            }}
          />
        )}
      </div>
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-rb-black via-transparent to-transparent p-4 flex flex-col justify-end"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        <h3 className="text-lg md:text-xl font-bebas text-rb-white truncate">{title}</h3>
        <p className="text-xs md:text-sm text-rb-gray-400 truncate">{category}</p>
      </motion.div>
    </motion.div>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  image: string;
  delay?: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  features,
  ctaText,
  ctaLink,
  image,
  delay = 0,
}) => (
  <motion.div 
    className="bg-rb-gray-900 rounded-lg overflow-hidden h-full flex flex-col"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div 
      className="h-56 bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${image})` 
      }}
    />
    
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-2xl font-bebas text-rb-white mb-2">{title}</h3>
      <p className="text-rb-gray-300 mb-4">{description}</p>
      
      <ul className="mb-6 space-y-2 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="text-rb-gray-400 flex items-start">
            <span className="text-rb-red mr-2">•</span>
            {feature}
          </li>
        ))}
      </ul>
      
      <div className="mt-auto">
        <Button to={ctaLink} variant="outline" size="md">
          {ctaText}
        </Button>
      </div>
    </div>
  </motion.div>
);
