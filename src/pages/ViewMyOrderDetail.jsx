import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, Link } from "react-router-dom";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import * as actionsSagaOrder from "../modules/user/actionsSaga";
import { MODULE_NAME as MODULE_USER } from "../modules/user/models";

import NumberFormatCurrency from "../commons/components/NumberFormatCurrency";

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

export default function ViewMyOrderDetail() {
  const routeMatch = useRouteMatch();
  const dispatch = useDispatch();

  const listOrdersObj = useSelector(state => state[MODULE_USER].listOrders);
  const currentOrder = useSelector(state => state[MODULE_USER].currentOrder);

  console.log(currentOrder);

  // variables
  const orderId = routeMatch.params.id;

  // useEffects
  useEffect(() => {
    dispatch(actionsSagaOrder.fetchOrder(orderId));
  }, []);

  // get data
  const { order = {} } = currentOrder;

  // helpers
  const getColor = status => {
    switch (status) {
      case "ordered":
        return "rgb(255, 143, 0)";
      case "verified":
        return "rgb(255, 143, 0)";
      case "delivering":
        return "rgb(255, 143, 0)";
      case "delivered":
        return "rgb(40, 167, 69)";
      case "canceled":
        return "rgb(220, 53, 69)";
      default:
        return "#000";
    }
  };

  return (
    <div className="order-detail-container">
      <h2 className="title">Xem đơn hàng</h2>
      <h3>Thông tin</h3>
      <table>
        <tr>
          <td>Mã đơn hàng:</td>
          <td>{order.id}</td>
        </tr>
        <tr>
          <td>Khách hàng:</td>
          <td>{order.userId}</td>
        </tr>
        <tr>
          <td>Trạng thái:</td>
          <td>
            {order.Status ? (
              <p style={{ color: getColor(order.Status.id) }}>{order.Status.name}</p>
            ) : null}
          </td>
        </tr>
        <tr>
          <td>Tổng giá trị:</td>
          <td>
            <NumberFormatCurrency value={order.totalPrice} />
          </td>
        </tr>
        <tr>
          <td>Mã khuyến mãi áp dụng:</td>
          <td>{order.appliedPromotion ? <p>{order.AppliedPromotion.id}</p> : "Không"}</td>
        </tr>
        <tr>
          <td>Phương thức thanh toán:</td>
          <td>
            {order.OrderPayments
              ? order.OrderPayments.map(pay => <p>{pay.paymentMethod.name}</p>)
              : "Không"}
          </td>
        </tr>
        <tr>
          <td>Tạo lúc:</td>
          <td>{new Date(order.createdAt).toLocaleString()}</td>
        </tr>
        <tr>
          <td>Cập nhật lúc:</td>
          <td>{new Date(order.updatedAt).toLocaleString()}</td>
        </tr>
      </table>
      <h3>Người nhận</h3>
      <table>
        <tr>
          <td>Tên:</td>
          <td>{`${order.payee_lastName} ${order.payee_firstName}`}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{order.payee_email}</td>
        </tr>
        <tr>
          <td>Sđt:</td>
          <td>{order.payee_phone}</td>
        </tr>
        <tr>
          <td>Địa chỉ nhận hàng:</td>
          <td>{order.payee_address}</td>
        </tr>
      </table>
      <h3>Chi tiết</h3>
      <TableContainer component={Paper}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell align="right">Mã màu</TableCell>
              <TableCell align="right">Tên sản phẩm</TableCell>
              <TableCell align="right">Đơn giá</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(order.Items || []).map(item => (
              <TableRow key={item.item_id}>
                <TableCell>
                  <Link to={`/product/${item.item_id}`}>{item.item_id}</Link>
                </TableCell>
                <TableCell align="right">{item.item_variationId}</TableCell>
                <TableCell align="right">{item.item_name}</TableCell>
                <TableCell align="right">
                  <NumberFormatCurrency value={item.item_price} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
