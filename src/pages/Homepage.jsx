/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

// Carousel
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

// Saga
import { Link } from "react-router-dom";
import { MODULE_NAME as MODULE_PRODUCT } from "../modules/products/models";
import * as actionSagaProduct from "../modules/products/actionsSaga";

// components
import ProductItem from "../commons/components/ProductItem";

import banner1 from "../commons/assets/img/banners/bike-1.png";
import banner2 from "../commons/assets/img/banners/bike-2.png";
import banner3 from "../commons/assets/img/banners/bike-3.png";

export default function Homepage() {
  const dispatch = useDispatch();

  // states
  const [slideIndex, setSlideIndex] = useState(0);

  // selectors
  const hotProducts = useSelector(state => state[MODULE_PRODUCT].hotProducts);

  console.log(hotProducts);

  // useEffect
  useEffect(() => {
    dispatch(actionSagaProduct.fetchHotProducts());
  }, []);

  // helpers
  const renderListHotProducts = () => {
    if (!hotProducts || !hotProducts.items) return "";
    return hotProducts.items.map(product => {
      return <ProductItem product={product} key={product.id} lg={4} />;
    });
  };

  const featureCards = [
    {
      img: "http://softius.vision-themes.com/images/a6.svg",
      title: "Thân thiện",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam porro labore aliquid, optio necessitatibus suscipit minima fugit eaque eius harum corrupti quam excepturi."
    },
    {
      img: "http://softius.vision-themes.com/images/a1.svg",
      title: "Chuyên nghiệp",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam porro labore aliquid, optio necessitatibus suscipit minima fugit eaque eius harum corrupti quam excepturi."
    },
    {
      img: "http://softius.vision-themes.com/images/a4.svg",
      title: "Đa dạng",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam porro labore aliquid, optio necessitatibus suscipit minima fugit eaque eius harum corrupti quam excepturi."
    },
    {
      img: "http://softius.vision-themes.com/images/a5.svg",
      title: "Hỗ trợ",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam porro labore aliquid, optio necessitatibus suscipit minima fugit eaque eius harum corrupti quam excepturi."
    }
  ];

  return (
    <>
      <Box className="carousel" component="div">
        <Carousel value={slideIndex} onChange={i => setSlideIndex(i)} arrows infinite>
          {[banner1, banner2, banner3].map(src => (
            <img key={src} src={src} alt="" />
          ))}
        </Carousel>
      </Box>

      <section className="content-container">
        <div className="full-width">
          <div className="content-header">
            Hệ thống bán xe mô hình AutoGo
            <hr />
          </div>
          <div className="content-body">
            {featureCards.map(card => (
              <div className="feature-card">
                <img src={card.img} alt="abc" />
                <p className="feature-title">{card.title}</p>
                <p className="feature-content">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="full-width">
          <div className="content-header">
            Sản phẩm nổi bật
            <hr />
          </div>
          <div className="content-body">
            <div className="list-hot-product">{renderListHotProducts()}</div>
            <div className="toShopButton-container">
              <Link className="toShopButton" to="/search">
                Xem thêm
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
