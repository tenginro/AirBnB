import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllSpots, getOneSpot } from "../store/spot";
import SpotReviews from "./Review";

const SpotDetail = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.allSpots[spotId]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return null;

  return (
    <>
      <h2>{spot.name}</h2>
      <div>
        {spot.city}, {spot.state}, {spot.country}
      </div>
      <div className="spotImages">
        {spot.SpotImages.map((img) => (
          <img src={img.url} alt="spotImage"></img>
        ))}
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
      <SpotReviews spot={spot} />
    </>
  );
};

export default SpotDetail;
