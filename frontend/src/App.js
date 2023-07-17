import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Col, Nav, Navbar, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import RegisterPage from "./pages/RegisterPage";
import ProductSearchPage from "./pages/ProductSearchPage";
import Searchbox from "./components/Searchbox";
import { signout } from "./slice/userAuthSlice";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ReviewPage from "./pages/ReviewPage";
import ReviewIdPage from "./pages/ReviewIdPage";
import CartPage from "./pages/CartPage";
import OrderShippingPage from "./pages/OrderShippingPage";
import OrderPaymentPage from "./pages/OrderPaymentPage";
import Footer from "./components/Footer";
import AddressAddPage from "./pages/Account/AddressAddPage";
import OrderPlacePage from "./pages/OrderPlacePage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import OrderHistoryPage from "./pages/Account/OrderHistory";
import UserHomePage from "./pages/Account/UserHomePage";
import UserSecurityPage from "./pages/Account/UserSecurityPage";
import UserUpdateSecurityPage from "./pages/Account/UserUpdateSecurityPage";

function App() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;
  const userState = useSelector((state) => state.userAuth);
  const { userInfo } = userState;

  const [filterOnFocus, setFilterOnFocus] = useState(false);

  const signOutHandler = () => {
    dispatch(signout());
  };

  return (
    <div className="App">
      <header>
        <Navbar
          id="search-nav"
          bg="dark"
          variant="dark"
          className="flex-column flex-md-row m-0 p-0"
        >
          <Container fluid id="search-nav-container">
            <Navbar.Brand href="/">
              <div className="img-logo">
                <img
                  alt="amazonian brand logo"
                  src="/imgs/amazonian_brand_logo.png"
                  className="align-top"
                />
              </div>
            </Navbar.Brand>
            <Nav className="me-2 d-none d-lg-block">
              <Nav.Link href="#features">
                <span className="nav-line-1">
                  <small>Hello, {userInfo ? userInfo.name : "Sign in"}</small>
                </span>
                <br />
                <span className="nav-line-2">
                  <b>Select your location</b>
                </span>
              </Nav.Link>
            </Nav>
            <Searchbox mobile={false} />
            <Nav>
              <Nav.Link
                id="sign-in-dropdown"
                href="/signin"
                className="d-flex flex-column d-none d-md-flex"
                onMouseOver={() => setFilterOnFocus(true)}
                onMouseOut={() => setFilterOnFocus(false)}
              >
                <div className="nav-line-1-container">
                  <span className="nav-line-1">
                    Hello, {userInfo ? userInfo.name : "Sign in"}
                  </span>
                </div>
                <span className="nav-line-2 ">
                  <b>
                    Account & Lists <i className="fa fa-caret-down"> </i>
                  </b>
                </span>
                <div id="drop-down-content">
                  <Container>
                    <Row className="mb-1">
                      <Col className="flex-fill d-flex justify-content-center align-items-center">
                        {userInfo ? (
                          <button
                            className="rect yellow sign"
                            onClick={signOutHandler}
                          >
                            Sign Out
                          </button>
                        ) : (
                          <Link to="/signin">
                            <button className="rect yellow sign">
                              Sign in
                            </button>
                          </Link>
                        )}
                      </Col>
                      {!userInfo && (
                        <Col className="flex-fill d-flex justify-content-center gap-2">
                          <div>
                            <small className="text-dark">New customer?</small>
                          </div>
                          <Link to="/register">
                            <small className="blue">Start here</small>
                          </Link>
                        </Col>
                      )}
                    </Row>
                    <hr className="my-4 text-dark"></hr>
                    <Row className="align-items-start">
                      <Col>
                        <h5 className="text-dark">Your Lists</h5>
                        <ul className="drop-down-list no-list-style mb-1">
                          <li>
                            <Link to="#">
                              <span className="dark-grey">
                                Create a Wish List
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <span className="dark-grey">
                                Wish from Any Website
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <span className="dark-grey">Find a Gift</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <span className="dark-grey">
                                Discover Your Style
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </Col>
                      <Col className="vl">
                        <h5 className="text-dark">Your Account</h5>
                        <ul className="drop-down-list no-list-style mb-1">
                          <li>
                            <Link to={userInfo ? "/user/home" : "/"}>
                              <span className="dark-grey">Your Account</span>
                            </Link>
                          </li>
                          <li>
                            <Link to={userInfo ? "/user/order" : "/"}>
                              <span className="dark-grey"> Your Orders</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <span className="dark-grey">
                                Your Recommendations
                              </span>
                            </Link>
                          </li>
                          <li>
                            <Link to={userInfo ? "/user/savedItems" : "/"}>
                              <span className="dark-grey">Your Save Items</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <span className="dark-grey">
                                Memberships & Subscriptions
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                href="/user/order/history"
                className=" d-flex flex-column d-none d-md-flex gap-0"
              >
                <span className="nav-line-1">
                  <small>Returns & </small>
                </span>
                <span className="nav-line-2 ">
                  <small>Orders</small>
                </span>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link
                href="/signin"
                className="nav-right-item d-flex d-md-none gap-1"
              >
                <span className="nav-line-1 d-none d-sm-block">
                  <small>Sign in </small>
                </span>
                <span className="d-none d-sm-block">
                  <i className="fa-solid fa-arrow-right fa-2xs text-white"></i>
                </span>
                <span>
                  <i className="fa-regular fa-user fa-2xl text-white"></i>
                </span>
              </Nav.Link>
              <Nav.Link href="/cart" className="d-flex">
                <div className="nav-cart-count-container d-flex">
                  <span
                    id="nav-cart-count"
                    aria-hidden="true"
                    className="nav-cart-count"
                  >
                    {cartItems.length}
                  </span>
                  <div className="img-cart">
                    <i className="fa-brands fa-opencart fa-2xl"></i>
                  </div>
                </div>
                <div className="nav-cart-text-container d-flex flex-column">
                  <span aria-hidden="true" className="nav-line-1"></span>
                  <span aria-hidden="true" className="nav-line-2">
                    Cart
                  </span>
                </div>
              </Nav.Link>
            </Nav>
          </Container>

          <Searchbox mobile={true} />
        </Navbar>
      </header>
      <main
        style={
          filterOnFocus
            ? {
                transitionDuration: "0.5s",
                filter: "brightness(50%)",
                background: "rgba(0,0,0,0.5)",
              }
            : { transitionDuration: "0.5s" }
        }
      >
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          {/* <Route path="/home/page/:page" exact element={<HomePage />} /> */}
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/products/:keyword"
            exact
            element={<ProductSearchPage />}
          />
          <Route
            path="/products/:keyword/page/:page"
            exact
            element={<ProductSearchPage />}
          />
          <Route
            path="/products/:keyword/department/:department"
            exact
            element={<ProductSearchPage />}
          />
          <Route
            path="/products/:keyword/department/:department/page/:page"
            exact
            element={<ProductSearchPage />}
          />
          <Route path="/product/:asin" exact element={<ProductDetailsPage />} />

          <Route path="/product-reviews/:asin" exact element={<ReviewPage />} />
          <Route
            path="/product-reviews/:asin/page/:page"
            exact
            element={<ReviewPage />}
          />

          <Route path="/review/:id" exact element={<ReviewIdPage />} />
          <Route path="/cart" exact element={<CartPage />} />
          <Route path="/shipping" exact element={<OrderShippingPage />} />
          <Route path="/placeorder" exact element={<OrderPlacePage />} />
          <Route path="/payment" exact element={<OrderPaymentPage />} />
          <Route
            path="/ordersummary/:id"
            exact
            element={<OrderSummaryPage />}
          />
          <Route path="/user/home" exact element={<UserHomePage />} />
          <Route path="/user/security" exact element={<UserSecurityPage />} />
          <Route
            path="/user/security/update"
            exact
            element={<UserUpdateSecurityPage />}
          />
          <Route path="/user/address/add" exact element={<AddressAddPage />} />
          <Route
            path="/user/order/history"
            exact
            element={<OrderHistoryPage />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
