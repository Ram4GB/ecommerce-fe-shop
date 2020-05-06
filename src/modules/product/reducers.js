import { createSlice } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

const reducer = createSlice({
  initialState: {
    product: null,
    errors: null
  },
  name: MODULE_NAME,
  reducers: {
    SET_PRODUCT: (state, action) => ({
      ...state,
      product: action.payload
    }),
    SET_ERRORS: (state, action) => ({
      ...state,
      errors: action.payload
    })
  }
});

export const { SET_PRODUCT, SET_ERRORS } = reducer.actions;

export default reducer;
