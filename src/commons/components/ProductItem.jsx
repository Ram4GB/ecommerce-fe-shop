/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";

import numeral from "numeral";
import productImg from "../assets/img/products/small/product-1.jpg";
import { urlMedia } from "../url";

export default function ProductItem({ lg, md, sm, xs, product }) {
  const [static1, setStatic] = useState([]);
  const [dynamic, setDynamic] = useState([]);

  useEffect(() => {
    const s = product.Attributes ? product.Attributes.filter(o => o.valueType === "static") : [];
    setStatic(s);
    const d = product.Attributes ? product.Attributes.filter(o => o.valueType === "dynamic") : [];
    setDynamic(d);
  }, [product.Attributes]);

  const renderStatic = array => {
    const a = [];
    if (array && array.length >= 2) {
      for (let i = 0; i < 2; i++) {
        a.push(
          <div key={i} className="intro">
            {`${array[i].Item_Attribute.value}`}
          </div>
        );
      }
    }
    return a;
  };

  const renderDynamic = array => {
    if (array && array.length >= 2) {
      return `${array[0].Item_Attribute.value} | ${array[1].Item_Attribute.value}`;
    }
    return "";
  };

  const renderVariations = () => {
    const array = [];
    const defaultWidth = 14;

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
    <Grid item lg={lg} md={md} sm={sm} xs={xs}>
      <div className="product-item">
        <div className="intro-list">
          <div className="intro">{product.year}</div>
          {renderStatic(static1)}
        </div>
        <img
          className="product-img"
          src={
            product.Imgs && product.Imgs.length >= 1
              ? `${urlMedia}/${product.Imgs[0].Media.url}`
              : productImg
          }
          alt="Bike"
        />
        <div className="product-content-wrapper">
          <div className="product-title-spreed">
            <p>{product.name}</p>
            <p>{renderDynamic(dynamic)}</p>
            <div>{renderVariations()}</div>
          </div>
          <div className="product-price">
            <span>{`$${numeral(product.price).format("0,0")}`}</span>
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

ProductItem.propTypes = {
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
  xs: PropTypes.number,
  product: PropTypes.object.isRequired
};

ProductItem.defaultProps = {
  lg: 4,
  md: 6,
  sm: 12,
  xs: 12
};
