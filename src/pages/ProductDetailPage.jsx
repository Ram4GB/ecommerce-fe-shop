/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouteMatch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Emoji from "react-emoji-render";
import dayjs from "dayjs";

// matterials
import { Grid } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Tooltip from "@material-ui/core/Tooltip";
import FavoriteIcon from "@material-ui/icons/Favorite";

// Carousels
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

// Saga
import { MODULE_NAME as MODULE_PRODUCT_DETAIL } from "../modules/productDetail/models";
import { MODULE_NAME as MODULE_USER } from "../modules/user/models";
import { MODULE_NAME as MODULE_PRODUCT } from "../modules/products/models";
import { MODULE_NAME as MODULE_UI } from "../modules/ui/models";
import { userFavItem, deleteFavItem } from "../modules/user/handlers";
import * as actionsSagaProductDetail from "../modules/productDetail/actionsSaga";
import * as actionsSagaProduct from "../modules/products/actionsSaga";
import * as actionsReducerUI from "../modules/ui/reducers";

// Helpers
import ModalCustom from "../commons/components/ModalCustom";
import FormRatingUser from "../modules/user/components/FormRatingUser";
import NumberDisplay from "../commons/components/NumberFormatCurrency";
import { urlImages } from "../commons/url";

export default function ProductDetailPage() {
  const { t } = useTranslation();
  const routeMatch = useRouteMatch();
  const dispatch = useDispatch();

  const product = useSelector(state => state[MODULE_PRODUCT_DETAIL].product);
  const error = useSelector(state => state[MODULE_PRODUCT_DETAIL].error);
  const account = useSelector(state => state[MODULE_USER].account);
  const cart = useSelector(state => state[MODULE_PRODUCT].cart);
  const [variationDefault, setVariationDefault] = useState("");
  const [isFavorited, setIsFavorite] = useState(false);
  const [isToggleModalRating, setIsToggleModalRating] = useState(false);

  const productId = routeMatch.params.id;

  useEffect(() => {
    dispatch(actionsSagaProductDetail.fetchProductDetail(productId));
  }, []);

  useEffect(() => {
    setVariationDefault(product.variationDefault);
    setIsFavorite(product.isFavorited);
  }, [product]);

  if (error) return <Redirect to="/not-found" />;

  // helpers
  const trans = key => t(`${MODULE_PRODUCT_DETAIL}.${key}`);
  const transUI = key => t(`${MODULE_UI}.${key}`);

  // handlers
  const renderVariations = () => {
    return (
      <div className="color-container">
        {product.Variations &&
          product.Variations.map(v => {
            const listColors = v.colors.split(",");

            if (listColors.length === 1)
              return (
                <Tooltip title={v.name} arrow key={`color-${listColors[0]}-${product.id}`}>
                  <div
                    onClick={() => v.inventorySize > 0 && setVariationDefault(v.id)}
                    className={`color${
                      v.id === variationDefault ? " active" : ""
                    } ${v.inventorySize === 0 && "out-of-stock"}`}
                  >
                    <div className="out">
                      <span style={{ backgroundColor: `#${listColors[0]}` }} />
                    </div>
                    <div className="out bg">
                      <span style={{ backgroundColor: `#${listColors[0]}` }} />
                    </div>
                  </div>
                </Tooltip>
              );

            return (
              <Tooltip title={v.name} arrow key={`color-${listColors[0]}-${product.id}`}>
                <div
                  onClick={() => v.inventorySize > 0 && setVariationDefault(v.id)}
                  className={`color${
                    v.id === variationDefault ? " active" : ""
                  } ${v.inventorySize === 0 && "out-of-stock"}`}
                >
                  <div className="out">
                    {listColors.map(c => (
                      <span
                        key={`color-inside-${c}-${product.id}`}
                        className="half-width"
                        style={{ backgroundColor: `#${c}` }}
                      />
                    ))}
                  </div>
                  <div className="out bg">
                    {listColors.map(c => (
                      <span
                        key={`color-inside-${c}-${product.id}`}
                        className="half-width"
                        style={{ backgroundColor: `#${c}` }}
                      />
                    ))}
                  </div>
                </div>
              </Tooltip>
            );
          })}
      </div>
    );
  };

  const handleAddToCart = () => {
    // check quantity of product
    if (account)
      dispatch(
        actionsSagaProduct.addToCart({
          itemId: product.id,
          variationId: variationDefault,
          quantity: 1
        })
      );
    else {
      dispatch(
        actionsSagaProduct.addToCartLocal({
          itemId: product.id,
          variationId: variationDefault,
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

  return (
    <div className="w-90 product-detail-page">
      <Grid container spacing={4}>
        {/* product image preview */}
        <MyCarousel listImages={product.Imgs} />
        {/* product detail */}
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="product-detail-content">
            <div className="wrap">
              <h2 style={{ lineHeight: "1.4rem !important" }}>
                {`${product.name} ${product.year}`}
              </h2>
              <div className="quick-view-rating">
                <Rating name="read-only" value={Number(product.rating)} readOnly />
                <p>(01)</p>
              </div>

              <div className="product-price">
                <span>
                  <NumberDisplay value={product && product.priceSale ? product.priceSale : 0} />
                </span>
                {product.price !== product.priceSale && (
                  <div>
                    <strike className="price">
                      <NumberDisplay value={product && product.price ? product.price : 0} />
                    </strike>
                  </div>
                )}
              </div>

              <div className="product-overview">
                <h5 className="sub-title">
                  {t(`${MODULE_PRODUCT_DETAIL}.productDetail.overview`)}
                </h5>
                <p>
                  {`${t(`${MODULE_PRODUCT_DETAIL}.productDetail.type`)}: ${product.Type &&
                    product.Type.name}`}
                </p>
                <p>
                  {`${t(`${MODULE_PRODUCT_DETAIL}.productDetail.manufacturer`)}: ${product.Brand &&
                    product.Brand.name}`}
                </p>
              </div>

              <div className="product-overview">
                <h5 className="sub-title">
                  {t(`${MODULE_PRODUCT_DETAIL}.productDetail.specification`)}
                </h5>
                <Specifications attributes={product.Attributes} />
              </div>

              <div className="wrap-specification" />

              <div className="product-color">
                <h5 className="sub-title">{t(`${MODULE_PRODUCT_DETAIL}.productDetail.option`)}</h5>
                {renderVariations()}
              </div>

              <div className="product-action">
                <button onClick={handleAddToCart} type="button" className="btn-add-to-cart">
                  {t(`${MODULE_PRODUCT_DETAIL}.productDetail.addToCart`)}
                </button>
                <div
                  onClick={!isFavorited ? handleFavItem : handleDeleteFavItem}
                  className={`btn-wish-list ${isFavorited ? "active" : ""}`}
                >
                  <FavoriteIcon />
                </div>
              </div>
              {/* <div className="product-categories">
                <h5 className="sub-title">Categories</h5>
                <ul />
              </div> */}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={12}>
          <p className="title">{t(`${MODULE_PRODUCT_DETAIL}.productDetail.productDetail`)}</p>
          <MarkdownDetail content={product.blog} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <p className="title">{t(`${MODULE_PRODUCT_DETAIL}.productDetail.preview`)}</p>

          <div className="wrap-comment">
            <h2 className="rating">
              <span>{parseFloat(product.rating).toFixed(1)}</span>
              <span>/5</span>
            </h2>
            <div className="star-rating">
              <Rating value={product && product.rating ? product.rating : 1} readOnly />
            </div>
            {/* {account ? (
              <>
                <button
                  onClick={() => setIsToggleModalRating(true)}
                  type="button"
                  className="btn-submit-comment"
                >
                  {trans("addYourComment")}
                </button>
              </>
            ) : null} */}
          </div>

          <CommentsSection comments={product.Comments} />
        </Grid>
      </Grid>
      <ModalCustom open={isToggleModalRating} onClose={() => setIsToggleModalRating(false)}>
        <div className="content-fom">
          <FormRatingUser
            fetchData={() => dispatch(actionsSagaProductDetail.fetchProductDetail(productId))}
            itemId={product.id ? product.id : "0"}
            handleClose={() => setIsToggleModalRating(false)}
          />
        </div>
      </ModalCustom>
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
    <Grid item className="specifications">
      {attributes.map(att => (
        <div key={att.id} className="row">
          <div className="column left" title={att.description}>
            {att.name}
          </div>
          <div className="column right">{att.Item_Attribute.value}</div>
        </div>
      ))}
    </Grid>
  );
}

function MarkdownDetail({ content }) {
  return <div className="markdown-container">{content}</div>;
}

function CommentsSection({ comments }) {
  if (!comments) return <div>Nothing here</div>;

  return comments.map(c => (
    <div className="comment-container" key={c.id}>
      <div className="comment-user-avatar">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5wF0pX31mMIaXc_I7aFfuc05yn0m_1D8s4WrHqm7HCeJura5A&usqp=CAU"
          alt=""
        />
      </div>
      <div className="comment-body">
        <p className="comment-title">
          <div>
            <Rating name="read-only" value={Number(c.rating)} readOnly />
          </div>
          <b>{c.User.Account.username}</b>

          <small>{dayjs(c.createdAt).format("DD-MM-YYYY")}</small>
        </p>
        <p>
          <Emoji text={`${c.comment}`} />
        </p>
      </div>
      <div className="clearFloat" />
    </div>
  ));
}
