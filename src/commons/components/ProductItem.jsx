import React from "react";
import { Grid } from "@material-ui/core";

export default function ProductItem() {
  return (
    <Grid item lg={4} md={6} sm={12} xs={12}>
      <div className="product-item">
        <img
          className="product-img"
          src="http://preview.hasthemes.com/oswan/assets/img/product/product-3.jpg"
          alt=""
        />
        <div className="intro-list">
          <div className="intro">2018</div>
          <div className="intro">MANUAL</div>
          <div className="intro">PETROL</div>

          <div className="intro">200 CC</div>
        </div>
        <div className="product-content-wrapper">
          <div className="product-title-spreed">
            <h3>Klager GSX 250 R</h3>
            <p>5500 RPM</p>
          </div>
          <div className="product-price">
            <span>$2549</span>
          </div>
        </div>
        <div className="action-button-group">
          <span className="ti-shopping-cart" />
          <span className="ti-heart" />
          <span className="ti-zoom-in" />
        </div>
      </div>
    </Grid>
  );
}
