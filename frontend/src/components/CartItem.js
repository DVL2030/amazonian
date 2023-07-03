import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { removeItemFromCart, updateCartQuantity } from "../slice/cartSlice";

export default function CartItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item } = props;
  const qtyHandler = (asin, q) => {
    dispatch(updateCartQuantity({ asin: asin, qty: q }));
  };

  const saveForLater = (asin, q) => {
    // dispatch(updateCartQuantity(id, q));
  };

  const removeFromCartHandler = (asin) => {
    dispatch(removeItemFromCart({ asin }));
  };

  return (
    <Row className="cart-item">
      <Col xs={12} sm={4} lg={2}>
        <Link to={`/product/${item.asin}`}>
          <div className="img-xs text-align-center">
            <img
              className=" text-align-center"
              src={item.image}
              alt={item.title}
            ></img>
          </div>
        </Link>
      </Col>
      <Col xs={12} sm={8} lg={9}>
        <Link to={`/product/${item.asin}`}>
          <h5 className="cart-item-header d-none d-lg-block">{item.title}</h5>
          <h5 className="d-block d-lg-none">
            {item.title.substring(0, 20)}...
          </h5>
        </Link>
        <h5>{item.currentPrice}</h5>
        <ul className="no-list-style">
          <li>
            <small className="grey">Ships from and sold by Amazonian</small>
          </li>
          <li>
            <small className="grey">Eligible for FREE Shipping</small>
          </li>
          <li>
            <small className={item.available ? "text-success" : "text-danger"}>
              {item.availability}
            </small>
          </li>
          <li>
            <label className="">Qty: </label>
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
            <div class="cart-item-action d-inline-block">
              <small
                className="cart-button blue px-3"
                onClick={() => removeFromCartHandler(item.asin)}
              >
                Delete
              </small>
              <small
                className="cart-button blue px-3"
                onClick={() => saveForLater(item.asin)}
              >
                Save for later
              </small>
              <small className="cart-button blue d-none d-lg-inline-block">
                See more like this
              </small>
            </div>
          </li>
        </ul>
      </Col>
    </Row>
  );
}
