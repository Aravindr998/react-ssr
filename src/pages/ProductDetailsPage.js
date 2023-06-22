import React, { useContext, useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import { ServerContext } from "../store/ServerContext";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
    const {id} = useParams()
    let datas = useContext(ServerContext)
    if(typeof datas === 'string'){
        datas = JSON.parse(datas)
    }
    const initialData = datas.initialData
    const [data, setData] = useState(initialData?.id ? initialData : {})
    useEffect(() => {
        if(initialData?.id){
            setData(initialData)
        }else if(window.__initialData__){
            setData(window.__initialData__)
            delete window.__initialData__
          }
    }, [initialData])
    useEffect(() => {
        ProductDetailsPage.requestInitialData(`/products/${id}`)
        .then(data => setData(data))
    }, [])
  return (
    <div>
      <ProductDetails product={data} />
    </div>
  );
};

ProductDetailsPage.requestInitialData = (url) => {
    const id = url.slice(url.lastIndexOf('/')+1)
    return fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

export default ProductDetailsPage;
