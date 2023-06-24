import React, { useState } from "react";

import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Searchbox(props) {
  const navigate = useNavigate();
  const [department, setDepartment] = useState("All");
  const [keyword, setKeyword] = useState("");

  const { mobile } = props;

  const adjustWidth = () => {
    let select = document.getElementById("search-select");
    let selectedOption = select[select.selectedIndex];
    select.style.width = Number(selectedOption.text.length + 6) + "ch";
  };

  const selectChange = (value) => {
    adjustWidth();
    setDepartment(value);
    console.log(department);
  };

  const inputChange = (value) => {
    setKeyword(value);
    console.log(keyword);
  };

  const buildURL = () => {
    let url = "/";
    if (keyword.length > 1) url += `products/${keyword}`;
    if (department.length > 1) url += `/department/${department}`;
    return url;
  };

  const searchSubmitHandler = () => {
    console.log("I am called");
    navigate(buildURL());
  };

  return (
    <>
      {mobile ? (
        <Container fluid className="d-block d-md-none mt-2 mb-2">
          <Form
            id="search-form"
            className="d-flex flex-fill"
            onSubmit={searchSubmitHandler}
          >
            <Form.Control
              id="search-input"
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => inputChange(e.target.value)}
            />
            <button className="search" type="submit">
              <i className="fa fa-search fa-lg text-black"></i>
            </button>
          </Form>
        </Container>
      ) : (
        <Form
          id="search-form"
          className="nav-center d-flex flex-fill d-none d-md-flex "
          onSubmit={searchSubmitHandler}
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
            <option value="industrial">Industrial &amp; Scientific</option>
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
          <button className="search" type="submit">
            <i className="fa fa-search fa-lg text-black"></i>
          </button>
        </Form>
      )}
    </>
  );
}
