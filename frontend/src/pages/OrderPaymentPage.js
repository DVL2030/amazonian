import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { Container, Row, Col } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { createIntent, getStripeKey } from "../slice/stripeSlice";

export default function OrderPaymentPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const orderState = useSelector((state) => state.order);
  const { createOrder } = orderState;

  const cartState = useSelector((state) => state.cart);
  const { orderInfo } = cartState;

  const stripeState = useSelector((state) => state.stripe);
  const { key, secret, loading: stripeLoading } = stripeState;

  useEffect(() => {
    if (createOrder) navigate(`/ordersummary/${createOrder._id}`);
  }, [createOrder]);

  useEffect(() => {
    if (!key) dispatch(getStripeKey());
    else if (key) setStripePromise(loadStripe(key.publicKey));
    if (!secret && !stripeLoading) {
      const final = parseInt(orderInfo.final);
      dispatch(createIntent({ amount: final }));
    } else if (secret) setClientSecret(secret.clientSecret);
  }, [key, secret]);

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
