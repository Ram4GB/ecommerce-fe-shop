import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { useHistory } from "react-router-dom";
import * as actionsSagaUser from "../modules/user/actionsSaga";
import { MODULE_NAME } from "../modules/user/models";
import { urlImages } from "../commons/url";
import NumberDisplay from "../commons/components/NumberFormatCurrency";
import ModalCustom from "../commons/components/ModalCustom";
// import FormActionUserBoughtItem from "../modules/user/components/FormActionUserBoughtItem";
import FormRatingUser from "../modules/user/components/FormRatingUser";

export default function CommentPage() {
  const dispatch = useDispatch();
  const itemsUserBought = useSelector(state => state[MODULE_NAME].itemsUserBought);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isToggleModal, setIsToggleModal] = useState(false);
  const [item, setItem] = useState(null);
  const history = useHistory();

  useEffect(() => {
    dispatch(actionsSagaUser.fetchItemUserBought());
  }, []);

  const handleChangePage = (e, p) => {
    setPage(p);
  };

  const handleCloseModal = () => {
    setIsToggleModal(false);
  };

  const handleSelectItem = id => {
    setItem(id);
    setIsToggleModal(true);
  };

  return (
    <div className="wrap-table-user-profile">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsUserBought &&
              itemsUserBought.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(row => (
                <TableRow key={row.name}>
                  <TableCell onClick={() => history.push(`/product/${row.id}`)} align="right">
                    <div className="link">{row.id}</div>
                  </TableCell>
                  <TableCell align="right">
                    {row.Imgs[0] ? (
                      <img alt={row.name} src={`${urlImages}/${row.Imgs[0].Media.url}`} />
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">
                    <NumberDisplay value={row.price} />
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleSelectItem(row.id)} variant="text">
                      <AddCircleOutlineOutlinedIcon color="primary" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TablePagination
            rowsPerPage={rowsPerPage}
            count={itemsUserBought ? itemsUserBought.length : 0}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={e => setRowsPerPage(e.target.value)}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Table>
      </TableContainer>

      <ModalCustom open={isToggleModal} onClose={handleCloseModal}>
        <div className="content-fom">
          <FormRatingUser
            fetchData={() => dispatch(actionsSagaUser.fetchUserComment())}
            itemId={item || "0"}
            handleClose={() => setIsToggleModal(false)}
          />
        </div>
      </ModalCustom>
    </div>
  );
}
