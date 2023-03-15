import { NavLink, useHistory } from "react-router-dom";

const UserSpotIndexItem = ({ spot }) => {
  const history = useHistory();

  const onClickUpdate = (e) => {
    e.preventDefault();
    return history.push(`/spots/${spot.id}/edit`);
  };

  return (
    <li className="spot">
      <NavLink to={`/spots/${spot.id}`}>
        <div>
          <img
            src={spot.previewImage}
            alt="spotPreviewImage"
            title={spot.name}
          ></img>
          <div className="spotLineOne">
            <div>
              {spot.city}, {spot.state}
            </div>
            <div>
              <i className="fas fa-sharp fa-solid fa-star"></i>
              {typeof spot.avgRating === "number" ? spot.avgRating : "New"}
            </div>
          </div>
          <div className="spotLineTwo">${spot.price} night</div>
        </div>
      </NavLink>
      <div>
        <button onClick={onClickUpdate}>
          <NavLink exact to={`/spots/${spot.id}/edit`} spot={spot}>
            Update
          </NavLink>
        </button>
        <button>Delete</button>
      </div>
    </li>
  );
};
export default UserSpotIndexItem;
