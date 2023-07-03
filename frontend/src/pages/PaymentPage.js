import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ProgressBar from "../components/ProgressBar";
import { Container, Row, Col } from "react-bootstrap";

export default function PaymentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAuthState = useSelector((state) => state.userAuth);
  const { userInfo } = userAuthState;

  const cartState = useSelector((state) => state.cart);
  const { shippingAddress } = cartState;

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/cart");
    }
  }, []);
  return (
    <div className="payment-main-container">
      <ProgressBar p1 p2 p3="active"></ProgressBar>
      <Container>
        <Row>
          <Col className="">
            <form className="payment" onSubmit={submitHandler}>
              <div>
                <h3>Payment</h3>
              </div>
              <div>
                <div>
                  <input
                    type="radio"
                    id="paypal"
                    value="Paypal"
                    name="paymentMethod"
                    required
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
              <div>
                <div>
                  <input
                    type="radio"
                    id="card"
                    value="Card"
                    name="paymentMethod"
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                  <label htmlFor="card">Credit / Debit Card</label>
                </div>
              </div>
              <div>
                <button className="rect yellow" type="submit">
                  Continue
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
