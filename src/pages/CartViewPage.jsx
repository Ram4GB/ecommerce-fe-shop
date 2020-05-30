/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Grid, Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CartViewItem from "../modules/ui/components/CartViewItem";
import { MODULE_NAME } from "../modules/products/models";
import { MODULE_NAME as MODULE_USER } from "../modules/user/models";
import * as actionsSagaProduct from "../modules/products/actionsSaga";

export default function CartViewPage() {
  const cart = useSelector(state => state[MODULE_NAME].cart);
  const account = useSelector(state => state[MODULE_USER].account);
  const dispatch = useDispatch();
  const history = useHistory();

  const renderCartView = () => {
    if (cart && cart.length > 0) {
      return cart.map(c => {
        return <CartViewItem cart={c} />;
      });
    }
    return null;
  };

  useEffect(() => {
    if (account) {
      //
    } else {
      dispatch(actionsSagaProduct.fetchCartLocal(cart));
    }
  }, []);

  return (
    <div className="cart-view">
      <Container>
        <Grid container>
          <Grid style={{ backgroundColor: "#ffffff" }} item lg={9} md={12} sm={12} xs={12}>
            {renderCartView()}
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
              <button
                onClick={() => history.push("/checkout-version-2")}
                type="button"
                className="button-checkout"
              >
                checkout order
              </button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
