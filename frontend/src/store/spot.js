const LOAD_SPOTS = "spots/load";
export const actionLoadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

const ADD_ONE_SPOT = "spots/add_one";
export const actionAddOneSpot = (spot) => ({
  type: ADD_ONE_SPOT,
  spot,
});

export const getAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");

  if (response.ok) {
    const spots = await response.json();
    dispatch(actionLoadSpots(spots.Spots));
  }
};

export const getOneSpot = (id) => async (dispatch) => {
  const response = await fetch(`/api/spots/${id}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(actionAddOneSpot(spot));
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
    case ADD_ONE_SPOT:
      if (!state.allSpots[action.spot.id]) {
        const newState = {
          allSpots: { ...state.allSpots, [action.spot.id]: action.spot },
          singleSpot: { ...action.spot },
        };
        return newState;
      }
      return {
        ...state,
        singleSpot: { ...action.spot },
      };
    default:
      return state;
  }
};

export default spotReducer;
