import "isomorphic-fetch";
import {
  PRODUCT_LOADING,
  PRODUCT_SUCCESS,
  PRODUCT_FAILED,
} from "../actionTypes/productTypes";

export const productLoading = () => {
  return {
    type: PRODUCT_LOADING,
  };
};
export const productSuccess = (products) => {
  return {
    type: PRODUCT_SUCCESS,
    payload: products,
  };
};
export const productFailed = (error) => {
  return {
    type: PRODUCT_FAILED,
    payload: error
  }
};

export const fetchProducts = () => (dispatch, getState) => {
    console.log('called')
    dispatch(productLoading());
    return fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((products) => {
        dispatch(productSuccess(products.products))
        console.log(products?.total , '--->')
    })
      .catch((error) => dispatch(productFailed(error)))
};
