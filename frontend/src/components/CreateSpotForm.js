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

    // if (
    //   !previewImg ||
    //   !country ||
    //   !state ||
    //   !city ||
    //   description.length < 30 ||
    //   !name ||
    //   !price
    // ) {
    //   if (!previewImg) {
    //     setErrorMessage({
    //       ...errorMessage,
    //       previewImg: "Preview image is required",
    //     });
    //   }
    //   if (!address) {
    //     setErrorMessage({
    //       ...errorMessage,
    //       address: "Address is required",
    //     });
    //   }
    //   if (!country) {
    //     setErrorMessage({
    //       ...errorMessage,
    //       country: "Country is required",
    //     });
    //   }
    //   if (!city) {
    //     setErrorMessage({
    //       ...errorMessage,
    //       city: "City is required",
    //     });
    //   }
    //   if (!state) {
    //     setErrorMessage({
    //       ...errorMessage,
    //       state: "State is required",
    //     });
    //   }
    //   if (description.length < 30) {
    //     setErrorMessage({
    //       ...errorMessage,
    //       state: "Description needs a minimum of 30 characters",
    //     });
    //   }
    //   if (!name) {
    //     setErrorMessage({
    //       ...errorMessage,
    //       name: "Name is required",
    //     });
    //   }
    //   if (!price) {
    //     setErrorMessage({
    //       ...errorMessage,
    //       price: "Price is required",
    //     });
    //   }
    //   return errorMessage;
    // } else {
    // setErrorMessage({});
    // if (
    //   !previewImg &&
    //   (!address ||
    //     !country ||
    //     !state ||
    //     !city ||
    //     !name ||
    //     !price ||
    //     description.length < 30)
    // ) {
    //   let errorObj = {};
    //   if (!address) errorObj[address] = "Address is required";
    //   if (!city) errorObj[city] = "Cit is required";
    //   if (!state) errorObj[state] = "State is required";
    //   if (!country) errorObj[country] = "Country is required";
    //   if (!name) errorObj[name] = "Name is required";
    //   if (!price) errorObj[price] = "Price is required";
    //   if (description.length < 30)
    //     errorObj[description] = "Description needs a minimum of 30 characters";

    //   setErrorMessage({
    //     ...errorObj,
    //     previewImg: "Preview image is required",
    //   });
    // }

    if (
      !country &&
      !address &&
      !city &&
      !state &&
      description.length < 30 &&
      !name &&
      !price &&
      !previewImg
    ) {
      return setErrorMessage({
        previewImg: "Preview image is required",
        city: "City is required",
        state: "State is required",
        address: "Address is required",
        country: "Country is required",
        name: "Name is required",
        price: "Price is required",
        description: "Description needs a minimum of 30 characters",
      });
    }
    if (
      !previewImg &&
      country &&
      state &&
      city &&
      name &&
      price &&
      description.length >= 30
    ) {
      return setErrorMessage({ previewImg: "Preview image is required" });
    }
    if (
      previewImg &&
      previewImg.slice(-4) !== ".jpg" &&
      previewImg.slice(-4) !== ".png" &&
      previewImg.slice(-5) !== ".jpeg" &&
      country &&
      state &&
      city &&
      name &&
      price &&
      description.length >= 30
    ) {
      return setErrorMessage({
        url: "Image URL must end in .png, .jpg, or .jpeg",
      });
    } else {
      let newSpot = await dispatch(createSpot(payload, user))
        .then((res) => {
          return res;
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrorMessage(data.errors);
        });

      if (newSpot) {
        setErrorMessage({});
        return history.push(`/spots/${newSpot.id}`);
      }
    }
    // }
  };

  return (
    <div className="createSpotPage">
      <h1>Create a new Spot</h1>
      <form onSubmit={handleSubmit} id="createSpotForm">
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
            {errorMessage?.previewImg && (
              <div className="errors">{errorMessage.previewImg}</div>
            )}
            {previewImg &&
              previewImg.slice(-4) !== ".png" &&
              previewImg.slice(-5) !== ".jpeg" &&
              previewImg.slice(-4) !== ".jpg" &&
              errorMessage?.url && (
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
            {image1 &&
              image1.slice(-4) !== ".png" &&
              image1.slice(-5) !== ".jpeg" &&
              image1.slice(-4) !== ".jpg" &&
              errorMessage?.url(
                <div className="errors">{errorMessage.url}</div>
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
              image2.slice(-5) !== ".jpeg" &&
              image2.slice(-4) !== ".jpg" &&
              errorMessage?.url(
                <div className="errors">{errorMessage.url}</div>
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
              image3.slice(-5) !== ".jpeg" &&
              image3.slice(-4) !== ".jpg" &&
              errorMessage?.url(
                <div className="errors">{errorMessage.url}</div>
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
              image4.slice(-5) !== ".jpeg" &&
              image4.slice(-4) !== ".jpg" &&
              errorMessage?.url(
                <div className="errors">{errorMessage.url}</div>
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
