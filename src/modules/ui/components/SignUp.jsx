/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextField, Grid, RadioGroup, Radio, FormControlLabel, Button } from "@material-ui/core";
import generateErrorPropsForm from "../../../commons/utils/generateErrorPropsForm";

export default function SignUp() {
  const { errors, control } = useForm();

  return (
    <form>
      <div className="form-control">
        <Controller
          control={control}
          name="email"
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
          control={control}
          name="username"
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
          control={control}
          name="password"
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
          name="repeatPassword"
          as={
            <TextField
              autoComplete="off"
              size="small"
              label="Enter repeat password"
              placeholder="Enter repeat password"
              variant="outlined"
              {...generateErrorPropsForm(errors, "repeatPassword")}
              style={{ width: "100%" }}
            />
          }
        />
      </div>
      <div className="form-control">
        <Grid spacing={8} container>
          <Grid item={6}>
            <Controller
              control={control}
              name="firstName"
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
          <Grid item={6}>
            <Controller
              control={control}
              name="lastName"
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
        </Grid>
        <div className="form-control">
          <Controller
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
      <Button className="login-button">Register</Button>
    </form>
  );
}
