import url from "../../commons/url";
import { fetchAuthLoading } from "../../commons/utils/fetch";

export const fetchMe = async () => {
  const result = await fetchAuthLoading({
    url: `${url}/accountUser/meInfo`,
    method: "GET"
  });
  return result;
};

export default null;
