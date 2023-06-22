import React, { useContext, useEffect, useState } from "react";
import "isomorphic-fetch";
import ProductList from "../components/ProductList/ProductList";
import { ServerContext } from "../store/ServerContext";

const ProductListPage = () => {
  
  let datas = useContext(ServerContext)
  if(typeof datas === 'string'){
    datas = JSON.parse(datas)
  }
  const initialData = datas.initialData?.products
  
  const [data, setData] = useState(initialData?.length ? initialData : []);
  useEffect(() => {
    if(initialData?.length > 0){
      setData(initialData)
    }else if(window.__initialData__){
      setData(window.__initialData__)
      delete window.__initialData__
    }
  }, [initialData])

  useEffect(() => {
    ProductListPage.requestInitialData()
    .then(data =>setData(data.products))
  }, [])

  return <ProductList rowData={data} />;
};

ProductListPage.requestInitialData = () => {
  return fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export default ProductListPage;
