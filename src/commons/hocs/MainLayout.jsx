/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Container, Modal } from "@material-ui/core";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import _ from "lodash";
import logo from "../assets/img/logo/logo.png";
import logo2 from "../assets/img/logo/logo2.png";
import payment from "../assets/img/icon/payment.png";
import MobileMenu from "../components/MobileMenu";
import { MODULE_NAME as MODULE_UI } from "../../modules/ui/models";
import { MODULE_NAME as MODULE_USER } from "../../modules/user/models";
import * as actionsUIReducer from "../../modules/ui/reducers";
import LoginForm from "../../modules/ui/components/LoginForm";
import * as actionsSagaUI from "../../modules/ui/actionsSaga";
import DialogCustom from "../components/DialogCustom";
import { errorIgnore } from "../errorArray";
import { navbars } from "../navbars";
import ModalCustom from "../components/ModalCustom";

const useStyles = makeStyles(() => ({
  logoImage: {}
}));

export default function MainLayout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const isLoginForm = useSelector(state => state[MODULE_UI].isLoginForm);
  const errorMessage = useSelector(state => state[MODULE_UI].errorMessage);
  const successMessage = useSelector(state => state[MODULE_UI].successMessage);
  const account = useSelector(state => state[MODULE_USER].account);
  const { enqueueSnackbar } = useSnackbar();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const isMaxWidth500PX = useMediaQuery("(max-width: 500px");
  const toggleMenuMobile = useSelector(state => state[MODULE_UI].toggleMenuMobile);
  const dispatch = useDispatch();

  const handleLogout = () => {
    setIsDialogOpen(true);
  };

  const handleAgree = () => {
    dispatch(actionsSagaUI.logout());
    setIsDialogOpen(false);
  };

  const handleDisagree = () => {
    setIsDialogOpen(false);
  };

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

  useEffect(() => {
    if (errorMessage && !_.includes(errorIgnore, errorMessage.name ? errorMessage.name : "")) {
      enqueueSnackbar(errorMessage.message ? errorMessage.message : "Frontpage Error", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 1000
      });
      setTimeout(() => {
        dispatch(actionsUIReducer.SET_ERROR_MESSAGE(""));
      }, 100);
    }
  }, [errorMessage, enqueueSnackbar, dispatch]);

  useEffect(() => {
    if (successMessage) {
      enqueueSnackbar(successMessage.message ? successMessage.message : "Frontpage Error", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 1000
      });
      setTimeout(() => {
        dispatch(actionsUIReducer.SET_SUCCESS_MESSAGE(""));
      }, 100);
    }
  }, [successMessage, enqueueSnackbar, dispatch]);

  const handleToggleLoginForm = () => {
    if (isLoginForm) dispatch(actionsUIReducer.SET_IS_LOGIN_FORM(false));
    else dispatch(actionsUIReducer.SET_IS_LOGIN_FORM(true));
  };

  document.body.style.overflow = toggleMenuMobile ? "hidden" : "auto";

  return (
    <>
      <div className="wrap-header">
        <Container>
          <Grid alignItems="center" className="header" container>
            <Grid className="wrap-logo" lg={2} md={2} item>
              <Box component="div">
                <img className={classes.logoImage} src={logo} alt="logo" />
              </Box>
            </Grid>
            <Grid lg={8} md={8} item>
              <ul className="navbar">{renderNavBarDesktop()}</ul>
            </Grid>
            <div className="right-side">
              {!account ? (
                <div onClick={handleToggleLoginForm} className="login-form-button">
                  <span className="ti-user" />
                </div>
              ) : (
                <div onClick={handleLogout} className="login-form-button">
                  <span className="ti-arrow-right" />
                </div>
              )}
              <div className="cart-box">
                <span className="ti-shopping-cart" />
                <span className="pricing">$205</span>
              </div>
            </div>

            <span
              onClick={() => dispatch(actionsUIReducer.TOGGLE_MENU_MOBILE(!toggleMenuMobile))}
              className={toggleMenuMobile ? "ti-close toggle-navbar" : "ti-view-list toggle-navbar"}
            />
            {/* overlay background of MobileMenu */}
            <MobileMenu toggleMenuMobile={toggleMenuMobile} menus={navbars} />
            <div
              className="overlay-bg"
              onClick={() => dispatch(actionsUIReducer.TOGGLE_MENU_MOBILE(!toggleMenuMobile))}
            />
          </Grid>
        </Container>
      </div>
      <div className="container">{children}</div>
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
      <ModalCustom
        className="modal-login"
        onClose={() => dispatch(actionsUIReducer.SET_IS_LOGIN_FORM(false))}
        open={isLoginForm}
      >
        <LoginForm />
      </ModalCustom>
      <DialogCustom
        dialogTitle="Dialog confirmation"
        dialogContext="Are you sure to logout?"
        handleDisagree={handleDisagree}
        handleAgree={handleAgree}
        open={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

MainLayout.defaultPropTypes = {
  children: null
};
