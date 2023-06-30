import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function ProgressBar(props) {
  return (
    <div className="order-progress-bar py-5">
      <div
        className={
          props.p1
            ? props.p1 === "active"
              ? "active enabled"
              : "enabled"
            : "disabled"
        }
      >
        SIGN IN
        <i className="fa fa-sign-in fa-2x" aria-hidden="true"></i>
      </div>
      <div
        className={
          props.p2
            ? props.p2 === "active"
              ? "active enabled"
              : "enabled"
            : "disabled"
        }
      >
        SHIPPING
        <i className="fa fa-shopping-basket fa-2x" aria-hidden="true"></i>
      </div>
      <div
        className={
          props.p3
            ? props.p3 === "active"
              ? "active enabled"
              : "enabled"
            : "disabled"
        }
      >
        PAYMENT
        <i className="fa fa-shopping-basket fa-2x" aria-hidden="true"></i>
      </div>
      <div
        className={
          props.p4
            ? props.p4 === "active"
              ? "active enabled"
              : "enabled"
            : "disabled"
        }
      >
        PLACE ORDER
        <i className="fa fa-shopping-basket fa-2x" aria-hidden="true"></i>
      </div>
    </div>
  );
}
