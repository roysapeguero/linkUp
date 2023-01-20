import React, { useState} from "react";
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import {createEvent, getEvent} from "../../store/events";
import './CreateEvent.css';

function CreateEventModal({group}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [venueId, setVenueId] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
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
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label className="input-label">
            Name
            <input
              className="input-item"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="input-label">
            Type
          </label>
            <br />
            <br />
            <div>
              <label htmlFor='in-person'>In Person</label>
              <input
                className="input-item"
                name='select-type'
                id='in-person'
                type="radio"
                value='In person'
                onChange={(e) => setType(e.target.value)}
              />
              <label htmlFor='online'>Online</label>
              <input
                className="input-item"
                name='select-type'
                id='online'
                type="radio"
                value='Online'
                onChange={(e) => setType(e.target.value)}
              />
            </div>
          <label className="input-label">
            Capacity
            <input
              className="input-item"
              type="text"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </label>
          <label className="input-label">
            Price
            <input
              className="input-item"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label className="input-label">
            Description
            <input
              className="input-item"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label className="input-label">
            Start Date & Time
            <input
              className="input-item"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label className="input-label">
            End Date & Time
            <input
              className="input-item"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
          <button id="btns5" type="submit" >Create An Event</button>
        </form>
      </div>
    </div>
  )
}

export default CreateEventModal;
