import { createSlice } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

const reducer = createSlice({
  initialState: {
    productObject: null,
    attributes: [],
    brands: [],
    types: [],
    filterValues: null
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
    })
  }
});

export const {
  SET_ATTRIBUTE,
  SET_PRODUCT,
  SET_BRANDS,
  SET_TYPE,
  SET_FILTER_VALUES
} = reducer.actions;

export default reducer;
