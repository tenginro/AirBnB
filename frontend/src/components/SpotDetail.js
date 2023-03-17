import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { actionClearState, getSpotDetail } from "../store/spot";
import { actionClearReviewState, getReviews } from "../store/review";
import CreateReviewModal from "./CreateReviewModal";
import OpenModalMenuItem from "./Navigation/OpenModalMenuItem";
import DeleteReviewModal from "./DeleteReviewModal";

import "./spot.css";

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
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.singleSpot); //spot is an obj so !spot wont work
  const sessionUser = useSelector((state) => state.session.user);

  const spotReviewsObj = useSelector((state) => state.reviews.spot);
  const spotReviewsArr = Object.values(spotReviewsObj).sort((a, b) =>
    a.createdAt > b.createdAt ? -1 : 1
  );

  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = (e) => {
    e.stopPropagation();
    if (showMenu) return;
    setShowMenu(true);
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

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    dispatch(getSpotDetail(spotId));
    dispatch(getReviews(spotId));
    return () => {
      dispatch(actionClearState());
      dispatch(actionClearReviewState());
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
                      <div>{review.review}</div>
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
