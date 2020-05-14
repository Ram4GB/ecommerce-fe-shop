/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import HeaderLayout2 from "../components/HeaderLayout2";
import { MODULE_NAME } from "../../modules/ui/models";
import * as actionsUIReducer from "../../modules/ui/reducers";

export default function LayoutCheckoutPage({ children }) {
  const activeNavItem = useSelector(state => state[MODULE_NAME].checkoutPage.activeNavItem);
  const successMessage = useSelector(state => state[MODULE_NAME].successMessage);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

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

  return (
    <div className="layout-2">
      <HeaderLayout2 activeNavItem={activeNavItem} />
      <div className="container-w">{children}</div>
    </div>
  );
}

LayoutCheckoutPage.propTypes = {
  children: PropTypes.node.isRequired
};
