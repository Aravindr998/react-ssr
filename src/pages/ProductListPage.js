import React, { useEffect } from "react";
import "isomorphic-fetch";
import ProductList from "../components/ProductList/ProductList";
import { fetchProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const ProductListPage = () => {
  
  const products = useSelector(state => state.allProducts)
  console.log(products?.products?.products)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(!products?.products?.length){
      console.log('sending')
      dispatch(ProductListPage.initialAction())
    }
  }, [])

  return <ProductList rowData={products?.products} />;
};

ProductListPage.initialAction = () => {
  return fetchProducts()
};

export default ProductListPage;
