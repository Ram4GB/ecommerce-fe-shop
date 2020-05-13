/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import HeaderLayout2 from "../components/HeaderLayout2";
import { MODULE_NAME } from "../../modules/ui/models";

export default function LayoutCheckoutPage({ children }) {
  const activeNavItem = useSelector(state => state[MODULE_NAME].checkoutPage.activeNavItem);

  return (
    <div className="layout-2">
      <HeaderLayout2 activeNavItem={activeNavItem} />
      <div className="container-w">{children}</div>
      <div className="action-group">
        <div className="cash">
          <h3>CASH</h3>
        </div>
        <div className="info-cash">
          <div className="info">
            <p>$33,690</p>
            <p>After potential savings</p>
          </div>
          <div className="info" />
        </div>
      </div>
    </div>
  );
}

LayoutCheckoutPage.propTypes = {
  children: PropTypes.node.isRequired
};
