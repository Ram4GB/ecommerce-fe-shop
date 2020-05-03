import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "./commons/assets/css/root.css";
import "./commons/assets/css/header.css";
import "./commons/assets/css/carousel.css";
import "./commons/assets/css/section.css";
import "./commons/assets/css/product-item-style-list.css";
import "./commons/assets/css/product-item.css";
import "./commons/assets/css/footer.css";
import "./commons/assets/css/responsive.css";
import "./commons/assets/css/search-product-page.css";
import "./commons/assets/css/product-detail-page.css";
import "./commons/assets/css/checkout-page.css";
import "./commons/assets/css/login-form.css";
import "./commons/assets/css/information-user.css";
import Root from "./commons/hocs/Root";

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
