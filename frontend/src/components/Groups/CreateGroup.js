import React, { useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import {createGroup} from "../../store/groups";

function CreateGroupModal() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("In person");
  const [privacy, setPrivacy] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [previewImage, setPreviewImage] = useState('');
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
      createGroup(
        {
          name,
          about,
          type,
          private: privacy,
          city,
          state,
        },
        image
      )
    )
      .then((data) => history.push(`/groups/${data.id}`))
      .then(closeModal)
      .catch(async (response) => {
        const data = await response.json();
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
          <ul className="errors-container">
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
            About
            <input
              className="input-item"
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            Type
          </label>
            <br />
            <br />
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
            City
            <input
              className="input-item"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            State
            <input
              className="input-item"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
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
            placeholder="Please add image url"
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
          <button id="modal-btns" type="submit" >Create Group</button>
        </form>
      </div>
    </div>
  );
}

export default CreateGroupModal;
