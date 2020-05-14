/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useSelector } from "react-redux";
import { FormContext, useForm } from "react-hook-form";
import { MODULE_NAME as MODULE_UI } from "../modules/ui/models";
import CheckoutCarViewInfomation from "../modules/ui/components/CheckoutCarViewInfomation";
import CheckoutPayment from "../modules/ui/components/CheckoutPayment";
import CheckoutFinanceOptions from "../modules/ui/components/CheckoutFinanceOption";

export default function CheckoutVersionTwo() {
  const activeNavItem = useSelector(state => state[MODULE_UI].checkoutPage.activeNavItem);
  const methods = useForm();

  const renderForm = () => {
    switch (activeNavItem) {
      case "#car":
        return <CheckoutCarViewInfomation />;
      case "#payment":
        return <CheckoutPayment />;
      case "#finance-option":
        return <CheckoutFinanceOptions />;
      default:
        return "Not found";
    }
  };

  return <FormContext {...methods}>{renderForm()}</FormContext>;
}
