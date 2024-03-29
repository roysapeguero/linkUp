import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "./SignupModal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <div className="modal-container">
      <div className="close-modal" onClick={closeModal}>
        <i className="fa-solid fa-x"></i>
      </div>
        <i class="fa-solid fa-people-pulling"></i>
      <div className="modal-form-container">
        <h1 className="modal-form-title">Log in</h1>
        <p className="not-member">Not a member yet?<OpenModalButton
          buttonText="Sign up"
          modalComponent={<SignupFormModal />}
        /></p>
        <form onSubmit={handleSubmit}>
          <ul className="errors-container">
            {errors.map((error, idx) => (
              <p className="errors" key={idx}>{error}</p>))}
          </ul>
          <label className="input-label">
            Username or Email
            <input
              className="input-item"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            Password
            <input
              className="input-item"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button id="modal-btns" type="submit">Log In</button>
          <button
            id="modal-btns"
            type="submit"
            onClick={(e) => {
              setCredential("demo@user.io");
              setPassword("password");
            }}
          >
            Demo User
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
