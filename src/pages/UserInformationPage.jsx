/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Checkbox
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import generateErrorPropsForm from "../commons/utils/generateErrorPropsForm";
import { MODULE_NAME as MODULE_USER } from "../modules/user/models";
import * as actionsSagaUser from "../modules/user/actionsSaga";
import * as actionsReducerUI from "../modules/ui/reducers";
import ModalCustom from "../commons/components/ModalCustom";
import FormChangePassword from "../modules/ui/components/FormChangePassword";
import { MODULE_NAME as MODULE_UI } from "../modules/ui/models";

export default function UserInformationPage() {
  const { control, errors, setError, handleSubmit, setValue } = useForm();
  const account = useSelector(state => state[MODULE_USER].account);
  const errorsUpdateForm = useSelector(state => state[MODULE_UI].errorsUpdateForm);
  const isCheckUpdateInfo = useSelector(state => state[MODULE_UI].checkoutPage.isCheckUpdateInfo);
  const userRedux = useSelector(state => state[MODULE_UI].checkoutPage.values);
  const isError = useSelector(state => state[MODULE_UI].checkoutPage.isError);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);

  useEffect(() => {
    dispatch(actionsSagaUser.syncMe());
    if (history.location.pathname === "/checkout-version-2") {
      setIsCheckoutPage(true);
    }
  }, [dispatch, history]);

  useEffect(() => {
    if (isCheckUpdateInfo === false && !_.isEmpty(userRedux)) {
      setValue("firstName", userRedux.firstName);
      setValue("lastName", userRedux.lastName);
      setValue("phone", userRedux.phone);
      setValue("address", userRedux.address);
    } else {
      setValue("firstName", account.User.Info.firstName);
      setValue("lastName", account.User.Info.lastName);
      setValue("phone", account.User.Info.phone);
      setValue("address", account.User.Info.address);
    }
  }, [account]);

  const requireInputArray = ["address", "phone"];

  const handleUpdateInfor = async values => {
    if (isCheckoutPage) {
      if (isCheckUpdateInfo) {
        // update infor
        actionsReducerUI.SET_IS_ERROR_PAYMENT(false);
        requireInputArray.forEach(key => {
          if (values[key] === "") {
            setError(key, null, `Please enter ${key}`);
            actionsReducerUI.SET_IS_ERROR_PAYMENT(true);
          }
        });

        if (!isError) {
          dispatch(actionsReducerUI.SET_UPDATE_FORM_ERRORS(""));
          dispatch(actionsSagaUser.updateInfo({ ...values, birthday: account.User.Info.birthday }));
          dispatch(actionsSagaUser.syncMe());
          dispatch(actionsReducerUI.SET_CURRENT_PAGE_CHECKOUT_PAGE("#payment"));
        }
      } else {
        actionsReducerUI.SET_IS_ERROR_PAYMENT(false);
        let e = false;
        requireInputArray.forEach(key => {
          if (values[key] === "") {
            setError(key, null, `Please enter ${key}`);
            actionsReducerUI.SET_IS_ERROR_PAYMENT(true);
            e = true;
          }
        });

        if (e === false) {
          dispatch(actionsReducerUI.SET_VALUE_FORM_CHECKOUT(values));
          dispatch(actionsReducerUI.SET_CURRENT_PAGE_CHECKOUT_PAGE("#payment"));
        }
      }
    } else {
      dispatch(actionsReducerUI.SET_UPDATE_FORM_ERRORS(""));
      dispatch(actionsSagaUser.updateInfo(values));
    }
  };

  const handleFinish = () => {
    setOpenModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleUpdateInfor)} className="form-profile">
        {!isCheckoutPage ? (
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
        ) : null}
        {!isCheckoutPage ? (
          <div className="form-control">
            <h3>Tài khoản</h3>
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
        ) : null}
        <div className="form-control">
          <Grid spacing={2} container>
            <Grid item md={12} sm={12} xs={12} lg={6}>
              <h3>Tên</h3>
              <Controller
                rules={{
                  required: "Please enter first name"
                }}
                defaultValue={account && account.User && account.User.Info.firstName}
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
              <h3>Họ và tên đệm</h3>
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
          <h3>Số điện thoại</h3>
          <Controller
            defaultValue={
              account && account.User && account.User.Info ? account.User.Info.phone : ""
            }
            name="phone"
            control={control}
            {...generateErrorPropsForm(errors, "phone", errorsUpdateForm, setError)}
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
          <h3>Địa chỉ</h3>
          <Controller
            defaultValue={
              account && account.User && account.User.Info ? account.User.Info.address : ""
            }
            rules={
              isCheckoutPage
                ? {
                    required: "Please enter address"
                  }
                : {}
            }
            {...generateErrorPropsForm(errors, "address", errorsUpdateForm, setError)}
            name="address"
            control={control}
            as={
              <TextField
                style={{ width: "100%" }}
                placeholder="Address"
                variant="outlined"
                size="small"
              />
            }
          />
        </div>
        {!isCheckoutPage ? (
          <div className="form-control">
            <h3>Giới tính</h3>
            <Controller
              name="gender"
              control={control}
              defaultValue={
                account && account.User && account.User.Info ? account.User.Info.gender : "m"
              }
              as={
                <RadioGroup>
                  <FormControlLabel
                    labelPlacement="end"
                    value="m"
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel labelPlacement="end" value="f" control={<Radio />} label="Nữ" />
                  <FormControlLabel
                    labelPlacement="end"
                    value="o"
                    control={<Radio />}
                    label="Khác"
                  />
                </RadioGroup>
              }
            />
          </div>
        ) : null}
        {!isCheckoutPage ? (
          <div className="form-control">
            <h3>Ngày sinh</h3>
            <Controller
              name="birthday"
              control={control}
              defaultValue={
                account && account.User && account.User.Info
                  ? dayjs(account.User.Info.birthday).format("YYYY-MM-DD")
                  : ""
              }
              as={
                <TextField
                  disabled={isCheckoutPage}
                  style={{ width: "100%" }}
                  variant="outlined"
                  size="small"
                  type="date"
                />
              }
            />
          </div>
        ) : null}
        {!isCheckoutPage ? (
          <Button onClick={() => setOpenModal(true)} style={{ width: "100%" }} variant="contained">
            Đổi mật khẩu
          </Button>
        ) : null}
        {isCheckoutPage ? (
          <div className="form-control">
            <h3>Lưu thay đổi</h3>
            <Checkbox
              value={isCheckUpdateInfo}
              checked={isCheckUpdateInfo}
              onChange={e => {
                dispatch(actionsReducerUI.SET_IS_CHECK_UPDATE_INFO(!isCheckUpdateInfo));
              }}
            />
            <span style={{ fontSize: "0.9rem", color: "#777" }}>
              Cập nhật thông tin cá nhân của bạn với những dữ liệu nên trên
            </span>
          </div>
        ) : null}
        <Button
          type="submit"
          style={{ width: "100%", marginTop: 15, marginBottom: 15 }}
          variant="contained"
          color="primary"
        >
          {!isCheckoutPage ? "Cập nhật thông tin" : "Tiếp theo"}
        </Button>
      </form>

      <ModalCustom onClose={() => setOpenModal(false)} open={openModal}>
        <FormChangePassword handleFinish={handleFinish} />
      </ModalCustom>
    </>
  );
}
