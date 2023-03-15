import { useDispatch } from "react-redux";
import { deleteSpot } from "../../store/spot";
import { useModal } from "../../context/Modal";

export default function DeleteSpotModal({ spot }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const onClick = (e) => {
    e.preventDefault();
    return dispatch(deleteSpot(spot)).then(closeModal);
  };

  console.log(spot.id);

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
