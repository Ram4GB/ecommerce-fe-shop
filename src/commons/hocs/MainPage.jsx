import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import Routes from "./Routes";
import * as actionsSagaUser from "../../modules/user/actionsSaga";
import { MODULE_NAME as MODULE_USER } from "../../modules/user/models";

export default function MainPage() {
  const dispatch = useDispatch();
  const isAuthenticate = useSelector(state => state[MODULE_USER].isAuthenticate);

  useEffect(() => {
    dispatch(actionsSagaUser.fetchMe());
  }, []);

  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={5}>{isAuthenticate ? null : <Routes />}</SnackbarProvider>
    </BrowserRouter>
  );
}
