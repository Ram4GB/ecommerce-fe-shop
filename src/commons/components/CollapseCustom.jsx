/* eslint-disable react/forbid-prop-types */
import React, { useState } from "react";
import StarBorder from "@material-ui/icons/StarBorder";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Checkbox,
  Radio
} from "@material-ui/core";
import PropTypes from "prop-types";

const CollapseItem = ({ checked, item, handleClickItem, children }) => {
  const handleClick = () => {
    handleClickItem(item.method);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Radio
            defaultValue={checked}
            onChange={handleClick}
            checked={!!checked}
            edge="start"
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={item.name} />
        {checked === true ? <ExpandMore /> : <ExpandLess />}
      </ListItem>
      <Collapse in={checked} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};

export default function CustomCollapse({ items, defaultValue, handleSetValue }) {
  const handleClickItem = value => {
    handleSetValue(value);
  };

  if (items) {
    return items.map(item => {
      if (item.method === defaultValue)
        return (
          <CollapseItem item={item} handleClickItem={handleClickItem} checked>
            {item.children}
          </CollapseItem>
        );
      return (
        <CollapseItem item={item} handleClickItem={handleClickItem}>
          {item.children}
        </CollapseItem>
      );
    });
  }
  return null;
}

CustomCollapse.propTypes = {
  items: PropTypes.array.isRequired,
  defaultValue: PropTypes.bool.isRequired,
  handleSetValue: PropTypes.func.isRequired
};
