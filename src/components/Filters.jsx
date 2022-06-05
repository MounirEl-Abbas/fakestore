import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterBySearch } from "../features/products/productsSlice";

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
        <button>Grid</button>
        <button>Default</button>
        <select name="sort-by" id="sort-by">
          <option value="price-low">Price (Lowest)</option>
          <option value="price-high">Price (Highest)</option>
          <option value="name-az">Name (A - Z)</option>
          <option value="name-za">Name (Z - A)</option>
        </select>
      </div>
      <div className="filters-filter">
        <button>Clear Filters</button>
      </div>
    </div>
  );
};

export default Filters;
