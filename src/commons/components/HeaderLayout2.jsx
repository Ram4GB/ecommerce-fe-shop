/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import * as actionsReducerUI from "../../modules/ui/reducers";

const navbars = [
  {
    name: "1. Car",
    path: "#car"
  },
  {
    name: "2. Payment",
    path: "#payment"
  }
];

export default function HeaderLayout2({ activeNavItem }) {
  const dispatch = useDispatch();

  const renderListNavItem = () => {
    return navbars.map(i => {
      return (
        <li
          onClick={() => dispatch(actionsReducerUI.SET_CURRENT_PAGE_CHECKOUT_PAGE(i.path))}
          key={`nav-link ${i.name}`}
          className={`navitem ${i.path === activeNavItem ? " active" : ""}`}
        >
          <span className="navlink">{i.name}</span>
        </li>
      );
    });
  };

  return (
    <nav>
      <ul className="navbar">
        <li className="navitem logo">
          <a href="#" className="navlink">
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
