/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import "./GigCard.scss";

const GigCard = ({ gig }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${gig.userId}`],
    queryFn: () =>
      newRequest.get(`/users/${gig.userId}`).then((res) => {
        return res.data;
      }),
  });
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Link to={`/gig/${gig._id}`} className="link">
      {currentUser?._id === gig.userId ? (
        ""
      ) : (
        <div className="gigCard">
          <img src={gig.cover} alt="gig" />
          <div className="info">
            {isLoading ? (
              "loading"
            ) : error ? (
              "Something is wrong"
            ) : (
              <div className="user">
                <img
                  src={data.image || "https://i.imgur.com/HeIi0wU.png"}
                  alt="user"
                />
                <span>{data.username}</span>
              </div>
            )}
            <span>{gig.desc}</span>
            <div className="star">
              <img src="/icons/star.png" alt="star" />
              <span>
                {!isNaN(gig.totalStars / gig.starNumber) &&
                  Math.round(gig.totalStars / gig.starNumber)}
              </span>
            </div>
          </div>
          <hr />
          <div className="details">
            <img src="/icons/heart.png" alt="heart" />
            <div className="price">
              <span>Starting at</span>
              <h2>${gig.price}</h2>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default GigCard;
