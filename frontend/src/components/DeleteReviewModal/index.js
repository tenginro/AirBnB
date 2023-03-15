import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteReview } from "../../store/review";

export default function DeleteReviewModal({ review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const onClick = async (e) => {
    e.preventDefault();
    await dispatch(deleteReview(review))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log(data);
        if (data && data.errors) {
          setErrors(Object.values(data.errors));
        }
      });
    // return history.push("/spots/current");
  };

  return (
    <>
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to delete this review?</h3>
      <button type="button" onClick={onClick}>
        Yes (Delete Review)
      </button>
      <button type="button" onClick={closeModal}>
        No (Keep Review){" "}
      </button>
    </>
  );
}
