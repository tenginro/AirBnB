import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionClearSpots, getSearchedSpots } from "../../store/spot";
import SpotIndexItem from "../AllSpots/SpotIndexItem";
import NotFound from "../NotFound";

export default function SearchSpots() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { searchInput } = useParams();

  const spotsObj = useSelector((state) => state.spots.allSpots);
  const spots = Object.values(spotsObj);

  useEffect(() => {
    dispatch(getSearchedSpots(searchInput));
    return () => {
      dispatch(actionClearSpots());
    };
  }, [dispatch, searchInput]);

  return (
    <>
      <h3
        style={{
          paddingTop: "30px",
          fontSize: "30px",
          textAlign: "center",
          color: "blue",
        }}
      >
        View all spots related to {searchInput}
      </h3>
      {spots.length ? (
        <ul className="spots">
          {spots.map((spot) => (
            <SpotIndexItem spot={spot} key={spot.id} />
          ))}
        </ul>
      ) : null}
    </>
  );
}
