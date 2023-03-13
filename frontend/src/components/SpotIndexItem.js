import { Link } from "react-router-dom";
import "./spot.css";

const SpotIndexItem = ({ spot }) => {
  return (
    <li className="spot">
      <Link to={`/spots/${spot.id}`}>
        <div>
          <img src={spot.previewImage} alt="spotPreviewImage"></img>
          <div>
            <div>
              {spot.city}, {spot.state}
            </div>
            <div>{spot.avgRating}</div>
          </div>
          <div>${spot.price} night</div>
        </div>
      </Link>
    </li>
  );
};
export default SpotIndexItem;
