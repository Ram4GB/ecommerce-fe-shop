/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect } from "react";
import {
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper,
  Tooltip,
  Button
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import numeral from "numeral";
import _ from "lodash";
import { SET_SUCCESS_MESSAGE, SET_ERROR_MESSAGE } from "../reducers";
import { MODULE_NAME as MODULE_UI } from "../models";
import { MODULE_NAME as MODULE_USER } from "../../user/models";
import { MODULE_NAME as MODULE_PRODUCTS } from "../../products/models";
import { fetchAuthLoading } from "../../../commons/utils/fetch";
import * as actionsSagaProducts from "../../products/actionsSaga";
import * as actionsReducerUI from "../reducers";
import { urlImages } from "../../../commons/url";

export default function CheckoutPayment() {
  const dispatch = useDispatch();
  const values = useSelector(state => state[MODULE_UI].checkoutPage.values);
  const isCheckUpdateInfo = useSelector(state => state[MODULE_UI].checkoutPage.isCheckUpdateInfo);
  const account = useSelector(state => state[MODULE_USER].account);
  const cartServerUser = useSelector(state => state[MODULE_PRODUCTS].cartServerUser);
  const cart = useSelector(state => state[MODULE_PRODUCTS].cart);
  const elements = useElements();
  const stripe = useStripe();
  const history = useHistory();

  const submitForm = async () => {
    const obj = {};

    if (isCheckUpdateInfo) {
      // lay thong tin tai khoan
      obj.lastName = account.User.Info.lastName;
      obj.firstName = account.User.Info.firstName;
      obj.address = account.User.Info.address;
      obj.phone = account.User.Info.phone;
      obj.email = account.User.Info.email;
    } else {
      // lay thong tin tu redux
      obj.lastName = values.lastName;
      obj.firstName = values.firstName;
      obj.address = values.address;
      obj.phone = values.phone;
      obj.email = values.email;
    }

    try {
      const result = await fetchAuthLoading({
        url: "http://localhost:5000/api-shop/payment/start",
        method: "POST",
        data: {
          billingDetails: {
            lastName: obj.lastName,
            firstName: obj.firstName,
            email: obj.email,
            phone: obj.phone,
            address: obj.address
          },
          cart
        }
      });

      if (result.success === false) return dispatch(SET_ERROR_MESSAGE({ message: result.message }));

      const { client_secret } = result.data;

      const resultStripe = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: `${obj.lastName} ${obj.firstName}`,
            email: obj.email,
            phone: obj.phone
          }
        }
      });
      if (resultStripe.paymentIntent) {
        dispatch(SET_SUCCESS_MESSAGE({ message: "Thanh toán thành công" }));
        setTimeout(() => {
          history.push("/user/view_orders");
        }, 1000);
      } else {
        dispatch(SET_ERROR_MESSAGE({ message: resultStripe.error.message }));
      }
    } catch (error) {
      dispatch(SET_ERROR_MESSAGE({ message: "Server error" }));
    }
  };

  useEffect(() => {
    if (!_.isEmpty(values)) {
      if (account) {
        dispatch(actionsSagaProducts.syncCart(cart));
      } else {
        dispatch(actionsSagaProducts.fetchProductCartLocal(cart));
      }
    } else {
      dispatch(actionsReducerUI.SET_CURRENT_PAGE_CHECKOUT_PAGE("#car"));
    }
  }, []);

  const renderVariations = item => {
    const v = item.Variation;
    const listColors = v.colors.split(",");

    let colorInside = null;

    if (listColors.length === 1)
      colorInside = (
        <Tooltip title={v.name} arrow key={`color-${listColors[0]}-${item.id}`}>
          <div className="color">
            <div className="out">
              <span style={{ backgroundColor: `#${listColors[0]}` }} />
            </div>
            <div className="out bg">
              <span style={{ backgroundColor: `#${listColors[0]}` }} />
            </div>
          </div>
        </Tooltip>
      );
    else
      colorInside = (
        <Tooltip title={v.name} arrow key={`color-${listColors[0]}-${item.id}`}>
          <div className="color">
            <div className="out">
              {listColors.map(c => (
                <span
                  key={`color-inside-${c}-${item.id}`}
                  className="half-width"
                  style={{ backgroundColor: `#${c}` }}
                />
              ))}
            </div>
            <div className="out bg">
              {listColors.map(c => (
                <span
                  key={`color-inside-${c}-${item.id}`}
                  className="half-width"
                  style={{ backgroundColor: `#${c}` }}
                />
              ))}
            </div>
          </div>
        </Tooltip>
      );

    return (
      <div style={{ justifyContent: "flex-end" }} className="color-container">
        {colorInside}
      </div>
    );
  };

  return (
    <div className="checkout-payment">
      <Grid container>
        <Grid className="form" item sm={12} xs={12} md={12} lg={12}>
          <h2>Cart Detail</h2>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Product name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Price sale</TableCell>
                  <TableCell align="right">Color</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartServerUser.map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <img src={`${urlImages}/${row.Item.Imgs[0].Media.url}`} alt="img-cart" />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.Item.name}
                    </TableCell>
                    <TableCell align="right">{numeral(row.Item.price).format("0,0")}</TableCell>
                    <TableCell align="right">{numeral(row.Item.priceSale).format("0,0")}</TableCell>
                    <TableCell align="right">{renderVariations(row.CartInfo)}</TableCell>
                    <TableCell align="right">{row.CartInfo.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <hr />
          <h2>Payment</h2>
          <Grid container>
            <Grid item sm={12} xs={12} md={12} lg={8}>
              <div className="form-control">
                <p className="label">Credit Card Number</p>
                <CardNumberElement className="123" />
              </div>
            </Grid>
            <Grid item sm={12} xs={12} md={12} lg={4}>
              <div className="form-control">
                <p className="label">Expiration Date</p>
                <CardExpiryElement />
              </div>
            </Grid>
            <Grid item sm={12} xs={12} md={12} lg={12}>
              <div className="form-control">
                <p className="label">CVV</p>
                <CardCvcElement />
              </div>
            </Grid>
          </Grid>
          <hr />
          <Button variant="contained" color="primary" onClick={submitForm}>
            Submit Form
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
