import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "./MainLayout";

import Homepage from "../../pages/Homepage";
import SearchProductPage from "../../pages/SearchProductPage";
import ProductDetailPage from "../../pages/ProductDetailPage";
import CheckoutPage from "../../pages/CheckoutPage";
import { MODULE_NAME as MODULE_USER } from "../../modules/user/models";
import NotFoundPage from "../../pages/NotFoundPage";

export default function Routes() {
  const account = useSelector(state => state[MODULE_USER].account);

  if (account) {
    return (
      <MainLayout>
        <Switch>
          <Route component={Homepage} path="/" exact />
          <Route component={SearchProductPage} path="/search" exact />
          <Route component={ProductDetailPage} path="/product" exact />
          <Route component={CheckoutPage} path="/checkout" exact />
          <Route component={NotFoundPage} path="*" />
        </Switch>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <Switch>
        <Route component={Homepage} path="/" exact />
        <Route component={NotFoundPage} path="*" />
      </Switch>
    </MainLayout>
  );
}
