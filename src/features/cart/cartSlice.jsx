import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      //Add item to array
      state.cartItems.push(action.payload);
      //Update cart amount
      state.amount = state.cartItems.length;
      //Calculate total price in cart
      state.total = state.cartItems.reduce((acc, obj) => acc + obj.price, 0);
    },
  },
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
