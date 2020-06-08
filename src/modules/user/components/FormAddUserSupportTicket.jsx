/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Radio,
  Input
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import datejs from "dayjs";
import PropTypes from "prop-types";
import { MODULE_NAME as MODULE_USER } from "../models";
import * as actionSagaUser from "../actionsSaga";
import NumberDisplay from "../../../commons/components/NumberFormatCurrency";
import { fetchAuthLoading } from "../../../commons/utils/fetch";
import { url } from "../../../commons/url";
import * as actionsReducerUI from "../../ui/reducers";

export default function FormAddUserSupportTicket({ onClose, type }) {
  const { control, handleSubmit, errors, setValue } = useForm();
  const dispatch = useDispatch();

  const listOrders = useSelector(state => state[MODULE_USER].listOrders.orders);
  const supportTypes = useSelector(state => state[MODULE_USER].supportTypes);

  const [page, setPage] = useState(0);
  const [isToggleTableOrder, setIsToggleTableOrder] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSubmitForm = () => {
    handleSubmit(async values => {
      const data = {
        ...values
      };
      data.supportTypeId = type.id;
      if (selectedValue) data.orderId = selectedValue;
      const result = await fetchAuthLoading({
        url: `${url}/support`,
        data,
        method: "POST"
      });

      try {
        if (result.success) {
          // close form
          // load api
          onClose();
          dispatch(
            actionsReducerUI.SET_SUCCESS_MESSAGE({ message: "Send successfull support ticket" })
          );
        } else {
          dispatch(actionsReducerUI.SET_ERROR_MESSAGE(result));
        }
      } catch (error) {
        dispatch(actionsReducerUI.SET_ERROR_MESSAGE("Server error"));
      }
    })();
  };

  useEffect(() => {
    dispatch(actionSagaUser.fetchListOrders());
    dispatch(actionSagaUser.fetchSupportTypes());
  }, []);

  useEffect(() => {
    setValue("supportTypeId", type.name);
  }, [supportTypes]);

  const handleChangePage = (e, p) => {
    setPage(p);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <h3 className="form-title">Form Add new support ticket</h3>
        <div className="form-control">
          <div className="label">
            <span>Support Type</span>
          </div>
          <Controller
            control={control}
            name="supportTypeId"
            rules={{
              required: "Please choose any support type"
            }}
            style={{ width: "100%" }}
            as={<Input disabled />}
          />
          <div className="error">
            {errors && errors.supportTypeId ? errors.supportTypeId.message : ""}
          </div>
        </div>
        <div className="form-control">
          <div className="label">
            <span>Order ID (Optional)</span>
            <span style={{ color: "red" }}>*</span>
            <div>
              <Radio
                style={{ paddingLeft: 0 }}
                onChange={() => setIsToggleTableOrder(false)}
                checked={isToggleTableOrder === false}
              />
              <span style={{ fontSize: "0.8rem" }}>None</span>
              <Radio onChange={() => setIsToggleTableOrder(true)} checked={isToggleTableOrder} />
              <span style={{ fontSize: "0.8rem" }}>Include</span>
            </div>
          </div>
        </div>
        {isToggleTableOrder ? (
          <div className="form-control">
            <TableContainer className="table-support-ticket" component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" />
                    <TableCell align="left">Order ID</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Total payment</TableCell>
                    <TableCell align="right">Create at</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listOrders &&
                    listOrders
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(row => (
                        <TableRow key={row.id}>
                          <TableCell align="left">
                            <Radio
                              onChange={e => setSelectedValue(e.target.value)}
                              value={row.id}
                              checked={selectedValue === row.id}
                            />
                          </TableCell>
                          <TableCell align="left">{row.id}</TableCell>
                          <TableCell align="right">{row.Status.name}</TableCell>
                          <TableCell align="right">
                            <NumberDisplay value={row.totalPrice} />
                          </TableCell>
                          <TableCell align="right">
                            {datejs(row.createdAt).format("YYYY-MM-DD")}
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
                <TablePagination
                  rowsPerPage={rowsPerPage}
                  count={listOrders ? listOrders.length : 0}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={e => setRowsPerPage(e.target.value)}
                  rowsPerPageOptions={[5, 10, 25]}
                />
              </Table>
            </TableContainer>
          </div>
        ) : null}
        <div className="form-control">
          <div className="label">
            <span>Note</span>
            <span style={{ color: "red" }}>*</span>
          </div>
          <Controller
            control={control}
            name="note"
            rules={{
              required: "Please choose any order"
            }}
            as={<textarea className="textarea" />}
          />
          <div className="error">{errors && errors.note ? errors.note.message : ""}</div>
        </div>
        <div className="group-button">
          <Button onClick={onClose} className="btn-cancle" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitForm}
            className="btn-submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

FormAddUserSupportTicket.propTypes = {
  onClose: PropTypes.func.isRequired,
  type: PropTypes.object.isRequired
};
