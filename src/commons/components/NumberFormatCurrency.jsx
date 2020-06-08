/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import PropTypes from "prop-types";
import numeral from "numeral";

const NumberDisplay = ({ value }) => {
  return <>{value ? <>{numeral(value).format("0,0")} ₫</> : null}</>;
};

export default NumberDisplay;

// PropTypes
NumberDisplay.propTypes = {
  value: PropTypes.number.isRequired
};
