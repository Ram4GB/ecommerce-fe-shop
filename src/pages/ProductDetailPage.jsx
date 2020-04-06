import React from "react";
import { Grid, useMediaQuery } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function ProductDetailPage() {
  const isMobile = useMediaQuery("(max-width:504px)");

  const listImages = [
    "http://preview.hasthemes.com/oswan/assets/img/product-details/bl1.jpg",
    "http://preview.hasthemes.com/oswan/assets/img/product-details/bl2.jpg",
    "http://preview.hasthemes.com/oswan/assets/img/product-details/bl4.jpg",
    "http://preview.hasthemes.com/oswan/assets/img/product-details/bl3.jpg"
  ];
  const renderListImage = () => {
    return (
      <div>
        {listImages.map(src => (
          <img key={src} className="img-preview-small" src={src} alt="" />
        ))}
      </div>
    );
  };

  const listCategories = ["Fashion", "Electronics", "Toys", "Food", "Jewellery"];

  return (
    <div className="w-90 product-detail-page">
      <Grid container>
        {/* product image preview */}
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="image-preview-container" style={isMobile ? {} : { marginRight: "40px" }}>
            <img
              className="img-preview-big"
              src="http://preview.hasthemes.com/oswan/assets/img/product-details/bl1.jpg"
              alt=""
            />
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
