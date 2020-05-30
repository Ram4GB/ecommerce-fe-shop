/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useForm, FormContext } from "react-hook-form";
import { Grid, Container } from "@material-ui/core";
import HeaderLayout2 from "../components/HeaderLayout2";
import { MODULE_NAME } from "../../modules/ui/models";
import * as actionsUIReducer from "../../modules/ui/reducers";

export default function LayoutCheckoutPage({ children }) {
  const activeNavItem = useSelector(state => state[MODULE_NAME].checkoutPage.activeNavItem);
  const successMessage = useSelector(state => state[MODULE_NAME].successMessage);
  const errorMessage = useSelector(state => state[MODULE_NAME].errorMessage);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const methods = useForm();

  useEffect(() => {
    if (successMessage) {
      enqueueSnackbar(successMessage.message ? successMessage.message : "Frontpage Error", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 1000
      });
      setTimeout(() => {
        dispatch(actionsUIReducer.SET_SUCCESS_MESSAGE(""));
      }, 1);
    }
  }, [successMessage, enqueueSnackbar]);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage.message ? errorMessage.message : "Frontpage Error", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 1000
      });
      setTimeout(() => {
        dispatch(actionsUIReducer.SET_ERROR_MESSAGE(""));
      }, 100);
    }
  }, [errorMessage, enqueueSnackbar]);

  return (
    <div className="layout-2">
      <FormContext {...methods}>
        <HeaderLayout2 activeNavItem={activeNavItem} />
        <div className="container-w">{children}</div>
        <footer>
          <Container>
            <Grid container>
              <Grid item lg={3}>
                <div className="p-20">
                  {/* <img src={logo} alt="" /> */}
                  <p style={{ marginTop: 50 }}>
                    <span style={{ fontWeight: "bold" }}>OSWAN</span> the most latgest bike store in
                    the wold can serve you latest ulity of motorcycle soucan sell here your
                    motorcycle it quo
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
                    <span>@Smith</span>, the most latgest bike store in the wold can serve you 10
                    min ago
                  </p>
                  <p>
                    <span>@Smith</span>, the most latgest bike store in the wold can serve you 10
                    min ago
                  </p>
                  <p>
                    <span>@Smith</span>, the most latgest bike store in the wold can serve you 10
                    min ago
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
      </FormContext>
    </div>
  );
}

LayoutCheckoutPage.propTypes = {
  children: PropTypes.node.isRequired
};
