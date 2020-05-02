/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { TextField, Grid, RadioGroup, Radio, FormControlLabel, Button } from "@material-ui/core";

import generateErrorPropsForm from "../../../commons/utils/generateErrorPropsForm";
import * as actionsSagaUI from "../actionsSaga";

export default function SignUp() {
  const { errors, control, triggerValidation, getValues } = useForm();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    await triggerValidation();
    if (_.isEmpty(errors)) {
      // call api here
      const values = getValues();
      dispatch(actionsSagaUI.signup(values));
    }
  };

  return (
    <form>
      <div className="form-control">
        <Controller
          defaultValue=""
          control={control}
          name="email"
          rules={{
            required: "Please enter your email"
          }}
          as={
            <TextField
              autoComplete="off"
              size="small"
              label="Enter email"
              placeholder="Enter email"
              variant="outlined"
              {...generateErrorPropsForm(errors, "email")}
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
            required: "Please enter username"
          }}
          as={
            <TextField
              autoComplete="off"
              size="small"
              label="Enter username"
              placeholder="Enter username"
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
            required: "Please enter password"
          }}
          as={
            <TextField
              autoComplete="off"
              size="small"
              label="Enter password"
              placeholder="Enter password"
              variant="outlined"
              type="password"
              {...generateErrorPropsForm(errors, "password")}
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
            required: "Please repeat your password"
          }}
          as={
            <TextField
              autoComplete="off"
              size="small"
              label="Enter repeat password"
              placeholder="Enter repeat password"
              variant="outlined"
              type="password"
              {...generateErrorPropsForm(errors, "password2")}
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
                required: "Please enter first name"
              }}
              as={
                <TextField
                  autoComplete="off"
                  size="small"
                  label="Enter first name"
                  placeholder="Enter  first name"
                  variant="outlined"
                  {...generateErrorPropsForm(errors, "firstName")}
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
                required: "Please enter last name"
              }}
              as={
                <TextField
                  autoComplete="off"
                  size="small"
                  label="Enter last name"
                  placeholder="Enter last name"
                  variant="outlined"
                  {...generateErrorPropsForm(errors, "lastName")}
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
                  label="Birthday"
                  type="date"
                  // className={classes.textField}
                  // InputLabelProps={{
                  //   shrink: true
                  // }}
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
                label="Enter phone number"
                placeholder="Enter phone number"
                variant="outlined"
                {...generateErrorPropsForm(errors, "phoneNumber")}
                style={{ width: "100%" }}
              />
            }
          />
        </div>
        <div className="form-control">
          <div className="label">Gender</div>
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
                  label="Female"
                />
                <FormControlLabel
                  labelPlacement="end"
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  labelPlacement="end"
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            }
          />
        </div>
      </div>
      <Button onClick={handleSubmit} className="login-button">
        Register
      </Button>
    </form>
  );
}
