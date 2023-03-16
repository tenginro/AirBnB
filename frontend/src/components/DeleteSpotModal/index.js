import React, { useState } from "react";
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
