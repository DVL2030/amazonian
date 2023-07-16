import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProgressBar from "../components/ProgressBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getAddress } from "../slice/userSlice";
import { saveShippingAddress } from "../slice/cartSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { getOrder } from "../slice/orderSlice";
import CartItem from "../components/CartItem";

export default function OrderSummaryPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const { id } = param;

  const userAuthState = useSelector((state) => state.userAuth);
  const { userInfo } = userAuthState;

  const orderState = useSelector((state) => state.order);
  const { order, loading, error } = orderState;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    dispatch(getOrder(id));
  }, []);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : (
    <div>
      {error && <MessageBox>{error}</MessageBox>}
      <Container>
        <Row>
          <Col xs={12} className="py-3">
            <h2 className="text-warning">
              Thank you for your order! {userInfo.name},
            </h2>
            <p>
              Thank you for your order. We will send a confirmation when your
              order ships. Your estimated delivery date is indicated below. If
              you would like to view the status of your order or make any
              changes to it, please visit{" "}
              <Link to="/account/order/">Your Orders</Link> on Amazonian.
            </p>
          </Col>
          {order && (
            <Col xs={12} className="py-3">
              <h2 className="text-warning">Order details</h2>
              <hr></hr>
              <div className="my-4">
                <div>
                  <big>Order id: {id}</big>
                </div>
                <div className="text-secondary">
                  Placed on{" "}
                  {new Date(order.paymentResult.update_time).toDateString()}
                </div>
                <Container>
                  <Row className="order-summary-delivery-info">
                    <Col xs={6}>
                      <div className="mb-4">
                        <big>Arriving:</big>
                        <h5 className="text-success">
                          {new Date(order.expectedDelivery).toDateString()}
                        </h5>
                      </div>
                      <div>
                        <big>Eligible Return Date:</big>
                        <h5 className="text-success">
                          {new Date(order.eligibleReturnDate).toDateString()}
                        </h5>
                      </div>
                      <hr></hr>

                      <div>
                        <Button variant="warning">Manage order</Button>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div>
                        <div>
                          <span>Your order will be sent to:</span>
                          <h5>{userInfo.name}</h5>
                        </div>
                        <table className="w-100">
                          <tr>
                            <td>
                              <span>Total Before Tax:</span>
                            </td>
                            <td className="text-right">
                              <span className="text-right">${order.total}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Tax:</span>
                            </td>
                            <td>
                              <span className="text-right">${order.tax}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Shipping Price:</span>
                            </td>
                            <td>
                              <span className="text-right">
                                ${order.shippingPrice}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <big>
                                <b>Order Total:</b>
                              </big>
                            </td>
                            <td>
                              <big className="text-right">
                                <b>${order.final}</b>
                              </big>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      {order.orderedItems.length !== 0 && (
                        <Container fluid>
                          {order.orderedItems.map((item, idx) => (
                            <>
                              <CartItem
                                key={idx}
                                item={item}
                                modify={false}
                              ></CartItem>
                              {order.orderedItems.length > 1 &&
                                idx + 1 !== order.orderedItems.length && (
                                  <hr className="my-2"></hr>
                                )}
                            </>
                          ))}
                          <hr></hr>
                        </Container>
                      )}
                    </Col>
                  </Row>
                  <div className="text-right">
                    <big>
                      <b>Order Total: ${order.final}</b>
                    </big>
                  </div>
                </Container>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
