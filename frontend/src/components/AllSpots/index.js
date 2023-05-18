import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actionClearSpots, getAllSpots } from "../../store/spot";
import SpotIndexItem from "./SpotIndexItem";

import "./AllSpots.css";

const SpotsIndex = () => {
  const spotsObj = useSelector((state) => state.spots.allSpots);
  const spots = Object.values(spotsObj);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSpots());
    return () => dispatch(actionClearSpots());
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