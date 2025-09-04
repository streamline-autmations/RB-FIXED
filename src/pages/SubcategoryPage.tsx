import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Updated imports
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import Button from '../components/ui/Button';
import { getProductsBySubcategory, getSubcategoryBySlug } from '../data/productsData';
import SubcategoryTemplate from '../components/shared/SubcategoryTemplate';

const SubcategoryPage: React.FC = () => {
  // --- NECESSARY CHANGE: Switched to useParams to get the slug from the URL ---
  const { slug: subcategorySlug } = useParams<{ slug: string }>();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [subcategorySlug]);

  // --- THE REST OF YOUR CODE IS PERFECT AND REMAINS UNCHANGED ---
  const subcategoryName = getSubcategoryBySlug(subcategorySlug || '');
  const products = getProductsBySubcategory(subcategoryName);

  if (!subcategoryName) {
    return (
      <div className="pt-32 pb-16 bg-rb-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bebas text-rb-white mb-4">Subcategory Not Found</h1>
          <p className="text-rb-gray-400 mb-6">
            The subcategory "{subcategorySlug}" could not be found.
          </p>
          <Link to="/products" className="text-rb-red hover:text-rb-white">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="pt-32 pb-16 bg-rb-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bebas text-rb-white mb-4">No Products Found</h1>
          <p className="text-rb-gray-400 mb-6">
            No products are available in the "{subcategoryName}" subcategory at this time.
          </p>
          <Link to="/products" className="text-rb-red hover:text-rb-white">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <SubcategoryTemplate
      title={`${subcategoryName}`}
      description={`Browse our complete range of ${subcategoryName.toLowerCase()} products`}
      products={products}
      showFilter={false}
    />
  );
};

export default SubcategoryPage;
