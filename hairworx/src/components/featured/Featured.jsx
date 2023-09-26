import React, { useState } from 'react'
import './Featured.scss'
import { useNavigate } from 'react-router-dom';

const Featured = () => {
  const[searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const handleSubmit = () => {
navigate(`/gigs?search=${searchInput}`)
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the <i>perfect</i> service for your hair
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="/img/search.png" alt="search lens" />
              <input type="text" placeholder="Search for a service provider" onChange={(e)=>setSearchInput(e.target.value)}/>
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular: </span>
            <button>Wash and Blow Dry</button>
            <button>Wash and Set</button>
            <button>Wash and Style</button>
            <button>Wash and Trim</button>
            {/* <button>Wash and Cut</button>
                    <button>Wash and Colour</button>
                    <button>Wash and Treatment</button>
                    <button>Wash and Relax</button>
                    <button>Wash and Perm</button>
                    <button>Wash and Weave</button>
                    <button>Wash and Braids</button>
                    <button>Wash and Cornrows</button>
                    <button>Wash and Dreadlocks</button>
                    <button>Wash and Twists</button>
                    <button>Wash and Crochet</button>
                    <button>Wash and Wig</button> */}
          </div>
        </div>
        <div className="right">
          <img src="/img/featured-hero.png" alt="featured face" />
        </div>
      </div>
    </div>
  );
}

export default Featured