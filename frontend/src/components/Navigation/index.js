// frontend/src/components/Navigation/index.js
import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";

function Navigation({ isLoaded, searchQuery, setSearchQuery }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    setSearchQuery("");
  }, [dispatch]);

  useEffect(() => {
    setSearchQuery("");
  }, []);

  return (
    <div className="navBar">
      <ul className="nav ul">
        <li className="home li">
          <NavLink exact to="/">
            <div className="logoLine" onClick={() => setSearchQuery("")}>
              <img
                className="logo"
                src={require("./icon1.png")}
                alt="icon"
              ></img>
              HereBnB
            </div>
          </NavLink>
        </li>
        <li className="searchBar">
          <input
            type="search"
            className="searchInput"
            placeholder="Search"
            spellCheck={true}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setSearchQuery(e.target.value);
                if (searchQuery.length) {
                  history.push(`/spots/search/${searchQuery}`);
                }
              }
            }}
          ></input>
        </li>
        <div className="rightSide">
          {sessionUser && (
            <li>
              <NavLink exact to="/spots/new">
                <div className="createSpot">Create a New Spot</div>
              </NavLink>
            </li>
          )}
          {isLoaded && (
            <li className="profile li">
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
