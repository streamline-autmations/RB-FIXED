import React from 'react';
import { getProductsBySubcategory } from '../../data/productsData';
import SubcategoryTemplate from '../../components/shared/SubcategoryTemplate';

const CricketKitsPage: React.FC = () => {
  const products = getProductsBySubcategory('Cricket');
  
  return (
    <SubcategoryTemplate
      title="Cricket"
      description="Professional cricket apparel designed for performance and tradition"
      products={products}
      showFilter={false}
    />
  );
};

export default CricketKitsPage;