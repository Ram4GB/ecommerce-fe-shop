import { createSlice } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

const reducer = createSlice({
  initialState: {
    account: null,
    isAuthenticate: true
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
    })
  }
});

export const { SET_ACCOUNT, SET_AUTHENTICATION } = reducer.actions;

export default reducer;
