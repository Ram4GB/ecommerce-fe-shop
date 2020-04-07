/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

function MenuItem({ subchild, name, path }) {
  const [isOpen, setOpen] = useState(false);
  const history = useHistory();

  const renderSubchild = () => {
    return subchild
      ? subchild.map(item => {
          return (
            <li>
              <a onClick={() => history.push(item.path)} href="#">
                {item.name}
              </a>
            </li>
          );
        })
      : null;
  };

  return (
    <li className={subchild && subchild.length > 0 ? "hasSubchild" : null}>
      <a onClick={subchild ? () => setOpen(!isOpen) : () => history.push(path)} href="#">
        {name}
      </a>
      {subchild ? (
        <ul className={`menu-mobile-subchild ${isOpen ? "active" : ""}`}>{renderSubchild()}</ul>
      ) : null}
    </li>
  );
}

export default function MobileMenu({ menus, toggleMenuMobile }) {
  const renderMenu = () => {
    return menus.map(item => {
      return (
        <MenuItem key={item.name} subchild={item.subchild} path={item.path} name={item.name} />
      );
    });
  };

  return (
    <div className={`menu-mobile ${toggleMenuMobile ? "active" : ""}`}>
      <ul>{menus ? renderMenu() : null}</ul>
    </div>
  );
}

MenuItem.propTypes = {
  subchild: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

MobileMenu.propTypes = {
  menus: PropTypes.array.isRequired,
  toggleMenuMobile: PropTypes.bool.isRequired
};
