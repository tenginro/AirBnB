import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSpotDetail } from "../store/spot";
import "./spotDetail.css";
import { getReviews } from "../store/review";

const SpotDetail = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.singleSpot); //spot is an obj so !spot wont work

  const spotReviewsObj = useSelector((state) => state.reviews.spot);
  const spotReviewsArr = Object.values(spotReviewsObj);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotDetail(spotId));
    dispatch(getReviews(spotId));
  }, [dispatch, spotId]);

  // conditionally render
  if (!spot.SpotImages) {
    return <div>Loading</div>;
  }

  return (
    <>
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
              className="smallerImages"
              src={spot.SpotImages[1].url}
              alt="imageTwo"
            ></img>
          )}
          {spot.SpotImages[2] && (
            <img
              className="smallerImages"
              src={spot.SpotImages[2].url}
              alt="imageThree"
            ></img>
          )}
          {spot.SpotImages[3] && (
            <img
              className="smallerImages"
              src={spot.SpotImages[3].url}
              alt="imageFour"
            ></img>
          )}
          {spot.SpotImages[4] && (
            <img
              className="smallerImages"
              src={spot.SpotImages[4].url}
              alt="imageFive"
            ></img>
          )}
        </div>
      </div>
      <div>
        <div>
          Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
        </div>
        <div>{spot.description}</div>
      </div>
      <div>
        <div>${spot.price} night</div>
        <div>
          <i className="fas fa-sharp fa-solid fa-star"></i>
          {typeof spot.avgRating === "number" ? spot.avgRating : "New"} ·{" "}
          {typeof spot.numReviews === "number" ? spot.numReviews : "New"}{" "}
          reviews
        </div>
      </div>
      <div>
        <button onClick={() => alert("Feature Coming Soon...")}>Reserve</button>
      </div>
      <div>
        <i className="fas fa-sharp fa-solid fa-star"></i>
        {typeof spot.avgRating === "number" ? spot.avgRating : "New"} ·{" "}
        {typeof spot.numReviews === "number" ? spot.numReviews : "New"} reviews
      </div>
      {spotReviewsArr.map((review) => (
        <div key={review.id}>
          <div>{review.User.firstName}</div>
          <div>{review.createdAt}</div>
          <div>{review.review}</div>
        </div>
      ))}
    </>
  );
};

export default SpotDetail;
