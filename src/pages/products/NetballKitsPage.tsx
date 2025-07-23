import React from 'react';
import { getProductsBySubcategory } from '../../data/productsData';
import SubcategoryTemplate from '../../components/shared/SubcategoryTemplate';

const NetballKitsPage: React.FC = () => {
  const products = getProductsBySubcategory('Netball');
  
  return (
    <SubcategoryTemplate
      title="Netball"
      description="Professional netball apparel designed for peak performance and style"
      products={products}
      showFilter={false}
    />
  );
};

export default NetballKitsPage;