import React, { useEffect, useState } from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import MessageBox from "../components/MessageBox";

import { removeItemFromCart, updateCartQuantity } from "../slice/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;

  const qtyHandler = (asin, q) => {
    console.log("qty Handler", asin);
    dispatch(updateCartQuantity({ asin: asin, q: q }));
  };

  const saveForLater = (asin, q) => {
    // dispatch(updateCartQuantity(id, q));
  };

  const removeFromCartHandler = (asin) => {
    dispatch(removeItemFromCart({ asin }));
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div id="cart-page-container">
      <Container fluid>
        <Row className="p-5">
          <Col lg={10}>
            <div className="box bg-white">
              <div>
                <h2>Shopping Cart</h2>
              </div>
              <hr></hr>
              {cartItems.length === 0 ? (
                <MessageBox variants="danger">
                  <h1>Your Amazonian cart is empty.</h1>
                  <Link to="/">Go Shopping!</Link>
                </MessageBox>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx}>
                    <Container fluid>
                      <Row className="cart-item">
                        <Col lg={2}>
                          <Link to={`/product/${item.asin}`}>
                            <div className="img-xs text-align-center">
                              <img
                                className="text-align-center"
                                src={item.image}
                                alt={item.title}
                              ></img>
                            </div>
                          </Link>
                        </Col>
                        <Col lg={9}>
                          <Link to={`/product/${item.asin}`}>
                            <h5>{item.title}</h5>
                          </Link>
                          <h5>{item.currentPrice}</h5>
                          <ul className="no-list-style">
                            <li>
                              <small className="grey">
                                Ships from and sold by Amazonian
                              </small>
                            </li>
                            <li>
                              <small className="grey">
                                Eligible for FREE Shipping
                              </small>
                            </li>
                            <li>
                              <small
                                className={
                                  item.available
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {item.availability}
                              </small>
                            </li>
                            <li>
                              <label className="">Qty:{"   "}</label>
                              <select
                                className="cart"
                                value={item.qty}
                                onChange={(e) =>
                                  qtyHandler(item.asin, e.target.value)
                                }
                              >
                                {[...Array(Number(10)).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </select>
                              <small
                                className="cart-button blue px-3"
                                onClick={() => removeFromCartHandler(item.asin)}
                              >
                                Delete
                              </small>
                              <small
                                className="cart-button blue px-3"
                                onClick={() => saveForLater(item.asin)}
                              >
                                Save for later
                              </small>
                              <small className="cart-button blue">
                                See more like this
                              </small>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </Container>
                    <hr></hr>
                  </div>
                ))
              )}
              <div>
                <big className="float-right">
                  Subtotal (
                  {cartItems.reduce((total, x) => total + Number(x.qty), 0)}{" "}
                  items):{" "}
                  <strong>
                    $
                    {cartItems.reduce(
                      (total, x) =>
                        total +
                        Number(x.qty) * Number(x.currentPrice.substring(1)),
                      0
                    )}
                  </strong>
                </big>
              </div>
            </div>
          </Col>

          <Col lg={2}>
            {cartItems.length !== 0 && (
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
                    {cartItems.reduce((total, x) => total + Number(x.qty), 0)}{" "}
                    items):{" "}
                    <strong>
                      $
                      {cartItems.reduce(
                        (total, x) =>
                          Number(x.qty) * Number(x.currentPrice.substring(1)),
                        0
                      )}
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
