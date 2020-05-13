import React from "react";
import { useSelector } from "react-redux";
import { MODULE_NAME as MODULE_UI } from "../modules/ui/models";
import CheckoutCarViewInfomation from "../modules/ui/components/CheckoutCarViewInfomation";

export default function CheckoutVersionTwo() {
  const activeNavItem = useSelector(state => state[MODULE_UI].checkoutPage.activeNavItem);

  switch (activeNavItem) {
    case "#car":
      return <CheckoutCarViewInfomation />;
    case "#payment":
      return 2;
    default:
      return "Not found";
  }
}
