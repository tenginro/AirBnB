import { csrfFetch } from "./csrf";

export const LOAD_SPOT_REVIEWS = "reviews/load_reviews";
const CREATE_REVIEW = "reviews/create";
const REMOVE_REVIEW = "reviews/";

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
  // console.log(spot);
  // console.log(review);
  const response = await csrfFetch(`/api/spots/${spot.id}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });

  const newReview = await response.json();
  // console.log(response.message);

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
    case CREATE_REVIEW:
      return {
        ...state,
        spot: { ...state.spot, [action.review.id]: action.review },
        user: { ...state.user, [action.review.id]: action.review },
      };
    default:
      return state;
  }
};
export default reviewReducer;
