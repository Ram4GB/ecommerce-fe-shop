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
            defaultValue=""
            control={control}
            name="username"
            rules={{
              required: "Vui lòng nhập tài khoản"
            }}
            as={
              <TextField
                autoComplete="off"
                size="small"
                label="Nhập tên tài khoản hoặc email"
                placeholder="Nhập tên tài khoản hoặc email"
                variant="outlined"
                {...generateErrorPropsForm(errors, "username")}
                style={{ width: "100%" }}
              />
            }
          />
        </div>
        <div className="form-control">
          <Controller
            defaultValue=""
            control={control}
            name="password"
            rules={{
              required: "Vui lòng nhập mật khẩu"
            }}
            as={
              <TextField
                type="password"
                autoComplete="off"
                size="small"
                label="Mật khẩu"
                placeholder="Mật khẩu"
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
            onChange={([e, isChecked]) => {
              return isChecked;
            }}
            defaultValue={false}
            name="remember"
            as={Checkbox}
          />
          Nhớ đăng nhập
        </div>
        <Button onClick={handleSubmit} className="login-button" variant="contained">
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}
