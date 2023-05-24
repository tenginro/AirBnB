import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

import "../DeleteReviewModal/DeleteReviewModal.css";
import { thunkDeleteBooking, thunkGetUserBookings } from "../../store/booking";

export default function DeleteBookingModal({ booking }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const onClick = async (e) => {
    e.preventDefault();
    await dispatch(thunkDeleteBooking(booking))
      .then(closeModal)
      .then(() => dispatch(thunkGetUserBookings()))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(Object.values(data.errors));
        }
      });

    return history.push(`/bookings/current`);
  };

  return (
    <>
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to delete this booking?</h3>
      <div className="reviewModalButton">
        <button className="yesButton" type="button" onClick={onClick}>
          Yes (Delete Booking)
        </button>
        <button className="noButton" type="button" onClick={closeModal}>
          No (Keep Booking)
        </button>
      </div>
    </>
  );
}
