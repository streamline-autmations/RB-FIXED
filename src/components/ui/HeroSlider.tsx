import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

interface Slide {
  id: number;
  backgroundImage: string;
  subtitle: string;
  description: string;
}

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      backgroundImage: '/hero_slide_1.jpg',
      subtitle: 'Custom School Sportswear',
      description: 'Elite uniforms designed for schools and educational institutions across South Africa'
    },
    {
      id: 2,
      backgroundImage: '/hero_slide_2.jpg',
      subtitle: 'Elite Club Kits Built for Performance',
      description: 'Professional-grade sportswear engineered for competitive teams and athletes'
    },
    {
      id: 3,
      backgroundImage: '/hero_slide_3.jpg',
      subtitle: 'Made in SA – Quality Gear for Teams',
      description: 'Proudly manufactured in Johannesburg with world-class standards and craftsmanship'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rb-black/80 via-rb-black/60 to-rb-black/90"></div>
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container-custom py-20 mt-20">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Headline - Consistent across all slides */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide text-rb-white mb-6 leading-tight">
              FROM CONCEPT TO CREATION <span className="text-rb-red">—</span> DO IT RECKLESS
            </h1>

            {/* Dynamic Subtitle */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-2xl md:text-4xl font-bebas text-rb-red mb-4">
                  {slides[currentSlide].subtitle}
                </h2>
                <p className="text-lg md:text-xl text-rb-gray-300 max-w-2xl mx-auto">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
            
            {/* Buttons - Updated text */}
            <motion.div
              className="flex flex-col md:flex-row justify-center gap-4 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button to="/gallery" variant="primary" size="lg" className="group">
                Explore Our Kits
              </Button>
              <Button to="/contact" variant="outline" size="lg" className="group">
                Book a Call
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-rb-black/50 hover:bg-rb-red/80 text-rb-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-rb-black/50 hover:bg-rb-red/80 text-rb-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators - Repositioned to bottom-left, smaller and less prominent */}
      <div className="absolute bottom-8 left-8 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-rb-red opacity-80' 
                : 'bg-rb-white/30 hover:bg-rb-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;