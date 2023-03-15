import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSpotDetail } from "../store/spot";

const EditSpotForm = async () => {
  const { spotId } = useParams();
  console.log(spotId);

  const user = useSelector((state) => state.session.user);
  const spot = await dispatch(getSpotDetail(spotId));

  console.log(spot);

  const [country, setCountry] = useState(spot.country);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [description, setDescription] = useState(spot.description);
  const [name, setName] = useState(spot.name);
  const [price, setPrice] = useState(spot.price);
  const [errorMessage, setErrorMessage] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <h1>Update your Spot</h1>
      <form
      //   onSubmit={handleSubmit}
      >
        <h2>Where's your place located?</h2>
        <h3>
          Guests will only get your exact address once they booked a
          reservation.
        </h3>
        <label>
          <div className="inputLabel">
            Country
            {errorMessage?.country && (
              <div className="errors">{errorMessage.country}</div>
            )}
          </div>
          <input
            type="text"
            value={country}
            placeholder="country"
            onChange={(e) => setCountry(e.target.value)}
            // required
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            Street Address
            {errorMessage?.address && (
              <div className="errors">{errorMessage.address}</div>
            )}
          </div>
          <input
            type="text"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            // required
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            City
            {errorMessage?.city && (
              <div className="errors">{errorMessage.city}</div>
            )}
          </div>
          <input
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            // required
          ></input>
        </label>

        <label>
          <div className="inputLabel">
            State
            {errorMessage?.state && (
              <div className="errors">{errorMessage.state}</div>
            )}
          </div>
          <input
            type="text"
            value={state}
            placeholder="STATE"
            onChange={(e) => setState(e.target.value)}
            // required
          ></input>
        </label>

        <h2>Describe your place to guests</h2>
        <h3>
          Mention the best features of your space, any special amentities like
          fast wifi or parking, and what you love about the neighborhood.
        </h3>
        <textarea
          type="text"
          value={description}
          placeholder="Please write at least 30 characters"
          onChange={(e) => setDescription(e.target.value)}
          //   required
        ></textarea>
        {errorMessage?.description && (
          <div className="errors">{errorMessage.description}</div>
        )}

        <h2>Create a title for your spot</h2>
        <h3>
          Catch guests' attention with a spot title that highlights what makes
          your place special.
        </h3>
        <label>
          <input
            type="text"
            value={name}
            placeholder="Name of your spot"
            onChange={(e) => setName(e.target.value)}
            // required
          ></input>
          {errorMessage?.name && (
            <div className="errors">{errorMessage.name}</div>
          )}
        </label>

        <h2>Set a base price for your spot</h2>
        <h3>
          Competitive pricing can help your listing stand out and rank higher in
          search results.
        </h3>
        <label>
          $
          <input
            type="text"
            value={price}
            placeholder="Price per night (USD)"
            onChange={(e) => setPrice(e.target.value)}
            // required
          ></input>
          {errorMessage?.price && (
            <div className="errors">{errorMessage.price}</div>
          )}
        </label>
        <button>Update Spot</button>
      </form>
    </>
  );
};

export default EditSpotForm;
