/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import PropTypes from "prop-types";

export default function DialogCustom({
  open,
  handleClose,
  handleDisagree,
  handleAgree,
  dialogContent,
  dialogTitle,
  agreeText,
  disagreeText
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{dialogContent}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree} color="primary">
          {disagreeText}
        </Button>
        <Button onClick={handleAgree} color="primary" autoFocus>
          {agreeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogCustom.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDisagree: PropTypes.func.isRequired,
  handleAgree: PropTypes.func.isRequired,
  dialogContent: PropTypes.string,
  dialogTitle: PropTypes.string,
  agreeText: PropTypes.string,
  disagreeText: PropTypes.string
};

DialogCustom.defaultProps = {
  dialogContent: "Content Dialog",
  dialogTitle: "Title Dialog",
  agreeText: "Oke",
  disagreeText: "No"
};
