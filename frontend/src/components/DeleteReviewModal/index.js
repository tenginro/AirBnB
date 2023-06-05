import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    // Whenever a route change occurs (including redirects), the callback function inside the useEffect will be triggered, and it will scroll the window to the top using window.scrollTo(0, 0). This ensures that the page is scrolled to the top
    const unListen = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unListen();
    };
  }, [history]);

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
        <button className="yesButton" type="button" onClick={onClick}>
          Yes (Delete Review)
        </button>
        <button className="noButton" type="button" onClick={closeModal}>
          No (Keep Review)
        </button>
      </div>
    </>
  );
}
