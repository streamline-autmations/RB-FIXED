import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const HockeySocksPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-rb-black relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(/hockey-socks.png)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rb-black to-transparent"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bebas mb-6">HOCKEY SOCKS</h1>
            <p className="text-xl text-rb-gray-300">Premium hockey socks designed for performance and comfort</p>
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
                src="/hockey-socks.png"
                alt="Hockey Socks"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Specifications Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-rb-gray-800 p-6 rounded-lg"
              >
                <h3 className="text-xl font-bebas mb-4">PRODUCT SPECIFICATIONS</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-rb-gray-300">
                    <tbody className="space-y-2">
                      <tr className="border-b border-rb-gray-700">
                        <td className="py-2 font-semibold">DTG Print</td>
                        <td className="py-2">Yes</td>
                      </tr>
                      <tr className="border-b border-rb-gray-700">
                        <td className="py-2 font-semibold">Y-Heel</td>
                        <td className="py-2">Yes</td>
                      </tr>
                      <tr className="border-b border-rb-gray-700">
                        <td className="py-2 font-semibold">Padded Heel & Toe</td>
                        <td className="py-2">Yes</td>
                      </tr>
                      <tr className="border-b border-rb-gray-700">
                        <td className="py-2 font-semibold">Seamless</td>
                        <td className="py-2">Seamless Toe</td>
                      </tr>
                      <tr className="border-b border-rb-gray-700">
                        <td className="py-2 font-semibold">Sizes</td>
                        <td className="py-2">Small - X-Large</td>
                      </tr>
                      <tr className="border-b border-rb-gray-700">
                        <td className="py-2 font-semibold">Min. Order Qty</td>
                        <td className="py-2">50</td>
                      </tr>
                      <tr className="border-b border-rb-gray-700">
                        <td className="py-2 font-semibold">Compression</td>
                        <td className="py-2">No</td>
                      </tr>
                      <tr className="border-b border-rb-gray-700">
                        <td className="py-2 font-semibold">Fabric</td>
                        <td className="py-2">Super soft synthetic, moisture-wicking yarn</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Length</td>
                        <td className="py-2">Under the Knee</td>
                      </tr>
                    </tbody>
                  </table>
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
    </>
  );
};

export default HockeySocksPage;