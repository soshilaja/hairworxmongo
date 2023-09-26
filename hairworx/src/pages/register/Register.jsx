import React, { useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import upload from "../../utils/upload";

const Register = () => {
  const [file, setFile] = useState(null); //this is for the profile picture
  const [passworderror, setPasswordError] = useState(null); //this is for the password match error
  const [error, setErrors] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
    country: "",
    isSeller: false,
    phone: "",
    desc: "",
  });

  const navigate = useNavigate();

  const handlePasswordError = () => {
    if (user.confirmPassword !== user.password) {
      setPasswordError("Passwords do not match");
    return;
    }
  };


  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = file ? await upload(file) : "";
    const newUser = { ...user, image: url };
    try {
      await newRequest.post("/auth/register", newUser);
      navigate("/login");
    } catch (err) {
      // console.log(err);
      setErrors(err.response.data);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            onChange={handleChange}
            onBlur={handlePasswordError}
          />
          {passworderror && <p className="error">{passworderror? passworderror:""}</p>}
          {/* Display password match error */}
          <label htmlFor="image">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
          />
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            placeholder="Enter your country"
            onChange={handleChange}
          />
        </div>
        <div className="right">
          <h1>I want to become a service provider</h1>
          <div className="toggle">
            <label htmlFor="serviceProvider">
              Activate a service provider account
            </label>
            <label className="switch">
              <input
                type="checkbox"
                name="serviceProvider"
                onChange={handleSeller}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            onChange={handleChange}
          />
          <label htmlFor="desc">Service Description</label>
          <textarea
            name="desc"
            placeholder="Describe your service"
            rows="10"
            cols="50"
            onChange={handleChange}
          />
          <p>
            By creating an account you agree to our <Link>Terms & Privacy</Link>
            .
          </p>
          <button type="submit">Register</button>
          {error && error}
        </div>
      </form>
    </div>
  );
};

export default Register;
