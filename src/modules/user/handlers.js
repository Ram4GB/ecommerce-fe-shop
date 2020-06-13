import { url } from "../../commons/url";
import { fetchAuthLoading } from "../../commons/utils/fetch";

export const fetchMe = async () => {
  const result = await fetchAuthLoading({
    url: `${url}/accountUser/meInfo`,
    method: "GET"
  });
  return result;
};

export const updateInfo = async data => {
  const result = await fetchAuthLoading({
    url: `${url}/accountUser/meInfo`,
    method: "PUT",
    data
  });
  return result;
};

export const changePassword = async data => {
  const result = await fetchAuthLoading({
    url: `${url}/accountUser/meInfo/password`,
    method: "PATCH",
    data
  });
  return result;
};

export const refreshToken = async () => {
  const result = await fetchAuthLoading({
    url: `${url}/auth/refresh-token`,
    method: "POST"
  });
  return result;
};

export const fetchListOrders = async () => {
  const result = await fetchAuthLoading({
    url: `${url}/orders/me`,
    method: "GET"
  });
  return result;
};

export const fetchOrder = async id => {
  const result = await fetchAuthLoading({
    url: `${url}/orders/me/${id}`,
    method: "GET"
  });
  return result;
};

export const fetchSupportTypes = async () => {
  const result = await fetchAuthLoading({
    url: `${url}/support/types`,
    method: "GET",
    data: null
  });
  return result;
};

export const getFavoriteProducts = async () => {
  const result = await fetchAuthLoading({
    url: `${url}/favorite`,
    method: "GET",
    data: null
  });
  return result;
};

export const userFavItem = async itemId => {
  const result = await fetchAuthLoading({
    url: `${url}/favorite`,
    method: "POST",
    data: {
      itemId
    }
  });
  return result;
};

export const deleteFavItem = async itemId => {
  const result = await fetchAuthLoading({
    url: `${url}/favorite/${itemId}`,
    method: "DELETE"
  });
  return result;
};

export const commentItem = async data => {
  const result = await fetchAuthLoading({
    url: `${url}/comment/`,
    method: "POST",
    data
  });
  return result;
};

export const fetchUserItemsBought = async () => {
  const result = await fetchAuthLoading({
    url: `${url}/comment/bought`,
    method: "GET"
  });
  return result;
};

export const fetchUserComment = async () => {
  const result = await fetchAuthLoading({
    url: `${url}/comment/me`,
    method: "GET"
  });
  return result;
};

export const deleteComment = async idComment => {
  const result = await fetchAuthLoading({
    url: `${url}/comment/${idComment}`,
    method: "DELETE"
  });
  return result;
};

export default null;
