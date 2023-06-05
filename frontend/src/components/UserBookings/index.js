import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "../AllSpots/AllSpots.css";
import { actionClearSpots, getAllSpots } from "../../store/spot";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "../DeleteReviewModal";
import {
  actionClearBookingToEdit,
  actionClearUserBookings,
  thunkGetBookingToEdit,
  thunkGetSpotBookings,
  thunkGetUserBookings,
} from "../../store/booking";
import DeleteBookingModal from "../DeleteBookingModal";
import { NavLink } from "react-router-dom";
import UpdateBookingModal from "../UpdateBookingModal";

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

const UserBookings = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // Whenever a route change occurs (including redirects), the callback function inside the useEffect will be triggered, and it will scroll the window to the top using window.scrollTo(0, 0). This ensures that the page is scrolled to the top
    const unListen = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unListen();
    };
  }, [history]);

  function compareToToday(dateStr) {
    let date = new Date(dateStr);
    let today = new Date();
    today.setDate(today.getDate() + 1);
    return date <= today;
  }

  const userBookingsObj = useSelector((state) => state.bookings.user);
  const userBookingsArr = Object.values(userBookingsObj).sort((a, b) => {
    if (a.startDate < b.startDate) return 1;
    if (a.startDate > b.startDate) return -1;
    return 0;
  });

  const spotsObj = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getAllSpots());
    dispatch(thunkGetUserBookings());
    return () => {
      dispatch(actionClearSpots());
      dispatch(actionClearUserBookings());
    };
  }, [dispatch]);

  if (!Object.values(spotsObj).length)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "80px",
        }}
      >
        <div>
          <img
            style={{ width: "300px", height: "300px" }}
            src="https://cdn.dribbble.com/users/44323/screenshots/1655310/loadinganimation.gif"
            alt="loadingGif"
          />
        </div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <>
      <h2 className="manageSpotsLine">Manage Bookings</h2>
      <ul className="spots">
        {userBookingsArr.length &&
          userBookingsArr.map((booking) => {
            if (spotsObj[booking.spotId]) {
              return (
                <div key={booking.id} className="individualReview">
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      history.push(`/spots/${booking.spotId}`);
                    }}
                  >
                    <img
                      src={spotsObj[booking.spotId].previewImage}
                      alt="previewImg"
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {compareToToday(booking.startDate)
                      ? "Past booking"
                      : "Upcoming booking"}
                  </div>
                  <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    {spotsObj[booking.spotId].name}
                  </div>
                  <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    {spotsObj[booking.spotId].city},{" "}
                    {spotsObj[booking.spotId].state}
                  </div>
                  <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    Start Date: {booking.startDate}
                  </div>
                  <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    End Date: {booking.endDate}
                  </div>
                  <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    Price per night: $
                    {spotsObj[booking.spotId].price.toFixed(0)}
                  </div>
                  <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    Total Price: $
                    {spotsObj[booking.spotId].price *
                      (
                        (new Date(booking.endDate) -
                          new Date(booking.startDate)) /
                        (1000 * 60 * 60 * 24)
                      ).toFixed(0)}{" "}
                    for{" "}
                    {(new Date(booking.endDate) - new Date(booking.startDate)) /
                      (1000 * 60 * 60 * 24).toFixed(0)}{" "}
                    {(new Date(booking.endDate) - new Date(booking.startDate)) /
                      (1000 * 60 * 60 * 24) <=
                    1
                      ? "night"
                      : "nights"}
                  </div>

                  {compareToToday(booking.startDate) ? null : (
                    <div className="userSpotButtons">
                      <button
                        className="updateSpotButton"
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   dispatch(thunkGetBookingToEdit(booking.id));
                        // }}
                      >
                        <OpenModalMenuItem
                          itemText="Update Booking"
                          //   onItemClick={closeMenu}
                          modalComponent={
                            <UpdateBookingModal booking={booking} />
                          }
                        />
                      </button>
                      <button className="deleteSpotButton">
                        <OpenModalMenuItem
                          itemText="Delete Booking"
                          //   onItemClick={closeMenu}
                          modalComponent={
                            <DeleteBookingModal booking={booking} />
                          }
                        />
                      </button>
                    </div>
                  )}
                </div>
              );
            } else return null;
          })}
      </ul>
    </>
  );
};
export default UserBookings;
