import React from "react";
import { Grid } from "@material-ui/core";

export default function CheckoutCarViewInfomation() {
  return (
    <div className="checkout-cart-view-information">
      <Grid style={{ height: "100%" }} container>
        <Grid className="car-img" item lg={8}>
          <div className="wrap-image">
            <img
              src="https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PPSW,$DV2W,$MT308,$IN3B2&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1&version=v0027d202005074910&version=v0027d202005074910"
              alt=""
            />
          </div>
          <div className="small-info">
            <div className="info">
              <h3 className="number">250mi</h3>
              <p>Range</p>
            </div>
            <div className="info">
              <h3 className="number">140mph</h3>
              <p>Top Speed</p>
            </div>
            <div className="info">
              <h3 className="number">5.3s</h3>
              <p>0-60 mph</p>
            </div>
          </div>
        </Grid>
        <Grid className="variatation" item lg={4}>
          <h3 className="select-color">Select Color</h3>
          <div className="group-color">
            <span className="color" />
            <span className="color" />
            <span className="color" />
            <span className="color" />
            <span className="color" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
