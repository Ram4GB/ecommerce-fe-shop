/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { urlImages } from "../../../commons/url";
import * as actionsSagaProducts from "../../products/actionsSaga";
import * as actionReducerProducts from "../../products/reducers";
import * as actionReducerUI from "../reducers";
import { MODULE_NAME as MODULE_USER } from "../../user/models";
import { MODULE_NAME as MODULE_PRODUCT } from "../../products/models";
import { updateQuantity, updateQuantityLocal, removeProductCart } from "../../products/handlers";
import NumberDisplay from "../../../commons/components/NumberFormatCurrency";

export default function CartViewItem({ cartItem }) {
  const account = useSelector(state => state[MODULE_USER].account);
  const cartLocal = useSelector(state => state[MODULE_PRODUCT].cart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [isShouldUpdateQuantity, setIsShouldUpdateQuantity] = useState(false);

  const handleIncrement = () => {
    if (account) {
      dispatch(
        actionsSagaProducts.addToCart({
          itemId: cartItem.CartInfo.itemId,
          variationId: cartItem.CartInfo.variationId,
          quantity: 1
        })
      );
    } else {
      dispatch(
        actionsSagaProducts.addToCartLocal({
          itemId: cartItem.CartInfo.itemId,
          variationId: cartItem.CartInfo.variationId,
          quantity: 1,
          cart: cartLocal
        })
      );
    }
  };

  const handleDecrement = () => {
    const newAmount = cartItem.CartInfo.quantity - 1;
    if (newAmount <= 0) {
      // Không cần thông báo
      // dispatch(actionReducerUI.SET_ERROR_MESSAGE({ message: "You cannot decrease" }));
    } else if (!account) {
      dispatch(
        actionsSagaProducts.removeProductLocal({
          itemId: cartItem.CartInfo.itemId,
          variationId: cartItem.CartInfo.variationId,
          quantity: 1
        })
      );
    } else {
      dispatch(
        actionsSagaProducts.removeProductLocal({
          itemId: cartItem.CartInfo.itemId,
          variationId: cartItem.CartInfo.variationId,
          quantity: 1
        })
      );
      dispatch(
        actionsSagaProducts.removeProduct({
          itemId: cartItem.CartInfo.itemId,
          variationId: cartItem.CartInfo.variationId
        })
      );
    }
  };

  // update quantity local for this item cart
  useEffect(() => {
    setQuantity(cartItem.CartInfo.quantity);
  }, [cartItem]);

  const handleChangeInput = async e => {
    const { value } = e.target;
    setQuantity(value);
  };

  const handleCallAPIAfterChangeInput = () => {
    setIsShouldUpdateQuantity(true);
  };

  useEffect(() => {
    async function fetch() {
      if (account) {
        const result = await updateQuantity({
          itemId: cartItem.CartInfo.itemId,
          variationId: cartItem.CartInfo.variationId,
          quantity
        });
        try {
          if (result.success) {
            dispatch(actionReducerProducts.UPDATE_PRODUCT_TO_CART_VIEW(result.data.cartDetails));
          } else {
            // fall back
            dispatch(actionReducerUI.SET_ERROR_MESSAGE(result));
            setQuantity(1);
          }
        } catch (error) {
          dispatch(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
          setQuantity(1);
        }
      } else {
        try {
          const result = await updateQuantityLocal({
            itemId: cartItem.CartInfo.itemId,
            variationId: cartItem.CartInfo.variationId,
            quantity,
            cart: cartLocal
          });
          if (result.success) {
            dispatch(actionReducerProducts.UPDATE_PRODUCT_TO_CART_VIEW(result.data.cartDetails));
          } else {
            // fall back
            dispatch(actionReducerUI.SET_ERROR_MESSAGE(result));
            setQuantity(1);
          }
        } catch (error) {
          dispatch(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
          setQuantity(1);
        }
      }
    }
    if (isShouldUpdateQuantity) {
      fetch();
      setIsShouldUpdateQuantity(false);
    }
  }, [quantity, isShouldUpdateQuantity]);

  const handleRemove = async () => {
    if (account) {
      try {
        const result = await removeProductCart({
          itemId: cartItem.CartInfo.itemId,
          variationId: cartItem.CartInfo.variationId
        });
        if (result.success) {
          dispatch(
            actionReducerProducts.REMOVE_PRODUCTS({
              itemId: cartItem.CartInfo.itemId,
              variationId: cartItem.CartInfo.variationId,
              quantity
            })
          );
          dispatch(actionReducerUI.SET_SUCCESS_MESSAGE({ message: "Remove successfully" }));
        } else {
          dispatch(actionReducerUI.SET_ERROR_MESSAGE(result));
        }
      } catch (error) {
        dispatch(actionReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
      }
    } else {
      dispatch(
        actionReducerProducts.REMOVE_PRODUCTS({
          itemId: cartItem.CartInfo.itemId,
          variationId: cartItem.CartInfo.variationId,
          quantity
        })
      );
    }
  };

  return (
    <div className="cart-view-item">
      <Grid container>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <img
            src={
              cartItem.Item.Imgs && cartItem.Item.Imgs.length > 0
                ? `${urlImages}/${cartItem.Item.Imgs[0].Media.url}`
                : "https://salt.tikicdn.com/cache/175x175/ts/product/3b/69/45/f07562208e36e779b8b2dca7bc625cd1.jpg"
            }
            alt=""
            className="img-cart-view"
          />
        </Grid>
        <Grid item lg={10} md={10}>
          <Grid container>
            <Grid item className="information-item-cart-view" lg={8} md={12} sm={12} xs={12}>
              <h3>
                <Link to="/">{`${cartItem.Item.name} ${cartItem.CartInfo.Variation.name}`}</Link>
              </h3>
              <p>
                <span>Nhà sản xuất </span>
                <a href="#">{cartItem.Item.Maker.name}</a>
              </p>
              <div className="action">
                <span className="delete" onClick={handleRemove}>
                  Xoá
                </span>
                {/* <span>Take later</span> */}
              </div>
            </Grid>
            <Grid item className="price" lg={2} md={12} sm={12} xs={12}>
              <p className="price-discount">
                {cartItem ? (
                  cartItem.Item.priceSale !== cartItem.Item.price ? (
                    <strike>
                      <NumberDisplay value={cartItem.Item.price} />
                    </strike>
                  ) : null
                ) : null}
              </p>
              <div>
                <div className="real-price">
                  <NumberDisplay value={cartItem.Item.priceSale} />
                </div>
              </div>
            </Grid>
            <Grid item lg={2} md={12} sm={12} xs={12}>
              <div className="actions-input">
                <button onClick={handleDecrement} className="button-decrement" type="button">
                  <span className="ti-minus" />
                </button>
                <input
                  onChange={handleChangeInput}
                  onBlur={handleCallAPIAfterChangeInput}
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
  cartItem: PropTypes.object.isRequired
};
