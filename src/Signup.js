import React, { useState } from "react";
import axios from 'axios';
import "./signup.css";


const Signup = ({ onSignupSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
      const userData = { username, password };
    axios.post('http://localhost:9000/user/register', userData)
      .then(res => {
        if (res.status === 200) {
          console.log(res.data.message);
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          setError("");
          onSignupSubmit();
        } else {
          setError("Failed to register");
        }
      })
      .catch(error => {
        console.error('Error occurred while registering user:', error);
      });
  };
  

  return (
    <div className="register-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
