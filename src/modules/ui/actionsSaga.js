import { createAction } from "@reduxjs/toolkit";
import { MODULE_NAME as MODULE_UI } from "./models";

export const login = createAction(`SAGA_${MODULE_UI}_LOGIN`);
export const logout = createAction(`SAGA_${MODULE_UI}_LOGOUT`);
export const signup = createAction(`SAGA_${MODULE_UI}_SIGNUP`);
export const loadFinanceOptions = createAction(`SAGA_${MODULE_UI}_LOAD_FINANCE_OPTION`);
export const fetchFooterData = createAction(`SAGA_${MODULE_UI}_LOAD_FOOTER_DATA`);

export default null;
