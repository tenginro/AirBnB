import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "../AllSpots/AllSpots.css";
import { actionClearUserReviews, getUserReviews } from "../../store/review";
import { actionClearSpots, getAllSpots } from "../../store/spot";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "../DeleteReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";

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

const UserReviews = () => {
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

  const userReviewsObj = useSelector((state) => state.reviews.user);
  const userReviewsArr = Object.values(userReviewsObj);

  const spotsObj = useSelector((state) => state.spots.allSpots);

  useEffect(() => {
    dispatch(getAllSpots());
    dispatch(getUserReviews());
    return () => {
      dispatch(actionClearSpots());
      dispatch(actionClearUserReviews());
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
      <h2 className="manageSpotsLine">Manage Reviews</h2>
      <ul className="spots">
        {userReviewsArr.length &&
          userReviewsArr.map((review) => (
            <div key={review.id} className="individualReview">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/spots/${review.spotId}`);
                }}
              >
                <img
                  src={spotsObj[review.spotId].previewImage}
                  alt="previewImg"
                />
              </div>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                {spotsObj[review.spotId].name}
              </div>
              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                {spotsObj[review.spotId].city}, {spotsObj[review.spotId].state}
              </div>

              <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                {`Review posted on: ${
                  months[+review.createdAt.slice(5, 7) - 1]
                } ${review.createdAt.slice(8, 10)}, ${review.createdAt.slice(
                  0,
                  4
                )}`}
              </div>
              <div
                className="reviewSentences"
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  width: "300px",
                  height: "70px",
                }}
              >
                <i className="fas fa-sharp fa-solid fa-star"></i>
                {review.stars} stars: {review.review}
              </div>
              <div className="userSpotButtons">
                <button className="updateSpotButton">
                  <OpenModalMenuItem
                    itemText="Update Review"
                    // onItemClick={closeMenu}
                    modalComponent={
                      <UpdateReviewModal
                        spot={spotsObj[review.spotId]}
                        oriReview={review}
                      />
                    }
                  />
                </button>
                <button className="deleteSpotButton">
                  <OpenModalMenuItem
                    itemText="Delete Review"
                    //   onItemClick={closeMenu}
                    modalComponent={
                      <DeleteReviewModal
                        review={review}
                        spotId={review.spotId}
                      />
                    }
                  />
                </button>
              </div>
            </div>
          ))}
      </ul>
    </>
  );
};
export default UserReviews;
