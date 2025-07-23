import React from 'react';
import { getProductsBySubcategory } from '../../data/productsData';
import SubcategoryTemplate from '../../components/shared/SubcategoryTemplate';

const GolfApparelPage: React.FC = () => {
  const products = getProductsBySubcategory('Golf');
  
  return (
    <SubcategoryTemplate
      title="Golf"
      description="Premium golf apparel designed for performance and style on the course"
      products={products}
      showFilter={false}
    />
  );
};

export default GolfApparelPage;