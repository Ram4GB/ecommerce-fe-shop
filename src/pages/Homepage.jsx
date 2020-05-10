/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { Box, Grid, Container } from "@material-ui/core";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import banner1 from "../commons/assets/img/banners/bike-1.png";
import banner2 from "../commons/assets/img/banners/bike-2.png";
import banner3 from "../commons/assets/img/banners/bike-3.png";
import banner4 from "../commons/assets/img/banners/banner-1.png";

import section1 from "../commons/assets/img/banners/section-1.jpg";
import section2 from "../commons/assets/img/banners/section-2.jpg";
import section3 from "../commons/assets/img/banners/section-3.jpg";

export default function Homepage() {
  return (
    <>
      <Box className="carousel" component="div">
        <AwesomeSlider>
          {[banner1, banner2, banner3].map(src => (
            <div data-src={src} key={src} />
          ))}
        </AwesomeSlider>
      </Box>

      <Container className="section1">
        <Grid container>
          <Grid item md={12} sm={12} xs={12} lg={8}>
            <h1>
              <span style={{ fontWeight: "700", color: "#ffb52f" }}>OSWAN</span> WORLD MOST
            </h1>
            <h1>LATGEST MOTORCYCLE STORE</h1>
            <p>
              <span style={{ fontWeight: "bold" }}>OSWAN</span> the most latgest bike store in the
              wold can serve you latest qulity of motorcycle also you can sell here your motorcycle
              it quo minus iduod maxie placeat facere possimus, omnis voluptas assumenda est, omnis
              dolor llendus. Temporibus autem quibusdam
            </p>
            <Box component="div">
              <h2>HAVE ANY QUESTION?</h2>
              <div className="question-contact">
                <div className="question-icon">
                  <span className="ti-headphone-alt" />
                </div>
                <div className="question-content-number">01245 658 698</div>
              </div>
            </Box>
          </Grid>
          <Grid item md={12} sm={12} xs={12} lg={4}>
            <img src={banner4} alt="" />
          </Grid>
        </Grid>
      </Container>

      <Container className="section2">
        <Grid spacing={2} container>
          {[
            {
              text: "BY NEW BIKE",
              src: section1
            },
            {
              text: "BY NEW BIKE",
              src: section2
            },
            {
              text: "BY NEW BIKE",
              src: section3
            }
          ].map(section => (
            <Grid xs={12} md={6} sm={12} lg={4} item key={section.src}>
              <div className="banner" style={{ backgroundImage: `url(${section.src})` }}>
                <div className="square">
                  <h1>{section.text}</h1>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container className="section3">
        <h1>CHOOSE YOUR BIKE </h1>
        <p>
          OSWAN the most latgest bike store in the wold can serve you latest qulity of motorcycle
          also you can sell here your motorcycle
        </p>

        <button className="normal-button primary" type="button">
          New bikes
        </button>
        <button className="normal-button" type="button">
          Used bikes
        </button>

        <Grid style={{ marginTop: 50 }} container>
          {
            //  Product Item
          }
        </Grid>
      </Container>
    </>
  );
}
