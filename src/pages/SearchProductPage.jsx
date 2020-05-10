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
import { Grid, Slider, useMediaQuery, Select, InputLabel, FormControl } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import ProductItem from "../commons/components/ProductItem";
import { MODULE_NAME as MODULE_UI } from "../modules/ui/models";
import { MODULE_NAME as MODULE_PRODUCT } from "../modules/products/models";
import * as actionsReducerUI from "../modules/ui/reducers";
import ProductItemStyleList from "../commons/components/ProductItemStyleList";
import * as actionSagaProduct from "../modules/products/actionsSaga";
import limit from "../commons/limit";
import { convertObject } from "../commons/utils/convertObject";
import { removeKeyObjectNull } from "../commons/utils/removeKeyObjectNull";
import convertKeyArrayToString from "../commons/utils/convertKeyArrayToString";

export default function SearchProductPage() {
  const isMobile = useMediaQuery("(max-width:504px)");
  const listViewStyle = useSelector(state => state[MODULE_UI].searchPage.listViewStyle);
  const dispatch = useDispatch();
  const { control, handleSubmit, getValues } = useForm();
  const [values, setValues] = useState({ "price-range": [0, 0], year: [0, 0] });
  const [page, setPage] = useState(1);
  const attributes = useSelector(state => state[MODULE_PRODUCT].attributes);
  const productObject = useSelector(state => state[MODULE_PRODUCT].productObject);
  const types = useSelector(state => state[MODULE_PRODUCT].types);
  const brands = useSelector(state => state[MODULE_PRODUCT].brands);
  const filterValues = useSelector(state => state[MODULE_PRODUCT].filterValues);

  const submitForm = valuesReactHookForm => {
    setPage(1);
    const cvt =
      valuesReactHookForm && valuesReactHookForm.atrributes
        ? convertObject(valuesReactHookForm.atrributes, "attributes")
        : {};
    delete valuesReactHookForm.atrributes;
    let rm = removeKeyObjectNull({
      ...cvt,
      ...values,
      ...valuesReactHookForm
    });
    rm = convertKeyArrayToString(rm);
    dispatch(actionSagaProduct.fetchProducts({ page: 1, size: limit, ...rm }));
  };

  useEffect(() => {
    dispatch(actionSagaProduct.fetchAttribute());
    dispatch(actionSagaProduct.fetchProducts({ page: 1, size: limit }));
    dispatch(actionSagaProduct.fetchTypes());
    dispatch(actionSagaProduct.fetchBrands());
    dispatch(actionSagaProduct.fetchFilterValues());
  }, [dispatch]);

  // Fetch Filter Value
  useEffect(() => {
    if (filterValues)
      setValues({
        ...values,
        "price-range": filterValues.price,
        year: filterValues.year
      });
  }, [filterValues]);
  console.log(filterValues);

  // Fetch Atrributes
  useEffect(() => {
    const defaultAttributes = attributes;
    const object = {};
    for (let i = 0; i < defaultAttributes.length; i++) {
      if (defaultAttributes[i].valueType === "dynamic")
        object[`atrributes.${defaultAttributes[i].id}`] = defaultAttributes[i].valueRanges;
    }
    setValues({ ...values, ...object });
  }, [attributes]);

  const handleChangeSlider = name => (event, value) => {
    setValues({
      ...values,
      [name]: value
    });
  };

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
                  name={`atrributes.${attribute.id}`}
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
                        <option value="none">Default</option>
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
                <Slider
                  min={
                    values &&
                    values[`atrributes.${attribute.id}`] &&
                    values[`atrributes.${attribute.id}`][0]
                  }
                  max={
                    values &&
                    values[`atrributes.${attribute.id}`] &&
                    values[`atrributes.${attribute.id}`][1]
                  }
                  valueLabelDisplay="auto"
                  value={values[`atrributes.${attribute.id}`] || [0, 100]}
                  name={`atrributes.${attribute.id}`}
                  onChange={handleChangeSlider(`atrributes.${attribute.id}`)}
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

    if (listViewStyle === "grid")
      return productObject.items.map(product => {
        return <ProductItem product={product} key={product.id} lg={4} />;
      });
    return productObject.items.map(product => {
      return <ProductItemStyleList product={product} key={product.id} />;
    });
  };

  const handleChangePage = (e, p) => {
    setPage(p);
    const valuesReactHookForm = getValues();
    const cvt =
      valuesReactHookForm && valuesReactHookForm.atrributes
        ? convertObject(valuesReactHookForm.atrributes, "attributes")
        : {};
    delete valuesReactHookForm.atrributes;
    let rm = removeKeyObjectNull({
      ...cvt,
      ...values,
      ...valuesReactHookForm
    });
    rm = convertKeyArrayToString(rm);
    dispatch(actionSagaProduct.fetchProducts({ page: p, size: limit, ...rm }));
  };

  return (
    <div className="w-90 search-product-page">
      <Grid container>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <h3>SEARCH PRODUCTS</h3>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="form-search">
              <Controller
                defaultValue=""
                name="query"
                control={control}
                as={<input className="search-input" placeholder="Model name" type="text" />}
              />
              <button
                onClick={handleSubmit(submitForm)}
                className="btn-submit-search"
                type="button"
              >
                <span className="ti-search" />
              </button>
            </div>
            <div className="form-control">
              <Controller
                defaultValue="none"
                control={control}
                name="type"
                as={
                  <FormControl style={{ width: "100%" }} size="small" variant="outlined">
                    <InputLabel id="type-filled-label">Type</InputLabel>
                    <Select
                      label="Type"
                      native
                      labelId="type-filled-label"
                      placeholder="Type"
                      style={{ width: "100%" }}
                    >
                      <option value="none">Default</option>
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
                name="manufacturer"
                as={
                  <FormControl style={{ width: "100%" }} size="small" variant="outlined">
                    <InputLabel id="manufacturer-filled-label">Manufacturer</InputLabel>
                    <Select
                      label="Manufacturer"
                      native
                      labelId="manufacturer-filled-label"
                      placeholder="Manufacturer"
                      style={{ width: "100%" }}
                    >
                      <option value="none">Default</option>
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
              <p className="label">Year</p>
              <Slider
                min={filterValues ? filterValues.year[0] : 0}
                max={filterValues ? filterValues.year[1] : 0}
                valueLabelDisplay="auto"
                value={values.year}
                name="year"
                onChange={handleChangeSlider("year")}
              />
            </div>
            <div className="form-control">
              <p className="label">Price range</p>
              <Slider
                min={filterValues ? filterValues.price[0] : 0}
                max={filterValues ? filterValues.price[1] : 0}
                valueLabelDisplay="auto"
                value={values["price-range"]}
                name="price-range"
                onChange={handleChangeSlider("price-range")}
              />
            </div>
            <div className="form-control">
              <Controller
                defaultValue="none"
                control={control}
                name="variation"
                as={
                  <FormControl style={{ width: "100%" }} size="small" variant="outlined">
                    <InputLabel id="variation-filled-label">Variations</InputLabel>
                    <Select
                      label="Variations"
                      native
                      labelId="variation-filled-label"
                      placeholder="Variations"
                      style={{ width: "100%" }}
                    >
                      <option value="none">Default</option>
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
            {renderSideBar()}
            <button
              onClick={handleSubmit(submitForm)}
              style={{ width: "100%" }}
              className="btn-submit-search"
              type="button"
            >
              <span className="ti-search" />
            </button>
          </form>
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
