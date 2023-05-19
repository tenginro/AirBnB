// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import SpotsIndex from "./components/AllSpots";
import SpotDetail from "./components/SingleSpotDetail";
import CreateSpotForm from "./components/CreateSpot";
import UserSpot from "./components/UserSpots";
import EditSpotFormWrapper from "./components/EditSpot";
import UserReviews from "./components/UserReviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SpotsIndex />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpotFormWrapper />
          </Route>
          <Route exact path="/spots/new">
            <CreateSpotForm />
          </Route>
          <Route exact path="/spots/current">
            <UserSpot />
          </Route>
          <Route exact path="/reviews/current">
            <UserReviews />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route>
          <Route>
            <h1>404: Page not found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
