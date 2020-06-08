/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Modal } from "@material-ui/core";
import PropTypes from "prop-types";

export default function ModalCustom({ children, onClose, open, ...props }) {
  return (
    <Modal className="custom-modal" open={open} onClose={onClose} {...props}>
      <div>{children}</div>
    </Modal>
  );
}

ModalCustom.propTypes = {
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

ModalCustom.defaultProps = {
  children: <></>
};
