import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router";

import { saveAddress } from "../../slice/userSlice";

export default function AddressAddPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartState = useSelector((state) => state.cart);
  const { shippingAddress } = cartState;

  const userAuthState = useSelector((state) => state.userAuth);
  const { userInfo } = userAuthState;

  const { search } = useLocation();
  const redirectSearch = new URLSearchParams(search).get("redirect");
  const redirectUrl = redirectSearch ? redirectSearch : "/";

  const [fullName, setFullname] = useState("");
  const [address1, setFirstAddress] = useState("");
  const [address2, setSecondAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const sa = {
      fullName,
      address1,
      address2,
      city,
      province,
      postalCode,
      country,
    };

    dispatch(saveAddress(sa));
    navigate(redirectUrl);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/account/address/add");
    }
  }, []);

  return (
    <Container>
      <Row className="my-5">
        <Col className="d-flex justify-content-center">
          <div>
            <div className="ms-3">
              <h3>Add a new Address</h3>
              <div>
                {/* <span className="dark-grey">
                Would you like to save this address?
                <input
                  className="d-inline-block m-3"
                  id="save"
                  type="checkbox"
                  name="save"
                  onChange={() => setSaveForUser(!saveForUser)}
                ></input>
              </span> */}
              </div>
            </div>
            <form className="shipping add-new" onSubmit={submitHandler}>
              <div>
                <label htmlFor="fullName">Full name</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter full name"
                  value={fullName}
                  title="Name must consist of 3~50 alphabet characters."
                  pattern="[A-Za-z\s]{3,50}"
                  onChange={(e) => setFullname(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="address1">Address line 1:</label>
                <input
                  type="text"
                  id="address1"
                  placeholder="Street address, P.O.box, company name, etc.."
                  value={address1}
                  onChange={(e) => setFirstAddress(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="address2">Address line 2:</label>
                <input
                  type="text"
                  id="address2"
                  placeholder="Unit number"
                  value={address2}
                  onChange={(e) => setSecondAddress(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="city">Province:</label>
                <input
                  type="text"
                  id="province"
                  placeholder="Province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="postalCode">Postal code</label>
                <input
                  type="text"
                  id="postalCode"
                  placeholder="Postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  id="country"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                ></input>
              </div>
              <div>
                <label />
                <button className="shipping rect yellow" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
