import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

import "../CreateReviewModal/CreateReviewModal.css";
import { createReview, getReviews, updateReview } from "../../store/review";
import { getSpotDetail } from "../../store/spot";

export default function UpdateReviewModal({ spot, oriReview }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState(oriReview.review);
  const [activeRating, setActiveRating] = useState(oriReview.stars);
  const [realRating, setRealRating] = useState(oriReview.stars);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const onClick = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      id: oriReview.id,
      review,
      stars: realRating,
    };

    let updatedReview = await dispatch(updateReview(payload, spot))
      .then(closeModal)
      .then(() => dispatch(getSpotDetail(spot.id)))
      .then(() => dispatch(getReviews(spot.id)))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) setErrors(data.message);
      });
    if (updatedReview) {
      setErrors({});
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
            className={
              activeRating >= 1 ? "reviewStar filled" : "reviewStar empty"
            }
            onMouseEnter={() => {
              setActiveRating(1);
            }}
            onMouseLeave={() => {
              setActiveRating(realRating);
            }}
            onClick={() => {
              setRealRating(1);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
          <div
            className={
              activeRating >= 2 ? "reviewStar filled" : "reviewStar empty"
            }
            onMouseEnter={() => {
              setActiveRating(2);
            }}
            onMouseLeave={() => {
              setActiveRating(realRating);
            }}
            onClick={() => {
              setRealRating(2);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
          <div
            className={
              activeRating >= 3 ? "reviewStar filled" : "reviewStar empty"
            }
            onMouseEnter={() => {
              setActiveRating(3);
            }}
            onMouseLeave={() => {
              setActiveRating(realRating);
            }}
            onClick={() => {
              setRealRating(3);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
          <div
            className={
              activeRating >= 4 ? "reviewStar filled" : "reviewStar empty"
            }
            onMouseEnter={() => {
              setActiveRating(4);
            }}
            onMouseLeave={() => {
              setActiveRating(realRating);
            }}
            onClick={() => {
              setRealRating(4);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
          <div
            className={
              activeRating >= 5 ? "reviewStar filled" : "reviewStar empty"
            }
            onMouseEnter={() => {
              setActiveRating(5);
            }}
            onMouseLeave={() => {
              setActiveRating(realRating);
            }}
            onClick={() => {
              setRealRating(5);
            }}
          >
            <i className="fas fa-regular fa-star"></i>
          </div>
          <div>Stars</div>
        </div>
        <div className="submitReview">
          <button
            className={
              review.length <= 10 && realRating < 1
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
