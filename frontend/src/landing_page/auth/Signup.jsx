import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    username: "",
    password: ""
  });

  const { email, username, password } = inputValue;
  
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name] : value
    });
  };

  const handleError = (err) => {
    toast.error(err, {
      position: "bottom-left"
    });
  };

  const handleSuccess = (msg) => {
    toast.success(msg, {
      position: "top-center",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3002/signup", { ...inputValue }, { withCredentials: true });
      // console.log(data);
      const { success, message } = data;
      if(success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch(error) {
      console.log(error);
    }

    setInputValue({
      ...inputValue,
      email: "",
      username: "",
      password: ""
    });
  };


  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
          <span>
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
