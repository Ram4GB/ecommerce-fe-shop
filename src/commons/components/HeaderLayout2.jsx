/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actionsReducerUI from "../../modules/ui/reducers";
import { MODULE_NAME as MODULE_USER } from "../../modules/user/models";
import { ReactComponent as AutogoLogo } from "../assets/img/logos/Autogo_Logo_Icon_nocolor.svg";

const navbars = [
  {
    name: "Đăng nhập",
    path: "#car",
    icon: <LockOpenIcon />
  },
  {
    name: "Thông tin người nhận",
    path: "#infomationUser",
    icon: <AssignmentIndIcon />
  },
  {
    name: "Thanh toán",
    path: "#payment",
    icon: <CreditCardIcon />
  }
];

export default function HeaderLayout2({ activeNavItem }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const account = useSelector(state => state[MODULE_USER].account);

  const handleClickNavItem = path => {
    if (account) {
      dispatch(actionsReducerUI.SET_CURRENT_PAGE_CHECKOUT_PAGE(path));
    }
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
      <div style={{ lineHeight: 0, textAlign: "center" }}>
        <a
          href="/"
          onClick={() => {
            history.push("/");
            dispatch(actionsReducerUI.SET_CURRENT_PAGE_CHECKOUT_PAGE("#car"));
          }}
          className="logo"
          style={{ display: "flex", justifyContent: "center", padding: "2rem 0" }}
        >
          <AutogoLogo style={{ width: 200 }} />
        </a>
      </div>
      <ul className="navbar">{renderListNavItem()}</ul>
    </nav>
  );
}

HeaderLayout2.propTypes = {
  activeNavItem: PropTypes.string.isRequired
};
