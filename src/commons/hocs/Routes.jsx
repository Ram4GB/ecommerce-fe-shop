import React from "react";
import { Switch, Route } from "react-router-dom";
import MainLayout from "./MainLayout";

import Homepage from "../../pages/Homepage";
import TestSagaPage from "../../pages/TestSagaPage";
import SearchProductPage from "../../pages/SearchProductPage";

export default function Routes() {
  const user = null;
  if (user) {
    return (
      <MainLayout>
        <Switch>
          <Route component={Homepage} path="/" exact />
          <Route path="*">Not Found</Route>
        </Switch>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <Switch>
        <Route component={Homepage} path="/" exact />
        <Route component={SearchProductPage} path="/search" exact />
        <Route component={TestSagaPage} path="/saga" exact />
        <Route path="*">Not Found</Route>
      </Switch>
    </MainLayout>
  );
}
