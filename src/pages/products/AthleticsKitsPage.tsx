import React from 'react';
import { getProductsBySubcategory } from '../../data/productsData';
import SubcategoryTemplate from '../../components/shared/SubcategoryTemplate';

const AthleticsKitsPage: React.FC = () => {
  const products = getProductsBySubcategory('Athletics');
  
  return (
    <SubcategoryTemplate
      title="Athletics"
      description="Professional athletics apparel designed for track and field excellence"
      products={products}
      showFilter={false}
    />
  );
};

export default AthleticsKitsPage;