import React, { useState} from "react";
import { useDispatch} from "react-redux";
import { useModal } from "../../context/Modal";
import {createGroup, getGroup} from "../../store/groups";
import './CreateGroup.css';

function CreateGroupModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [url, setUrl] = useState('');
  // const [numMembers, setNumMembers] = useState(1)
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      createGroup(
        {
          name,
          about,
          type,
          private: privacy,
          city,
          state,
          url
        },
      )
    )
      .then((group) => dispatch(getGroup(group.id)))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(Object.values(data.errors));
      });
  };

  return (
    <div className="modal-container">
      <div className="close-modal" onClick={closeModal}>
        <i className="fa-solid fa-x"></i>
      </div>
      <div className="modal-form-container">
        <h1 className="modal-form-title">Create A Group</h1>
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
            About
            <input
              className="input-item"
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
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
            City
            <input
              className="input-item"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label className="input-label">
            State
            <input
              className="input-item"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
          <label htmlFor="url" className="input-label">
            Add Image
          </label>
          <input
            className="input-item"
            id="url"
            type="url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            placeholder="Please image add url"
          />
          <label className="input-label">
            Private
            <input
              className="form-input-item-checkbox"
              type="checkbox"
              id="private"
              name="private"
              value={privacy}
              checked={privacy ? "checked" : ""}
              onChange={(e) => {
              setPrivacy(privacy === false);
              }}
            ></input>
          </label>
          <button id="btns5" type="submit" >Create Group</button>
        </form>
      </div>
    </div>
  );
}

export default CreateGroupModal;
