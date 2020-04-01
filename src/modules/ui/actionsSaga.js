import { createAction } from "@reduxjs/toolkit";
import { MODULE_NAME as MODULE_UI } from "./models";

export const HELLO_SAGA = createAction(`SAGA_${MODULE_UI}_HELLO_SAGA`);

export default null;
