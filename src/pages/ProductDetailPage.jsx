/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import _ from "lodash";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import { useSelector, useDispatch } from "react-redux";
import { MODULE_NAME as MODULE_PRODUCT } from "../modules/productDetail/models";
import * as actionsSagaProduct from "../modules/productDetail/actionsSaga";
import * as actionsReducerProduct from "../modules/productDetail/reducers";
import { urlImages } from "../commons/url";

export default function ProductDetailPage() {
  const listCategories = ["Fashion", "Electronics", "Toys", "Food", "Car"];

  const dispatch = useDispatch();
  const product = useSelector(state => state[MODULE_PRODUCT].product);
  const errors = useSelector(state => state[MODULE_PRODUCT].errors);

  const { name, Imgs, Variations, price, priceSale, rating, Attributes } = product;

  if (_.isEmpty(product)) {
    dispatch(actionsReducerProduct.SET_ERRORS(null));
    dispatch(actionsReducerProduct.SET_PRODUCT({}));
    dispatch(actionsSagaProduct.fetchProduct("bmw-unknownicar-2018-1"));
  }

  if (errors) return <div>ERROR, PRODUCT NOT FOUND</div>;

  return (
    <div className="w-90 product-detail-page">
      <Grid container spacing={4}>
        {/* product image preview */}
        <MyCarousel listImages={Imgs} />
        {/* product detail */}
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="product-detail-content">
            <h2>{name}</h2>
            <div className="quick-view-rating">
              <Rating name="read-only" value={Number(rating)} readOnly />
              <p>( 01 Customer Review )</p>
            </div>

            <div className="product-price">
              <span>{`$${priceSale}`}</span>
              <span className="un-hightlight">{`$${price}`}</span>
            </div>

            <div className="product-overview">
              <h5 className="sub-title">Product Overview</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius deleniti expedita
                commodi, exercitationem quas iusto ad omnis mollitia a enim placeat dolores sint
                animi. Voluptatibus maiores eveniet voluptate? Sunt, consectetur.
              </p>
            </div>

            <div className="product-color">
              <h5 className="sub-title">Product Color</h5>
              <ul>
                <li style={{ backgroundColor: "#ff4136" }}>a</li>
                <li style={{ backgroundColor: "#ff01f0" }}>a</li>
                <li style={{ backgroundColor: "#3649ff" }}>a</li>
                <li style={{ backgroundColor: "#00c0ff" }}>a</li>
                <li style={{ backgroundColor: "#00ffae" }}>a</li>
                <li style={{ backgroundColor: "#333333" }}>a</li>
              </ul>
            </div>

            <div className="product-action">
              <div className="cart-plus-minus">
                <div className="dec">-</div>
                <input type="text" defaultValue="2" />
                <div className="inc">+</div>
              </div>
              <button className="btn-add-to-cart">Add To Cart</button>
              <div className="btn-wish-list">
                <FavoriteIcon />
              </div>
            </div>

            <div className="product-categories">
              <h5 className="sub-title">Categories</h5>
              <ul>
                {listCategories.map(cat => (
                  <li key={cat}>
                    <a href={`#${cat}`}>{cat}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <p className="title">Detail</p>
          <MarkdownDetail />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} className="specifications">
          <p className="title">Specifications</p>
          <Specifications attributes={Attributes} />
        </Grid>
      </Grid>
    </div>
  );
}

function MyCarousel({ listImages = [] }) {
  const [index, setIndex] = useState(0);

  // sort theo placing
  const sorted = [...listImages].sort((imgObjA, imgObjB) => imgObjA.placing < imgObjB.placing);

  // get full url
  const getFullImageUrl = imgObj => {
    return imgObj ? `${urlImages}/${imgObj.Media.url}` : "";
  };

  // make slides
  const slides = sorted.map(imgObj => (
    <img
      key={imgObj.id}
      className={`img-preview ${imgObj.placing === index ? "hightlight" : ""}`}
      src={getFullImageUrl(imgObj)}
      alt=""
    />
  ));

  const onChange = i => {
    setIndex(i);
  };

  return (
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <div className="image-preview-container">
        <Carousel value={index} slides={slides} onChange={onChange} />
        <Carousel
          clickToChange
          arrows
          value={index}
          slides={slides}
          onChange={onChange}
          slidesPerPage={2.5}
          centered
        />
      </div>
    </Grid>
  );
}

Carousel.defaultProps = {
  listImages: []
};

function Specifications({ attributes = [] }) {
  return (
    <Grid item>
      {attributes.map(att => (
        <div key={att.id} className="row">
          <div className="column left">{att.name}</div>
          <div className="column right">{att.Item_Attribute.value}</div>
        </div>
      ))}
    </Grid>
  );
}

function MarkdownDetail() {
  return (
    <div style={{ width: "100%", backgroundColor: "#ededed", minHeight: "50%" }}>Markdown</div>
  );
}
