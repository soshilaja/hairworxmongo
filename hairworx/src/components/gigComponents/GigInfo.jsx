/* eslint-disable react/prop-types */
// GigInfo.js
import React from "react";

const GigInfo = ({ data }) => {
  return (
    <div className="left">
      <span className="breadCrumbs">hairworx&gt;gig&gt;</span>
      <h1>{data.title}</h1>
      <h2>About this Service</h2>
      <p>{data.desc}</p>
    </div>
  );
};

export default GigInfo;
