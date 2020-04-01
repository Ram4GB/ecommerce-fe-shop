/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../modules/ui/actionsSaga";
import { MODULE_NAME as MODULE_UI } from "../modules/ui/models";

export default function TestSagaPage() {
  const dispatch = useDispatch();
  const text = useSelector(state => state[MODULE_UI].text);

  return (
    <div>
      <button onClick={() => dispatch(actions.HELLO_SAGA("Welcome to saga"))}>Hello saga</button>
      <div>{text}</div>
    </div>
  );
}
