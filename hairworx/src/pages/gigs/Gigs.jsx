import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/GigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
// import { useLocation } from "react-router-dom";

const Gigs = () => {
  // const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const [selectedOption, setSelectedOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const minRef = useRef(0);
  const maxRef = useRef(0);

  // const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest.get(`/gigs`).then((res) => {
        return res.data;
      }),
  });

  const applyFilterAndSort = () => {
    refetch();
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [sort]);

  const handleOptionChange = (type) => {
    setSelectedOption(type);
    reSort(type);
  };

  const reSort = (type) => {
    setSort(type);
  };

  return (
    <div className="gigs">
      <div className="container">
        <h1>Featured Services</h1>
        <p>
          Beautiful hair for your special day. Find the right hair service for
          the right price.
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget:</span>
            <input
              ref={minRef}
              type="text"
              placeholder="Minimum budget"
              // onChange={applyFilterAndSort}
            />
            <input
              ref={maxRef}
              type="text"
              placeholder="Maximum budget"
              // onChange={applyFilterAndSort}
            />
            <button onClick={() => setSort(selectedOption)}>Apply</button>
            <div className="sort">
              <div>
                <label>
                  <input
                    type="radio"
                    value="Newest"
                    checked={selectedOption === "Newest"}
                    onChange={() => handleOptionChange("Newest")}
                  />
                  Newest
                </label>

                <label>
                  <input
                    type="radio"
                    value="Best Selling"
                    checked={selectedOption === "Best Selling"}
                    onChange={() => handleOptionChange("Best Selling")}
                  />
                  Best Selling
                </label>

                <label>
                  <input
                    type="radio"
                    value="Popular"
                    checked={selectedOption === "Popular"}
                    onChange={() => handleOptionChange("Popular")}
                  />
                  Popular
                </label>
              </div>
            </div>
            <div className="search">
              <input
                type="search"
                name="search"
                placeholder="Search by category"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  applyFilterAndSort();
                }}
              />
            </div>
          </div>
          <div className="right">
            <div className="cards">
              {isLoading
                ? "loading"
                : error
                ? "something went wrong!"
                : data
                ? data
                    .filter((gig) => {
                      const minPrice = parseFloat(minRef.current.value) || 0;
                      const maxPrice = parseFloat(maxRef.current.value) || Number.MAX_VALUE;
                      return gig.price >= minPrice && gig.price <= maxPrice;
                    })
                    .filter((gig) =>
                      gig.category
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .sort((a, b) => {
                      if (sort === "Newest") {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                      }
                      if (sort === "Best Selling") {
                        return b.sales - a.sales;
                      }
                      if (sort === "Popular") {
                        return b.popularity - a.popularity;
                      }
                      // Default sorting (no sorting)
                      return 0;
                    })
                    .map((gig) => <GigCard gig={gig} key={gig._id} />)
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gigs;