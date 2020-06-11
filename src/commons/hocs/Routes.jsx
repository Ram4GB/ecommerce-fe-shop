import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "./MainLayout";

import Homepage from "../../pages/Homepage";
import SearchProductPage from "../../pages/SearchProductPage";
import ProductDetailPage from "../../pages/ProductDetailPage";
import { MODULE_NAME as MODULE_USER } from "../../modules/user/models";
import NotFoundPage from "../../pages/NotFoundPage";
import UserInformationPage from "../../pages/UserInformationPage";
import ViewMyOrder from "../../pages/ViewMyOrder";
import CartViewPage from "../../pages/CartViewPage";
import LayoutCheckoutPage from "./LayoutCheckoutPage";
import CheckoutVersionTwo from "../../pages/CheckoutVersionTwo";
import LayoutContentUser from "../components/LayoutContentUser";
import UserSupportPage from "../../pages/UserSupportPage";

export default function Routes() {
  const account = useSelector(state => state[MODULE_USER].account);

  if (account) {
    return (
      <Switch>
        <Route path="/" exact>
          <MainLayout>
            <Homepage />
          </MainLayout>
        </Route>
        <Route path="/search" exact>
          <MainLayout>
            <SearchProductPage />
          </MainLayout>
        </Route>
        <Route path="/product/:id" exact>
          <MainLayout>
            <ProductDetailPage />
          </MainLayout>
        </Route>
        <Route path="/user/profile">
          <MainLayout>
            <LayoutContentUser>
              <UserInformationPage />
            </LayoutContentUser>
          </MainLayout>
        </Route>
        <Route path="/user/view_orders">
          <MainLayout>
            <ViewMyOrder />
          </MainLayout>
        </Route>
        <Route path="/user/support-user">
          <MainLayout>
            <LayoutContentUser>
              <UserSupportPage />
            </LayoutContentUser>
          </MainLayout>
        </Route>
        <Route path="/cart_view" exact>
          <MainLayout>
            <CartViewPage />
          </MainLayout>
        </Route>
        <Route path="/checkout-version-2" exact>
          <LayoutCheckoutPage>
            <CheckoutVersionTwo />
          </LayoutCheckoutPage>
        </Route>
        <Route path={["/not-found", "*"]}>
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        </Route>
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <MainLayout>
          <Homepage />
        </MainLayout>
      </Route>
      <Route path="/search" exact>
        <MainLayout>
          <SearchProductPage />
        </MainLayout>
      </Route>
      <Route path="/cart_view" exact>
        <MainLayout>
          <CartViewPage />
        </MainLayout>
      </Route>
      <Route path="/checkout-version-2" exact>
        <LayoutCheckoutPage>
          <CheckoutVersionTwo />
        </LayoutCheckoutPage>
      </Route>
      <Route path="/product/:id" exact>
        <MainLayout>
          <ProductDetailPage />
        </MainLayout>
      </Route>
      <Route path={["/not-found", "*"]}>
        <MainLayout>
          <NotFoundPage />
        </MainLayout>
      </Route>
    </Switch>
  );
}
