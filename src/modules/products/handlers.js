import { url } from "../../commons/url";
import { fetchAuthLoading } from "../../commons/utils/fetch";

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

export const addToCart = async data => {
  const result = await fetchAuthLoading({
    url: `${url}/addCart`,
    method: "PUT",
    data
  });
  return result;
};

export default null;
