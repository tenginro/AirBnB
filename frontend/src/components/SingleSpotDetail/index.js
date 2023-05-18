import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  actionClearSpots,
  actionClearState,
  getSpotDetail,
} from "../../store/spot";
import { actionClearReviewState, getReviews } from "../../store/review";
import CreateReviewModal from "../CreateReviewModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteReviewModal from "../DeleteReviewModal";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./spot.css";

import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

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

const SpotDetail = () => {
  const dispatch = useDispatch();
  const ulRef = useRef();

  const { spotId } = useParams();

  const spot = useSelector((state) => state.spots.singleSpot); //spot is an obj so !spot wont work
  const sessionUser = useSelector((state) => state.session.user);

  const spotReviewsObj = useSelector((state) => state.reviews.spot);
  const spotReviewsArr = Object.values(spotReviewsObj).sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
  );

  const [showMenu, setShowMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetBookingDates = () => {
    setStartDate(new Date());
    setEndDate(addDays(new Date(), 1));
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  // const [booking, setBooking] = useState({
  //   startDate: new Date(),
  //   endDate: addDays(new Date(), 7),
  //   key: "selection",
  // });

  const calendarClassName = showCalendar
    ? "calendarContainer"
    : "calendarContainer hidden";
  console.log("calendarClassName", calendarClassName);

  const openMenu = (e) => {
    e.stopPropagation();
    if (showMenu) return;
    setShowMenu(true);
  };

  const openCalendar = (e) => {
    e.stopPropagation();
    if (showCalendar) return;
    setShowCalendar(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      // you want the dropdown menu to close only if the click happened OUTSIDE the dropdown.
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [showMenu]);

  useEffect(() => {
    if (!showCalendar) return;
    const closeCalendar = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("click", closeCalendar);
    return () => {
      document.removeEventListener("click", closeCalendar);
    };
  }, [showCalendar]);

  const closeMenu = () => setShowMenu(false);
  const closeCalendar = () => setShowCalendar(false);

  useEffect(() => {
    dispatch(getSpotDetail(spotId));
    dispatch(getReviews(spotId));
    return () => {
      dispatch(actionClearState());
      dispatch(actionClearReviewState());
      dispatch(actionClearSpots());
    };
  }, [dispatch, spotId]);

  // conditionally render
  if (!spot.SpotImages && !spot.Owner) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div className="spotDetailContent">
        <h2>{spot.name}</h2>
        <div>
          {spot.city}, {spot.state}, {spot.country}
        </div>
        <div className="spotImages">
          <div className="previewSpotImage">
            {spot.SpotImages[0] && (
              <img
                className="largerImage"
                src={spot.SpotImages[0].url}
                alt="imageOne"
              ></img>
            )}
          </div>
          <div className="otherImages">
            {spot.SpotImages[1] && (
              <img
                className="smallerImages image1"
                src={spot.SpotImages[1].url}
                alt="imageTwo"
              ></img>
            )}
            {spot.SpotImages[2] && (
              <img
                className="smallerImages image2"
                src={spot.SpotImages[2].url}
                alt="imageThree"
              ></img>
            )}
            {spot.SpotImages[3] && (
              <img
                className="smallerImages image3"
                src={spot.SpotImages[3].url}
                alt="imageFour"
              ></img>
            )}
            {spot.SpotImages[4] && (
              <img
                className="smallerImages image4"
                src={spot.SpotImages[4].url}
                alt="imageFive"
              ></img>
            )}
          </div>
        </div>
        <div className="secondContent">
          <div className="description">
            <h3 className="toBoldHeading">
              Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
            </h3>
            <div className="descriptionPara">{spot.description}</div>
          </div>
          <div className="reserveBox">
            <div className="reserveBoxLineOne">
              <div className="toCenter larger">${spot.price} night</div>
              <div className="toCenter">
                <i className="fas fa-sharp fa-solid fa-star"></i>
                {typeof spot.numReviews === "number"
                  ? +spot.numReviews !== 1
                    ? `${spot.avgStarRating.toFixed(1)} · ${
                        spot.numReviews
                      } reviews`
                    : `${spot.avgStarRating.toFixed(1)} · ${
                        spot.numReviews
                      } review`
                  : "New"}
              </div>
            </div>
            <div
              className="reserveBoxLineTwo"
              onClick={openCalendar}
              ref={ulRef}
            >
              <div className="dateInputBox">
                <div>CHECK-IN</div>
                <div>{startDate.toISOString().split("T")[0]}</div>
              </div>
              <div className="dateInputBox">
                <div>CHECKOUT</div>
                <div>{endDate.toISOString().split("T")[0]}</div>
              </div>
              <div className={calendarClassName}>
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                  // not allow booking past dates
                  minDate={new Date()}
                  rangeColors={["#0052ff"]}
                  months={2}
                  editableDateInputs={true}
                  direction="horizontal"
                  // enables the preview of the selected range, showing a highlighted area for the selected dates.
                  showSelectionPreview={true}
                  // when a user selects a start date, the end date of the range automatically adjusts to maintain the selected range.
                  moveRangeOnFirstSelection={false}
                  // showDateDisplay={false}
                  showMonthAndYearPickers={false}
                />
              </div>
            </div>
            <div className="reserveButtonContainer">
              <div className="reserveButtonBox">
                <button
                  className="reserveButton"
                  onClick={() => alert("Feature Coming Soon...")}
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "820px" }}>
          <h3 style={{ marginLeft: "10px" }}>
            Select check-in, checkout dates
          </h3>
          <div className="calendarContainerFixed">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              // not allow booking past dates
              minDate={new Date()}
              rangeColors={["#0052ff"]}
              months={2}
              editableDateInputs={true}
              direction="horizontal"
              // enables the preview of the selected range, showing a highlighted area for the selected dates.
              showSelectionPreview={true}
              // when a user selects a start date, the end date of the range automatically adjusts to maintain the selected range.
              moveRangeOnFirstSelection={false}
              showDateDisplay={false}
              showMonthAndYearPickers={false}
            />
          </div>
          <h3
            style={{
              display: "flex",
              justifyContent: "flex-end",
              textDecoration: "underline",
              cursor: "pointer",
              width: "680px",
            }}
            onClick={resetBookingDates}
          >
            Clear dates
          </h3>
        </div>
        <div className="reviewsContainer">
          <div className="reviewsFirstLine">
            <i className="fas fa-sharp fa-solid fa-star"></i>
            {typeof spot.numReviews === "number"
              ? +spot.numReviews !== 1
                ? `${spot.avgStarRating.toFixed(1)} · ${
                    spot.numReviews
                  } reviews`
                : `${spot.avgStarRating.toFixed(1)} · ${spot.numReviews} review`
              : "New"}
          </div>
          <div>
            {sessionUser !== null &&
              spot.Owner.id !== sessionUser.id &&
              spotReviewsArr.filter((el) => el.userId === sessionUser.id)
                .length === 0 && (
                <>
                  <button className="postReviewButtonEffect">
                    <OpenModalMenuItem
                      itemText="Post Your Review"
                      onItemClick={closeMenu}
                      modalComponent={<CreateReviewModal spot={spot} />}
                    />
                  </button>
                  {!spotReviewsArr.length && (
                    <div>Be the first to post a review!</div>
                  )}
                </>
              )}
            {spotReviewsArr.length !== 0 &&
              spotReviewsArr.map(
                (review) =>
                  review.User && (
                    <div key={review.id} className="individualReview">
                      <div className="toBold">{review.User.firstName}</div>
                      <div>{`${
                        months[+review.createdAt.slice(5, 7) - 1]
                      } ${review.createdAt.slice(
                        8,
                        10
                      )}, ${review.createdAt.slice(0, 4)}`}</div>
                      <div className="reviewSentences">{review.review}</div>
                      {sessionUser !== null &&
                        review.User.id === sessionUser.id && (
                          <button className="deleteReviewButtonEffect">
                            <OpenModalMenuItem
                              itemText="Delete"
                              onItemClick={closeMenu}
                              modalComponent={
                                <DeleteReviewModal
                                  review={review}
                                  spotId={spotId}
                                />
                              }
                            />
                          </button>
                        )}
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SpotDetail;