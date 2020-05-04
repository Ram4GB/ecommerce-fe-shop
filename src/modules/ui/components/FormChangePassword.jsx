/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import generateErrorPropsForm from "../../../commons/utils/generateErrorPropsForm";
import { changePassword } from "../../user/handlers";
import * as actionsReducerUI from "../reducers";
import DialogCustom from "../../../commons/components/DialogCustom";

export default function FormChangePassword({ handleFinish }) {
  const { control, errors, setError, handleSubmit } = useForm();
  const [errorsAPI, setErrorsAPI] = useState(null);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangePassword = async values => {
    // REMEBER SET NULL BEFORE SUBMIT FORM
    setErrorsAPI(null);
    const result = await changePassword(values);
    try {
      if (result) {
        if (result.success) {
          dispatch(actionsReducerUI.SET_SUCCESS_MESSAGE({ message: "Update password success" }));
          handleFinish();
        } else if (result.errors) setErrorsAPI(result.errors);
        else dispatch(actionsReducerUI.SET_ERROR_MESSAGE({ message: result.message }));
      } else {
        dispatch(actionsReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
      }
      setOpenDialog(false);
    } catch (error) {
      dispatch(actionsReducerUI.SET_ERROR_MESSAGE({ message: "Frontpage error" }));
    }
  };

  return (
    <div>
      <form className="form-custom">
        <div className="form-control">
          <Controller
            control={control}
            name="oldPassword"
            defaultValue=""
            rules={{
              required: "Please enter password"
            }}
            as={
              <TextField
                {...generateErrorPropsForm(errors, "oldPassword", errorsAPI, setError)}
                style={{ width: "100%" }}
                size="small"
                placeholder="Current Password"
                variant="outlined"
                type="password"
              />
            }
          />
        </div>
        <div className="form-control">
          <Controller
            {...generateErrorPropsForm(errors, "password", errorsAPI, setError)}
            control={control}
            name="password"
            defaultValue=""
            rules={{
              required: "Please enter new password"
            }}
            as={
              <TextField
                style={{ width: "100%" }}
                size="small"
                placeholder="New Password"
                variant="outlined"
                type="password"
              />
            }
          />
        </div>
        <div className="form-control">
          <Controller
            {...generateErrorPropsForm(errors, "password2", errorsAPI, setError)}
            control={control}
            name="password2"
            defaultValue=""
            rules={{
              required: "Please enter pre password"
            }}
            as={
              <TextField
                style={{ width: "100%" }}
                size="small"
                placeholder="Repeat Password"
                variant="outlined"
                type="password"
              />
            }
          />
        </div>
        <Button
          style={{ width: "100%" }}
          className="login-button"
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          Change password
        </Button>
      </form>
      <DialogCustom
        dialogTitle="Confirm change password"
        dialogContext="Are you sure to change password"
        handleClose={() => setOpenDialog(false)}
        handleAgree={() => {
          // Close Dialog
          setOpenDialog(false);
          // handleSubmit is function has params is a function then return a function
          // handleSubmit(handleChangePassword)(); to call it
          handleSubmit(handleChangePassword)();
        }}
        handleDisagree={() => setOpenDialog(false)}
        open={openDialog}
      />
    </div>
  );
}

FormChangePassword.propTypes = {
  handleFinish: PropTypes.func.isRequired
};
