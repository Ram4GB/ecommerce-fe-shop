/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";

const navbars = [
  {
    name: "Account detail",
    path: "/profile"
  },
  {
    name: "View orders",
    path: "/view_orders"
  },
  {
    name: "Edit Address",
    path: "/edit_address"
  },
  {
    name: "Favorited items",
    path: "/favorited_items"
  }
];

export default function LayoutContentUser({ children }) {
  const location = useLocation();
  const history = useHistory();

  const activeItem = location.pathname.split("/")[2];

  const renderNavbars = () => {
    return navbars.map(navbarItem => {
      return (
        <li
          onClick={() => history.push(`/user${navbarItem.path}`)}
          key={navbarItem.path}
          className={`nav-item ${`/${activeItem}` === navbarItem.path ? " active" : ""}`}
        >
          <span className="nav-text">{navbarItem.name}</span>
        </li>
      );
    });
  };

  return (
    <div>
      <div className="background-img-profile">
        <span className="text">My profile</span>
      </div>
      <div className="row information-page">
        <div className="left-side-bar">
          <ul className="navbar">{renderNavbars()}</ul>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

LayoutContentUser.propTypes = {
  children: PropTypes.node
};

LayoutContentUser.defaultProps = {
  children: <></>
};
