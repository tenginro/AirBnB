import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSpot, getAllSpots, getUserSpots } from "../../store/spot";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./DeleteSpotModal.css";

export default function DeleteSpotModal({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
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

  const onClick = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpot(spot))
      .then(closeModal)
      .then(() => dispatch(getUserSpots()))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(Object.values(data.errors));
        }
      });

    return history.push("/spots/current");
  };

  return (
    <>
      <h2>Confirm Delete</h2>
      <h3>Are you sure you want to remove this spot from the listings?</h3>
      <div className="deleteSpotModalButton">
        <button className="yesButton" type="button" onClick={onClick}>
          Yes (Delete Spot)
        </button>
        <button className="noButton" type="button" onClick={closeModal}>
          No (Keep Spot){" "}
        </button>
      </div>
    </>
  );
}
