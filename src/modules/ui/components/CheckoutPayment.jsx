/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from "react";
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
  Button,
  useMediaQuery
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  CardElement,
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
import * as actionsReducerProducts from "../../products/reducers";
import { urlImages, url } from "../../../commons/url";
import { clearCart } from "../../products/handlers";
import CustomCollapse from "../../../commons/components/CollapseCustom";
import NumberFormatCurrency from "../../../commons/components/NumberFormatCurrency";

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
  const [isFinish, setIsFinish] = useState(false);
  const [methodPayment, setMethodPayment] = useState("cc"); // cc vs cod
  const matchMobile = useMediaQuery("(max-width: 768px)");

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Roboto Condensed", sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#888"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const renderMethodPayment = () => {
    const handleSetValue = value => {
      setMethodPayment(value);
    };
    return (
      <CustomCollapse
        handleSetValue={handleSetValue}
        defaultValue={methodPayment}
        items={[
          {
            id: 1,
            method: "cc",
            name: "Thanh toán trực tuyến (Thẻ tín dụng)",
            children: (
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <CardElement options={CARD_ELEMENT_OPTIONS} />
                </Grid>
              </Grid>
            )
          },
          {
            id: 2,
            method: "cod",
            name: "Thanh toán khi nhận hàng",
            children: ""
          }
        ]}
      />
    );
  };

  const submitForm = async () => {
    const obj = {};

    if (isCheckUpdateInfo) {
      // lay thong tin tai khoan
      obj.lastName = account.User.Info.lastName;
      obj.firstName = account.User.Info.firstName;
      obj.address = account.User.Info.address;
      obj.phone = account.User.Info.phone;
      obj.email = account.email;
    } else {
      // lay thong tin tu redux
      obj.lastName = values.lastName;
      obj.firstName = values.firstName;
      obj.address = values.address;
      obj.phone = values.phone;
      obj.email = account.email; // using default email
    }

    if (methodPayment === "cc") {
      try {
        const result = await fetchAuthLoading({
          url: `${url}/payment/start`,
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

        if (result.success === false) return dispatch(SET_ERROR_MESSAGE(result));

        const { client_secret, paymentIntentId } = result.data;

        const resultStripe = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: `${obj.lastName} ${obj.firstName}`,
              email: obj.email,
              phone: obj.phone
            }
          }
        });
        if (resultStripe.paymentIntent && resultStripe.paymentIntent.status === "succeeded") {
          dispatch(SET_SUCCESS_MESSAGE({ message: "Thanh toán thành công" }));

          const clear = await clearCart();

          try {
            if (clear.success === false)
              return dispatch(SET_ERROR_MESSAGE({ message: clear.message }));

            dispatch(actionsReducerProducts.CLEAR_CART());
            dispatch(actionsReducerUI.CLEAR_CHECKOUT_PAGE_INFO());
            setIsFinish(true);
          } catch (error) {
            console.log(error);
            return dispatch(SET_ERROR_MESSAGE({ message: "Server error" }));
          }
          // clear all data
        } else {
          const rollback = await fetchAuthLoading({
            url: `${url}/payment/terminate`,
            method: "DELETE",
            data: {
              paymentIntentId
            }
          });
          console.log(rollback);
          dispatch(SET_ERROR_MESSAGE({ message: resultStripe.error.message }));
        }
      } catch (error) {
        console.log(error);
        dispatch(SET_ERROR_MESSAGE({ message: "Server error" }));
      }
    } else if (methodPayment === "cod") {
      try {
        const result = await fetchAuthLoading({
          url: `${url}/orders`,
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

        if (result.success) {
          const clear = await clearCart();
          try {
            if (clear.success === false) return dispatch(SET_ERROR_MESSAGE(result));

            // clear data if it's success
            // clear all data
            dispatch(actionsReducerProducts.CLEAR_CART());
            dispatch(actionsReducerUI.CLEAR_CHECKOUT_PAGE_INFO());
            setIsFinish(true);
          } catch (error) {
            return dispatch(SET_ERROR_MESSAGE({ message: "Server error" }));
          }
        } else {
          dispatch(SET_ERROR_MESSAGE(result));
        }
      } catch (error) {
        console.log(error);
        dispatch(actionsReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
      }
    }

    return null;
  };

  useEffect(() => {
    if (isCheckUpdateInfo) {
      // using new account info

      // fetch cart
      if (account) {
        dispatch(actionsSagaProducts.syncCart(cart));
      } else {
        dispatch(actionsSagaProducts.fetchProductCartLocal(cart));
      }
    } else {
      // using info step 2
      if (_.isEmpty(values)) {
        dispatch(actionsReducerUI.SET_CURRENT_PAGE_CHECKOUT_PAGE("#car"));
      }

      // fetch cart
      if (account) {
        dispatch(actionsSagaProducts.syncCart(cart));
      } else {
        dispatch(actionsSagaProducts.fetchProductCartLocal(cart));
      }
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

  const calcTotalPrice = () => {
    if (!cartServerUser) return 0;
    let total = 0;
    cartServerUser.map(row => {
      total += row.CartInfo.quantity * row.Item.priceSale;
    });
    return total;
  };

  return (
    <div className="checkout-payment">
      {!isFinish ? (
        <Grid container>
          <Grid className="form" item sm={12} xs={12} md={12} lg={12}>
            <h2 style={{ margin: "20px 10px" }}>Chi tiết đơn hàng</h2>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {matchMobile ? null : <TableCell>Hình</TableCell>}
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell align="right">Đơn giá</TableCell>
                    <TableCell align="right">Màu</TableCell>
                    <TableCell align="right">Số lượng</TableCell>
                    <TableCell align="right">Tổng tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartServerUser.map(row => (
                    <TableRow key={row.id}>
                      {matchMobile ? null : (
                        <TableCell component="th" scope="row">
                          <img src={`${urlImages}/${row.Item.Imgs[0].Media.url}`} alt="img-cart" />
                        </TableCell>
                      )}
                      <TableCell component="th" scope="row">
                        {row.Item.name}
                      </TableCell>
                      <TableCell align="right">
                        <NumberFormatCurrency value={row.Item.priceSale} />
                      </TableCell>
                      <TableCell align="right">{renderVariations(row.CartInfo)}</TableCell>
                      <TableCell align="right">{row.CartInfo.quantity}</TableCell>
                      <TableCell align="right">
                        <NumberFormatCurrency value={row.Item.priceSale * row.CartInfo.quantity} />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>Tổng cộng</TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell>
                      <NumberFormatCurrency value={calcTotalPrice()} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <hr />
            <h2>Thanh toán</h2>
            {renderMethodPayment()}
            <hr />
            <Button variant="contained" color="primary" onClick={submitForm}>
              Đồng ý
            </Button>
          </Grid>
        </Grid>
      ) : (
        <div className="card">
          <lottie-player
            src="https://assets4.lottiefiles.com/packages/lf20_YgmbYK.json"
            background="transparent"
            speed="1"
            style={{ width: 300, height: 300, margin: "auto", display: "block" }}
            loop
            autoplay
          />
          <div style={{ textAlign: "center", margin: "30px 0px", fontSize: "1.2rem" }}>
            Đơn hàng của bạn đã được gửi và đang chờ xử lý
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => history.push("/")}
              variant="outlined"
              style={{ marginRight: 5 }}
              color="primary"
            >
              Về trang chủ
            </Button>
            <Button
              onClick={() => history.push("/user/view_orders")}
              variant="contained"
              color="primary"
            >
              Xem danh sách đơn hàng
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
