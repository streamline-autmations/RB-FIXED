import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '../components/ui/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <>
      {/* Contact Hero */}
      <section className="pt-32 pb-16 bg-rb-black texture-overlay relative">
        <div className="absolute inset-0 bg-gradient-to-b from-rb-black to-transparent opacity-80"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bebas mb-6">
              Let's Build Your Kit
            </h1>
            <p className="text-lg text-rb-gray-300">
              Tell us what you need — we'll bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Content */}
      <section className="py-16 bg-rb-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            
            <div>
              <motion.div
                className="bg-rb-gray-800 p-8 rounded-lg"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bebas mb-6">What to Expect</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-rb-red rounded-full p-2 mr-4 mt-1">
                      <div className="w-4 h-4 bg-rb-white rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-rb-white mb-1">Custom Mockups</h4>
                      <p className="text-rb-gray-400">We'll create visual designs based on your requirements.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-rb-red rounded-full p-2 mr-4 mt-1">
                      <div className="w-4 h-4 bg-rb-white rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-rb-white mb-1">Quick Quote Turnaround</h4>
                      <p className="text-rb-gray-400">Receive detailed pricing within 48 hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-rb-red rounded-full p-2 mr-4 mt-1">
                      <div className="w-4 h-4 bg-rb-white rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-rb-white mb-1">Full Design Support</h4>
                      <p className="text-rb-gray-400">Our team will help fine-tune your vision.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 pt-10 border-t border-rb-gray-700">
                  <h3 className="text-2xl font-bebas mb-6">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone size={20} className="text-rb-red mr-3" />
                      <a href="tel:0823163330" className="text-rb-gray-300 hover:text-rb-white transition-colors">
                        082 316 3330
                      </a>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail size={20} className="text-rb-red mr-3" />
                      <a href="mailto:etienne@recklessbear.co.za" className="text-rb-gray-300 hover:text-rb-white transition-colors">
                        etienne@recklessbear.co.za
                      </a>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPin size={20} className="text-rb-red mr-3" />
                      <a href="https://maps.app.goo.gl/qtmuTbufg5rCqvjP7" target="_blank" rel="noopener noreferrer" className="text-rb-gray-300 hover:text-rb-white transition-colors">
                        Johannesburg, South Africa
                      </a>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock size={20} className="text-rb-red mr-3" />
                      <span className="text-rb-gray-300">
                        Mon-Fri: 8am - 5pm
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;