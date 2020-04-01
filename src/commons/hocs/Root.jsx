import React from "react";
import { Provider } from "react-redux";
import MainPage from "./MainPage";
import store from "../../modules/index";

export default function Root() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}
