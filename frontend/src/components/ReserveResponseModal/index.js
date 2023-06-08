import { useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

export default function ReserveResponseModal() {
  const { closeModal } = useModal();
  const history = useHistory();
  useEffect(() => {
    // Whenever a route change occurs (including redirects), the callback function inside the useEffect will be triggered, and it will scroll the window to the top using window.scrollTo(0, 0). This ensures that the page is scrolled to the top
    const unListen = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unListen();
    };
  }, [history]);

  return (
    <div
      style={{
        width: "320px",
        height: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <h3 style={{ color: "blue" }}>
        <div>Booking is reserved!</div>
        <div>
          Go to{" "}
          <span style={{ textDecoration: "underline" }} onClick={closeModal}>
            <NavLink exact to="/bookings/current">
              Manage Bookings
            </NavLink>{" "}
          </span>
          to view it.
        </div>
      </h3>
    </div>
  );
}
