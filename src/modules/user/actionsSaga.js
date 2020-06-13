import { createAction } from "@reduxjs/toolkit";
import { MODULE_NAME } from "./models";

export const fetchMe = createAction(`SAGA_${MODULE_NAME}_FETCH_ME`);
export const syncMe = createAction(`SAGA_${MODULE_NAME}_SYNC_ME`);
export const checkAuth = createAction(`SAGA_${MODULE_NAME}_CHECK_AUTH`);
export const updateInfo = createAction(`SAGA_${MODULE_NAME}_UPDATE_INFOR`);
export const fetchListOrders = createAction(`SAGA_${MODULE_NAME}_FETCH_LIST_ORDERS`);
export const fetchOrder = createAction(`SAGA_${MODULE_NAME}_FETCH_ORDER`);
export const fetchSupportTypes = createAction(`SAGA_${MODULE_NAME}_FETCH_SUPPORT_TYPES`);
export const fetchItemUserBought = createAction(`SAGA_${MODULE_NAME}_ITEM_USER_BOUGHT`);
export const fetchUserComment = createAction(`SAGA_${MODULE_NAME}_USER_COMMENT`);

export default null;
