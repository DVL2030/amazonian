import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { Container, Row, Col } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import axios from "axios";

export default function OrderPaymentPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const cartState = useSelector((state) => state.cart);
  const { orderInfo } = cartState;

  const orderState = useSelector((state) => state.order);
  const { createOrder, loading, error } = orderState;

  useEffect(() => {
    axios.get("/api/config/key").then(async (r) => {
      const { publicKey } = r.data;
      setStripePromise(loadStripe(publicKey));
    });
  }, []);

  useEffect(() => {
    if (orderInfo)
      axios
        .post("/api/config/create-payment-intent", {
          amount: parseInt(orderInfo.final),
        })
        .then(async (r) => {
          const { clientSecret } = r.data;
          setClientSecret(clientSecret);
        });

    if (createOrder) navigate(`/ordersummary/${createOrder._id}`);
  }, [orderInfo, createOrder]);
  return (
    <div className="payment-main-container">
      <ProgressBar p1 p2 p3 p4="active"></ProgressBar>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            {stripePromise && clientSecret.length !== 0 && (
              <Elements
                key={clientSecret}
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
