import React from "react";

import { Badge, Nav, Navbar, Container, Form } from "react-bootstrap";

export default function Searchbox() {
  const adjustWidth = () => {
    let select = document.getElementById("searchSelect");
    let selectedOption = select[select.selectedIndex];
    select.style.width = Number(selectedOption.text.length + 6) + "ch";
  };

  return (
    <Navbar
      id="search-nav"
      bg="dark"
      variant="dark"
      className="flex-column flex-md-row"
    >
      <Container fluid id="search-nav-container">
        <Navbar.Brand href="#">
          <div className="img-logo">
            <img
              alt="amazonian brand logo"
              src="imgs/amazonian_brand_logo.png"
              className="align-top"
            />
          </div>
        </Navbar.Brand>
        <Nav className="me-2 d-none d-md-block">
          <Nav.Link href="#features">
            <Badge bg="secondary">Deliver</Badge>
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
          >
            <option selected value="search-alias=aps">
              All
            </option>
            <option value="search-alias=arts-crafts-intl-ship">
              Arts &amp; Crafts
            </option>
            <option value="search-alias=automotive-intl-ship">
              Automotive
            </option>
            <option value="search-alias=baby-products-intl-ship">Baby</option>
            <option value="search-alias=beauty-intl-ship">
              Beauty &amp; Personal Care
            </option>
            <option value="search-alias=stripbooks-intl-ship">Books</option>
            <option value="search-alias=fashion-boys-intl-ship">
              Boys' Fashion
            </option>
            <option value="search-alias=computers-intl-ship">Computers</option>
            <option value="search-alias=deals-intl-ship">Deals</option>
            <option value="search-alias=digital-music">Digital Music</option>
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
            <option value="search-alias=digital-text">Kindle Store</option>
            <option value="search-alias=luggage-intl-ship">Luggage</option>
            <option value="search-alias=fashion-mens-intl-ship">
              Men's Fashion
            </option>
            <option value="search-alias=movies-tv-intl-ship">
              Movies &amp; TV
            </option>
            <option value="search-alias=music-intl-ship">
              Music, CDs &amp; Vinyl
            </option>
            <option value="search-alias=pets-intl-ship">Pet Supplies</option>
            <option value="search-alias=instant-video">Prime Video</option>
            <option value="search-alias=software-intl-ship">Software</option>
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
        <Nav className="nav-right">
          <Nav.Link
            id="sign-in-dropdown"
            href="#features"
            className="nav-right-item d-flex flex-column d-none d-md-flex"
            border="primary"
          >
            <div className="nav-line-1-container">
              <span id="nav-line-2">Hello, Sign in</span>
            </div>
          </Nav.Link>
        </Nav>
        <Nav className="nav-right">
          <Nav.Link
            href="#pricing"
            className="nav-right-item d-flex flex-column d-none d-md-block"
          >
            <span className="nav-line-2">
              <small>Returns </small>
            </span>
            <span className="nav-line-2">
              <small>& Orders</small>
            </span>
          </Nav.Link>
        </Nav>
        <Nav className="nav-right">
          <Nav.Link href="#cart" className="nav-right-item d-flex">
            <div className="nav-cart-count-container d-flex">
              <span
                id="nav-cart-count"
                aria-hidden="true"
                className="nav-cart-count"
              >
                0
              </span>
              <div className="img-cart">
                <img alt="cart logo" src="imgs/amazon_cart.png" />
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
      <Container fluid className="d-block d-md-none mt-2">
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
  );
}
