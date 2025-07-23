import React from 'react';
import { getProductsBySubcategory } from '../../data/productsData';
import SubcategoryTemplate from '../../components/shared/SubcategoryTemplate';

const StaffUniformsPage: React.FC = () => {
  const products = getProductsBySubcategory('Corporate Wear');
  
  return (
    <SubcategoryTemplate
      title="Staff Uniforms"
      description="Professional staff uniforms designed for corporate environments and businesses"
      products={products}
      showFilter={false}
    />
  );
};

export default StaffUniformsPage;