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
      <div className="filters">
        <div
          className="category"
          onClick={(e) => {
            e.preventDefault();
            history.push("/spots/search/tree");
          }}
        >
          <div>
            <i className="fa-solid fa-tree fa-2x"></i>
          </div>
          <div>Treehouses</div>
        </div>
        <div
          className="category"
          onClick={(e) => {
            e.preventDefault();
            history.push("/spots/search/beach");
          }}
        >
          <div>
            <i className="fa-solid fa-umbrella-beach fa-2x"></i>
          </div>
          <div>Beachfront</div>
        </div>
        <div
          className="category"
          onClick={(e) => {
            e.preventDefault();
            history.push("/spots/search/city");
          }}
        >
          <div>
            <i className="fa-solid fa-city fa-2x"></i>
          </div>
          <div>Cityview</div>
        </div>
        <div
          className="category"
          onClick={(e) => {
            e.preventDefault();
            history.push("/spots/search/house");
          }}
        >
          <div>
            <i className="fa-solid fa-house fa-2x"></i>
          </div>
          <div>Houses</div>
        </div>
        <div
          className="category"
          onClick={(e) => {
            e.preventDefault();
            history.push("/spots/search/design");
          }}
        >
          <div>
            <i className="fa-solid fa-swatchbook fa-2x"></i>
          </div>
          <div>Design</div>
        </div>
        <div
          className="category"
          onClick={(e) => {
            e.preventDefault();
            history.push("/spots/search/pool");
          }}
        >
          <div>
            <i class="fa-solid fa-person-swimming fa-2x"></i>
          </div>
          <div>Pools</div>
        </div>
      </div>
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
