/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// matterials
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AddIcon from "@material-ui/icons/Add";

// carousel
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

// helpers
import { urlImages } from "../url";
import NumberDisplay from "./NumberFormatCurrency";
import { MODULE_NAME as MODULE_UI } from "../../modules/ui/models";
import { MODULE_NAME as MODULE_USER } from "../../modules/user/models";
import { MODULE_NAME as MODULE_PRODUCT } from "../../modules/products/models";
import * as actionsReducerUI from "../../modules/ui/reducers";
import * as actionsSagaProduct from "../../modules/products/actionsSaga";
import { userFavItem, deleteFavItem } from "../../modules/user/handlers";

export default function ProductItem({ product }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const account = useSelector(state => state[MODULE_USER].account);
  const cart = useSelector(state => state[MODULE_PRODUCT].cart);

  // variables
  const {
    Imgs,
    price,
    priceSale,
    name,
    Variations,
    AppliedPromotion,
    Maker,
    Type,
    Brand,
    Attributes,
    year,
    isFavorited
    // viewCount,
    // blog
  } = product;
  const scale = product.Scale.name;

  let promotionPrice = false;
  if (AppliedPromotion) {
    promotionPrice = `-${AppliedPromotion.offPercent}%`;
  }

  // states
  const [openDetail, setOpenDetail] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  // helpers
  const trans = key => t(`${MODULE_PRODUCT}.${key}`);
  const transUI = key => t(`${MODULE_UI}.${key}`);
  const toggleOpenDetail = () => {
    setOpenDetail(!openDetail);
  };

  // handlers
  const handleAddToCart = () => {
    // check quantity of product
    if (account)
      dispatch(
        actionsSagaProduct.addToCart({
          itemId: product.id,
          variationId: product.variationDefault,
          quantity: 1
        })
      );
    else {
      dispatch(
        actionsSagaProduct.addToCartLocal({
          itemId: product.id,
          variationId: product.variationDefault,
          quantity: 1,
          cart
        })
      );
    }
  };

  const handleFavItem = async () => {
    const result = await userFavItem(product.id);
    try {
      if (result.success) {
        dispatch(actionsReducerUI.SET_SUCCESS_MESSAGE({ message: transUI("snack.favSaved") }));
        setIsFavorite(true);
      } else {
        dispatch(actionsReducerUI.SET_ERROR_MESSAGE(result));
      }
    } catch (e) {
      dispatch(actionsReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
    }
  };

  const handleDeleteFavItem = async () => {
    const result = await deleteFavItem(product.id);
    try {
      if (result.success) {
        dispatch(actionsReducerUI.SET_SUCCESS_MESSAGE({ message: transUI("snack.favUnsaved") }));
        setIsFavorite(false);
      } else {
        dispatch(actionsReducerUI.SET_ERROR_MESSAGE(result));
      }
    } catch (e) {
      dispatch(actionsReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
    }
  };

  const handleFavClick = async () => {
    if (account) {
      if (isFavorite) {
        handleDeleteFavItem();
      } else {
        handleFavItem();
      }
    } else {
      dispatch(
        actionsReducerUI.SET_ERROR_MESSAGE({ message: "Bạn cần đăng nhập để lưu sản phẩm" })
      );
    }
  };

  // render helpers
  const renderColor = () =>
    Variations.map(({ colors }) => {
      if (colors.indexOf(",") >= 0) {
        return (
          <div key={colors} className="dot double">
            {colors.split(",").map(c => (
              <span key={c} style={{ backgroundColor: `#${c}` }} />
            ))}
          </div>
        );
      }
      return (
        <div key={colors} className="dot single">
          <span style={{ backgroundColor: `#${colors}` }} />
        </div>
      );
    });

  return (
    <div className="ps-product">
      {/* Favorite */}
      <button className="favorite" onClick={handleFavClick}>
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </button>
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
          <li>{Maker.name}</li>
        </ul>
      </div>

      {/* Detail */}
      <div className={openDetail ? "product-detail show" : "product-detail"}>
        <div className="header-detail shine" onClick={toggleOpenDetail}>
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
            <div className="color-detail-container">{renderColor()}</div>
          </div>
          {/* Type */}
          <div className="row-detail">
            <span className="bold">{`${trans("productItem.detail.type")}: `}</span>
            <span>{Type.name}</span>
          </div>
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
          {/* Attributes */}
          {Attributes.map(att => (
            <div key={att.name} className="row-detail">
              <span className="bold">{`${att.name}: `}</span>
              <span>{att.Item_Attribute.value}</span>
            </div>
          ))}
          {/* Blog
          <div className="row-detail">
            <span className="bold">{`${trans("productItem.detail.blog")}: `}</span>
            <span>{blog}</span>
          </div> */}
          {/* <Link to={`/product/${product.id}`} className="btn-grow">
            {trans("productItem.detail.detailPage")}
            <span />
            <span />
            <span />
            <span />
          </Link> */}
        </div>
      </div>

      {/* Description */}
      <div className="product-desc">
        <Link to={`/product/${product.id}`} className="title">
          <strong>{name}</strong>
        </Link>
        <div className="color-detail-container">{renderColor()}</div>
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
        {product.inventorySize ? (
          <button className="add-to-cart shine" onClick={handleAddToCart}>
            <AddIcon />
            {trans("productItem.addToCart")}
          </button>
        ) : (
          <button disabled className="add-to-cart out-of-stock">
            Hết hàng
          </button>
        )}
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
};
