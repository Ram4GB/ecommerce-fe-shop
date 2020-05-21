/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from "react";
import { Select, Grid, MenuItem, TextField, Input } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useFormContext } from "react-hook-form";
import { SET_CURRENT_PAGE_CHECKOUT_PAGE, SET_VALUE_FORM_CHECKOUT } from "../reducers";
import { MODULE_NAME as MODULE_UI } from "../models";

export default function CheckoutFinanceOptions() {
  const [type, setType] = useState("loan");
  const dispatch = useDispatch();
  const { control, handleSubmit, errors, getValues } = useFormContext();
  const [isShouldTypeDownpayment, setIsShouldTypeDownpayment] = useState(false);
  const checkoutPage = useSelector(state => state[MODULE_UI].checkoutPage);

  const submitForm = valuesReacHook => {
    if (isShouldTypeDownpayment === false) {
      dispatch(SET_VALUE_FORM_CHECKOUT(valuesReacHook));
      dispatch(SET_CURRENT_PAGE_CHECKOUT_PAGE("#payment"));
    }
  };

  console.log(isShouldTypeDownpayment);

  const renderPrice = () => {
    switch (type) {
      case "cash":
        return <div />;
      case "loan":
        return (
          <div>
            <div className="title">Downpayment</div>
            <div className="form-control">
              <Controller
                name="downPayment"
                defaultValue={
                  checkoutPage && checkoutPage.values.downPayment
                    ? checkoutPage.values.downPayment
                    : ""
                }
                onChange={([e]) => {
                  if (e.target.value !== "") setIsShouldTypeDownpayment(false);
                  return e.target.value;
                }}
                control={control}
                as={
                  <TextField
                    style={{ width: "100%" }}
                    variant="outlined"
                    placeholder="Downpayment"
                  />
                }
              />
              {isShouldTypeDownpayment && <p className="error">Please enter downpayment</p>}
            </div>
            <div className="title">Term</div>
            <div className="form-control">
              <Controller
                name="loanTerm"
                defaultValue={
                  checkoutPage && checkoutPage.values.loanTerm ? checkoutPage.values.loanTerm : ""
                }
                // rules={{
                //   required: "Please enter loan term"
                // }}
                onChange={([e]) => {
                  if (getValues("downPayment") !== "") setIsShouldTypeDownpayment(false);
                  else setIsShouldTypeDownpayment(true);
                  return e.target.value;
                }}
                control={control}
                as={
                  <Select variant="outlined" native>
                    <option value="">None</option>
                    <option value="48">48 months</option>
                    <option value="60">60 months</option>
                    <option value="72">72 months</option>
                  </Select>
                }
              />
              {errors.loanTerm && <p className="error">{errors.loanTerm.message}</p>}
            </div>
            <hr />
            <div className="title">APR</div>
            <TextField disabled style={{ width: "100%" }} value="2.99%" variant="outlined" />
          </div>
        );
      default:
        return "";
    }
  };

  return (
    <div className="checkout-finance-options">
      <div className="form-control">
        <Grid container>
          <Grid item className="price-container" lg={8}>
            <img
              src="https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PPSW,$DV2W,$MT308,$IN3B2&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1&version=v0027d202005074910&version=v0027d202005074910"
              alt=""
            />
            <div className="small-info">
              {type === "loan" ? (
                <>
                  <div className="info-item">
                    <div className="title">Finance Amount</div>
                    <div className="number">9.500.000đ</div>
                  </div>
                  <div className="info-item">
                    <div className="title">Loan payment</div>
                    <div className="number">9.500đ / month</div>
                  </div>
                </>
              ) : (
                <div className="info-item">
                  <div className="title">Purchase Price</div>
                  <div className="number">9.500.000đ</div>
                </div>
              )}
            </div>
          </Grid>
          <Grid item className="control-container" lg={4}>
            <div className="title">Final Options</div>
            <Select
              className="select"
              variant="outlined"
              defaultValue={type}
              onChange={e => setType(e.target.value)}
            >
              <MenuItem value="loan">Loan</MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
            </Select>
            {renderPrice()}
            <button onClick={handleSubmit(submitForm)} className="button-next" type="button">
              Next Step
            </button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
