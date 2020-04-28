/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextField, Checkbox, Button } from "@material-ui/core";
import _ from "lodash";
import { useDispatch } from "react-redux";
import generateErrorPropsForm from "../../../commons/utils/generateErrorPropsForm";
import * as actionsSagaUI from "../actionsSaga";

export default function Login() {
  const { errors, control, triggerValidation, getValues } = useForm();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    await triggerValidation();
    if (_.isEmpty(errors)) {
      // call api here
      const values = getValues();
      dispatch(actionsSagaUI.login(values));
    }
  };

  return (
    <div>
      <form>
        <div className="form-control">
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Please enter username"
            }}
            as={
              <TextField
                autoComplete="off"
                size="small"
                label="Enter username or email"
                placeholder="Enter username or email"
                variant="outlined"
                {...generateErrorPropsForm(errors, "username")}
                style={{ width: "100%" }}
              />
            }
          />
        </div>
        <div className="form-control">
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Please enter password"
            }}
            as={
              <TextField
                autoComplete="off"
                size="small"
                label="Enter password"
                placeholder="Enter password"
                variant="outlined"
                {...generateErrorPropsForm(errors, "password")}
                style={{ width: "100%" }}
              />
            }
          />
        </div>
        <div className="form-control">
          <Controller
            control={control}
            name="remember"
            as={<Checkbox {...generateErrorPropsForm(errors, "remember")} />}
          />
          Stay signed in
        </div>
        <Button onClick={handleSubmit} className="login-button" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
}
