/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const GigRight = ({ data }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // console.log(data.userId, currentUser._id)
  return (
    <div className="right">
      <div className="price">
        <h2>{data.shortTitle}</h2>
        <h3>${data.price}</h3>
      </div>
      <p>{data.shortDesc}</p>
      <div className="details">
        <div className="item">
          <img
            src="https://www.freeiconspng.com/thumbs/clock-png/clock-png-32.png"
            alt="clock"
          />
          <span>{data.deliveryTime} hour(s)</span>
        </div>
        <div className="item">
          <img
            src="https://www.freeiconspng.com/uploads/recycle-icons-23.png"
            alt="recycle"
          />
          <span>{data.revisionNumber} hour turnaround</span>
        </div>
      </div>
      <div className="features">
        {data.tags.map((tag, i) => (
          <div className="item" key={i}>
            <img
              src="https://www.freeiconspng.com/uploads/check-mark-8.png"
              alt="check"
            />
            <span>{tag}</span>
          </div>
        ))}
      </div>
      {currentUser?._id === data.userId ? (
        ""
      ) : currentUser === null ? (
        <Link to="/register" className="link">
          <button>Please Sign up to purchase Service</button>
        </Link>
      ) : (
        <Link to={`/pay/${data._id}`}>
          <button>Continue</button>
        </Link>
      )}
    </div>
  );
};

export default GigRight;
