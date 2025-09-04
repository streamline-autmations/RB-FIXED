// src/pages/CategoryPage.tsx

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory, getCategoryBySlug } from '../data/productsData'; // We'll add these functions next
import SubcategoryTemplate from '../components/shared/SubcategoryTemplate'; // Re-using your existing template

const CategoryPage: React.FC = () => {
  // This hook gets the slug from the URL, e.g., "netball" from "/products/netball"
  const { categorySlug } = useParams<{ categorySlug: string }>();

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug]);

  // Find the full category name (e.g., "Netball") from its slug ("netball")
  const categoryName = getCategoryBySlug(categorySlug || '');
  
  // Get all products that belong to this category
  const products = getProductsByCategory(categoryName);

  // If the category doesn't exist, show a "Not Found" message
  if (!categoryName) {
    return (
      <div className="pt-32 pb-16 bg-rb-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bebas text-rb-white mb-4">Category Not Found</h1>
          <p className="text-rb-gray-400 mb-6">
            The category "{categorySlug}" could not be found.
          </p>
          <Link to="/products" className="text-rb-red hover:text-rb-white">
            Back to All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    // We are re-using your SubcategoryTemplate to display the products.
    // It should work perfectly as it just needs a title, description, and a list of products.
    <SubcategoryTemplate
      title={`${categoryName}`}
      description={`Browse our complete range of ${categoryName.toLowerCase()} products.`}
      products={products}
      showFilter={true} // You might want to show filters on main category pages
    />
  );
};

export default CategoryPage;
