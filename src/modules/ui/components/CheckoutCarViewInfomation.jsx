/* eslint-disable react/no-array-index-key */
import React from "react";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { SET_CURRENT_PAGE_CHECKOUT_PAGE } from "../reducers";

const product = {
  Variations: [{ colors: "00005c,6a097d" }, { colors: "c060a1,ffdcb4" }]
};

export default function CheckoutCarViewInfomation() {
  const dispatch = useDispatch();

  const renderVariations = () => {
    const array = [];
    const defaultWidth = 50;

    if (product && product.Variations) {
      product.Variations.forEach((item, index2) => {
        const colors = item.colors.split(",");
        const temp = [];
        colors.forEach((color, index) => {
          temp.push(
            <span
              key={`color-${index}`}
              style={{
                backgroundColor: `#${color}`,
                width: `${defaultWidth / colors.length}px`,
                height: defaultWidth
              }}
              className="color-dot"
            />
          );
        });
        array.push(
          <span
            key={`color-group-${index2}`}
            style={{ width: defaultWidth, height: defaultWidth }}
            className="color-dot-group"
          >
            {temp}
          </span>
        );
      });
      return array;
    }
    return "";
  };

  return (
    <div className="checkout-cart-view-information">
      <Grid container>
        <Grid className="car-img" sm={12} xs={12} item md={12} lg={8}>
          <div className="wrap-image">
            <img
              src="https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PPSW,$DV2W,$MT308,$IN3B2&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1&version=v0027d202005074910&version=v0027d202005074910"
              alt=""
            />
          </div>
          <div className="small-info">
            <div className="info">
              <h3 className="number">250mi</h3>
              <p className="desc">Range</p>
            </div>
            <div className="info">
              <h3 className="number">140mph</h3>
              <p className="desc">Top Speed</p>
            </div>
            <div className="info">
              <h3 className="number">5.3s</h3>
              <p className="desc">0-60 mph</p>
            </div>
          </div>
        </Grid>
        <Grid className="variatation" item sm={12} xs={12} md={12} lg={4}>
          <p className="select-color">Select Color</p>
          <div>{renderVariations()}</div>
          <h3>Your Model 3</h3>
          <p>Estimated Delivery: 5-7 weeks</p>
          <h4>Overview</h4>
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
          <button
            onClick={() => dispatch(SET_CURRENT_PAGE_CHECKOUT_PAGE("#finance-option"))}
            className="button-next"
            type="button"
          >
            Next Step
          </button>
        </Grid>
      </Grid>
    </div>
  );
}
