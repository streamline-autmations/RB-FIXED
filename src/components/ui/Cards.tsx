import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import Button from './Button';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const [isLogo2Found, setIsLogo2Found] = useState(false);

  useEffect(() => {
    const foundLogos = JSON.parse(localStorage.getItem('recklessbear_found_logos') || '[]');
    if (foundLogos.includes('golden-logo-2')) {
      setIsLogo2Found(true);
    }
  }, []);

  const handleLogo2Click = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLogo2Found) {
      if (window.triggerGoldenLogoFound) {
        window.triggerGoldenLogoFound('golden-logo-2');
        setIsLogo2Found(true);
      } else {
        console.warn('window.triggerGoldenLogoFound is not defined. CompetitionProvider might not be loaded.');
      }
    }
  };

  // Conditional rendering for golden-logo-2
  const shouldRenderGoldenLogo2 = 
    title && // Ensure title is not null/undefined
    title.toLowerCase().trim().includes("cricket pants") && // Added .trim() for robustness
    location.pathname === '/products/school-team-sports' &&
    !isLogo2Found;

  // --- DEBUGGING CONSOLE LOGS ---
  useEffect(() => {
    console.log(`GalleryItem: Title: "${title}", Path: "${location.pathname}", isLogo2Found: ${isLogo2Found}, Should Render Logo 2: ${shouldRenderGoldenLogo2}`);
    if (title && !title.toLowerCase().trim().includes("cricket pants")) {
      console.log(`  - Title check failed: "${title}" does not contain "cricket pants"`);
    }
    if (location.pathname !== '/products/school-team-sports') {
      console.log(`  - Path check failed: "${location.pathname}" is not "/products/school-team-sports"`);
    }
  }, [title, location.pathname, isLogo2Found, shouldRenderGoldenLogo2]);
  // --- END DEBUGGING CONSOLE LOGS ---
  
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
            id="golden-logo-2"
            src="/Golden-Logo.png"
            alt="Hidden Golden Logo"
            className={`golden-logo-image absolute z-30`}
            onClick={handleLogo2Click}
            // Fine-tuned styles for precise overlay on the RB logo on the pants image
            // Adjusted percentages slightly for better alignment
            style={{
              width: '25px',
              height: '25px',
              top: '22%', // Adjusted vertically slightly
              left: '43%', // Adjusted horizontally slightly
              opacity: 0.15,
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

