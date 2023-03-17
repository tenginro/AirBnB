import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/load";
const LOAD_SPOT_DETAIL = "spots/load_one";
const LOAD_SPOTS_CURRENT = "spots/current";
const CREATE_SPOT = "spots/create";
const UPDATE_SPOT = "spots/update";
const REMOVE_SPOT = "spots/remove";
const CLEAR_STATE = "spots/clear_state";
const CLEAR_USER_SPOTS = "spots/clear_user_spots";

export const actionLoadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});
export const actionLoadSpotDetail = (spot) => ({
  type: LOAD_SPOT_DETAIL,
  spot,
});
export const actionCreateSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

export const actionLoadUserSpot = (spots) => ({
  type: LOAD_SPOTS_CURRENT,
  spots,
});

export const actionEditSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

export const actionRemoveSpot = (id) => ({
  type: REMOVE_SPOT,
  id,
});

export const actionClearState = () => ({
  type: CLEAR_STATE,
});

export const actionClearUserSpot = () => ({
  type: CLEAR_USER_SPOTS,
});

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const spots = await response.json();
    await dispatch(actionLoadSpots(spots.Spots));
    return spots;
  }
};

export const getSpotDetail = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);

  if (response.ok) {
    const spot = await response.json();
    await dispatch(actionLoadSpotDetail(spot));
    return spot;
  }
};

export const createSpot = (spot, user) => async (dispatch) => {
  const {
    address,
    city,
    state,
    country,
    name,
    description,
    price,
    previewImg,
    image1,
    image2,
    image3,
    image4,
  } = spot;

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

  if (response.ok) {
    const newSpot = await response.json();

    try {
      await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: previewImg, preview: true }),
      });
      if (image1) {
        await csrfFetch(`/api/spots/${newSpot.id}/images`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: image1, preview: false }),
        });
      }
      if (image2) {
        await csrfFetch(`/api/spots/${newSpot.id}/images`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: image2, preview: false }),
        });
      }
      if (image3) {
        await csrfFetch(`/api/spots/${newSpot.id}/images`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: image3, preview: false }),
        });
      }
      if (image4) {
        await csrfFetch(`/api/spots/${newSpot.id}/images`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: image4, preview: false }),
        });
      }
      dispatch(actionCreateSpot(newSpot));
      return newSpot;
    } catch (error) {
      throw error;
    }
  }
  return response;
};

export const getUserSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  if (response.ok) {
    const spots = await response.json();
    await dispatch(actionLoadUserSpot(spots.Spots));
    return spots;
  }
};

export const updateSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });
  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(actionEditSpot(updateSpot));
    return updatedSpot;
  }
  return response.json();
};

export const deleteSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "delete",
  });

  if (response.ok) {
    dispatch(actionRemoveSpot(spot.id));
    return await response.json();
  }
  return await response.json();
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
    case LOAD_SPOTS_CURRENT:
      const allUserSpots = {};
      action.spots.forEach((spot) => {
        allUserSpots[spot.id] = spot;
      });
      return { allSpots: { ...allUserSpots }, singleSpot: {} };
    case CREATE_SPOT:
      return {
        ...state,
        allSpots: { ...state.allSpots, [action.spot.id]: action.spot },
        singleSpot: {},
      };
    case UPDATE_SPOT:
      return {
        ...state,
        allSpots: { ...state.allSpots, [action.spot.id]: action.spot },
        singleSpot: {},
      };
    case REMOVE_SPOT:
      const newState = { ...state };
      delete newState.allSpots[action.id];
      return newState;
    case CLEAR_USER_SPOTS:
      return { ...state, allSpots: {} };
    case CLEAR_STATE:
      return { ...state, singleSpot: {} };
    default:
      return state;
  }
};

export default spotReducer;
