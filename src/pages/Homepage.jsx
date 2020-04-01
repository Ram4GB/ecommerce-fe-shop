/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { Box, Grid, Container } from "@material-ui/core";
import AwesomeSlider from "react-awesome-slider";
import MainLayout from "../commons/hocs/MainLayout";
import "react-awesome-slider/dist/styles.css";
import ProductItem from "../commons/components/ProductItem";

export default function Homepage() {
  return (
    <MainLayout>
      <Box className="carousel" component="div">
        <AwesomeSlider>
          <div data-src="http://preview.hasthemes.com/oswan/assets/img/slider/bike-2.png" />
          <div data-src="http://preview.hasthemes.com/oswan/assets/img/slider/bike-1.png" />
          <div data-src="http://preview.hasthemes.com/oswan/assets/img/slider/bike-2.png" />
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
            <img src="http://preview.hasthemes.com/oswan/assets/img/banner/banner-1.png" alt="" />
          </Grid>
        </Grid>
      </Container>

      <Container className="section2">
        <Grid spacing={2} container>
          <Grid xs={12} md={6} sm={12} lg={4} item>
            <div className="banner">
              <div className="square">
                <h1>BUY NEW BIKE</h1>
              </div>
            </div>
          </Grid>
          <Grid xs={12} md={6} sm={12} lg={4} item>
            <div className="banner">
              <div className="square">
                <h1>BUY NEW BIKE</h1>
              </div>
            </div>
          </Grid>
          <Grid xs={12} md={6} sm={12} lg={4} item>
            <div className="banner">
              <div className="square">
                <h1>BUY NEW BIKE</h1>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Container class="section3">
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
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </Grid>
      </Container>
    </MainLayout>
  );
}
