import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { deleteReview, getReviews } from "../../store/review";
import { useHistory } from "react-router-dom";
import { getSpotDetail } from "../../store/spot";
import "./DeleteReviewModal.css";

export default function DeleteReviewModal({ review, spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const onClick = async (e) => {
    e.preventDefault();
    await dispatch(deleteReview(review))
      .then(closeModal)
      .then(() => dispatch(getSpotDetail(spotId)))
      .then(() => dispatch(getReviews(spotId)))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(Object.values(data.errors));
        }
      });

    return history.push(`/spots/${spotId}`);
  };

  return (
    <>
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to delete this review?</h3>
      <div className="reviewModalButton">
        <div>
          <button type="button" onClick={onClick}>
            Yes (Delete Review)
          </button>
        </div>
        <div>
          <button type="button" onClick={closeModal}>
            No (Keep Review){" "}
          </button>
        </div>
      </div>
    </>
  );
}
