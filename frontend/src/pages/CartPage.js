import React, { useEffect, useState } from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import MessageBox from "../components/MessageBox";

import CartItem from "../components/CartItem";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartState = useSelector((state) => state.cart);
  const { cartItems, cart, error } = cartState;

  let cartItem =
    cart.length !== 0 ? cart : cartItems.length !== 0 ? cartItems : [];

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return error ? (
    <MessageBox variants="danger">{error}</MessageBox>
  ) : (
    <div id="cart-page-container">
      <Container fluid>
        <Row className="p-5">
          <Col md={8} lg={9}>
            <div className="box bg-white">
              <div>
                <h2>Shopping Cart</h2>
              </div>
              <hr></hr>

              {cartItem.length !== 0 ? (
                <Container>
                  {cartItem.map((item, idx) => (
                    <CartItem key={idx} item={item}></CartItem>
                  ))}
                  <hr></hr>
                </Container>
              ) : (
                <MessageBox>
                  <h1>Your Amazonian cart is empty.</h1>
                  <Link to="/">Go Shopping!</Link>
                </MessageBox>
              )}

              <div>
                <big className="float-right">
                  Subtotal (
                  {cartItem.reduce((total, x) => total + Number(x.qty), 0)}{" "}
                  items):{" "}
                  <strong>
                    $
                    {cartItem
                      .reduce(
                        (total, x) =>
                          total +
                          Number(x.qty) * Number(x.currentPrice.substring(1)),
                        0
                      )
                      .toFixed(2)}
                  </strong>
                </big>
              </div>
            </div>
          </Col>

          <Col md={4} lg={3}>
            {cartItem.length !== 0 && (
              <div className="box bg-white">
                <div className="mb-2">
                  <i
                    className="fa fa-lg fa-check-circle"
                    aria-hidden="true"
                  ></i>
                  <small>
                    <span className="success">
                      Your order qualifies for FREE shipping (excludes remote
                      locations).
                    </span>
                  </small>
                </div>
                <div className="mb-2">
                  <span className="grey">Choose this option at checkout.</span>{" "}
                  <Link to="https://www.amazon.ca/gp/help/customer/display.html?nodeId=GZXW7X6AKTHNUP6H&pop-up=1">
                    Details
                  </Link>
                </div>
                <div className="mb-2">
                  <big>
                    Subtotal (
                    {cartItem.reduce((total, x) => total + Number(x.qty), 0)} =
                    items):{" "}
                    <strong>
                      $
                      {cartItem
                        .reduce(
                          (total, x) =>
                            Number(x.qty) * Number(x.currentPrice.substring(1)),
                          0
                        )
                        .toFixed(2)}
                    </strong>
                  </big>
                </div>
                <div>
                  <button
                    onClick={checkoutHandler}
                    className="cart rect yellow"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
