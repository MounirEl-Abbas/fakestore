import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  filterBySearch,
  switchLayout,
  sortProducts,
  filterByCategory,
  clearFilters,
} from "../features/products/productsSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const {
    filters: { search, defaultView, sortBy, category, price, rating },
  } = useSelector(store => store.products);

  return (
    <div className="filters">
      <div className="filters-layout">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => {
            dispatch(filterBySearch(e.target.value));
          }}
        />
        <button
          value="grid"
          onClick={e => dispatch(switchLayout(e.target.value))}>
          Grid
        </button>
        <button
          value="default"
          onClick={e => dispatch(switchLayout(e.target.value))}>
          Default
        </button>
        <select
          name="sort-by"
          id="sort-by"
          defaultValue="hidden-placeholder"
          onChange={e => dispatch(sortProducts(e.target.value))}>
          <option value="hidden-placeholder" disabled hidden>
            Select Sort Type
          </option>
          <option value="price-low">Price (Lowest)</option>
          <option value="price-high">Price (Highest)</option>
          <option value="name-az">Name (A - Z)</option>
          <option value="name-za">Name (Z - A)</option>
        </select>
      </div>
      <div className="filters-filter">
        <div className="categories">
          <button
            onClick={e => dispatch(filterByCategory(e.target.value))}
            value="all">
            All
          </button>
          <button
            onClick={e => dispatch(filterByCategory(e.target.value))}
            value="men's clothing">
            Men's Clothing
          </button>
          <button
            onClick={e => dispatch(filterByCategory(e.target.value))}
            value="women's clothing">
            Women's Clothing
          </button>
          <button
            onClick={e => dispatch(filterByCategory(e.target.value))}
            value="jewelery">
            Jewelery
          </button>
          <button
            onClick={e => dispatch(filterByCategory(e.target.value))}
            value="electronics">
            Electronics
          </button>
        </div>
        <button onClick={() => dispatch(clearFilters())}>Clear Filters</button>
      </div>
    </div>
  );
};

export default Filters;
