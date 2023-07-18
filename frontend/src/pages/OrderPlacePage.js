// import Stripe from "stripe";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addDays, options, toNum } from "../utils";
import {
  removeItemFromCart,
  saveOrderInfo,
  updateCartQuantity,
} from "../slice/cartSlice";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

import MessageBox from "../components/MessageBox";
import ProgressBar from "../components/ProgressBar";

export default function OrderPlacePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAuthState = useSelector((state) => state.userAuth);
  const { userInfo } = userAuthState;

  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;

  const shippingAddress = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : null;

  // Bootstrap Modal
  const [show, setShow] = useState(false);
  const [selectAsin, setSelectAsin] = useState("0");

  const [saveShippingPaymentInfo, setSaveShippingPaymentInfo] = useState(0);
  const [deliveryOptions, setDeliveryOptions] = useState({
    price: options[0].price,
    date: options[0].date,
  });

  const subTotal = toNum(
    cartItems.reduce(
      (total, x) => total + x.qty * Number(x.currentPrice.substring(1)),
      0
    )
  );

  const shippingPrice = subTotal > 0 ? toNum(deliveryOptions.price) : 0;
  const total = toNum(subTotal + shippingPrice);
  const tax = toNum(total * 0.13);
  const final = toNum(total + tax);
  const expectedDelivery = new Date(deliveryOptions.date).toISOString();
  const eligibleReturnDate = new Date(addDays(30)).toISOString();

  // Handler Functions
  const qtyHandler = (asin, q) => {
    dispatch(updateCartQuantity({ asin: asin, qty: q }));
  };

  const removeFromCartHandler = (asin) => {
    setShow(true);
    setSelectAsin(asin);
  };

  const handleConfirm = (val) => {
    if (val === "true") {
      dispatch(removeItemFromCart({ asin: selectAsin }));
    }
    setShow(false);
  };

  const deliveryOptionsHandler = (price, date) => {
    setDeliveryOptions({ price: price, date: date });
  };

  const saveForLater = (asin) => {};

  const placeOrderHandler = () => {
    dispatch(
      saveOrderInfo({
        userId: userInfo._id,
        shippingPrice: shippingPrice,
        total: total,
        tax: tax,
        final: final,
        expectedDelivery: expectedDelivery,
        eligibleReturnDate: eligibleReturnDate,
      })
    );
    navigate("/payment");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/placeorder");
    }
  }, [cartItems]);

  return (
    <div id="order-place-container">
      <ProgressBar p1 p2 p3="active"></ProgressBar>
      <Container fluid className="pb-5">
        <Row className="order-place-main-container">
          <h1 className="">Review your order</h1>
          <Col xs={12} lg={9}>
            <div className="box d-flex gap-3">
              <div>
                <span>
                  <i className="fa fa-info-circle fa-2x" aria-hidden="true"></i>
                </span>
              </div>
              <div>
                <div>
                  <big>
                    Want to save time on your next order and go directly to this
                    step when checking out?
                  </big>
                  <div>
                    <input
                      type="checkbox"
                      id="saveShippingPaymentInfo"
                      name="saveShippingPaymentInfo"
                      value={saveShippingPaymentInfo}
                      onChange={(e) => {
                        setSaveShippingPaymentInfo(1);
                      }}
                    ></input>
                    <label
                      className="dark-grey d-inline-block ms-2"
                      htmlFor="saveShippingPaymentInfo"
                    >
                      Check this box to default to these delivery and payment
                      options in the future.
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="box">
              <Container fluid>
                <Row>
                  <Col xs={6}>
                    <span>
                      <h2>Shipping address</h2>
                      <Link to="/shipping">
                        <small className="blue ml-2">Change</small>
                      </Link>
                    </span>
                    <div>
                      {shippingAddress && (
                        <ul className="no-list-style">
                          <li>
                            <strong>{shippingAddress.fullName}</strong>
                          </li>
                          <li>
                            <span>
                              {shippingAddress.address1},{" "}
                              <i>Unit #: {shippingAddress.address2}</i>
                            </span>
                          </li>
                          <li>
                            {shippingAddress.city}, {shippingAddress.postalCode}
                            .
                          </li>
                          <li>{shippingAddress.country}</li>
                        </ul>
                      )}
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div>
                      <h2>Billing address </h2>
                      <Link to="/shipping">
                        <small className="blue ml-2">Change</small>
                      </Link>

                      <div>
                        {shippingAddress && (
                          <ul className="no-list-style">
                            <li>
                              <strong>{shippingAddress.fullName}</strong>
                            </li>
                            <li>
                              <span>
                                {shippingAddress.address1},{" "}
                                <i>Unit #: {shippingAddress.address2}</i>
                              </span>
                            </li>
                            <li>
                              {shippingAddress.city},{" "}
                              {shippingAddress.postalCode}.
                            </li>
                            <li>{shippingAddress.country}</li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="box">
              {cartItems.length === 0 ? (
                <MessageBox variants="danger">
                  <h1>Your Amazonian cart is empty.</h1>{" "}
                  <Link to="/">Go Shopping!</Link>
                </MessageBox>
              ) : (
                <div>
                  <h2 className="text-success d-inline-block">
                    Estimated delivery: {deliveryOptions.date}
                  </h2>{" "}
                  {deliveryOptions.price === options[0].price &&
                    deliveryOptions.date === options[0].date && (
                      <span className="grey">
                        If you order in the next 30 minutes
                      </span>
                    )}
                  <Container fluid>
                    <Row>
                      <Col xs={12} lg={9}>
                        <Container>
                          {cartItems.map((item, idx) => (
                            <Row key={idx} className="my-2">
                              <Col md={3} className="d-none d-md-block">
                                <Link to={`/product/${item.asin}`}>
                                  <div className="sm">
                                    <img src={item.image} alt={item.name}></img>
                                  </div>
                                </Link>
                              </Col>
                              <Col xs md={9}>
                                <Link to={`/product/${item.asin}`}>
                                  <big>
                                    <strong>{item.title}</strong>
                                  </big>
                                </Link>
                                <ul className="no-list-style">
                                  <li>
                                    <small className="grey">
                                      Ships from and sold by Amazonian
                                    </small>
                                  </li>
                                  <li>
                                    <span className="price">
                                      {item.currentPrice}
                                    </span>
                                  </li>
                                  <li>
                                    <small className="text-success">
                                      {item.availability}
                                    </small>
                                  </li>
                                  <li className="d-block d-sm-flex gap-3">
                                    <div className="">
                                      <label>Qty: </label>
                                      <select
                                        className="cart"
                                        value={item.qty}
                                        onChange={(e) =>
                                          qtyHandler(item.asin, e.target.value)
                                        }
                                      >
                                        {[...Array(Number(10)).keys()].map(
                                          (x) => (
                                            <option key={x + 1} value={x + 1}>
                                              {x + 1}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                    <div>
                                      <small
                                        className="cart-button blue"
                                        onClick={() =>
                                          removeFromCartHandler(item.asin)
                                        }
                                      >
                                        Delete
                                      </small>
                                    </div>
                                    <div>
                                      <small
                                        className="cart-button blue"
                                        onClick={() => saveForLater(item.asin)}
                                      >
                                        Save for later
                                      </small>
                                    </div>
                                  </li>
                                </ul>
                              </Col>
                              <hr className="my-2"></hr>
                            </Row>
                          ))}
                        </Container>
                      </Col>
                      <Col xs lg={3}>
                        <strong>Choose a delivery option: </strong>
                        <form id="deliveryOptions" className="my-4">
                          {options.map((op, idx) => (
                            <div className="d-flex mb-3" key={idx}>
                              <input
                                type="radio"
                                id={`option${idx + 1}`}
                                name="deliveryOptions"
                                onChange={() =>
                                  deliveryOptionsHandler(op.price, op.date)
                                }
                              ></input>
                              <label
                                className="d-inline-block ms-2"
                                htmlFor={`option${idx + 1}`}
                              >
                                <strong className="text-success">
                                  {op.date}
                                </strong>
                                <div>
                                  <span className="text-secondary">
                                    {op.price} - {op.label}
                                  </span>
                                </div>
                              </label>
                            </div>
                          ))}
                        </form>
                      </Col>
                    </Row>
                  </Container>
                </div>
              )}
            </div>
          </Col>
          <Col>
            <div className="box">
              <button
                className="rect yellow"
                onClick={placeOrderHandler}
                disabled={cartItems.length === 0}
              >
                Place your Order
              </button>

              <div className="content-center">
                <small>
                  By placing your order, you agree to Amazonian's{" "}
                  <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=508088">
                    Conditions of Use
                  </Link>{" "}
                  and{" "}
                  <Link to="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496">
                    Privacy Notice.
                  </Link>{" "}
                </small>
              </div>
              <div>
                <ul className="no-list-style">
                  <li>
                    <strong>Order summary</strong>
                  </li>
                  <li className="row">
                    <div>
                      Items (
                      {parseInt(
                        cartItems.reduce((total, x) => total + x.qty, 0),
                        10
                      )}
                      ):
                    </div>
                    <div>${subTotal}</div>
                  </li>
                  <li className="row">
                    <div>Shipping & Handling:</div>
                    <div>${deliveryOptions.price}</div>
                  </li>
                  <hr />
                  <li className="row">
                    <div>Total before tax:</div>
                    <div>${total}</div>
                  </li>
                  <li className="row">
                    <div>Estimated tax (GST & HST): </div>
                    <div>${tax}</div>
                  </li>
                  <hr />
                  <li className="row">
                    <div className="dark-red">Order final:</div>
                    <div className="dark-red">${final}</div>
                  </li>
                </ul>
              </div>
              <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete this item?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    value={false}
                    onClick={(e) => handleConfirm(e.target.value)}
                  >
                    No
                  </Button>
                  <Button
                    variant="primary"
                    value={true}
                    onClick={(e) => handleConfirm(e.target.value)}
                  >
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
