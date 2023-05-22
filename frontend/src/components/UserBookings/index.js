import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "../AllSpots/AllSpots.css";
import { actionClearSpots, getAllSpots } from "../../store/spot";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "../DeleteReviewModal";
import {
  actionClearUserBookings,
  thunkGetUserBookings,
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

const UserBookings = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function compareToToday(dateStr) {
    let date = new Date(dateStr);
    let today = new Date();
    return date < today;
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

  if (!Object.values(spotsObj).length) return <div>Loading</div>;

  return (
    <>
      <h2 className="manageSpotsLine">Manage Bookings</h2>
      <ul className="spots">
        {userBookingsArr.length &&
          userBookingsArr.map((booking) => (
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
              <div>{spotsObj[booking.spotId].name}</div>
              <div>
                {spotsObj[booking.spotId].city},{" "}
                {spotsObj[booking.spotId].state}
              </div>
              <div>
                {compareToToday(booking.endDate)
                  ? "Past booking"
                  : "Upcoming booking"}
              </div>
              <div>Start Date: {booking.startDate}</div>
              <div>End Date: {booking.endDate}</div>
              {/* <button className="deleteReviewButtonEffect">
                <OpenModalMenuItem
                  itemText="Delete"
                  //   onItemClick={closeMenu}
                  modalComponent={
                    <DeleteReviewModal review={booking} spotId={booking.spotId} />
                  }
                />
              </button> */}
            </div>
          ))}
      </ul>
    </>
  );
};
export default UserBookings;
