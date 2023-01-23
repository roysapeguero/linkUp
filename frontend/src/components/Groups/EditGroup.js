import React, { useState} from "react";
import { useDispatch} from "react-redux";
import { useModal } from "../../context/Modal";
import {updateGroup, getGroup} from "../../store/groups";

function EditGroupModal({group}) {
  const dispatch = useDispatch();

  const [name, setName] = useState(group.name);
  const [about, setAbout] = useState(group.about);
  const [type, setType] = useState(group.type);
  const [privacy, setPrivacy] = useState(group.private);
  const [city, setCity] = useState(group.city);
  const [state, setState] = useState(group.state);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      updateGroup(
        {
          ...group,
          name,
          about,
          type,
          private: privacy,
          city,
          state
        },
        group.id
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
        <h1 className="modal-form-title">Edit Group</h1>
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
            <div>
              <select
                className="input-item"
                name="type"
                onChange={(e) => setType(e.target.value)}
                value={type}
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
          <button id="modal-btns" type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditGroupModal;
