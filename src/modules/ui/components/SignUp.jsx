/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { TextField, Grid, RadioGroup, Radio, FormControlLabel, Button } from "@material-ui/core";

import { MODULE_NAME as MODULE_UI } from "../models";
import generateErrorsSignupForm from "../../../commons/utils/generateErrorsSignupForm";
import * as actionsSagaUI from "../actionsSaga";

export default function SignUp() {
  const { control, triggerValidation, getValues } = useForm();
  const dispatch = useDispatch();
  const errorsSignupForm = useSelector(state => state[MODULE_UI].errorsSignupForm);

  const handleSubmit = async () => {
    await triggerValidation();
    const values = getValues();
    dispatch(actionsSagaUI.signup(values));
  };

  return (
    <form>
      <div className="form-control">
        <Controller
          defaultValue=""
          control={control}
          name="email"
          rules={{
            required: "Vui lòng nhập email"
          }}
          as={
            <TextField
              autoComplete="off"
              size="small"
              label="Enter email"
              placeholder="Enter email"
              variant="outlined"
              {...generateErrorsSignupForm(errorsSignupForm, "email")}
              style={{ width: "100%" }}
            />
          }
        />
      </div>
      <div className="form-control">
        <Controller
          defaultValue=""
          control={control}
          name="username"
          rules={{
            required: "Vui lòng nhập tên tài khoản"
          }}
          as={
            <TextField
              autoComplete="off"
              size="small"
              label="Enter username"
              placeholder="Enter username"
              variant="outlined"
              {...generateErrorsSignupForm(errorsSignupForm, "username")}
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
              autoComplete="off"
              size="small"
              label="Enter password"
              placeholder="Enter password"
              variant="outlined"
              type="password"
              {...generateErrorsSignupForm(errorsSignupForm, "password")}
              style={{ width: "100%" }}
            />
          }
        />
      </div>
      <div className="form-control">
        <Controller
          defaultValue=""
          control={control}
          name="password2"
          rules={{
            required: "Vui lòng nhập lại mật khẩu"
          }}
          as={
            <TextField
              autoComplete="off"
              size="small"
              label="Enter repeat password"
              placeholder="Enter repeat password"
              variant="outlined"
              type="password"
              {...generateErrorsSignupForm(errorsSignupForm, "password2")}
              style={{ width: "100%" }}
            />
          }
        />
      </div>
      <div className="form-control">
        <Grid spacing={8} container>
          <Grid item>
            <Controller
              defaultValue=""
              control={control}
              name="firstName"
              rules={{
                required: "Vui lòng nhập tên"
              }}
              as={
                <TextField
                  autoComplete="off"
                  size="small"
                  label="Nhập tên"
                  placeholder="Nhập tên"
                  variant="outlined"
                  {...generateErrorsSignupForm(errorsSignupForm, "firstName")}
                  style={{ width: "100%" }}
                />
              }
            />
          </Grid>
          <Grid item>
            <Controller
              defaultValue=""
              control={control}
              name="lastName"
              rules={{
                required: "Vui lòng nhập họ"
              }}
              as={
                <TextField
                  autoComplete="off"
                  size="small"
                  label="Nhập họ"
                  placeholder="Nhập họ"
                  variant="outlined"
                  {...generateErrorsSignupForm(errorsSignupForm, "lastName")}
                  style={{ width: "100%" }}
                />
              }
            />
          </Grid>
          <Grid item>
            <Controller
              defaultValue="2000-01-01"
              control={control}
              name="birthday"
              as={
                <TextField
                  id="date"
                  label="Ngày sinh"
                  type="date"
                  {...generateErrorsSignupForm(errorsSignupForm, "birthday")}
                />
              }
            />
          </Grid>
        </Grid>
        <div className="form-control">
          <Controller
            defaultValue=""
            control={control}
            name="phoneNumber"
            as={
              <TextField
                autoComplete="off"
                size="small"
                label="Số điện thoại"
                placeholder="Số điện thoại"
                variant="outlined"
                {...generateErrorsSignupForm(errorsSignupForm, "phone")}
                style={{ width: "100%" }}
              />
            }
          />
        </div>
        <div className="form-control">
          <div className="label">Giới tính</div>
          <Controller
            defaultValue="male"
            control={control}
            name="gender"
            as={
              <RadioGroup>
                <FormControlLabel
                  labelPlacement="end"
                  value="female"
                  control={<Radio />}
                  label="Nữ"
                />
                <FormControlLabel
                  labelPlacement="end"
                  value="male"
                  control={<Radio />}
                  label="Nam"
                />
                <FormControlLabel
                  labelPlacement="end"
                  value="other"
                  control={<Radio />}
                  label="Khác"
                />
              </RadioGroup>
            }
          />
        </div>
      </div>
      <Button onClick={handleSubmit} className="login-button">
        Đăng Ký
      </Button>
    </form>
  );
}
