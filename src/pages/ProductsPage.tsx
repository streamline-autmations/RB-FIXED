import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter, Grid3X3, Grid2X2, LayoutList } from 'lucide-react';
import Button from '../components/ui/Button';
import { getAllCategories, getProductsByCategory, Product } from '../data/productsData';

const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'1' | '2' | '3'>('1');
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Set default view mode based on screen size
      if (mobile) {
        setViewMode('1'); // Single column for mobile/tablet
      } else {
        setViewMode('3'); // Three columns for desktop
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = ['All', ...getAllCategories()];
  const allProducts = getProductsByCategory('All');
  
  const filteredProducts = selectedCategory === 'All'
    ? allProducts
    : getProductsByCategory(selectedCategory);

  const getGridClasses = () => {
    switch (viewMode) {
      case '1':
        return 'grid-cols-1';
      case '2':
        return 'grid-cols-2';
      case '3':
      default:
        return 'grid-cols-3';
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
            <h1 className="text-5xl md:text-6xl font-bebas mb-6">Our Products</h1>
            <p className="text-lg text-rb-gray-300">
              Browse our complete range of custom sportswear and team apparel
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and View Toggle Section */}
      <section className="py-6 bg-rb-gray-900 border-b border-rb-gray-800">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filter Section */}
            <div className="flex items-center gap-4">
              {isMobile ? (
                // Mobile: Dropdown
                <>
                  <Filter size={20} className="text-rb-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-rb-gray-800 text-rb-white border border-rb-gray-700 rounded-md px-4 py-2 focus:border-rb-red focus:outline-none"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'All' ? 'All Products' : category}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                // Desktop: Pills
                <div className="flex flex-wrap items-center gap-3">
                  <Filter size={20} className="text-rb-gray-400" />
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full border font-medium text-sm transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-rb-red text-rb-white border-rb-red'
                          : 'border-rb-gray-600 text-rb-gray-300 hover:border-rb-gray-400 hover:text-rb-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

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

      {/* Products Grid */}
      <section className="py-16 bg-rb-gray-900">
        <div className="container-custom">
          <div className={`grid ${getGridClasses()} gap-8`}>
            {filteredProducts.map((product, index) => (
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
                      <h3 className="text-sm md:text-lg lg:text-2xl font-bebas text-rb-white group-hover:text-rb-red transition-colors">
                        {product.title}
                      </h3>
                      <span className="inline-block bg-rb-red px-1 py-0.5 md:px-2 md:py-1 lg:px-3 lg:py-1 rounded-sm text-rb-white text-xs md:text-sm mt-1 md:mt-2 truncate text-center max-w-full">
                        {product.subcategory}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
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
            <h2 className="text-4xl font-bebas mb-6">Can't Find What You're Looking For?</h2>
            <p className="text-rb-gray-300 mb-8">
              Get in touch with our team to discuss custom designs and special requirements
            </p>
            <Button to="/contact" variant="primary" size="lg">
              Contact Us
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProductsPage;