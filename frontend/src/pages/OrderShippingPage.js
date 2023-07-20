import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProgressBar from "../components/ProgressBar";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getAddress } from "../slice/userSlice";
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
      console.log(address[selectAddress]);
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
              <div className="my-4">
                <h3>Your addresses</h3>
              </div>
              <Container>
                <Row>
                  <Col xs={6} sm={4} lg={3}>
                    <Link
                      // className="box shipping add-new"
                      to="/user/address/add?redirect=/shipping"
                    >
                      <Card className="box shipping add-new text-center">
                        <Card.Body className="d-flex justify-content-center flex-column">
                          <i className="fa-solid fa-plus text-secondary fa-2xl"></i>
                          <Card.Title className="my-2 text-muted">
                            Add Address
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                  {address.length !== 0 &&
                    address.map((a, idx) => (
                      <Col xs={6} sm={4} lg={3} key={idx} className="">
                        <Card
                          data-index={idx}
                          className="box shipping use-old"
                          onClick={() => changeAddress(idx)}
                        >
                          <Card.Body>
                            <Card.Title>{a.fullName}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              Amazon Default
                            </Card.Subtitle>
                            <Card.Text>
                              <span>{a.address1} </span>{" "}
                              <span>{a.address2}</span>
                              <br></br>
                              <span>{a.city}, </span>
                              <span>{a.province}, </span>
                              <span>{a.postalCode},</span>
                              <br></br>
                              <span>{a.country}</span>
                            </Card.Text>
                          </Card.Body>
                        </Card>
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
