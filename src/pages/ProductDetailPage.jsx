/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import { Grid, useMediaQuery } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";

import p1 from "../commons/assets/img/products/large/product-1.jpg";
import p2 from "../commons/assets/img/products/large/product-2.jpg";
import p3 from "../commons/assets/img/products/large/product-3.jpg";
import p4 from "../commons/assets/img/products/large/product-4.jpg";

export default function ProductDetailPage() {
  const isMobile = useMediaQuery("(max-width:504px)");

  const listImages = [p1, p2, p3, p4];
  const [carouselIndex, setCarouselIndex] = useState(0); // index (in listImages) of first image in carousel
  const [currentPreview, setCurrentPreview] = useState(p1);

  // return an images array base on carouselIndex
  const getCarouselImages = () => {
    return [...listImages.slice(carouselIndex), ...listImages.slice(0, carouselIndex)];
  };

  const pre = () => {
    let newIndex = carouselIndex - 1;
    if (newIndex < 0) newIndex = listImages.length - 1;
    setCarouselIndex(newIndex);
  };
  const next = () => {
    let newIndex = carouselIndex + 1;
    if (newIndex >= listImages.length) newIndex = 0;
    setCarouselIndex(newIndex);
  };

  const renderListImage = () => {
    return (
      <div className="carousel-container">
        <button type="button" className="btn-carousel left" onClick={pre}>
          &lsaquo;
        </button>
        {getCarouselImages().map(src => (
          <img
            key={src}
            className="img-preview-small"
            src={src}
            alt=""
            onClick={() => setCurrentPreview(src)}
          />
        ))}
        <button type="button" className="btn-carousel right" onClick={next}>
          &rsaquo;
        </button>
      </div>
    );
  };

  const listCategories = ["Fashion", "Electronics", "Toys", "Food", "Car"];

  return (
    <div className="w-90 product-detail-page">
      <Grid container>
        {/* product image preview */}
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="image-preview-container" style={isMobile ? {} : { marginRight: "40px" }}>
            <img className="img-preview-big" src={currentPreview} alt="" />
            {renderListImage()}
          </div>
        </Grid>
        {/* product detail */}
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="product-detail-content">
            <h2>Klager GSX 250 R</h2>
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
              <div className="btn-add-to-cart">Add To Cart</div>
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
    </div>
  );
}
