import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import Button from './Button';

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
      />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-rb-black via-transparent to-transparent p-4 flex flex-col justify-end"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        <h3 className="text-xl font-bebas text-rb-white">{title}</h3>
        <p className="text-sm text-rb-gray-400">{category}</p>
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