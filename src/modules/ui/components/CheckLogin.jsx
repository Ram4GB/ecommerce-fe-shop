/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { MODULE_NAME as MODULE_USER } from "../../user/models";
import * as actionsReducerUI from "../reducers";
import ModalCustom from "../../../commons/components/ModalCustom";
import LoginForm from "./LoginForm";

export default function CheckoutCarViewInfomation() {
  const account = useSelector(state => state[MODULE_USER].account);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (account) dispatch(actionsReducerUI.SET_CURRENT_PAGE_CHECKOUT_PAGE("#infomationUser"));
  }, [account]);

  if (!account)
    return (
      <div className="check-login">
        <Alert severity="warning">
          <AlertTitle>
            <strong style={{ fontSize: "1.5rem" }}>Chú ý</strong>
          </AlertTitle>
          <p className="waring-description">Bạn cần đăng nhập để thực hiện bước tiếp theo.</p>
          <Button onClick={handleOpenModal} size="large" color="primary" variant="contained">
            Đăng nhập
          </Button>
          <ModalCustom open={open} onClose={handleCloseModal}>
            <LoginForm />
          </ModalCustom>
        </Alert>
      </div>
    );

  return "";
}
