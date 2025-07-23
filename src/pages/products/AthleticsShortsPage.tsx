import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const AthleticsShortsPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    { src: '/athletics-shorts-frontback.png', alt: 'Athletics Shorts Front and Back View' },
    { src: '/athletics-shorts-design-guide.png', alt: 'Athletics Shorts Design Guide' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-rb-black relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(/athletics-shorts-frontback.png)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rb-black to-transparent"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bebas mb-6">ATHLETICS SHORTS</h1>
            <p className="text-xl text-rb-gray-300">High-performance athletics shorts designed for track and field</p>
          </motion.div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 bg-rb-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex gap-4">
                {/* Thumbnails */}
                <div className="flex flex-col gap-3 w-24">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === currentImageIndex ? 'border-rb-red shadow-lg' : 'border-rb-gray-600 hover:border-rb-gray-400'
                      }`}
                    >
                      <img 
                        src={image.src} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover" 
                        loading="lazy" 
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex-1">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-rb-gray-800">
                    <img
                      src={images[currentImageIndex].src}
                      alt={images[currentImageIndex].alt}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-rb-black/60 text-rb-white p-2 rounded-full hover:bg-rb-red/80 transition-colors backdrop-blur-sm"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-rb-black/60 text-rb-white p-2 rounded-full hover:bg-rb-red/80 transition-colors backdrop-blur-sm"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Fabric Specifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-rb-gray-800 p-6 rounded-lg"
              >
                <h3 className="text-xl font-bebas mb-4">FABRIC SPECIFICATIONS</h3>
                <ul className="space-y-2 text-rb-gray-300">
                  <li>• High-performance design for intense rugby play</li>
                  <li>• Sweat-wicking and breathable fabric for comfort</li>
                  <li>• Reinforced seams to withstand tackles and scrums</li>
                  <li>• Premium feel with smooth finish</li>
                  <li>• Easy to clean and made for repeated washing</li>
                </ul>
              </motion.div>

              {/* Available Sizes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-rb-gray-800 p-6 rounded-lg"
              >
                <h3 className="text-xl font-bebas mb-4">AVAILABLE SIZES</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bebas text-rb-white mb-3 text-lg">YOUTH</h4>
                    <div className="grid grid-cols-2 gap-2 text-rb-gray-300 text-sm">
                      <span>1-2</span>
                      <span>3-4</span>
                      <span>5-6</span>
                      <span>7-8</span>
                      <span>9-10</span>
                      <span>11-12</span>
                      <span>13-14</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bebas text-rb-white mb-3 text-lg">ADULT</h4>
                    <div className="grid grid-cols-2 gap-2 text-rb-gray-300 text-sm">
                      <span>XS</span>
                      <span>S</span>
                      <span>M</span>
                      <span>L</span>
                      <span>XL</span>
                      <span>2XL</span>
                      <span>3XL</span>
                      <span>4XL</span>
                      <span>5XL</span>
                      <span>6XL</span>
                      <span>7XL</span>
                      <span>8XL</span>
                      <span>9XL</span>
                      <span>10XL</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="pt-6 space-y-4"
              >
                <Button to="/get-a-quote" variant="primary" size="lg" className="w-full">
                  GET A QUOTE
                </Button>
                <Button to="/contact" variant="outline" size="lg" className="w-full">
                  REQUEST SAMPLE
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="py-16 bg-rb-gray-900">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bebas mb-6">You Might Also Like</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Athletics Short Sleeve T-Shirt',
                image: '/athletics-short-sleeve-t-shirt-frontback.png',
                path: '/products/athletics-tshirt-short'
              },
              {
                title: 'Athletics Mens Vest',
                image: '/athletics-mens-vest-frontback.png',
                path: '/products/athletics-vest-mens'
              },
              {
                title: 'Athletics Leggings',
                image: '/athletics-leggings-frontback.png',
                path: '/products/athletics-leggings'
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={product.path}>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rb-black to-transparent opacity-60"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bebas text-rb-white group-hover:text-rb-red transition-colors">
                        {product.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AthleticsShortsPage;