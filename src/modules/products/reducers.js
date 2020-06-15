import { createSlice } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

const cart = JSON.parse(localStorage.getItem("cart"));

function cartLocal() {
  // Check cart item
  if (!cart) return [];

  if (!Array.isArray(cart)) return [];
  // check item in cart array
  for (let i = 0; i < cart.length; i += 1) {
    for (let j = 0; j < Object.keys(cart[i]).length; j += 1) {
      const key = Object.keys(cart[i])[j];
      if (!(key === "itemId" || key === "quantity" || key === "variationId")) return [];
    }
  }
  return cart;
}

const reducer = createSlice({
  initialState: {
    productObject: null,
    hotProducts: [],
    attributes: [],
    brands: [],
    types: [],
    scales: [],
    makers: [],
    filterValues: null,
    cart: cartLocal(),
    cartServerUser: [],
    temp: []
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
    SET_HOT_PRODUCT: (state, action) => ({
      ...state,
      hotProducts: action.payload
    }),
    SET_BRANDS: (state, action) => ({
      ...state,
      brands: action.payload
    }),
    SET_MAKERS: (state, action) => ({
      ...state,
      makers: action.payload
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
      // create new array local to add localStorage and save redux
      const newArrayLocal = action.payload.map(p => {
        return {
          itemId: p.CartInfo.itemId,
          variationId: p.CartInfo.variationId,
          quantity: p.CartInfo.quantity
        };
      });

      localStorage.setItem("cart", JSON.stringify(newArrayLocal));

      return {
        ...state,
        cartServerUser: action.payload,
        cart: newArrayLocal
      };
    },
    UPDATE_PRODUCT_TO_CART_VIEW: (state, action) => {
      const newArrayLocal = action.payload.map(p => {
        return {
          itemId: p.CartInfo.itemId,
          variationId: p.CartInfo.variationId,
          quantity: p.CartInfo.quantity
        };
      });

      localStorage.setItem("cart", JSON.stringify(newArrayLocal));

      return {
        ...state,
        cartServerUser: action.payload,
        cart: newArrayLocal
      };
    },
    REMOVE_PRODUCT_TO_CART_VIEW: (state, action) => {
      const index = state.cartServerUser.findIndex(
        p =>
          p.CartInfo.itemId === action.payload.itemId &&
          p.CartInfo.variationId === action.payload.variationId
      );

      let newCart;
      if (index !== -1) {
        newCart = {
          ...state.cartServerUser[index],
          CartInfo: {
            ...state.cartServerUser[index].CartInfo,
            quantity: state.cartServerUser[index].CartInfo.quantity - action.payload.quantity
          }
        };
      }

      const newCartServer = [
        ...state.cartServerUser.slice(0, index),
        newCart,
        ...state.cartServerUser.slice(index + 1)
      ];

      // create new array local to add localStorage and save redux
      const newArrayLocal = newCartServer.map(p => {
        return {
          itemId: p.CartInfo.itemId,
          variationId: p.CartInfo.variationId,
          quantity: p.CartInfo.quantity
        };
      });

      localStorage.setItem("cart", JSON.stringify(newArrayLocal));

      return {
        ...state,
        cartServerUser: newCartServer,
        cart: newArrayLocal
      };
    },
    REMOVE_PRODUCTS: (state, action) => {
      let newCart = [...state.cart];
      let newCartServer = [...state.cartServerUser];

      // remove local
      let index = state.cart.findIndex(
        p => p.itemId === action.payload.itemId && p.variationId === action.payload.variationId
      );

      if (index !== -1) {
        newCart = [...state.cart.slice(0, index), ...state.cart.slice(index + 1)];
      }

      // remove cart from server
      index = state.cart.findIndex(
        p => p.itemId === action.payload.itemId && p.variationId === action.payload.variationId
      );

      if (index !== -1) {
        newCartServer = [
          ...state.cartServerUser.slice(0, index),
          ...state.cartServerUser.slice(index + 1)
        ];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));

      return {
        ...state,
        cart: newCart,
        cartServerUser: newCartServer
      };
    },
    SET_CART_SERVER_USER: (state, action) => {
      return {
        ...state,
        cartServerUser: action.payload
      };
    },
    SET_CART_SYNC_TO_LOCAL: (state, action) => {
      const newCart = action.payload.map(p => {
        return {
          itemId: p.CartInfo.itemId,
          variationId: p.CartInfo.variationId,
          quantity: p.CartInfo.quantity
        };
      });

      localStorage.setItem("cart", JSON.stringify(newCart));

      return {
        ...state,
        cart: newCart,
        cartServerUser: action.payload
      };
    },
    CLEAR_CART: state => ({
      ...state,
      cart: [],
      cartServerUser: []
    }),
    SET_SCALES: (state, action) => ({
      ...state,
      scales: action.payload
    })
  }
});

export const {
  SET_ATTRIBUTE,
  SET_PRODUCT,
  SET_HOT_PRODUCT,
  SET_BRANDS,
  SET_TYPE,
  SET_FILTER_VALUES,
  ADD_PRODUCT_TO_CART_VIEW,
  REMOVE_PRODUCT_TO_CART_VIEW,
  REMOVE_PRODUCTS,
  UPDATE_PRODUCT_TO_CART_VIEW,
  SET_CART_SERVER_USER,
  SET_CART_SYNC_TO_LOCAL,
  CLEAR_CART,
  SET_SCALES,
  SET_MAKERS
} = reducer.actions;

export default reducer;
