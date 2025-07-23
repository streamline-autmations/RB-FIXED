import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, FileText } from 'lucide-react';
import Button from '../ui/Button';

interface BaseCataloguePageProps {
  title: string;
  description: string;
  previewImage: string;
  collectionName: string;
  collectionSubtitle: string;
  features: string[];
  pages: string;
  fileSize: string;
  ctaTitle: string;
  downloadUrl?: string;
  flipbookUrl?: string;
}

const BaseCataloguePage: React.FC<BaseCataloguePageProps> = ({
  title,
  description,
  previewImage,
  collectionName,
  collectionSubtitle,
  features,
  pages,
  fileSize,
  ctaTitle,
  downloadUrl = 'https://drive.google.com/uc?export=download&id=1-8T8g4HUj2lSZyai575Or66A5cTb0gWh',
  flipbookUrl
}) => {
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
            <h1 className="text-5xl md:text-6xl font-bebas mb-6">{title}</h1>
            <p className="text-lg text-rb-gray-300">{description}</p>
          </motion.div>
        </div>
      </section>

      {/* Catalogue Content */}
      <section className="py-20 bg-rb-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Catalogue Preview */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[3/4] bg-rb-gray-800 rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src={previewImage}
                  alt={`${title} Preview`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rb-black to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bebas text-rb-white mb-2">{collectionName}</h3>
                  <p className="text-rb-gray-300">{collectionSubtitle}</p>
                </div>
              </div>
            </motion.div>

            {/* Catalogue Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bebas mb-4">What's Inside</h2>
                <ul className="space-y-3 text-rb-gray-300">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-rb-red rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rb-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bebas mb-4 flex items-center">
                  <FileText className="text-rb-red mr-3" size={24} />
                  Catalogue Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-rb-gray-400">Pages:</p>
                    <p className="text-rb-white">{pages}</p>
                  </div>
                  <div>
                    <p className="text-rb-gray-400">File Size:</p>
                    <p className="text-rb-white">{fileSize}</p>
                  </div>
                  <div>
                    <p className="text-rb-gray-400">Format:</p>
                    <p className="text-rb-white">PDF</p>
                  </div>
                  <div>
                    <p className="text-rb-gray-400">Updated:</p>
                    <p className="text-rb-white">July 2025</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  href={downloadUrl}
                  variant="primary" 
                  size="lg" 
                  className="w-full flex items-center justify-center"
                >
                  <Download className="mr-2" size={20} />
                  Download Catalogue (PDF)
                </Button>
                {flipbookUrl ? (
                  <Button 
                    href={flipbookUrl}
                    variant="outline" 
                    size="lg" 
                    className="w-full flex items-center justify-center"
                  >
                    <Eye className="mr-2" size={20} />
                    View Online Flipbook
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full flex items-center justify-center opacity-60 cursor-not-allowed"
                    disabled
                  >
                    <Eye className="mr-2" size={20} />
                    View Online Flipbook - Coming Soon
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flipbook Viewer Section */}
      <section className="py-20 bg-rb-black">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bebas mb-6">Browse Our Catalogue</h2>
            <p className="text-rb-gray-400">
              Our digital flipbook experience is coming soon. In the meantime, download the PDF version to explore our complete 2025–2026 collection of custom athletic apparel and branded gear.
            </p>
          </motion.div>

          <motion.div
            className="bg-rb-gray-900 rounded-lg p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-md mx-auto">
              <FileText size={64} className="text-rb-red mx-auto mb-6" />
              <h3 className="text-2xl font-bebas mb-4">Interactive Catalogue Viewer</h3>
              <p className="text-rb-gray-400 mb-6">
                Our digital flipbook experience is coming soon. In the meantime, download the PDF version to explore our complete 2025–2026 collection of custom athletic apparel and branded gear.
              </p>
              <Button href={downloadUrl} variant="primary" size="lg">
                <Download className="mr-2" size={20} />
                Download PDF
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rb-gray-900">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bebas mb-6">{ctaTitle}</h2>
            <p className="text-rb-gray-300 mb-8">
              Reach out to our team for tailored sports kits, branded apparel, or uniforms.
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

export default BaseCataloguePage;