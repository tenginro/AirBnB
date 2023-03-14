// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

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
      .catch(async (res) => {
        const data = await res.json();
        // if (data && data.message) setErrors(data.message);
        if (data && data.errors) {
          setErrors(Object.values(data.errors));
        }
      });
  };

  const onClick = (e) => {
    e.preventDefault();
    setCredential("demo@user.io");
    setPassword("password");
    return dispatch(sessionActions.login({ credential, password })).then(
      closeModal
    );
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li className="error" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            // placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            // required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            // placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </label>
        <button
          type="submit"
          disabled={credential.length < 4 || password.length < 6 ? true : false}
        >
          Log In
        </button>
        <button type="button" onClick={onClick}>
          Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
