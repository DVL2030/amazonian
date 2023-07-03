import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProgressBar from "../components/ProgressBar";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { getAddress, saveAddress } from "../slice/userSlice";
import { saveShippingAddress } from "../slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";

export default function OrderShippingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const { address, success, error } = userState;

  const userAuthState = useSelector((state) => state.userAuth);
  const { userInfo } = userAuthState;

  const [selectAddress, setSelectAddress] = useState(-1);

  const changeAddress = (idx) => {
    setSelectAddress(idx);
    const addressEl = document.getElementsByClassName("use-old");
    for (let add of addressEl) {
      if (add.getAttribute("data-index") == idx) {
        add.classList.add("selected");
      } else {
        add.classList.remove("selected");
      }
    }
  };

  const continueHandler = () => {
    if (selectAddress < 0) alert("You must choose an address to continue..");
    else {
      dispatch(saveShippingAddress(address[selectAddress]));
      navigate("/placeorder");
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    } else {
      dispatch(getAddress());
    }
  }, []);

  return (
    <div>
      <ProgressBar p1 p2="active"></ProgressBar>

      {success && (
        <MessageBox variants="success">
          You have successfully created a new address!
        </MessageBox>
      )}
      {error && (
        <MessageBox variants="error">
          There was a problem... Please try again.
        </MessageBox>
      )}
      <Container className="p-1">
        <Row className="p-0">
          {address && (
            <Col xs={12}>
              <div>
                <h3>Your addresses</h3>
              </div>
              <Container>
                <Row>
                  <Col xs={4}>
                    <Link
                      className="box shipping add-new"
                      to="/account/address/add?redirect=/shipping"
                    >
                      <i className="fa-solid fa-plus text-secondary fa-2xl"></i>
                      <h2 className="text-secondary">Add Address</h2>
                    </Link>
                  </Col>
                  {address.length !== 0 &&
                    address.map((a, idx) => (
                      <Col md={12} lg={4} key={idx} className="">
                        <div
                          data-index={idx}
                          className="box shipping use-old"
                          onClick={() => changeAddress(idx)}
                        >
                          <h5>{a.fullName}</h5>
                          <span>{a.address1} </span> <span>{a.address2}</span>
                          <br></br>
                          <span>{a.city}, </span>
                          <span>{a.province}, </span>
                          <span>{a.postalCode},</span>
                          <br></br>
                          <span>{a.country}</span>
                        </div>
                      </Col>
                    ))}
                </Row>
              </Container>
            </Col>
          )}
        </Row>
        <Row className="d-flex justify-content-center mt-5 p-5">
          <Col lg={2}>
            <button
              className="shipping rect orange"
              type="submit"
              onClick={() => continueHandler()}
            >
              Continue
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
