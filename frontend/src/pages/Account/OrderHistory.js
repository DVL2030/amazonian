import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { Button, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import { getOrderHistory } from "../../slice/orderSlice";

export default function OrderHistoryPage() {
  const dispatch = useDispatch();

  const userAuthState = useSelector((state) => state.userAuth);
  const { userInfo } = userAuthState;

  const orderState = useSelector((state) => state.order);
  const { history, loading, error } = orderState;

  useEffect(() => {
    dispatch(getOrderHistory());
  }, []);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variants="danger">{error}</MessageBox>
  ) : (
    history && (
      <Container className="p-2">
        <Row>
          <Col>
            <h3>Your Order History</h3>
            {history.map((order, idx) => (
              <div key={idx} className="box my-4">
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ORDER PLACED</th>
                        <th>TOTAL</th>
                        <th>SHIPPING TO</th>
                        <th>ORDER # {order._id}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={order._id}>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>
                          <strong className="text-danger">{order.final}</strong>
                        </td>
                        <td>{order.shippingAddress[0].fullName}</td>
                        <td>
                          <div>
                            <Link to="#">Order Details</Link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3>
                    {order.isDelivered
                      ? "Delivered " + order.dateOfDelivery.substring(0, 10)
                      : "Expected " + order.expectedDelivery.substring(0, 10)}
                  </h3>
                </div>
                <Container>
                  <Row>
                    <Col>
                      <span>
                        Your packcage{" "}
                        {order.isDelivered
                          ? "was delivered to "
                          : "is on the way to "}
                        {order.shippingAddress[0].address1}
                      </span>
                      <div>
                        <span>
                          Eligible for return until{" "}
                          <strong>
                            {order.eligibleReturnDate.substring(0, 10)}
                          </strong>
                        </span>
                      </div>

                      {order.orderedItems.length !== 0 && (
                        <Container fluid className="my-2">
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
                </Container>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    )
  );
}
