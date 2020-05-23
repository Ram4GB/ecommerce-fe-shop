import React from "react";
import { Provider } from "react-redux";
import { Elements as StripeElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import MainPage from "./MainPage";
import store from "../../modules/index";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE); // use public api key

export default function Root() {
  return (
    <Provider store={store}>
      <StripeElements stripe={stripePromise}>
        <MainPage />
      </StripeElements>
    </Provider>
  );
}
