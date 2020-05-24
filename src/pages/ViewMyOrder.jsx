import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, Redirect, useHistory } from "react-router-dom";
import { MODULE_NAME as MODULE_USER } from "../modules/user/models";
import * as actionsSagaOrder from "../modules/user/actionsSaga";

import LayoutContentUser from "../commons/components/LayoutContentUser";

export default function ViewMyOrder() {
  const routeMatch = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const listOrders = useSelector(state => state[MODULE_USER].listOrders);
  const currentOrder = useSelector(state => state[MODULE_USER].currentOrder);

  useEffect(() => {
    dispatch(actionsSagaOrder.fetchListOrders());
    // dispatch(actionsSagaOrder.fetchOrder("YrvhV2GvD"));
  }, []);

  return (
    <LayoutContentUser>
      <div>ViewMyOrder</div>
    </LayoutContentUser>
  );
}
