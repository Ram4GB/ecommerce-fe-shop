/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Container } from "@material-ui/core";
import { useHistory } from "react-router";
import logo from "../assets/img/logo/logo.png";
import logo2 from "../assets/img/logo/logo2.png";
import payment from "../assets/img/icon/payment.png";

const navbars = [
  {
    name: "home",
    path: "/"
  },
  {
    name: "about",
    path: "/about"
  },
  {
    name: "shop",
    path: "/search"
  },
  {
    name: "pages",
    path: "/pages"
  },
  {
    name: "bike",
    path: "/bike"
  }
];

const useStyles = makeStyles(() => ({
  logoImage: {}
}));

export default function MainLayout({ children }) {
  const classes = useStyles();
  const history = useHistory();

  const renderNavBarDesktop = () => {
    return navbars.map(item => {
      return (
        <li key={item.name} className="nav-item">
          <a onClick={() => history.push(item.path)} href="#" className="nav-link">
            <span className="nav-text">{item.name}</span>
          </a>
        </li>
      );
    });
  };

  return (
    <>
      <div className="wrap-header">
        <Container>
          <Grid alignItems="center" className="header" container>
            <Grid lg={2} item>
              <Box component="div">
                <img className={classes.logoImage} src={logo} alt="logo" />
              </Box>
            </Grid>
            <Grid lg={8} item>
              <ul className="navbar">{renderNavBarDesktop()}</ul>
            </Grid>
          </Grid>
          <div className="cart-box">
            <span className="ti-shopping-cart" />
            <span className="pricing">$205</span>
          </div>
        </Container>
      </div>
      <div>{children}</div>
      <footer>
        <Container>
          <Grid container>
            <Grid item lg={3}>
              <div className="p-20">
                <img src={logo2} alt="" />
                <p style={{ marginTop: 50 }}>
                  <span style={{ fontWeight: "bold" }}>OSWAN</span> the most latgest bike store in
                  the wold can serve you latest ulity of motorcycle soucan sell here your motorcycle
                  it quo
                </p>
                <div className="for-support">
                  <span style={{ fontWeight: "bold" }}>FOR SUPPORT</span> <br />
                  <p>01245 658 698 (Toll Free)</p>
                </div>
              </div>
            </Grid>
            <Grid item lg={3}>
              <div className="p-20">
                <h3>QUICK LINK </h3>
                <ul className="quick-link">
                  <li>
                    <a href="">About us</a>
                  </li>
                  <li>
                    <a href="">Service</a>
                  </li>
                  <li>
                    <a href="">Inventory</a>
                  </li>
                  <li>
                    <a href="">Blog</a>
                  </li>
                  <li>
                    <a href="">Conditions</a>
                  </li>
                  <li>
                    <a href="">Contact</a>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid className="lastes-tweet" item lg={3}>
              <div className="p-20">
                <h3>LATEST TWEET </h3>
                <p>
                  <span>@Smith</span>, the most latgest bike store in the wold can serve you 10 min
                  ago
                </p>
                <p>
                  <span>@Smith</span>, the most latgest bike store in the wold can serve you 10 min
                  ago
                </p>
                <p>
                  <span>@Smith</span>, the most latgest bike store in the wold can serve you 10 min
                  ago
                </p>
              </div>
            </Grid>
            <Grid item lg={3}>
              <div className="p-20">
                <h3>CONTACT INFO</h3>
                <div className="group">
                  <h2>Address </h2>
                  <p>276 Jhilli Nogor, 4th folor, Momen Tower, Main Town, New Yourk</p>
                </div>
                <div className="group">
                  <h2>Phone</h2>
                  <p>+090 12568 369 987</p>
                  <p>+090 12568 369 987</p>
                </div>
                <div className="group">
                  <h2>Web</h2>
                  <p>info@oswanmega.com</p>
                  <p>www.oswanmega.com</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </footer>
      <div className="end-footer">
        <Container className="wrap-footer">
          <p>©Copyright, 2018 All Rights Reserved by HASTECH</p>
          <img src={payment} alt="" />
        </Container>
      </div>
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

MainLayout.defaultPropTypes = {
  children: null
};
