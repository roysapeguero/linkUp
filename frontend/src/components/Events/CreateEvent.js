import React, { useState} from "react";
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import {createEvent} from "../../store/events";

function CreateEventModal({group}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [venueId, setVenueId] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("In person");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const image = {
      url: previewImage,
      "preview": true
    }
    setErrors([]);
    return dispatch(
      createEvent(
        {
          venueId,
          name,
          type,
          capacity,
          price,
          description,
          startDate,
          endDate
        },
        group.id,
        image
      )
    )
    .then((data) => history.push(`/events/${data.id}`))
    .then(closeModal)
    .catch(async (response) => {
      const data = await response.json();
      if (data && data.errors) setErrors(Object.values(data.errors));
    });
  };

  return (
    <div>
      <div className="close-modal" onClick={closeModal}>
        <i className="fa-solid fa-x"></i>
      </div>
      <div className="modal-form-container">
        <h1 className="modal-form-title">Create An Event</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) =>
              <p className="errors" key={idx}>{error}</p>)}
          </ul>
          <label className="input-label">
            Name
            <input
              className="input-item"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            Type
          </label>
            <div>
              <select
                className="input-item"
                name="type"
                onChange={(e) => setType(e.target.value)}
                value={type}
                required
                >
                <option value="In person" className="input-item">
                  In person
                </option>
                <option value="Online" className="input-item">
                  Online
                </option>
              </select>
            </div>
          <label className="input-label">
            Capacity
            <input
              className="input-item"
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            Price
            <input
              className="input-item"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            Description
            <input
              className="input-item"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            Start Date
            <input
              className="input-item"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            End Date
            <input
              className="input-item"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
          <label htmlFor="url" className="input-label">
            Add Image
          </label>
          <input
            className="input-item"
            id="url"
            type="url"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            required
            placeholder="Please image add url"
          />
          <button id="modal-btns" type="submit" >Create An Event</button>
        </form>
      </div>
    </div>
  )
}

export default CreateEventModal;
