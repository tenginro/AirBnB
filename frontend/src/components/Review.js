import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../store/review";

const SpotReviews = ({ spot }) => {
  const reviewsObj = useSelector((state) => state.reviews.spot);
  const reviewsArr = Object.values(reviewsObj);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReviews(spot.id));
  }, [dispatch, spot.id]);

  if (!reviewsArr.length) return null;
  return reviewsArr.map((review) => (
    <div>
      <div>{review.User.firstName}</div>
      <div>{review.createdAt}</div>
      <div>{review.review}</div>
    </div>
  ));
};

export default SpotReviews;
