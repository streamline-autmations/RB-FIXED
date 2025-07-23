import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const CapPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-rb-black relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(/cap-frontback.png)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rb-black to-transparent"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bebas mb-6">CAP</h1>
            <p className="text-xl text-rb-gray-300">Classic 6-panel cap designed for team branding and everyday wear</p>
          </motion.div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 bg-rb-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-lg overflow-hidden bg-rb-gray-800"
            >
              <img
                src="/cap-frontback.png"
                alt="Cap"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Product Specifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-rb-gray-800 p-6 rounded-lg"
              >
                <h3 className="text-xl font-bebas mb-4">PRODUCT SPECIFICATIONS</h3>
                <ul className="space-y-2 text-rb-gray-300">
                  <li>• Classic 6-panel design with embroidered eyelets</li>
                  <li>• Adjustable velcro strap for a one-size-fits-all fit</li>
                  <li>• Durable cotton blend with reinforced brim</li>
                  <li>• Ideal for team branding, staff uniforms, or casual wear</li>
                  <li>• Available in multiple colorways with logo embroidery options</li>
                </ul>
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
                title: 'Visor Cap',
                image: '/visor-cap-frontback.png',
                path: '/products/visor-cap'
              },
              {
                title: 'Backpack',
                image: '/backpack-frontback.png',
                path: '/products/backpack'
              },
              {
                title: 'Rugby Socks',
                image: '/rugby-socks.png',
                path: '/products/rugby-socks'
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

export default CapPage;