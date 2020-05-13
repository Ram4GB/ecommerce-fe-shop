import { url } from "../../commons/url";
import { fetchLoading } from "../../commons/utils/fetch";

export const fetchProduct = async id => {
  const result = await fetchLoading({
    url: `${url}/items/${id}`,
    method: "GET"
  });
  return result;
};

export default null;
