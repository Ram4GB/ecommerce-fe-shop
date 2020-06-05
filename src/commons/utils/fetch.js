import Axios from "axios";
import NProgress from "nprogress";

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

export const fetchAuthLoading = async ({ method, data, url, params }) => {
  NProgress.start();
  const returnData = await Axios({
    method,
    data,
    url,
    params,
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
  NProgress.done();
  return returnData;
};

export default null;
