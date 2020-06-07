import React from "react";
import { Provider } from "react-redux";
import { Elements as StripeElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import MainPage from "./MainPage";
import store from "../../modules/index";
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE); // use public api key

export default function Root() {
  return (
    <Provider store={store}>
      <StripeElements stripe={stripePromise}>
        <I18nextProvider i18n={i18n}>
          <MainPage />
        </I18nextProvider>
      </StripeElements>
    </Provider>
  );
}
