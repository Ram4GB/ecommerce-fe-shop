import React from "react";
import { Provider } from "react-redux";
import { Elements as StripeElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import MainPage from "./MainPage";
import store from "../../modules/index";

const stripePromise = loadStripe("pk_test_JnucOezrXJg21K5z9JSAz30K00SB2CY6YS"); // use public api key

export default function Root() {
  return (
    <Provider store={store}>
      <StripeElements stripe={stripePromise}>
        <MainPage />
      </StripeElements>
    </Provider>
  );
}
