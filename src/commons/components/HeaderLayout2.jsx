/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useFormContext } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as actionsReducerUI from "../../modules/ui/reducers";

const navbars = [
  {
    name: "Car",
    path: "#car",
    icon: <DriveEtaIcon />
  },
  {
    name: "Finance Options",
    path: "#finance-option",
    icon: <AssignmentIndIcon />
  },
  {
    name: "Payment",
    path: "#payment",
    icon: <CreditCardIcon />
  }
];

export default function HeaderLayout2({ activeNavItem }) {
  const dispatch = useDispatch();
  const { handleSubmit } = useFormContext();
  const history = useHistory();

  const submitForm = valuesReacHook => {
    dispatch(actionsReducerUI.SET_VALUE_FORM_CHECKOUT(valuesReacHook));
  };

  const handleClickNavItem = path => {
    handleSubmit(submitForm)();
    dispatch(actionsReducerUI.SET_CURRENT_PAGE_CHECKOUT_PAGE(path));
  };

  const renderListNavItem = () => {
    return navbars.map((i, index) => {
      return (
        <li
          onClick={() => handleClickNavItem(i.path)}
          key={`nav-link ${i.name}`}
          className={`navitem ${i.path === activeNavItem ? " active" : ""}`}
        >
          <div className="navlink">
            {i.icon}
            <span className="navtext">
              {index + 1}
              {". "}
              {i.name}
            </span>
          </div>
        </li>
      );
    });
  };

  return (
    <nav>
      <ul className="navbar">
        <li className="navitem logo">
          <a
            href="/"
            onClick={() => {
              history.push("/");
              dispatch(actionsReducerUI.SET_CURRENT_PAGE_CHECKOUT_PAGE("#car"));
            }}
            className="navlink"
          >
            Oswan
          </a>
        </li>
        {renderListNavItem()}
      </ul>
    </nav>
  );
}

HeaderLayout2.propTypes = {
  activeNavItem: PropTypes.string.isRequired
};
