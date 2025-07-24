import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter, Grid3X3, Grid2X2, LayoutList } from 'lucide-react';
import Button from '../components/ui/Button';
import { getProductsByCategory } from '../data/productsData';
import { useCompetition } from '../context/CompetitionProvider'; // Import useCompetition

// Define a global type for the window object to include our custom function
declare global {
  interface Window {
    triggerGoldenLogoFound?: (logoId: string) => void;
  }
}

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const location = useLocation();
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [viewMode, setViewMode] = useState<'1' | '2' | '3'>('1');
  const [isMobile, setIsMobile] = useState(false);

  // --- NEW: Competition Logo 2 State and Context ---
  const { findLogo } = useCompetition(); // Get findLogo function from context
  const [isLogo2Found, setIsLogo2Found] = useState(false); // State for this specific logo

  useEffect(() => {
    const foundLogos = JSON.parse(localStorage.getItem('recklessbear_found_logos') || '[]');
    if (foundLogos.includes('golden-logo-2')) {
      setIsLogo2Found(true);
    }
  }, []);

  // Handle click for golden-logo-2
  const handleLogo2Click = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the parent Link/card click from triggering
    if (!isLogo2Found) {
      findLogo('golden-logo-2'); // Use findLogo from context
      setIsLogo2Found(true); // Optimistically update state for immediate visual feedback
    }
  };
  // --- END NEW ---

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

  // Map URL slugs to category names
  const categoryMap: { [key: string]: string } = {
    'school-team-sports': 'School & Team Sports',
    'other-sports-clubs': 'Other Sports & Clubs',
    'schoolwear-matric': 'Schoolwear & Matric Apparel',
    'corporate-staff': 'Corporate & Staff Apparel',
    'gym-fitness': 'Gym & Fitness Apparel',
    'accessories-branding': 'Accessories & Branding'
  };

  const categoryName = categoryMap[categorySlug || ''] || '';
  const products = getProductsByCategory(categoryName);
  const subcategories = ['All', ...new Set(products.map(p => p.subcategory).filter(Boolean))];
  
  const filteredProducts = selectedSubcategory === 'All' 
    ? products 
    : products.filter(p => p.subcategory === selectedSubcategory);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug]);

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

  if (!categoryName) {
    return (
      <div className="pt-32 pb-16 bg-rb-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bebas text-rb-white mb-4">Category Not Found</h1>
          <Link to="/products" className="text-rb-red hover:text-rb-white">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

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
            <h1 className="text-5xl md:text-6xl font-bebas mb-6">{categoryName}</h1>
            <p className="text-lg text-rb-gray-300">
              Browse our complete range of {categoryName.toLowerCase()} products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter and View Toggle Section */}
      {subcategories.length > 1 && (
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
                      value={selectedSubcategory}
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                      className="bg-rb-gray-800 text-rb-white border border-rb-gray-700 rounded-md px-4 py-2 focus:border-rb-red focus:outline-none"
                    >
                      {subcategories.map(subcategory => (
                        <option key={subcategory} value={subcategory}>
                          {subcategory === 'All' ? 'All Subcategories' : subcategory}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  // Desktop: Pills
                  <div className="flex flex-wrap items-center gap-3">
                    <Filter size={20} className="text-rb-gray-400" />
                    {subcategories.map((subcategory, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSubcategory(subcategory)}
                        className={`px-4 py-2 rounded-full border font-medium text-sm transition-all duration-300 ${
                          selectedSubcategory === subcategory 
                            ? 'bg-rb-red text-rb-white border-rb-red' 
                            : 'border-rb-gray-600 text-rb-gray-300 hover:border-rb-gray-400 hover:text-rb-white'
                        }`}
                      >
                        {subcategory === 'All' ? 'All Subcategories' : subcategory}
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
      )}

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
                    >
                      {/* --- NEW: Golden Logo 2 --- */}
                      {/* Conditional rendering for golden-logo-2 */}
                      {/* Only render if:
                          1. It's the "Cricket Pants" card (robust check for title)
                          2. The current categorySlug is 'school-team-sports'
                          3. The logo hasn't been found yet
                      */}
                      {product.title.toLowerCase().trim().includes("cricket pants") &&
                       categorySlug === 'school-team-sports' && // Use categorySlug from useParams
                       !isLogo2Found && (
                        <img
                          id="golden-logo-2" // Unique ID for this logo
                          src="/Golden-Logo.png" // Path to your golden logo image
                          alt="Hidden Golden Logo"
                          className={`golden-logo-image absolute z-30`} // z-index higher than overlay
                          onClick={handleLogo2Click}
                          // Fine-tuned styles for precise overlay on the RB logo on the pants image
                          // Adjusted values based on your feedback for 80% transparency and precise positioning
                          style={{
                            width: '25px', // Estimated size of the RB logo on the pants
                            height: '25px', // Estimated size
                            top: '18%', // Moved up slightly
                            left: '42%', // Adjusted horizontally slightly
                            opacity: 0.2, // 80% transparency (1 - 0.8 = 0.2 opacity)
                          }}
                        />
                      )}
                      {/* --- END NEW --- */}
                    </div>
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
            <h2 className="text-4xl font-bebas mb-6">Ready to Order Your {categoryName}?</h2>
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

export default CategoryPage;
