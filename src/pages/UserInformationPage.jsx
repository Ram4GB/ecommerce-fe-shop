/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextField, Grid, RadioGroup, FormControlLabel, Radio, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import LayoutContentUser from "../commons/components/LayoutContentUser";
import generateErrorPropsForm from "../commons/utils/generateErrorPropsForm";
import { MODULE_NAME as MODULE_USER } from "../modules/user/models";
import * as actionsSagaUser from "../modules/user/actionsSaga";
import * as actionsReducerUI from "../modules/ui/reducers";
import ModalCustom from "../commons/components/ModalCustom";
import FormChangePassword from "../modules/ui/components/FormChangePassword";
import { MODULE_NAME as MODULE_UI } from "../modules/ui/models";

export default function UserInformationPage() {
  const { control, errors, setError, handleSubmit } = useForm();
  const account = useSelector(state => state[MODULE_USER].account);
  const errorsUpdateForm = useSelector(state => state[MODULE_UI].errorsUpdateForm);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleUpdateInfor = async values => {
    dispatch(actionsReducerUI.SET_UPDATE_FORM_ERRORS(""));
    dispatch(actionsSagaUser.updateInfo(values));
  };

  const handleFinish = () => {
    setOpenModal(false);
  };

  return (
    <LayoutContentUser>
      <form onSubmit={handleSubmit(handleUpdateInfor)} className="form-profile">
        <div className="form-control">
          <h3>Email</h3>
          <Controller
            name="email"
            rules={{
              required: "Please enter email"
            }}
            control={control}
            defaultValue={account && account.email ? account.email : ""}
            as={
              <TextField
                disabled
                {...generateErrorPropsForm(errors, "email", errorsUpdateForm, setError)}
                style={{ width: "100%" }}
                placeholder="Email"
                variant="outlined"
                size="small"
              />
            }
          />
        </div>
        <div className="form-control">
          <h3>Username</h3>
          <Controller
            name="username"
            rules={{
              required: "Please enter username"
            }}
            {...generateErrorPropsForm(errors, "username", errorsUpdateForm, setError)}
            control={control}
            defaultValue={account && account.username ? account.username : ""}
            as={
              <TextField
                disabled
                style={{ width: "100%" }}
                placeholder="Username"
                variant="outlined"
                size="small"
              />
            }
          />
        </div>
        <div className="form-control">
          <Grid spacing={2} container>
            <Grid item md={12} sm={12} xs={12} lg={6}>
              <h3>First name</h3>
              <Controller
                rules={{
                  required: "Please enter first name"
                }}
                defaultValue={
                  account && account.User && account.User.Info ? account.User.Info.firstName : ""
                }
                name="firstName"
                {...generateErrorPropsForm(errors, "firstName", errorsUpdateForm, setError)}
                control={control}
                as={
                  <TextField
                    style={{ width: "100%" }}
                    placeholder="First name"
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12} lg={6}>
              <h3>Last name</h3>
              <Controller
                name="lastName"
                defaultValue={
                  account && account.User && account.User.Info ? account.User.Info.lastName : ""
                }
                rules={{
                  required: "Please enter last name"
                }}
                {...generateErrorPropsForm(errors, "lastName", errorsUpdateForm, setError)}
                control={control}
                as={
                  <TextField
                    style={{ width: "100%" }}
                    placeholder="Last name"
                    variant="outlined"
                    size="small"
                  />
                }
              />
            </Grid>
          </Grid>
        </div>
        <div className="form-control">
          <h3>Phone</h3>
          <Controller
            defaultValue={
              account && account.User && account.User.Info ? account.User.Info.phone : ""
            }
            name="phone"
            control={control}
            as={
              <TextField
                style={{ width: "100%" }}
                placeholder="Phone number"
                variant="outlined"
                size="small"
              />
            }
          />
        </div>
        <div className="form-control">
          <h3>Gender</h3>
          <Controller
            name="gender"
            control={control}
            defaultValue={
              account && account.User && account.User.Info ? account.User.Info.gender : "m"
            }
            as={
              <RadioGroup>
                <FormControlLabel labelPlacement="end" value="m" control={<Radio />} label="Male" />
                <FormControlLabel
                  labelPlacement="end"
                  value="f"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  labelPlacement="end"
                  value="o"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            }
          />
        </div>
        <div className="form-control">
          <h3>Birthday</h3>
          <Controller
            name="birthday"
            control={control}
            defaultValue={
              account && account.User && account.User.Info
                ? dayjs(account.User.Info.birthday).format("YYYY-MM-DD")
                : ""
            }
            as={<TextField style={{ width: "100%" }} variant="outlined" size="small" type="date" />}
          />
        </div>
        <Button onClick={() => setOpenModal(true)} style={{ width: "100%" }} variant="contained">
          Change password
        </Button>
        <Button
          type="submit"
          style={{ width: "100%", marginTop: 15 }}
          variant="contained"
          color="primary"
        >
          Update Infomation
        </Button>
      </form>

      <ModalCustom onClose={() => setOpenModal(false)} open={openModal}>
        <FormChangePassword handleFinish={handleFinish} />
      </ModalCustom>
    </LayoutContentUser>
  );
}
