import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { removeItemFromCart, updateCartQuantity } from "../slice/cartSlice";

export default function CartItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item, modify } = props;

  // Bootstrap Modal
  const [show, setShow] = useState(false);
  const [selectAsin, setSelectAsin] = useState("0");

  const qtyHandler = (asin, q) => {
    dispatch(updateCartQuantity({ asin: asin, qty: q }));
  };

  const saveForLater = (asin, q) => {
    // dispatch(updateCartQuantity(id, q));
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

  return (
    <Row className="my-2 cart-item">
      <Col xs={12} sm={4} lg={2}>
        <Link to={`/product/${item.asin}`}>
          <div className="d-none d-xl-block img-cart-item">
            <img src={item.image} alt={item.title}></img>
          </div>
          <div className="d-none d-sm-block d-xl-none">
            <img src={item.image} alt={item.title}></img>
          </div>
          <div className="d-block d-sm-none img-xs">
            <img
              className=" text-align-center"
              src={item.image}
              alt={item.title}
            ></img>
          </div>
        </Link>
      </Col>

      <Col xs md lg>
        <Link to={`/product/${item.asin}`}>
          <big>
            <strong>{item.title}</strong>
          </big>
        </Link>
        <ul className="no-list-style">
          <li>
            <small className="text-secondary">
              Ships from and sold by Amazonian
            </small>
          </li>
          <li>
            <span className="price">{item.currentPrice}</span>
          </li>
          {item.qty && item.price && (
            <>
              <li>
                Price: <b>{item.price}</b>
              </li>
              <li>
                Qty: <b className="qty">{item.qty}</b>
              </li>
              <li>
                Subtotal:{" "}
                <b className="subtotal">
                  {(Number(item.qty) * Number(item.price.substring(1))).toFixed(
                    2
                  )}
                </b>
              </li>
            </>
          )}

          <li>
            <small className="text-success">{item.availability}</small>
          </li>
          {modify && (
            <li className="d-block d-sm-flex gap-3">
              <div className="">
                <label>Qty: </label>
                <select
                  className="cart"
                  value={item.qty}
                  onChange={(e) => qtyHandler(item.asin, e.target.value)}
                >
                  {[...Array(Number(10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <small
                  className="cart-button blue"
                  onClick={() => removeFromCartHandler(item.asin)}
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
            </li>
          )}
        </ul>
      </Col>
    </Row>
  );
}
