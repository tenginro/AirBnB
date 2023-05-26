import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getAllSpots } from "../../store/spot";
import EditSpotForm from "./EditSpotForm";

export default function EditSpotFormWrapper() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spots.allSpots);
  const spot = spots[spotId];

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  if (!spot)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Loading</h1>
        <img
          src="https://cdn.dribbble.com/users/44323/screenshots/1655310/loadinganimation.gif"
          alt="loadingGif"
        />
      </div>
    );
  if (spot && spot.country) return <EditSpotForm spot={spot} />;
}
