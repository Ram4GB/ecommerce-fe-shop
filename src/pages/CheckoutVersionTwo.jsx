/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useSelector } from "react-redux";
import { MODULE_NAME as MODULE_UI } from "../modules/ui/models";
import CheckLogin from "../modules/ui/components/CheckLogin";
import CheckoutPayment from "../modules/ui/components/CheckoutPayment";
import InfomationUserCheckoutPage from "./InformationUserCheckoutPage";

export default function CheckoutVersionTwo() {
  const activeNavItem = useSelector(state => state[MODULE_UI].checkoutPage.activeNavItem);

  const renderForm = () => {
    switch (activeNavItem) {
      case "#car":
        return <CheckLogin />;
      case "#infomationUser":
        return <InfomationUserCheckoutPage />;
      case "#payment":
        return <CheckoutPayment />;
      default:
        return "Not found";
    }
  };

  return renderForm();
}
