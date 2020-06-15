import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Button
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

import { useHistory } from "react-router-dom";
import { MODULE_NAME as MODULE_USER } from "../modules/user/models";
import { urlImages } from "../commons/url";
import { deleteFavItem } from "../modules/user/handlers";

import * as actionsSagaUser from "../modules/user/actionsSaga";
import * as actionsReducerUI from "../modules/ui/reducers";
import NumberDisplay from "../commons/components/NumberFormatCurrency";

export default function FavoritePage() {
  const dispatch = useDispatch();
  const favoritedItem = useSelector(state => state[MODULE_USER].favoritedItem);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [itemSelected, setItemSelected] = useState(null);
  const history = useHistory();

  const handleSelectedItem = id => {
    setItemSelected(id);
  };

  useEffect(() => {
    dispatch(actionsSagaUser.fetchFavItems());
  }, []);

  const handleChangePage = (e, p) => {
    setPage(p);
  };

  const handleDeleteFavItem = async id => {
    const result = await deleteFavItem(id);
    try {
      if (result.success) {
        dispatch(actionsReducerUI.SET_SUCCESS_MESSAGE({ message: "Delete success" }));
        dispatch(actionsSagaUser.fetchFavItems());
      } else {
        dispatch(actionsReducerUI.SET_ERROR_MESSAGE(result));
      }
    } catch (error) {
      dispatch(actionsReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
    }
  };

  return (
    <div className="fav-item-page">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              {/* <TableCell align="right">Scale</TableCell> */}
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {favoritedItem.slice(rowsPerPage * page, rowsPerPage * (page + 1)).map(row => (
              <TableRow key={row.id}>
                <TableCell onClick={() => history.push(`/product/${row.Item.id}`)} align="right">
                  <div className="link">{row.Item.id}</div>
                </TableCell>
                <TableCell align="right">
                  <img src={`${urlImages}/${row.Item.Imgs[0].Media.url}`} alt={row.id} />
                </TableCell>
                <TableCell align="right">{row.Item.name}</TableCell>
                <TableCell align="right">
                  <NumberDisplay value={row.Item.price} />
                </TableCell>
                {/* <TableCell align="right">{row.Item.scaleId}</TableCell> */}
                <TableCell align="right">
                  {itemSelected === row.Item.id ? (
                    <>
                      <Button title="Cancel" onClick={() => setItemSelected(null)}>
                        <CancelOutlinedIcon color="secondary" />
                      </Button>
                      <Button title="Ok" onClick={() => handleDeleteFavItem(row.Item.id)}>
                        <CheckCircleOutlineOutlinedIcon color="primary" />
                      </Button>
                    </>
                  ) : (
                    <Button title="Delete" onClick={() => handleSelectedItem(row.Item.id)}>
                      <DeleteOutlinedIcon color="error" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            rowsPerPage={rowsPerPage}
            count={favoritedItem ? favoritedItem.length : 0}
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
