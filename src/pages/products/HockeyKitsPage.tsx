import React from 'react';
import { getProductsBySubcategory } from '../../data/productsData';
import SubcategoryTemplate from '../../components/shared/SubcategoryTemplate';

const HockeyKitsPage: React.FC = () => {
  const products = getProductsBySubcategory('Hockey');
  
  return (
    <SubcategoryTemplate
      title="Hockey"
      description="Professional hockey apparel designed for speed and performance"
      products={products}
      showFilter={false}
    />
  );
};

export default HockeyKitsPage;