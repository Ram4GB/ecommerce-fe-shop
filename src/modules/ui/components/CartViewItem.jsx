/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Grid } from "@material-ui/core";

export default function CartViewItem() {
  const [amount, setAmount] = useState(0);

  const handleIncrement = () => {
    setAmount(amount + 1);
  };

  const handleDecrement = () => {
    let newAmount = amount - 1;
    if (newAmount === -1) newAmount = 0;
    setAmount(newAmount);
  };

  const handleChangeInput = e => {
    setAmount(e.target.value);
  };

  return (
    <div className="cart-view-item">
      <Grid container>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <img
            src="https://salt.tikicdn.com/cache/175x175/ts/product/3b/69/45/f07562208e36e779b8b2dca7bc625cd1.jpg"
            alt=""
            className="img-cart-view"
          />
        </Grid>
        <Grid item lg={10} md={10}>
          <Grid container>
            <Grid item className="information-item-cart-view" lg={8} md={12} sm={12} xs={12}>
              <h3>Honda Air Blade motorbike 2020 - 150cc - ABS - Black Gray Silver</h3>
              <p>
                <span>Product by </span>
                <a href="#">System HEAD Khánh An</a>
              </p>
              <div className="action">
                <span>Delete</span>
                <span>Take later</span>
              </div>
            </Grid>
            <Grid item className="price" lg={2} md={12} sm={12} xs={12}>
              <p className="price-discount">54.310.000đ</p>
              <div>
                <div className="real-price">65.000.000đ</div>
                <div className="percent-discount">-16%</div>
              </div>
            </Grid>
            <Grid item lg={2} md={12} sm={12} xs={12}>
              <div className="actions-input">
                <button onClick={handleDecrement} className="button-decrement" type="button">
                  <span className="ti-minus" />
                </button>
                <input
                  onChange={handleChangeInput}
                  className="input-price"
                  value={amount}
                  type="text"
                />
                <button onClick={handleIncrement} className="button-increment" type="button">
                  <span className="ti-plus" />
                </button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
