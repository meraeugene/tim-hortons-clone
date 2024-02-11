import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingInformation: {}, paymentMethod: "COD" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // the item that is passed to the action
      const newItem = action.payload;
      // item that is the same id and size
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id && item.size === newItem.size,
      );

      if (existingItem) {
        // If the item with the same ID and size exists, update its quantity
        state.cartItems = state.cartItems.map((item) =>
          item._id === existingItem._id && item.size === existingItem.size
            ? {
                ...item,
                quantity: item.quantity + newItem.quantity,
                price: (item.quantity + newItem.quantity) * newItem.price,
              }
            : item,
        );
      } else {
        state.cartItems = [
          ...state.cartItems,
          {
            ...newItem,
            price: newItem.price * newItem.quantity,
          },
        ];
      }

      return updateCart(state);
    },
    increaseQuantity: (state, action) => {
      const { id, size } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item._id === id && item.size === size
          ? {
              ...item,
              quantity: item.quantity + 1,
              price: item.price + item.price / item.quantity,
            }
          : item,
      );
      return updateCart(state);
    },
    decreaseQuantity: (state, action) => {
      const { id, size } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item._id === id && item.size === size && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              price: item.price - item.price / item.quantity,
            }
          : item,
      );

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => !(item._id === id && item.size === size),
      );

      // Check if the cart is empty after removing the item
      if (state.cartItems.length === 0) {
        state.cartItems = [];
        state.itemsPrice = null;
        state.shippingPrice = null;
        state.totalPrice = null;
        state.taxPrice = null;
        localStorage.removeItem("cart");
      } else {
        // If the cart is not empty, update the cart prices
        updateCart(state);
      }
    },

    saveShippingInformation: (state, action) => {
      state.shippingInformation = {
        ...state.shippingInformation,
        ...action.payload,
      };
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      state.itemsPrice = null;
      state.shippingPrice = null;
      state.totalPrice = null;
      state.taxPrice = null;
      localStorage.removeItem("cart");
    },
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  clearCartItems,
  saveShippingInformation,
  savePaymentMethod,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
