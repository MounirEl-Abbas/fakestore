import React from "react";
import { useSelector } from "react-redux";
import Product from "./Product";

const Products = () => {
  const { productsList, isLoading } = useSelector(store => store.products);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <section className="products-container">
      {productsList.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </section>
  );
};

export default Products;
