import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Col, Nav, Navbar, Container, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";

import { signout } from "./slice/userSlice";

function App() {
  const dispatch = useDispatch();
  // const cartState = useSelector((state) => state.cart);
  // const { cartItems } = cartState;
  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  const [filterOnFocus, setFilterOnFocus] = useState(false);

  const adjustWidth = () => {
    let select = document.getElementById("searchSelect");
    let selectedOption = select[select.selectedIndex];
    select.style.width = Number(selectedOption.text.length + 6) + "ch";
  };

  const signOutHandler = () => {
    dispatch(signout());
  };

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
                    src="imgs/amazonian_brand_logo.png"
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
              <Form
                id="search-form"
                className="nav-center d-flex flex-fill d-none d-md-flex "
              >
                <Form.Select
                  id="search-select"
                  onChange={adjustWidth}
                  aria-label="Default select example"
                  defaultValue={"search-alias=aps"}
                >
                  <option value="search-alias=aps">All</option>
                  <option value="search-alias=arts-crafts-intl-ship">
                    Arts &amp; Crafts
                  </option>
                  <option value="search-alias=automotive-intl-ship">
                    Automotive
                  </option>
                  <option value="search-alias=baby-products-intl-ship">
                    Baby
                  </option>
                  <option value="search-alias=beauty-intl-ship">
                    Beauty &amp; Personal Care
                  </option>
                  <option value="search-alias=stripbooks-intl-ship">
                    Books
                  </option>
                  <option value="search-alias=fashion-boys-intl-ship">
                    Boys' Fashion
                  </option>
                  <option value="search-alias=computers-intl-ship">
                    Computers
                  </option>
                  <option value="search-alias=deals-intl-ship">Deals</option>
                  <option value="search-alias=digital-music">
                    Digital Music
                  </option>
                  <option value="search-alias=electronics-intl-ship">
                    Electronics
                  </option>
                  <option value="search-alias=fashion-girls-intl-ship">
                    Girls' Fashion
                  </option>
                  <option value="search-alias=hpc-intl-ship">
                    Health &amp; Household
                  </option>
                  <option value="search-alias=kitchen-intl-ship">
                    Home &amp; Kitchen
                  </option>
                  <option value="search-alias=industrial-intl-ship">
                    Industrial &amp; Scientific
                  </option>
                  <option value="search-alias=digital-text">
                    Kindle Store
                  </option>
                  <option value="search-alias=luggage-intl-ship">
                    Luggage
                  </option>
                  <option value="search-alias=fashion-mens-intl-ship">
                    Men's Fashion
                  </option>
                  <option value="search-alias=movies-tv-intl-ship">
                    Movies &amp; TV
                  </option>
                  <option value="search-alias=music-intl-ship">
                    Music, CDs &amp; Vinyl
                  </option>
                  <option value="search-alias=pets-intl-ship">
                    Pet Supplies
                  </option>
                  <option value="search-alias=instant-video">
                    Prime Video
                  </option>
                  <option value="search-alias=software-intl-ship">
                    Software
                  </option>
                  <option value="search-alias=sporting-intl-ship">
                    Sports &amp; Outdoors
                  </option>
                  <option value="search-alias=tools-intl-ship">
                    Tools &amp; Home Improvement
                  </option>
                  <option value="search-alias=toys-and-games-intl-ship">
                    Toys &amp; Games
                  </option>
                  <option value="search-alias=videogames-intl-ship">
                    Video Games
                  </option>
                  <option value="search-alias=fashion-womens-intl-ship">
                    Women's Fashion
                  </option>
                </Form.Select>
                <Form.Control
                  id="search-input"
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <button className="search" type="submit">
                  <i className="fa fa-search fa-lg"></i>
                </button>
              </Form>
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
                              <small className="dark-grey">New customer?</small>
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
                              <Link to="/user/home">
                                <span className="dark-grey">Your Account</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/order/mine">
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
                              <Link to="#">
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
            <Container fluid className="d-block d-md-none mt-2 mb-2">
              <Form id="searchForm" className="d-flex flex-fill ">
                <Form.Control
                  id="searchControl"
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <button className="search" type="submit">
                  <i className="fa fa-search fa-lg"></i>
                </button>
              </Form>
            </Container>
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
            <Route path="/signin" exact element={<SigninPage />} />
          </Routes>
        </main>
        <footer id="footer1" className="">
          <div className="navFooter">
            <Container className="justify-content-md-center">
              <Row>
                <Col sm={3} md={3}>
                  <div className="nav-footer-col-header">Get to Know Us</div>
                  <ul className="nav-footer-link">
                    <li className="nav_first">
                      <Link href="https://www.amazon.jobs" className="nav_a">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://blog.aboutamazon.com/?utm_source=gateway&amp;utm_medium=footer"
                        className="nav_a"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.aboutamazon.com/?utm_source=gateway&amp;utm_medium=footer"
                        className="nav_a"
                      >
                        About Amazon
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.amazon.com/ir" className="nav_a">
                        Investor Relations
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.amazon.com/gp/browse.html?node=2102313011&amp;ref_=footer_devices"
                        className="nav_a"
                      >
                        Amazon Devices
                      </Link>
                    </li>
                    <li className="nav_last ">
                      <Link href="https://www.amazon.science" className="nav_a">
                        Amazon Science
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col sm={3} md={3}>
                  <div className="nav-footer-col-header">
                    Make Money with Us
                  </div>
                  <ul className="nav-footer-link">
                    <li className="nav_first">
                      <Link
                        href="https://services.amazon.com/sell.html?ld=AZFSSOA&amp;ref_=footer_soa"
                        className="nav_a"
                      >
                        Sell products on Amazon
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://services.amazon.com/amazon-business.html?ld=usb2bunifooter&amp;ref_=footer_b2b"
                        className="nav_a"
                      >
                        Sell on Amazon Business
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://developer.amazon.com"
                        className="nav_a"
                      >
                        Sell apps on Amazon
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://affiliate-program.amazon.com/"
                        className="nav_a"
                      >
                        Become an Affiliate
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://advertising.amazon.com/?ref=ext_amzn_ftr"
                        className="nav_a"
                      >
                        Advertise Your Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.amazon.com/gp/seller-account/mm-summary-page.html?ld=AZFooterSelfPublish&amp;topic=200260520&amp;ref_=footer_publishing"
                        className="nav_a"
                      >
                        Self-Publish with Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://go.thehub-amazon.com/amazon-hub-locker"
                        className="nav_a"
                      >
                        Host an Amazon Hub
                      </Link>
                    </li>
                    <li className="nav_last nav_a_carat">
                      <span className="nav_a_carat" aria-hidden="true"></span>
                      <Link
                        href="https://www.amazon.com/b/?node=18190131011&amp;ld=AZUSSOA-seemore&amp;ref_=footer_seemore"
                        className="nav_a"
                      >
                        See More Make Money with Us
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col sm={3} md={3}>
                  <div className="nav-footer-col-header">
                    Amazon Payment Products
                  </div>
                  <ul className="nav-footer-link">
                    <li className="nav_first">
                      <Link
                        href="https://www.amazon.com/dp/B07984JN3L?plattr=ACOMFO&amp;ie=UTF-8"
                        className="nav_a"
                      >
                        Amazon Business Card-normal
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.amazon.com/gp/browse.html?node=16218619011&amp;ref_=footer_swp"
                        className="nav_a"
                      >
                        Shop with Points
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.amazon.com/gp/browse.html?node=10232440011&amp;ref_=footer_reload_us"
                        className="nav_a"
                      >
                        Reload Your Balance
                      </Link>
                    </li>
                    <li className="nav_last ">
                      <Link
                        href="https://www.amazon.com/gp/browse.html?node=388305011&amp;ref_=footer_tfx"
                        className="nav_a"
                      >
                        Amazon Currency Converter
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col sm={3} md={3}>
                  <div className="nav-footer-col-header">Let Us Help You </div>
                  <ul className="nav-footer-link">
                    <li className="nav_first">
                      <Link
                        href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GDFU3JS5AL6SYHRD&amp;ref_=footer_covid"
                        className="nav_a"
                      >
                        Amazon and COVID-19
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.amazon.com/gp/css/homepage.html?ref_=footer_ya"
                        className="nav_a"
                      >
                        Your Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.amazon.com/gp/css/order-history?ref_=footer_yo"
                        className="nav_a"
                      >
                        Your Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.amazon.com/gp/help/customer/display.html?nodeId=468520&amp;ref_=footer_shiprates"
                        className="nav_a"
                      >
                        Shipping Rates &amp; Policies
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.amazon.com/gp/css/returns/homepage.html?ref_=footer_hy_f_4"
                        className="nav_a"
                      >
                        Returns &amp; Replacements
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.amazon.com/gp/digital/fiona/manage?ref_=footer_myk"
                        className="nav_a"
                      >
                        Manage Your Content and Devices
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.amazon.com/gp/BIT/ref=footer_bit_v2_us_A0029?bitCampaignCode=A0029"
                        className="nav_a"
                      >
                        Amazon Assistant
                      </Link>
                    </li>
                    <li className="nav_last ">
                      <Link
                        href="https://www.amazon.com/gp/help/customer/display.html?nodeId=508510&amp;ref_=footer_gw_m_b_he"
                        className="nav_a"
                      >
                        Help
                      </Link>
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
