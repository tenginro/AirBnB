import { csrfFetch } from "./csrf";

const LOAD_SPOT_BOOKINGS = "bookings/load_spot_bookings";
const LOAD_USER_BOOKINGS = "bookings/load_user_bookings";
const LOAD_BOOKING_TO_EDIT = "bookings/load_booking_to_edit";

const CREATE_BOOKING = "bookings/create";
const UPDATE_BOOKING = "bookings/update";
const REMOVE_BOOKING = "bookings/remove";

const CLEAR_SPOT_BOOKINGS = "bookings/clear_spot_bookings";
const CLEAR_USER_BOOKINGS = "bookings/clear_user_bookings";
const CLEAR_BOOKING_TO_EDIT = "bookings/clear_booking_to_edit";

const actionLoadSpotBookings = (bookings, spotId) => ({
  type: LOAD_SPOT_BOOKINGS,
  bookings,
  spotId,
});
const actionLoadUserBookings = (bookings) => ({
  type: LOAD_USER_BOOKINGS,
  bookings,
});
const actionLoadBookingToEdit = (booking) => ({
  type: LOAD_BOOKING_TO_EDIT,
  booking,
});
const actionCreateBooking = (booking, spot) => ({
  type: CREATE_BOOKING,
  booking,
  spot,
});
const actionUpdateBooking = (booking) => ({
  type: UPDATE_BOOKING,
  booking,
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
export const actionClearBookingToEdit = () => ({
  type: CLEAR_BOOKING_TO_EDIT,
});

export const thunkGetSpotBookings = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  if (response.ok) {
    const bookings = await response.json();

    await dispatch(actionLoadSpotBookings(bookings.Bookings, spotId));
    return bookings;
  }
};
export const thunkGetUserBookings = () => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/current`);
  if (response.ok) {
    const bookings = await response.json();
    await dispatch(actionLoadUserBookings(bookings.Bookings));
    return bookings;
  }
};

export const thunkGetBookingToEdit = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/current`);
  if (response.ok) {
    const bookings = await response.json();
    const bookingToEdit = bookings.Bookings.filter(
      (el) => el.id === bookingId
    )[0];
    await dispatch(actionLoadBookingToEdit(bookingToEdit));
    return bookingToEdit;
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
    return newBooking;
  }

  return await response.json();
};
export const thunkUpdateBooking = (booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (response.ok) {
    const updatedBooking = await response.json();
    dispatch(actionUpdateBooking(updatedBooking));
    return updatedBooking;
  }
  return await response.json();
};
export const thunkDeleteBooking = (booking) => async (dispatch) => {
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
  single: {},
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
        user: {
          ...userBookingsObj,
        },
      };
    case LOAD_BOOKING_TO_EDIT:
      return { ...state, single: { ...action.booking } };
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
    case CLEAR_BOOKING_TO_EDIT:
      return { ...state, single: {} };
    default:
      return state;
  }
};
export default bookingReducer;
