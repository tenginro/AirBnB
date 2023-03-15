import { useEffect } from "react";
import { NavLink } from "react-router-dom";
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
  }, [dispatch, spots.length]);

  return (
    <>
      <h2>Manage Spots</h2>
      <button>
        <NavLink exact to="/spots/new">
          <div className="createSpot">Create a New Spot</div>
        </NavLink>
      </button>
      <ul className="spots">
        {spots &&
          spots.map((spot) => <UserSpotIndexItem spot={spot} key={spot.id} />)}
      </ul>
    </>
  );
};
export default UserSpot;
