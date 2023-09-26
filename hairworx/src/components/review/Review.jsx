/* eslint-disable react/prop-types */
import React from "react";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import "./Review.scss";

const Review = ({ review }) => {
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviewUser", `${review.userId}`],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        // console.log("logged data", review);
        return res.data;
      }),
  });

  return (
    <div className="review">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="user">
          <img
            className="profile"
            src={data.image || "https://i.imgur.com/HeIi0wU.png"}
            alt="person1"
          />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/icons/star.png" alt="stars" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Was this review helpful?</span>
        <img src="/icons/like.png" alt="like" />
        <span>Yes</span>
        <img src="/icons/dislike.png" alt="dislike" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
