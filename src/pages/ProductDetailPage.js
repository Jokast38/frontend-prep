import React from 'react';
import { Link } from 'react-router-dom';
import ProductDetails from '../components/product/ProductDetails';




const ProductDetailPage = () => {
  return <div> 
    <Link to="/">Go Back</Link>
    <ProductDetails />
  </div>;


};

export default ProductDetailPage;