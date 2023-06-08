import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { actionClearSpots, getAllSpots } from "../../store/spot";
import SpotIndexItem from "./SpotIndexItem";

import "./AllSpots.css";

const SpotsIndex = () => {
  const history = useHistory();

  useEffect(() => {
    // Whenever a route change occurs (including redirects), the callback function inside the useEffect will be triggered, and it will scroll the window to the top using window.scrollTo(0, 0). This ensures that the page is scrolled to the top
    const unListen = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unListen();
    };
  }, [history]);

  const spotsObj = useSelector((state) => state.spots.allSpots);
  const spots = Object.values(spotsObj);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
    return () => {
      dispatch(actionClearSpots());
    };
  }, [dispatch]);

  return (
    <>
      <ul className="spots">
        {spots.map((spot) => (
          <SpotIndexItem spot={spot} key={spot.id} />
        ))}
      </ul>
      <div
        style={{
          position: "sticky",
          bottom: "150px",
          width: "140px",
          height: "40px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <button
          className="reserveButton"
          onClick={() => history.push("/maps/spots")}
        >
          Show map <i className="fa-solid fa-map"></i>
        </button>
      </div>
    </>
  );
};
export default SpotsIndex;
