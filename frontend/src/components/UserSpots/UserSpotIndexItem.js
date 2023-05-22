import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";

import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSpotModal from "../DeleteSpotModal";

const UserSpotIndexItem = ({ spot }) => {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = (e) => {
    e.stopPropagation();
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      // you want the dropdown menu to close only if the click happened OUTSIDE the dropdown.
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const onClickUpdate = (e) => {
    e.preventDefault();
    return history.push(`/spots/${spot.id}/edit`);
  };

  return (
    <li className="spot">
      <NavLink to={`/spots/${spot.id}`}>
        <div>
          <img
            src={spot.previewImage}
            alt="spotPreviewImage"
            title={spot.name}
          ></img>
          <div className="spotInfo">
            <div className="spotLineOne">
              <div>
                {spot.city}, {spot.state}
              </div>
              <div>
                <i className="fas fa-sharp fa-solid fa-star"></i>
                {typeof spot.avgRating === "number"
                  ? spot.avgRating.toFixed(1)
                  : "New"}
              </div>
            </div>
            <div className="spotLineTwo">${spot.price} night</div>
          </div>
        </div>
      </NavLink>
      <div className="userSpotButtons">
        <button onClick={onClickUpdate} className="updateSpotButton">
          <NavLink exact to={`/spots/${spot.id}/edit`} spot={spot}>
            <div style={{ color: "white" }}>Update spot</div>
          </NavLink>
        </button>
        <button className="deleteSpotButton">
          {" "}
          <OpenModalMenuItem
            itemText="Delete spot"
            onItemClick={closeMenu}
            modalComponent={<DeleteSpotModal spot={spot} />}
          />
        </button>
      </div>
    </li>
  );
};
export default UserSpotIndexItem;
