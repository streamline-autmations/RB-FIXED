import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter } from 'lucide-react';
import Button from '../components/ui/Button';
import { getProductsBySubcategory, getSubcategoryBySlug } from '../data/productsData';
import SubcategoryTemplate from '../components/shared/SubcategoryTemplate';

const SubcategoryPage: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  
  // Extract subcategory slug from URL path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const subcategorySlug = pathSegments[pathSegments.length - 1];

  // Get subcategory name from slug
  const subcategoryName = getSubcategoryBySlug(subcategorySlug || '');
  const products = getProductsBySubcategory(subcategoryName);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
            No products are available in the "{subcategoryName}" category at this time.
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
      title={`${subcategoryName} Products`}
      description={`Browse our complete range of ${subcategoryName.toLowerCase()} products`}
      products={products}
      showFilter={false}
    />
  );
};

export default SubcategoryPage;