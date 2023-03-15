import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";

const SpotIndexItem = ({ spot }) => {
  const sessionUser = useSelector((state) => state.session.user);
  // const history = useHistory();

  // const onClickUpdate = (e) => {
  //   e.preventDefault();
  //   return history.push(`/spots/${spot.id}/edit`);
  // };

  return (
    <li className="spot">
      <Link to={`/spots/${spot.id}`}>
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
      </Link>
      {/* {sessionUser.id === spot.ownerId && (
        <div>
          <button onClick={onClickUpdate}>
            <NavLink exact to={`/spots/${spot.id}/edit`} spot={spot}>
              Update
            </NavLink>
          </button>
          <button>Delete</button>
        </div>
      )} */}
    </li>
  );
};
export default SpotIndexItem;
