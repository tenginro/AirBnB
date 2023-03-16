import { csrfFetch } from "./csrf";

export const LOAD_SPOT_REVIEWS = "reviews/load_reviews";
const CREATE_REVIEW = "reviews/create";
const REMOVE_REVIEW = "reviews/remove";
const CLEAR_STATE = "reviews/clear";

const loadSpotReviews = (reviews, spotId) => ({
  type: LOAD_SPOT_REVIEWS,
  reviews,
  spotId,
});

const actionAddReview = (review, spot) => ({
  type: CREATE_REVIEW,
  review,
  spot,
});
export const actionClearReviewState = () => ({
  type: CLEAR_STATE,
});

const actionRemoveReview = (id) => ({ type: REMOVE_REVIEW, id });

export const getReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    await dispatch(loadSpotReviews(reviews.Reviews, spotId));
    return reviews;
  }
};

export const createReview = (review, spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });

  const newReview = await response.json();

  dispatch(actionAddReview(newReview, spot));
  return response;
};

export const deleteReview = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "delete",
  });
  if (response.ok) {
    dispatch(actionRemoveReview(review.id));
    return await response.json();
  }
  return await response.json();
};

const initialState = {
  spot: {},
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOT_REVIEWS:
      const reviewObj = {};
      action.reviews.forEach((review) => {
        reviewObj[review.id] = review;
      });
      return {
        spot: {
          ...reviewObj,
        },
      };
    case CREATE_REVIEW:
      return {
        spot: { ...state.spot, [action.review.id]: action.review },
      };
    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState.spot[action.id];
      return newState;
    case CLEAR_STATE:
      return { spot: {} };
    default:
      return state;
  }
};
export default reviewReducer;
