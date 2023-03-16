import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actionClearState, getAllSpots } from "../store/spot";
import SpotIndexItem from "./SpotIndexItem";

import "./SpotIndex.css";
import { actionClearReviewState } from "../store/review";

const SpotsIndex = () => {
  const spotsObj = useSelector((state) => state.spots.allSpots);
  const spots = Object.values(spotsObj);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <ul className="spots">
      {spots.map((spot) => (
        <SpotIndexItem spot={spot} key={spot.id} />
      ))}
    </ul>
  );
};
export default SpotsIndex;
