import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, Redirect, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import * as actionsSagaOrder from "../modules/user/actionsSaga";
import { MODULE_NAME as MODULE_USER } from "../modules/user/models";
import LayoutContentUser from "../commons/components/LayoutContentUser";

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

export default function ViewMyOrder() {
  const classes = useStyles1();
  const routeMatch = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const listOrdersObj = useSelector(state => state[MODULE_USER].listOrders);
  const currentOrder = useSelector(state => state[MODULE_USER].currentOrder);

  // stages
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // variables
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, listOrdersObj.count - page * rowsPerPage);
  const listOrders = listOrdersObj.orders || [];

  useEffect(() => {
    dispatch(actionsSagaOrder.fetchListOrders());
    // dispatch(actionsSagaOrder.fetchOrder("YrvhV2GvD"));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <LayoutContentUser>
      <p style={{ width: "100%", textAlign: "center", fontSize: "1.25rem" }}>
        {`You have ${listOrdersObj.count} orders`}
      </p>
      <TableContainer component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Items</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Total Payment</TableCell>
              <TableCell align="right">Created at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? listOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : listOrders
            ).map((order, i) => (
              <TableRow key={order.id}>
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell align="right">
                  {order.Items.map(item => (
                    <a key={item.id} href={`/product/${item.item_id}`}>
                      {item.item_name}
                    </a>
                  ))}
                </TableCell>
                <TableCell align="right">{order.Status.name}</TableCell>
                <TableCell align="right">{order.totalPrice.toLocaleString("en-US")}</TableCell>
                <TableCell align="right">{order.updatedAt}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={listOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutContentUser>
  );
}
