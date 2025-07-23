import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GalleryItem } from '../components/ui/Cards';

const GalleryPage: React.FC = () => {
  const categories = ['All', 'Sports Kits', 'Corporate', 'Gym Wear'];
  const [activeCategory, setActiveCategory] = useState('All');
  
  const galleryItems = [
    { image: '/sublimated-card.jpg', title: 'Rugby Team Kit', category: 'Sports Kits' },
    { image: 'https://images.pexels.com/photos/618612/pexels-photo-618612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'School Athletics Uniform', category: 'Sports Kits' },
    { image: 'https://images.pexels.com/photos/8007513/pexels-photo-8007513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Custom Netball Dress', category: 'Sports Kits' },
    { image: 'https://images.pexels.com/photos/8112200/pexels-photo-8112200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Corporate Staff Uniform', category: 'Corporate' },
    { image: 'https://images.pexels.com/photos/4753878/pexels-photo-4753878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Performance Training Shirt', category: 'Gym Wear' },
    { image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Soccer Team Kit', category: 'Sports Kits' },
    { image: 'https://images.pexels.com/photos/5699514/pexels-photo-5699514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Corporate Polos', category: 'Corporate' },
    { image: 'https://images.pexels.com/photos/10105925/pexels-photo-10105925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', title: 'Gym Compression Set', category: 'Gym Wear' }
  ];
  
  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);
  
  return (
    <>
      {/* Gallery Hero */}
      <section className="pt-32 pb-16 bg-rb-black texture-overlay relative">
        <div className="absolute inset-0 bg-gradient-to-b from-rb-black to-transparent opacity-80"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bebas mb-6">Our Work</h1>
            <p className="text-lg text-rb-gray-300 mb-8">
              Browse our custom sportswear and apparel creations for teams, businesses, and individuals.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  className={`px-6 py-2 rounded-full border-2 font-bebas tracking-wide transition-all duration-300 ${
                    activeCategory === category 
                      ? 'bg-rb-red text-rb-white border-rb-red' 
                      : 'border-rb-gray-700 text-rb-gray-300 hover:border-rb-white hover:text-rb-white'
                  }`}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Gallery Grid */}
      <section className="py-16 bg-rb-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <GalleryItem 
                key={index}
                image={item.image}
                title={item.title}
                category={item.category}
                index={index}
              />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-rb-gray-400">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default GalleryPage;