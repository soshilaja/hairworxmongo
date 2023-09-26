/* eslint-disable react/prop-types */
// GigUser.js
import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigUser = ({ userId, totalStars, starNumber }) => {
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: userData,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
  });
  

  return (
    <div className="user">
      {isLoadingUser ? (
        <p>Loading...</p>
      ) : errorUser ? (
        <p>Something went wrong!</p>
      ) : (
        <>
          <img
            className="profile"
            src={userData.image || "https://i.imgur.com/HeIi0wU.png"}
            alt=""
          />
          <span>
            By <strong>{userData.username}</strong>
          </span>
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
        </>
      )}
    </div>
  );
};

export default GigUser;
