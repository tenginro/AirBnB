import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";

const SpotIndexItem = ({ spot }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <li className="spot">
      <Link to={`/spots/${spot.id}`}>
        <div>
          <img
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
            <div className="spotLineTwo">${spot.price} night</div>
          </div>
        </div>
      </Link>
    </li>
  );
};
export default SpotIndexItem;
