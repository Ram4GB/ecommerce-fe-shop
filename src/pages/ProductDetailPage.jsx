/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Grid, useMediaQuery } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import { useSelector, useDispatch } from "react-redux";
import { MODULE_NAME as MODULE_PRODUCT } from "../modules/product/models";
import * as actionsSagaProduct from "../modules/product/actionsSaga";
import * as actionsReducerProduct from "../modules/product/reducers";
import { urlImages } from "../commons/url";

export default function ProductDetailPage() {
  const listCategories = ["Fashion", "Electronics", "Toys", "Food", "Car"];

  const dispatch = useDispatch();
  const product = useSelector(state => state[MODULE_PRODUCT].product);
  const errors = useSelector(state => state[MODULE_PRODUCT].errors);

  const { name, Imgs, Variations } = product;

  const testFetchProduct = () => {
    dispatch(actionsReducerProduct.SET_ERRORS(null));
    dispatch(actionsReducerProduct.SET_PRODUCT({}));
    dispatch(actionsSagaProduct.fetchProduct("bmw-unknownicar-2018-1"));
  };

  if (errors) return <div>ERROR, PRODUCT NOT FOUND</div>;

  return (
    <div className="w-90 product-detail-page">
      <Grid container>
        {/* product image preview */}
        <MyCarousel listImages={Imgs} />
        {/* product detail */}
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="product-detail-content">
            <h2>{name}</h2>
            <div className="quick-view-rating">
              <Rating name="read-only" value={3.5} readOnly />
              <p>( 01 Customer Review )</p>
            </div>

            <div className="product-price">
              <span>$2549</span>
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
              <div className="btn-add-to-cart" onClick={testFetchProduct}>
                Add To Cart
              </div>
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
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <h1>Detail</h1>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <h1>Specifications</h1>
        </Grid>
      </Grid>
    </div>
  );
}

function MyCarousel({ listImages = [] }) {
  const isMobile = useMediaQuery("(max-width:504px)");
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
      <div className="image-preview-container" style={isMobile ? {} : { marginRight: "40px" }}>
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
