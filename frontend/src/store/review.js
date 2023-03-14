import { csrfFetch } from "./csrf";

export const LOAD_SPOT_REVIEWS = "reviews/load_reviews";
const loadSpotReviews = (reviews, spotId) => ({
  type: LOAD_SPOT_REVIEWS,
  reviews,
  spotId,
});

export const getReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    await dispatch(loadSpotReviews(reviews.Reviews, spotId));
    return reviews;
  }
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
    default:
      return state;
  }
};
export default reviewReducer;
