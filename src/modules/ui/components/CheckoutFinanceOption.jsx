import React, { useState } from "react";
import { Select } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { SET_CURRENT_PAGE_CHECKOUT_PAGE } from "../reducers";

export default function CheckoutFinanceOptions() {
  const [type, setType] = useState("cash");
  const dispatch = useDispatch();

  const renderPrice = () => {
    switch (type) {
      case "cash":
        return <div>Price: 123$</div>;
      case "loan":
        return (
          <div>
            <div>Downpayment: 123</div>
            <div>Loanterm: 123</div>
            <div>APR: 123</div>
          </div>
        );
      default:
        return "";
    }
  };

  return (
    <div className="checkout-finance-options">
      <div className="form-control">
        <Select defaultValue={type} onChange={e => setType(e.target.value)} native>
          <option value="cash">Cash</option>
          <option value="loan">Loan</option>
        </Select>

        {renderPrice()}
        <button
          onClick={() => dispatch(SET_CURRENT_PAGE_CHECKOUT_PAGE("#payment"))}
          className="button-next"
          type="button"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
