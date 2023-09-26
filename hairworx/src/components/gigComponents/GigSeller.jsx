/* eslint-disable react/prop-types */
// GigSeller.js
import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigSeller = ({ userId, totalStars, starNumber }) => {
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: userData,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
  });

  return (
    <div className="seller">
      {isLoadingUser ? (
        <p>Loading...</p>
      ) : errorUser ? (
        <p>Something went wrong!</p>
      ) : (
        <>
          <h2>About The Seller</h2>
          <div className="user">
            <img
              className="profile"
              src={userData.image || "https://i.imgur.com/HeIi0wU.png"}
              alt=""
            />
            <div className="info">
              <span>{userData.username}</span>
              {!isNaN(totalStars / starNumber) && (
                <div className="stars">
                  {Array(Math.round(totalStars / starNumber))
                    .fill()
                    .map((item, i) => (
                      <img src="/icons/star.png" alt="stars" key={i} />
                    ))}

                  <span>{Math.round(totalStars / starNumber)}</span>
                </div>
              )}
              <button>Contact Me</button>
            </div>
          </div>
          <div className="box">
            <div className="items">
              <div className="item">
                <span className="title">From</span>
                <span className="desc">{userData.country}</span>
              </div>
              <div className="item">
                <span className="title">Member Since</span>
                <span className="desc">July 2023</span>
              </div>
              <div className="item">
                <span className="title">Avg. response time</span>
                <span className="desc">1 hour</span>
              </div>
              <div className="item">
                <span className="title">Last Service</span>
                <span className="desc">1 day ago</span>
              </div>
              <div className="item">
                <span className="title">Languages</span>
                <span className="desc">English</span>
              </div>
            </div>
            <hr />
            <p>{userData.desc}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default GigSeller;
