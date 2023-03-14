export const LOAD_REVIEWS = "reviews/load_reviews";
const loadReviews = (reviews, spotId) => ({
  type: LOAD_REVIEWS,
  reviews,
  spotId,
});

export const getReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews, spotId));
    return reviews;
  }
};

const initialState = {
  spot: {},
  user: {},
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const reviewObj = {};
      action.reviews.forEach((review) => (reviewObj[review.id] = review));
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
