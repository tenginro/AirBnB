import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

import "./CreateReviewModal.css";
import { createReview, getReviews } from "../../store/review";
import { getSpotDetail } from "../../store/spot";

export default function CreateReviewModal({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [activeRating, setActiveRating] = useState(0);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const onClick = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      review,
      stars: activeRating,
    };
    let newReview = await dispatch(createReview(payload, spot))
      .then(closeModal)
      .then(() => dispatch(getSpotDetail(spot.id)))
      .then(() => dispatch(getReviews(spot.id)))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) setErrors(data.message);
      });
    if (newReview) {
      setErrors({});
      return history.push(`/spots/${spot.id}`);
    }
  };

  return (
    <div id="createReviewForm">
      <h2>How was your stay?</h2>
      <form>
        {errors && <div className="errors">{errors}</div>}
        <textarea
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave your review here..."
        ></textarea>

        <div className="rating-input">
          <div
            className={activeRating >= 1 ? "filled" : "empty"}
            onMouseEnter={() => {
              setActiveRating(1);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
          <div
            className={activeRating >= 2 ? "filled" : "empty"}
            onMouseEnter={() => {
              setActiveRating(2);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
          <div
            className={activeRating >= 3 ? "filled" : "empty"}
            onMouseEnter={() => {
              setActiveRating(3);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
          <div
            className={activeRating >= 4 ? "filled" : "empty"}
            onMouseEnter={() => {
              setActiveRating(4);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
          <div
            className={activeRating >= 5 ? "filled" : "empty"}
            onMouseEnter={() => {
              setActiveRating(5);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
          <div>Stars</div>
        </div>
        <div className="submitReview">
          <button
            className={
              review.length <= 10
                ? "submitReviewButtonDisabled"
                : "submitReviewButton"
            }
            type="button"
            disabled={review.length <= 10}
            onClick={onClick}
          >
            Submit Your Review
          </button>
        </div>
      </form>
    </div>
  );
}
