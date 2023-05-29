import React, { useState, useCallback, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { actionClearSpots, getAllSpots } from "../../store/spot";

const MapPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const spotsObj = useSelector((state) => state.spots.allSpots);
  const spotsArr = Object.values(spotsObj);

  // Function to generate an SVG icon with a custom price
  const generateIcon = (price) => ({
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="20"><rect x="0" y="0" width="40" height="20" style="fill:%23000000;stroke:%2374E39A;stroke-width:1" /><text fill="%230000ff" font-size="12" x="50%" y="50%" dominant-baseline="central" text-anchor="middle">$${price}</text></svg>`,
    scaledSize: { width: 40, height: 20 },
  });

  useEffect(() => {
    dispatch(getAllSpots());
    return () => {
      dispatch(actionClearSpots());
    };
  }, [dispatch]);

  const [selectedPlace, setSelectedPlace] = useState({});

  //This sets the center of the map. This must be set BEFORE the map loads
  const [currentPosition, setCurrentPosition] = useState({
    lat: 33.570574,
    lng: -101.8894984,
  });

  // This is the equivalent to a script tag

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
  });

  const containerStyle = {
    width: "100vw",
    height: "100%",
  };

  const [map, setMap] = useState(null);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    // Important! Always set the container height explicitly
    <>
      <div className="map_page__container">
        <div style={{ height: "900px", width: "900px" }}>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={5}
              center={currentPosition}
              onUnmount={onUnmount}
              onClick={() => setSelectedPlace({})}
            >
              {/* <Marker
                position={currentPosition}
                title="Current"
                // icon={iconCurrent}
                streetView={false}
              ></Marker> */}
              {spotsArr?.length &&
                spotsArr?.map((spot) => (
                  <Marker
                    key={spot.id}
                    position={{ lat: +spot.lat, lng: +spot.lng }}
                    title={spot.name}
                    icon={generateIcon(spot.price)}
                    streetView={false}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedPlace(spot)}
                  >
                    {selectedPlace?.id === spot.id &&
                      selectedPlace.lat &&
                      selectedPlace.lng && (
                        <InfoWindow
                          position={{
                            lat: +spot.lat || 33.570574,
                            lng: +spot.lng || -101.8894984,
                          }}
                          // options={{ closeBox: false }}
                        >
                          <div className="spot">
                            <Link to={`/spots/${spot.id}`}>
                              <div>
                                <img
                                  style={{ width: "300px", height: "250px" }}
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
                                  <div>{spot.name}</div>
                                  <div className="spotLineTwo">
                                    ${spot.price} night
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </InfoWindow>
                      )}
                  </Marker>
                ))}
            </GoogleMap>
          )}
        </div>
      </div>
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
        <button className="reserveButton" onClick={() => history.push("/")}>
          Show list <i className="fa-solid fa-list"></i>
        </button>
      </div>
    </>
  );
};

export default MapPage;
