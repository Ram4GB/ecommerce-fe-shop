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
import UserInformationPage from "../../pages/UserInformationPage";
import ViewMyOrder from "../../pages/ViewMyOrder";
import CartViewPage from "../../pages/CartViewPage";

export default function Routes() {
  const account = useSelector(state => state[MODULE_USER].account);

  if (account) {
    return (
      <MainLayout>
        <Switch>
          <Route component={Homepage} path="/" exact />
          <Route component={SearchProductPage} path="/search" exact />
          {/* <Route component={ProductDetailPage} path="/product/:id" exact /> */}
          <Route component={CheckoutPage} path="/checkout" exact />
          <Route component={UserInformationPage} path="/user/profile" />
          <Route component={ViewMyOrder} path="/user/view_orders" />
          <Route component={CartViewPage} path="/cart_view" exact />
          <Route component={NotFoundPage} path="*" />
        </Switch>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <Switch>
        <Route component={Homepage} path="/" exact />
        <Route component={SearchProductPage} path="/search" exact />
        <Route component={CartViewPage} path="/cart_view" exact />
        <Route component={SearchProductPage} path="/search" exact />
        <Route component={ProductDetailPage} path="/product/:id" exact />
        <Route component={NotFoundPage} path="*" />
      </Switch>
    </MainLayout>
  );
}
