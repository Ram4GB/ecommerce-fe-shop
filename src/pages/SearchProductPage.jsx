/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

// matterials
import { Grid, useMediaQuery, Select, InputLabel, FormControl, Slider } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

// helpers
import ProductItem from "../commons/components/ProductItem";
import limit from "../commons/limit";
import { convertObject } from "../commons/utils/convertObject";
import { removeKeyObjectNull } from "../commons/utils/removeKeyObjectNull";
import convertKeyArrayToString from "../commons/utils/convertKeyArrayToString";
import loadingAnimation from "../commons/assets/animations/loading2.json";

// Saga
import { MODULE_NAME as MODULE_UI } from "../modules/ui/models";
import { MODULE_NAME as MODULE_PRODUCT } from "../modules/products/models";
import * as actionsReducerUI from "../modules/ui/reducers";
import * as actionSagaProduct from "../modules/products/actionsSaga";

export default function SearchProductPage() {
  const isMobile = useMediaQuery("(max-width:504px)");
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // states
  const { control, handleSubmit, getValues } = useForm();
  const [values, setValues] = useState({ price: null, year: null }); // use for slider
  const [page, setPage] = useState(1);
  const [formChange, setFormChange] = useState(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);

  // selectors
  // const listViewStyle = useSelector(state => state[MODULE_UI].searchPage.listViewStyle);
  const isLoading = useSelector(state => state[MODULE_UI].isLoading);
  const attributes = useSelector(state => state[MODULE_PRODUCT].attributes);
  const scales = useSelector(state => state[MODULE_PRODUCT].scales);
  const productObject = useSelector(state => state[MODULE_PRODUCT].productObject);
  const types = useSelector(state => state[MODULE_PRODUCT].types);
  const makers = useSelector(state => state[MODULE_PRODUCT].makers);
  const brands = useSelector(state => state[MODULE_PRODUCT].brands);
  const filterValues = useSelector(state => state[MODULE_PRODUCT].filterValues);

  // helpers
  const trans = key => t(`${MODULE_PRODUCT}.${key}`);

  // handlers
  const submitForm = valuesReactHookForm => {
    // valuesReactHookForm from select
    // console.log(JSON.stringify({ values, valuesReactHookForm }, 2, 2));
    dispatch(actionsReducerUI.SET_LOADING(true));
    setPage(1);
    const newValueReactHookForm = { ...valuesReactHookForm };
    const cvt =
      newValueReactHookForm && newValueReactHookForm.attributes
        ? convertObject(newValueReactHookForm.attributes, "attributes.")
        : {};
    delete newValueReactHookForm.attributes;
    let newValue = { ...values };
    newValue = convertObject(newValue, "");
    let rm = removeKeyObjectNull(
      {
        ...cvt,
        ...newValue,
        ...newValueReactHookForm
      },
      attributes
    );
    rm = convertKeyArrayToString(rm);
    dispatch(actionSagaProduct.fetchProducts({ page: 1, size: limit, ...rm }));
  };

  // use Effects Saga
  useEffect(() => {
    dispatch(actionSagaProduct.fetchFilterValues());
    dispatch(actionSagaProduct.fetchAttribute());
    dispatch(actionSagaProduct.fetchProducts({ page: 1, size: limit }));
    dispatch(actionSagaProduct.fetchTypes());
    dispatch(actionSagaProduct.fetchMakers());
    dispatch(actionSagaProduct.fetchBrands());
    dispatch(actionSagaProduct.fetchScale());
  }, []);

  // Fetch Filter Value
  useEffect(() => {
    if (filterValues && filterValues.year && filterValues.price) {
      setValues({
        ...values,
        price: filterValues.price,
        year: filterValues.year
      });
    }
  }, [filterValues]);

  // Fetch attributes
  useEffect(() => {
    if (attributes) {
      const defaultAttributes = attributes;
      const object = {};
      for (let i = 0; i < defaultAttributes.length; i++) {
        if (defaultAttributes[i].valueType === "dynamic")
          object[`attributes.${defaultAttributes[i].id}`] = defaultAttributes[i].valueRanges;
      }
      setValues({ ...values, ...object });
    }
  }, [attributes]);

  // https://stackoverflow.com/questions/58572135/need-to-get-the-last-value-of-onchange-for-a-slider-react
  let timeout;
  const handleChangeSlider = name => value => {
    setValues({
      ...values,
      [name]: [value.min, value.max]
    });

    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      setFormChange(true);
    }, 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSubmit(submitForm)();
    }, 1000);
    setFormChange(false);
    return () => {
      clearTimeout(timer);
    };
  }, [formChange]);

  // console.log(values, getValues());

  const renderSideBar = () => {
    let reactNode = null;
    return (
      attributes &&
      attributes.map(attribute => {
        switch (attribute.valueType) {
          case "static":
            reactNode = (
              <div key={attribute.id} className="form-control">
                <Controller
                  defaultValue="none"
                  control={control}
                  name={`attributes.${attribute.id}`}
                  onChange={([e]) => {
                    setFormChange(true);
                    return e.target.value;
                  }}
                  as={
                    <FormControl style={{ width: "100%" }} size="small" variant="outlined">
                      <InputLabel id={`${attribute.id}-filled-label`}>{attribute.name}</InputLabel>
                      <Select
                        label={attribute.name}
                        native
                        labelId={`${attribute.id}-filled-label`}
                        placeholder={attribute.name}
                        style={{ width: "100%" }}
                      >
                        <option value="none">{trans("filterArea.all")}</option>
                        {attribute.usedValues.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  }
                />
              </div>
            );
            return reactNode;
          case "dynamic":
            reactNode = (
              <div key={attribute.id} className="form-control">
                <p className="label">{attribute.name}</p>
                <InputRange
                  allowSameValues
                  minValue={attribute.valueRanges[0] ? attribute.valueRanges[0] : 0}
                  maxValue={attribute.valueRanges[1] ? attribute.valueRanges[1] : 0}
                  value={{
                    min: values[`attributes.${attribute.id}`]
                      ? values[`attributes.${attribute.id}`][0]
                      : 0,
                    max: values[`attributes.${attribute.id}`]
                      ? values[`attributes.${attribute.id}`][1]
                      : 0
                  }}
                  // onChange={handleChangeSlider(`attributes.${attribute.id}`)}
                  onChange={handleChangeSlider(`attributes.${attribute.id}`)}
                />
              </div>
            );
            return reactNode;
          default:
            return reactNode;
        }
      })
    );
  };

  const renderListSearch = () => {
    if (!productObject) return "";
    return productObject.items.map(product => {
      return <ProductItem product={product} key={product.id} lg={4} />;
    });
  };

  const handleChangePage = (e, p) => {
    setPage(p);
    const valuesReactHookForm = getValues();
    const cvt =
      valuesReactHookForm && valuesReactHookForm.attributes
        ? convertObject(valuesReactHookForm.attributes, "attributes")
        : {};
    delete valuesReactHookForm.attributes;
    let rm = removeKeyObjectNull(
      {
        ...cvt,
        ...values,
        ...valuesReactHookForm
      },
      attributes
    );
    rm = convertKeyArrayToString(rm);
    dispatch(actionSagaProduct.fetchProducts({ page: p, size: limit, ...rm }));
  };

  console.log(values);

  return (
    <div className="w-90 search-product-page">
      <Grid container>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <h3>{trans("filterArea.title")}</h3>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="form-search">
              <Controller
                defaultValue=""
                name="query"
                control={control}
                onChange={([e]) => {
                  setFormChange(true);
                  return e.target.value;
                }}
                as={
                  <input
                    className="search-input"
                    placeholder={trans("filterArea.searchInput.placeHolder")}
                    type="text"
                  />
                }
              />
              <button
                onClick={handleSubmit(submitForm)}
                className="btn-submit-search"
                type="button"
              >
                <span className="ti-search" />
              </button>
            </div>
            <button
              type="button"
              className="collapse-button"
              onClick={() => setIsFilterCollapsed(!isFilterCollapsed)}
            >
              {trans("filterArea.filter")}
              {isFilterCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </button>
            <div
              className="collapse-area"
              style={
                isFilterCollapsed
                  ? { maxHeight: 0 }
                  : { maxHeight: "fit-content", overflow: "visible" }
              }
            >
              <div className="form-control">
                <Controller
                  defaultValue="none"
                  control={control}
                  name="scale"
                  onChange={([e]) => {
                    setFormChange(true);
                    return e.target.value;
                  }}
                  as={
                    <FormControl style={{ width: "100%" }} size="small" variant="outlined">
                      <InputLabel id="scale-filled-label">{trans("filterArea.scale")}</InputLabel>
                      <Select
                        label="Scale"
                        native
                        labelId="scale-filled-label"
                        placeholder="Scale"
                        style={{ width: "100%" }}
                      >
                        <option value="none">{trans("filterArea.all")}</option>
                        {scales &&
                          scales.map(type => {
                            return (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            );
                          })}
                      </Select>
                    </FormControl>
                  }
                />
              </div>
              <div className="form-control">
                <Controller
                  defaultValue="none"
                  control={control}
                  name="type"
                  onChange={([e]) => {
                    setFormChange(true);
                    return e.target.value;
                  }}
                  as={
                    <FormControl style={{ width: "100%" }} size="small" variant="outlined">
                      <InputLabel id="type-filled-label">{trans("filterArea.type")}</InputLabel>
                      <Select
                        label="Type"
                        native
                        labelId="type-filled-label"
                        placeholder="Type"
                        style={{ width: "100%" }}
                      >
                        <option value="none">{trans("filterArea.all")}</option>
                        {types &&
                          types.map(type => {
                            return (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            );
                          })}
                      </Select>
                    </FormControl>
                  }
                />
              </div>
              <div className="form-control">
                <Controller
                  defaultValue="none"
                  control={control}
                  name="maker"
                  onChange={([e]) => {
                    setFormChange(true);
                    return e.target.value;
                  }}
                  as={
                    <FormControl style={{ width: "100%" }} size="small" variant="outlined">
                      <InputLabel id="manufacture-filled-label">
                        {trans("filterArea.manufacturer")}
                      </InputLabel>
                      <Select
                        label="Manufacture"
                        native
                        labelId="manufacture-filled-label"
                        placeholder="Manufacture"
                        style={{ width: "100%" }}
                      >
                        <option value="none">{trans("filterArea.all")}</option>
                        {makers &&
                          makers.map(item => {
                            return (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                      </Select>
                    </FormControl>
                  }
                />
              </div>
              <div className="form-control">
                <Controller
                  defaultValue="none"
                  control={control}
                  name="brand"
                  onChange={([e]) => {
                    setFormChange(true);
                    return e.target.value;
                  }}
                  as={
                    <FormControl style={{ width: "100%" }} size="small" variant="outlined">
                      <InputLabel id="brand-filled-label">{trans("filterArea.brand")}</InputLabel>
                      <Select
                        label="Brand"
                        native
                        labelId="brand-filled-label"
                        placeholder="Manufacturer"
                        style={{ width: "100%" }}
                      >
                        <option value="none">{trans("filterArea.all")}</option>
                        {brands &&
                          brands.map(type => {
                            return (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            );
                          })}
                      </Select>
                    </FormControl>
                  }
                />
              </div>
              <div className="form-control">
                <Controller
                  defaultValue="none"
                  control={control}
                  name="variationName"
                  onChange={([e]) => {
                    setFormChange(true);
                    return e.target.value;
                  }}
                  as={
                    <FormControl style={{ width: "100%" }} size="small" variant="outlined">
                      <InputLabel id="variation-filled-label">
                        {trans("filterArea.variation")}
                      </InputLabel>
                      <Select
                        label="Variations"
                        native
                        labelId="variation-filled-label"
                        placeholder="Variations"
                        style={{ width: "100%" }}
                      >
                        <option value="none">{trans("filterArea.all")}</option>
                        {filterValues &&
                          filterValues.variations.map(variation => {
                            return (
                              <option key={variation} value={variation}>
                                {variation}
                              </option>
                            );
                          })}
                      </Select>
                    </FormControl>
                  }
                />
              </div>
              <div className="form-control">
                <p className="label">{trans("filterArea.year")}</p>
                {values && values.year ? (
                  <InputRange
                    allowSameValues
                    minValue={filterValues && filterValues.year[0] ? filterValues.year[0] : 0}
                    maxValue={filterValues && filterValues.year[1] ? filterValues.year[1] : 1}
                    value={{
                      min: values.year ? values.year[0] : 0,
                      max: values.year ? values.year[1] : 1
                    }}
                    onChange={handleChangeSlider("year")}
                  />
                ) : null}
              </div>
              <div className="form-control">
                <p className="label">{trans("filterArea.priceRange")}</p>
                {values && values.price ? (
                  <InputRange
                    allowSameValues
                    minValue={filterValues ? filterValues.price[0] : 0}
                    maxValue={filterValues ? filterValues.price[1] : 1}
                    value={{
                      min: values.price ? values.price[0] : 0,
                      max: values.price ? values.price[1] : 0
                    }}
                    onChange={handleChangeSlider("price")}
                  />
                ) : null}
              </div>

              <hr
                style={{ margin: "2rem 0rem", border: "3px dotted #2f80ed", borderBottom: "none" }}
              />
              {renderSideBar()}
            </div>
            {/* <button
              onClick={handleSubmit(submitForm)}
              style={{ width: "100%" }}
              className="btn-submit-search"
              type="button"
            >
              <span className="ti-search" />
            </button> */}
          </form>
        </Grid>
        <Grid className="list-search-product" xs={12} sm={12} item md={10} lg={10}>
          {/* <div className="filter-bar">
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
                <option value="">All sorting</option>
                <option value="">Sort pricing</option>
                <option value="">Sort new</option>
              </select>
            </div>
          </div> */}
          <Grid container>
            {isLoading ? (
              <lottie-player
                src={JSON.stringify(loadingAnimation)}
                background="transparent"
                speed="1"
                loop
                autoplay
                style={{ width: 300, height: 300, margin: "auto", display: "block" }}
              />
            ) : (
              renderListSearch()
            )}
          </Grid>
          <div className="pagination">
            <Pagination
              count={productObject ? productObject.pagination.pageCount : 0}
              onChange={handleChangePage}
              page={page}
              size={isMobile ? "small" : "large"}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
