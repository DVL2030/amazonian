import React, { useEffect, useState } from "react";
import { Col, Container, Row, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";

import { removeItemFromCart, updateCartQuantity } from "../slice/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);
  const { cart, error } = cartState;

  const qtyHandler = (asin, q) => {
    dispatch(updateCartQuantity({ asin: asin, qty: q }));
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

              {cart.length === 0 ? (
                <MessageBox>
                  <h1>Your Amazonian cart is empty.</h1>
                  <Link to="/">Go Shopping!</Link>
                </MessageBox>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx}>
                    <Container fluid>
                      <Row className="cart-item">
                        <Col xs={12} sm={4} lg={2}>
                          <Link to={`/product/${item.asin}`}>
                            <div className="img-xs text-align-center">
                              <img
                                className=" text-align-center"
                                src={item.image}
                                alt={item.title}
                              ></img>
                            </div>
                          </Link>
                        </Col>
                        <Col xs={12} sm={8} lg={9}>
                          <Link to={`/product/${item.asin}`}>
                            <h5 className="cart-item-header d-none d-lg-block">
                              {item.title}
                            </h5>
                            <h5 className="d-block d-lg-none">
                              {item.title.substring(0, 20)}...
                            </h5>
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
                              <label className="">Qty: </label>
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
                              <div class="cart-item-action d-inline-block">
                                <small
                                  className="cart-button blue px-3"
                                  onClick={() =>
                                    removeFromCartHandler(item.asin)
                                  }
                                >
                                  Delete
                                </small>
                                <small
                                  className="cart-button blue px-3"
                                  onClick={() => saveForLater(item.asin)}
                                >
                                  Save for later
                                </small>
                                <small className="cart-button blue d-none d-lg-inline-block">
                                  See more like this
                                </small>
                              </div>
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
                  {cart.reduce((total, x) => total + Number(x.qty), 0)} items):{" "}
                  <strong>
                    $
                    {cart
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
            {cart.length !== 0 && (
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
                    {cart.reduce((total, x) => total + Number(x.qty), 0)}{" "}
                    items):{" "}
                    <strong>
                      $
                      {cart
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
