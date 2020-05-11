import { createSlice } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

const reducer = createSlice({
  initialState: {
    product: {},
    error: null
  },
  name: MODULE_NAME,
  reducers: {
    SET_PRODUCT: (state, action) => ({
      ...state,
      product: action.payload
    }),
    SET_ERROR: (state, action) => ({
      ...state,
      error: action.payload
    })
  }
});

export const { SET_PRODUCT, SET_ERROR } = reducer.actions;

export default reducer;
