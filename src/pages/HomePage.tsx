import React from 'react';
import HeroSlider from '../components/ui/HeroSlider';
import { motion } from 'framer-motion';
import { Zap, Award, Users, Clock } from 'lucide-react';
import { FeatureCard } from '../components/ui/Cards';
import Button from '../components/ui/Button';
import FAQSection from '../components/ui/FAQSection';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSlider />
      
      {/* Features Section */}
      <section className="py-20 bg-rb-gray-900">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Why Choose RecklessBear?</h2>
            <p className="text-rb-gray-400 max-w-2xl mx-auto">
              We deliver premium custom sportswear that performs as good as it looks
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FeatureCard
                icon={Zap}
                title="Performance First"
                description="Every piece is engineered for peak athletic performance and durability."
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FeatureCard
                icon={Award}
                title="Premium Quality"
                description="We use only the finest materials and manufacturing processes."
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FeatureCard
                icon={Users}
                title="Team Focused"
                description="Designed specifically for teams, schools, and athletic organizations."
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FeatureCard
                icon={Clock}
                title="Fast Turnaround"
                description="Quick production times without compromising on quality."
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Categories Preview */}
      <section className="py-20 bg-rb-black">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Our Product Categories</h2>
            <p className="text-rb-gray-400 max-w-2xl mx-auto">
              From school sports kits to corporate uniforms, we've got you covered
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'School & Team Sports',
                description: 'Rugby, Netball, Cricket, Hockey, Athletics kits',
                image: '/category_rugby.jpg',
                path: '/products/school-team-sports'
              },
              {
                title: 'Corporate Uniforms',
                description: 'Professional staff apparel and branded clothing',
                image: '/sublimated-card.jpg',
                path: '/products/corporate-staff'
              },
              {
                title: 'Gym & Fitness',
                description: 'Performance gear for training and fitness',
                image: '/full-kit-card.jpg',
                path: '/products/gym-fitness'
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rb-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bebas text-rb-white group-hover:text-rb-red transition-colors mb-2">
                      {category.title}
                    </h3>
                    <p className="text-rb-gray-300 text-sm mb-4">{category.description}</p>
                    <Button to={category.path} variant="outline" size="sm">
                      Explore Category
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* CTA Section */}
      <section className="py-20 bg-rb-gray-900">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bebas mb-6">Ready to Get Started?</h2>
            <p className="text-rb-gray-300 mb-8 max-w-2xl mx-auto">
              Let's create custom sportswear that represents your team's spirit and performance standards.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button to="/contact" variant="primary" size="lg">
                Get a Quote
              </Button>
              <Button to="/gallery" variant="outline" size="lg">
                View Our Work
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;