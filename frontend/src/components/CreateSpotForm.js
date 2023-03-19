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

  const [previewError, setPreviewError] = useState({});
  const [urlError, setUrlError] = useState({});
  const [cityError, setCityError] = useState({});
  const [stateError, setStateError] = useState({});
  const [countryError, setCountryError] = useState({});
  const [addressError, setAddressError] = useState({});
  const [nameError, setNameError] = useState({});
  const [descriptionError, setDescriptionError] = useState({});
  const [priceError, setPriceError] = useState({});
  const [image1Error, setImage1Error] = useState({});
  const [image2Error, setImage2Error] = useState({});
  const [image3Error, setImage3Error] = useState({});
  const [image4Error, setImage4Error] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage({});
    setPreviewError({});
    setUrlError({});
    setCountryError({});
    setAddressError({});
    setCityError({});
    setStateError({});
    setDescriptionError({});
    setNameError({});
    setPriceError({});
    setImage1Error({});
    setImage2Error({});
    setImage3Error({});
    setImage4Error({});

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

    if (!previewImg) {
      setPreviewError({ previewImg: "Preview image is required" });
    }
    if (
      previewImg &&
      previewImg.slice(-4) !== ".jpg" &&
      previewImg.slice(-4) !== ".png" &&
      previewImg.slice(-5) !== ".jpeg"
    ) {
      setUrlError({ url: "Image URL must end in .png, .jpg, or .jpeg" });
    }
    if (
      image1 &&
      image1.slice(-4) !== ".jpg" &&
      image1.slice(-4) !== ".png" &&
      image1.slice(-5) !== ".jpeg"
    ) {
      setImage1Error({ image1: "Image URL must end in .png, .jpg, or .jpeg" });
    }
    if (
      image2 &&
      image2.slice(-4) !== ".jpg" &&
      image2.slice(-4) !== ".png" &&
      image2.slice(-5) !== ".jpeg"
    ) {
      setImage2Error({
        image2: "Image URL must end in .png, .jpg, or .jpeg",
      });
    }
    if (
      image3 &&
      image3.slice(-4) !== ".jpg" &&
      image3.slice(-4) !== ".png" &&
      image3.slice(-5) !== ".jpeg"
    ) {
      setImage3Error({
        image3: "Image URL must end in .png, .jpg, or .jpeg",
      });
    }
    if (
      image4 &&
      image4.slice(-4) !== ".jpg" &&
      image4.slice(-4) !== ".png" &&
      image4.slice(-5) !== ".jpeg"
    ) {
      setImage4Error({
        image4: "Image URL must end in .png, .jpg, or .jpeg",
      });
    }
    if (!country) {
      setCountryError({ country: "Country is required" });
    }
    if (!address) {
      setAddressError({ address: "Address is required" });
    }
    if (!city) {
      setCityError({ city: "City is required" });
    }
    if (!state) {
      setStateError({ state: "State is required" });
    }
    if (description.length < 30) {
      setDescriptionError({
        description: "Description needs a minimum of 30 characters",
      });
    }
    if (!name) {
      setNameError({ name: "Name is required" });
    }
    if (!price) {
      setPriceError({ price: "Price is required" });
    }

    if (
      countryError.country ||
      addressError.address ||
      cityError.city ||
      stateError.state ||
      descriptionError.description ||
      nameError.name ||
      priceError.price ||
      previewError.previewImg ||
      urlError.url ||
      image1Error.image1 ||
      image2Error.image2 ||
      image3Error.image3 ||
      image4Error.image4
    ) {
      return null;
    }

    if (
      previewImg &&
      (previewImg.slice(-4) === ".jpg" ||
        previewImg.slice(-4) === ".png" ||
        previewImg.slice(-5) === ".jpeg") &&
      country &&
      state &&
      city &&
      name &&
      price &&
      description.length >= 30 &&
      !image1Error.image1 &&
      !image2Error.image2 &&
      !image3Error.image3 &&
      !image4Error.image4
    ) {
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
        setPreviewError({});
        setUrlError({});
        setCountryError({});
        setAddressError({});
        setCityError({});
        setStateError({});
        setDescriptionError({});
        setNameError({});
        setPriceError({});
        setImage1Error({});
        setImage2Error({});
        setImage3Error({});
        setImage4Error({});
        return history.push(`/spots/${newSpot.id}`);
      }
    }
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
              {countryError?.country && (
                <div className="errors">{countryError.country}</div>
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
              {addressError?.address && (
                <div className="errors">{addressError.address}</div>
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
                {cityError?.city && (
                  <div className="errors">{cityError.city}</div>
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
                {stateError?.state && (
                  <div className="errors">{stateError.state}</div>
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
          {descriptionError?.description && (
            <div className="errors">{descriptionError.description}</div>
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
            {nameError?.name && <div className="errors">{nameError.name}</div>}
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
          {priceError?.price && (
            <div className="errors">{priceError.price}</div>
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
            {previewError?.previewImg && (
              <div className="errors">{previewError.previewImg}</div>
            )}
            {urlError?.url && <div className="errors">{urlError.url}</div>}
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
              errorMessage?.url && (
                <div className="errors">{errorMessage.url}</div>
              )}
            {image1 &&
              image1.slice(-4) !== ".png" &&
              image1.slice(-5) !== ".jpeg" &&
              image1.slice(-4) !== ".jpg" &&
              image1Error?.image1 && (
                <div className="errors">{image1Error.image1}</div>
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
              errorMessage?.url && (
                <div className="errors">{errorMessage.url}</div>
              )}
            {image2 &&
              image2.slice(-4) !== ".png" &&
              image2.slice(-5) !== ".jpeg" &&
              image2.slice(-4) !== ".jpg" &&
              image2Error?.image2 && (
                <div className="errors">{image2Error.image2}</div>
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
              errorMessage?.url && (
                <div className="errors">{errorMessage.url}</div>
              )}
            {image3 &&
              image3.slice(-4) !== ".png" &&
              image3.slice(-5) !== ".jpeg" &&
              image3.slice(-4) !== ".jpg" &&
              image3Error?.image3 && (
                <div className="errors">{image3Error.image3}</div>
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
              errorMessage?.url && (
                <div className="errors">{errorMessage.url}</div>
              )}
            {image4 &&
              image4.slice(-4) !== ".png" &&
              image4.slice(-5) !== ".jpeg" &&
              image4.slice(-4) !== ".jpg" &&
              image4Error?.image4 && (
                <div className="errors">{image4Error.image4}</div>
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
