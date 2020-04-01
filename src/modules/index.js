import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import rootSaga from "../commons/effects/saga";

import { MODULE_NAME as MODULE_UI } from "./ui/models";

import UIreducer from "./ui/reducers";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    [MODULE_UI]: UIreducer.reducer
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
