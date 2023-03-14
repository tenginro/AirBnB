import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/load";
export const actionLoadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const spots = await response.json();
    await dispatch(actionLoadSpots(spots.Spots));
    return spots;
  }
};

const LOAD_SPOT_DETAIL = "spots/add_one";
export const actionLoadSpotDetail = (spot) => ({
  type: LOAD_SPOT_DETAIL,
  spot,
});

export const getSpotDetail = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);

  if (response.ok) {
    const spot = await response.json();
    await dispatch(actionLoadSpotDetail(spot));
    return spot;
  }
};

const CREATE_SPOT = "/spots/create";
export const actionCreateSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

export const createSpot = (spot, user) => async (dispatch) => {
  const { address, city, state, country, name, description, price } = spot;
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      name,
      description,
      price,
    }),
  });
  console.log(response);

  const newSpot = await response.json();
  dispatch(actionCreateSpot(newSpot));
  return response;
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
    case LOAD_SPOT_DETAIL:
      return {
        ...state,
        singleSpot: { ...action.spot },
      };
    case CREATE_SPOT:
      return {
        ...state,
        allSpots: { ...state.allSpots, [action.spot.id]: action.spot },
      };
    default:
      return state;
  }
};

export default spotReducer;
