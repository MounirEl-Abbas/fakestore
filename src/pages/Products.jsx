import React from "react";
import { useSelector } from "react-redux";
import Filters from "../components/Filters";
import Product from "../components/Product";

const Products = () => {
  const products = useSelector(store => store.products);

  let filteredProducts = products.productsList;

  if (products.isLoading) {
    return <div>Loading</div>;
  }

  if (products.filters.search === "") {
    filteredProducts = products.productsList;
  }

  if (products.filters.search !== "") {
    filteredProducts = filteredProducts.filter(product =>
      product.title
        .toUpperCase()
        .includes(products.filters.search.toUpperCase())
    );
  }

  if (products.filters.category !== "all") {
    let categorySelected = products.filters.category;
    filteredProducts = filteredProducts.filter(
      product => product.category === categorySelected
    );
  }

  filteredProducts = filteredProducts.filter(
    product => product.price < products.filters.price
  );

  return (
    <div className="products-page">
      <aside>
        <Filters />
      </aside>
      <section className="products-container">
        {filteredProducts.length < 1 ? (
          <h3>Sorry, no products matched your search criteria.</h3>
        ) : (
          filteredProducts.map(product => (
            <Product key={product.id} product={product} />
          ))
        )}
      </section>
    </div>
  );
};

export default Products;
