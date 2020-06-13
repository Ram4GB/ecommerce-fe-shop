import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { commentItem } from "../handlers";
import * as actionsReducerUI from "../../ui/reducers";

export default function FormRatingUser({ handleClose, itemId, fetchData }) {
  const [rating, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmitComment = async () => {
    const e = {};
    if (rating === 0) {
      e.rating = "Please choose rating";
    }
    if (comment === "") {
      e.comment = "Please enter your comment";
    }

    if (!_.isEmpty(e)) return setError(e);

    const result = await commentItem({ itemId, rating, comment });
    try {
      if (result.success) {
        dispatch(actionsReducerUI.SET_SUCCESS_MESSAGE({ message: "Comment successfully" }));
        fetchData();
        handleClose();
      } else {
        dispatch(actionsReducerUI.SET_ERROR_MESSAGE(result));
      }
    } catch (e) {
      dispatch(actionsReducerUI.SET_ERROR_MESSAGE({ message: "Server error" }));
    }
  };

  return (
    <form>
      <h2 style={{ marginBottom: 10 }}>Add review</h2>
      <div className="form-control">
        <h3>Comment</h3>
        <textarea value={comment} onChange={e => setComment(e.target.value)} name="comment" />
        <div className="error">{error && error.comment ? error.comment : ""}</div>
      </div>
      <div className="form-control">
        <h3>Rating</h3>
        <Rating
          value={rating}
          max={5}
          onChange={(event, newValue) => {
            setRate(newValue);
          }}
          name="rating"
        />
        <div className="error">{error && error.rating ? error.rating : ""}</div>
      </div>
      <div style={{ marginTop: 10, textAlign: "right" }}>
        <Button onClick={handleClose} style={{ marginRight: 5 }} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmitComment} variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
}

FormRatingUser.propTypes = {
  handleClose: PropTypes.func.isRequired,
  itemId: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired
};
