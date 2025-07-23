import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Sparkles, Flag, Factory, Shield as ShieldIcon, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import HeroSlider from '../components/ui/HeroSlider';
import { FlipCard } from '../components/ui/Cards';
import FAQSection from '../components/ui/FAQSection';

const HomePage: React.FC = () => {
  const categories = [
    { name: 'School & Team Sports', image: '/School & Team Sports.png', description: 'Rugby, netball, cricket, hockey & athletics', path: '/products/category/school-team-sports' },
    { name: 'Other Sports & Clubs', image: '/Other Sports & Clubs.png', description: 'Soccer, golf, darts & fishing gear', path: '/products/category/other-sports-clubs' },
    { name: 'Schoolwear & Apparel', image: '/School Wear & Matric Apparel.png', description: 'Tracksuits, hoodies & school apparel', path: '/products/category/schoolwear-matric' },
    { name: 'Corporate & Staff Apparel', image: '/Corporate & Staff Apparel.png', description: 'Staff uniforms, jackets & corporate wear', path: '/products/category/corporate-staff' },
    { name: 'Gym & Fitness Apparel', image: '/Gym & Fitness Apparel.png', description: 'Performance wear & fitness apparel', path: '/products/category/gym-fitness' },
    { name: 'Accessories & Branding', image: '/Accessories & Branding.png', description: 'Socks, caps, bags & branded items', path: '/products/category/accessories-branding' }
  ];
  
  return (
    <>
      <HeroSlider />

      {/* About Us Section */}
      <section id="about" className="py-24 bg-rb-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4753879/pexels-photo-4753879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] opacity-5"></div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="/rb-about.png"
                  alt="RecklessBear Team" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bebas">Who We Are</h2>
                <p className="text-rb-gray-300 text-lg leading-relaxed">
                  RecklessBear is South Africa's premier custom teamwear manufacturer, proudly producing high-quality sports apparel right here in Johannesburg. With our state-of-the-art facility and passionate team, we handle every step of the process in-house – from design to delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {[
                  { icon: Factory, title: 'Custom Design & Manufacturing', description: 'From concept to creation — we manage the full process in-house.' },
                  { icon: ShieldIcon, title: 'Quality Craftsmanship', description: 'Built to perform, made to last. Designed for real athletes.' },
                  { icon: Clock, title: 'Fast Lead Times', description: 'Tight deadlines? We deliver without sacrificing quality.' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="group bg-rb-gray-800 p-8 rounded-lg transform transition-all duration-300 hover:-translate-y-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon size={40} className="text-rb-red mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bebas mb-3">{item.title}</h3>
                    <p className="text-rb-gray-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mt-16 pt-8 border-t border-rb-gray-800"
          >
            <Button 
              to="/contact" 
              variant="primary" 
              size="lg"
              className="px-12 py-4 text-xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section id="categories" className="py-16 md:py-20 bg-rb-black">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bebas mb-4 md:mb-6">
              Let Us Help You Find What You're Looking For
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={category.path}>
                  <div className="relative aspect-square rounded-full overflow-hidden mb-4 md:mb-6 border-4 border-transparent group-hover:border-rb-red transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    <img 
                      src={category.image}
                      alt={`${category.name} - ${category.description}`}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rb-black via-rb-black/30 to-transparent opacity-60"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 p-4">
                      <h3 className="text-base md:text-2xl font-bebas text-rb-white text-center leading-tight">
                        {category.name}
                      </h3>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                      <span className="text-rb-white font-bebas text-xs md:text-lg text-center">
                        View More →
                      </span>
                    </div>
                  </div>
                  <p className="text-rb-gray-400 text-center text-xs md:text-sm px-1 md:px-2 leading-tight">
                    {category.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-12 md:mt-16"
          >
            <Button to="/products" variant="outline" size="lg">
              View All Products
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-rb-black">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bebas tracking-wider mb-6 md:mb-8">Why Choose RecklessBear</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Sparkles, title: 'Innovation', description: 'Cutting-edge designs and modern manufacturing to keep your team\'s gear looking sharp and performing better. We\'re constantly testing new materials and methods to stay ahead of the game.' },
              { icon: Shield, title: 'Quality Craftsmanship', description: 'Every item is made with care, precision, and durability in mind. From reinforced stitching to breathable fabrics — no shortcuts, just performance-ready gear that lasts.' },
              { icon: Flag, title: 'Proudly South African', description: 'Locally produced to support SA jobs and talent. Faster delivery, better service, and kits built with purpose and pride for our schools, teams, and communities.' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <FlipCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Track Order Section */}
      <section className="py-12 md:py-16 bg-rb-gray-800">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl font-bebas mb-4 md:mb-6">Track Your Order</h2>
            <p className="text-sm md:text-base text-rb-gray-300 mb-6 md:mb-8">
              Already placed an order? Track its progress with your Lead ID
            </p>
            <Button to="/track-order" variant="outline" size="lg">
              Track Order Status
            </Button>
          </motion.div>
        </div>
      </section>

      <FAQSection />
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-rb-red relative overflow-hidden">
        <div className="absolute inset-0 bg-texture opacity-10"></div>
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bebas mb-4 md:mb-6 text-rb-white">
              Ready to Build Your Kit?
            </h2>
            <p className="text-white text-base md:text-lg mb-6 md:mb-10 opacity-90">
              Let's discuss how we can bring your custom sportswear vision to life.
            </p>
            <Button to="/contact" variant="secondary" size="lg" className="group">
              Book a Call <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
