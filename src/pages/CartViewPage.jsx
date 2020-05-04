/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Grid, Container } from "@material-ui/core";
import CartViewItem from "../modules/ui/components/CartViewItem";

export default function CartViewPage() {
  return (
    <div className="cart-view">
      <Container>
        <Grid container>
          <Grid style={{ backgroundColor: "#ffffff" }} item lg={9} md={12} sm={12} xs={12}>
            <CartViewItem />
            <CartViewItem />
            <CartViewItem />
          </Grid>

          <Grid item md={12} lg={3} sm={12} xs={12}>
            <div className="right-afix">
              <div className="box-style fee">
                <p className="list-info-price">
                  <span>Provisional Sums </span>
                  <span>200.000.000đ</span>
                </p>
              </div>
              <div className="box-style fee">
                <p className="list-info-price">
                  <span>Payment Sums: </span>
                  <span className="paymen-sum">200.000.000đ</span>
                </p>
              </div>
              <button type="button" className="button-checkout">
                checkout order
              </button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
