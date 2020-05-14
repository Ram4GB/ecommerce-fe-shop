/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SET_SUCCESS_MESSAGE } from "../reducers";

export default function CheckoutPayment() {
  const { control, handleSubmit, errors } = useFormContext();
  const [isHiddenMoreDetail, setHiddenDetail] = useState(false);
  const dispatch = useDispatch();

  const submitForm = dataForm => {
    let values = "";
    Object.keys(dataForm).forEach(key => {
      values += `${key}: ${dataForm[key]} \n`;
    });
    dispatch(SET_SUCCESS_MESSAGE({ message: values }));
  };

  const submit = () => {
    handleSubmit(submitForm)();
  };

  return (
    <div className="checkout-payment">
      <Grid container>
        <Grid className="form" item sm={12} xs={12} md={12} lg={8}>
          <h2>Enter Account Details</h2>
          <Grid container>
            <Grid item sm={12} xs={12} md={12} lg={6}>
              <div className="form-control">
                <p className="label">First name</p>
                <Controller
                  control={control}
                  defaultValue=""
                  name="firstName"
                  rules={{
                    required: "Please enter credit first name"
                  }}
                  as={
                    <input
                      autoComplete="off"
                      placeholder="Please enter first name"
                      className="input-text"
                    />
                  }
                />
                {errors.firstName && <p className="error">{errors.firstName.message}</p>}
              </div>
            </Grid>
            <Grid item sm={12} xs={12} md={12} lg={6}>
              <div className="form-control">
                <p className="label">Last name</p>
                <Controller
                  control={control}
                  defaultValue=""
                  name="lastName"
                  rules={{
                    required: "Please enter credit last name"
                  }}
                  as={
                    <input
                      autoComplete="off"
                      placeholder="Please enter last name"
                      className="input-text"
                    />
                  }
                />
                {errors.lastName && <p className="error">{errors.lastName.message}</p>}
              </div>
            </Grid>
            <Grid item sm={12} xs={12} md={12} lg={6}>
              <div className="form-control">
                <p className="label">Email</p>
                <Controller
                  control={control}
                  defaultValue=""
                  name="email"
                  rules={{
                    required: "Please enter email"
                  }}
                  as={
                    <input
                      autoComplete="off"
                      placeholder="Please enter email"
                      className="input-text"
                    />
                  }
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
              </div>
            </Grid>
            <Grid item sm={12} xs={12} md={12} lg={6}>
              <div className="form-control">
                <p className="label">Phone number</p>
                <Controller
                  control={control}
                  defaultValue=""
                  name="phone"
                  as={
                    <input
                      autoComplete="off"
                      placeholder="Please enter phone number"
                      className="input-text"
                    />
                  }
                />
              </div>
            </Grid>
          </Grid>
          <p className="tip">
            By entering my account details above, I agree to be contacted about Tesla products,
            including through automated calls or texts. This is not a condition of purchase.
          </p>
          <hr />
          <h2>Payment</h2>
          <Grid container>
            <Grid item sm={12} xs={12} md={12} lg={12}>
              <div className="form-control">
                <p className="label">Name on Card</p>
                <Controller
                  control={control}
                  defaultValue=""
                  name="nameCard"
                  as={
                    <input
                      autoComplete="off"
                      placeholder="Please enter name on Card"
                      className="input-text"
                    />
                  }
                />
              </div>
            </Grid>
            <Grid item sm={12} xs={12} md={12} lg={8}>
              <div className="form-control">
                <p className="label">Credit Card Number</p>
                <Controller
                  control={control}
                  defaultValue=""
                  name="creditCard"
                  as={
                    <input
                      autoComplete="off"
                      placeholder="Please enter credit card number"
                      className="input-text"
                    />
                  }
                />
              </div>
            </Grid>
            <Grid item sm={12} xs={12} md={12} lg={4}>
              <div className="form-control">
                <p className="label">Expiration Date</p>
                <Controller
                  control={control}
                  defaultValue=""
                  name="phone"
                  as={
                    <input
                      autoComplete="off"
                      placeholder="Please enter phone number"
                      className="input-text"
                    />
                  }
                />
              </div>
            </Grid>
            <Grid item sm={12} xs={12} md={12} lg={6}>
              <div className="form-control">
                <p className="label">CVV</p>
                <Controller
                  control={control}
                  defaultValue=""
                  name="phone"
                  as={
                    <input
                      autoComplete="off"
                      placeholder="Please enter CVV"
                      className="input-text"
                    />
                  }
                />
              </div>
            </Grid>
            <Grid item sm={12} xs={12} md={12} lg={6}>
              <div className="form-control">
                <p className="label">Billing Zip Code</p>
                <Controller
                  control={control}
                  defaultValue=""
                  name="phone"
                  as={
                    <input
                      autoComplete="off"
                      placeholder="Please enter Billing Zip Code"
                      className="input-text"
                    />
                  }
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="summary" item sm={12} xs={12} md={12} lg={4}>
          <img
            alt=""
            src="https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PPSW,$DV2W,$MT308,$IN3B2&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1&version=v0027d202005074910"
          />
          <h3>Your Model 3</h3>
          <p>Estimated Delivery: 5-7 weeks</p>
          <h4>Summary</h4>
          <div className="info">
            <div>
              <span>Model 3 Standard Plus Rear-Wheel Drive</span>
              <span>$39,990</span>
            </div>
            <div>
              <span>Pearl White Paint</span>
              <span>Included</span>
            </div>
            <div>
              <span>18’’ Aero Wheels</span>
              <span>Included</span>
            </div>
            <div>
              <span>All Black Partial Premium Interior</span>
              <span>Included</span>
            </div>
            <div>
              <span>Autopilot</span>
              <span>Included</span>
            </div>
          </div>
          <div>
            <span className="ti-info-alt" />
            <span
              style={{
                marginLeft: 5,
                fontWeight: "bold",
                textTransform: "uppercase",
                cursor: "pointer"
              }}
              onClick={() => setHiddenDetail(!isHiddenMoreDetail)}
            >
              Show detail
            </span>
            <div className={`more-info ${isHiddenMoreDetail ? "" : "active"}`}>
              <div className="more-info-item">
                <span>Purchase Price</span>
                <span>$39,990</span>
              </div>
              <div className="more-info-item">
                <span>Purchase Price</span>
                <span>$39,990</span>
              </div>
              <div className="more-info-item">
                <span>Purchase Price</span>
                <span>$39,990</span>
              </div>
              <div className="more-info-item">
                <span>Purchase Price</span>
                <span>$39,990</span>
              </div>
              <div className="more-info-item">
                <span>Purchase Price</span>
                <span>$39,990</span>
              </div>
            </div>
          </div>

          <p className="small-tip">
            Your design can be modified after ordering, and you can return your car for a full
            refund within 7 days or 1,000 miles, whichever comes first. <a href="#"> Learn more</a>
          </p>

          <p className="small-tip">
            By placing this order, I agree to the Model 3 Order Agreement, Terms of Use, and{" "}
            <a href="#">Privacy Notice.</a>
          </p>

          <button onClick={submit} className="button-next" type="button">
            Finish Step
          </button>
        </Grid>
      </Grid>
    </div>
  );
}
