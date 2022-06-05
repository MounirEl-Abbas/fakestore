import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productsList: [],
  isLoading: true,
  filters: {
    showFiltered: false,
    filteredList: [],
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
        state.filters.showFiltered = false;
        return;
      }
      //otherwise, filter productsList based on (Search Input vs Product Title)
      state.filters.filteredList = state.productsList.filter(product =>
        product.title.toUpperCase().includes(state.filters.search.toUpperCase())
      );
      //Then show the filteredList
      state.filters.showFiltered = true;
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

export const { filterBySearch, switchLayout } = productsSlice.actions;

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
