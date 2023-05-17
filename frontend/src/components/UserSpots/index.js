import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { actionClearSpots, getUserSpots } from "../../store/spot";
import UserSpotIndexItem from "./UserSpotIndexItem.js";
import "../AllSpots/SpotIndexItem.css";

const UserSpot = () => {
  const spotsObj = useSelector((state) => state.spots.allSpots);
  const spots = Object.values(spotsObj);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserSpots());
    return () => dispatch(actionClearSpots());
  }, [dispatch]);

  return (
    <>
      <h2 className="manageSpotsLine">Manage Spots</h2>
      {spots.length === 0 && (
        <button className="createSpotLine">
          <NavLink exact to="/spots/new">
            Create a New Spot
          </NavLink>
        </button>
      )}
      <ul className="spots">
        {spots &&
          spots.map((spot) => <UserSpotIndexItem spot={spot} key={spot.id} />)}
      </ul>
    </>
  );
};
export default UserSpot;
