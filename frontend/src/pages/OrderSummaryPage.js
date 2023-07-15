import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProgressBar from "../components/ProgressBar";
import { Container, Row, Col } from "react-bootstrap";
import { getAddress } from "../slice/userSlice";
import { saveShippingAddress } from "../slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";

export default function OrderSummaryPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderState = useSelector((state) => state.order);
  const { createOrder, loading, error } = orderState;

  useEffect(() => {
    if (!createOrder) {
      navigate("/cart");
    }
    // createOrder;
  }, []);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : (
    <div>
      {error && <MessageBox>{error}</MessageBox>}
      <Container>
        <Row>
          <Col>
            <h1>
              <h1>Thank you!</h1> Your order has been successfully placed.
            </h1>
            {/* <p>Your order ID: {createOrder._id}</p> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
