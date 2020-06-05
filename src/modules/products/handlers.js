import { url } from "../../commons/url";
import { fetchAuthLoading, fetchLoading } from "../../commons/utils/fetch";

export const getAttributes = async () => {
  const result = await fetchAuthLoading({
    url: `${url}/attributes`,
    method: "GET",
    data: null
  });
  return result;
};

export const getProducts = async query => {
  const result = await fetchAuthLoading({
    url: `${url}/items`,
    method: "GET",
    data: null,
    params: {
      query: "",
      sort: "createdAt",
      ...query
    }
  });
  return result;
};

export const getTypes = async () => {
  const result = await fetchAuthLoading({
    url: `${url}/types`,
    method: "GET",
    data: null
  });
  return result;
};

export const getBrands = async () => {
  const result = await fetchAuthLoading({
    url: `${url}/brands`,
    method: "GET",
    data: null
  });
  return result;
};

export const filterValues = async () => {
  const result = await fetchAuthLoading({
    url: `${url}/items/filterValues`,
    method: "GET",
    data: null
  });
  return result;
};

/**
 *
 * @param {*} data {itemId: itemId, variationId: variationId, quantity: quantity }
 */
export const addToCart = async data => {
  const result = await fetchAuthLoading({
    url: `${url}/cart/add`,
    method: "POST",
    data
  });
  return result;
};

/**
 *
 * @param {*} data { itemId: itemId,variationId: variationId }
 */
export const removeToCart = async data => {
  const result = await fetchAuthLoading({
    url: `${url}/cart/remove`,
    method: "DELETE",
    data
  });
  return result;
};

export const addToCartLocal = async data => {
  const result = await fetchAuthLoading({
    url: `${url}/cart/add-local`,
    method: "POST",
    data
  });
  return result;
};

export const fetchProductCartLocal = async cart => {
  const result = await fetchLoading({
    url: `${url}/cart/localList`,
    method: "POST",
    data: {
      cart
    }
  });
  return result;
};

export const fetchProductCart = async () => {
  const result = await fetchLoading({
    url: `${url}/cart/me`,
    method: "GET"
  });
  return result;
};

export const syncCart = async data => {
  const result = await fetchLoading({
    url: `${url}/cart/sync`,
    method: "POST",
    data: {
      cart: data
    }
  });
  return result;
};

export const removeProductCart = async data => {
  const result = await fetchAuthLoading({
    url: `${url}/cart/remove`,
    method: "DELETE",
    data
  });
  return result;
};

/**
 *
 * @param {*} data { itemId: itemId, variationId: variationId, quantity: quantity }
 */
export const updateQuantity = async data => {
  const result = await fetchAuthLoading({
    url: `${url}/cart/quantity`,
    method: "PATCH",
    data
  });
  return result;
};

export const updateQuantityLocal = async data => {
  const result = await fetchAuthLoading({
    url: `${url}/cart/quantity-local`,
    method: "PATCH",
    data
  });
  return result;
};

export const clearCart = async () => {
  const result = await fetchAuthLoading({
    url: `${url}/cart/clear`,
    method: "DELETE",
    data: null
  });
  return result;
};

export default null;
