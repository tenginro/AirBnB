import { csrfFetch } from "./csrf";

const LOAD_SPOT_BOOKINGS = "bookings/load_spot_bookings";
const LOAD_USER_BOOKINGS = "bookings/load_user_bookings";

const CREATE_BOOKING = "bookings/create";
const UPDATE_BOOKING = "bookings/update";
const REMOVE_BOOKING = "bookings/remove";

const CLEAR_SPOT_BOOKINGS = "bookings/clear_spot_bookings";
const CLEAR_USER_BOOKINGS = "bookings/clear_user_bookings";

const actionLoadSpotBookings = (bookings, spotId) => ({
  type: LOAD_SPOT_BOOKINGS,
  bookings,
  spotId,
});
const actionLoadUserBookings = (bookings) => ({
  type: LOAD_USER_BOOKINGS,
  bookings,
});
const actionCreateBooking = (booking, spot) => ({
  type: CREATE_BOOKING,
  booking,
  spot,
});
const actionUpdateBooking = (booking, spot) => ({
  type: UPDATE_BOOKING,
  booking,
  spot,
});
const actionRemoveBooking = (id) => ({
  type: REMOVE_BOOKING,
  id,
});
export const actionClearSpotBookings = () => ({
  type: CLEAR_SPOT_BOOKINGS,
});
export const actionClearUserBookings = () => ({
  type: CLEAR_USER_BOOKINGS,
});

export const thunkGetSpotBookings = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  if (response.ok) {
    const bookings = await response.json();
    await dispatch(actionLoadSpotBookings(bookings, spotId));
    return bookings;
  }
};
export const thunkGetUserBookings = () => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/current`);
  if (response.ok) {
    const bookings = await response.json();
    await dispatch(actionLoadUserBookings(bookings));
    return bookings;
  }
};
export const thunkCreateBooking = (booking, spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}/bookings`, {
    method: "POST",
    body: JSON.stringify(booking),
  });
  if (response.ok) {
    const newBooking = await response.json();
    dispatch(actionCreateBooking(newBooking, spot));
    return response;
  }
};
export const thunkUpdateBooking = (booking, spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (response.ok) {
    const updatedBooking = await response.json();
    dispatch(actionUpdateBooking(updatedBooking, spot));
    return response;
  }
};
export const deleteBooking = (booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(actionRemoveBooking(booking.id));
    return await response.json();
  }
};

const initialState = {
  spot: {},
  user: {},
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOT_BOOKINGS:
      const spotBookingsObj = {};
      action.bookings.forEach((b) => {
        spotBookingsObj[b.id] = b;
      });
      return {
        ...state,
        spot: {
          ...spotBookingsObj,
        },
      };
    case LOAD_USER_BOOKINGS:
      const userBookingsObj = {};
      action.bookings.forEach((b) => {
        userBookingsObj[b.id] = b;
      });
      return {
        ...state,
        spot: {
          ...userBookingsObj,
        },
      };
    case CREATE_BOOKING:
      return {
        ...state,
        spot: { ...state.spot, [action.booking.id]: action.booking },
        user: { ...state.user, [action.booking.id]: action.booking },
      };
    case UPDATE_BOOKING:
      return {
        ...state,
        spot: { ...state.spot, [action.booking.id]: action.booking },
        user: { ...state.user, [action.booking.id]: action.booking },
      };
    case REMOVE_BOOKING:
      const newState = { ...state };
      delete newState.spot[action.id];
      delete newState.user[action.id];
      return newState;
    case CLEAR_SPOT_BOOKINGS:
      return { ...state, spot: {} };
    case CLEAR_USER_BOOKINGS:
      return { ...state, user: {} };
    default:
      return state;
  }
};
export default bookingReducer;
