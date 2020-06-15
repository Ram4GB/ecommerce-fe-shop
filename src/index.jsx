import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "nprogress/nprogress.css";

import "./commons/assets/css/root.css";
import "./commons/assets/css/layout-2.css";
import "./commons/assets/css/header.css";
// import "./commons/assets/css/carousel.css";
// import "./commons/assets/css/section.css";
// import "./commons/assets/css/product-item-style-list.css";
// import "./commons/assets/css/product-item.css";
import "./commons/assets/css/ps-product.css";
import "./commons/assets/css/footer.css";
import "./commons/assets/css/search-product-page.css";
import "./commons/assets/css/product-detail-page.css";
import "./commons/assets/css/checkout-page.css";
import "./commons/assets/css/login-form.css";
import "./commons/assets/css/information-user.css";
import "./commons/assets/css/cart-view.css";
import "./commons/assets/css/custom-stripe.css";
import "./commons/assets/css/user-support-page.css";
import "./commons/assets/css/comment.css";
import "./commons/assets/css/fav-item-page.css";
import "./commons/assets/css/homepage.css";
import "./commons/assets/css/order-detail.css";
import Root from "./commons/hocs/Root";

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
