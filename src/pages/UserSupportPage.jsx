import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector, useDispatch } from "react-redux";
import ModalCustom from "../commons/components/ModalCustom";
import FormAddUserSupportTicket from "../modules/user/components/FormAddUserSupportTicket";
import { MODULE_NAME as MODULE_USER } from "../modules/user/models";

import * as actionsSagaUser from "../modules/user/actionsSaga";

export default function UserSupportPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(null);
  const supportTypes = useSelector(state => state[MODULE_USER].supportTypes);
  const dispatch = useDispatch();

  const handleClickSelectSupportItem = t => {
    setIsOpen(true);
    setType(t);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const renderSupportType = () => {
    return supportTypes
      ? supportTypes.map((item, index) => {
          return (
            <Grid
              onClick={() => handleClickSelectSupportItem(item)}
              item
              lg={4}
              md={6}
              sm={12}
              xs={12}
            >
              <div className="support-cart-item">
                <div className="label">{`#${index}`}</div>
                <h2 className="title">{item.name}</h2>
                <p>{item.description}</p>
              </div>
            </Grid>
          );
        })
      : null;
  };

  useEffect(() => {
    dispatch(actionsSagaUser.fetchSupportTypes());
  }, []);

  return (
    <div className="user-support-page">
      <div className="container-support-type">
        <Grid spacing={6} container>
          {renderSupportType()}
        </Grid>
      </div>

      <ModalCustom onClose={handleCloseModal} open={isOpen}>
        <div className="content-modal">
          <FormAddUserSupportTicket type={type} onClose={handleCloseModal} />
        </div>
      </ModalCustom>
    </div>
  );
}
