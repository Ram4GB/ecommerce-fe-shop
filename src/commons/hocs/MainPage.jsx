import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import Routes from "./Routes";

import * as actionsSagaUser from "../../modules/user/actionsSaga";
import * as actionsSagaProducts from "../../modules/products/actionsSaga";
import { MODULE_NAME as MODULE_USER } from "../../modules/user/models";
import { MODULE_NAME as MODULE_PRODUCT } from "../../modules/products/models";

export default function MainPage() {
  const dispatch = useDispatch();
  const isAuthenticate = useSelector(state => state[MODULE_USER].isAuthenticate);
  const account = useSelector(state => state[MODULE_USER].account);
  const cart = useSelector(state => state[MODULE_PRODUCT].cart);

  useEffect(() => {
    dispatch(actionsSagaUser.fetchMe());
  }, []);

  useEffect(() => {
    // after user login fetch sync cart
    if (account) dispatch(actionsSagaProducts.syncCart(cart));
  }, [account]);

  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={5}>{isAuthenticate ? null : <Routes />}</SnackbarProvider>
    </BrowserRouter>
  );
}
