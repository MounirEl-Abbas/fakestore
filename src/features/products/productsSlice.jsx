import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allProductsList: [],
  productsList: [],
  isLoading: true,
  filters: {
    search: "",
    defaultView: true,
    sortBy: "price-low",
    category: "all",
    price: "999.99",
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
      //Get the search input
      state.filters.search = action.payload;

      //If empty (after backspacing)  - show all products
      if (action.payload === "") {
        console.log("now");
        state.productsList = state.allProductsList;
        return;
      }
      //otherwise, filter allProductsList based on (Search Input vs Product Title)
      state.productsList = state.allProductsList.filter(product =>
        product.title.toUpperCase().includes(state.filters.search.toUpperCase())
      );
    },
    switchLayout: (state, action) => {
      let layoutOption = action.payload;
      console.log("layoutOption", layoutOption);
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
        state.allProductsList.sort((a, b) => a.title.localeCompare(b.title));
        state.productsList.sort((a, b) => a.title.localeCompare(b.title));
      }
      if (sortType === "name-za") {
        state.allProductsList.sort((a, b) => b.title.localeCompare(a.title));
        state.productsList.sort((a, b) => b.title.localeCompare(a.title));
      }
      if (sortType === "price-low") {
        state.productsList.sort((a, b) => a.price - b.price);
        state.allProductsList.sort((a, b) => a.price - b.price);
      }
      if (sortType === "price-high") {
        state.allProductsList.sort((a, b) => b.price - a.price);
        state.productsList.sort((a, b) => b.price - a.price);
      }
    },
  },
  extraReducers: {
    [getProducts.pending]: state => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allProductsList = action.payload;
      state.productsList = state.allProductsList;
    },
    [getProducts.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export const { filterBySearch, switchLayout, sortProducts } =
  productsSlice.actions;

export default productsSlice.reducer;

/* 
- Grid / default view
- Sort by 
    >Name (a-z)
    >Name (z-a)
    >Price (highest)
    >Price (lowest)
- Category
    >All
    >Men's clothing
    >Women's clothing
    >Jewelery
    >Electronics
-Price
    >Progress bar
-Rating
    >4 stars or more
    >3 stars or more
    >2 stars or more
    >1 star or more
*/
