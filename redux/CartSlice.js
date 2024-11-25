import { createSlice } from "@reduxjs/toolkit";
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
  },
});

export const { addToCart } = CartSlice.actions;
export default CartSlice.reducer;
