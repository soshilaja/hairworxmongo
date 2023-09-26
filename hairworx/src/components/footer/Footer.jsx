import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="company">
            <h2>hairworx</h2>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              architecto perspiciatis commodi laudantium cupiditate sequi
              officiis obcaecati debitis, ab ratione sint libero similique nihil
              quas dicta molestiae, assumenda dolores dolor?
            </span>
          </div>
          <div className="categories">
            <h2>Categories</h2>
            <span>Men&#39;s hair</span>
            <span>Women&#39;s hair</span>
            <span>Children&#39;s hair</span>
            <span>Pets&#39; hair</span>
          </div>
          <div className="usefulLinks">
            <h2>Useful Links</h2>
            <span>Pricing</span>
            <span>FAQ</span>
            <span>Terms &amp; Conditions</span>
            <span>Privacy Policy</span>
            <span>Settings</span>
            <span>Orders</span>
            <span>Support</span>
          </div>
          <div className="contact">
            <h2>Contact</h2>
            <span>123 Main St</span>
            <span>Anytown, Canada</span>
            <span>info@hairworx.ca</span>
            <span>123-456-7890</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>
              <b>hairworx</b>
            </h2>
            <span>© 2023 hairworx</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/icons/facebook.png" alt="facebook" />
              <img src="/icons/twitter.png" alt="twitter" />
              <img src="/icons/instagram.png" alt="instagram" />
              <img src="/icons/linkedin.png" alt="linkedin" />
              <img src="/icons/youtube.png" alt="youtube" />
              <img src="/icons/whatsapp.png" alt="whatsapp" />
            </div>
            <div className="link">
              <img src="/img/english-language.png" alt="language" />
              <span>English</span>
            </div>
            <div className="link">
              <img
                src="https://cdn-icons-png.flaticon.com/512/153/153117.png"
                alt="currency"
              />
              <span>CAD</span>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/7118/7118029.png"
              alt="accessibility"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
