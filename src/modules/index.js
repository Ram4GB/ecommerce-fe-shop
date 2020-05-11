import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import rootSaga from "../commons/effects/saga";

import { MODULE_NAME as MODULE_UI } from "./ui/models";
import { MODULE_NAME as MODULE_USER } from "./user/models";
import { MODULE_NAME as MODULE_PRODUCTS } from "./products/models";
import { MODULE_NAME as MODULE_PRODUCT_DETAIL } from "./productDetail/models";

import reducerUI from "./ui/reducers";
import reducerUser from "./user/reducers";
import reducerProducts from "./products/reducers";
import reducerProduct from "./productDetail/reducers";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    [MODULE_UI]: reducerUI.reducer,
    [MODULE_USER]: reducerUser.reducer,
    [MODULE_PRODUCTS]: reducerProducts.reducer,
    [MODULE_PRODUCT_DETAIL]: reducerProduct.reducer
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
