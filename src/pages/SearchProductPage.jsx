/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Grid, Slider, useMediaQuery } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../commons/components/ProductItem";
import { MODULE_NAME as MODULE_UI } from "../modules/ui/models";
import * as actionsReducerUI from "../modules/ui/reducers";
import ProductItemStyleList from "../commons/components/ProductItemStyleList";

export default function SearchProductPage() {
  const isMobile = useMediaQuery("(max-width:504px)");
  const listViewStyle = useSelector(state => state[MODULE_UI].searchPage.listViewStyle);
  const dispatch = useDispatch();

  const renderListSearch = () => {
    if (listViewStyle === "grid")
      return (
        <>
          <ProductItem sm={6} />
          <ProductItem sm={6} />
          <ProductItem sm={6} />
          <ProductItem sm={6} />
          <ProductItem sm={6} />
          <ProductItem sm={6} />
        </>
      );
    return (
      <>
        <ProductItemStyleList />
        <ProductItemStyleList />
        <ProductItemStyleList />
        <ProductItemStyleList />
        <ProductItemStyleList />
        <ProductItemStyleList />
      </>
    );
  };

  return (
    <div className="w-90 search-product-page">
      <Grid container>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <h3>SEARCH PRODUCTS</h3>

          <div className="form-search">
            <input
              className="search-input"
              placeholder="Search Products..."
              type="text"
              name=""
              id=""
            />
            <button className="btn-submit-search" type="button">
              <span className="ti-search" />
            </button>
          </div>

          <h3>BY CATEGORIES</h3>
          <ul className="list-category">
            <li>
              <a href="#">Clothing</a>
            </li>
            <li>
              <a href="#">Bags</a>
            </li>
            <li>
              <a href="#">Shoes</a>
            </li>
            <li>
              <a href="#">Jewelry</a>
            </li>
            <li>
              <a href="#">Accessories</a>
            </li>
          </ul>

          <h3>BY PRICE</h3>
          <div className="form-pricing">
            <Slider aria-labelledby="range-slider" valueLabelDisplay="auto" />
            <p>
              <span style={{ color: "#828282" }}>Price</span>
              <span>: $236 - $779</span>
            </p>
          </div>

          <button type="button" className="filter">
            Filter
          </button>

          <h3>BY COLOR</h3>
          <div className="group-color">
            <div style={{ backgroundColor: "red" }} className="color-item active" />
            <div style={{ backgroundColor: "yellow" }} className="color-item" />
            <div style={{ backgroundColor: "blue" }} className="color-item" />
            <div style={{ backgroundColor: "green" }} className="color-item" />
            <div style={{ backgroundColor: "green" }} className="color-item" />
          </div>
          <h3>PRODUCT TAGS</h3>
          <div className="group-tag">
            <span className="tag">Clothing</span>
            <span className="tag">Bags</span>
            <span className="tag">Shoes</span>
            <span className="tag">Jewelry</span>
            <span className="tag">Accessories</span>
          </div>
        </Grid>
        <Grid className="list-search-product" xs={12} sm={12} item md={10} lg={10}>
          <div className="filter-bar">
            <div className="left-side">
              <div
                onClick={() => dispatch(actionsReducerUI.CHANGE_LIST_VIEW_STYLE("grid"))}
                className={`ti-layout-grid2 ${listViewStyle === "grid" ? "active" : ""}`}
              />
              <div
                onClick={() => dispatch(actionsReducerUI.CHANGE_LIST_VIEW_STYLE("list"))}
                className={`ti-view-list ${listViewStyle === "list" ? "active" : ""}`}
              />
            </div>

            <div className="right-side">
              <select>
                <option value="">Default sorting</option>
                <option value="">Sort pricing</option>
                <option value="">Sort new</option>
              </select>
            </div>
          </div>
          <Grid container>{renderListSearch()}</Grid>
          <div className="pagination">
            <Pagination size={isMobile ? "small" : "large"} count={10} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
