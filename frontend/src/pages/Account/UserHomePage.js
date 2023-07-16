import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AccountHomeCard from "../../components/AccountHomeCard";

export default function UserHomePage() {
  const navigate = useNavigate();

  return (
    <Container className="p-5">
      <Row>
        <Col xs={12}>
          <h3>Your Account</h3>
        </Col>
        <Col xs={4}>
          <Link to="/user/order/history">
            <AccountHomeCard
              img="/imgs/your_account_orders.png"
              heading="Your Orders"
              content="Track, return, or buy things again"
            ></AccountHomeCard>
          </Link>
        </Col>
        <Col xs={4}>
          <Link to="/user/security">
            <AccountHomeCard
              img="/imgs/your_account_login.png"
              heading="Login & Security"
              content="Edit login, name, and mobile number"
            ></AccountHomeCard>
          </Link>
        </Col>
        <Col xs={4}>
          <Link to="/user/save">
            <AccountHomeCard
              img="/imgs/your_account_list.png"
              heading="Your Saved Items"
              content="Manage, add, or remove Saved items"
            ></AccountHomeCard>
          </Link>
        </Col>
        <Col xs={4}>
          <Link to="/user/prime">
            <AccountHomeCard
              img="/imgs/your_account_prime.png"
              heading="Prime"
              content="View benefits and payment settings"
            ></AccountHomeCard>
          </Link>
        </Col>
        <Col xs={4}>
          <Link to="/user/giftcard">
            <AccountHomeCard
              img="/imgs/your_account_giftcard.png"
              heading="Gift cards"
              content="View balance, redeem, or reload cards"
            ></AccountHomeCard>
          </Link>
        </Col>
        <Col xs={4}>
          <Link to="/user/order/history">
            <AccountHomeCard
              img="/imgs/your_account_profile.png"
              heading="Your Profiles"
              content="Manage, add, or remove user profiles"
            ></AccountHomeCard>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
