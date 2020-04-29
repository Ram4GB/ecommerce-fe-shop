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
  dialogContext,
  dialogTitle
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
        <DialogContentText id="alert-dialog-description">{dialogContext}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree} color="primary">
          Disagree
        </Button>
        <Button onClick={handleAgree} color="primary" autoFocus>
          Agree
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
  dialogContext: PropTypes.string,
  dialogTitle: PropTypes.string
};

DialogCustom.defaultProps = {
  dialogContext: "Context Dialog",
  dialogTitle: "Title Dialog"
};
