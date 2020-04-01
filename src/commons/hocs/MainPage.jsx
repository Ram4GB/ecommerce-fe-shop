import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

export default function MainPage() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
