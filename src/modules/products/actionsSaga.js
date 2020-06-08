import { createAction } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

export const fetchAttribute = createAction(`SAGA_${MODULE_NAME}_FETCH_ATTRIBUTES`);
export const fetchProducts = createAction(`SAGA_${MODULE_NAME}_FETCH_PRODUCTS`);
export const fetchTypes = createAction(`SAGA_${MODULE_NAME}_FETCH_TYPES`);
export const fetchScale = createAction(`SAGA_${MODULE_NAME}_FETCH_SCALE`);
export const fetchBrands = createAction(`SAGA_${MODULE_NAME}_FETCH_BRANDS`);
export const fetchFilterValues = createAction(`SAGA_${MODULE_NAME}_FETCH_FILTER_VALUES`);
export const addToCart = createAction(`SAGA_${MODULE_NAME}_ADD_TO_CART`);
export const addToCartLocal = createAction(`SAGA_${MODULE_NAME}_ADD_TO_CART_LOCAL`);
export const removeProductLocal = createAction(`SAGA_${MODULE_NAME}_REMOVE_PRODUCT_LOCAL`);
export const removeProduct = createAction(`SAGA_${MODULE_NAME}_REMOVE_PRODUCT`);
export const fetchProductCartLocal = createAction(`SAGA_${MODULE_NAME}_FETCH_PRODUCT_CART_LOCAL`);
export const fetchProductCart = createAction(`SAGA_${MODULE_NAME}_FETCH_PRODUCT_CART`);
export const syncCart = createAction(`SAGA_${MODULE_NAME}_SYNC_CART`);

export default null;
