import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";

const SpotIndexItem = ({ spot }) => {
  const sessionUser = useSelector((state) => state.session.user);

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
            <div className="spotLineTwo">${spot.price} per night</div>
          </div>
        </div>
      </Link>
    </li>
  );
};
export default SpotIndexItem;
