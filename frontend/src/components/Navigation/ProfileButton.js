// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    return history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  console.log(ulClassName);

  return (
    <>
      <div className="profile div">
        <button className="profile button" onClick={openMenu}>
          <i className="fas fa-solid fa-bars fa-lg" />
          <i className="fas fa-user-circle fa-lg" />
        </button>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li>Hello, {user.firstName}</li>
              <li>{user.email}</li>
              <li className="hoverEffect" onClick={closeMenu}>
                <NavLink exact to="/spots/current" user={user}>
                  Manage Spots
                </NavLink>
              </li>
              <li className="hoverEffect" onClick={closeMenu}>
                <NavLink exact to="/reviews/current" user={user}>
                  Manage Reviews
                </NavLink>
              </li>
              <li className="hoverEffect" onClick={closeMenu}>
                <NavLink exact to="/bookings/current" user={user}>
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <button className="logoutButton" onClick={logout}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <div className="hoverEffect logInWord">
                <OpenModalMenuItem
                  itemText="Log In"
                  className="hoverEffect"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div className="hoverEffect logInWord">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  className="hoverEffect"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
