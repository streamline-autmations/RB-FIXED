import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface CategoryHeaderProps {
  title: string;
  description: string;
  category: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, description, category }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
      <div>
        <h2 className="text-3xl font-bebas text-rb-white mb-2">{title}</h2>
        <p className="text-rb-gray-400">{description}</p>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button 
          to={`/products/${category.toLowerCase()}`} 
          variant="outline"
          size="md"
        >
          View All {category} Kits
        </Button>
      </motion.div>
    </div>
  );
};

export default CategoryHeader;