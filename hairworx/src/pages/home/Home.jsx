import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import Gigs from "../gigs/Gigs";

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide />
      <Gigs />
      <div className="features">
        <div className="container">
          <div className="left">
            <div className="item">
              <h1>A new approach to the care and touch your hair deserves</h1>
              <div className="title">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/017/177/933/original/round-check-mark-symbol-with-transparent-background-free-png.png"
                  alt="checkmark"
                  // width={20}
                />
                The best for every budget
              </div>
              <p>
                Find high-quality services at every price point. No hourly
                rates, just project-based pricing.
              </p>
              <div className="title">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/017/177/933/original/round-check-mark-symbol-with-transparent-background-free-png.png"
                  alt="checkmark"
                  // width={20}
                />
                Quality work with quick turnaround
              </div>
              <p>
                Find the right hair stylist for your hair. Your payment is held
              </p>
              <div className="title">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/017/177/933/original/round-check-mark-symbol-with-transparent-background-free-png.png"
                  alt="checkmark"
                  // width={20}
                />
                Protected payment gateway
              </div>
              <p>
                Always know that your payment is secure, and that we’ll have
                your back in the event of any issues.
              </p>
              <div className="title">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/017/177/933/original/round-check-mark-symbol-with-transparent-background-free-png.png"
                  alt="checkmark"
                  // width={20}
                />
                Round the clock support
              </div>
              <p>
                Our support team is available 24/7 to help you find the perfect
                hair stylist for you.
              </p>
            </div>
          </div>
          <div className="right">
            <div className="item">
              <video
                src="https://media.istockphoto.com/id/1312437695/video/embrace-the-versatility-of-your-hair.mp4?s=mp4-640x640-is&k=20&c=4JtlAjjkNJ-7P31pP6UDtTaKcQvBavePdulOtXPan20="
                controls
              ></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
