import React, { useContext, useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails/ProductDetails";
// import { ServerContext } from "../store/ServerContext";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails } from "../actions/detailsActions";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();
  useEffect(() => {
    if (details.details.id !== id) {
      dispatch(ProductDetailsPage.initialAction(`/products/${id}`))
    }
  }, [id]);
  return (
    <div>
      <ProductDetails product={details.details} />
    </div>
  );
};

ProductDetailsPage.initialAction = (url) => {
  const id = url.slice(url.lastIndexOf("/") + 1);
  return fetchDetails(id);
};

export default ProductDetailsPage;
