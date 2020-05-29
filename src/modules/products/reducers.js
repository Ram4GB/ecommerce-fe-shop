import { createSlice } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

const reducer = createSlice({
  initialState: {
    productObject: null,
    attributes: [],
    brands: [],
    types: [],
    filterValues: null,
    carts: []
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
      const index = state.carts.findIndex(p => p.id === action.payload.id);

      if (index === -1) {
        newCart = [...state.carts];
        newCart.push({ ...action.payload, quantity: 1 });
      } else {
        const newProduct = {
          ...state.carts[index],
          quantity: state.carts[index].quantity + action.payload.quantity
        };
        newCart = [
          ...state.carts.slice(0, index),
          newProduct,
          ...state.carts.slice(index + action.payload.quantity)
        ];
      }

      return {
        ...state,
        carts: newCart
      };
    },
    REMOVE_PRODUCT_TO_CART_VIEW: (state, action) => {
      let newCart = [];
      const index = state.carts.findIndex(p => p.id === action.payload.id);

      if (index !== -1) {
        const newProduct = {
          ...state.carts[index],
          quantity: state.carts[index].quantity - action.payload.quantity
        };
        if (newProduct.quantity > 0)
          newCart = [...state.carts.slice(0, index), newProduct, ...state.carts.slice(index + 1)];
        else newCart = [...state.carts.slice(0, index), ...state.carts.slice(index + 1)];
      }

      return {
        ...state,
        carts: newCart
      };
    },
    REMOVE_PRODUCTS: (state, action) => {
      let newCart = [];
      const index = state.carts.findIndex(p => p.id === action.payload.id);

      if (index !== -1) {
        newCart = [...state.carts.slice(0, index), ...state.carts.slice(index + 1)];
      }
      return {
        ...state,
        carts: newCart
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
