import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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

function App() {
  const dispatch = useDispatch();
  // const cartState = useSelector((state) => state.cart);
  // const { cartItems } = cartState;
  const userState = useSelector((state) => state.userAuth);
  const { userInfo } = userState;

  const [filterOnFocus, setFilterOnFocus] = useState(false);

  const signOutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <BrowserRouter>
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
              {/* <Form
                id="search-form"
                className="nav-center d-flex flex-fill d-none d-md-flex "
              >
                <Form.Select
                  id="search-select"
                  onChange={(e) => {
                    selectChange(e.target.value);
                  }}
                  aria-label="Default select example"
                  defaultValue={"aps"}
                >
                  <option value="aps">All</option>
                  <option value="arts-crafts">Arts &amp; Crafts</option>
                  <option value="automotive">Automotive</option>
                  <option value="baby-products">Baby</option>
                  <option value="beauty">Beauty &amp; Personal Care</option>
                  <option value="stripbooks">Books</option>
                  <option value="fashion-boys">Boys' Fashion</option>
                  <option value="computers">Computers</option>
                  <option value="deals">Deals</option>
                  <option value="digital-music">Digital Music</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion-girls">Girls' Fashion</option>
                  <option value="hpc">Health &amp; Household</option>
                  <option value="kitchen">Home &amp; Kitchen</option>
                  <option value="industrial">
                    Industrial &amp; Scientific
                  </option>
                  <option value="digital-text">Kindle Store</option>
                  <option value="luggage">Luggage</option>
                  <option value="fashion-mens">Men's Fashion</option>
                  <option value="movies-tv">Movies &amp; TV</option>
                  <option value="music">Music, CDs &amp; Vinyl</option>
                  <option value="pets">Pet Supplies</option>
                  <option value="instant-video">Prime Video</option>
                  <option value="software">Software</option>
                  <option value="sporting">Sports &amp; Outdoors</option>
                  <option value="tools">Tools &amp; Home Improvement</option>
                  <option value="toys-and-games">Toys &amp; Games</option>
                  <option value="videogames">Video Games</option>
                  <option value="fashion-womens">Women's Fashion</option>
                </Form.Select>
                <Form.Control
                  id="search-input"
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  className="search"
                  type="submit"
                  onSubmit={console.log("wow")}
                >
                  <Link to={buildURL}>
                    <i className="fa fa-search fa-lg text-black"></i>
                  </Link>
                </button>
              </Form> */}
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
                              className="rect yellow"
                              onClick={signOutHandler}
                            >
                              Sign Out
                            </button>
                          ) : (
                            <Link to="/signin">
                              <button className="rect yellow">Sign in</button>
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
                              <Link to={userInfo ? "/order/mine" : "/"}>
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
                                <span className="dark-grey">
                                  Your Save Items
                                </span>
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
                  href="#pricing"
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
                <Nav.Link href="#cart" className="d-flex">
                  <div className="nav-cart-count-container d-flex">
                    <span
                      id="nav-cart-count"
                      aria-hidden="true"
                      className="nav-cart-count"
                    >
                      0
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
            <Route
              path="/product/:asin"
              exact
              element={<ProductDetailsPage />}
            />
          </Routes>
        </main>
        <footer id="footer1">
          <div className="navFooter">
            <Container className="justify-content-md-center">
              <Row>
                <Col sm={3} md={3}>
                  <div className="nav-footer-col-header">Get to Know Us</div>
                  <ul className="nav-footer-link">
                    <li className="nav_first">
                      <a href="https://www.amazon.jobs" className="nav_a">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://blog.aboutamazon.com/?utm_source=gateway&amp;utm_medium=footer"
                        className="nav_a"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.aboutamazon.com/?utm_source=gateway&amp;utm_medium=footer"
                        className="nav_a"
                      >
                        About Amazon
                      </a>
                    </li>
                    <li>
                      <a href="https://www.amazon.com/ir" className="nav_a">
                        Investor Relations
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.amazon.com/gp/browse.html?node=2102313011&amp;ref_=footer_devices"
                        className="nav_a"
                      >
                        Amazon Devices
                      </a>
                    </li>
                    <li className="nav_last ">
                      <a href="https://www.amazon.science" className="nav_a">
                        Amazon Science
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col sm={3} md={3}>
                  <div className="nav-footer-col-header">
                    Make Money with Us
                  </div>
                  <ul className="nav-footer-link">
                    <li className="nav_first">
                      <a
                        href="https://services.amazon.com/sell.html?ld=AZFSSOA&amp;ref_=footer_soa"
                        className="nav_a"
                      >
                        Sell products on Amazon
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://services.amazon.com/amazon-business.html?ld=usb2bunifooter&amp;ref_=footer_b2b"
                        className="nav_a"
                      >
                        Sell on Amazon Business
                      </a>
                    </li>
                    <li>
                      <a href="https://developer.amazon.com" className="nav_a">
                        Sell apps on Amazon
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://affiliate-program.amazon.com/"
                        className="nav_a"
                      >
                        Become an Affiliate
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://advertising.amazon.com/?ref=ext_amzn_ftr"
                        className="nav_a"
                      >
                        Advertise Your Products
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.amazon.com/gp/seller-account/mm-summary-page.html?ld=AZFooterSelfPublish&amp;topic=200260520&amp;ref_=footer_publishing"
                        className="nav_a"
                      >
                        Self-Publish with Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://go.thehub-amazon.com/amazon-hub-locker"
                        className="nav_a"
                      >
                        Host an Amazon Hub
                      </a>
                    </li>
                    <li className="nav_last nav_a_carat">
                      <span className="nav_a_carat" aria-hidden="true"></span>
                      <a
                        href="https://www.amazon.com/b/?node=18190131011&amp;ld=AZUSSOA-seemore&amp;ref_=footer_seemore"
                        className="nav_a"
                      >
                        See More Make Money with Us
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col sm={3} md={3}>
                  <div className="nav-footer-col-header">
                    Amazon Payment Products
                  </div>
                  <ul className="nav-footer-link">
                    <li className="nav_first">
                      <a
                        href="https://www.amazon.com/dp/B07984JN3L?plattr=ACOMFO&amp;ie=UTF-8"
                        className="nav_a"
                      >
                        Amazon Business Card-normal
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.amazon.com/gp/browse.html?node=16218619011&amp;ref_=footer_swp"
                        className="nav_a"
                      >
                        Shop with Points
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.amazon.com/gp/browse.html?node=10232440011&amp;ref_=footer_reload_us"
                        className="nav_a"
                      >
                        Reload Your Balance
                      </a>
                    </li>
                    <li className="nav_last ">
                      <a
                        href="https://www.amazon.com/gp/browse.html?node=388305011&amp;ref_=footer_tfx"
                        className="nav_a"
                      >
                        Amazon Currency Converter
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col sm={3} md={3}>
                  <div className="nav-footer-col-header">Let Us Help You </div>
                  <ul className="nav-footer-link">
                    <li className="nav_first">
                      <a
                        href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GDFU3JS5AL6SYHRD&amp;ref_=footer_covid"
                        className="nav_a"
                      >
                        Amazon and COVID-19
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.amazon.com/gp/css/homepage.html?ref_=footer_ya"
                        className="nav_a"
                      >
                        Your Account
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.amazon.com/gp/css/order-history?ref_=footer_yo"
                        className="nav_a"
                      >
                        Your Orders
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.amazon.com/gp/help/customer/display.html?nodeId=468520&amp;ref_=footer_shiprates"
                        className="nav_a"
                      >
                        Shipping Rates &amp; Policies
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.amazon.com/gp/css/returns/homepage.html?ref_=footer_hy_f_4"
                        className="nav_a"
                      >
                        Returns &amp; Replacements
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.amazon.com/gp/digital/fiona/manage?ref_=footer_myk"
                        className="nav_a"
                      >
                        Manage Your Content and Devices
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.amazon.com/gp/BIT/ref=footer_bit_v2_us_A0029?bitCampaignCode=A0029"
                        className="nav_a"
                      >
                        Amazon Assistant
                      </a>
                    </li>
                    <li className="nav_last ">
                      <a
                        href="https://www.amazon.com/gp/help/customer/display.html?nodeId=508510&amp;ref_=footer_gw_m_b_he"
                        className="nav_a"
                      >
                        Help
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </div>

          <hr />
        </footer>
        <footer id="footer2" className="d-none d-md-block">
          <Container>
            <table
              className="navFooterMoreOnAmazon"
              cellSpacing="2"
              summary="More on Amazon"
            >
              <tbody>
                <tr>
                  <td className="navFooterDescItem">
                    <a
                      href="https://music.amazon.com?ref=dm_aff_amz_com"
                      className="nav_a"
                    >
                      Amazon Music
                      <br />
                      <span className="navFooterDescText">
                        Stream millions
                        <br />
                        of songs
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a
                      href="https://advertising.amazon.com/?ref=footer_advtsing_amzn_com"
                      className="nav_a"
                    >
                      Amazon Advertising
                      <br />
                      <span className="navFooterDescText">
                        Find, attract, and
                        <br />
                        engage customers
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://www.6pm.com" className="nav_a">
                      6pm
                      <br />
                      <span className="navFooterDescText">
                        Score deals
                        <br />
                        on fashion brands
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://www.abebooks.com" className="nav_a">
                      AbeBooks
                      <br />
                      <span className="navFooterDescText">
                        Books, art
                        <br />
                        &amp; collectibles
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://www.acx.com/" className="nav_a">
                      ACX <br />
                      <span className="navFooterDescText">
                        Audiobook Publishing
                        <br />
                        Made Easy
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a
                      href="https://sell.amazon.com/?ld=AZUSSOA-footer-aff&amp;ref_=footer_sell"
                      className="nav_a"
                    >
                      Sell on Amazon
                      <br />
                      <span className="navFooterDescText">
                        Start a Selling Account
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a
                      href="https://www.amazon.com/business?ref_=footer_retail_b2b"
                      className="nav_a"
                    >
                      Amazon Business
                      <br />
                      <span className="navFooterDescText">
                        Everything For
                        <br />
                        Your Business
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="navFooterDescItem">
                    <a
                      href="https://www.amazon.com/gp/browse.html?node=230659011&amp;ref_=footer_amazonglobal"
                      className="nav_a"
                    >
                      AmazonGlobal
                      <br />
                      <span className="navFooterDescText">
                        Ship Orders
                        <br />
                        Internationally
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a
                      href="https://www.amazon.com/services?ref_=footer_services"
                      className="nav_a"
                    >
                      Home Services
                      <br />
                      <span className="navFooterDescText">
                        Experienced Pros
                        <br />
                        Happiness Guarantee
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a
                      href="https://ignite.amazon.com/?ref=amazon_footer_ignite"
                      className="nav_a"
                    >
                      Amazon Ignite
                      <br />
                      <span className="navFooterDescText">
                        Sell your original
                        <br />
                        Digital Educational
                        <br />
                        Resources
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a
                      href="https://aws.amazon.com/what-is-cloud-computing/?sc_channel=EL&amp;sc_campaign=amazonfooter"
                      className="nav_a"
                    >
                      Amazon Web Services
                      <br />
                      <span className="navFooterDescText">
                        Scalable Cloud
                        <br />
                        Computing Services
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://www.audible.com" className="nav_a">
                      Audible
                      <br />
                      <span className="navFooterDescText">
                        Listen to Books &amp; Original
                        <br />
                        Audio Performances
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://www.bookdepository.com" className="nav_a">
                      Book Depository
                      <br />
                      <span className="navFooterDescText">
                        Books With Free
                        <br />
                        Delivery Worldwide
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a
                      href="https://www.boxofficemojo.com/?ref_=amzn_nav_ftr"
                      className="nav_a"
                    >
                      Box Office Mojo
                      <br />
                      <span className="navFooterDescText">
                        Find Movie
                        <br />
                        Box Office Data
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="navFooterDescItem">
                    <a href="https://www.comixology.com" className="nav_a">
                      ComiXology
                      <br />
                      <span className="navFooterDescText">
                        Thousands of
                        <br />
                        Digital Comics
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://www.dpreview.com" className="nav_a">
                      DPReview
                      <br />
                      <span className="navFooterDescText">
                        Digital
                        <br />
                        Photography
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://www.fabric.com" className="nav_a">
                      Fabric
                      <br />
                      <span className="navFooterDescText">
                        Sewing, Quilting
                        <br />
                        &amp; Knitting
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://www.goodreads.com" className="nav_a">
                      Goodreads
                      <br />
                      <span className="navFooterDescText">
                        Book reviews
                        <br />
                        &amp; recommendations
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://www.imdb.com" className="nav_a">
                      IMDb
                      <br />
                      <span className="navFooterDescText">
                        Movies, TV
                        <br />
                        &amp; Celebrities
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a
                      href="https://pro.imdb.com?ref_=amzn_nav_ftr"
                      className="nav_a"
                    >
                      IMDbPro
                      <br />
                      <span className="navFooterDescText">
                        Get Info Entertainment
                        <br />
                        Professionals Need
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://kdp.amazon.com" className="nav_a">
                      Kindle Direct Publishing
                      <br />
                      <span className="navFooterDescText">
                        Indie Digital &amp; Print Publishing
                        <br />
                        Made Easy
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="navFooterDescItem">
                    <a
                      href="https://videodirect.amazon.com/home/landing"
                      className="nav_a"
                    >
                      Prime Video Direct
                      <br />
                      <span className="navFooterDescText">
                        Video Distribution
                        <br />
                        Made Easy
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://www.shopbop.com" className="nav_a">
                      Shopbop
                      <br />
                      <span className="navFooterDescText">
                        Designer
                        <br />
                        Fashion Brands
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://www.woot.com/" className="nav_a">
                      Woot!
                      <br />
                      <span className="navFooterDescText">
                        Deals and <br />
                        Shenanigans
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://www.zappos.com" className="nav_a">
                      Zappos
                      <br />
                      <span className="navFooterDescText">
                        Shoes &amp;
                        <br />
                        Clothing
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://ring.com" className="nav_a">
                      Ring
                      <br />
                      <span className="navFooterDescText">
                        Smart Home
                        <br />
                        Security Systems
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://eero.com/" className="nav_a">
                      eero WiFi
                      <br />
                      <span className="navFooterDescText">
                        Stream 4K Video
                        <br />
                        in Every Room
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a
                      href="https://blinkforhome.com/?ref=nav_footer"
                      className="nav_a"
                    >
                      Blink
                      <br />
                      <span className="navFooterDescText">
                        Smart Security
                        <br />
                        for Every Home
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td className="navFooterDescItem">&nbsp;</td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">&nbsp;</td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a
                      href="https://shop.ring.com/pages/neighbors-app"
                      className="nav_a"
                    >
                      Neighbors App <br />
                      <span className="navFooterDescText">
                        {" "}
                        Real-Time Crime
                        <br />
                        &amp; Safety Alerts
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a
                      href="https://www.amazon.com/gp/browse.html?node=14498690011&amp;ref_=amzn_nav_ftr_swa"
                      className="nav_a"
                    >
                      Amazon Subscription Boxes
                      <br />
                      <span className="navFooterDescText">
                        Top subscription boxes – right to your door
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">
                    <a href="https://www.pillpack.com" className="nav_a">
                      PillPack
                      <br />
                      <span className="navFooterDescText">
                        Pharmacy Simplified
                      </span>
                    </a>
                  </td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">&nbsp;</td>
                  <td className="navFooterDescSpacer"></td>
                  <td className="navFooterDescItem">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
