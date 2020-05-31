/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import numeral from "numeral";
import { urlImages } from "../../../commons/url";
import * as actionsSagaProducts from "../../products/actionsSaga";
import * as actionReducerProducts from "../../products/reducers";
import * as actionReducerUI from "../reducers";
import { MODULE_NAME as MODULE_USER } from "../../user/models";
import { MODULE_NAME as MODULE_PRODUCT } from "../../products/models";
import { updateQuantity, updateQuantityLocal, removeProductCart } from "../../products/handlers";

export default function CartViewItem({ cart, cartInfo }) {
  const account = useSelector(state => state[MODULE_USER].account);
  const cartLocal = useSelector(state => state[MODULE_PRODUCT].cart);
  const dispatch = useDispatch();
  const [isCallBack, setIsCallBack] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [isShouldUpdateQuantity, setIsShouldUpdateQuantity] = useState(false);

  const handleIncrement = () => {
    if (account) {
      dispatch(
        actionsSagaProducts.addToCart({
          itemId: cartInfo.itemId,
          variationId: cartInfo.variationId,
          quantity: 1
        })
      );
    } else {
      dispatch(
        actionsSagaProducts.addToCartLocal({
          itemId: cartInfo.itemId,
          variationId: cartInfo.variationId,
          quantity: 1
        })
      );
    }
  };

  const handleDecrement = () => {
    if (!account) {
      let newAmount = cart.quantiy - 1;
      if (newAmount === -1) newAmount = 0;
      dispatch(actionsSagaProducts.removeProductLocal({ ...cart, quantity: 1 }));
      setIsCallBack(true);
    } else {
      dispatch(actionsSagaProducts.removeProductLocal({ ...cart, quantity: 1 }));
      dispatch(
        actionsSagaProducts.removeProduct({
          itemId: cartInfo.itemId,
          variationId: cartInfo.variationId
        })
      );
      setIsCallBack(true);
    }
  };

  useEffect(() => {
    console.log(isCallBack);
    // for handleDecrement callBack
    // console.log(2, cartLocal);
    if (isCallBack) {
      console.log(3);
      dispatch(actionsSagaProducts.fetchProductCartLocal(cartLocal));
      setIsCallBack(false);
    }
    setQuantity(cartInfo.quantity);
  }, [cartLocal]);

  const handleChangeInput = async e => {
    const { value } = e.target;
    setQuantity(value);
    setIsShouldUpdateQuantity(true);
  };

  useEffect(() => {
    async function fetch() {
      if (account) {
        const result = await updateQuantity({
          itemId: cartInfo.itemId,
          variationId: cartInfo.variationId,
          quantity
        });
        try {
          if (result.success) {
            dispatch(
              actionReducerProducts.UPDATE_PRODUCT_TO_CART_VIEW({
                itemId: cartInfo.itemId,
                variationId: cartInfo.variationId,
                quantity
              })
            );
            setIsCallBack(true);
          } else {
            // fall back
            dispatch(actionReducerUI.SET_ERROR_MESSAGE(result));
            setQuantity(1);
            setIsCallBack(true);
          }
        } catch (error) {
          dispatch(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
          setQuantity(1);
          setIsCallBack(true);
        }
      } else {
        try {
          const result = await updateQuantityLocal({
            itemId: cartInfo.itemId,
            variationId: cartInfo.variationId,
            quantity,
            cart: cartLocal
          });
          if (result.success) {
            dispatch(
              actionReducerProducts.UPDATE_PRODUCT_TO_CART_VIEW({
                itemId: cartInfo.itemId,
                variationId: cartInfo.variationId,
                quantity
              })
            );
            setIsCallBack(true);
          } else {
            // fall back
            dispatch(actionReducerUI.SET_ERROR_MESSAGE(result));
            setQuantity(1);
            setIsCallBack(true);
          }
        } catch (error) {
          dispatch(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
          setQuantity(1);
          setIsCallBack(true);
        }
      }
      setIsShouldUpdateQuantity(false);
    }
    if (isShouldUpdateQuantity) fetch();
  }, [quantity]);

  const handleRemove = async () => {
    if (account) {
      try {
        const result = await removeProductCart({
          itemId: cartInfo.itemId,
          variationId: cartInfo.variationId
        });
        if (result.success) {
          setIsCallBack(true);
          dispatch(actionReducerProducts.REMOVE_PRODUCTS(cart));
          dispatch(actionReducerUI.SET_SUCCESS_MESSAGE({ message: "Remove successfully" }));
        } else {
          dispatch(actionReducerUI.SET_ERROR_MESSAGE(result));
        }
      } catch (error) {
        dispatch(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
      }
    } else {
      dispatch(actionReducerProducts.REMOVE_PRODUCTS(cart));
      setIsCallBack(true);
    }
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
                <a href="#">{cart.Maker.name}</a>
              </p>
              <div className="action">
                <span onClick={handleRemove}>Delete</span>
                <span>Take later</span>
              </div>
            </Grid>
            <Grid item className="price" lg={2} md={12} sm={12} xs={12}>
              <p className="price-discount">{numeral(cart.price).format("0,0")}đ</p>
              <div>
                <div className="real-price">{numeral(cart.priceSale).format("0,0")}đ</div>
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
                  value={quantity}
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
  cart: PropTypes.object.isRequired,
  cartInfo: PropTypes.object.isRequired
};
