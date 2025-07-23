import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter, Grid3X3, Grid2X2, LayoutList } from 'lucide-react';
import Button from '../ui/Button';
import { Product } from '../../data/productsData';

interface SubcategoryTemplateProps {
  title: string;
  description: string;
  products: Product[];
  heroImage?: string;
  showFilter?: boolean;
}

const SubcategoryTemplate: React.FC<SubcategoryTemplateProps> = ({ 
  title, 
  description, 
  products,
  heroImage,
  showFilter = false
}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'1' | '2' | '3'>('3');
  const [isMobile, setIsMobile] = useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filters = showFilter ? ['All', ...new Set(products.map(p => p.subcategory).filter(Boolean))] : ['All'];
  const filteredProducts = selectedFilter === 'All' 
    ? products 
    : products.filter(p => p.subcategory === selectedFilter);

  const getGridClasses = () => {
    switch (viewMode) {
      case '1':
        return 'grid-cols-1';
      case '2':
        return 'grid-cols-1 md:grid-cols-2';
      case '3':
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-rb-black texture-overlay relative">
        {heroImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        )}
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

      {/* Filter and View Toggle Section */}
      <section className="py-6 bg-rb-gray-900 border-b border-rb-gray-800">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filter Section */}
            {showFilter && filters.length > 1 ? (
              <div className="flex items-center gap-4">
                {isMobile ? (
                  // Mobile: Dropdown
                  <>
                    <Filter size={20} className="text-rb-gray-400" />
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="bg-rb-gray-800 text-rb-white border border-rb-gray-700 rounded-md px-4 py-2 focus:border-rb-red focus:outline-none"
                    >
                      {filters.map(filter => (
                        <option key={filter} value={filter}>
                          {filter === 'All' ? 'All Products' : filter}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  // Desktop: Pills
                  <div className="flex flex-wrap items-center gap-3">
                    <Filter size={20} className="text-rb-gray-400" />
                    {filters.map((filter, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedFilter(filter)}
                        className={`px-4 py-2 rounded-full border font-medium text-sm transition-all duration-300 ${
                          selectedFilter === filter 
                            ? 'bg-rb-red text-rb-white border-rb-red' 
                            : 'border-rb-gray-600 text-rb-gray-300 hover:border-rb-gray-400 hover:text-rb-white'
                        }`}
                      >
                        {filter === 'All' ? 'All Products' : filter}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div></div>
            )}

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
            {isMobile ? (
              // Mobile: Dropdown
              <div className="flex items-center justify-end gap-4">
                <Filter size={20} className="text-rb-gray-400" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="bg-rb-gray-800 text-rb-white border border-rb-gray-700 rounded-md px-4 py-2 focus:border-rb-red focus:outline-none"
                >
                  {filters.map(filter => (
                    <option key={filter} value={filter}>
                      {filter === 'All' ? 'All Products' : filter}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              // Desktop: Buttons
              <div className="flex flex-wrap justify-center gap-4">
                {filters.map((filter, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-6 py-2 rounded-full border-2 font-bebas tracking-wide transition-all duration-300 ${
                      selectedFilter === filter 
                        ? 'bg-rb-red text-rb-white border-rb-red' 
                        : 'border-rb-gray-700 text-rb-gray-300 hover:border-rb-white hover:text-rb-white'
                    }`}
                  >
                    {filter === 'All' ? 'All Products' : filter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-16 bg-rb-gray-900">
        <div className="container-custom">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-3xl font-bebas text-rb-white mb-4">No Products Found</h2>
              <p className="text-rb-gray-400 mb-8">
      </section>

      {/* CTA */}
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