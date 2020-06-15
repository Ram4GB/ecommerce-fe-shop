/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";

const navbars = [
  {
    name: "Tài khoản",
    path: "/profile",
    icon: <i className="fas fa-user" />
  },
  {
    name: "Đơn hàng",
    path: "/view_orders",
    icon: <i className="fas fa-copy" />
  },
  {
    name: "Bình luận",
    path: "/comments",
    icon: <i className="fas fa-comments" />
  },
  {
    name: "Yêu thích",
    path: "/favorited_items",
    icon: <i className="fas fa-heart" />
  },
  {
    name: "Hỗ trợ",
    path: "/support-user",
    icon: <i className="fas fa-question" />
  }
];

export default function LayoutContentUser({ children }) {
  const location = useLocation();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const activeItem = location.pathname.split("/")[2];

  const renderNavbars = () => {
    return navbars.map(navbarItem => {
      return (
        <li
          onClick={() => history.push(`/user${navbarItem.path}`)}
          key={navbarItem.path}
          className={`nav-item ${`/${activeItem}` === navbarItem.path ? " active" : ""}`}
        >
          {navbarItem.icon ? navbarItem.icon : ""}
          <span className="nav-text">{navbarItem.name}</span>
        </li>
      );
    });
  };

  const handleToggle = () => {
    setIsOpen(pre => !pre);
    if (isOpen === false) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    } else {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    }
  };

  return (
    <div className="container-layout-2">
      <div className="background-img-profile">
        <span className="text">Trang cá nhân</span>
      </div>
      <div className="row information-page">
        <div className="left-side-bar">
          <ul className={`navbar ${isOpen ? " active" : ""}`}>
            <li onClick={handleToggle} className="nav-item close">
              <i className="fas fa-times" />
            </li>
            <li className="nav-item logo">
              <span className="nav-text">AutoGo</span>
            </li>
            {renderNavbars()}
          </ul>
        </div>
        <div className="content">{children}</div>
      </div>
      <div onClick={handleToggle} className="menu-toggle">
        <span className="menu-toggle__icon">=</span>
      </div>
      <div className="close-modal">X</div>
    </div>
  );
}

LayoutContentUser.propTypes = {
  children: PropTypes.node
};

LayoutContentUser.defaultProps = {
  children: <></>
};
