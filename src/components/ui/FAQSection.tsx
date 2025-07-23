import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What's your minimum order quantity?",
      answer: "Our minimum order quantity is typically 11 pieces for team kits. However, we can accommodate smaller orders for certain products. Contact us to discuss your specific needs and we'll work with you to find the best solution."
    },
    {
      question: "How long does it take to produce custom sportswear?",
      answer: "Standard production time is 4–6 weeks from design approval. Rush orders can be accommodated in 7–10 days with additional fees. Lead times may vary during peak seasons, so we recommend placing orders well in advance of your event or season start."
    },
    {
      question: "Do you offer design services?",
      answer: "Absolutely! Our in-house design team will work with you to create custom designs that reflect your team's identity. We provide mockups and revisions until you're completely satisfied with the design before production begins."
    },
    {
      question: "What customization options are available?",
      answer: "We offer full sublimation printing, embroidery, heat transfer, player names and numbers, team logos, sponsor logos, and custom color combinations. Our team can help you choose the best customization method for your specific needs and budget."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-rb-gray-900">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bebas mb-6">Frequently Asked Questions</h2>
          <p className="text-rb-gray-400 max-w-2xl mx-auto">
            Got questions? We've got answers. Here are some of the most common questions we receive about our custom sportswear.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-rb-gray-800 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-rb-gray-700 transition-colors duration-300"
              >
                <h3 className="text-xl font-bebas text-rb-white pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={24} className="text-rb-red" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6">
                      <p className="text-rb-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-rb-gray-400 mb-6">
            Still have questions? We're here to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center text-rb-red hover:text-rb-white transition-colors duration-300 font-bebas text-lg"
          >
            Contact Us →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;