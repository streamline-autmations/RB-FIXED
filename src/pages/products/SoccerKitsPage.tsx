import React from 'react';
import { getProductsBySubcategory } from '../../data/productsData';
import SubcategoryTemplate from '../../components/shared/SubcategoryTemplate';

const SoccerKitsPage: React.FC = () => {
  const products = getProductsBySubcategory('Soccer');
  
  return (
    <SubcategoryTemplate
      title="Soccer"
      description="Professional soccer apparel designed for speed and performance"
      products={products}
      showFilter={false}
    />
  );
};

export default SoccerKitsPage;