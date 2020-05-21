/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from "react";
import { Grid, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
import { SET_CURRENT_PAGE_CHECKOUT_PAGE, SET_VALUE_FORM_CHECKOUT } from "../reducers";
import * as actionsSagaProductDetail from "../../productDetail/actionsSaga";
import { MODULE_NAME as MODULE_PRODUCT_DETAIL } from "../../productDetail/models";
import { MODULE_NAME as MODULE_UI } from "../models";

export default function CheckoutCarViewInfomation() {
  const dispatch = useDispatch();
  const params = useParams();
  const product = useSelector(state => state[MODULE_PRODUCT_DETAIL].product);
  const checkoutPage = useSelector(state => state[MODULE_UI].checkoutPage);
  const history = useHistory();

  useEffect(() => {
    if (params.id) dispatch(actionsSagaProductDetail.fetchProductDetail(params.id));
    else history.push("/not-found");
  }, []);

  useEffect(() => {
    dispatch(
      SET_VALUE_FORM_CHECKOUT({
        variationId:
          product && product.Variations && product.Variations.length >= 1
            ? product.Variations[0].id
            : ""
      })
    );
  }, [product]);

  const setVariantation = id => {
    dispatch(SET_VALUE_FORM_CHECKOUT({ variationId: id }));
  };

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
                    onClick={() => setVariantation(v.id)}
                    className={`color ${
                      checkoutPage && v.id === checkoutPage.values.variationId ? "active" : ""
                    }`}
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
                  onClick={() => setVariantation(v.id)}
                  className={`color ${
                    checkoutPage && v.id === checkoutPage.values.variationId ? "active" : ""
                  }`}
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

  const renderSmallInfo = () => {
    if (product.Attributes) {
      if (product.Attributes.length >= 3) {
        const arr = [];
        for (let i = 0; i < 3; i++)
          arr.push(
            <div key={`atr-${i}`} className="info">
              <h3 className="number">{product.Attributes[i].Item_Attribute.value}</h3>
              <p className="desc">{product.Attributes[i].name}</p>
            </div>
          );
        return arr;
      }
      return "";
    }
  };

  console.log(product);

  if (!isEmpty(product)) {
    return (
      <div className="checkout-cart-view-information">
        <Grid container>
          <Grid className="car-img" sm={12} xs={12} item md={12} lg={8}>
            <div className="wrap-image">
              <img
                src="https://static-assets.tesla.com/configurator/compositor?&options=$W38B,$PPSW,$DV2W,$MT308,$IN3B2&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1&version=v0027d202005074910&version=v0027d202005074910"
                alt=""
              />
            </div>
            <div className="small-info">{renderSmallInfo()}</div>
          </Grid>
          <Grid className="variatation" item sm={12} xs={12} md={12} lg={4}>
            <p className="select-color">Select Color</p>
            <h3>Your Model 3</h3>
            <p>Estimated Delivery: 5-7 weeks</p>
            <h4>Overview</h4>
            <div className="info">
              <div>
                <span>Name</span>
                <span>{product.name}</span>
              </div>
              <div>
                <span>Type</span>
                <span>{product.Type.name}</span>
              </div>
              <div>
                <span>Manufacturer</span>
                <span>{product.Brand.name}</span>
              </div>
              <div>{renderVariations()}</div>
            </div>
            <button
              onClick={() => dispatch(SET_CURRENT_PAGE_CHECKOUT_PAGE("#finance-option"))}
              className="button-next"
              type="button"
              disabled={!(product && product.Variations.length >= 1)}
            >
              Next Step
            </button>
          </Grid>
        </Grid>
      </div>
    );
  }
  return null;
}
