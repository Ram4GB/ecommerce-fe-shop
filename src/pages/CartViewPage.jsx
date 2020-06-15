/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Grid, Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CartViewItem from "../modules/ui/components/CartViewItem";
import { MODULE_NAME as MODULE_PRODUCT } from "../modules/products/models";
import { MODULE_NAME as MODULE_USER } from "../modules/user/models";
import * as actionsSagaProduct from "../modules/products/actionsSaga";
import loadingAnimation from "../commons/assets/animations/loading2.json";
import NumberDisplay from "../commons/components/NumberFormatCurrency";

export default function CartViewPage() {
  const cart = useSelector(state => state[MODULE_PRODUCT].cart);
  const cartServerUser = useSelector(state => state[MODULE_PRODUCT].cartServerUser);
  const account = useSelector(state => state[MODULE_USER].account);
  const dispatch = useDispatch();
  const history = useHistory();

  const renderCartView = () => {
    if (!cartServerUser.length) {
      return (
        <>
          <h2 style={{ textAlign: "center", margin: "50px" }}>Giỏ hàng trống</h2>
          <button onClick={() => history.push("/")} type="button" className="button-checkout">
            Về trang chủ
          </button>
        </>
      );
    }

    if (account) {
      if (cartServerUser && Array.isArray(cartServerUser)) {
        return cartServerUser.map(c => {
          return <CartViewItem key={c.Item.id} cartItem={c} />;
        });
      }
    } else if (cartServerUser && Array.isArray(cartServerUser)) {
      return cartServerUser.map(c => {
        return <CartViewItem key={c.Item.id} cartItem={c} />;
      });
    }

    return null;
  };

  useEffect(() => {
    if (account) {
      dispatch(actionsSagaProduct.syncCart(cart));
    } else {
      dispatch(actionsSagaProduct.fetchProductCartLocal(cart));
    }
  }, [account]);

  const totalPrice = () => {
    let sum = 0;
    for (let i = 0; i < cartServerUser.length; i += 1) {
      sum += cartServerUser[i].Item.priceSale * cartServerUser[i].CartInfo.quantity;
    }
    return sum;
  };

  return (
    <div className="cart-view">
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Giỏ hàng</h2>
      <Container>
        <Grid container>
          <Grid style={{ backgroundColor: "#ffffff" }} item lg={9} md={12} sm={12} xs={12}>
            {cartServerUser ? (
              renderCartView()
            ) : (
              <lottie-player
                src={JSON.stringify(loadingAnimation)}
                background="transparent"
                speed="1"
                loop
                autoplay
                style={{ width: 300, height: 300, margin: "auto", display: "block" }}
              />
            )}
          </Grid>

          {cartServerUser.length === 0 ? null : (
            <Grid item md={12} lg={3} sm={12} xs={12}>
              <div className="right-afix">
                <div className="box-style fee">
                  <p className="list-info-price">
                    <span>Tổng tiền</span>
                    <span className="paymen-sum">
                      <NumberDisplay value={totalPrice()} />
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => history.push("/checkout-version-2")}
                  type="button"
                  className="button-checkout"
                >
                  Thanh toán
                </button>
              </div>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}
