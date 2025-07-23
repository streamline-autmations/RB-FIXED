import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Grid3X3, Grid2X2, LayoutList } from 'lucide-react';
import { Product } from '../../data/productsData';
import { GalleryItem } from '../ui/Cards';
import Button from '../ui/Button';

interface SubcategoryTemplateProps {
  title: string;
  description: string;
  products: Product[];
  showFilter?: boolean;
}

const SubcategoryTemplate: React.FC<SubcategoryTemplateProps> = ({
  title,
  description,
  products,
  showFilter = true
}) => {
  const [viewMode, setViewMode] = useState<'1' | '2' | '3'>('3');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getGridClasses = () => {
    switch (viewMode) {
      case '1':
        return 'grid-cols-1';
      case '2':
        return 'grid-cols-1 sm:grid-cols-2';
      case '3':
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-rb-black texture-overlay relative">
        <div className="absolute inset-0 bg-gradient-to-b from-rb-black to-transparent opacity-80"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bebas mb-6">{title}</h1>
            <p className="text-lg text-rb-gray-300">{description}</p>
          </motion.div>
        </div>
      </section>

      {/* View Toggle Section */}
      {showFilter && (
        <section className="py-6 bg-rb-gray-900 border-b border-rb-gray-800">
          <div className="container-custom">
            <div className="flex justify-end">
              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-rb-gray-400 text-sm mr-2">View:</span>
                <div className="flex border border-rb-gray-700 rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode('1')}
                    className={`p-2 transition-colors duration-200 ${
                      viewMode === '1' 
                        ? 'bg-rb-red text-rb-white' 
                        : 'bg-rb-gray-800 text-rb-gray-400 hover:text-rb-white hover:bg-rb-gray-700'
                    }`}
                    title="Single column"
                  >
                    <LayoutList size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('2')}
                    className={`p-2 transition-colors duration-200 ${
                      viewMode === '2' 
                        ? 'bg-rb-red text-rb-white' 
                        : 'bg-rb-gray-800 text-rb-gray-400 hover:text-rb-white hover:bg-rb-gray-700'
                    }`}
                    title="Two columns"
                  >
                    <Grid2X2 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('3')}
                    className={`p-2 transition-colors duration-200 ${
                      viewMode === '3' 
                        ? 'bg-rb-red text-rb-white' 
                        : 'bg-rb-gray-800 text-rb-gray-400 hover:text-rb-white hover:bg-rb-gray-700'
                    }`}
                    title="Three columns"
                  >
                    <Grid3X3 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-16 bg-rb-gray-900">
        <div className="container-custom">
          {products.length > 0 ? (
            <div className={`grid ${getGridClasses()} gap-8`}>
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
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
                        <h3 className="text-2xl font-bebas text-rb-white group-hover:text-rb-red transition-colors">
                          {product.title}
                        </h3>
                        {product.subcategory && (
                          <span className="inline-block bg-rb-red px-3 py-1 rounded-sm text-rb-white text-sm mt-2">
                            {product.subcategory}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-rb-gray-400">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rb-black">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bebas mb-6">Ready to Order Your {title}?</h2>
            <p className="text-rb-gray-300 mb-8">
              Get in touch with our team for custom designs and bulk orders
            </p>
            <Button to="/contact" variant="primary" size="lg">
              Get a Quote
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SubcategoryTemplate;