/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { MODULE_NAME as MODULE_UI } from "../../modules/ui/models";

function MenuItem({ subchild, name, path }) {
  const [isOpen, setOpen] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();

  const i18nName = t(`${MODULE_UI}.nav.${name}`);

  const renderSubchild = () => {
    return subchild.map(item => {
      return (
        <li key={item.key}>
          <a onClick={() => history.push(item.path)} href="#">
            {i18nName}
          </a>
        </li>
      );
    });
  };

  if (subchild && subchild.length > 0) {
    return (
      <li className="hasSubchild">
        <a onClick={() => setOpen(!isOpen)}>{i18nName}</a>
        <ul className={`menu-mobile-subchild ${isOpen ? "active" : ""}`}>{renderSubchild()}</ul>
      </li>
    );
  }

  return (
    <li>
      <a onClick={() => history.push(path)} href="#">
        {i18nName}
      </a>
    </li>
  );
}

export default function MobileMenu({ menus, toggleMenuMobile }) {
  const renderMenu = () => {
    return menus.map(item => (
      <MenuItem key={item.key} subchild={item.subchild} path={item.path} name={item.key} />
    ));
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
