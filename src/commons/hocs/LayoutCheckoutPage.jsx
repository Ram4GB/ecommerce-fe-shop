/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useForm, FormContext } from "react-hook-form";
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
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        autoHideDuration: 1500
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
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        autoHideDuration: 1500
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
      </FormContext>
    </div>
  );
}

LayoutCheckoutPage.propTypes = {
  children: PropTypes.node.isRequired
};
