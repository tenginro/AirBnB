import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSpotDetail } from "../store/spot";
import "./spotDetail.css";
import { getReviews } from "../store/review";

const SpotDetail = () => {
  const { spotId } = useParams();
  // const spotFromSpots = useSelector((state) => state.spots.allSpots[spotId]);
  // const spot = useSelector((state) => state.spots.singleSpot);
  const spot = useSelector((state) => state.spots.allSpots[spotId]);
  const spotReviewsObj = useSelector((state) => state.reviews.spot);
  const spotReviewsArr = Object.values(spotReviewsObj);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotDetail(spotId));
    dispatch(getReviews(spotId));
  }, [dispatch, spotId]);

  if (!spot) {
    console.log("loading");
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
          <img
            className="previewImg"
            src={spot.previewImage}
            alt="previewImage"
          ></img>
        </div>
        <div className="smallerImages">
          {spot.SpotImages.length &&
            spot.SpotImages.map(
              (img) =>
                !img.preview && (
                  <img
                    className="smImages"
                    src={img.url}
                    alt="spotImage"
                    key={img.id}
                  ></img>
                )
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
          {spot.avgStarRating} · {spot.numReviews} reviews
        </div>
      </div>
      <div>
        <button onClick={() => alert("Feature Coming Soon...")}>Reserve</button>
      </div>
      <div>
        <i className="fas fa-sharp fa-solid fa-star"></i>
        {spot.avgStarRating} · {spot.numReviews} reviews
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
