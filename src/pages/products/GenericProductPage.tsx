import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import BaseProductPage from '../../components/shared/BaseProductPage';
import allProducts from '../../data/productsData';

interface GenericProductPageProps {
  title?: string;
  category?: string;
  subcategory?: string;
}

const GenericProductPage: React.FC<GenericProductPageProps> = ({ 
  title: propTitle, 
  category: propCategory, 
  subcategory: propSubcategory 
}) => {
  const location = useLocation();
  
  // Find product by path
  const product = allProducts.find(p => p.path === location.pathname);
  
  // Use props or product data
  const title = propTitle || product?.title || 'Product';
  const category = propCategory || product?.category || '';
  const subcategory = propSubcategory || product?.subcategory || '';
  const image = product?.image || 'https://images.pexels.com/photos/4753878/pexels-photo-4753878.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2';
  const description = product?.description || `Professional ${title.toLowerCase()} designed for peak performance`;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Default colors for all products
  const defaultColors = [
    { name: 'navy', hex: '#000080' },
    { name: 'black', hex: '#000000' },
    { name: 'white', hex: '#FFFFFF' },
    { name: 'red', hex: '#FF0000' },
    { name: 'green', hex: '#008000' },
    { name: 'royal', hex: '#4169E1' },
    { name: 'maroon', hex: '#800000' },
    { name: 'purple', hex: '#800080' }
  ];

  // Default sizes for all products
  const defaultSizes = {
    youth: ['6-8', '10-12', '14-16'],
    adult: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']
  };

  // Features based on category
  const getFeatures = () => {
    if (category.includes('School') || category.includes('Team')) {
      return [
        {
          title: 'School Approved',
          description: 'Meets all school uniform requirements and standards'
        },
        {
          title: 'Team Ready',
          description: 'Perfect for competitive sports and team activities'
        },
        {
          title: 'Durable Design',
          description: 'Built to withstand regular use and washing'
        }
      ];
    } else if (category.includes('Corporate')) {
      return [
        {
          title: 'Professional Look',
          description: 'Maintains a professional appearance in any setting'
        },
        {
          title: 'Brand Ready',
          description: 'Perfect canvas for your company logo and branding'
        },
        {
          title: 'Comfort First',
          description: 'Designed for all-day comfort and productivity'
        }
      ];
    } else if (category.includes('Gym') || category.includes('Fitness')) {
      return [
        {
          title: 'Performance Focused',
          description: 'Engineered for optimal athletic performance'
        },
        {
          title: 'Moisture Management',
          description: 'Advanced fabric technology keeps you dry and comfortable'
        },
        {
          title: 'Flexible Fit',
          description: 'Allows full range of motion for any activity'
        }
      ];
    } else {
      return [
        {
          title: 'Quality Materials',
          description: 'Made with premium fabrics for lasting durability'
        },
        {
          title: 'Custom Design',
          description: 'Fully customizable to match your specific needs'
        },
        {
          title: 'Expert Craftsmanship',
          description: 'Manufactured with attention to every detail'
        }
      ];
    }
  };

  return (
    <BaseProductPage
      title={title}
      description={description}
      heroImage={image}
      fabricSpecs={[
        'Durable performance blend',
        'Lightweight & breathable',
        'Reinforced seams for durability',
        'Sweat-resistant finish',
        'Designed for active use'
      ]}
      sizes={defaultSizes}
      colors={defaultColors}
      features={getFeatures()}
    />
  );
};

export default GenericProductPage;