import { createSlice } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

const reducer = createSlice({
  initialState: {
    account: null,
    isAuthenticate: true,
    listOrders: [],
    currentOrder: {},
    supportTypes: null,
    itemsUserBought: [],
    userComments: [],
    favoritedItem: []
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
    }),
    SET_SUPPORT_TYPE: (state, action) => ({
      ...state,
      supportTypes: action.payload
    }),
    SET_ITEM_USER_BOUGHT: (state, action) => ({
      ...state,
      itemsUserBought: action.payload
    }),
    SET_USER_COMMENTS: (state, action) => ({
      ...state,
      userComments: action.payload
    }),
    SET_FAV_ITEM: (state, action) => ({
      ...state,
      favoritedItem: action.payload
    })
  }
});

export const {
  SET_ACCOUNT,
  SET_AUTHENTICATION,
  SET_LIST_ORDERS,
  SET_CURRENT_ORDER,
  SET_SUPPORT_TYPE,
  SET_ITEM_USER_BOUGHT,
  SET_USER_COMMENTS,
  SET_FAV_ITEM
} = reducer.actions;

export default reducer;
