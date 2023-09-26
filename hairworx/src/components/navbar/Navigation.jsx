import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBCollapse,
  MDBBtn,
  MDBIcon,
  MDBNavbarNav,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.scss";

export default function Navigation() {
  const [showNavCentred, setShowNavCentred] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      // localStorage.removeItem("currentUser");
      navigate("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <MDBNavbar sticky expand="lg" light bgColor="light">
      <MDBContainer>
        <Link to="/" className="link fs-1 fw-bolder">
          hairworx
        </Link>

        <MDBNavbarToggler
          type="button"
          data-target="#navbarCenteredExample"
          aria-controls="navbarCenteredExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavCentred(!showNavCentred)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse
          navbar
          show={showNavCentred}
          center="true"
          id="navbarCenteredExample"
        >
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            <MDBNavbarItem className="my-auto">
              <Link to="/" className="link">
                Explore services
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem className="my-auto">
              {!currentUser?.isSeller && (
                <Link to="/" className="link">
                  Register a Service
                </Link>
              )}
            </MDBNavbarItem>
            {!currentUser && (
              <>
                <MDBNavbarItem className="my-auto">
                  <Link to="/login" className="link">
                    Sign in
                  </Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Link to="/register" className="link">
                    <MDBBtn>Sign up</MDBBtn>
                  </Link>
                </MDBNavbarItem>
              </>
            )}
            {currentUser && (
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="div" className="nav-link">
                    <img
                      src={
                        currentUser?.image || "https://i.imgur.com/HeIi0wU.png"
                      }
                      alt="user"
                      style={{ width: "36px", height: "36px" }}
                      className="img-fluid rounded-circle me-2"
                      // width={32}
                    />
                    <span className="link">{currentUser?.username}</span>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    {currentUser.isSeller ? (
                      <>
                        <MDBDropdownItem link>
                          <Link className="link" to="/mygigs">
                            My Services
                          </Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem link>
                          <Link className="link" to="/add">
                            Add New Services
                          </Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem link>
                          <Link className="link" to="/orders">
                            My Orders
                          </Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem link>
                          <Link className="link" to="/messages">
                            Messages
                          </Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem link>
                          <Link className="link" onClick={handleLogout}>
                            Logout
                          </Link>
                        </MDBDropdownItem>
                      </>
                    ) : (
                      <>
                        <MDBDropdownItem link>
                          <Link className="link" to="/orders">
                            My Orders
                          </Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem link>
                          <Link className="link" to="/messages">
                            Messages
                          </Link>
                        </MDBDropdownItem>
                        <MDBDropdownItem link>
                          <Link className="link" onClick={handleLogout}>
                            Logout
                          </Link>
                        </MDBDropdownItem>
                      </>
                    )}
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
