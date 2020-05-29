import { createAction } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

export const fetchAttribute = createAction(`SAGA_${MODULE_NAME}_FETCH_ATTRIBUTES`);
export const fetchProducts = createAction(`SAGA_${MODULE_NAME}_FETCH_PRODUCTS`);
export const fetchTypes = createAction(`SAGA_${MODULE_NAME}_FETCH_TYPES`);
export const fetchBrands = createAction(`SAGA_${MODULE_NAME}_FETCH_BRANDS`);
export const fetchFilterValues = createAction(`SAGA_${MODULE_NAME}_FETCH_FILTER_VALUES`);
export const addToCart = createAction(`SAGA_${MODULE_NAME}_ADD_TO_CART`);
export const addToCartLocal = createAction(`SAGA_${MODULE_NAME}_ADD_TO_CART_LOCAL`);
export const fetchCartLocal = createAction(`SAGA_${MODULE_NAME}_FETCH_CART_LOCAL`);

export default null;
