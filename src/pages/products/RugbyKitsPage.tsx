import React from 'react';
import { getProductsBySubcategory } from '../../data/productsData';
import SubcategoryTemplate from '../../components/shared/SubcategoryTemplate';

const RugbyKitsPage: React.FC = () => {
  const products = getProductsBySubcategory('Rugby');
  
  return (
    <SubcategoryTemplate
      title="Rugby"
      description="Professional rugby apparel designed for peak performance and durability"
      products={products}
      showFilter={false}
    />
  );
};

export default RugbyKitsPage;