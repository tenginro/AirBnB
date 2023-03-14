// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="nav ul">
      <li className="home li">
        {/* to render an image, need this format */}
        <NavLink exact to="/">
          <div className="logoLine">
            <img className="logo" src={require("./icon1.png")} alt="icon"></img>
            HereBnB
          </div>
        </NavLink>
      </li>
      {isLoaded && (
        <li className="profile li">
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
