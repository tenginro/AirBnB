import { useEffect, useState } from "react";
import { createSelectorHook, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpot } from "../store/spot";
import "./CreateSpotForm.css";

const CreateSpotForm = () => {
  const user = useSelector((state) => state.session.user);

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [previewImgError, setPreviewImgError] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // return dispatch(
    //   CreateSpot({
    //     address,
    //     city,
    //     state,
    //     country,
    //     name,
    //     description,
    //     price,
    //   }).catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(Object.values(data.errors));
    //   })
    // );

    const payload = {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
      previewImg,
      image1,
      image2,
      image3,
      image4,
    };

    let newSpot = await dispatch(createSpot(payload, user))
      .then((res) => {
        return res;
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrorMessage(data.errors);
      });

    return history.push(`/spots/${newSpot.id}`);
  };

  return (
    <>
      <h1>Create a new Spot</h1>
      <form onSubmit={handleSubmit}>
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

        <h2>Liven up your spot with photos</h2>
        <h3>Submit a link to at least one photo to publish your spot.</h3>
        <label>
          <input
            type="text"
            value={previewImg}
            placeholder="Preview Image URL"
            onChange={(e) => setPreviewImg(e.target.value)}
            // required
          ></input>
          {errorMessage?.url && (
            <div className="errors">{errorMessage.url}</div>
          )}
        </label>
        <label>
          <input
            type="text"
            value={image1}
            placeholder="Image URL"
            onChange={(e) => setImage1(e.target.value)}
          ></input>
        </label>
        <label>
          <input
            type="text"
            value={image2}
            placeholder="Image URL"
            onChange={(e) => setImage2(e.target.value)}
          ></input>
        </label>
        <label>
          <input
            type="text"
            value={image3}
            placeholder="Image URL"
            onChange={(e) => setImage3(e.target.value)}
          ></input>
        </label>
        <label>
          <input
            type="text"
            value={image4}
            placeholder="Image URL"
            onChange={(e) => setImage4(e.target.value)}
          ></input>
        </label>
        <button>Create Spot</button>
      </form>
    </>
  );
};

export default CreateSpotForm;
