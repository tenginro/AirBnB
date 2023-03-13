const LOAD_SPOTS = "spots/load";
export const actionLoadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});
export const getAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");

  if (response.ok) {
    const spots = await response.json();
    dispatch(actionLoadSpots(spots.Spots));
  }
};

const initialState = {
  allSpots: {},
  singleSpot: {},
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const allSpots = {};
      action.spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      return { ...state, allSpots: { ...allSpots } };
    default:
      return state;
  }
};

export default spotReducer;
