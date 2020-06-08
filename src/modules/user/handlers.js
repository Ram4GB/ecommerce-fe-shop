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

export const fetchListOrders = async params => {
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

export default null;
