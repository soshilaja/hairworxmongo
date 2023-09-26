// Gig.js
import React from "react";
import "./Gig.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import GigInfo from "../../components/gigComponents/GigInfo";
import GigUser from "../../components/gigComponents/GigUser";
import GigImagesSlider from "../../components/gigComponents/GigImagesSlider";
import GigSeller from "../../components/gigComponents/GigSeller";
import Reviews from "../../components/reviews/Reviews";
import GigRight from "../../components/gigComponents/GigRight";

const Gig = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gigs", `${id}`],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  //  console.log("gig", data);
  // console.log("useparams", useParams());
  return (
    <div className="gig">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Something went wrong!</p>
      ) : (
        <div className="container">
          <div className="left">
            <GigInfo data={data} />
            <GigUser
              userId={data.userId}
              totalStars={data.totalStars}
              starNumber={data.starNumber}
            />
            <GigImagesSlider images={data.images} />
            <GigSeller
              userId={data.userId}
              totalStars={data.totalStars}
              starNumber={data.starNumber}
            />
            <Reviews gigId={id} userId={data.userId} />
          </div>
          <GigRight data={data} />
        </div>
      )}
    </div>
  );
};

export default Gig;
