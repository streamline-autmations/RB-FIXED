import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter } from 'lucide-react';
import Button from '../components/ui/Button';
import { getAllCategories, getProductsByCategory, Product } from '../data/productsData';

const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...getAllCategories()];
  const allProducts = getProductsByCategory('All');
  
  const filteredProducts = selectedCategory === 'All'
    ? allProducts
    : getProductsByCategory(selectedCategory);

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

      {/* Filter Section */}
      <section className="py-8 bg-rb-gray-900 border-b border-rb-gray-800">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-4">
            {/* Desktop: Filter Pills */}
            <div className="hidden md:flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full border-2 font-bebas tracking-wide transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-rb-red text-rb-white border-rb-red'
                      : 'border-rb-gray-700 text-rb-gray-300 hover:border-rb-white hover:text-rb-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Mobile: Dropdown */}
            <div className="md:hidden flex items-center gap-4">
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
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-rb-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <h3 className="text-2xl font-bebas text-rb-white group-hover:text-rb-red transition-colors">
                        {product.title}
                      </h3>
                      <span className="inline-block bg-rb-red px-3 py-1 rounded-sm text-rb-white text-sm mt-2">
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