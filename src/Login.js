import React from 'react';
import { useState } from 'react';
import './login.css';   
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
      const data = { username, password };
      axios.post('https://demo-rho-snowy.vercel.app/user/login', data).then(
        res=>{
          if (res.status === 200) {
            if(res.data.message === "This user is in the database"){
              const userData = {
                username:data.username,
                userid:res.data.userId
              }
              navigate('/home', { state: { userData } });
            }else{
              window.alert("Create an account");
            } 
          } else {
            console.log("Failed to login");
          }
        }
      )
      .catch(error => {
        console.error('Error occurred while login user:', error);
      });
    
    
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
