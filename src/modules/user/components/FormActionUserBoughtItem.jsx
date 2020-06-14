import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Button
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import * as actionsSagaUser from "../actionsSaga";
import * as actionsReducerUI from "../../ui/reducers";
import { MODULE_NAME } from "../models";
import { deleteComment } from "../handlers";

export default function FormActionUserBoughtItem() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const userComments = useSelector(state => state[MODULE_NAME].userComments);
  const [d, setDeleted] = useState(null);

  const handleDeleteComment = id => {
    setDeleted(id);
  };

  const handleChangePage = (e, p) => {
    setPage(p);
  };

  useEffect(() => {
    dispatch(actionsSagaUser.fetchUserComment());
  }, []);

  const handleAgreeDeleteComment = async id => {
    const result = await deleteComment(id);
    try {
      if (result.success) {
        dispatch(actionsReducerUI.SET_SUCCESS_MESSAGE({ message: "Xóa thành công" }));
        dispatch(actionsSagaUser.fetchUserComment());
      } else {
        dispatch(actionsReducerUI.SET_ERROR_MESSAGE(result));
      }
    } catch (error) {
      dispatch(actionsReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
    }
  };

  return (
    <div className="form-action-user-bought-item">
      <h2 style={{ marginBottom: 10 }}>Form Comment</h2>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Comment</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userComments.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(row => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.comment}</TableCell>
                <TableCell align="right">
                  <Rating readOnly value={row.rating} />
                </TableCell>
                <TableCell align="right">{dayjs(row.createdAt).format("DD-MM-YYYY")}</TableCell>
                <TableCell align="right">
                  {d !== row.id ? (
                    <Button onClick={() => handleDeleteComment(row.id)}>
                      <DeleteOutlineOutlinedIcon color="error" />
                    </Button>
                  ) : (
                    <>
                      <Button title="Cancel" onClick={() => setDeleted(null)}>
                        <CancelOutlinedIcon color="secondary" />
                      </Button>
                      <Button onClick={() => handleAgreeDeleteComment(row.id)} title="Agree">
                        <CheckCircleOutlineOutlinedIcon color="primary" />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            rowsPerPage={rowsPerPage}
            count={userComments ? userComments.length : 0}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={e => setRowsPerPage(e.target.value)}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Table>
      </TableContainer>
    </div>
  );
}
