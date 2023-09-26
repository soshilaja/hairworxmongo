import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slide.scss";
import CatCard from "../../components/catCard/CatCard";
// import { cards } from "../../data";

const Slide = () => {

    const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => newRequest.get(`/users`).then((res) => res.data),
  });

  // console.log(data);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slide">
      <div className="container">
        <h1>Featured Service Providers</h1>
        {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <Slider {...settings}>
          {data.map((user, index) => (
            <CatCard key={index} data={user} />
          ))}
        </Slider>)}
      </div>
    </div>
  );
};

export default Slide;
