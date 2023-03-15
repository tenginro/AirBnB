import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spot";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

export default function DeleteSpotModal({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const onClick = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpot(spot))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log(data);
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
      <button type="button" onClick={onClick}>
        Yes (Delete Spot)
      </button>
      <button type="button" onClick={closeModal}>
        No (Keep Spot){" "}
      </button>
    </>
  );
}
