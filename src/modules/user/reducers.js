import { createSlice } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

const reducer = createSlice({
  initialState: {
    account: null,
    isAuthenticate: true,
    listOrders: {},
    currentOrder: {}
  },
  name: MODULE_NAME,
  reducers: {
    SET_ACCOUNT: (state, action) => ({
      ...state,
      account: action.payload
    }),
    SET_AUTHENTICATION: (state, action) => ({
      ...state,
      isAuthenticate: action.payload
    }),
    SET_LIST_ORDERS: (state, action) => ({
      ...state,
      listOrders: action.payload
    }),
    SET_CURRENT_ORDER: (state, action) => ({
      ...state,
      currentOrder: action.payload
    })
  }
});

export const {
  SET_ACCOUNT,
  SET_AUTHENTICATION,
  SET_LIST_ORDERS,
  SET_CURRENT_ORDER
} = reducer.actions;

export default reducer;
