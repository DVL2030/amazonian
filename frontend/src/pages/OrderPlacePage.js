// import Stripe from "stripe";
// import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addDays, options, toNum } from "../utils";
import { removeItemFromCart, updateCartQuantity } from "../slice/cartSlice";
// import { createOrder } from "../actions/orderActions";
import { Container, Row, Col } from "react-bootstrap";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProgressBar from "../components/ProgressBar";

export default function OrderPlacePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const orderCreate = useSelector((state) => state.orderCreate);
  //   const { loading, success, error, order } = orderCreate;
  const userAuthState = useSelector((state) => state.userAuth);
  const { userInfo } = userAuthState;

  const cartState = useSelector((state) => state.cart);
  const { cartItems } = cartState;

  const shippingAddress = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : null;
  //   const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/placeorder");
    }
    // enablePaypalScript();

    // if (success) {
    //   navigate(`/order/${order._id}/pay`);
    //   dispatch({ type: ORDER_CREATE_RESET });
    // }
  }, []);

  const [saveShippingPaymentInfo, setSaveShippingPaymentInfo] = useState(0);
  const [code, setCode] = useState("");
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
  const expectedDelivery = new Date(deliveryOptions.date);
  const eligibleReturnDate = new Date(addDays(30));

  console.log(subTotal, shippingPrice, total);

  // Handler Functions
  const qtyHandler = (asin, q) => {
    dispatch(updateCartQuantity(asin, q));
  };

  const removeFromCartHandler = (asin) => {
    dispatch(removeItemFromCart(asin));
  };

  const deliveryOptionsHandler = (price, date) => {
    setDeliveryOptions({ price: price, date: date });
  };

  const saveForLater = (asin) => {};

  // const enablePaypalScript = async () => {
  //   const { data } = await Axios.get("/api/config/paypal");
  //   const script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
  //   script.async = true;
  //   script.onload = () => {
  //     setSdkReady(true);
  //   };
  //   document.body.appendChild(script);
  // };

  const placeOrderHandler = () => {
    // dispatch(createOrder({ ...cart, orderedItems: cart.cartItems }));
  };

  return (
    <div>
      <ProgressBar p1 p2 p3 p4="active"></ProgressBar>
      {/* {loading && <LoadingBox />} */}
      {/* {error && <MessageBox variants="danger">{error}</MessageBox>} */}
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
                      className="dark-grey"
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
                      <small className="blue ml-2">Change</small>
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
                      <small className="blue ml-2">Change</small>
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
                      <Col xs={9}>
                        <Container>
                          {cartItems.map((item, idx) => (
                            <Row>
                              <Col xs={2}>
                                <Link to={`/product/${item.asin}`}>
                                  <div className="sm">
                                    <img src={item.image} alt={item.name}></img>
                                  </div>
                                </Link>
                              </Col>
                              <Col>
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
                                  <li>
                                    <label className="">Qty: </label>
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
                                    </div>
                                  </li>
                                </ul>
                              </Col>
                              <hr className="my-2"></hr>
                            </Row>
                          ))}
                        </Container>
                      </Col>
                      <Col xs={3}>
                        <strong>Choose a delivery option: </strong>
                        <form id="deliveryOptions">
                          <div>
                            <div>
                              <input
                                type="radio"
                                id="option1"
                                name="deliveryOptions"
                                onChange={() =>
                                  deliveryOptionsHandler(
                                    options[0].price,
                                    options[0].date
                                  )
                                }
                              ></input>
                              <label htmlFor="option1">
                                <strong className="green">
                                  {options[0].date}
                                </strong>
                                <div className="grey">
                                  {options[0].price} - Standard Shipping
                                </div>
                              </label>
                            </div>
                          </div>
                          <div>
                            <div>
                              <input
                                type="radio"
                                id="option2"
                                name="deliveryOptions"
                                onChange={() =>
                                  deliveryOptionsHandler(
                                    options[1].price,
                                    options[1].date
                                  )
                                }
                              ></input>
                              <label htmlFor="option2">
                                <strong className="green">
                                  {options[1].date}
                                </strong>
                                <div className="grey">
                                  {options[1].price} - Standard 3-Day Shipping
                                </div>
                              </label>
                            </div>
                          </div>
                          <div>
                            <div>
                              <input
                                type="radio"
                                id="option3"
                                name="deliveryOptions"
                                onChange={() =>
                                  deliveryOptionsHandler(
                                    options[2].price,
                                    options[2].date
                                  )
                                }
                              ></input>
                              <label htmlFor="option3">
                                <strong className="green">
                                  {options[2].date}
                                </strong>
                                <div className="grey">
                                  {options[2].price} - Standard 5-Day Shipping
                                </div>
                              </label>
                            </div>
                          </div>
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
