import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = ({rowData}) => {
  let tableRows;
  if (rowData.length) {
    tableRows = rowData.map((item) => {
      return (
        <tr key={item.id} className="m-4">
          <td>{item.title}</td>
          <td>{item.description}</td>
          <td>{item.price}</td>
          <td>{item.rating}</td>
          <td>
            <Link to={`/products/${item.id}`}>View Details</Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <div
      className="m-4"
    >
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default ProductList;
