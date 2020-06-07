/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// matterials
import FavoriteIcon from "@material-ui/icons/Favorite";

import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

// helpers
import { urlImages } from "../url";
import { MODULE_NAME as MODULE_PRODUCTS } from "../../modules/products/models";
import { MODULE_NAME as MODULE_USER } from "../../modules/user/models";
import NumberDisplay from "./NumberFormatCurrency";

export default function ProductItem({ product }) {
  const { t } = useTranslation();

  // variables
  const {
    Imgs,
    price,
    priceSale,
    viewCount,
    name,
    Variations,
    AppliedPromotion,
    Maker,
    Type,
    Brand,
    Attributes,
    blog,
    year
  } = product;
  const scale = product.Scale.name;

  let promotionPrice = false;
  if (AppliedPromotion) {
    promotionPrice = `-${AppliedPromotion.offPercent}%`;
    console.log(product);
  }

  // states
  const [openDetail, setOpenDetail] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  // helpers
  const trans = key => t(`${MODULE_PRODUCTS}.${key}`);
  const toggleOpenDetail = () => {
    setOpenDetail(!openDetail);
  };

  return (
    <div className="ps-product">
      {/* Favorite */}
      <div>
        <FavoriteIcon />
      </div>

      {/* Sale */}
      {promotionPrice ? <div className="sale">{promotionPrice}</div> : null}

      {/* Images */}
      <Carousel
        className="product-image-container"
        value={slideIndex}
        onChange={i => setSlideIndex(i)}
        autoPlay={Math.random() * 1500 + 3000}
        infinite
      >
        {Imgs.map(({ Media }) => (
          <img className="product-image" src={`${urlImages}/${Media.url}`} key={Media.id} alt="" />
        ))}
      </Carousel>

      {/* Overlay desc */}
      <div className="overlay-desc bottom">
        <ul>
          <li>{Type.name}</li>
          <li>{scale}</li>
          <li>{year}</li>
        </ul>
      </div>

      {/* Detail */}
      <div className={openDetail ? "product-detail show" : "product-detail"}>
        <div className="header-detail" onClick={toggleOpenDetail}>
          {trans("productItem.detail.header")}
        </div>
        <div className="detail">
          {/* Tỉ lệ */}
          <div className="row-detail">
            <span className="bold">{`${trans("productItem.detail.scale")}: `}</span>
            <div className="ratio-container">
              <span>{scale}</span>
            </div>
          </div>
          {/* Màu */}
          <div className="row-detail">
            <span className="bold">{`${trans("productItem.detail.color")}: `}</span>
            <div className="color-detail-container">
              {Variations.map(({ colors }) => {
                if (colors.indexOf(",") >= 0) {
                  return (
                    <div className="dot double">
                      {colors.split(",").map(c => (
                        <span style={{ backgroundColor: `#${c}` }} />
                      ))}
                    </div>
                  );
                }
                return (
                  <div className="dot single">
                    <span style={{ backgroundColor: `#${colors}` }} />
                  </div>
                );
              })}
            </div>
          </div>
          {/* Type */}
          <div className="row-detail">
            <span className="bold">{`${trans("productItem.detail.type")}: `}</span>
            <span>{Type.name}</span>
          </div>
          {/* Attributes */}
          {Attributes.map(att => (
            <div className="row-detail">
              <span className="bold">{`${att.name}: `}</span>
              <span>{att.Item_Attribute.value}</span>
            </div>
          ))}
          {/* Maker */}
          <div className="row-detail">
            <span className="bold">{`${trans("productItem.detail.maker")}: `}</span>
            <span>{Maker.name}</span>
          </div>
          {/* Brand */}
          <div className="row-detail">
            <span className="bold">{`${trans("productItem.detail.brand")}: `}</span>
            <span>{Brand.name}</span>
          </div>
          {/* Year */}
          <div className="row-detail">
            <span className="bold">{`${trans("productItem.detail.year")}: `}</span>
            <span>{year}</span>
          </div>
          {/* Blog */}
          <div className="row-detail">
            <span className="bold">{`${trans("productItem.detail.blog")}: `}</span>
            <span>{blog}</span>
          </div>
          <Link to={`/product/${product.id}`} className="btn-grow">
            {trans("productItem.detail.detailPage")}
            <span />
            <span />
            <span />
            <span />
          </Link>
        </div>
      </div>

      {/* Description */}
      <div className="product-desc">
        <span className="title">
          <strong>{name}</strong>
        </span>
        <div className="price">
          <strong>
            <NumberDisplay value={priceSale} />
          </strong>
          <br />
          {AppliedPromotion ? (
            <span>
              <NumberDisplay value={price} />
            </span>
          ) : null}
        </div>
        <button className="btn-grow add-to-cart">
          {trans("productItem.addToCart")}
          <span />
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
};
