import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllSpots } from "../store/spot";
import { useParams } from "react-router-dom";
import EditSpotForm from "./EditSpotForm";

export default function EditSpotFormWrapper() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spots.allSpots);
  const spot = spots[spotId];

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  if (!spot) return <div>Loading</div>;
  if (spot && spot.country) return <EditSpotForm spot={spot} />;
}
