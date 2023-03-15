import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteSpot } from "../store/spot";
import OpenModalMenuItem from "./Navigation/OpenModalMenuItem";
import DeleteSpotModal from "./DeleteSpotModal";

const UserSpotIndexItem = ({ spot }) => {
  const history = useHistory();
  const dispatch = useDispatch();
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

  const onClickDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpot(spot.id));
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
          <div className="spotLineOne">
            <div>
              {spot.city}, {spot.state}
            </div>
            <div>
              <i className="fas fa-sharp fa-solid fa-star"></i>
              {typeof spot.avgRating === "number" ? spot.avgRating : "New"}
            </div>
          </div>
          <div className="spotLineTwo">${spot.price} night</div>
        </div>
      </NavLink>
      <div>
        <button onClick={onClickUpdate}>
          <NavLink exact to={`/spots/${spot.id}/edit`} spot={spot}>
            Update
          </NavLink>
        </button>
        <button onClick={onClickDelete}>
          {" "}
          <OpenModalMenuItem
            itemText="Delete"
            onItemClick={closeMenu}
            modalComponent={<DeleteSpotModal spot={spot} />}
          />
        </button>
      </div>
    </li>
  );
};
export default UserSpotIndexItem;
