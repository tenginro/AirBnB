import { Link } from "react-router-dom";

const SpotIndexItem = ({ spot }) => {
  return (
    <li className="spot">
      <Link to={`/spots/${spot.id}`}>
        <div>
          <img src={spot.previewImage} alt="spotPreviewImage"></img>
          <div className="spotLineOne">
            <div>
              {spot.city}, {spot.state}
            </div>
            <div>
              <i class="fas fa-sharp fa-solid fa-star"></i>
              {spot.avgRating}
            </div>
          </div>
          <div className="spotLineTwo">${spot.price} night</div>
        </div>
      </Link>
    </li>
  );
};
export default SpotIndexItem;
