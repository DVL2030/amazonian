import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ProgressBar from "../components/ProgressBar";
import { Container, Row, Col } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import axios from "axios";

export default function PaymentPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const userAuthState = useSelector((state) => state.userAuth);
  const { userInfo } = userAuthState;

  const cartState = useSelector((state) => state.cart);
  const { shippingAddress } = cartState;

  useEffect(() => {
    axios.get("/api/config/key").then(async (r) => {
      const { publicKey } = r.data;
      setStripePromise(loadStripe(publicKey));
    });
  }, []);

  useEffect(() => {
    axios
      .post("/api/config/create-payment-intent", {
        amount: 150,
      })
      .then(async (r) => {
        const { clientSecret } = r.data;
        setClientSecret(clientSecret);
      });
  }, []);
  return (
    <div className="payment-main-container">
      <ProgressBar p1 p2 p3 p4="active"></ProgressBar>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            {stripePromise && clientSecret.length !== 0 && (
              <Elements
                stripe={stripePromise}
                options={{
                  layout: {
                    type: "accordion",
                    defaultCollapsed: false,
                    radios: false,
                    spacedAccordionItems: true,
                  },
                  clientSecret: clientSecret,
                }}
              >
                <CheckoutForm></CheckoutForm>
              </Elements>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
