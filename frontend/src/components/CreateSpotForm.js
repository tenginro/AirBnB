import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage({});

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

    // if (!previewImg)
    //   setErrorMessage({
    //     ...errorMessage,
    //     previewImg: "Preview image is required",
    //   });
    if (newSpot) {
      setErrorMessage({});
      return history.push(`/spots/${newSpot.id}`);
    }
  };

  return (
    <div className="createSpotPage">
      <h1>Create a new Spot</h1>
      <form onSubmit={handleSubmit}>
        <div className="firstSection">
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
          <div className="cityState">
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
              {", "}
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
          </div>
        </div>
        <div className="secondSection">
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
        </div>
        <div className="thirdSection">
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
        </div>
        <div className="fourthSection">
          <h2>Set a base price for your spot</h2>
          <h3>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </h3>
          <label className="priceContainer">
            $
            <input
              type="text"
              value={price}
              placeholder="Price per night (USD)"
              onChange={(e) => setPrice(e.target.value)}
              // required
            ></input>
          </label>
          {errorMessage?.price && (
            <div className="errors">{errorMessage.price}</div>
          )}
        </div>
        <div className="pictureSection">
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
            {/* {!previewImg && (
            <div className="errors">Preview image is required.</div>
          )} */}
            {errorMessage?.url && (
              <div className="errors">{errorMessage.url}</div>
            )}
            {previewImg &&
              previewImg.slice(-4) !== ".png" &&
              previewImg.slice(-4) !== ".jpg" &&
              previewImg.slice(-5) !== ".jpeg" &&
              previewImg.slice(-5) !== ".webp" && (
                <div className="errors">
                  Image URL must end in .png, .jpg, or .jpeg
                </div>
              )}
          </label>
          <label>
            <input
              type="text"
              value={image1}
              placeholder="Image URL"
              onChange={(e) => setImage1(e.target.value)}
            ></input>
            {image1 &&
              image1.slice(-4) !== ".png" &&
              image1.slice(-4) !== ".jpg" &&
              image1.slice(-5) !== ".jpeg" &&
              image1.slice(-5) !== ".webp" && (
                <div className="errors">
                  Image URL must end in .png, .jpg, or .jpeg
                </div>
              )}
          </label>
          <label>
            <input
              type="text"
              value={image2}
              placeholder="Image URL"
              onChange={(e) => setImage2(e.target.value)}
            ></input>
            {image2 &&
              image2.slice(-4) !== ".png" &&
              image2.slice(-4) !== ".jpg" &&
              image2.slice(-5) !== ".jpeg" &&
              image2.slice(-5) !== ".webp" && (
                <div className="errors">
                  Image URL must end in .png, .jpg, or .jpeg
                </div>
              )}
          </label>
          <label>
            <input
              type="text"
              value={image3}
              placeholder="Image URL"
              onChange={(e) => setImage3(e.target.value)}
            ></input>
            {image3 &&
              image3.slice(-4) !== ".png" &&
              image3.slice(-4) !== ".jpg" &&
              image3.slice(-5) !== ".jpeg" &&
              image3.slice(-5) !== ".webp" && (
                <div className="errors">
                  Image URL must end in .png, .jpg, or .jpeg
                </div>
              )}
          </label>
          <label>
            <input
              type="text"
              value={image4}
              placeholder="Image URL"
              onChange={(e) => setImage4(e.target.value)}
            ></input>
            {image4 &&
              image4.slice(-4) !== ".png" &&
              image4.slice(-4) !== ".jpg" &&
              image4.slice(-5) !== ".jpeg" &&
              image4.slice(-5) !== ".webp" && (
                <div className="errors">
                  Image URL must end in .png, .jpg, or .jpeg
                </div>
              )}
          </label>
        </div>
        <div className="createButtonContainer">
          <button className="createSpotButton">Create Spot</button>
        </div>
      </form>
    </div>
  );
};

export default CreateSpotForm;
