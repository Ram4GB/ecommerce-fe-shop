/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

import numeral from "numeral";
import productImg from "../assets/img/products/small/product-3.jpg";
import { urlMedia } from "../url";

export default function ProductItemStyleList({ lg, md, sm, xs, product }) {
  return (
    <Grid item lg={lg} md={md} sm={sm} xs={xs}>
      <div className="product-item-style-list">
        <Grid container>
          <Grid className="img-cover" item lg={4} md={4} sm={4} xs={12}>
            <div className="top-intro">2018 - MANUAL - PETROL - 270 - CC</div>
            <img
              className="product-img"
              src={
                product.Imgs && product.Imgs.length > 1
                  ? `${urlMedia}/${product.Imgs[0].Media.url}`
                  : productImg
              }
              alt=""
            />
            <div className="bottom-intro">
              <div className="ti-heart" />
              <div className="ti-zoom-in" />
            </div>
          </Grid>
          <Grid className="infor-product" item lg={8} md={8} sm={8} xs={12}>
            <h3 className="name">{product.name}</h3>
            <Rating defaultValue={5} max={5} />
            <h3 className="pricing">{`$${numeral(product.price).format("0,0")}`}</h3>
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipic it, sed do eiusmod tempor incididunt ut
              labore et dolore mag aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo it. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <button type="button" className="add-to-cart">
              <span className="ti-shopping-cart" />
              <span>Add to cart</span>
            </button>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

ProductItemStyleList.propTypes = {
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
  xs: PropTypes.number,
  product: PropTypes.object.isRequired
};

ProductItemStyleList.defaultProps = {
  lg: 12,
  md: 12,
  sm: 12,
  xs: 12
};
