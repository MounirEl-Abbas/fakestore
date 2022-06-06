import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productsList: [],
  isLoading: true,
  filters: {
    search: "",
    defaultView: true,
    sortBy: "hidden-placeholder",
    category: "all",
    price: 999.99,
    rating: "all",
  },
};

const url = "https://fakestoreapi.com/products";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await axios(url);
      console.log("response.data", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterBySearch: (state, action) => {
      state.filters.search = action.payload;
    },
    switchLayout: (state, action) => {
      let layoutOption = action.payload;
      if (layoutOption === "default") {
        state.filters.defaultView = true;
      }
      if (layoutOption === "grid") {
        state.filters.defaultView = false;
      }
    },
    sortProducts: (state, action) => {
      state.filters.sortBy = action.payload;
      let sortType = action.payload;

      if (sortType === "name-az") {
        state.productsList.sort((a, b) => a.title.localeCompare(b.title));
      }
      if (sortType === "name-za") {
        state.productsList.sort((a, b) => b.title.localeCompare(a.title));
      }
      if (sortType === "price-low") {
        state.productsList.sort((a, b) => a.price - b.price);
      }
      if (sortType === "price-high") {
        state.productsList.sort((a, b) => b.price - a.price);
      }
    },
    filterByCategory: (state, action) => {
      state.filters.category = action.payload;
    },
    filterByPrice: (state, action) => {
      state.filters.price = action.payload;
    },
    clearFilters: state => {
      state.filters.search = "";
      state.filters.defaultView = true;
      state.filters.sortBy = "hidden-placeholder";
      state.filters.category = "all";
      state.filters.price = 999.99;
      state.filters.rating = "all";
    },
  },
  extraReducers: {
    [getProducts.pending]: state => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.productsList = action.payload;
    },
    [getProducts.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export const {
  filterBySearch,
  switchLayout,
  sortProducts,
  filterByCategory,
  filterByPrice,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;

/* 


-Price
    >Progress bar
-Rating
    >4 stars or more
    >3 stars or more
    >2 stars or more
    >1 star or more
*/
