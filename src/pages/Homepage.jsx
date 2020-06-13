/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from "react";
import { Box } from "@material-ui/core";
// import AwesomeSlider from "react-awesome-slider";
// import "react-awesome-slider/dist/styles.css";

import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import banner1 from "../commons/assets/img/banners/bike-1.png";
import banner2 from "../commons/assets/img/banners/bike-2.png";
import banner3 from "../commons/assets/img/banners/bike-3.png";
// import banner4 from "../commons/assets/img/banners/banner-1.png";

// import section1 from "../commons/assets/img/banners/section-1.jpg";
// import section2 from "../commons/assets/img/banners/section-2.jpg";
// import section3 from "../commons/assets/img/banners/section-3.jpg";

export default function Homepage() {
  // make slides
  const [slideIndex, setSlideIndex] = useState(0);

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
        <div className="content-wrap"></div>
      </section>
    </>
  );
}
