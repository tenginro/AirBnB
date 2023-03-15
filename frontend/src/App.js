// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/SpotsIndex";
import SpotDetail from "./components/SpotDetail";
import CreateSpotForm from "./components/CreateSpotForm";
import UserSpot from "./components/UserSpot";
import EditSpotForm from "./components/EditSpotForm";
import { getAllSpots } from "./store/spot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [spots, setSpots] = useState({});

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    // dispatch(getAllSpots());
    // .then((res) => setSpots(res));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SpotsIndex />
          </Route>
          <Route exact path="/spots/new">
            <CreateSpotForm />
          </Route>
          <Route exact path="/spots/current">
            <UserSpot />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <EditSpotForm />
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
