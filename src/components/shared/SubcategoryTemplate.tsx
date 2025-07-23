import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../data/productsData';
import { GalleryItem } from '../ui/Cards';

interface SubcategoryTemplateProps {
  title: string;
  description: string;
  products: Product[];
  breadcrumbs?: Array<{ name: string; path: string }>;
}

const SubcategoryTemplate: React.FC<SubcategoryTemplateProps> = ({
  title,
  description,
  products,
  breadcrumbs = []
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <li className="text-gray-400">/</li>
                  <li>
                    <Link to={crumb.path} className="hover:text-blue-600">
                      {crumb.name}
                    </Link>
                  </li>
                </React.Fragment>
              ))}
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium">{title}</li>
            </ol>
          </nav>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link key={product.id} to={product.link}>
                <GalleryItem
                  image={product.image}
                  title={product.name}
                  category={product.category}
                  index={index}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this subcategory.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubcategoryTemplate;