import Axios from "axios";

export const fetchLoading = async ({ method, data, url }) => {
  return Axios({
    method,
    data,
    url,
    withCredentials: true
  })
    .then(result => ({
      data: result.data,
      success: true
    }))
    .catch(error => ({
      ...error.response.data,
      success: false
    }));
};

export const fetchAuthLoading = async ({ method, data, url }) => {
  return Axios({
    method,
    data,
    url,
    withCredentials: true
  })
    .then(result => ({
      data: result.data,
      success: true
    }))
    .catch(error => ({
      ...error.response.data,
      success: false
    }));
};

export default null;
