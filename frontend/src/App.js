// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/SpotsIndex";
import SpotDetail from "./components/SpotDetail";
import CreateSpotForm from "./components/CreateSpotForm";

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
          <Route path="/spots/new">
            <CreateSpotForm />
          </Route>
          {/* <Route path="/spots/current">
            <UserSpot />
          </Route> */}
          <Route path="/spots/:spotId">
            <SpotDetail />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
