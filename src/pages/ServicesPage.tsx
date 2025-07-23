import React from 'react';
import { motion } from 'framer-motion';
import { ServiceCard } from '../components/ui/Cards';

const ServicesPage: React.FC = () => {
  const services = [
    {
      title: 'Custom Sports Kits',
      description: 'For schools, clubs, and professional teams.',
      features: ['Built for performance + style', 'Custom embroidery and numbering', 'Moisture-wicking, game-ready materials'],
      ctaText: 'Get a Quote',
      ctaLink: '/contact',
      image: '/sublimated-card.jpg'
    },
    {
      title: 'Corporate Uniforms',
      description: 'Branded polos, jackets, and uniforms.',
      features: ['Bulk orders made easy', 'Durable + professional looks', 'In-house embroidery & printing'],
      ctaText: 'Request Pricing',
      ctaLink: '/contact',
      image: 'https://images.pexels.com/photos/8112200/pexels-photo-8112200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Fitness Gear',
      description: 'Compression shirts, activewear, hoodies.',
      features: ['Custom designed to your brand', 'Performance-tested fabric', 'Perfect for gyms, coaches, and teams'],
      ctaText: 'View Styles',
      ctaLink: '/contact',
      image: 'https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];
  
  return (
    <>
      {/* Services Hero */}
      <section className="pt-32 pb-20 bg-rb-black texture-overlay relative">
        <div className="absolute inset-0 bg-gradient-to-b from-rb-black to-transparent opacity-80"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bebas mb-6">What We Do</h1>
            <p className="text-lg text-rb-gray-300">
              From concept to creation, we provide premium custom sportswear and apparel
              solutions for teams, businesses, and individuals.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-20 bg-rb-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} delay={index * 0.2} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-20 bg-rb-black">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Our Process</h2>
            <p className="text-rb-gray-400 max-w-2xl mx-auto">
              How we bring your custom sportswear vision to life
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'We discuss your vision, requirements, and timeline.'
              },
              {
                step: '02',
                title: 'Design',
                description: 'Our designers create custom mockups for your review.'
              },
              {
                step: '03',
                title: 'Production',
                description: 'Once approved, we move to in-house manufacturing.'
              },
              {
                step: '04',
                title: 'Delivery',
                description: 'Your custom sportswear delivered on time, every time.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-rb-gray-900 p-6 rounded-lg relative overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute -top-5 -right-5 text-9xl font-bebas text-rb-red opacity-10">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="inline-block bg-rb-red px-3 py-1 rounded-sm text-rb-white font-bebas mb-4">
                    STEP {item.step}
                  </div>
                  <h3 className="text-2xl font-bebas mb-3">{item.title}</h3>
                  <p className="text-rb-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-rb-gray-900">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">What Our Clients Say</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "RecklessBear delivered our team's custom kit ahead of schedule. The quality and design exceeded our expectations.",
                author: "Chris Naidoo",
                position: "Rugby Club Coach"
              },
              {
                quote: "Their corporate apparel solutions transformed our staff's professional appearance. Great quality and service.",
                author: "Sarah Johnson",
                position: "HR Director"
              },
              {
                quote: "As a gym owner, I needed custom apparel that could withstand intense workouts. RecklessBear nailed it.",
                author: "Mike Stevens",
                position: "Fitness Studio Owner"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-rb-gray-800 p-8 rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-rb-red text-6xl font-serif mb-4">"</div>
                <p className="text-rb-white text-lg italic mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold text-rb-white">{testimonial.author}</p>
                  <p className="text-rb-gray-400 text-sm">{testimonial.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;