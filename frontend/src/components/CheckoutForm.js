import { PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { createOrder } from "../slice/orderSlice";

export default function CheckoutForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const cartState = useSelector((state) => state.cart);
  const { cartItems, orderInfo, shippingAddress } = cartState;

  const userAuthState = useSelector((state) => state.userAuth);
  const { userInfo } = userAuthState;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/ordersummary/`,
      },
      redirect: "if_required",
    });

    if (
      error &&
      (error.type === "card_error" || error.type === "validation_error")
    ) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment Status: " + paymentIntent.status);
      const items = cartItems.map((item) => {
        return {
          asin: item.asin,
          title: item.title,
          qty: item.qty,
          image: item.image,
          price: item.currentPrice,
        };
      });
      const newOrder = {
        userId: userInfo._id,
        orderedItems: items,
        shippingAddress: shippingAddress._id,
        paymentResult: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          update_time: new Date().toISOString(),
        },
        shippingPrice: orderInfo.shippingPrice,
        total: orderInfo.total,
        tax: orderInfo.tax,
        final: orderInfo.final,
        expectedDelivery: orderInfo.expectedDelivery,
        eligibleReturnDate: orderInfo.eligibleReturnDate,
        dateOfPayment: new Date().toISOString(),
      };
      dispatch(createOrder(newOrder));
      navigate(`/ordersummary/${paymentIntent.id}`);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" className="p-0" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        class="payment-button"
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">{isProcessing ? "Processing" : "Pay now"}</span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
