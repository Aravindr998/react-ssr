import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const ProductDetails = ({product}) => {

  return (
    <div>
      <Helmet>
        <title>{product.title}</title>
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.thumbnail} />
      </Helmet>
      <div className="container flex justify-around p-12 w-full">
        <div className="flex flex-col">
          <div>
            <img
              src={product?.images?.[0]}
              alt=""
              className="rounded-lg max-h-80"
            />
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-2xl font-semibold mb-5">{`${product.brand} ${product.title}`}</h2>
          </div>
          <div>
            <p className="mb-5">{product.description}</p>
          </div>
          <div className="bg-black inline-block p-1.5 rounded-lg mb-5">
            <p className="text-white font-semibold">
              Rating {product.rating}/5
            </p>
          </div>
          <div>
            <p className="font-bold text-xl">Price ${product.price}</p>
            <p className="text-green-900">
              {product.discountPercentage}% discount
            </p>
          </div>
        </div>
      </div>
      <div className="flex m-5">
        {product?.images?.map((item) => {
          return (
            <div key={item} className="w-48 h-20">
              <img src={item} alt="" className="rounded-lg max-h-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetails;
