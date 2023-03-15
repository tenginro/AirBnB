import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSpots } from "../store/spot";
import UserSpotIndexItem from "./UserSpotIndexItem";
import "./spot.css";

const UserSpot = () => {
  const spotsObj = useSelector((state) => state.spots.allSpots);
  const spots = Object.values(spotsObj);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserSpots());
  }, [dispatch]);

  return (
    <ul className="spots">
      {spots.map((spot) => (
        <UserSpotIndexItem spot={spot} key={spot.id} />
      ))}
    </ul>
  );
};
export default UserSpot;
