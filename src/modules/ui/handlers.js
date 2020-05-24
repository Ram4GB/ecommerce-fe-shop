import { fetchLoading, fetchAuthLoading } from "../../commons/utils/fetch";
import { url } from "../../commons/url";

export const login = async data => {
  const result = await fetchLoading({
    url: `${url}/auth/login`,
    method: "POST",
    data
  });
  return result;
};

export const logout = async () => {
  const result = await fetchAuthLoading({
    url: `${url}/auth/signout`,
    method: "POST",
    data: null
  });
  return result;
};

export const signup = async data => {
  const result = await fetchAuthLoading({
    url: `${url}/accountUser/signup`,
    method: "POST",
    data
  });
  return result;
};

export const loadFinanceOptions = async data => {
  const result = await fetchAuthLoading({
    url: `${url}/payment/loanCal`,
    method: "POST",
    data
  });
  return result;
};

export default null;
