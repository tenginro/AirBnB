import { csrfFetch } from "./csrf";

export const LOAD_SPOT_REVIEWS = "reviews/load_reviews";
export const LOAD_USER_REVIEWS = "users/load_user_reviews";

const CREATE_REVIEW = "reviews/create";
const UPDATE_REVIEW = "reviews/update";
const REMOVE_REVIEW = "reviews/remove";

const CLEAR_STATE = "reviews/clear_state";
const CLEAR_USER_REVIEWS = "reviews/clear_user_reviews";

const loadSpotReviews = (reviews, spotId) => ({
  type: LOAD_SPOT_REVIEWS,
  reviews,
  spotId,
});

const loadUserReviews = (reviews) => ({
  type: LOAD_USER_REVIEWS,
  reviews,
});

const actionAddReview = (review, spot) => ({
  type: CREATE_REVIEW,
  review,
  spot,
});

const actionUpdateReview = (review, spot) => ({
  type: UPDATE_REVIEW,
  review,
  spot,
});
export const actionClearReviewState = () => ({
  type: CLEAR_STATE,
});
export const actionClearUserReviews = () => ({
  type: CLEAR_USER_REVIEWS,
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

export const getUserReviews = () => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/current`);

  if (response.ok) {
    const reviews = await response.json();
    await dispatch(loadUserReviews(reviews.Reviews));
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

export const updateReview = (review, spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const updated = await response.json();
    dispatch(actionUpdateReview(updated, spot));
    return response;
  }
};

export const deleteReview = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(actionRemoveReview(review.id));
    return await response.json();
  }
  return await response.json();
};

const initialState = {
  spot: {},
  user: {},
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOT_REVIEWS:
      const reviewObj = {};
      action.reviews.forEach((review) => {
        reviewObj[review.id] = review;
      });
      return {
        ...state,
        spot: {
          ...reviewObj,
        },
      };
    case LOAD_USER_REVIEWS:
      const userReviewObj = {};
      action.reviews.forEach((review) => {
        userReviewObj[review.id] = review;
      });
      return {
        ...state,
        user: {
          ...userReviewObj,
        },
      };
    case CREATE_REVIEW:
      return {
        ...state,
        spot: { ...state.spot, [action.review.id]: action.review },
        user: { ...state.user, [action.review.id]: action.review },
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        spot: { ...state.spot, [action.review.id]: action.review },
        user: { ...state.user, [action.review.id]: action.review },
      };
    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState.spot[action.id];
      delete newState.user[action.id];
      return newState;
    case CLEAR_STATE:
      return { ...state, spot: {} };
    case CLEAR_USER_REVIEWS:
      return { ...state, user: {} };
    default:
      return state;
  }
};
export default reviewReducer;
