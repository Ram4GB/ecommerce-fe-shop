/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { urlImages } from "../../../commons/url";
import * as actionsSagaProducts from "../../products/actionsSaga";
import * as actionReducerProducts from "../../products/reducers";
import { MODULE_NAME as MODULE_USER } from "../../user/models";

export default function CartViewItem({ cart }) {
  const account = useSelector(state => state[MODULE_USER].account);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    if (account) {
      dispatch(actionsSagaProducts.addToCart({ ...cart, quantity: 1 }));
    } else {
      dispatch(
        actionsSagaProducts.addToCartLocal({
          ...cart,
          quantity: 1
        })
      );
    }
  };

  const handleDecrement = () => {
    if (!account) {
      let newAmount = cart.quantiy - 1;
      if (newAmount === -1) newAmount = 0;
      dispatch(actionReducerProducts.REMOVE_PRODUCT_TO_CART_VIEW({ ...cart, quantity: 1 }));
    }
  };

  const handleChangeInput = e => {
    const { value } = e.target;
    if (_.isNumber(value) && value >= 0)
      dispatch(actionReducerProducts.UPDATE_PRODUCT_TO_CART_VIEW({ ...cart, quantity: value }));
    else dispatch(actionReducerProducts.UPDATE_PRODUCT_TO_CART_VIEW({ ...cart, quantity: 1 }));
  };

  return (
    <div className="cart-view-item">
      <Grid container>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <img
            src={
              cart.Imgs && cart.Imgs.length > 0
                ? `${urlImages}/${cart.Imgs[0].Media.url}`
                : "https://salt.tikicdn.com/cache/175x175/ts/product/3b/69/45/f07562208e36e779b8b2dca7bc625cd1.jpg"
            }
            alt=""
            className="img-cart-view"
          />
        </Grid>
        <Grid item lg={10} md={10}>
          <Grid container>
            <Grid item className="information-item-cart-view" lg={8} md={12} sm={12} xs={12}>
              <h3>{cart.name}</h3>
              <p>
                <span>Product by </span>
                <a href="#">System HEAD Khánh An</a>
              </p>
              <div className="action">
                <span onClick={() => dispatch(actionReducerProducts.REMOVE_PRODUCTS(cart))}>
                  Delete
                </span>
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
                  value={cart.quantity}
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

CartViewItem.propTypes = {
  cart: PropTypes.object.isRequired
};
