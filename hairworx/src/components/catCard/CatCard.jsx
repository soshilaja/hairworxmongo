/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

const CatCard = ({ data }) => {
  return (
    <Link to="/">
      <div className="catCard">
        <img src={data.image || "https://i.imgur.com/HeIi0wU.png"} alt="" />
        <span className="desc">{data.desc}</span>
        <span className="title">{data.username}</span>
      </div>
    </Link>
  );
};

export default CatCard;
