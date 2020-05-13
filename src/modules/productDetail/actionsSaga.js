import { createAction } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

export const fetchProductDetail = createAction(`SAGA_${MODULE_NAME}_FETCH_PRODUCT`);

export default null;
