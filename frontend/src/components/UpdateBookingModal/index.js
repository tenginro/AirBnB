import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

import "../CreateReviewModal/CreateReviewModal.css";
import { createReview, getReviews, updateReview } from "../../store/review";
import { getSpotDetail } from "../../store/spot";
import {
  actionClearBookingToEdit,
  actionClearSpotBookings,
  thunkGetSpotBookings,
  thunkGetUserBookings,
  thunkUpdateBooking,
} from "../../store/booking";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function UpdateBookingModal({ booking }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const ulRef = useRef();
  const { closeModal } = useModal();

  const spotId = booking.spotId;
  const spotBookingsObj = useSelector((state) => state.bookings.spot);
  const spotBookingsArr = Object.values(spotBookingsObj);

  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(new Date(booking.startDate));
  const [endDate, setEndDate] = useState(addDays(new Date(booking.endDate), 1));
  const [errorMessage, setErrorMessage] = useState([]);

  let disabledDatesArr = [];
  spotBookingsArr
    .filter((b) => b.id !== booking.id)
    .forEach((b) => {
      let start = new Date(b.startDate);
      let end = new Date(b.endDate);
      while (start <= end) {
        disabledDatesArr.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }
    });

  const resetBookingDates = () => {
    setStartDate(new Date());
    setEndDate(addDays(new Date(), 1));
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const calendarClassName = showCalendar
    ? "calendarContainer"
    : "calendarContainer hidden";

  const onClick = async (e) => {
    e.preventDefault();
    setErrorMessage([]);

    const payload = {
      id: booking.id,
      spotId: booking.spotId,
      startDate,
      endDate,
    };

    let updatedBooking = await dispatch(thunkUpdateBooking(payload))
      .then(closeModal)
      .then(() => dispatch(thunkGetUserBookings()))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          await setErrorMessage({ ...data });
        }
      });
    if (updatedBooking) {
      setErrorMessage({});
      dispatch(actionClearBookingToEdit()); //
    }
  };

  useEffect(() => {
    dispatch(thunkGetSpotBookings(spotId));
    return () => {
      dispatch(actionClearSpotBookings()); // return
    };
  }, [dispatch, spotId]);

  return (
    <div>
      <div style={{ width: "820px" }}>
        <h3 style={{ marginLeft: "10px", height: "50px" }}>
          Select or enter check-in, checkout dates
          {Object.values(errorMessage).length ? (
            <div style={{ color: "red" }}>{errorMessage.message}</div>
          ) : null}
        </h3>
        <div className="calendarContainerFixed">
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            // not allow booking past dates
            minDate={new Date()}
            rangeColors={["#0052ff"]}
            months={2}
            // whether dates can be edited in the Calendar's input fields
            editableDateInputs={true}
            direction="horizontal"
            // enables the preview of the selected range, showing a highlighted area for the selected dates.
            showSelectionPreview={true}
            // when a user selects a start date, the end date of the range automatically adjusts to maintain the selected range.
            moveRangeOnFirstSelection={false}
            showMonthAndYearPickers={false}
            disabledDates={disabledDatesArr}
          />
        </div>
        <h3
          style={{
            display: "flex",
            justifyContent: "flex-end",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={resetBookingDates}
        >
          Clear dates
        </h3>
      </div>
      <div className="reserveButtonContainer">
        <div className="reserveButtonBox">
          <button className="reserveButton" onClick={onClick}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
