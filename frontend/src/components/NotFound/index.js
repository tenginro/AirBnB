import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "100px",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1>We can't seem to find the page you're looking for</h1>
        <h2>Here are some helpful links instead:</h2>
        <h2 style={{ textDecoration: "underline" }}>
          <NavLink to="/">Home</NavLink>
        </h2>
        <h2 style={{ textDecoration: "underline" }}>
          <NavLink to="/maps/spots">Map</NavLink>
        </h2>
      </div>
      <div>
        <img
          src="https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif"
          alt="notFoundImg"
        />
      </div>
    </div>
  );
}
