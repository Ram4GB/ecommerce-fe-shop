import { createSlice } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

const cart = JSON.parse(localStorage.getItem("cart"));

const reducer = createSlice({
  initialState: {
    productObject: null,
    attributes: [],
    brands: [],
    types: [],
    filterValues: null,
    cart: cart && Array.isArray(cart) ? cart : []
  },
  name: MODULE_NAME,
  reducers: {
    SET_ATTRIBUTE: (state, action) => ({
      ...state,
      attributes: action.payload.attributes
    }),
    SET_PRODUCT: (state, action) => ({
      ...state,
      productObject: action.payload
    }),
    SET_BRANDS: (state, action) => ({
      ...state,
      brands: action.payload
    }),
    SET_TYPE: (state, action) => ({
      ...state,
      types: action.payload
    }),
    SET_FILTER_VALUES: (state, action) => ({
      ...state,
      filterValues: action.payload
    }),
    ADD_PRODUCT_TO_CART_VIEW: (state, action) => {
      let newCart = [];
      const index = state.cart.findIndex(
        p =>
          p.productId === action.payload.productId && p.variationId === action.payload.variationId
      );

      if (index === -1) {
        newCart = [...state.cart];
        const product = { ...action.payload };
        delete product.cart;
        newCart.push({ ...product, quantity: 1 });
      } else {
        const newProduct = {
          ...state.cart[index],
          quantity: state.cart[index].quantity + action.payload.quantity
        };
        newCart = [
          ...state.cart.slice(0, index),
          newProduct,
          ...state.cart.slice(index + action.payload.quantity)
        ];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));

      return {
        ...state,
        cart: newCart
      };
    },
    REMOVE_PRODUCT_TO_CART_VIEW: (state, action) => {
      let newCart = [];
      const index = state.cart.findIndex(
        p =>
          p.productId === action.payload.productId && p.variationId === action.payload.variationId
      );

      if (index !== -1) {
        const newProduct = {
          ...state.cart[index],
          quantity: state.cart[index].quantity - action.payload.quantity
        };
        if (newProduct.quantity > 0)
          newCart = [...state.cart.slice(0, index), newProduct, ...state.cart.slice(index + 1)];
        else newCart = [...state.cart.slice(0, index), ...state.cart.slice(index + 1)];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));

      return {
        ...state,
        cart: newCart
      };
    },
    REMOVE_PRODUCTS: (state, action) => {
      let newCart = [];
      const index = state.cart.findIndex(
        p =>
          p.productId === action.payload.productId && p.variationId === action.payload.variationId
      );

      if (index !== -1) {
        newCart = [...state.cart.slice(0, index), ...state.cart.slice(index + 1)];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));

      return {
        ...state,
        cart: newCart
      };
    }
  }
});

export const {
  SET_ATTRIBUTE,
  SET_PRODUCT,
  SET_BRANDS,
  SET_TYPE,
  SET_FILTER_VALUES,
  ADD_PRODUCT_TO_CART_VIEW,
  REMOVE_PRODUCT_TO_CART_VIEW,
  REMOVE_PRODUCTS
} = reducer.actions;

export default reducer;
