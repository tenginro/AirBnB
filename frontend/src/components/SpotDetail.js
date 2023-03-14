import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllSpots, getOneSpot } from "../store/spot";

const SpotDetail = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.singleSpot);
  console.log(spot);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getAllSpots());
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return <div>No spot found</div>;

  return (
    <>
      <h2>{spot.name}</h2>
      <div>
        {spot.city}, {spot.state}, {spot.country}
      </div>
      {spot.SpotImages.map((img) => (
        <img src={img.url} alt="spotImage"></img>
      ))}
    </>
  );
};

export default SpotDetail;
