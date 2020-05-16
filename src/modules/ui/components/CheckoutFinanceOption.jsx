/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from "react";
import { Select, Grid, MenuItem, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useFormContext } from "react-hook-form";
import { SET_CURRENT_PAGE_CHECKOUT_PAGE, SET_VALUE_FORM_CHECKOUT } from "../reducers";
import { MODULE_NAME as MODULE_UI } from "../models";

export default function CheckoutFinanceOptions() {
  const [type, setType] = useState("loan");
  const dispatch = useDispatch();
  const { control, handleSubmit } = useFormContext();
  const values = useSelector(state => state[MODULE_UI].checkoutPage.values);

  const submitForm = valuesReacHook => {
    dispatch(SET_VALUE_FORM_CHECKOUT(valuesReacHook));
    dispatch(SET_CURRENT_PAGE_CHECKOUT_PAGE("#payment"));
  };

  const renderPrice = () => {
    switch (type) {
      case "cash":
        return (
          <div>
            <div className="title">Perchase price: </div>
            <p>9.500.000đ</p>
          </div>
        );
      case "loan":
        return (
          <div>
            <div className="title">Downpayment</div>
            <div className="form-control">
              <Controller
                name="downpayment"
                defaultValue=""
                control={control}
                as={
                  <Select variant="outlined" native>
                    <option value="">None</option>
                    <option value="1">OK</option>
                  </Select>
                }
              />
            </div>
            <div className="title">Term</div>
            <div className="form-control">
              <Controller
                name="term"
                defaultValue=""
                control={control}
                as={
                  <Select variant="outlined" native>
                    <option value="">None</option>
                    <option value="1">48 months</option>
                    <option value="1">60 months</option>
                    <option value="1">72 months</option>
                  </Select>
                }
              />
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
              <div className="info-item">
                <div className="title">Finance Amount</div>
                <div className="number">9.500.000đ</div>
              </div>
              <div className="info-item">
                <div className="title">Loan payment</div>
                <div className="number">9.500đ / month</div>
              </div>
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
