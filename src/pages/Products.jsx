import React from "react";
import { useSelector } from "react-redux";
import Filters from "../components/Filters";
import Product from "../components/Product";

const Products = () => {
  const {
    productsList,
    isLoading,
    filters: { showFiltered, filteredList },
  } = useSelector(store => store.products);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="products-page">
      <aside>
        <Filters />
      </aside>
      <section className="products-container">
        {showFiltered
          ? filteredList.map(product => (
              <Product key={product.id} {...product} />
            ))
          : productsList.map(product => (
              <Product key={product.id} {...product} />
            ))}
      </section>
    </div>
  );
};

export default Products;
